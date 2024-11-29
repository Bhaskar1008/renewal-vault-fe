<template>
  <v-app style="background-color: #b5c1c433">
    <v-form ref="formdata">
      <v-flex class="d-flex mb-6" color="grey lighten-2" flat tile>
        <v-flex class="d-flex" color="grey lighten-2" flat tile>
          <v-flex class="pa-2" outlined tile style="display: flex">
            <v-text
              class="body-2 font-weight-bold mt-4"
              style="color: #1e83c2; margin-left: 20px"
              >Policy Summary -
            </v-text>
            <span>
              <p
                class="body-2 font-weight-bold"
                style="color: #e46a25; margin-left: 8px; margin-top: 23px"
              >
                {{
                  expiryDateFrom
                    ? expiryDateFrom.split("-")[0] +
                      "-" +
                      monthNames[parseInt(expiryDateFrom.split("-")[1]) - 1] +
                      "-" +
                      expiryDateFrom.split("-")[2]
                    : expiryDateFrom
                }}
                To
                {{
                  expiryDateTo
                    ? expiryDateTo.split("-")[0] +
                      "-" +
                      monthNames[parseInt(expiryDateTo.split("-")[1]) - 1] +
                      "-" +
                      expiryDateTo.split("-")[2]
                    : expiryDateTo
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
          style="max-width: 260px; right: 30px"
        >
          <p class="font-weight-bold mb-1 caption" style="color: #646666">
            Select Line of Business *
          </p>
          <v-select
            class="main_dropdown"
            id="lineOfBusiness"
            solo
            hide-details
            label="Select line of business"
            v-model="policyLOB"
            :items="lobDataArray"
            item-text="NUM_IL_PRODUCT_NAME"
            item-value="NUM_IL_PRODUCT_CODE"
            return-object
            @change="getPolicyCountData()"
          ></v-select>
        </v-flex>

        <v-flex class="pa-2" outlined tile xs3 style="max-width: 232px">
          <p
            class="font-weight-bold mb-1 caption"
            style="color: #646666; margin-left: 15px"
          >
            Select Policy End Date *
          </p>
          <v-select
            solo
            hide-details
            class="main_dropdown"
            :items="expiryDate"
            item-text="text"
            item-value="value"
            label="YYYY/MM/DD"
            v-model="selectedDate"
            style="max-width: 180px; left: 15px"
            @input="getDateRange(true)"
            return-object
          >
          </v-select>
        </v-flex>
      </v-flex>
      <!-- Buckets -->

      <v-layout row wrap class="ml-4 mt-2" style="position: relative">
        <v-flex
          v-for="rv in policyCountData"
          :key="rv.name"
          class="d-flex justify-start mb-6 bucket-card"
          color="grey lighten-2"
          flat
          tile
          min-height="180"
        >
          <v-card
            :key="rv.status_BE"
            class="v-card pa-2 mv-card mr-4 mb-3"
            :class="
              rv.name.split('_').join(' ').toLowerCase() ===
              statusLabel.split('_').join(' ').toLowerCase()
                ? rv.selected === true
                  ? 'highlight'
                  : ''
                : ''
            "
            :v-model="rv.status_BE"
            :style="
              rv.selected === true
                ? 'background-color:white;color:rgb(30,131,194);cursor:pointer'
                : 'background-color:rgba(181,181,181,1);color:white;'
            "
            style="border-radius: 6px"
            @click="
              getPolicyCountData(true);
              temploader(true);
              clearAllSearch();
              filterByWorkflow = null;
              limitValue = 15;
              offset = 0;
              statusNo = rv.status_BE;
              statusIdNo = rv.status_BE;
              selectedSinglePolicy = [];
              headerForAll(rv.status_BE);
              bindActionFilterValues(rv.status_BE);
              setFeatureFunctionality(rv.status_BE);
              bucketFeatureHandler();
              rv.selected !== true && notEditableFeatureHandler();
              notEditableFeature = !rv.selected;
            "
          >
            <v-card-text style="padding: 2px 8px">
              <div class="font-weight-bold card-num">
                {{ rv.totalCount }}
              </div>
              <p class="card-lab">
                {{ rv.name.replaceAll("_", " ") }}
              </p>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-form>
    <div class="ma-3" v-if="bulkActionConfig.loading">
      <v-card
        style="background-color: white; margin-bottom: 5px; color: #e57232"
        dark
      >
        <v-card-text>
          Please wait policies are moving from
          {{ bulkActionConfig.bucketFrom.toLowerCase() }} to
          {{ bulkActionConfig.bucketTo.toLowerCase() }}
          <v-progress-linear
            color="green"
            class="mb-0"
            :value="bulkActionConfig.completedPercentage"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </div>
    <v-card class="ma-3 pa-4" style="position: relative; bottom: 15px">
      <div style="display: flex" class="justify-space-between mb-4">
        <v-text
          class="font-weight-bold"
          style="color: #1e83c2; justify-content: flex-start"
        >
          <span>Policy Lists</span> &nbsp; &nbsp; &nbsp; &nbsp;
          <v-text class="table-bucketlabel">
            {{ statusLabel ? statusLabel.split("_").join(" ") : "" }}
          </v-text>
        </v-text>
        <div
          class="main_dropdown"
          style="display: flex; justify-content: flex-end"
        >
          <v-flex
            xs12
            sm6
            d-flex
            class="cust_pr bulk-action-select"
            v-if="bulkAction == true"
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
          <v-flex
            xs12
            sm6
            d-flex
            class="cust_pr filter-enabled bulk-action-select"
            v-if="filterBy == true"
          >
            <label style="margin-top: -14px">Filter By</label>
            <v-select
              clearable
              :items="filterItems"
              v-model="filterByWorkflow"
              ref="selectedEl"
              hide-details
              @input="getBREpendingData(15, '0', statusNo)"
              item-text="ActionName"
              item-value="ID"
              label="Select Status"
              solo
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
            v-if="optSearch == true"
            @click="dialog = true"
          >
            <v-icon style="margin-right: 9px" small>search</v-icon>Search
          </v-btn>

          <v-btn
            class="dropbtn"
            style="background-color: #2a811b; color: white"
            v-if="downloadExcel == true"
          >
            <v-icon style="margin-right: 9px" small>mdi-download</v-icon>
            Download Excel
            <div class="dropdown-content">
              <p
                v-if="competedRecord == true"
                @click="downloadExcelByPolicies('completed')"
              >
                Complete Record
              </p>
              <v-divider></v-divider>
              <p
                v-if="limtedRecord == true && statusIdNo == '4'"
                @click="downloadExcelByPolicies('limited')"
              >
                Limited Fields (Upload Format)
              </p>
              <v-divider></v-divider>
              <p
                v-if="statusIdNo == '7'"
                @click="downloadExcelByPolicies('bulkRenewalLink')"
              >
                Bulk Renewal Link
              </p>
            </div>
          </v-btn>
          <v-btn
            class="dropbtn"
            style="background-color: #2a811b; color: white"
            v-if="downloadBreLogs == true || downloadforCCM == true"
          >
            <v-icon style="margin-right: 9px" small>mdi-download</v-icon>
            Download
            <div class="dropdown-content">
              <p v-if="downloadBreLogs == true" @click="downloadPolicyLogs()">
                BRE-logs
              </p>
              <p v-if="downloadforCCM == true" @click="downloadPolicyLogs()">
                Communication-Logs
              </p>
            </div>
          </v-btn>

          <v-btn
            class="dropuploadbtn"
            style="background-color: #e46a25; color: white"
            v-if="uploadBtn == true"
          >
            <v-icon style="margin-right: 9px" small>mdi-upload</v-icon>upload
            <div class="dropdown-content-upload">
              <p @click="ptBulkUpload('bulkbre')">Bulk BRE Trigger</p>
              <v-divider></v-divider>
              <p @click="ptBulkUpload('bulkupdate')">Bulk Update</p>
            </div>
          </v-btn>
        </div>
      </div>

      <!-- TABLEDATA -->
      <div>
        <template>
          <v-data-table
            no-data-text="No data available"
            :headers="headers"
            :items="Tabledata"
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
                    @change="toggleAll($event, Tabledata)"
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
              <td
                v-for="item of headers"
                :key="item.text"
                class="text-xs-justify pr-2"
                style="background-color: #eff3f4; height: 69px"
              >
                <div v-if="item.value === 'STAGE'">
                  {{ productTableOpt[policyLOB.NUM_IL_PRODUCT_NAME] }}
                </div>
                <div v-else-if="item.value === 'TXT_POLICY_NO'">
                  <a
                    class="table-col-policyNo"
                    v-if="ptModificationRights == true"
                    @click.stop="
                      drawer = !drawer;
                      getDataModification(
                        props.item.TXT_VEHICLE_CLASS,
                        props.item.TXT_POLICY_NO,
                        props.item
                      );
                    "
                    >{{ props.item.TXT_POLICY_NO }}</a
                  >

                  <a class="table-col-policyNo" v-else>
                    {{ props.item.TXT_POLICY_NO }}
                  </a>
                </div>
                <div v-else-if="item.value === 'POLICY_NO'">
                  <a
                    class="table-col-policyNo"
                    v-if="ptModificationRights == true"
                    @click.stop="
                      drawer = !drawer;
                      getDataModification(
                        props.item.TXT_VEHICLE_CLASS,
                        props.item.POLICY_NO,
                        props.item
                      );
                    "
                    >{{ props.item.POLICY_NO }}</a
                  >

                  <a class="table-col-policyNo" v-else>
                    {{ props.item.POLICY_NO }}
                  </a>
                </div>

                <div v-else-if="item.value === 'WORKFLOW_STATUS'">
                  <a
                    @click="
                      dataLoader = true;
                      auditWorkFlowData(
                        props.item.TXT_VEHICLE_CLASS,
                        props.item.TXT_POLICY_NO || props.item.POLICY_NO,
                        props.item
                      );
                    "
                    style="text-decoration: underline"
                  >
                    {{ props.item.WORKFLOW_STATUS }}
                  </a>
                </div>

                <div v-else-if="item.value === 'RENEWAL_STATUS'">
                  <p
                    v-if="
                      props.item.RENEWAL_STATUS.toLowerCase() === 'bre-success'
                    "
                    class="classSuccess"
                  >
                    SUCCESS
                  </p>
                  <p
                    v-else-if="
                      props.item.RENEWAL_STATUS.toLowerCase() ===
                      'bre-inprogress'
                    "
                    class="classProgress"
                  >
                    INPROGRESS
                  </p>

                  <p
                    v-else-if="
                      props.item.RENEWAL_STATUS.toLowerCase() === 'renewed'
                    "
                    class="classFailed"
                  >
                    RENEWED
                  </p>
                  <p
                    v-else-if="
                      props.item.RENEWAL_STATUS.toLowerCase() === 'lapsed'
                    "
                    class="classFailed"
                  >
                    LAPSED
                  </p>
                  <p
                    v-else-if="
                      props.item.RENEWAL_STATUS.toLowerCase() === 'Declined'
                    "
                    class="classFailed"
                  >
                    DECLINED
                  </p>
                  <p v-else class="classSubmitted">
                    {{ props.item.RV_STATUS }}
                  </p>
                </div>

                <div
                  v-else-if="item.value === 'REMARKS'"
                  style="display: flex; align-items: center"
                >
                  {{ props.item.REMARKS }}
                  <v-tooltip left class="ml-2" style="display: flex">
                    <v-icon slot="activator" small style="margin-left: 10px"
                      >info</v-icon
                    ><span>{{ props.item.SENTBACK_COMMENTS }}</span>
                  </v-tooltip>
                </div>
                <div
                  v-else-if="item.value === 'RV_IPDS_DECLINED'"
                  style="font-size: small"
                >
                  {{
                    props.item.LATEST_FAILED_FLAG == 0
                      ? props.item.RV_IPDS_FAILED
                      : props.item.LATEST_FAILED_FLAG == 1
                      ? props.item.RV_IPDS_DECLINED
                      : props.item.LATEST_FAILED_FLAG == -1
                      ? props.item.RV_IPDS_EMPTY_OBJECT
                      : props.item.RV_IPDS_FAILED || "-"
                  }}
                </div>

                <div v-else-if="item.value === 'ACTIONS'">
                  <v-btn class="menubtn" icon light style="color: black">
                    <v-icon>mdi-dots-vertical</v-icon>
                    <div class="dropdown-action">
                      <p
                        @click="
                          downloadData(
                            props.item.TXT_POLICY_NO,
                            props.item.CUSTOMER_COPY_URL
                          )
                        "
                        v-if="
                          props.item.LAST_TRIGGER === 'CCM' &&
                          props.item.CAQ_EAQ_FLG != 'CAQ'
                        "
                      >
                        <img
                          class="export-icon mr-2"
                          style="height: 15px; width: 15px"
                          src="../../../assets/downloadicon.png"
                        />CUSTOMER COPY
                      </p>
                      <v-divider></v-divider>
                      <p
                        @click="
                          downloadData(
                            props.item.TXT_POLICY_NO,
                            props.item.AGENT_COPY_URL
                          )
                        "
                        v-if="
                          props.item.LAST_TRIGGER === 'CCM' &&
                          props.item.CAQ_EAQ_FLG != 'CAQ'
                        "
                      >
                        <img
                          class="export-icon mr-2"
                          style="height: 15px; width: 15px"
                          src="../../../assets/downloadicon.png"
                        />AGENT COPY
                      </p>
                      <v-divider></v-divider>
                      <p
                        @click="
                          downloadData(
                            props.item.TXT_POLICY_NO,
                            props.item.CAQ_CUSTOMER_COPY_URL
                          )
                        "
                        v-if="
                          props.item.LAST_TRIGGER === 'CCM' &&
                          props.item.CAQ_EAQ_FLG == 'CAQ'
                        "
                      >
                        <img
                          class="export-icon mr-2"
                          style="height: 15px; width: 15px"
                          src="../../../assets/downloadicon.png"
                        />CAQ Customer COPY
                      </p>

                      <v-divider></v-divider>
                      <p
                        @click="
                          downloadData(
                            props.item.TXT_POLICY_NO,
                            props.item.CAQ_PRODUCER_COPY_URL
                          )
                        "
                        v-if="
                          props.item.LAST_TRIGGER === 'CCM' &&
                          props.item.CAQ_EAQ_FLG == 'CAQ'
                        "
                      >
                        <img
                          class="export-icon mr-2"
                          style="height: 15px; width: 15px"
                          src="../../../assets/downloadicon.png"
                        />
                        PRODUCER COPY
                      </p>

                      <v-divider></v-divider>
                      <p
                        @click="
                          downloadData(
                            props.item.TXT_POLICY_NO,
                            props.item.CAQ_LETTER_URL
                          )
                        "
                        v-if="
                          props.item.LAST_TRIGGER === 'DOCIT' &&
                          props.item.CAQ_EAQ_FLG == 'CAQ'
                        "
                      >
                        <img
                          class="export-icon mr-2"
                          style="height: 15px; width: 15px"
                          src="../../../assets/downloadicon.png"
                        />
                        CAQ LETTER COPY
                      </p>
                      <v-divider></v-divider>
                      <p
                        @click="
                          downloadData(
                            props.item.TXT_POLICY_NO,
                            props.item.DOCIT_COPY_URL
                          )
                        "
                        v-if="
                          props.item.LAST_TRIGGER === 'DOCIT' &&
                          props.item.CAQ_EAQ_FLG != 'CAQ'
                        "
                      >
                        <img
                          class="export-icon mr-2"
                          style="height: 15px; width: 15px"
                          src="../../../assets/downloadicon.png"
                        />
                        DOCIT COPY
                      </p>
                    </div>
                  </v-btn>
                </div>

                <div v-else-if="item.value === 'DECLINED_COPY_URL'">
                  <a
                    @click="
                      downloadData(
                        props.item.TXT_POLICY_NO,
                        props.item.LAST_TRIGGER == 'CCM'
                          ? props.item.DECLINED_COPY_URL
                          : props.item.CAQ_DECLINE_LETTER_URL
                      )
                    "
                    >{{ props.item.LAST_TRIGGER }} - DOWNLOAD</a
                  >
                </div>
                <div v-else style="display: flex; align-items: center">
                  {{ props.item[item.value] || "-" }}
                </div>
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
            :length="getNoOfPages"
            :total-visible="limitValue"
            @input="nextPage($event)"
          >
          </v-pagination>
        </v-layout>
      </div>
    </v-card>

    <!-- search button dialog box -->
    <template>
      <v-dialog
        v-model="dialog"
        overlay
        scrollable
        persistent
        max-width="580"
        style="border-radius: 12%"
      >
        <v-card tile>
          <v-toolbar dark style="background-color: #0073bb; height: 45px">
            <v-toolbar-title
              style="color: white; margin-bottom: 24px; font-size: 15px"
              >Search</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              icon
              light
              @click="
                dialog = false;
                clearAllSearch();
                getBREpendingData('15', 0, statusIdNo);
              "
              style="color: white; margin-bottom: 24px"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-menu bottom right offset-y></v-menu>
          </v-toolbar>

          <div>
            <v-form ref="formdata">
              <v-layout class="pl-3 pt-4" xs12 row wrap>
                <v-flex xs3 class="cust_pr">
                  <p
                    class="font-weight-bold ml-2 mb-1 caption"
                    style="color: #64666"
                  >
                    Policy Number
                  </p>
                  <v-text-field
                    @keypress="isNumber($event)"
                    class="rounded-0"
                    solo
                    v-model="policyNumber"
                    type="number"
                    label="Enter Policy Number"
                    style="width: 158px"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 class="ml-5 cust_pr">
                  <p
                    class="font-weight-bold ml-1 mb-1 caption"
                    style="color: #64666"
                  >
                    Product ID
                  </p>
                  <v-text-field
                    class="rounded-0"
                    @keypress="isNumber($event)"
                    solo
                    type="number"
                    v-model="productID"
                    label="Enter Product ID"
                    style="width: 158px"
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs3 class="ml-5 cust_pr">
                  <p
                    class="font-weight-bold ml-2 mb-1 caption"
                    style="color: #64666"
                  >
                    Producer
                  </p>
                  <v-text-field
                    class="rounded-0"
                    type="number"
                    @keypress="isNumber($event)"
                    solo
                    v-model="producer"
                    label="Producer"
                    style="width: 158px"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout xs12 row wrap>
                <v-flex xs3 class="ml-3 cust_pr">
                  <p
                    class="font-weight-bold ml-2 mb-1 caption"
                    style="color: #64666"
                  >
                    Registration No.
                  </p>
                  <v-text-field
                    class="rounded-0"
                    type="text"
                    @keypress="isStringNotSplChar($event)"
                    solo
                    v-model="registrationNo"
                    label="Registration No."
                    style="width: 158px; height: 35px"
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout
                class="pa-2"
                style="position: relative; bottom: 20px; float: right"
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
                  @click="
                    clearAllSearch();
                    getBREpendingData('15', 0, statusIdNo);
                  "
                  class="ma-2 pa-3"
                  color="#646666"
                  dark
                  small
                >
                  <v-divider vertical class="mr-2"></v-divider>Clear
                </v-btn>
                <v-btn
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
                  @click="
                    dialog = false;
                    limitValue = 15;
                    offset = 0;
                    getBREpendingData('15', 0, statusIdNo);
                  "
                >
                  <v-divider vertical class="mr-2"></v-divider>Search
                </v-btn>
              </v-layout>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </template>

    <!--audit dialog box-->
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
                        {{ props.item.RENEWAL_STATUS }}
                        <span v-if="!notEditableFeature">
                          <img
                            v-if="props.item.RENEWAL_STATUS != '---'"
                            @click="
                              auditSingleFileDownload(
                                props.item.TXT_VEHICLE_CLASS,
                                props.item
                              )
                            "
                            class="export-icon"
                            src="../../../assets/downloadicon.png"
                            style="height: 18px; margin: 0px 0px -3px 9px"
                          />
                        </span>
                      </td>
                      <td>
                        {{ props.item.EXECUTION_START_TIME }}
                      </td>
                      <td>
                        {{ props.item.TXT_CLIENT_NAME }}
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </template>
            </v-card-text>
            <v-card-actions
              v-if="!notEditableFeature"
              style="justify-content: center"
            >
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

    <!-- upload button dialog box -->
    <template>
      <v-dialog v-model="dialog2" persistent overlay scrollable max-width="530">
        <v-card tile>
          <v-toolbar dark style="background-color: #0073bb; height: 40px">
            <v-toolbar-title
              style="color: white; margin-bottom: 18px; font-size: 15px"
              >Upload Excel
              {{ TRIGGER_BRE ? "- Bulk BRE Trigger" : "- Bulk Update" }}
            </v-toolbar-title>
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
          <!-- <v-layout style="height: 100%"> -->
          <div class="uploadDiv" style="display: block">
            <input
              type="file"
              id="myfile"
              name="myfile"
              ref="imageUploader"
              @click="resetImageUploader"
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
          <div style="display: block">
            <v-container fluid>
              <v-radio-group v-model="isUploadLimitation">
                <template v-slot:label>
                  <div>
                    <strong>Please upload only </strong>
                  </div>
                </template>
                <!-- <v-radio value="false">
                  <template v-slot:label>
                    <strong class="success--text">Complete File</strong>
                  </template>
                </v-radio> -->
                <v-radio value="true">
                  <template v-slot:label>
                    <strong class="primary--text">Limited File</strong>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-container>
          </div>
          <!-- </v-layout> -->
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
              @click="ptModificationAction()"
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
            <!-- dailog4 = true; -->
          </v-layout>
        </v-card>
      </v-dialog>
    </template>
    <!--end upload dialog -->
    <!-- dialog for sending policies from one bucket to another -->
    <template>
      <v-layout row justify-center>
        <!-- dialogforConf -->
        <v-dialog
          v-model="dialogforConf"
          persistent
          overlay
          scrollable
          :max-width="currentID == 'RSB' ? '370' : '300'"
        >
          <v-card >

            <v-card-title 
         
            primary-title>
          <div>
            <div class="mb-2"> Are you sure you want send the policy to the bucket?</div>
              <v-textarea
                v-show="currentID == 'RSB'"
                type="text"
                solo
                no-resize
                class="mb-0"
                rows="4"
                v-model="sentBackComments"
                label="Enter the comments"
              >
              </v-textarea>
          </div>
        </v-card-title>
            <!-- <v-card-item>
            <v-card-subtitle>
              <div class="mb-1">
               
            </div>
             
            </v-card-subtitle>
            <v-card-text>
             
             
         
            </v-card-text> -->

            <v-card-actions>
              <v-btn
                color="primary darken-1"
                flat="flat"
                @click="
                  dialogforConf = false;
                  sentBackComments = '';
                "
              >
                No
              </v-btn>

              <v-btn
                color="primary darken-1"
                flat="flat"
                @click="rvBulkActionHandler(currentID)"
              >
                Yes
              </v-btn>
            </v-card-actions>
           </v-card>
        </v-dialog>
      </v-layout>
    </template>

    <!-- dialog for Count of upload excel -->
    <template>
      <v-dialog v-model="dialog4" overlay persistent scrollable max-width="430">
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
                dialog4 = false;
                dialog2 = false;
                selectedFileName = null;
              "
              style="color: white; margin-bottom: 18px"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-menu bottom right offset-y></v-menu>
          </v-toolbar>
          <v-layout class="uploadDivCount">
            <div style="">
              <div
                style="
                  color: #3fa22e;
                  margin-left: 8px;
                  font-weight: 500;
                  margin-top: 5px;
                "
              >
                You Have Successfully Uploaded Excel
              </div>
              <div style="display: flex">
                <div
                  class="font-weight-bold"
                  style="font-size: 20px; margin-left: 20px"
                >
                  {{ ptModifyResult.SUCCESS_COUNT }}
                  <p style="font-size: 12px">Successfully</p>
                </div>
                <div
                  class="font-weight-bold"
                  style="font-size: 20px; margin-left: 26px"
                >
                  {{ ptModifyResult.FAILED_COUNT }}
                  <p style="color: #cc271f; font-size: 12px">Failed</p>
                </div>
              </div>
            </div>
          </v-layout>
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
                dialog4 = false;
                dialog2 = false;
                selectedFileName = null;
              "
            >
              <v-divider vertical class="mr-2"></v-divider>Close
            </v-btn>
            <v-btn
              @click="downloadExcelForPTM()"
              flat
              style="
                width: 130px;
                height: 35px;
                background-color: #0073bb;
                color: #fff;
                border: 1.5px solid #ccc;
                border-radius: 4px;
              "
              class="ma-2 pa-3"
              color="#0073BB"
              dark
              small
            >
              Download Excel
            </v-btn>
          </v-layout>
        </v-card>
      </v-dialog>
    </template>
    <!--end dialog for Count of upload excel -->

    <!-- search date dropdown dailog -->
    <template>
      <v-dialog v-model="dialog1" persistent overlay scrollable max-width="400">
        <v-card tile>
          <v-toolbar dark style="background-color: #0073bb; height: 35px">
            <v-toolbar-title
              style="color: white; margin-bottom: 25px; font-size: 15px"
              >Select</v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-btn
              icon
              light
              @click="closeCustom()"
              style="color: white; margin-bottom: 28px"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-menu bottom right offset-y></v-menu>
          </v-toolbar>
          <div>
            <v-form ref="formdata">
              <v-layout
                class="pl-3 pt-4 d-flex justify-space-between"
                xs6
                row
                wrap
              >
                <v-flex xs3 class="ml-1 cust_pr">
                  <v-layout column class="dateRange">
                    <p
                      class="font-weight-bold mb-1 caption"
                      style="color: #646666"
                    >
                      From Date <span>*</span>
                    </p>
                    <v-menu
                      ref="calender"
                      v-model="expiryPeriodFromMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      class="rounded-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          slot="activator"
                          label="YYYY/MM/DD"
                          :value="computedExpiryPeriodFrom"
                          solo
                          class="rounded-0"
                          readonly
                          maxlength="10"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div
                            slot="prepend-inner"
                            style="
                              position: relative;
                              right: -1px;
                              margin-top: -10px;
                              background-color: #f7f7f7;
                              margin-left: -12px;
                            "
                          >
                            <img
                              class="pa-1"
                              style="height: 35px"
                              src="../../../assets/date_24X24.png"
                            />
                          </div>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        @input="expiryPeriodFromMenu = false"
                        v-model="expiryDateFrom"
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-layout>
                </v-flex>
                <v-layout column class="ml-5 dateRange">
                  <v-flex xs3 class="ml-5 cust_pr dateRange">
                    <p
                      class="font-weight-bold mb-1 caption"
                      style="color: #646666"
                    >
                      To Date <span>*</span>
                    </p>
                    <v-menu
                      ref="calender"
                      v-model="expiryPeriodToMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                      class="rounded-0"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          slot="activator"
                          label="YYYY/MM/DD"
                          :value="computedExpiryPeriodTo"
                          solo
                          class="rounded-0"
                          readonly
                          maxlength="10"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <div
                            slot="prepend-inner"
                            style="
                              position: relative;
                              right: -1px;
                              margin-top: -10px;
                              background-color: #f7f7f7;
                              margin-left: -12px;
                            "
                          >
                            <img
                              class="pa-1"
                              style="height: 35px"
                              src="../../../assets/date_24X24.png"
                            />
                          </div>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        @input="expiryPeriodToMenu = false"
                        v-model="expiryDateTo"
                        no-title
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
              </v-layout>
              <v-layout
                class="pa-2"
                style="position: relative; bottom: 15px; float: right"
              >
                <v-btn
                  flat
                  style="
                    width: 100px;
                    height: 30px;
                    background-color: #ffffff;
                    color: #646666;
                    border: 1.5px solid #ccc;
                    border-radius: 3px;
                  "
                  @click="clearAlldata()"
                  class="ma-2 pa-3"
                  color="#646666"
                  dark
                  small
                >
                  <v-divider vertical class="mr-2"></v-divider>Clear
                </v-btn>

                <v-btn
                  flat
                  style="
                    width: 100px;
                    height: 30px;
                    background-color: #0073bb;
                    color: #ffffff;
                    border: 1.5px solid #ccc;
                    border-radius: 4px;
                  "
                  class="ma-2 pa-3"
                  color="#0073BB"
                  dark
                  small
                  @click="
                    updateDateRange();
                    closeCustom();
                  "
                  >Update
                </v-btn>
              </v-layout>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </template>
    <!-- side drawer pt modification -->
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
          id="demoformodify"
          style="
            padding: 10px;
            width: 100%;
            background-color: #0073bb;
            color: white;
          "
        >
          Modify {{ policyLOB.NUM_IL_PRODUCT_NAME }} Information
          <v-icon
            @click="
              drawer.show = false;
              search = null;
            "
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
              :headers="drawer.isEditable ? headersForEdit : headersForDefault"
              :items="showModifyResponseData"
              :search="search"
              hide-actions
            >
              <template slot="items" slot-scope="props">
                <tr
                  v-if="
                    !(
                      props.item.fieldName === 'TYPE OF BUS' &&
                      currentActiveProduct === 'Misc  D'
                    )
                  "
                >
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
                      :type="
                        editableFields[props.item.fieldName] === 'number'
                          ? 'number'
                          : 'text'
                      "
                      id="inputfortable"
                      @keypress="
                        removeSpecialCharacters(
                          $event,
                          editableFields[props.item.fieldName]
                        )
                      "
                      :disabled="!editableFields[props.item.fieldName]"
                      aria-placeholder="props.item.data"
                      v-model="props.item.newData"
                      :style="
                        !editableFields[props.item.fieldName]
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
              @click="toggleNoRecords()"
              flat
              class="ma-2 pa-3 view-btn-model"
              color="#0073BB"
              dark
              small
            >
              View
              {{
                showModifyResponseData.length < modifyResponseData.length ? "More" : "Less"
              }}
              Fields
            </v-btn>
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
              @click="putDataModification(showModifyResponseData)"
              class="ma-2 pa-3 update-btn-model"
              color="#0073BB"
              dark
              small
              >Update
            </v-btn>
          </v-layout>
        </template>
      </v-navigation-drawer>
    </v-layout>

    <template>
      <v-dialog v-model="dataLoader" persistent style="background-color: none">
        <div class="text-xs-center txt-loader">
          <v-progress-circular
            :size="100"
            indeterminate
            color="white"
            class="mb-0"
            >Loading...</v-progress-circular
          >
        </div>
      </v-dialog>

      <!-- <div class="text-xs-center txt-loader" v-if="testDataLoader">
        <v-progress-circular :size="100" color="white" indeterminate
          >Loading...</v-progress-circular
        >
      </div> -->
    </template>
  </v-app>
</template>

<script>
import moment from "moment";
import { cvApiPath } from "../../../common/API_Config";
import {
  apiService,
  monthNames,
  editableFields,
  editableFieldsTw,
  dateRangeFilterOpn,
  updateMappingForPCV,
  updateMappingForGCV,
  updateMappingForMISCD,
  updateMappingForTw,
  BULK_ACTION_TRIGGER_STATUS,
  STAGE_TO_LOB,
  statusId,
  statusIdV2,
  emptyPolicyCountData,
} from "../common/common";
import {
  policySummaryHeader,
  policySummaryHeaderTw,
  policySummaryHeaderRn,
} from "../common/tableHeader.js";

export default {
  data() {
    return {
      failedResponseHeader: null,
      failedResponseData: null,
      bulkActionConfig: {
        loading: false,
        fromBucket: "trigger to BRE",
        toBucket: "trigger to BRE",
        completedPercentage: 0.1,
      },

      statusNo: 0,
      communicationSystemOpn: "",

      policyData: "",
      featureLocalStorage: {
        filterBy: true,
        bulkAction: true,
        download: true,
        downloadforCCM: true,
        downloadBreLogs: true,
        uploadBtn: true,
        // upload:true,
        Search: true,
        downloadExcel: true,
        ptModificationRights: true,
      },
      notEditableFeature: false,
      upload: true,
      dialogforAudit: false,
      download: true,
      filterBy: true,
      bulkAction: true,
      uploadBtn: true,
      downloadforCCM: true,
      downloadBreLogs: true,
      competedRecord: true,
      limtedRecord: true,
      downloadExcel: true,
      optSearch: true,
      ptModificationRights: true,

      BulkActionItems: [],
      select: "",
      headers: [],
      filterItems: [],
      filterByWorkflow: null,
      drawer: { show: false, isEditable: false },
      // drawer4: null,
      selectedDate: { text: "Next 3 Months", value: "N3M" },
      right: false,

      selectPol: "",
      update_bre_column_mapping: {
        CommercialVehiclePCV: updateMappingForPCV,
        CommercialVehicleGCV: updateMappingForGCV,
        CommercialVehicleMISCD: updateMappingForMISCD,
        TwoWheelerPolicyInsurance: updateMappingForTw,
      },

      headersForEdit: [
        { text: "Field Name", sortable: false, value: "fieldName" },
        { text: "Old Data", sortable: false, value: "data" },
        { text: "New Data", sortable: false, value: "data" },
      ],

      headersForDefault: [
        { text: "Field Name", sortable: false, value: "fieldName" },
        { text: "Old Data", sortable: false, value: "data" },
      ],
      expiryDate: dateRangeFilterOpn,

      dialogforConf: false,

      dialog: false,
      dialog1: false,
      dialog2: false,
      dialog4: false,
      Tabledata: [],
      TabledataForCheckbox: [],
      auditWorkflowStatus: [],
      editableFields: {},
      policyLOB: { NUM_IL_PRODUCT_NAME: "CommercialVehiclePCV" },
      lobDataArray: [],
      selectFileData: {},
      selectedFileName: null,
      statusIdNo: "",
      search: "",
      pagination: {
        rowsPerPage: 15,
      },
      statusLabel: "All",
      testDataLoader: true,
      dataLoader: true,
      page: 1,
      ptModifyResult: "",
      headerCheckbox: false,
      modifyResponseData: [],
      pageStartIndex: 1,
      totalListCount: 15,
      pageNumber: 1,
      currentID: "",
      policyNumber: "",
      producer: "",
      productID: "",
      registrationNo: "",
      expiryDateFrom: "",
      expiryDateTo: "",
      monthNames: monthNames,
      expiryPeriodFromMenu: false,
      expiryPeriodToMenu: false,
      policyCountData: emptyPolicyCountData,
      policyCountEmpty: emptyPolicyCountData,
      selectedSinglePolicy: [],
      showModifyResponseData: [],
      editableTableData: [],
      currentActiveProduct: "",
      // featureList: [],
      headersForAudit: [
        { text: "Status", sortable: false, value: "RENEWAL_STATUS" },
        { text: "Time Stamp", sortable: false, value: "EXECUTION_START_TIME" },
        { text: "UserId", sortable: false, value: "TXT_CLIENT_NAME" },
      ],
      isUploadLimitation: "true",
      limitValue: 15,
      offset: 0,
      productTableOpt: {
        CommercialVehiclePCV: "PCV",
        CommercialVehicleGCV: " GCV",
        CommercialVehicleMISCD: "MISCD",
      },
      sentBackComments: "",
      numOfPoliciesToDownload: 0
    };
  },
  created() {
    this.dataLoader = true;

    this.temploader(false);
    const awsToken = localStorage.awsToken;

    if (awsToken) {
      this.defaultFunction();
    } else {
      setTimeout(() => {
        this.defaultFunction();
      }, 3000);
    }
  },

  methods: {
    defaultFunction() {
      const user = JSON.parse(localStorage.loginResp);
      this.policyLOB =
        user.data.PARENT_PRODUCT_NAME == "TW"
          ? { NUM_IL_PRODUCT_NAME: "TwoWheelerPolicyInsurance" }
          : { NUM_IL_PRODUCT_NAME: "CommercialVehiclePCV" };

      (this.editableFields =
        user.data.PARENT_PRODUCT_NAME == "TW"
          ? editableFieldsTw
          : editableFields),
        this.getUserData();
      this.headerForAll(this.statusIdNo);
      this.setFeatureFunctionality(this.statusIdNo);
      this.bindActionFilterValues(this.statusIdNo);
      this.bucketFeatureHandler();
    },
    notEditableFeatureHandler() {
      this.filterBy = false;
      this.bulkAction = false;
      this.downloadBreLogs = false;
      this.downloadforCCM = false;
      this.uploadBtn = false;
      this.downloadExcel = false;
      this.competedRecord = false;
      this.limtedRecord = false;
      this.optSearch = false;
      this.ptModificationRights = false;
    },
    bucketFeatureHandler() {
      this.filterBy = this.featureLocalStorage.filterBy;
      this.bulkAction = this.featureLocalStorage.bulkAction;
      this.downloadBreLogs = this.featureLocalStorage.downloadBreLogs;
      this.downloadforCCM = this.featureLocalStorage.downloadforCCM;
      this.uploadBtn = this.featureLocalStorage.uploadBtn;
      this.downloadExcel = this.featureLocalStorage.downloadExcel;
      this.competedRecord = this.featureLocalStorage.completedRecord;
      this.optSearch = this.featureLocalStorage.Search;
      this.limtedRecord = this.featureLocalStorage.limitedRecord;
      this.ptModificationRights = this.featureLocalStorage.ptModificationRights;
    },

    //pagination
    nextPage(e) {
      let skipData = e - 1;
      if (skipData === 0) {
        this.offset = 0;
        this.pageStartIndex = 1;
      } else {
        this.offset = this.limitValue * skipData;
        this.pageStartIndex = this.limitValue + 1;
      }
      // this.getPolicyCountData();
      this.getBREpendingData(15, 0, this.statusNo);
    },
    resetImageUploader() {
      this.$refs.imageUploader.value = "";
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
    functionForFalse() {
      self.dataLoader = false;
      self.dialogforConf = false;
    },

    functionForBulkAction() {
      let self = this;
      self.getPolicyCountData().then(
        () => {
          self.dataLoader = false;
          self.dialogforConf = false;
          self.showToast(
            "Bulk Action successfully completed",
            self.TOST().SUCCESS
          );
        },
        (error) => {
          console.error(error);
          this.dataLoader = false;
        }
      );
    },

    functionForFilter() {
      let self = this;
      self.getPolicyCountData().then(
        () => {
          self.dataLoader = false;
          self.dialogforConf = false;
        },
        (error) => {
          self.dataLoader = false;
          self.dialogforConf = false;
          console.error(error); // gets here when the promise is rejected
        }
      );
    },
    removeSpecialCharacters(e, type) {
      let evt = e ? e : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(e.key)) {
        e.preventDefault();
      }

      if (type == "number") {
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          evt.preventDefault();
        }
      }
    },

    setFeatureFunctionality(Status_id) {
      let self = this;

      let userData;
      if (localStorage.loginResp) {
        userData = JSON.parse(localStorage.loginResp);
      }

      let featureList = userData.data.RENEWAL_STATUS.filter(
        (e) => e.Status == Status_id
      )[0];

      // console.log(featureList,"featureList")
      if (featureList) {
        self.featureLocalStorage.filterBy = featureList["Filter by"]
          ? featureList["Filter by"]
          : false;
        self.featureLocalStorage.downloadExcel = featureList["Download"]
          ? featureList["Download"]
          : false;
        self.featureLocalStorage.bulkAction = featureList["Bulk action"]
          ? featureList["Bulk action"]
          : false;

        self.featureLocalStorage.Search = featureList["Search"]
          ? featureList["Search"]
          : false;

        self.featureLocalStorage.downloadBreLogs = featureList[
          "Download BRE logs"
        ]
          ? featureList["Download BRE logs"]
          : false;
        self.featureLocalStorage.uploadBtn = featureList["Upload"]
          ? featureList["Upload"]
          : false;
        self.featureLocalStorage.downloadforCCM = featureList[
          "Download CCM logs"
        ]
          ? featureList["Download CCM logs"]
          : false;
        self.featureLocalStorage.ptModificationRights = featureList[
          "PT Modification Rights"
        ]
          ? featureList["PT Modification Rights"]
          : false;
      }
    },

    headerForAll(Status_id) {
      const caq = {
        text: "EAQ / CAQ",
        value: "CAQ_EAQ_FLG",
        sortable: false,
      };

      let tableHeader =
        this.policyLOB.NUM_IL_PRODUCT_NAME == "TwoWheelerPolicyInsurance"
          ? policySummaryHeaderTw
          : policySummaryHeader;

      if (Status_id == "7") {
        this.headers = [
          ...policySummaryHeaderRn,
          {
            text: "Premium",
            // RV_IPDS_PREMIUM to TOTALPREMIUMWITHGST
            value: "TOTALPREMIUMWITHGST",
            sortable: false,
          },
          caq,
          {
            text: "Actions",
            value: "ACTIONS",
            sortable: false,
          },
        ];
      } else if (Status_id == "1" || Status_id == "3") {
        this.headers = [
          ...tableHeader,
          {
            text: "Reason",
            value: "RV_IPDS_DECLINED",
            sortable: false,
          },
          caq,
        ];
      } else if (Status_id == "10") {
        this.headers = [
          ...tableHeader,
          caq,
          {
            text: "Declined Copy",
            value: "DECLINED_COPY_URL",
            sortable: false,
          },
        ];
      } else if (Status_id == "5") {
        this.headers = [
          ...tableHeader,
          {
            text: "Print Flag",
            value: "TXT_RNPRINTREQUIRED",
            sortable: false,
          },
          caq,
        ];
      } else if (Status_id == "6") {
        this.headers = [
          ...tableHeader,
          {
            text: "Failed Response",
            value: "DOCIT_FAILED_RESPONSE",
            sortable: false,
          },
          caq,
        ];
      } else if (Status_id == "4") {
        this.headers = [
          ...tableHeader,
          {
            text: "Reason",
            value: "RV_IPDS_DECLINED",
            sortable: false,
          },
          caq,
        ];
      } else {
        this.headers = [...tableHeader, caq];
      }
    },

    ShowDialogBox(currentID) {
      this.currentID = currentID;
      console.log(currentID, "currentID");
      this.dialogforConf = true;
    },
    updateDateRange() {
      let self = this;
      if (self.expiryDateFrom == "" && self.expiryDateTo == "") {
        self.showToast("Please select any Date Range", self.TOST().WARNING);
      } else {
        if (self.expiryDateFrom > self.expiryDateTo) {
          self.showToast(
            "Please select a valid Date Range",
            self.TOST().WARNING
          );
        } else {
          self.dataLoader = true;
          self.dialog1 = false;
          self.getPolicyCountData();
        }
      }
    },

    temploader(loader = false) {
      let self = this;
      const payload = {
        checkMovementStatus: true,
      };
      self.dataLoader = loader;
      apiService("post", cvApiPath.bulkAction, payload)
        .then((res) => {
          try {
            if (res.status == 200) {
              let checkBasedLob = res.data[self.policyLOB.NUM_IL_PRODUCT_NAME];
              let objLob = Object.keys(checkBasedLob).filter((key) =>
                key.includes(statusIdV2[self.statusNo])
              );
              let checkBasedBucket =
                checkBasedLob[objLob.length ? objLob[0] : objLob];
              if (checkBasedBucket) {
                let check = checkBasedBucket.state == "COMPLETED";
                if (check) {
                  if (!loader) {
                    self.getPolicyCountData(false);
                  }
                  setTimeout(() => {
                    self.bulkActionConfig.loading = false;
                    self.bulkActionConfig.completedPercentage = 0;
                  }, 10000);
                } else {
                  self.bulkActionConfig.loading = true;
                  self.bulkActionConfig.bucketTo =
                    checkBasedBucket.bucketTo.toLowerCase() == "bre-failed"
                      ? "bre-declined"
                      : checkBasedBucket.bucketTo;
                  self.bulkActionConfig.bucketFrom =
                    checkBasedBucket.bucketFrom.toLowerCase() == "bre-failed"
                      ? "bre-declined"
                      : checkBasedBucket.bucketFrom;
                  let newCount = self.policyCountData.filter(
                    (e) => e.status_BE == self.statusNo
                  )[0].totalCount;
                  self.bulkActionConfig.completedPercentage =
                    self.calPercentageForMovement(
                      newCount,
                      checkBasedBucket.count
                    );
                  setTimeout(() => {
                    self.temploader(false);
                  }, 10000);
                }
              } else {
                self.bulkActionConfig.loading = false;
                self.dataLoader = false;
              }
              // self.getPolicyCountData(false);
              if (!loader) {
                self.getBREpendingData("15", 0, self.statusNo, false);
              }
            }
          } catch (err) {
            self.bulkActionConfig.loading = false;
            self.dataLoader = loader;
            // if(!loader){
            self.getBREpendingData("15", 0, self.statusNo, loader);
            // }
          }
        })
        .catch((err) => {
          self.bulkActionConfig.loading = false;
          self.dataLoader = false;
          self.getBREpendingData("15", 0, self.statusNo);
          // self.getPolicyCountData(false);
          console.log(err, "err");
        });
    },

    calPercentageForMovement(newCount, oldCount) {
      let percentage = this.bulkActionConfig.completedPercentage;
      if (newCount == oldCount) {
        percentage += 0.2;
      } else {
        percentage = ((newCount - oldCount) / oldCount) * 100;
      }

      console.log(percentage, "percentage");
      return Math.abs(percentage);
    },

    rvBulkActionHandler(event) {
      if (this.bulkActionConfig.loading == true) {
        this.showToast(
          `Please wait policies are moving ... `,
          this.TOST().ERROR
        );
      } else {
        this.dataLoader = true;
        this.dialogforConf = false;
        let self = this;

        if (
          event == "PT" ||
          event == "Retaintion" ||
          event == "RSB" ||
          event == "TTC" ||
          event == "TTDocIT" ||
          event == "BRD" ||
          event == "TTB"
        ) {
          self.dialogforConf = false;
          if (self.headerCheckbox || self.selectedSinglePolicy.length) {
            let checkCount = self.policyCountData.filter(
              (e) => e.status_BE == self.statusIdNo
            );
            let status_list_cv = JSON.parse(localStorage.loginResp);
            const username = status_list_cv.data.USER_NAME;

            let eventCheck =
              event == "TTC"
                ? self.statusNo == 5
                  ? "RA"
                  : self.statusNo == 6
                  ? "CM"
                  : null
                : event == "TTDocIT"
                ? self.statusNo == 5
                  ? "RA"
                  : self.statusNo == 6
                  ? "CM"
                  : null
                : event == "TTB"
                ? self.statusNo == 2 || self.statusNo == 3
                  ? "SUCCESS"
                  : null
                : null;
            let checkCommunicationSystem =
              event == "TTC"
                ? {
                    communicationSystem: "CCM",
                  }
                : event == "TTDocIT"
                ? {
                    communicationSystem: "DOCIT",
                  }
                : {};

            let checkSentBackComments =
              event == "RSB"
                ? {
                    sentBackComments: self.sentBackComments || "No Comments",
                  }
                : {};
            let checkFilter = self.filterByWorkflow
              ? { filterByRenewalStatus: self.filterByWorkflow }
              : {};

            let polModi =
              self.policyLOB.NUM_IL_PRODUCT_NAME == "TwoWheelerPolicyInsurance"
                ? self.selectedSinglePolicy.map((e) => {
                    return e.POLICY_NO;
                  })
                : self.selectedSinglePolicy.map((e) => {
                    return e.TXT_POLICY_NO;
                  });
            const payload = {
              userId: username,
              policies: self.headerCheckbox ? [] : polModi,
              isHeaderSelected: self.headerCheckbox,
              expiryFromDate: self.expiryDateFrom
                ? self.expiryDateFrom + " 00:00:00.0"
                : "",
              expiryToDate: self.expiryDateTo
                ? self.expiryDateTo + " 00:00:00.0"
                : "",
              lob: self.policyLOB.NUM_IL_PRODUCT_NAME,
              triggerStatus: eventCheck
                ? BULK_ACTION_TRIGGER_STATUS[event + eventCheck]
                : BULK_ACTION_TRIGGER_STATUS[event],
              ...checkCommunicationSystem,
              ...checkSentBackComments,
              bucketStatusNo: self.statusNo,
              count: checkCount[0].totalCount || 0,
              checkMovementStatus: false,
              stage: STAGE_TO_LOB[self.policyLOB.NUM_IL_PRODUCT_NAME],
              ...checkFilter,
            };

            self.dataLoader = true;
            apiService("post", cvApiPath.bulkAction, payload)
              .then((res) => {
                if (res.status == 200) {
                  const {
                    msg,
                    status,
                    completedPercentage,
                    retrySeconds,
                    executionArn,
                  } = res.data;
                  self.dataLoader = false;
                  self.showToast(
                    "Please wait bulk action started",
                    self.TOST().SUCCESS
                  );

                  let checkBasedLob =
                    res.data[self.policyLOB.NUM_IL_PRODUCT_NAME];

                  let objLob = Object.keys(checkBasedLob).filter((key) =>
                    key.includes(statusIdV2[self.statusNo])
                  );
                  let checkBasedBucket =
                    checkBasedLob[objLob.length ? objLob[0] : objLob];

                  // console.log(checkBasedBucket,checkBasedLob , Object.keys(checkBasedLob).filter((key) =>
                  //                         key.includes(statusIdV2[self.statusNo])
                  //                       ), "checkLoader trigger")
                  let checkLoader = checkBasedBucket.state == "STARTED";

                  if (checkLoader) {
                    self.bulkActionConfig.loading = true;
                    self.bulkActionConfig.completedPercentage = 0.2;
                    self.bulkActionConfig.bucketTo =
                      checkBasedBucket.bucketTo.toLowerCase() == "bre-failed"
                        ? "bre-declined"
                        : checkBasedBucket.bucketTo;
                    self.bulkActionConfig.bucketFrom =
                      checkBasedBucket.bucketFrom.toLowerCase() == "bre-failed"
                        ? "bre-declined"
                        : checkBasedBucket.bucketFrom;
                  } else {
                    self.bulkActionConfig.loading = false;
                  }

                  setTimeout(() => {
                    self.temploader();
                  }, 5000);

                  self.getPolicyCountData(false);
                  self.selectedSinglePolicy = [];
                  self.sentBackComments = "";
                } else {
                  self.dataLoader = false;

                  self.showToast(
                    "Failed to trigger Bulk Action ",
                    self.TOST().WARNING
                  );
                }
              })
              .catch((err) => {
                self.dataLoader = false;
                self.showToast(
                  "Failed to trigger Bulk Action ",
                  self.TOST().WARNING
                );
                console.log(err, "err");
              });
          } else {
            self.dataLoader = false;
            self.sentBackComments = "";
            self.showToast(
              "Please select atleast one policy ...",
              self.TOST().WARNING
            );
          }
        }
      }
    },
    ptModificationAction() {
      return new Promise((resolve, reject) => {
        let self = this;

        self.dataLoader = true;
        if (self.selectFileData) {
          if (self.selectedFileName) {
            if (self.isUploadLimitation) {
              let status_list_cv = JSON.parse(localStorage.loginResp);
              const username = status_list_cv.data.USER_NAME;

              let formData = new FormData();
              formData.append("policies", self.selectFileData[0]);
              formData.append("STAGE_NAME", self.policyLOB.NUM_IL_PRODUCT_NAME);
              formData.append("TRIGGER_BRE", self.TRIGGER_BRE);
              formData.append("userId", username);

              apiService("post", cvApiPath.uploadPolicyExcel, formData)
                .then(function (response) {
                  if (response.data.status == 200) {
                    let time = self.TRIGGER_BRE == true ? 3000 : 1000;
                    setTimeout(() => {
                      self.ptModifyResult = response.data;

                      self.selectedFileName = null;
                      self.selectedSinglePolicy = [];
                      self.dataLoader = false;
                      self.dialog4 = true;
                      self.getBREpendingData("15", 0, self.statusNo);
                    }, time);
                    resolve(response);
                  } else {
                    self.dataLoader = false;
                    self.showToast(response.data.msg, self.TOST().WARNING);
                    reject(
                      "PT Modification Error ---->",
                      JSON.stringify(response)
                    );
                  }
                })
                .catch(function (error) {
                  self.dataLoader = false;
                  reject(error);
                });
            } else {
              self.dataLoader = false;
              self.showToast(
                "Please select the upload file limitation",
                self.TOST().WARNING
              );
              reject("Please select the upload file limitation");
            }
          } else {
            self.dataLoader = false;
            self.showToast("Please add a file to upload", self.TOST().WARNING);
            reject("Modification Action Error");
          }
        } else {
          self.dataLoader = false;
          self.showToast("Please add a file to upload", self.TOST().WARNING);
          reject("Modification Action Error");
        }
      });
    },

    tableCheckbox(event, item) {
      let currentData = item;
      let policy_data = JSON.parse(JSON.stringify(item));
      if (event == true) {
        this.selectedSinglePolicy.push(policy_data);
      } else {
        const indexOfObject = this.selectedSinglePolicy.findIndex((res) => {
          return res.TXT_POLICY_NO === currentData.TXT_POLICY_NO;
        });
        this.selectedSinglePolicy.splice(indexOfObject, 1);
      }
      this.countCheckedCheckboxes();
    },

    clickAll(event, table) {
      if (this.headerCheckbox) {
        for (var i = 0; i < table.length; i++) {
          this.TabledataForCheckbox[i].selected = true;
        }
      } else {
        for (var i = 0; i < table.length; i++) {
          this.TabledataForCheckbox[i].selected = false;
        }
      }
      if (event) {
        for (var i = 0; i < this.Tabledata.length; i++) {
          this.selectedSinglePolicy.push(this.Tabledata[i]);
        }
      } else {
        this.selectedSinglePolicy = [];
      }
      this.countCheckedCheckboxes();
    },

    toggleAll(event, table) {
      this.clickAll(this.headerCheckbox, table, "toggleall values");
    },

    countCheckedCheckboxes() {
      if (this.headerCheckbox) this.numOfPoliciesToDownload = this.totalListCount;
      else this.numOfPoliciesToDownload = this.Tabledata.filter((item) => item.selected).length;
    },

    changeSort(column) {
      // console.log("Column ", column);
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    isStringNotSplChar(e) {
      let evt = e ? e : window.event;

      if (/^[A-Za-z0-9 ]+$/.test(e.key)) {
        // console.log(e.key,"sds")
      } else {
        evt.preventDefault();
        // console.log(e.key,"sssdfsdfd")
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    getLOBOption() {
      let self = this;
      let access_list_fr = JSON.parse(localStorage.loginResp);
      self.dataLoader = true;
      try {
        let lob_list = JSON.stringify(access_list_fr.data.LOB);
        apiService("get", `/lob-list?productcodes=${lob_list}`, {})
          .then(function (response) {
            if (response.status == 200) {
              let filteredLob = response.data.data.filter(
                (e) =>
                  e.PARENT_PRODUCT_NAME == "CV" || e.PARENT_PRODUCT_NAME == "TW"
              );
              self.lobDataArray = filteredLob;
              self.policyLOB = filteredLob[0];

              self.getPolicyCountData();
            } else {
              self.lobDataArray = [];
              self.dataLoader = false;
              self.policyLOB = {};
            }
          })
          .catch(function (error) {
            self.dataLoader = false;
            self.lobDataArray = [];
            self.policyLOB = {};
          });
      } catch (error) {
        console.log(error, "lob list");
      }
    },
    getUserData() {
      let userData = JSON.parse(localStorage.loginResp);
      this.dataLoader = true;
      try {
        const username = userData.data.USER_NAME;
        apiService("get", `/fetch/user?userName=${username}`, {})
          .then((res) => {
            if (res.status == 200) {
              const { data } = res.data;
              console.log(data, 'data');
              this.communicationSystemOpn = data.rng;
              this.getDateRange(false);
              this.getLOBOption();
            }
          })
          .catch((err) => {
            this.dataLoader = false;

            console.log(err);
          });
      } catch (error) {
        this.dataLoader = false;
        console.log(error);
      }
    },
    bindActionFilterValues(Status_id) {
      let communicationSystemOpn =
        this.communicationSystemOpn == "CCM"
          ? {
              ActionName: "Generate Communication",
              ID: "TTC",
            }
          : this.communicationSystemOpn == "DocIT"
          ? {
              ActionName: "Generate Communication",
              ID: "TTDocIT",
            }
          : {};

      // console.log(this.communicationSystemOpn, "communicationSystemOpn");

      Status_id = parseInt(Status_id);
      let actionItems = [];
      let statusFilterItems = [];
      if (Status_id == 2 || Status_id == 3) {
        actionItems = [
          {
            ActionName: "PT-Modification",
            ID: "PT",
          },
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
          {
            ActionName: "Retention Approval",
            ID: "Retaintion",
          },
        ];
        statusFilterItems = [];
      } else if (Status_id == 4) {
        actionItems = [
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
          {
            ActionName: "BRE-Declined",
            ID: "BRD",
          },
        ];
        statusFilterItems = [
          {
            ActionName: "Bre-Success",
            ID: 0,
          },

          {
            ActionName: "Bre-Declined",
            ID: 2,
          },
          {
            ActionName: "Retention-Sentback",
            ID: 3,
          },
        ];
      } else if (Status_id == 5) {
        actionItems = [
          {
            ActionName: "Retention Sent Back",
            ID: "RSB",
          },
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
        if (!!communicationSystemOpn['ID'] && !!communicationSystemOpn['ActionName']) {
          actionItems.push(communicationSystemOpn);
        }
        statusFilterItems = [
          {
            ActionName: "Bre-Success",
            ID: 0,
          },
          {
            ActionName: "Bre-Declined",
            ID: 2,
          },
          {
            ActionName: "Print Flag - True",
            ID: 7,
          },
          {
            ActionName: "Print Flag - False",
            ID: 8,
          },
        ];
      } else if (Status_id == 6) {
        actionItems = [communicationSystemOpn];
        statusFilterItems = [];
      } else if (Status_id == 7) {
        actionItems = [
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
        statusFilterItems = [
          {
            ActionName: "Ccm-Success",
            ID: 4,
          },
          {
            ActionName: "Ccm-Declined",
            ID: 6,
          },
        ];
      } else if (Status_id == 1) {
        actionItems = [
          {
            ActionName: "PT-Modification",
            ID: "PT",
          },
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
        statusFilterItems = [
          {
            ActionName: "Status - Failed",
            ID: 9,
          },
          {
            ActionName: "Status - Pending",
            ID: 10,
          },
        ];
      } else if (Status_id == 8 || Status_id == 9 || Status_id == 10) {
        actionItems = [
          {
            ActionName: "Trigger to BRE",
            ID: "TTB",
          },
        ];
        statusFilterItems = [];
      } else {
        statusFilterItems = [];
        actionItems = [];
      }
      this.BulkActionItems = actionItems;
      let allPolFilter = [
        {
          ActionName: "Non BRE Policies",
          ID: 11,
        },
        {
          ActionName: "BRE Policies",
          ID: 12,
        },
      ];
      this.filterItems = [...allPolFilter, ...statusFilterItems];
      return true;
    },
    getBREpendingData(limitvalue, skip, Status_id, loadercheck = true) {
      try {
        let self = this;

        let checkCount = self.policyCountData.filter(
          (e) => e.status_BE == self.statusIdNo
        );

        const checkStatus = self.policyCountData.filter(
          (e) => e.status_BE == self.statusIdNo
        )[0].name;

        self.statusLabel =
          checkStatus == "BRE_FAILED" ? "BRE DECLINED" : checkStatus;

        this.headerCheckbox = false;
        this.select = "";

        self.statusIdNo = Status_id || self.statusNo || 0;
        self.dataLoader = loadercheck;
        let checkFilter = self.filterByWorkflow
          ? { filterByRenewalStatus: self.filterByWorkflow }
          : {};

        let request = {
          expiryFrom: self.expiryDateFrom
            ? self.expiryDateFrom + " 00:00:00.0"
            : "",
          expiryTo: self.expiryDateTo ? self.expiryDateTo + " 00:00:00.0" : "",
          status: Status_id || self.statusNo || 0,
          stage: self.policyLOB.NUM_IL_PRODUCT_NAME,
          policyNo: self.policyNumber,
          productcode: self.productID,
          producerNo: self.producer,
          registrationNo: self.registrationNo,

          limit: self.limitValue,
          offset: self.offset,
          ...checkFilter,
        };
        apiService("post", cvApiPath.getPolicies, request)
          .then((response) => {
            if (response.status == 200) {
              if (Status_id) {
                self.bindActionFilterValues(Status_id);
              }
              const req = response.data.data.Result;
              const modifyReq = req.length
                ? req.map((e) => {
                    return {
                      ...e,
                      selected: self.selectedSinglePolicy.filter(
                        (b) => b.TXT_POLICY_NO == e.TXT_POLICY_NO
                      ).length
                        ? true
                        : false,
                      PERMIUM: e.TOTALPREMIUMWITHGST
                        ? Math.round(e.TOTALPREMIUMWITHGST)
                        : "-",
                      TOTALPREMIUMWITHGST: e.TOTALPREMIUMWITHGST
                        ? Math.round(e.TOTALPREMIUMWITHGST)
                        : "-",
                      CAQ_EAQ_FLG: e.CAQ_EAQ_FLG != null ? e.CAQ_EAQ_FLG : "-",
                      RV_IPDS_DECLINED: e.RV_IPDS_DECLINED
                        ? e.RV_IPDS_DECLINED
                        : "-",
                      DAT_PREVIOUSPOLICYSTARTDATE: moment(
                        new Date(e.DAT_PREVIOUSPOLICYSTARTDATE)
                      ).format("YYYY-MM-DD"),

                      DAT_PREVIOUSPOLICYENDDATE: moment(
                        new Date(e.DAT_PREVIOUSPOLICYENDDATE)
                      ).format("YYYY-MM-DD"),
                      FAILED_RESPONSE:
                        e.LAST_TRIGGER == "DOCIT"
                          ? e.DOCIT_FAILED_RESPONSE
                          : e.CCM_FAILED_RESPONSE || "-",
                      CAQ_EAQ_FLG:
                        e.TXT_CHEQUE_BOUNCE_FLAG == "TRUE"
                          ? "CB"
                          : e.CAQ_EAQ_FLG,
                      POLICY_START_DATE: e.POLICY_START_DATE
                        ? moment(new Date(e.POLICY_START_DATE)).format(
                            "YYYY-MM-DD"
                          )
                        : "-",

                      POLICY_EXPIRY_DATE: e.POLICY_EXPIRY_DATE
                        ? moment(new Date(e.POLICY_EXPIRY_DATE)).format(
                            "YYYY-MM-DD"
                          )
                        : "-",
                    };
                  })
                : [];

              self.headerForAll(self.statusIdNo);
              // console.log(modifyReq,"modifyReq")
              self.Tabledata = modifyReq;
              self.TabledataForCheckbox = modifyReq;

              // self.pageStartIndex = skip + 1;
              self.totalListCount = response.data.data.TotalCount;
              self.pageStartIndex =
                response.data.data.TotalCount == 0 ? 0 : self.offset + 1;

              self.dataLoader = false;

              self.competedRecord = true;
              self.limtedRecord = true;
              if (
                !self.filterByWorkflow &&
                !self.policyNumber &&
                !self.productID &&
                !self.producer &&
                !self.registrationNo
              ) {
                if (checkCount[0].totalCount != response.data.data.TotalCount) {
                  self.getPolicyCountData(loadercheck);
                } else {
                  console.log("check");
                  // self.getPolicyCountData(false);
                }
              }
            } else {
              self.Tabledata = [];
              self.TabledataForCheckbox = [];
              self.totalListCount = 0;

              self.headerForAll(self.statusIdNo);
              self.dataLoader = false;
            }
          })
          .catch((error) => {
            self.Tabledata = [];
            self.TabledataForCheckbox = [];
            self.totalListCount = 0;

            self.headerForAll(self.statusIdNo);
            self.dataLoader = false;
            if (!error.status) {
              self.showToast(error, self.TOST().WARNING);
            }
          });
      } catch (err) {
        console.log(err, "policies api");
      }
    },

    ptBulkUpload(value) {
      this.dialog2 = true;
      value == "bulkbre"
        ? (this.TRIGGER_BRE = true)
        : (this.TRIGGER_BRE = false);
    },

    downloadExcelForPTM() {
      let downloadUploadedFile = this.ptModifyResult.UPLOADED_FILE_PATH;
      this.downloadFileFromUrl(
        downloadUploadedFile,
        downloadUploadedFile + "_" + ".xlxs"
      );
    },

    downloadExcelByPolicies(type) {
      let self = this;
      let userData = JSON.parse(localStorage.loginResp);
      if (!self.headerCheckbox && self.selectedSinglePolicy.length == 0) {
        self.showToast(
          "Please select any one policy to download excel",
          self.TOST().WARNING
          );
        } else {
        let checkHeaderSelected = self.headerCheckbox
          ? {
              expiryFromDate: self.expiryDateFrom
                ? self.expiryDateFrom + " 00:00:00.0"
                : "",
              expiryToDate: self.expiryDateTo
                ? self.expiryDateTo + " 00:00:00.0"
                : "",
            }
          : {};

        let checkFilter = self.filterByWorkflow
          ? { filterByRenewalStatus: self.filterByWorkflow }
          : {};

        let checkCount = self.policyCountData.filter(
          (e) => e.status_BE == self.statusIdNo
        );
        let bucketCount = checkCount[0].totalCount;

        const payload = {
          lob: self.policyLOB.NUM_IL_PRODUCT_NAME,
          bucketStatusNo: self.statusNo,
          policies: self.headerCheckbox
            ? []
            : self.policyLOB.NUM_IL_PRODUCT_NAME == "TwoWheelerPolicyInsurance"
            ? self.selectedSinglePolicy.map((e) => e.POLICY_NO)
            : self.selectedSinglePolicy.map((e) => e.TXT_POLICY_NO),
          downloadType: type,
          selectAll: self.headerCheckbox,
          totalCount: bucketCount || 0,
          ...checkHeaderSelected,
          ...checkFilter,
          userId: userData.data.USER_NAME,
          // totalCount: this.numOfPoliciesToDownload
        };
        if (!payload.userId) {
          self.showToast('Something went wrong. Please try again', self.TOST().ERROR);
          return;
        }
        self.dataLoader = true;
        apiService("post", cvApiPath.downloadExcel, payload)
          .then((res) => {
            if (res.status == 200) {
              if (typeof res.data === 'object') {
                self.dataLoader = false;
                if (res.data && res.data.requestId) {
                  self.showToast(
                    `More than 20,000 policies to download. File generation will take time, please wait. File will be available on 'Download Reports' page with REQUEST ID: '${res.data.requestId}'.`,
                    self.TOST().INFO,
                    12000
                  );
                }
              } else {
                self.downloadFileFromUrl(
                  res.data,
                  self.statusLabel.split("_").join(" ") + "_" + ".xlxs"
                );
              }
              self.getPolicyCountData();
              self.dataLoader = false;
              self.selectedSinglePolicy = [];
            } else {
              self.getPolicyCountData();
              self.dataLoader = false;
            }

            console.log(res, "download policy");
          })
          .catch((err) => {
            self.getPolicyCountData();
            self.dataLoader = false;
            console.log(err, "err");
          });
      }
    },

    downloadPolicyLogs() {
      let self = this;

      if (self.selectedSinglePolicy.length == 0) {
        self.dataLoader = false;
        self.showToast("Please a select any one policy", self.TOST().WARNING);
      } else if (self.selectedSinglePolicy.length > 1) {
        self.dataLoader = false;
        self.showToast("Please a select only one policy", self.TOST().WARNING);
      } else {
        let BreSingle = 
        self.policyLOB.NUM_IL_PRODUCT_NAME == "TwoWheelerPolicyInsurance" ? 
        self.selectedSinglePolicy[0].POLICY_NO :
        self.selectedSinglePolicy[0].TXT_POLICY_NO;
        self.dataLoader = true;
        apiService("post", cvApiPath.downloadLogs, {
          stage: self.policyLOB.NUM_IL_PRODUCT_NAME,
          policyNo: BreSingle,
        })
          .then(function (response) {
            if (response.status == 200) {
              self.downloadFileFromUrl(
                response.data,
                BreSingle + "_" + ".xlxs"
              );
              self.getPolicyCountData();
              self.dataLoader = false;
              self.selectedSinglePolicy = [];
            } else {
              self.dataLoader = false;
              self.getPolicyCountData();
            }
          })
          .catch(function (error) {
            // console.log(error,'error')
            self.dataLoader = false;
            self.showToast("Failed to download logs", self.TOST().WARNING);
          });
      }
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

    getPolicyCountData(loadercheck = true) {
      // return new Promise((resolve, reject) => {
      let self = this;
      let status_list_cv;

      if (localStorage.loginResp) {
        status_list_cv = JSON.parse(localStorage.loginResp);
      }

      self.dataLoader = loadercheck;

      apiService("post", cvApiPath.policyCount, {
        expiryFromDate: self.expiryDateFrom
          ? self.expiryDateFrom + " 00:00:00.0"
          : "",
        expiryToDate: self.expiryDateTo
          ? self.expiryDateTo + " 00:00:00.0"
          : "",
        lob: self.policyLOB.NUM_IL_PRODUCT_NAME,
      })
        .then(function (response) {
          try {
            if (response.status == 200) {
              const data = response.data.map((e, i) => {
                return {
                  status_BE: i,
                  selected: status_list_cv.data.RENEWAL_STATUS.filter(
                    (b) =>
                      b.name.toLowerCase() ==
                      e.mdStatus.split("_").join("-").toLowerCase()
                  ).length
                    ? true
                    : false,
                  name: e.mdStatus.split("-").join("_").toUpperCase(),
                  totalCount: e.TotalCount,
                };
              });

              self.policyCountData = data || response.data.data;
              self.dataLoader = false;

              if (loadercheck == false) {
                setTimeout(() => {
                  self.getBREpendingData("15", 0, self.statusNo, loadercheck);
                }, 5000);
              } else {
                // console.log("loop");
                self.getBREpendingData("15", 0, self.statusNo, loadercheck);
              }
            } else {
              self.policyCountData = self.policyCountEmpty.map((e, i) => {
                return {
                  status_BE: i,
                  ...e,
                };
              });
              self.dataLoader = false;
              self.getBREpendingData("15", 0, self.statusNo, loadercheck);
            }
            // resolve(JSON.stringify(response));
          } catch (error) {
            self.policyCountData = self.policyCountEmpty.map((e, i) => {
              return {
                status_BE: i,
                ...e,
              };
            });
            self.dataLoader = false;
            console.log(error, "err");
          }
          // this.dialog1 = false;
        })
        .catch(function (err) {
          self.policyCountData = self.policyCountEmpty.map((e, i) => {
            return {
              status_BE: i,
              ...e,
            };
          });
          self.dataLoader = false;
          console.log(err, "error");
          // reject(JSON.stringify(err));
        });
      // });
    },

    closeCustom() {
      if (this.expiryDateFrom > this.expiryDateTo) {
        this.showToast("Please select a valid Date Range", this.TOST().WARNING);
      } else {
        this.dialog1 = false;
      }
    },

    getDateRange(triggerAPI) {
      let self = this;
      let now = new Date();
      self.dataLoader = true;
      if (self.selectedDate.value == "N2M") {
        let currentfirst = now.setMonth(now.getMonth());
        self.expiryDateFrom = moment(
          new Date(parseInt(currentfirst, 10))
        ).format("YYYY-MM-DD");

        let currentlast = now.setMonth(now.getMonth() + 2);
        self.expiryDateTo = moment(new Date(parseInt(currentlast, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (self.selectedDate.value == "N3M") {
        let currentfirst = now.setMonth(now.getMonth());
        self.expiryDateFrom = moment(
          new Date(parseInt(currentfirst, 10))
        ).format("YYYY-MM-DD");

        let currentlast = now.setMonth(now.getMonth() + 3);
        self.expiryDateTo = moment(new Date(parseInt(currentlast, 10))).format(
          "YYYY-MM-DD"
        );
      } else if (self.selectedDate.value == "DR") {
        self.dialog1 = true;
      } else if (self.selectedDate.value == "CM") {
        let y = now.getFullYear();
        let m = now.getMonth();
        let firstDay = new Date(y, m, 1, 0);
        self.expiryDateFrom = moment(firstDay).format("YYYY-MM-DD");
        let lastDay = new Date(y, m + 1, 0);
        self.expiryDateTo = moment(lastDay).format("YYYY-MM-DD");
      }
      if (triggerAPI && self.selectedDate.value != "DR") {
        self.getPolicyCountData();
      } else {
        self.dataLoader = false;
      }
    },

    clearAlldata() {
      if (this.expiryDateFrom > this.expiryDateTo) {
        this.showToast("Please select a valid Date Range", this.TOST().WARNING);
      } else {
        this.$refs.formdata.reset();
        this.expiryDateFrom = "";
        this.expiryDateTo = "";
      }
    },
    clearAllSearch() {
      (this.policyNumber = ""),
        (this.productID = ""),
        (this.producer = ""),
        (this.registrationNo = "");
    },
    clearPolicySearch() {
      this.clearAllSearch();
      // this.getPolicyCountData()
    },

    // GET DATA
    getDataModification(lob, polNo, item) {
      this.currentActiveProduct = item.TXT_VEHICLE_CLASS;
      this.policyData = item;
      this.selectPol = polNo;
      // this.dialog3 = true
      let self = this;

      const apiCall = () => {
        self.dataLoader = true;
        apiService(
          "get",
          `${cvApiPath.getPolicy}?lob=${self.policyLOB.NUM_IL_PRODUCT_NAME}&policyNo=${polNo}`,
          {}
        )
          .then(function (response) {
            if (response.status == 200) {
              let modifyResponseDataReq = response.data.data.response
                .map((e) => {
                  return {
                    ...e,
                    editable: self.editableFields[e.fieldName] ? true : false,
                  };
                })
                .sort((a, b) =>
                  a.editable > b.editable ? -1 : b.editable > a.editable ? 1 : 0
                );

              self.modifyResponseData = modifyResponseDataReq;
              self.editableTableData = modifyResponseDataReq.filter(policy => policy.editable);
              self.showModifyResponseData = [...self.editableTableData];

              self.dataLoader = false;
            } else {
              self.dataLoader = false;
            }
          })
          .catch(function (error) {
            console.log(error, "error");
            self.dataLoader = false;
          });
      };

      if (self.statusIdNo == 4) {
        self.drawer = {
          show: true,
          isEditable: !self.notEditableFeature,
        };
        apiCall();
      } else if (self.statusIdNo == 2 || self.statusIdNo == 3) {
        self.drawer = {
          show: true,
          isEditable: false,
        };
        apiCall();
      } else {
        self.drawer = {
          show: false,
          isEditable: false,
        };
      }
    },

    toggleNoRecords() {
      let self = this;
      if (
        self.showModifyResponseData.length != self.modifyResponseData.length
      ) self.showModifyResponseData = [...self.modifyResponseData]
      else self.showModifyResponseData = [...self.editableTableData]
    },

    putDataModification() {
      let self = this;
      try {
        self.dataLoader = true;
        let modify_requeest_obj = {
          TXT_POLICY_NO: this.policyData.TXT_POLICY_NO,
          POLICY_NO: this.policyData.POLICY_NO,
          lobName: this.policyLOB.NUM_IL_PRODUCT_NAME,
          data: {},
        };
        let lobName = this.policyLOB.NUM_IL_PRODUCT_NAME;

        for (var i = 0; i < this.modifyResponseData.length; i++) {
          let modifydata = this.modifyResponseData[i];
          let modifyNewData = modifydata.newData
            ? modifydata.newData
            : modifydata.data;
          if (modifydata.editable && modifydata.data != modifyNewData) {
            for (var key in this.update_bre_column_mapping[lobName]) {
              if (
                this.update_bre_column_mapping[lobName][key].toLowerCase() ==
                modifydata["fieldName"].toLowerCase()
              ) {
                modify_requeest_obj.data[key] = modifyNewData;
              }
            }
          }
        }
        // console.log(modify_requeest_obj, "modify_requeest_obj");

        apiService("put", cvApiPath.updatePolicy, modify_requeest_obj)
          .then(function (response) {
            // console.log(response,"tes")
            if (response.data.status == 200) {
              self.dataLoader = false;
              self.drawer.show = false;
              self.drawer.isEditable = false;
              self.showToast(
                "Policy modified successfully",
                self.TOST().SUCCESS
              );
            } else {
              self.dataLoader = false;
              self.showToast(response.data.msg, self.TOST().WARNING);
            }
          })
          .catch(function (response) {
            self.dataLoader = false;

            self.showToast("Failed to modify a policy", self.TOST().WARNING);
          });
      } catch (err) {
        self.dataLoader = false;
        console.log("ee", err);
        self.showToast("Failed to modify a policy", self.TOST().WARNING);
      }
    },
    formatDate(date) {
      try {
        let hours = date.split(" ")[1].split(":")[0];
        let minutes = date.split(" ")[1].split(":")[1];
        let sec = date.split(" ")[1].split(":")[2];
        let ms = hours >= 12 ? "pm" : "am";
        // var ms = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        // minutes = minutes < 10 ? '0'+minutes : minutes;

        let m = date.split(" ")[2] || ms;

        let strTime = hours + ":" + minutes + ":" + sec + " " + m;
        let datMod = new Date(date.split(" ")[0]);
        return (
          datMod.getDate() +
          "/" +
          (datMod.getMonth() + 1) +
          "/" +
          datMod.getFullYear() +
          "  " +
          strTime
        );
      } catch (err) {
        console.log(err, "ee");
      }
    },
    formatDateForSort(date) {
      try {
        let hours = date.split(" ")[1].split(":")[0];
        let minutes = date.split(" ")[1].split(":")[1];
        let sec = date.split(" ")[1].split(":")[2];
        let ms = hours >= 12 ? "pm" : "am";
        let m = date.split(" ")[2] || ms;

        hours = hours ? hours % 12 : 12;

        let strTime = hours + ":" + minutes + ":" + sec + " " + m;
        return `${date.split(" ")[0]} ${strTime}`;
      } catch (err) {
        console.log(err, "ee");
      }
    },
    // AUDIT WORKFLOW

    auditWorkFlowData(lob, polNo, item) {
      this.dataLoader = true;
      this.currentActiveProduct = item.TXT_VEHICLE_CLASS;
      this.policyData = item;

      this.selectPol = polNo;
      let self = this;
      self.auditWorkflowStatus = [];

      apiService(
        "get",
        `${cvApiPath.auditWorkFlowList}?lob=${self.policyLOB.NUM_IL_PRODUCT_NAME}&policyNo=${polNo}`
      )
        .then(function (response) {
          if (response.status == 200) {
            self.dataLoader = false;
            self.dialogforAudit = true;
            let result = response.data.data.response.map((e) => {
              return {
                RENEWAL_STATUS: e.WORKFLOW_STATUS || e.RENEWAL_STATUS,
                EXECUTION_START_TIME: e.EXECUTION_START_TIME
                  ? self.formatDate(e.EXECUTION_START_TIME)
                  : "---",
                sortDate: e.EXECUTION_START_TIME
                  ? new Date(self.formatDateForSort(e.EXECUTION_START_TIME))
                  : new Date(),
                TXT_CLIENT_NAME: e.UPDATED_BY || "---",
                NUM_REVISION: e.NUM_REVISION || 0,
              };
            });

            let sorted = result.sort(function (a, b) {
              return b.sortDate.getTime() - a.sortDate.getTime();
            });
            self.auditWorkflowStatus = sorted;
            // console.log(sorted, "sortde");
          } else {
            self.dataLoader = false;
            self.auditWorkflowStatus = [];
            self.showToast(
              "Failed to fetch audit workflow",
              self.TOST().WARNING
            );
          }
        })
        .catch(function (error) {
          self.showToast("Failed to fetch audit workflow", self.TOST().WARNING);
          self.auditWorkflowStatus = [];
          self.dataLoader = false;
        });
    },

    auditSingleFileDownload(lob, item) {
      this.currentActiveProduct = item.TXT_VEHICLE_CLASS;
      let self = this;
      self.policyData = item;

      // console.log(item,"item")
      let request = {
        policyNumber: self.selectPol,
        lob: self.policyLOB.NUM_IL_PRODUCT_NAME,
        renewalStatus: item.RENEWAL_STATUS,
        numRevision: item.NUM_REVISION,
        // executionTime:
        // moment(new Date(item.sortDate)).format(
        //   "MM-DD-YY h:mm:ss A"
        // )
        
      };
      self.dataLoader = true;
      apiService("post", cvApiPath.auditWorkFlowListSingleDownload, request)
        .then((response) => {
          if (response.status == 200) {
            self.downloadFileFromUrl(response.data, request + "_" + ".xlxs");
            self.dataLoader = false;
          } else {
            self.dataLoader = false;
          }
        })
        .catch((err) => {
          self.dataLoader = false;
          console.log(err);
        });
    },
    auditTrailDownload() {
      let self = this;
      let request = {
        policyNumber: self.selectPol,
        lob: self.policyLOB.NUM_IL_PRODUCT_NAME,
      };
      self.dataLoader = true;

      apiService("post", cvApiPath.auditWorkFlowListDownload, request)
        .then((response) => {
          if (response.status == 200) {
            self.downloadFileFromUrl(response.data, request + "_" + ".xlxs");
            self.dataLoader = false;
          } else {
            self.dataLoader = false;
          }
        })
        .catch((err) => {
          self.dataLoader = false;
          console.log(err);
        });
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

    downloadData(fileName, fileURL) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", fileURL, true);
      xhr.responseType = "blob";
      xhr.onload = function (e) {
        if (this.status == 200) {
          let myBlob = this.response;
          var link = document.createElement("a");
          link.href = URL.createObjectURL(myBlob);
          link.style = "visibility:hidden";
          link.download = fileName + ".pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };
      xhr.send();

      //   var link = document.createElement("a");
      // link.href = fileURL;
      // link.style = "visibility:hidden";
      // link.download = "Agent_Copy_" + fileName + ".pdf";
      // document.body.appendChild(link);
      // window.open(fileURL, "_blank");
      // document.body.removeChild(link);
    },

    // autoFetchCommunicationBucket(){
    //   console.log("-----Auto fetch initiated -----")
    //   let checkCount = this.policyCountData.filter(
    //     (e) => e.status_BE == this.statusIdNo
    //   );
    //   let bucketCount = checkCount[0].totalCount

    //   if(
    //   this.statusNo == 6 && bucketCount >= 1 || this.statusNo == 5 && bucketCount >= 1
    //   || this.statusNo == 7 && bucketCount >= 1
    //   ){
    //     setTimeout(() => {
    //       console.log("----- trigger for policy count api -----")
    //       this.getPolicyCountData(false);
    //       this.autoFetchCommunicationBucket()
    //             }, 30000);
    //   }
    // }
  },

  computed: {
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
    getNoOfPages() {
      if (!this.totalListCount) {
        return 0;
      } else {
        return Math.ceil(this.totalListCount / this.limitValue);
      }
    },
    computedExpiryPeriodTo() {
      return this.expiryDateTo
        ? moment(this.expiryDateTo).format("YYYY-MM-DD ")
        : "";
    },
    computedExpiryPeriodFrom() {
      return this.expiryDateFrom
        ? moment(this.expiryDateFrom).format("YYYY-MM-DD ")
        : "";
    }
  },
  // watch: {
  //   statusNo(newBucket, oldBucket) {
  //     let checkCount = this.policyCountData.filter(
  //       (e) => e.status_BE == this.statusIdNo
  //     );
  //     let bucketCount = checkCount[0].totalCount
  //     if(newBucket == 6 && bucketCount >= 1 || newBucket == 5 && bucketCount >= 1
  //     || newBucket == 7 && bucketCount >= 1
  //     ){
  //       console.log("-----Watch trigger for communication queue -----")
  //       this.autoFetchCommunicationBucket();
  //     }
  //   }
  // }
};
</script>

<style>
.load {
  background-color: #fafafa;
  transition: inherit;
}
.v-card {
  cursor: pointer;
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
.dropdown-content {
  display: none;
  position: absolute;
  top: 24px;
  left: -16px;
  background-color: white;
  min-width: 160px;
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
.dropbtn:hover .dropdown-content {
  display: block;
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
  min-width: 143px;
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

.dateRange {
  width: 170px;
}
.v-input input {
  max-height: 32px;
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
.uploadDivCount {
  margin-top: 20px;
  height: 85px;
  width: 400px;
  margin-left: 16px;
  background-color: rgb(238, 235, 235);
}
input[type="file"] {
  display: none;
}

.dropdown:hover {
  display: block;
  margin-top: 0;
}

.breFailed {
  width: 450px;
  margin: 22px;
}
.table1::-webkit-scrollbar {
  width: 8px;
}

.table1 ::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.table1 ::-webkit-scrollbar-thumb {
  background: #606060;
  border-radius: 5px;
}

.highlight {
  border: 1px solid #01afcb;
  opacity: 1;
  /* width: 142px; */
  /* margin: -8px 0px 0px -8px; */
  /* height: 81px; */
  color: #01afcb;
  /* font-size: 8px !important; */
  background-image: linear-gradient(#ffffff, #e6e6e6);
  box-shadow: #0073bb4d;
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
td input[type="text"] {
  padding: 12px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  box-sizing: border-box;
  background-color: #ffffff;
}
.txt-loader {
  position: fixed !important;
  left: 50% !important;
  top: 50% !important;
  transform: translate(-50%, -50%) !important;
  pointer-events: none !important;
}
.v-progress-circular {
  margin: 1rem;
  box-shadow: 10px 10px 10px 1000px rgba(54, 48, 48, 0.5) !important;
  background-color: rgba(54, 48, 48, 0.5);
  width: 150px;
  overflow: hidden;
}
.inbox-pos {
  display: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
td input[type="number"] {
  -moz-appearance: textfield;
}
*/ .main_dropdown .v-text-field.v-text-field--solo .v-input__control {
  min-height: 30px !important;
  max-height: 5px;
  border-radius: 5px;
}

.main_dropdown
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border-radius: 5px;
  outline: solid 1px rgb(201, 201, 201);
}
.v-text-field.v-text-field--enclosed .v-input__append-inner,
.v-text-field.v-text-field--enclosed .v-input__append-outer,
.v-text-field.v-text-field--enclosed .v-input__prepend-inner,
.v-text-field.v-text-field--enclosed .v-input__prepend-outer {
  color: #606060;
  margin-right: -9px;
}
.auditTrail_table .theme--light.v-table tbody tr:nth-child(odd) {
  background-color: #e9eff7;
}

.auditTrail_table .theme--light.v-table tbody tr:nth-child(even) {
  background-color: #d1deef;
}

.auditTrail_table .v-table__overflow table thead tr th {
  background-color: #5b9bd5;
  color: white;
}
.table-bucketlabel {
  background-color: #01afcb;
  color: white;
  border-radius: 25px;
  font-size: 11px;
  font-weight: 400;
  padding: 4px;
  border-radius: 16px;
}
.bulk-action-select {
  max-width: 211px;
  margin-right: 5px;
  display: flex;
  flex-direction: column;
}
.table-col-policyNo {
  background-color: #eff3f4;
  /* padding: 10px; */
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
  right: 190px;
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
  width: 100px;
  height: 35px;
  background-color: #0073bb;
  color: #ffffff !important;
  border: 1.5px solid #ccc;
  border-radius: 4px;
  text-transform: capitalize;
}

@media (min-width: 267.98px) {
  .bucket-card {
    width: 140px;
    height: 82px;
    max-width: 140px;
  }
  .card-lab {
    font-size: 9px;
  }
  .card-num {
    font-size: 16px;
  }
}

@media (min-width: 991.98px) {
  .bucket-card {
    width: 140px;
    height: 80px;
    max-width: 140px;
  }
  .card-lab {
    font-size: 9px;
  }
  .card-num {
    font-size: 16px;
  }
}

@media (min-width: 1199.98px) {
  .bucket-card {
    width: 150px;
    height: 85px;
    max-width: 150px;
  }
  .card-lab {
    font-size: 10px;
  }
  .card-num {
    font-size: 18px;
  }
}

@media (min-width: 1399px) {
  .bucket-card {
    width: 165px;
    height: 95px;
    max-width: 165px;
  }
  .card-lab {
    font-size: 12px;
  }
  .card-num {
    font-size: 20px;
  }
  .v-overlay:before {
    background-color: transparent !important;
    bottom: 0;
    content: "";
    height: 100%;
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: inherit;
    transition-delay: 0.15s;
    width: 100%;
  }
}

.v-overlay:before {
  background-color: none !important;
  bottom: 0;
  content: "";
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: inherit;
  transition-delay: 0.15s;
  width: 100%;
  cursor: not-allowed;
}
.v-text-field__details{
  display: none !important;
}
</style>
