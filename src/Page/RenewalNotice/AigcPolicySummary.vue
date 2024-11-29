<template>
  <v-app style="background-color: #b5c1c433; padding-top: 20px">
    <v-form ref="formdata">
      <v-flex class="d-flex mb-6" color="grey lighten-2" flat tile>
        <v-flex class="d-flex" color="grey lighten-2" flat tile>
          <v-flex class="pa-2" outlined tile style="display: flex">
            <v-text
              class="body-2 font-weight-bold mt-4"
              style="color: #1e83c2; margin-left: 20px"
              >Policy Summary - AIGC :
            </v-text>
            <span>
              <p
                class="body-2 font-weight-bold"
                style="color: #e46a25; margin-left: 8px; margin-top: 23px"
              >
                {{
                  defaultFilter.expiryDateFrom
                    ? defaultFilter.expiryDateFrom.split("-")[0] +
                      "-" +
                      monthNames[
                        parseInt(defaultFilter.expiryDateFrom.split("-")[1]) - 1
                      ] +
                      "-" +
                      defaultFilter.expiryDateFrom.split("-")[2]
                    : defaultFilter.expiryDateFrom
                }}
                To
                {{
                  defaultFilter.expiryDateTo
                    ? defaultFilter.expiryDateTo.split("-")[0] +
                      "-" +
                      monthNames[
                        parseInt(defaultFilter.expiryDateTo.split("-")[1]) - 1
                      ] +
                      "-" +
                      defaultFilter.expiryDateTo.split("-")[2]
                    : defaultFilter.expiryDateTo
                }}
              </p>
            </span>
          </v-flex>
        </v-flex>
        <v-flex
          class="pa-2"
          outlined
          tile
          xs3
          style="max-width: 250px; right: 30px"
        >
          <p class="font-weight-bold mb-1 caption" style="color: #646666">
            Select a product *
          </p>
          <v-select
            class="main_dropdown"
            id="lineOfBusiness"
            solo
            hide-details
            label="Select line of business"
            v-model="defaultFilter.lob"
            :items="lobOpt"
            item-text="NUM_IL_PRODUCT_NAME"
            item-value="NUM_IL_PRODUCT_CODE"
            @change="onChangeLob()"
            return-object
          ></v-select>
        </v-flex>
        <v-flex class="pa-2" outlined tile xs3 style="max-width: 232px">
          <p
            class="font-weight-bold mb-1 caption"
            style="color: #646666; margin-left: 15px"
          >
            Select an expiry date range *
          </p>
          <v-select
            solo
            hide-details
            :items="dateRangeOpn"
            class="main_dropdown"
            item-text="text"
            item-value="value"
            v-model="selectedDateRangeOpn"
            @input="onDateChangeHandler()"
            label="YYYY/MM/DD"
            style="max-width: 180px; left: 15px"
            return-object
          >
          </v-select>
        </v-flex>
      </v-flex>
      <!--dialog for custom date range-->
      <CustomDateRangePicker
        v-if="showCustomDateRange"
        :open="showCustomDateRange"
        @onClose="onCloseHandler"
        @onCustomDateRangeHandler="onCustomDateRangeHandler"
        :data="defaultFilter"
      />
      <!-- Buckets -->
      <v-layout row wrap class="ml-4 mt-2" style="position: relative">
        <v-flex
          v-for="rv in policyCountData"
          :key="rv.name"
          class="d-flex justify-start mb-6"
          color="grey lighten-2"
          flat
          tile
          min-height="200"
          style="width: 165px; max-width: 165px"
        >
          <v-card
            :key="rv.status_BE"
            :class="
              rv.name.toLowerCase() ==
              selectedBucket.split('-').join(' ').toLowerCase()
                ? 'highlight v-card pa-2 mv-card mr-4 mb-3'
                : 'v-card pa-2 mv-card mr-4 mb-3'
            "
            @click="
              rv.selected === true
                ? getPolicyDataByBucket(rv.status_BE, '15', 0)
                : null;
              headerForAll(rv.status_BE);
              setFeatureFunctionality(rv.status_BE);
              filterBy = featureLocalStorage.filterBy;
              bulkAction = featureLocalStorage.bulkAction;
            "
            :v-model="rv.status_BE"
            :style="
              rv.selected === true
                ? 'background-color:white;color:rgb(30,131,194);cursor:pointer'
                : 'background-color:rgba(181,181,181,1);color:white;cursor:not-allowed'
            "
            style="width: 117px; height: 80px; border-radius: 6px"
          >
            <v-card-text style="padding: 2px 9px">
              <div
                class="font-weight-bold"
                style="color: #FFFFF; font-size: 20px"
              >
                {{ rv.totalCount }}
              </div>
              <p
                style="color: #FFFFF; font-size: 12px; /* text-transform: ; */"
              >
                {{ rv.name.replaceAll("_", " ") }}
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-form>

    <!--table-->
    <v-card class="ma-3 pa-4" style="position: relative; bottom: 15px">
      <div style="display: flex" class="justify-space-between mb-4">
        <v-text
          class="font-weight-bold"
          style="color: #1e83c2; justify-content: flex-start"
        >
          <span>Policy Lists</span> &nbsp; &nbsp; &nbsp; &nbsp;
          <v-text
            style="
              background-color: #01afcb;
              color: white;
              border-radius: 25px;
              font-size: 11px;
              font-weight: 400;
              padding: 4px;
              border-radius: 16px;
            "
          >
            {{ selectedBucket.split("_").join(" ") }}
          </v-text>
          <v-chip
            v-if="searchData.policyNo"
            v-model="chip1"
            color="#01afcb"
            outline
          >
            Policy No:{{ searchData.policyNo }}
            <v-icon
              style="font-size: 14px; margin-left: 6px"
              @click="
                onSearchHandler('', searchData.channel, searchData.producerCode)
              "
              >close</v-icon
            ></v-chip
          >
          <v-chip
            v-if="searchData.channel"
            v-model="chip2"
            color="#01afcb"
            outline
            >Channel:{{ searchData.channel }}
            <v-icon
              style="font-size: 14px; margin-left: 6px"
              @click="
                onSearchHandler(
                  searchData.policyNo,
                  '',
                  searchData.producerCode
                )
              "
              >close</v-icon
            ></v-chip
          >
          <v-chip
            v-if="searchData.producerCode"
            v-model="chip3"
            color="#01afcb"
            outline
            >Producer Code:{{ searchData.producerCode }}
            <v-icon
              style="font-size: 14px; margin-left: 6px"
              @click="
                onSearchHandler(searchData.policyNo, searchData.channel, '')
              "
              >close</v-icon
            ></v-chip
          >
        </v-text>
        <div
          class="main_dropdown"
          style="display: flex; justify-content: flex-end"
        >
          <v-flex
            xs12
            sm6
            d-flex
            class="cust_pr"
            style="
              max-width: 211px;
              margin-right: 5px;
              display: flex;
              flex-direction: column;
            "
            v-if="bulkAction == true && statusIdNo != '0'"
          >
            <label style="margin-top: -14px">Bulk Action</label>
            <v-select
              v-model="select"
              ref="selectedEl"
              :items="BulkActionItems"
              hide-details
              item-text="ActionName"
              item-value="ID"
              label="Process To"
              solo
              @input="ShowDialogBox($event)"
            ></v-select>
          </v-flex>
          <v-btn
            style="
              height: 31px;
              background-color: #0073bb;
              color: white;
              text-transform: capitalize;
              font-size: 13px;
              top: 4px;
            "
            @click="showSearchHandler()"
          >
            <v-icon style="margin-right: 9px" small>search</v-icon>Search
          </v-btn>
          <v-btn
            class="dropbtn"
            style="background-color: #2a811b; color: white"
            v-if="selectedBucketPermission.Download == true"
          >
            <v-icon style="margin-right: 9px" small>mdi-download</v-icon>
            Download
            <div class="dropdown-content">
              <p v-if="statusIdNo == '0'" @click="downloadDueReportHandler()">
                Due Report
              </p>
              <v-divider></v-divider>
              <p
                v-if="
                  statusIdNo != '8' ||
                  statusIdNo != '9' ||
                  statusIdNo != '10' ||
                  statusIdNo != '11'
                "
                @click="downloadBucketReportHandler()"
              >
                Bucket Report
              </p>
              <v-divider></v-divider>
              <p
                v-if="statusIdNo != '0' && statusIdNo != '1'"
                @click="downloadExtractReportHandler()"
              >
                Extract Report
              </p>
              <v-divider></v-divider>
              <p
                v-if="statusIdNo == '6'"
                @click="downloadLimitedFieldHandler()"
              >
                Limited Field
              </p>
            </div>
          </v-btn>
          <v-btn
            class="dropuploadbtn"
            style="background-color: #e46a25; color: white"
            v-if="selectedBucketPermission.Upload == true"
          >
            <v-icon style="margin-right: 9px" small>mdi-upload</v-icon>upload
            <div class="dropdown-content-upload">
              <p @click="ptBulkUpload('bulkupdate')">Bulk Update</p>
            </div>
          </v-btn>
        </div>
      </div>
      <!-- TABLEDATA -->

      <SearchDialogBox
        v-if="showSearch == true"
        :open="showSearch"
        @onCloseSearch="onCloseSearch"
        @onSearchHandler="onSearchHandler"
        :data="searchData"
      />
      <template>
        <v-layout row justify-center>
          <v-dialog v-model="dialogforConf" persistent max-width="300">
            <v-card>
              <v-card-text>
                Are you sure you want send the policy to the bucket?
              </v-card-text>
              <v-btn
                color="primary darken-1"
                flat="flat"
                @click="dialogforConf = false"
              >
                No
              </v-btn>
              <v-btn
                v-model="Yes"
                color="primary darken-1"
                flat="flat"
                @click="rvBulkActionHandler(currentID)"
              >
                Yes
              </v-btn>
            </v-card>
          </v-dialog>
        </v-layout>
      </template>
      <div>
        <template>
          <v-data-table
            no-data-text="No data available"
            :headers="headers"
            :items="policyLists"
            show-select
            v-bind:pagination.sync="pagination"
            hide-actions
            class="elevation-1"
            select-all
          >
            <template slot="headers" slot-scope="props">
              <tr>
                <th style="background: rgb(1, 175, 203)">
                  <v-checkbox
                    :input-value="props.all"
                    :indeterminate="props.indeterminate"
                    v-model="headerCheckbox"
                    primary
                    hide-details
                    @change="toggleAll($event, policyLists)"
                  ></v-checkbox>
                </th>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  style="color: white; background: rgb(1, 175, 203)"
                  :class="[
                    'column sortable',
                    pagination.descending ? 'desc' : 'asc',
                    header.value === pagination.sortBy ? 'active' : '',
                  ]"
                  @click="changeSort(header.value)"
                >
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <td style="background-color: #eff3f4">
                <v-checkbox
                  v-model="props.item.selected"
                  @change="tableCheckbox($event, props.item)"
                  primary
                  hide-details
                >
                </v-checkbox>
              </td>
              <td class="text-xs-left" style="background-color: #eff3f4">
                {{ props.item.VARIANT }}
              </td>
              <td
                class="text-xs-left table-col-policyNo"
                style="background-color: #eff3f4"
                @click="modifyPolicy(props.item)"
              >
                {{ props.item.TXT_POLICY_NO_CHAR }}
              </td>
              <td class="text-xs-left" style="background-color: #eff3f4">
                {{ props.item.OFFICE_BRANCH_LOCATION_NAME }}
              </td>
              <td class="text-xs-left" style="background-color: #eff3f4">
                {{ props.item.CHANNEL_NAME_GC }}
              </td>
              <td class="text-xs-left" style="background-color: #eff3f4">
                {{ props.item.INSURED_NAME }}
              </td>
              <td
                class="text-xs-center"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{ props.item.INCEPTION_DATE }}
              </td>
              <td
                class="text-xs-center"
                style="background-color: #eff3f4; textalign-last: center"
              >
                {{ props.item.EXPIRY_DATE }}
              </td>
              <td class="text-xs-center" style="background-color: #eff3f4">
                <a
                  @click="
                    auditWorkFlowData(
                      props.item.TXT_POLICY_NO_CHAR,
                      props.item.NUM_REFERENCE_NUMBER,
                      props.item
                    )
                  "
                  style="text-decoration: underline"
                >
                  {{ props.item.RV_RENEWAL_STATUS }}
                </a>
              </td>
              <td
                v-if="statusIdNo == '2'"
                class="text-xs-center text-truncate"
                style="background-color: #eff3f4; max-width: 100px"
                max-width="600"
              >
                <v-icon
                  @click="
                    showFailedResponse = true;
                    failedResponseHeader = 'Reason';
                    failedResponseData = props.item.RV_BRE_FAILED_MESSAGE;
                  "
                  >info</v-icon
                >
              </td>
              <td
                v-if="statusIdNo == '3'"
                class="text-xs-center text-truncate"
                style="background-color: #eff3f4; max-width: 100px"
                max-width="600"
              >
                <v-icon
                  v-if="props.item.RV_DOC_FAILED_MESSAGE"
                  @click="
                    showFailedResponse = true;
                    failedResponseHeader = 'Reason';
                    failedResponseData = props.item.RV_DOC_FAILED_MESSAGE;
                  "
                  >info</v-icon
                >
                <v-icon v-else style="font-size: 17px">mdi-minus</v-icon>
              </td>
              <td
                v-if="statusIdNo == '7'"
                class="text-xs-center text-truncate"
                style="background-color: #eff3f4; max-width: 100px"
                max-width="600"
              >
                <v-icon
                  v-if="props.item.RV_DOC_FETCH_RESP_ERROR"
                  @click="
                    showFailedResponse = true;
                    failedResponseHeader = 'Reason';
                    failedResponseData = props.item.RV_DOC_FETCH_RESP_ERROR;
                  "
                  >info</v-icon
                >
                <v-icon v-else style="font-size: 17px">mdi-minus</v-icon>
              </td>
              <td
                v-if="
                  statusIdNo == '3' ||
                  statusIdNo == '5' ||
                  statusIdNo == '7' ||
                  statusIdNo == '8' ||
                  statusIdNo == '9'
                "
                class="text-xs-center truncate"
                style="background-color: #eff3f4; text-align-last: center"
              >
                {{
                  props.item.RV_IPDS_RESP_TOTAL_PREMIUM != ""
                    ? props.item.RV_IPDS_RESP_TOTAL_PREMIUM
                    : "-"
                }}
              </td>
              <td
                v-if="statusIdNo == '4' || statusIdNo == '10'"
                class="text-xs-right text-truncate"
                style="background-color: #eff3f4; max-width: 100px"
                max-width="600"
              >
                {{ props.item.RV_IPDS_RESP_DECLINEMSG }}
                <v-icon
                  @click="
                    showFailedResponse = true;
                    failedResponseHeader = 'Reason';
                    failedResponseData = props.item.RV_IPDS_RESP_DECLINEMSG;
                  "
                  >info</v-icon
                >
              </td>
              <td
                v-if="statusIdNo == '5'"
                class="text-xs-center text-truncate"
                style="background-color: #eff3f4; max-width: 100px"
                max-width="600"
              >
                <v-icon
                  v-if="props.item.RV_IPDS_RESP_REFERREASON"
                  @click="
                    showFailedResponse = true;
                    failedResponseHeader = 'Reason';
                    failedResponseData = props.item.RV_IPDS_RESP_REFERREASON;
                  "
                  >info</v-icon
                >
                <p v-else>_</p>
              </td>
              <td
                v-if="
                  statusIdNo == '1' ||
                  statusIdNo == '2' ||
                  statusIdNo == '4' ||
                  statusIdNo == '5' ||
                  statusIdNo == '6'
                "
                class="text-xs-left"
                style="background-color: #eff3f4; padding: 15px"
              >
                <v-btn class="menubtn" icon light style="color: black">
                  <v-icon>mdi-dots-vertical</v-icon>
                  <div class="dropdown-action">
                    <p
                      @click="
                        downloadLogs(
                          downloadBre[0].value,
                          props.item.TXT_POLICY_NO_CHAR,
                          props.item.NUM_REFERENCE_NUMBER
                        )
                      "
                    >
                      {{ downloadBre[0].text }}
                    </p>
                    <v-divider></v-divider>
                    <p
                      @click="
                        downloadLogs(
                          downloadBre[1].value,
                          props.item.TXT_POLICY_NO_CHAR,
                          props.item.NUM_REFERENCE_NUMBER
                        )
                      "
                    >
                      {{ downloadBre[1].text }}
                    </p>
                    <v-divider></v-divider>
                    <p
                      @click="
                        downloadLogs(
                          downloadBre[2].value,
                          props.item.TXT_POLICY_NO_CHAR,
                          props.item.NUM_REFERENCE_NUMBER
                        )
                      "
                    >
                      {{ downloadBre[2].text }}
                    </p>
                  </div>
                </v-btn>
              </td>
              <td
                v-if="statusIdNo == '3'"
                class="text-xs-left"
                style="background-color: #eff3f4; padding: 15px"
              >
                <v-btn class="menubtn" icon light style="color: #1e83c2">
                  <v-icon
                    @click="
                      dataDownload(
                        props.item.TXT_POLICY_NO_CHAR,
                        props.item.NUM_REFERENCE_NUMBER
                      )
                    "
                    >mdi-download</v-icon
                  >
                </v-btn>
              </td>
              <td
                v-if="statusIdNo == '8'"
                class="text-xs-left"
                style="background-color: #eff3f4"
              >
                <v-btn
                  class="menubtn"
                  icon
                  light
                  style="color: #1e83c2"
                  @click="copyBitlyLink(props.item.RV_BITLY_LINK)"
                  v-if="props.item.RV_BITLY_LINK"
                >
                  <v-tooltip left>
                    <v-icon slot="activator">mdi-content-copy</v-icon
                    ><span>Copy BitlyLink</span>
                  </v-tooltip>
                </v-btn>
                <v-btn v-else icon light style="color: #1e83c2">
                  <v-tooltip left>
                    <v-icon
                      slot="activator"
                      @click="
                        payLinkGenerate(
                          props.item.TXT_POLICY_NO_CHAR,
                          props.item.NUM_REFERENCE_NUMBER
                        )
                      "
                      >mdi-restart</v-icon
                    ><span>Retry!</span>
                  </v-tooltip>
                </v-btn>
              </td>
              <td
                v-if="statusIdNo == '8'"
                class="text-xs-center text-truncate"
                style="background-color: #eff3f4"
                max-width="600"
              >
                <v-icon
                  v-if="
                    props.item.RV_COMM_PRODUCER_TRIGGER_AT ||
                    props.item.RV_COMM_CUSTOMER_TRIGGER_AT
                  "
                  @click="
                    showFailedResponseComm = true;
                    failedResponseHeaderComm = 'Reason';
                    failedResponseDataComm = props.item.communicationFailedMsg;
                  "
                  >info</v-icon
                >
                <p v-else>_</p>
              </td>
              <td
                v-if="statusIdNo == '8'"
                class="text-xs-center text-truncate"
                style="background-color: #eff3f4; max-width: 100px"
                max-width="600"
              >
                <v-icon
                  v-if="props.item.RV_BITLY_FAILED_MSG"
                  @click="
                    showFailedResponse = true;
                    failedResponseHeader = 'Reason';
                    failedResponseData = props.item.RV_BITLY_FAILED_MSG;
                  "
                  >info</v-icon
                >
                <p v-else>_</p>
              </td>
              <td
                v-if="statusIdNo == '8'"
                class="text-xs-left"
                style="background-color: #eff3f4"
              >
                <v-btn class="menubtn" icon light style="color: #1e83c2">
                  <v-icon
                    @click="
                      downloadRNData(
                        props.item.TXT_POLICY_NO_CHAR,
                        props.item.NUM_REFERENCE_NUMBER,
                        props.item.RV_RN_LINK
                      )
                    "
                    >mdi-download
                  </v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </template>
        <v-layout justify-end>
          <div class="margincls mt-3 mr-3">
            <span>
              Showing <b>{{ pageStartIndex }}</b> -
              <b>{{ pageEndIndex() }}</b></span
            >
            <span>
              out of <b>{{ totalListCount }}</b> records
            </span>
          </div>
          <v-pagination
            class="mr-4 mt-1"
            v-model="pageNumber"
            color="#152F38"
            :length="getNoOfPages()"
            :total-visible="limitValue"
            @input="nextPage($event)"
          >
          </v-pagination>
        </v-layout>
      </div>
    </v-card>
    <!--Loader -->
    <Loader :isLoading="isLoading" />
    <!-- reason dialog -->
    <template>
      <v-layout row justify-center>
        <v-dialog
          v-model="showFailedResponse"
          persistent
          overlay
          max-width="450"
        >
          <v-card v-if="statusIdNo == '2'">
            <v-card-title class="headline">{{
              failedResponseHeader
            }}</v-card-title>
            <v-card-text>
              <span class="black--text" style="font-weight: 500">Response</span
              ><br />
              {{ failedResponseData ? failedResponseData : "-" }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showFailedResponse = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card v-if="statusIdNo == '3'">
            <v-card-title class="headline">{{
              failedResponseHeader
            }}</v-card-title>
            <v-card-text>
              <span class="black--text" style="font-weight: 500">Response</span
              ><br />
              {{ failedResponseData }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showFailedResponse = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card v-if="statusIdNo == '5'">
            <v-card-title class="headline">{{
              failedResponseHeader
            }}</v-card-title>
            <v-card-text>
              <span class="black--text" style="font-weight: 500">Response</span
              ><br />
              {{ failedResponseData ? failedResponseData : "-" }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showFailedResponse = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card v-if="statusIdNo == '7'">
            <v-card-title class="headline">{{
              failedResponseHeader
            }}</v-card-title>
            <v-card-text>
              <span class="black--text" style="font-weight: 500">Response</span
              ><br />
              {{ failedResponseData ? failedResponseData : "-" }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showFailedResponse = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
          <v-card v-if="statusIdNo == '8'">
            <v-card-title class="headline">{{
              failedResponseHeader
            }}</v-card-title>
            <v-card-text>
              <span class="black--text" style="font-weight: 500">Response</span
              ><br />
              {{ failedResponseData ? failedResponseData : "-" }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showFailedResponse = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <!-- reason dialog for communication -->
    <template>
      <v-layout row justify-center>
        <v-dialog
          v-model="showFailedResponseComm"
          persistent
          overlay
          max-width="450"
        >
          <v-card v-if="statusIdNo == '8'">
            <v-card-title class="headline">{{
              failedResponseHeaderComm
            }}</v-card-title>
            <v-card-text>
              <span class="black--text" style="font-weight: 500">Response</span
              ><br />
              {{ failedResponseDataComm ? failedResponseDataComm : "-" }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="showFailedResponseComm = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <!-- action download dialog box -->
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="actionDialogBre" persistent overlay max-width="450">
          <v-card>
            <v-card-text>
              <div
                style="
                  padding: 10px;
                  width: 100%;
                  background-color: #0073bb;
                  color: white;
                "
              >
                Please select the Download Option.
                <v-icon
                  @click="actionDialogBre = false"
                  style="float: right; color: white"
                  >mdi-close</v-icon
                >
              </div>
              <v-container fluid>
                <v-radio-group v-model="valueOfGRadio">
                  <v-radio
                    label="BRE Request Download"
                    value="REQUEST"
                  ></v-radio>
                  <v-radio
                    label="BRE Response Download"
                    value="RESPONSE"
                  ></v-radio>
                  <v-radio
                    label="Policy Detail Download"
                    value="POLICY_DETAIL"
                  ></v-radio>
                  <v-radio
                    label="DOCIT Request Download"
                    value="DOCIT-REQUEST"
                  ></v-radio>
                  <v-radio
                    label="DOCIT Response Download"
                    value="DOCIT-RESPONSE"
                  ></v-radio>
                </v-radio-group>
                <v-btn
                  style="background-color: #0073bb; color: white"
                  @click="downloadBreData()"
                  >Download</v-btn
                >
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <!-- action dialog for RN generated -->
    <template>
      <v-layout row justify-center>
        <v-dialog v-model="actionDialogRN" persistent overlay max-width="450">
          <v-card>
            <v-card-text>
              <div
                style="
                  padding: 10px;
                  width: 100%;
                  background-color: #0073bb;
                  color: white;
                "
              >
                Please select the Download Option.
                <v-icon
                  @click="actionDialogRN = false"
                  style="float: right; color: white"
                  >mdi-close</v-icon
                >
              </div>
              <v-container fluid>
                <v-radio-group v-model="valueOfGRadioRN">
                  <v-radio label="RN DOWNLOAD" value="RNDOWNLOAD"></v-radio>
                  <v-radio
                    label="BITLY REQUEST DOWNLOAD "
                    value="REQUEST"
                  ></v-radio>
                  <v-radio
                    label="BITLY RESPONSE DOWNLOAD"
                    value="RESPONSE"
                  ></v-radio>
                  <v-radio
                    label="COMMUNICATION REQUEST DOWNLOAD"
                    value="COMM-REQUEST"
                  ></v-radio>
                  <v-radio
                    label="COMMUNICATION RESPONSE DOWNLOAD"
                    value="COMM-RESPONSE"
                  ></v-radio>
                </v-radio-group>
                <v-btn
                  style="background-color: #0073bb; color: white"
                  @click="downloadActionRN()"
                  >Download</v-btn
                >
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <!-- policy deatil -->
    <v-layout wrap>
      <v-navigation-drawer
        class="drawerNavigation"
        v-model="drawer.show"
        right
        fixed
        temporary
        style="width: 570px"
        :width="570"
      >
        <div
          style="
            padding: 10px;
            width: 100%;
            background-color: #0073bb;
            color: white;
          "
        >
          Policy Detail
          <v-icon
            @click="drawer.show = false"
            style="float: right; color: white"
            >mdi-close</v-icon
          >
        </div>
        <template>
          <v-card>
            <v-card-title>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="drawer ? headersForEdit : headersForDefault"
              :items="showModifyResponseData"
              :search="search"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td
                    class="text-sm-left"
                    style="background-color: #eff3f4; padding: 0 0 0 10px"
                  >
                    {{ props.item.fieldName }}
                  </td>
                  <td class="text-sm-left" style="background-color: #eff3f4">
                    {{ props.item.data }}
                  </td>
                  <td
                    class="text-sm-left"
                    style="background-color: #eff3f4"
                    v-if="drawer.isEditable"
                  >
                    <input
                      id="inputfortable"
                      :disabled="props.item.isEditable == false"
                      aria-placeholder="props.item.data"
                      v-model="props.item.newData"
                      :style="
                        props.item.isEditable == false
                          ? 'background-color:rgba(0,0,0,0.1); width: 125px; height:25px;'
                          : 'width: 125px; height:25px; background-color:rgba(255,255,255,1);border:1px solid rgba(0,0,0,0.1)'
                      "
                    />
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card>
          <v-layout
            class="pa-2"
            style="
              position: relative;
              left: 13px;
              display: flex;
              justify-content: end;
            "
          >
            <v-btn
              flat
              id="clearBtn"
              class="ma-2 pa-3 clear-btn-model"
              color="#646666"
              @click="search = null"
              dark
              small
            >
              <v-divider vertical class="mr-2"></v-divider>Clear
            </v-btn>
            <v-btn
              flat
              v-if="drawer.isEditable"
              class="ma-2 pa-3 update-btn-model"
              color="#0073BB"
              dark
              small
              @click="putDataModification()"
              >Update and Move to BRE-Pending
            </v-btn>
          </v-layout>
        </template>
      </v-navigation-drawer>
    </v-layout>

    <!-- Upload Bulk dialog box -->
    <template>
      <v-dialog v-model="dialog2" persistent overlay scrollable max-width="530">
        <v-card tile>
          <v-toolbar dark style="background-color: #0073bb; height: 40px">
            <v-toolbar-title
              style="color: white; margin-bottom: 18px; font-size: 15px"
              >Upload Excel</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              icon
              light
              @click="
                (dialog2 = false), (selectedFileName = null);
                selectFileData = null;
              "
              style="color: white; margin-bottom: 18px"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-menu bottom right offset-y></v-menu>
          </v-toolbar>
          <div class="uploadDiv" style="display: block">
            <input
              type="file"
              id="myfile"
              name="myfile"
              ref="fileref"
              @change="onFilePicked"
            />
            <label for="myfile" id="labelForUpload">
              {{
                selectedFileName ? selectedFileName : "Drop files to Upload or"
              }}
              &nbsp;
              <u style="margin-right: 2px; color: blue">
                {{ selectedFileName ? "" : "Browse" }}
              </u>
            </label>
          </div>
          <v-layout
            class="pa-2"
            style="
              position: relative;
              bottom: 6px;
              display: flex;
              justify-content: end;
            "
          >
            <v-btn
              flat
              style="
                width: 100px;
                height: 35px;
                background-color: #ffffff;
                color: #646666;
                border: 1.5px solid #ccc;
                border-radius: 3px;
              "
              class="ma-2 pa-3"
              color="#646666"
              dark
              small
              @click="
                (dialog2 = false), (selectedFileName = null);
                selectFileData = null;
              "
            >
              <v-divider vertical class="mr-2"></v-divider>Clear
            </v-btn>
            <v-btn
              @click="PtModificationExcelUpdate()"
              flat
              style="
                width: 100px;
                height: 35px;
                background-color: #0073bb;
                color: #ffffff;
                border: 1.5px solid #ccc;
                border-radius: 4px;
              "
              class="ma-2 pa-3"
              color="#0073BB"
              dark
              small
            >
              <v-divider vertical class="mr-2"></v-divider>Upload
            </v-btn>
          </v-layout>
        </v-card>
      </v-dialog>
    </template>

    <!-- audit workflow dialog -->
    <template>
      <v-layout row justify-center>
        <v-dialog
          v-model="dialogforAudit"
          overlay
          scrollable
          persistent
          max-width="600"
          style="border-radius: 12%"
        >
          <v-card>
            <v-toolbar light>
              <v-spacer></v-spacer>
              <v-toolbar-title style="color: black"
                >Workflow Audit Trail
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                icon
                light
                @click="dialogforAudit = false"
                style="color: black; margin-bottom: 6px"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-menu bottom right offset-y></v-menu>
            </v-toolbar>
            <v-card-text>
              <template>
                <v-data-table
                  :headers="headersForAudit"
                  :items="auditWorkflowStatus"
                  hide-actions
                  class="elevation-1 auditTrail_table"
                >
                  <template slot="items" slot-scope="props">
                    <tr>
                      <td>
                        {{ props.item.RV_ACTION_DESC }}
                        <span>
                          <img
                            v-if="props.item.RV_ACTION_DESC != '---'"
                            @click="auditSingleFileDownload(props.item)"
                            class="export-icon"
                            src="../../assets/downloadicon.png"
                            style="height: 18px; margin: 0px 0px -3px 9px"
                          />
                        </span>
                      </td>
                      <td>
                        {{ props.item.RV_ACTION_AT }}
                      </td>
                      <td>
                        {{ props.item.RV_ACTION_BY }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </template>
            </v-card-text>
            <v-card-actions style="justify-content: center">
              <v-btn
                style="background-color: #07458e; color: white"
                @click="auditTrailDownload()"
                >Export Complete audit trail
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </template>
  </v-app>
</template>

<script>
import moment from "moment";
import CustomDateRangePicker from "./common/CustomDateRangePicker.vue";
import SearchDialogBox from "./common/SearchDialogBox.vue";
import Loader from "./common/Loader";
import { monthNames, apiService, dateRangeFilterOpn } from "./common/common";
import { policySummaryAIGCHeader } from "./common/tableHeader";
import { editableFieldsAigc, showPTModifyData } from "./common/common";

export default {
  components: {
    CustomDateRangePicker,
    Loader,
    SearchDialogBox,
  },
  created() {
    this.onDateChangeHandler();
    this.getUserData();
    setTimeout(() => {
      this.getLobOptHandler();
    }, 2000);
    this.getPolicyDataByBucket(0, "15", 0);
    this.headerForAll(this.statusIdNo);
    this.trigger();
  },
  data() {
    return {
      refreshAPI: true,
      rnLink: "",
      valueOfGRadio: "",
      valueOfGRadioRN: "",
      actionDialogBre: false,
      actionDialogRN: false,
      selectSinglePolicy: "",
      selectMultiplePolicy: "",
      biltyLink: "",
      chip1: true,
      chip2: true,
      chip3: true,
      dialog2: false,
      policyData: "",
      selectedFileName: null,
      selectFileData: {},
      isUploadLimitation: "true",
      showFailedResponse: false,
      showFailedResponseComm: false,
      failedResponseDataComm: null,
      failedResponseHeaderComm: null,
      failedResponseHeader: null,
      failedResponseData: null,
      drawer: { show: false, isEditable: false },
      defaultFilter: {
        expiryDateFrom: "",
        expiryDateTo: "",
        lob: "",
      },
      search: "",
      showModifyResponseData: [],
      Yes: false,
      searchData: {
        policyNo: "",
        producerCode: "",
        channel: "",
      },
      downloadBre: [
        { text: "BRE Request Download", value: "REQUEST" },
        { text: "BRE Response Download", value: "RESPONSE" },
        { text: "PolicyDetail Download", value: "POLICY_DETAIL" },
      ],
      headersForDefault: [
        { text: "Field Name", sortable: false, value: "fieldName" },
        { text: "Old Data", sortable: false, value: "data" },
      ],
      headersForEdit: [
        { text: "Field Name", sortable: false, value: "fieldName" },
        { text: "Old Data", sortable: false, value: "data" },
        { text: "New Data", sortable: false, value: "data" },
      ],
      headersForAudit: [
        { text: "Status", sortable: false, value: "RV_ACTION_DESC" },
        { text: "Time Stamp", sortable: false, value: "RV_ACTION_AT" },
        { text: "UserId", sortable: false, value: "RV_ACTION_BY" },
      ],
      dialogforAudit: false,
      auditWorkflowStatus: [],
      singlePolicy: [],
      multiplePolicy: [],
      editableFields: editableFieldsAigc,
      showModifyData: showPTModifyData,
      downloadResData: "",
      currentID: "",
      select: "",
      searchFilter: {},
      featureLocalStorage: {
        filterBy: true,
        bulkAction: true,
      },
      dialogforConf: false,
      bulkAction: true,
      BulkActionItems: [],
      headerCheckbox: false,
      statusIdNo: "",
      headers: policySummaryAIGCHeader,
      modifyResponseData: [],
      policyCountData: [],
      policyLists: [],
      showCustomDateRange: false,
      selectedBucket: "ALL",
      monthNames: monthNames,
      lobOpt: [],
      dateRangeOpn: dateRangeFilterOpn,
      selectedDateRangeOpn: { text: "Next 3 Months", value: "N3M" },
      userData: {},
      selectedBucketPermission: {},
      isLoading: false,
      limitValue: 15,
      skipdiffrence: this.paginationdiff(),
      skip: 0,
      pageStartIndex: 1,
      totalListCount: 0,
      pageRowCount: 15,
      pageNumber: 1,
      pagination: {
        rowsPerPage: 15,
      },
      showSearch: false,
      selectedSinglePolicy: [],
      TabledataForCheckbox: [],
      downloadMultiplePolicy: [],
      bulkPolicies: [],
      featureList: [],
      policyNo: "",
      numRefNo: "",
      policySingle: [],
      policyBulk: [],
    };
  },
  methods: {
    trigger() {
      setInterval(() => {
        // console.log("I am here")
        this.getPolicyCountData();
      }, 2 * 60 * 1000);
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;
      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
    pageEndIndex() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return this.pageStartIndex + this.limitValue <= this.totalListCount
          ? this.pageStartIndex + this.limitValue - 1
          : this.totalListCount;
      }
    },
    getNoOfPages() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return Math.ceil(this.totalListCount / this.limitValue);
      }
    },
    ShowDialogBox(currentID) {
      this.currentID = currentID;
      this.dialogforConf = true;
    },
    nextPage(e) {
      let skipData = e - 1;
      if (skipData === 0) {
        this.skip = 0;
        this.pageStartIndex = 1;
      } else {
        this.skip = this.pageRowCount * skipData;
        this.pageStartIndex = this.pageRowCount + 1;
      }
      let bucketStatus = this.selectedBucketPermission.Status;
      this.getPolicyDataByBucket(bucketStatus, "15", this.skip);
    },
    onCloseHandler() {
      if (this.defaultFilter.expiryDateFrom > this.defaultFilter.expiryDateTo) {
        this.showToast("Please select a valid Date Range", this.TOST().WARNING);
      } else {
        this.showCustomDateRange = false;
      }
    },
    onClearHandler() {
      this.isLoading = false;
      this.defaultFilter.expiryDateFrom = "";
      this.defaultFilter.expiryDateTo = "";
    },
    onCustomDateRangeHandler(expiryDateFrom, expiryDateTo) {
      this.defaultFilter.expiryDateFrom = expiryDateFrom;
      this.defaultFilter.expiryDateTo = expiryDateTo;
      this.onCloseHandler();
    },
    showSearchHandler() {
      this.showSearch = true;
    },
    onSearchHandler(policyNo, channel, producerCode) {
      let self = this;
      this.searchData.policyNo = policyNo;
      this.searchData.producerCode = producerCode;
      this.searchData.channel = channel;
      let bucketStatus = this.selectedBucketPermission.Status;
      this.getPolicyDataByBucket(bucketStatus, "15", 0);
      this.showSearch = false;
    },
    onCloseSearch() {
      this.showSearch = false;
      this.searchFilter = {};
      let bucketStatus = this.selectedBucketPermission.Status;
      this.getPolicyDataByBucket(bucketStatus, "15", 0);
    },
    onClearSearch() {
      this.isLoading = false;
      this.searchData.policyNo = "";
      this.searchData.channel = "";
      this.searchData.producerCode = "";
      let bucketStatus = this.selectedBucketPermission.Status;
      this.getPolicyDataByBucket(bucketStatus, "15", 0);
    },
    setFeatureFunctionality(Status_id) {
      let self = this;
      const userData = JSON.parse(localStorage.loginResp);
      self.featureList = userData.data.RENEWAL_STATUS.filter(
        (e) => e.Status == Status_id
      )[0];
      self.featureLocalStorage.filterBy = self.featureList["Filter by"]
        ? self.featureList["Filter by"]
        : false;
      self.featureLocalStorage.bulkAction = self.featureList["Bulk action"]
        ? self.featureList["Bulk action"]
        : false;
    },
    bindActionFilterValues(Status_id) {
      Status_id = parseInt(Status_id);
      let actionItems = [];
      let statusFilterItems = [];
      if (Status_id == 2 || Status_id == 4 || Status_id == 5) {
        actionItems = [
          {
            ActionName: "PT-Modification",
            ID: "PT",
            Status_ID: "6",
          },
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
      } else if (Status_id == 1) {
        actionItems = [
          {
            ActionName: "PT-Modification",
            ID: "PT",
            Status_ID: "6",
          },
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
      } else if (Status_id == 6) {
        actionItems = [
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
      } else if (Status_id == 7) {
        actionItems = [
          {
            ActionName: "Fetch Renewal Notice",
            ID: "FRN",
          },
        ];
      } else if (Status_id == 8) {
        actionItems = [
          {
            ActionName: "Pay Link Generate",
            ID: "PLG",
          },
          {
            ActionName: "Send Communication",
            ID: "SC",
          },
        ];
      } else if (Status_id == 3) {
        actionItems = [
          {
            ActionName: "PT-Modification",
            ID: "PT",
            Status_ID: "6",
          },
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
          {
            ActionName: "Generate Docit",
            ID: "DOCIT",
          },
        ];
      }
      this.BulkActionItems = actionItems;
      this.filterItems = statusFilterItems;
      return true;
    },
    ptBulkUpload(value) {
      this.dialog2 = true;
      value == "bulkbre"
        ? (this.TRIGGER_BRE = true)
        : (this.TRIGGER_BRE = false);
    },
    onFilePicked(event) {
      let self = this;
      let file = event.target.files[0];
      self.selectFileData = event.target.files;
      self.selectedFileName = file.name ? file.name : null;
      if (
        self.selectFileData[0].type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        if (Object.keys(self.selectFileData).length !== 0) {
          self.showToast("File Added Successfully", self.TOST().SUCCESS);
        }
      } else {
        self.showToast("Excel and CSV file allowed", self.TOST().WARNING);
      }
    },
    getLobOptHandler() {
      try {
        let self = this;
        self.isLoading = true;
        const lobList = self.userData.LOB;
        apiService("get", `/lob-list?productcodes=[${lobList}]`, {})
          .then((res) => {
            const { status, data, msg } = res.data;
            if (status === 200) {
              self.lobOpt = data;
              self.defaultFilter.lob = data[0].NUM_IL_PRODUCT_CODE;
              console.log("calling in lob api");
              self.getPolicyCountData();
              self.getPolicyDataByBucket(0, "15", 0);
              self.isLoading = false;
            } else {
              self.lobOpt = [];
              self.isLoading = false;
              self.showToast(msg, self.TOST().WARNING);
            }
          })
          .catch((err) => {
            self.lobOpt = [];
            self.isLoading = false;
            self.showToast("Failed to fetch lob list", self.TOST().WARNING);
          });
      } catch (err) {
        self.isLoading = false;
      }
    },
    onChangeLob() {
      this.defaultFilter.lob = this.defaultFilter.lob.NUM_IL_PRODUCT_CODE;
      let bucketStatus = this.selectedBucketPermission.Status;
      this.getPolicyDataByBucket(bucketStatus, "15", 0);
      console.log("calling in on change lob");
      this.getPolicyCountData();
      this.select = "";
      this.TabledataForCheckbox = [];
      this.headerForAll(bucketStatus);
    },
    getUserData() {
      let access_list_fr = JSON.parse(localStorage.loginResp);
      this.userData = access_list_fr.data;
    },
    tableCheckbox(event, item) {
      let currentData = item;
      let policy_data = JSON.parse(JSON.stringify(item));
      if (event == true) {
        this.selectedSinglePolicy.push(policy_data);
      } else {
        const data = this.selectedSinglePolicy.filter(
          (res) => res.TXT_POLICY_NO_CHAR !== item.TXT_POLICY_NO_CHAR
        );
        this.selectedSinglePolicy = data;
        this.downloadMultiplePolicy = data;
        this.bulkPolicies = data;
        console.log(
          "data",
          this.selectedSinglePolicy,
          this.headerCheckbox,
          this.bulkPolicies
        );
      }
    },
    clickAll(event, table) {
      if (this.headerCheckbox) {
        for (var i = 0; i < table.length; i++) {
          this.policyLists[i].selected = true;
        }
      } else {
        for (var i = 0; i < table.length; i++) {
          this.policyLists[i].selected = false;
        }
      }
      if (event == true) {
        for (var i = 0; i < this.policyLists.length; i++) {
          this.selectedSinglePolicy.push(this.policyLists[i]);
        }
        console.log(
          this.selectedSinglePolicy,
          "this.selectedSinglePolicy if",
          this.headerCheckbox
        );
      } else {
        this.selectedSinglePolicy = [];
        console.log(
          this.selectedSinglePolicy,
          "this.selectedSinglePolicy else",
          this.headerCheckbox
        );
      }
    },
    toggleAll(event, table) {
      // this.selectedAllData = true;
      this.downloadMultiplePolicy = this.TabledataForCheckbox;
      // this.bulkPolicies = table;
      this.clickAll(this.headerCheckbox, table, "toggleall values");
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    headerForAll(Status_id) {
      this.statusIdNo = this.selectedBucketPermission.Status;
      if (Status_id == "2") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Error Reason",
            value: "RV_BRE_FAILED_MESSAGE",
            sortable: false,
          },
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "1") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "3") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Docit Failed Message",
            value: "RV_DOC_FAILED_MESSAGE",
            sortable: false,
          },
          {
            text: "Premium",
            value: "RV_IPDS_RESP_TOTAL_PREMIUM",
            sortable: false,
          },
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "4") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Declined Reason",
            value: "RV_IPDS_RESP_DECLINEMSG",
            sortable: false,
          },
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "5") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Premium",
            value: "RV_IPDS_RESP_TOTAL_PREMIUM",
            sortable: false,
          },
          {
            text: "Referred Reason",
            value: "RV_IPDS_RESP_REFERREASON",
            sortable: false,
          },
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "6") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "7") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Docit Fetch Failed Message",
            value: "RV_DOC_FETCH_RESP_ERROR",
            sortable: false,
          },
          {
            text: "Premium",
            value: "RV_IPDS_RESP_TOTAL_PREMIUM",
            sortable: false,
          },
        ];
      } else if (Status_id == "9" || Status_id == "10") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Premium",
            value: "RV_IPDS_RESP_TOTAL_PREMIUM",
            sortable: false,
          },
        ];
      } else if (Status_id == "8") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Premium",
            value: "RV_IPDS_RESP_TOTAL_PREMIUM",
            sortable: false,
          },
          {
            text: "BitlyLink",
            value: "RV_BITLY_LINK",
            sortable: false,
          },
          {
            text: "Communication Detail",
            value: "communicationFailedMsg",
            sortable: false,
          },
          {
            text: "Bitly link Failed Msg",
            value: "RV_COMM_FAILED_MSG",
            sortable: false,
          },
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "11") {
        this.headers = [
          ...policySummaryAIGCHeader,
          {
            text: "Declined Reason",
            value: "RV_IPDS_RESP_DECLINEMSG",
            sortable: false,
          },
        ];
      } else {
        this.headers = [...policySummaryAIGCHeader];
      }
    },
    getPolicyCountData() {
      let self = this;
      self.isLoading = true;
      let bucketStatus = this.selectedBucketPermission.Status;
      if (self.defaultFilter.lob) {
        const payload = {
          expiryFrom: self.defaultFilter.expiryDateFrom
            ? self.defaultFilter.expiryDateFrom
            : "",
          expiryTo: self.defaultFilter.expiryDateTo
            ? self.defaultFilter.expiryDateTo
            : "",
          productName: self.defaultFilter.lob,
        };
        apiService("post", `/aigc/policySummary/policyCount`, payload)
          .then((res) => {
            const { statusCode, data, errMsg } = res.data;
            if (statusCode === 200) {
              try {
                const countData = data.map((e, i) => {
                  const filter = self.userData.RENEWAL_STATUS.filter(
                    (b) => b.name.toLowerCase() == e.Status.toLowerCase()
                  );
                  return {
                    status_BE: filter.length
                      ? filter[0].Status
                      : e.Status == "ALL_COUNT"
                      ? 0
                      : 12,
                    selected:
                      e.Status == "ALL_COUNT"
                        ? true
                        : filter.length
                        ? true
                        : false,
                    name:
                      e.Status == "ALL_COUNT"
                        ? "ALL"
                        : e.Status.split("-").join(" "),
                    totalCount: e.TotalCount,
                  };
                });
                self.policyCountData = countData.sort((a, b) =>
                  a.status_BE > b.status_BE ? 1 : -1
                );
                // console.log("calling in count api");
                self.getPolicyDataByBucket(bucketStatus, "15", 0);
                self.isLoading = false;
              } catch (error) {
                self.isLoading = false;
                self.onCustomDateRangeHandler(
                  self.defaultFilter.expiryDateFrom,
                  self.defaultFilter.expiryDateTo
                );
              }
            } else {
              self.isLoading = false;
              if (
                self.defaultFilter.expiryDateFrom >
                self.defaultFilter.expiryDateTo
              ) {
                self.showToast(
                  "Please select a valid Date Range",
                  self.TOST().WARNING
                );
              } else {
                self.showCustomDateRange = false;
                self.onCustomDateRangeHandler(
                  self.defaultFilter.expiryDateFrom,
                  self.defaultFilter.expiryDateTo
                );
              }
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast("Failed to fetch policy count", self.TOST().WARNING);
          });
      }
    },
    onDateChangeHandler() {
      let self = this;
      let expiryDateFrom = "";
      let expiryDateTo = "";
      let now = new Date();
      const checkSelectedOpn = self.selectedDateRangeOpn.value;
      let currentFirst = now.setMonth(now.getMonth());
      if (checkSelectedOpn == "N2M") {
        let currentLast = now.setMonth(now.getMonth() + 2);
        expiryDateFrom = moment(new Date(parseInt(currentFirst, 10))).format(
          "YYYY-MM-DD"
        );
        expiryDateTo = moment(new Date(parseInt(currentLast, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (checkSelectedOpn == "N3M") {
        let currentLast = now.setMonth(now.getMonth() + 3);
        expiryDateFrom = moment(new Date(parseInt(currentFirst, 10))).format(
          "YYYY-MM-DD"
        );
        expiryDateTo = moment(new Date(parseInt(currentLast, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (checkSelectedOpn == "DR") {
        expiryDateFrom = self.defaultFilter.expiryDateFrom;
        expiryDateTo = self.defaultFilter.expiryDateTo;
        this.showCustomDateRange = true;
      } else if (checkSelectedOpn == "CM") {
        let y = now.getFullYear();
        let m = now.getMonth();
        let firstDay = new Date(y, m, 1, 0);
        expiryDateFrom = moment(firstDay).format("YYYY-MM-DD");
        let lastDay = new Date(y, m + 1, 0);
        expiryDateTo = moment(lastDay).format("YYYY-MM-DD");
      }
      self.defaultFilter.expiryDateFrom = expiryDateFrom;
      self.defaultFilter.expiryDateTo = expiryDateTo;
    },
    getPolicyDataByBucket(status, limitValue, skip) {
      let self = this;
      // console.log(self.defaultFilter, "self.defaultFilter.lob");
      self.isLoading = true;
      this.headerForAll(status);
      this.selectedSinglePolicy = [];
      this.select = "";
      this.headerCheckbox = false;
      if (status) {
        self.bindActionFilterValues(status);
      }
      const filter = self.userData.RENEWAL_STATUS.filter(
        (e) => e.Status == status
      );
      let checkCount = self.policyCountData.filter(
        (e) => e.status_BE == self.statusIdNo
      );
      this.selectedBucket = filter[0].name;
      let obj = {};
      for (const [key, value] of Object.entries(filter[0])) {
        obj[key.split(" ").join("")] = value;
      }
      self.selectedBucketPermission = filter.length ? obj : {};
      const payload = {
        expiryFrom: self.defaultFilter.expiryDateFrom
          ? self.defaultFilter.expiryDateFrom
          : "",
        expiryTo: self.defaultFilter.expiryDateTo
          ? self.defaultFilter.expiryDateTo
          : "",
        status: status,
        productName: self.defaultFilter.lob,
        limit: limitValue,
        offset: skip,
        filter: {
          policy_no: this.searchData.policyNo,
          channel: this.searchData.channel,
          producer_code: this.searchData.producerCode,
        },
      };
      apiService("post", "/aigc/policySummary/policyFetch", payload)
        .then((res) => {
          const { statusCode, errMsg, data } = res.data;
          try {
            if (statusCode === 200) {
              self.policyLists = data.Items.map((e) => {
                return {
                  ...e,
                  communicationFailedMsg: {
                    "Communicaton Detail": {
                      Producer: {
                        EMAIL_status: e.RV_COMM_PRODUCER_EMAIL_STATUS,
                        SMS_status: e.RV_COMM_PRODUCER_SMS_STATUS,
                        "Failed Msg": e.RV_COMM_PRODUCER_FAILED_MSG,
                        Msg: e.RV_COMM_PRODUCER_MSG,
                        "Trigger At": e.RV_COMM_PRODUCER_TRIGGER_AT,
                        "Trigger By": e.RV_COMM_PRODUCER_TRIGGER_BY,
                        "Communication Id": e.RV_COMM_PRODUCER_ID,
                      },
                      Customer: {
                        EMAIL_status: e.RV_COMM_CUSTOMER_EMAIL_STATUS,
                        SMS_status: e.RV_COMM_CUSTOMER_SMS_STATUS,
                        "Failed Msg": e.RV_COMM_CUSTOMER_FAILED_MSG,
                        Msg: e.RV_COMM_CUSTOMER_MSG,
                        "Trigger At": e.RV_COMM_CUSTOMER_TRIGGER_AT,
                        "Trigger By": e.RV_COMM_CUSTOMER_TRIGGER_BY,
                        "Communicaion Id": e.RV_COMM_CUSTOMER_ID,
                      },
                    },
                  },
                   INCEPTION_DATE:moment(
                      new Date(e.INCEPTION_DATE)
                    ).format("YYYY-MM-DD"),
                    EXPIRY_DATE:moment(
                      new Date(e.EXPIRY_DATE)
                    ).format("YYYY-MM-DD"),
                };
              });
              self.TabledataForCheckbox = data.Items;
              self.totalListCount = data.Count;
              self.pageStartIndex = skip + 1;
              self.isLoading = false;
              // console.log(
              //   checkCount[0].totalCount,
              //   data.Count,
              //   "count fetch api"
              // );
              if (
                !self.searchData.policyNo &&
                !self.searchData.channel &&
                !self.searchData.producerCode
              ) {
                if (checkCount[0].totalCount != data.Count) {
                  console.log("calling in count equeat");
                  self.getPolicyCountData();
                }
              }
            }
            // if(this.refreshAPI==true){
            // setInterval(() => {
            //   console.log("refresh",this.refreshAPI)
            //   self.refreshAPI = !self.refreshAPI;
            // },1*60*1000);
            // }
          } catch (error) {
            self.dataLoader = false;
            console.log(error, "err");
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.policyLists = [];
          self.TabledataForCheckbox = [];
          self.showToast("Failed to fetch policy", self.TOST().WARNING);
        });
    },
    getDataForDownload() {
      let self = this;
      self.singlePolicy = self.selectedSinglePolicy.map((res) => {
        return {
          TXT_POLICY_NO_CHAR: res.TXT_POLICY_NO_CHAR,
          "NUM_REFERENCE_NUMBER-DATE_REFERENCE_DATE-PRODUCT_CODE":
            res["NUM_REFERENCE_NUMBER-DATE_REFERENCE_DATE-PRODUCT_CODE"],
        };
      });
      self.multiplePolicy = this.downloadMultiplePolicy.map((res) => {
        return {
          TXT_POLICY_NO_CHAR: res.TXT_POLICY_NO_CHAR,
          "NUM_REFERENCE_NUMBER-DATE_REFERENCE_DATE-PRODUCT_CODE":
            res["NUM_REFERENCE_NUMBER-DATE_REFERENCE_DATE-PRODUCT_CODE"],
        };
      });
    },
    downloadDueReportHandler() {
      let self = this;
      self.getDataForDownload();
      self.isLoading = true;
      const payload = {
        expiryFrom: self.defaultFilter.expiryDateFrom
          ? self.defaultFilter.expiryDateFrom
          : "",
        expiryTo: self.defaultFilter.expiryDateTo
          ? self.defaultFilter.expiryDateTo
          : "",
        productName: self.defaultFilter.lob,
        selected_policies: self.headerCheckbox
          ? self.multiplePolicy
          : self.singlePolicy,
      };
      let bucketStatus = self.selectedBucketPermission.Status;
      const checkPolicyCount = self.policyCountData.filter(
        (e) => e.status_BE == bucketStatus
      )[0];
      if (checkPolicyCount.totalCount >= 1) {
        apiService("post", "/aigc/policySummary/DueReport", payload)
          .then((res) => {
            const { statusCode, errMsg, data } = res.data;
            if (statusCode === 200) {
              this.downloadFileFromUrl(
                data,
                payload.productName + "_" + ".xlxs"
              );
              self.isLoading = false;
            } else {
              self.isLoading = false;
              self.showToast(
                "Something went wrong, try again",
                self.TOST().WARNING
              );
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast("Failed to due report", self.TOST().WARNING);
          });
      } else {
        self.isLoading = false;
        self.showToast("No policy for to download", self.TOST().WARNING);
      }
    },
    downloadBucketReportHandler() {
      let self = this;
      self.isLoading = true;
      self.getDataForDownload();
      const payload = {
        expiryFrom: self.defaultFilter.expiryDateFrom
          ? self.defaultFilter.expiryDateFrom
          : "",
        expiryTo: self.defaultFilter.expiryDateTo
          ? self.defaultFilter.expiryDateTo
          : "",
        productName: self.defaultFilter.lob,
        status: self.selectedBucketPermission.Status,
        selected_policies: self.headerCheckbox
          ? self.multiplePolicy
          : self.singlePolicy,
      };
      let bucketStatus = self.selectedBucketPermission.Status;
      const checkPolicyCount = self.policyCountData.filter(
        (e) => e.status_BE == bucketStatus
      )[0];
      if (checkPolicyCount.totalCount >= 1) {
        apiService("post", "/aigc/policySummary/BucketReport", payload)
          .then((res) => {
            const { statusCode, errMsg, data } = res.data;
            if (statusCode === 200) {
              this.downloadFileFromUrl(
                data,
                payload.productName + payload.status + "_" + ".xlxs"
              );
              self.isLoading = false;
            } else {
              self.isLoading = false;
              self.showToast(
                "Something went wrong Please try again.",
                self.TOST().WARNING
              );
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast(
              "Failed to download bucket report",
              self.TOST().WARNING
            );
          });
      } else {
        self.isLoading = false;
        self.showToast("No policy for to download", self.TOST().WARNING);
      }
    },
    downloadExtractReportHandler() {
      let self = this;
      self.isLoading = true;
      self.getDataForDownload();
      const payload = {
        expiryFrom: self.defaultFilter.expiryDateFrom
          ? self.defaultFilter.expiryDateFrom
          : "",
        expiryTo: self.defaultFilter.expiryDateTo
          ? self.defaultFilter.expiryDateTo
          : "",
        productName: self.defaultFilter.lob,
        status: self.selectedBucketPermission.Status,
        selected_policies: self.headerCheckbox
          ? self.multiplePolicy
          : self.singlePolicy,
      };
      let bucketStatus = self.selectedBucketPermission.Status;
      const checkPolicyCount = self.policyCountData.filter(
        (e) => e.status_BE == bucketStatus
      )[0];
      if (checkPolicyCount.totalCount >= 1) {
        apiService("post", "/aigc/policySummary/ExtractReport", payload)
          .then((res) => {
            const { statusCode, errMsg, data } = res.data;
            if (statusCode === 200) {
              this.downloadFileFromUrl(
                data,
                payload.productName + payload.status + "_" + ".xlxs"
              );
              self.isLoading = false;
            } else {
              self.isLoading = false;
              self.showToast(
                "Something went wrong, try again",
                self.TOST().WARNING
              );
            }
          })
          .catch((err) => {
            self.showToast(
              "Failed to download extract report",
              self.TOST().WARNING
            );
            self.isLoading = false;
          });
      } else {
        self.isLoading = false;
        self.showToast("No policy for to download", self.TOST().WARNING);
      }
    },
    downloadLimitedFieldHandler() {
      let self = this;
      self.isLoading = true;
      self.getDataForDownload();
      const payload = {
        expiryFrom: self.defaultFilter.expiryDateFrom
          ? self.defaultFilter.expiryDateFrom
          : "",
        expiryTo: self.defaultFilter.expiryDateTo
          ? self.defaultFilter.expiryDateTo
          : "",
        productName: self.defaultFilter.lob,
        status: self.selectedBucketPermission.Status,
        selected_policies: self.headerCheckbox
          ? self.multiplePolicy
          : self.singlePolicy,
      };
      let bucketStatus = self.selectedBucketPermission.Status;
      const checkPolicyCount = self.policyCountData.filter(
        (e) => e.status_BE == bucketStatus
      )[0];
      if (checkPolicyCount.totalCount >= 1) {
        apiService("post", "/aigc/PT/GenerateExcel", payload)
          .then((res) => {
            const { statusCode, errMsg, data } = res.data;
            if (statusCode === 200) {
              this.downloadFileFromUrl(
                data,
                payload.productName + payload.status + "_" + ".xlxs"
              );
              self.isLoading = false;
            } else {
              self.isLoading = false;
              self.showToast(
                "Something went wrong, try again",
                self.TOST().WARNING
              );
            }
          })
          .catch((err) => {
            self.isLoading = false;
            self.showToast(
              "Failed to download bucket report",
              self.TOST().WARNING
            );
          });
      } else {
        self.isLoading = false;
        self.showToast("No policy for to download", self.TOST().WARNING);
      }
    },
    downloadFileFromUrl(uri, name) {
      var link = document.createElement("a");
      link.download = name;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.$delete(link);
    },
    selectedPolicyDetails() {
      let self = this;
      if (
        self.select == "DOCIT" ||
        self.select == "FRN" ||
        self.select == "TTB"
      ) {
        self.policySingle = self.selectedSinglePolicy.map((res) => {
          return {
            TXT_POLICY_NO_CHAR: res.TXT_POLICY_NO_CHAR,
            NUM_REFERENCE_NUMBER: res["NUM_REFERENCE_NUMBER"],
          };
        });
        self.policyBulk = self.downloadMultiplePolicy.map((res) => {
          return {
            TXT_POLICY_NO_CHAR: res.TXT_POLICY_NO_CHAR,
            NUM_REFERENCE_NUMBER: res["NUM_REFERENCE_NUMBER"],
          };
        });
      } else if (self.select == "PLG" || self.select == "SC") {
        self.selectSinglePolicy = self.selectedSinglePolicy.map((res) => {
          return {
            TXT_POLICY_NO_CHAR: res.TXT_POLICY_NO_CHAR,
            NUM_REFERENCE_NUMBER: res.NUM_REFERENCE_NUMBER,
          };
        });
        self.selectMultiplePolicy = self.downloadMultiplePolicy.map((res) => {
          return {
            TXT_POLICY_NO_CHAR: res.TXT_POLICY_NO_CHAR,
            NUM_REFERENCE_NUMBER: res.NUM_REFERENCE_NUMBER,
          };
        });
      }
    },
    rvBulkActionHandler(currentID) {
      let self = this;
      self.isLoading = true;
      let status = self.selectedBucketPermission.Status;
      self.bindActionFilterValues(status);
      if (self.select == "DOCIT") {
        self.selectedPolicyDetails();
        let payload = {
          POLICY_DETAIL: self.headerCheckbox
            ? self.policyBulk
            : self.policySingle,
          USER_DETAIL: self.userData.USER_NAME,
          module: "DOCIT_SERVICE_CALL",
          PARENT_PRODUCT_NAME: "AIGC",
          RESPOND: null,
        };
        if (payload.POLICY_DETAIL.length >= 1) {
          apiService("post", "/aigc/SERVICE/DocGenerate", payload)
            .then((res) => {
              const { statusCode, errMsg, data } = res.data;
              if (statusCode === 200) {
                self.showToast(res.data.data, self.TOST().SUCCESS);
                this.dialogforConf = false;
                self.isLoading = false;
                console.log("calling in docgenerate api");

                this.getPolicyCountData();
              } else {
                self.policyLists = [];
                self.TabledataForCheckbox = [];
                self.isLoading = false;
                self.showToast(
                  "Something went wrong, try again",
                  self.TOST().WARNING
                );
              }
            })
            .catch((err) => {
              self.isLoading = false;
              self.policyLists = [];
              self.TabledataForCheckbox = [];
            });
        } else {
          self.isLoading = false;
          self.showToast(
            "Please Select at least 1 Policy",
            self.TOST().WARNING
          );
          setTimeout(() => {
            this.dialogforConf = false;
          }, 1000);
          this.ShowDialogBox(currentID);
        }
      } else if (self.select == "PT") {
        self.getDataForDownload();
        let bucket_to = this.select == "PT" ? "6" : status;
        let payload = {
          BUCKET_FROM: status,
          BUCKET_TO: bucket_to,
          VARIANT_NAME: self.defaultFilter.lob,
          EXPIRY_FROM: self.defaultFilter.expiryDateFrom,
          EXPIRY_TO: self.defaultFilter.expiryDateTo,
          POLICY_DETAIL: self.headerCheckbox
            ? self.multiplePolicy
            : self.singlePolicy,
          BULK_ACTION: false,
          USER_DETAIL: self.userData.USER_NAME,
        };
        console.log(payload.POLICY_DETAIL, "policy detail in ttb");
        if (payload.POLICY_DETAIL.length >= 1) {
          apiService("post", "/aigc/PT/BucketMovement", payload)
            .then((res) => {
              const { statusCode, errMsg, data } = res.data;
              if (statusCode === 200) {
                self.showToast(res.data.data.data.data, self.TOST().SUCCESS);
                this.dialogforConf = false;
                self.isLoading = false;
                this.getPolicyDataByBucket(status, "15", 0);
                this.getPolicyCountData();
                this.headerForAll(status);
              } else {
                self.policyLists = [];
                self.TabledataForCheckbox = [];
                self.isLoading = false;
                self.showToast(
                  "Something went wrong, try again",
                  self.TOST().WARNING
                );
              }
            })
            .catch((err) => {
              self.isLoading = false;
              self.policyLists = [];
              self.TabledataForCheckbox = [];
            });
        } else {
          self.isLoading = false;
          self.showToast(
            "Please Select at least 1 Policy",
            self.TOST().WARNING
          );
          setTimeout(() => {
            this.dialogforConf = false;
          }, 1000);
          this.ShowDialogBox(currentID);
        }
      } else if (self.select == "FRN") {
        self.selectedPolicyDetails();
        let payload = {
          POLICY_DETAIL: self.headerCheckbox
            ? self.policyBulk
            : self.policySingle,
          module: "DOCITFETCH_SERVICE_CALL",
          PARENT_PRODUCT_NAME: "AIGC",
          RESPOND: null,
          USER_DETAIL: self.userData.USER_NAME,
        };
        if (payload.POLICY_DETAIL.length >= 1) {
          apiService("post", "/aigc/SERVICE/DocFetch", payload)
            .then((res) => {
              const { statusCode, errMsg, data } = res.data;
              if (statusCode === 200) {
                self.isLoading = false;
                self.showToast(data, self.TOST().SUCCESS);
                this.dialogforConf = false;
                console.log("calling in docfetch api");

                self.getPolicyCountData();
              } else {
                self.showToast(
                  "Something went wrong, try again",
                  self.TOST().WARNING
                );
                self.isLoading = false;
              }
            })
            .catch((err) => {
              self.isLoading = false;
              self.showToast(
                "Something went wrong, try again",
                self.TOST().WARNING
              );
            });
        } else {
          self.isLoading = false;
          self.showToast(
            "Please Select at least 1 Policy",
            self.TOST().WARNING
          );
          setTimeout(() => {
            this.dialogforConf = false;
          }, 1000);
          this.ShowDialogBox(currentID);
        }
      } else if (self.select == "PLG") {
        self.selectedPolicyDetails();
        let payload = {
          POLICY_DETAIL: self.headerCheckbox
            ? self.selectMultiplePolicy
            : self.selectSinglePolicy,
          module: "PAYLINK_SERVICE_CALL",
          PARENT_PRODUCT_NAME: "AIGC",
          RESPOND: null,
          USER_DETAIL: self.userData.USER_NAME,
        };
        if (payload.POLICY_DETAIL.length >= 1) {
          apiService("post", "/aigc/SERVICE/PayLinkGenerate", payload)
            .then((res) => {
              const { statusCode, errMsg, data } = res.data;
              if (statusCode === 200) {
                self.isLoading = false;
                self.showToast(data, self.TOST().SUCCESS);
                this.dialogforConf = false;
                console.log("calling in paylink api");

                self.getPolicyCountData();
              } else {
                self.showToast(
                  "Something went wrong, try again",
                  self.TOST().WARNING
                );
                self.isLoading = false;
              }
            })
            .catch((err) => {
              self.isLoading = false;
              self.showToast(
                "Something went wrong, try again",
                self.TOST().WARNING
              );
            });
        } else {
          self.isLoading = false;
          self.showToast(
            "Please Select at least 1 Policy",
            self.TOST().WARNING
          );
          setTimeout(() => {
            this.dialogforConf = false;
          }, 1000);
          this.ShowDialogBox(currentID);
        }
      } else if (self.select == "SC") {
        self.selectedPolicyDetails();
        let payload = {
          POLICY_DETAIL: self.headerCheckbox
            ? self.selectMultiplePolicy
            : self.selectSinglePolicy,
          module: "COMMUNICATION_SERVICE_CALL",
          PARENT_PRODUCT_NAME: "AIGC",
          RESPOND: null,
          USER_DETAIL: self.userData.USER_NAME,
        };
        if (payload.POLICY_DETAIL.length >= 1) {
          apiService("post", "/aigc/SERVICE/Communication", payload)
            .then((res) => {
              const { statusCode, errMsg, data } = res.data;
              if (statusCode === 200) {
                self.isLoading = false;
                self.showToast(data, self.TOST().SUCCESS);
                this.dialogforConf = false;
                console.log("calling in comm api");

                self.getPolicyCountData();
              } else {
                self.showToast(
                  "Something went wrong, try again",
                  self.TOST().WARNING
                );
                self.isLoading = false;
              }
            })
            .catch((err) => {
              self.isLoading = false;
              self.showToast(
                "Something went wrong, try again",
                self.TOST().WARNING
              );
            });
        } else {
          self.isLoading = false;
          self.showToast(
            "Please Select at least 1 Policy",
            self.TOST().WARNING
          );
          setTimeout(() => {
            this.dialogforConf = false;
          }, 1000);
          this.ShowDialogBox(currentID);
        }
      } else if (self.select == "TTB") {
        self.selectedPolicyDetails();
        let payload = {
          POLICY_DETAIL: self.headerCheckbox
            ? self.policyBulk
            : self.policySingle,
          module: "BRE_SERVICE_CALL",
          PARENT_PRODUCT_NAME: "AIGC",
          RESPOND: null,
          USER_DETAIL: self.userData.USER_NAME,
        };
        console.log(payload.POLICY_DETAIL, "policy detail in ttb");
        if (payload.POLICY_DETAIL.length >= 1) {
          apiService("post", "/aigc/SERVICE/PremiumCompute", payload)
            .then((res) => {
              const { statusCode, errMsg, data } = res.data;
              if (statusCode === 200) {
                self.showToast(res.data.data, self.TOST().SUCCESS);
                this.dialogforConf = false;
                self.isLoading = false;
                this.getPolicyDataByBucket(status, "15", 0);
                console.log("calling in premium compt api");

                this.getPolicyCountData();
              } else {
                self.policyLists = [];
                self.TabledataForCheckbox = [];
                self.isLoading = false;
                self.showToast(
                  "Something went wrong, try again",
                  self.TOST().WARNING
                );
              }
            })
            .catch((err) => {
              self.isLoading = false;
              self.policyLists = [];
              self.TabledataForCheckbox = [];
            });
        } else {
          self.isLoading = false;
          self.showToast(
            "Please Select at least 1 Policy",
            self.TOST().WARNING
          );
          setTimeout(() => {
            this.dialogforConf = false;
          }, 1000);
          this.ShowDialogBox(currentID);
        }
      }
    },
    downloadLogs(downloadOpt, policyNo, numRefNo) {
      let self = this;
      self.isLoading = true;
      let payload = {
        POLICY_DETAIL: [
          {
            TXT_POLICY_NO_CHAR: policyNo,
            NUM_REFERENCE_NUMBER: numRefNo,
          },
        ],
        RESPOND: downloadOpt,
        USER_DETAIL: self.userData.USER_NAME,
        module: "BRE_SERVICE_CALL",
        PARENT_PRODUCT_NAME: "AIGC",
      };
      apiService("post", "/aigc/SERVICE/PremiumCompute", payload)
        .then((res) => {
          const { statusCode, errMsg, data } = res.data;
          if (statusCode === 200) {
            let name = policyNo + payload.RESPOND + ".json";
            const a = document.createElement("a");
            const type = name.split(".").pop();
            a.href = URL.createObjectURL(
              new Blob([JSON.stringify(res.data.data[0].value, null, 4)], {
                type: `text/${type === "txt" ? "plain" : type}`,
              })
            );
            a.download = name;
            a.click();
            self.isLoading = false;
          } else {
            self.showToast(
              "Not able to Download the File",
              self.TOST().WARNING
            );
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.showToast(
            "Something went wrong, try again",
            self.TOST().WARNING
          );
        });
    },
    dataDownload(policyNo, numRefNo) {
      this.policyNo = policyNo;
      this.numRefNo = numRefNo;
      this.actionDialogBre = true;
    },
    downloadBreData() {
      let self = this;
      if (
        self.valueOfGRadio == "REQUEST" ||
        self.valueOfGRadio == "RESPONSE" ||
        self.valueOfGRadio == "POLICY_DETAIL"
      ) {
        self.downloadBreFun(self.policyNo, self.numRefNo);
      } else {
        self.generateDocITService(self.policyNo, self.numRefNo);
      }
    },
    downloadBreFun(policyNo, numRefNo) {
      let self = this;
      self.isLoading = true;
      let payload = {
        POLICY_DETAIL: [
          {
            TXT_POLICY_NO_CHAR: policyNo,
            NUM_REFERENCE_NUMBER: numRefNo,
          },
        ],
        RESPOND: this.valueOfGRadio,
        USER_DETAIL: self.userData.USER_NAME,
        module: "BRE_SERVICE_CALL",
        PARENT_PRODUCT_NAME: "AIGC",
      };
      apiService("post", "/aigc/SERVICE/PremiumCompute", payload)
        .then((res) => {
          const { statusCode, errMsg, data } = res.data;
          if (statusCode === 200) {
            this.downloadTextFile(
              JSON.stringify(res.data.data[0].value, null, 4),
              policyNo + payload.RESPOND + ".json"
            );
            self.isLoading = false;
            self.valueOfGRadio = "";
            self.actionDialogBre = false;
          } else {
            self.showToast(
              "Not able to Download the File",
              self.TOST().WARNING
            );
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.showToast(
            "Something went wrong, try again",
            self.TOST().WARNING
          );
        });
    },
    downloadTextFile(text, name) {
      const a = document.createElement("a");
      const type = name.split(".").pop();
      a.href = URL.createObjectURL(
        new Blob([text], {
          type: `text/${type === "txt" ? "plain" : type}`,
        })
      );
      a.download = name;
      a.click();
    },
    generateDocITService(policyNo, numRefNo) {
      let self = this;
      self.isLoading = true;
      let payload = {
        POLICY_DETAIL: [
          {
            TXT_POLICY_NO_CHAR: policyNo,
            NUM_REFERENCE_NUMBER: numRefNo,
          },
        ],
        USER_DETAIL: self.userData.USER_NAME,
        module: "DOCIT_SERVICE_CALL",
        PARENT_PRODUCT_NAME: "AIGC",
        RESPOND: this.valueOfGRadio.replace(/DOCIT-/g, ""),
      };
      apiService("post", "/aigc/SERVICE/DocGenerate", payload)
        .then((res) => {
          const { statusCode, errMsg, data } = res.data;
          if (statusCode === 200) {
            this.downloadTextFile(
              JSON.stringify(res.data.data[0].value, null, 4),
              policyNo + payload.RESPOND + ".json"
            );
            self.isLoading = false;
            self.valueOfGRadio = "";
            self.actionDialogBre = false;
          } else {
            self.showToast(
              "Not able to Download the File",
              self.TOST().WARNING
            );
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.showToast(
            "Something went wrong, try again",
            self.TOST().WARNING
          );
        });
    },
    downloadRNData(policyNo, numRefNo, rnLink) {
      let self = this;
      self.policyNo = policyNo;
      self.numRefNo = numRefNo;
      self.rnLink = rnLink;
      self.actionDialogRN = true;
    },
    downloadActionRN() {
      let self = this;
      if (self.valueOfGRadioRN == "RNDOWNLOAD") {
        self.downloadRNLink(self.rnLink);
      } else if (
        self.valueOfGRadioRN == "REQUEST" ||
        self.valueOfGRadioRN == "RESPONSE"
      ) {
        self.payLinkGenerate(self.policyNo, self.numRefNo);
      } else if (
        self.valueOfGRadioRN == "COMM-REQUEST" ||
        self.valueOfGRadioRN == "COMM-RESPONSE"
      ) {
        self.sendCommunication(self.policyNo, self.numRefNo);
      }
    },
    modifyPolicy(policyData) {
      let data = [];
      this.policyData = policyData;
      if (this.selectedBucketPermission.Status == 6) {
        this.drawer.show = true;
        this.drawer.isEditable = true;
      } else {
        this.drawer.show = false;
        this.drawer.isEditable = false;
      }
      for (const [key, value] of Object.entries(policyData)) {
        data.push({
          fieldName: key,
          data: value,
          newData: value,
          isEditable: this.editableFields[key] ? true : false,
          show: this.showModifyData[key] ? true : false,
        });
      }
      this.showModifyResponseData = data
        .filter((e) => e.show == true)
        .sort((a, b) => (a.isEditable > b.isEditable ? -1 : 0));
      this.modifyResponseData = this.showModifyResponseData;
    },
    putDataModification() {
      let self = this;
      self.isLoading = true;
      let modify_requeest_obj = {
        policies: {
          TXT_POLICY_NO_CHAR: this.policyData.TXT_POLICY_NO_CHAR,
          "NUM_REFERENCE_NUMBER-DATE_REFERENCE_DATE-PRODUCT_CODE":
            this.policyData[
              "NUM_REFERENCE_NUMBER-DATE_REFERENCE_DATE-PRODUCT_CODE"
            ],
          SOL_ID: this.modifyResponseData[2].newData
            ? this.modifyResponseData[2].newData
            : "",
          OFFICE_BRANCH_LOCATION_CODE: this.modifyResponseData[0].newData
            ? this.modifyResponseData[0].newData
            : "",
          RM_CODE: this.modifyResponseData[1].newData
            ? this.modifyResponseData[1].newData
            : "",
          PRODUCER_CODE: this.modifyResponseData[3].newData
            ? this.modifyResponseData[3].newData
            : "",
        },
        USER_DETAIL: self.userData.USER_NAME,
      };
      apiService("post", "/aigc/PT/UpdateDetail", modify_requeest_obj)
        .then(function (response) {
          if (response.data.statusCode) {
            self.isLoading = false;
            self.showToast("Policy modified successfully", self.TOST().SUCCESS);
            self.drawer.show = false;
            console.log("calling in update detail api");

            self.getPolicyCountData();
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.showToast(
            "Something went wrong, try again",
            self.TOST().WARNING
          );
        });
    },
    PtModificationExcelUpdate() {
      return new Promise((resolve, reject) => {
        let self = this;
        self.isLoading = true;
        if (self.selectFileData) {
          if (self.selectedFileName) {
            let formData = new FormData();
            formData.append("policies", self.selectFileData[0]);
            formData.append("USER_DETAIL", self.userData.USER_NAME);
            apiService("post", "/aigc/PT/UpdateDetail", formData)
              .then(function (response) {
                if (response.status == 200) {
                  self.dialog2 = false;
                  self.isLoading = false;
                  self.selectFileData = null;
                  self.selectedFileName = null;
                  resolve(response);
                } else {
                  self.isLoading = false;
                  reject(
                    "PT Modification Error ---->",
                    JSON.stringify(response)
                  );
                }
              })
              .catch(function (error) {
                self.isLoading = false;
                reject(error);
              });
          } else {
            self.isLoading = false;
            self.showToast("Please add a file to upload", self.TOST().WARNING);
            reject("Modification Action Error");
          }
        } else {
          self.isLoading = false;
          self.showToast("Please add a file to upload", self.TOST().WARNING);
          reject("Modification Action Error");
        }
      });
    },
    downloadRNLink(url) {
      let self = this;
      if (url == "") {
        self.showToast(
          "Something went wrong Please try again.",
          self.TOST().WARNING
        );
      } else {
        var link = document.createElement("a");
        link.href = url;
        link.style = "visibility:hidden";
        link.download = url;
        document.body.appendChild(link);
        window.open(url, "_blank");
        document.body.removeChild(link);
      }
    },
    payLinkGenerate(policyNo, numRefNo) {
      let self = this;
      self.isLoading = true;
      let payload = {
        POLICY_DETAIL: [
          {
            TXT_POLICY_NO_CHAR: policyNo,
            NUM_REFERENCE_NUMBER: numRefNo,
          },
        ],
        module: "PAYLINK_SERVICE_CALL",
        PARENT_PRODUCT_NAME: "AIGC",
        RESPOND: self.valueOfGRadioRN == "" ? null : self.valueOfGRadioRN,
        USER_DETAIL: self.userData.USER_NAME,
      };
      apiService("post", "/aigc/SERVICE/PayLinkGenerate", payload)
        .then((res) => {
          const { statusCode, errMsg, data } = res.data;
          if (statusCode === 200) {
            self.isLoading = false;
            if (payload.RESPOND == null) {
              self.showToast(data, self.TOST().SUCCESS);
              this.dialogforConf = false;
              console.log("calling in paylonk generate api");

              self.getPolicyCountData();
            } else {
              this.downloadTextFile(
                JSON.stringify(res.data.data[0].value, null, 4),
                policyNo + payload.RESPOND + ".json"
              );
              self.valueOfGRadioRN = "";
              self.actionDialogRN = false;
            }
          } else {
            self.showToast(
              "Something went wrong, try again",
              self.TOST().WARNING
            );
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.showToast(
            "Something went wrong, try again",
            self.TOST().WARNING
          );
        });
    },
    copyBitlyLink(url) {
      navigator.clipboard
        .writeText(url)
        .then((res) => {
          console.log("Text copied to clipboard", this.biltyLink);
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
        });
    },
    sendCommunication(policyNo, numRefNo) {
      let self = this;
      self.isLoading = true;
      let payload = {
        POLICY_DETAIL: [
          {
            TXT_POLICY_NO_CHAR: policyNo,
            NUM_REFERENCE_NUMBER: numRefNo,
          },
        ],
        module: "COMMUNICATION_SERVICE_CALL",
        PARENT_PRODUCT_NAME: "AIGC",
        RESPOND: self.valueOfGRadioRN.replace(/COMM-/g, ""),
        USER_DETAIL: self.userData.USER_NAME,
      };
      apiService("post", "/aigc/SERVICE/Communication", payload)
        .then((res) => {
          const { statusCode, errMsg, data } = res.data;
          if (statusCode === 200) {
            self.isLoading = false;
            if (payload.RESPOND == null) {
              self.showToast(data, self.TOST().SUCCESS);
              this.dialogforConf = false;
              console.log("calling in communication api");

              self.getPolicyCountData();
            } else {
              this.downloadTextFile(
                JSON.stringify(res.data.data[0].value, null, 4),
                policyNo + payload.RESPOND + ".json"
              );
              self.valueOfGRadioRN = "";
              self.actionDialogRN = false;
            }
          } else {
            self.showToast(
              "Something went wrong, try again",
              self.TOST().WARNING
            );
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          self.showToast(
            "Something went wrong, try again",
            self.TOST().WARNING
          );
        });
    },
    auditWorkFlowData(polNo, numRefNo, item) {
      this.policyData = item;
      // this.selectPol = polNo;
      let self = this;
      self.auditWorkflowStatus = [];
      self.dialogforAudit = true;
      let payload = {
        POLICY_NUMBER: polNo,
        NUM_REFERENCE_NUMBER: numRefNo,
        PARENT_PRODUCT_NAME: "AIGC",
        module: "AUDIT_LOG",
        sub_module: "POLICY_LOGS",
      };
      apiService("post", "/aigc/audit/policy/Logs", payload)
        .then(function (response) {
          if (response.status == 200) {
            self.isLoading = false;
            let result = response.data.data.Items;
            self.auditWorkflowStatus = result.map((e) => {
              return {
                RV_ACTION_AT: e.RV_ACTION_AT || "---",
                RV_ACTION_BY: e.RV_ACTION_BY || "---",
                RV_ACTION_DESC: e.RV_ACTION_DESC || "---",
              };
            });
          } else {
            self.dataLoader = false;
            self.auditWorkflowStatus = [];
          }
        })
        .catch(function (error) {
          self.auditWorkflowStatus = [];
          self.isLoading = false;
        });
    },
    auditSingleFileDownload() {
      let self = this;
      let request = {
        POLICY_NUMBER: this.policyData.TXT_POLICY_NO_CHAR,
        NUM_REFERENCE_NUMBER: this.policyData.NUM_REFERENCE_NUMBER,
        REVISION: parseInt(this.policyData.NUM_REVISION),
        PARENT_PRODUCT_NAME: "AIGC",
        module: "AUDIT_LOG",
        sub_module: "POLICY_LOGS_REPORT",
      };
      self.isLoading = true;
      apiService("post", "/aigc/audit/policy/Download/SingleLog", request)
        .then((response) => {
          if (response.status == 200) {
            self.downloadFileFromUrl(
              response.data.data,
              request + "_" + ".xlxs"
            );
            self.isLoading = false;
          } else {
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          console.log(err);
        });
    },
    auditTrailDownload() {
      let self = this;
      let request = {
        POLICY_NUMBER: this.policyData.TXT_POLICY_NO_CHAR,
        NUM_REFERENCE_NUMBER: this.policyData.NUM_REFERENCE_NUMBER,
        PARENT_PRODUCT_NAME: "AIGC",
        module: "AUDIT_LOG",
        sub_module: "POLICY_LOGS_REPORT",
      };
      self.isLoading = true;
      apiService("post", "/aigc/audit/policy/Download/LogReport", request)
        .then((response) => {
          if (response.status == 200) {
            self.downloadFileFromUrl(
              response.data.data,
              request + "_" + ".xlxs"
            );
            self.isLoading = false;
          } else {
            self.isLoading = false;
          }
        })
        .catch((err) => {
          self.isLoading = false;
          console.log(err);
        });
    },
  },
  watch: {
    defaultFilter: {
      handler(newValue, oldValue) {
        console.log("calling in handler");
        this.getPolicyCountData();
      },
      deep: true,
    },
    // refreshAPI(newVal, oldVal) {
    //   if (newVal != oldVal) {
    //     console.log(newVal, oldVal, "new old val", this.refreshAPI);
    //     this.getPolicyCountData();
    //   }
    // },
  },
};
</script>

<style scoped>
.highlight {
  border: 1px solid #01afcb;
  opacity: 1;
  width: 142px;
  height: 81px;
  color: #01afcb;
  background-image: linear-gradient(#ffffff, #e6e6e6);
  box-shadow: 0px 0px 12px #0073bb4d;
}
.dropdown-content {
  display: none;
  position: absolute;
  top: 24px;
  left: -16px;
  background-color: white;
  min-width: 123px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content p:hover {
  background-color: white;
  padding: 8px 7px 0px 12px;
}
.dropdown-content p {
  color: black;
  padding: 8px 7px 0px 12px;
  text-align: initial;
  text-decoration: none;
  display: block;
}
.dropbtn {
  height: 31px;
  border-radius: 4px;
  background-color: #2a811b;
  color: white;
  text-transform: capitalize;
  font-size: 13px;
  top: 4px;
}
.dropbtn:hover .dropdown-content {
  display: block;
}
.dropdown-action {
  display: none;
  position: absolute;
  bottom: -25px;
  right: 25px;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
.dropdown-action p {
  top: 10px;
  color: black;
  padding: 8px 7px 0px 12px;
  text-align: initial;
  text-decoration: none;
  display: block;
  font-weight: 400;
  z-index: 1000;
}
.menubtn:hover .dropdown-action {
  display: block;
}
.table-col-policyNo {
  background-color: #eff3f4;
  padding: 10px;
  color: #0073bb;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 600;
}
.view-btn-model {
  width: 112px;
  height: 35px;
  background-color: #0073bb;
  text-transform: capitalize;
  justify-content: start;
  /* right: 190px; */
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  justify-content: center;
}
.clear-btn-model {
  width: 100px;
  height: 35px;
  background-color: #ffffff;
  color: #646666 !important;
  border: 1.5px solid #ccc;
  border-radius: 3px;
  text-transform: capitalize;
}
.update-btn-model {
  width: auto;
  height: 35px;
  background-color: #0073bb;
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  text-transform: capitalize;
}
.dropuploadbtn {
  height: 31px;
  border-radius: 4px;
  background-color: #e46a25;
  color: white;
  text-transform: capitalize;
  font-size: 13px;
  top: 4px;
}
.dropdown-content-upload {
  display: none;
  position: absolute;
  top: 24px;
  right: -47px;
  background-color: white;
  min-width: 128px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content-upload p {
  color: black;
  padding: 8px 7px 0px 12px;
  text-align: initial;
  text-decoration: none;
  display: block;
}
.dropuploadbtn:hover .dropdown-content-upload {
  display: block;
}
.auditTrail_table .theme--light.v-table tbody tr:nth-child(odd) {
  background-color: #e9eff7;
}

.auditTrail_table .theme--light.v-table tbody tr:nth-child(even) {
  background-color: #d1deef;
}
.auditTrail_table .v-table__overflow table thead tr th {
  background-color: #5b9bd5 !important;
  color: white;
}
#labelForUpload {
  text-align: center;
  display: flex;
  justify-content: center;
  padding: 51px 0px 0px 0px;
  font-size: 15px;
}
.uploadDiv {
  margin: 0 auto;
  margin-top: 30px;
  height: 120px;
  width: 475px;
  background-color: rgb(238, 235, 235);
  outline: 1px dashed black;
}
input[type="file"] {
  display: none;
}
</style>
