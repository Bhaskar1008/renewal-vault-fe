<template>
    <v-app style="background-color: #b5c1c433">
        <v-card class="ma-3">
            <div>
                <div class="pa-4">
                    <div class="d-flex justify-space-between align-center">
                        <v-text class="font-weight-bold" style="color: #1e83c2">Downloads</v-text>
                        <div class="d-flex-inline" style="text-align: right;">
                            <v-btn @click='fetchDownloadReport(userName)'>Refresh</v-btn>
                        </div>
                    </div>
                    <v-text style="color: orange;">Links displayed here are for today's date only. Downloaded link will be
                        available for 3 hrs only.</v-text>
                </div>
                <div class="pl-4 pr-4 pb-4 pt-0">
                    <v-data-table 
                        no-data-text="No data available" 
                        :headers="headers" 
                        :items="tableDataToDIsplay" 
                        hide-actions
                        class="elevation-1 theme--light v-datatable v-table">
                        <template slot="headers" slot-scope="props">
                            <tr>
                                <th
                                v-for="header in props.headers"
                                :key="header.text"
                                style="color: white; background: rgb(1, 175, 203); text-align: left;"
                                >
                                {{ header.text }}
                                </th>
                            </tr>
                        </template>

                        <template slot="items" slot-scope="props">
                            <td style="background-color: rgb(239, 243, 244); height: 69px;">{{ props.item.REQUEST_ID }}</td>
                            <td style="background-color: rgb(239, 243, 244); height: 69px;">{{ convertTimeFormat(props.item.createdAt) }}</td>
                            <td style="background-color: rgb(239, 243, 244); height: 69px;">{{ props.item.LOB_NAME }}</td>
    
                            <td style="background-color: rgb(239, 243, 244); height: 69px;" v-if="props.item.STATUS == 'complete'">
                                <a v-if="validateS3Url(props.item.DOCUMENT_LINK)" :href="props.item.DOCUMENT_LINK" @click="downloadFileByS3Url($event, props.item.DOCUMENT_LINK)">Download</a>
                                <span v-else style="color: grey;">Download link expired</span>
                            </td>
                            <td style="background-color: rgb(239, 243, 244); height: 69px; color: orange;" v-else-if="props.item.STATUS == 'pending'">In Progress</td>
                            <td style="background-color: rgb(239, 243, 244); height: 69px; color: red;" v-else>Failed</td>
                        </template>
                    </v-data-table>
                    <v-layout justify-end>
                        <div class="margincls mt-3 mr-3">
                            <span>
                            Showing <b>{{ pageStartIndex }}</b> -
                            <b>{{ pageEndIndex }}</b></span
                            >
                            <span>
                            out of <b>{{ tableDataCount }}</b> records
                            </span>
                        </div>
                        <v-pagination
                            class="mr-4 mt-1"
                            color="#152F38"
                            :length="Math.ceil(tableDataCount / tableLimit)"
                            :total-visible="5"
                            v-model="currentPage"
                            @input="onPaginatorModelChange($event)"
                        >
                        </v-pagination>
                    </v-layout>
                </div>
            </div>
        </v-card>
        <template>
            <v-dialog v-model="dataLoader" persistent style="background-color: none;">
                <div class="text-xs-center txt-loader">
                    <v-progress-circular :size="100" indeterminate color="white"
                        class="mb-0">Loading...</v-progress-circular>
                </div>
            </v-dialog>
        </template>

        
    </v-app>
</template>

<script>
import moment from "moment";
import { cvApiPath } from "../../../common/API_Config";
import { apiService } from "../common/common";

/**
 * Function extracts the s3 presigned url expiry time and validates whether it is active or expired
 * 
 * @param {string} s3Url 
 * @returns {boolean} 
 * 
 * true: If url is valid. 
 * false: If url is expired
 */
const checkIfS3UrlIsValid = (s3Url) => {
    const url = new URL(s3Url);
    let urlCreationDate = url.searchParams.get('X-Amz-Date');
    let urlExpiryTimeInSec = url.searchParams.get('X-Amz-Expires');
    if (!!urlExpiryTimeInSec && !!urlCreationDate) {
        urlExpiryTimeInSec = Number(urlExpiryTimeInSec);
        urlCreationDate = moment(urlCreationDate, "YYYYMMDDTHHmmssZ");
        const differenceInSec = moment().unix() - urlCreationDate.unix();
        
        // invalidate url 30 seconds before the expiry time
        if (differenceInSec < (urlExpiryTimeInSec - 30)) {
            return true;
        }
    }
    return false;
}

export default {
    data() {
        return {
            pageStartIndex: 0,
            pageEndIndex: 0,
            tableLimit: 5,
            currentPage: 1,
            headers: [
                {
                    text: 'Request Id',
                    align: 'left',
                    sortable: false,
                    value: 'REQUEST_ID'
                },
                {
                    text: 'Generated At',
                    sortable: false,
                    value: 'createdAt'
                },
                {
                    text: 'LOB',
                    sortable: false,
                    value: 'LOB_NAME'
                },
                {
                    text: 'Status',
                    sortable: false,
                    value: 'STATUS'
                }
            ],
            tableData: [],
            tableDataToDIsplay: [],
            tableDataCount: 0,
            userName: '',
            dataLoader: false,
            enableFetchStatus: true,
        }
    },
    created() {
        const awsToken = localStorage.awsToken;
        if (awsToken) {
            this.defaultFunction();
        } else {
            setTimeout(() => {
                this.defaultFunction();
            }, 3000);
        }
    },
    mounted() {
        this.enableFetchStatus = true;
        this.fetchDownloadReport(this.userName);
    },
    beforeDestroy() {
        this.enableFetchStatus = false;
    },
    methods: {
        onPaginatorModelChange(event) {
            let totalPageCount = Math.ceil(this.tableDataCount / this.tableLimit);
            let startIndex = (event - 1) * this.tableLimit;
            this.pageStartIndex = startIndex + 1;
            if (event === totalPageCount) {
                this.pageEndIndex = this.tableDataCount;
                this.tableDataToDIsplay = this.tableData.slice(startIndex);
            } else {
                let endIndex = event * this.tableLimit;
                this.pageEndIndex = endIndex;
                this.tableDataToDIsplay = this.tableData.slice(startIndex, endIndex);
            }
        },
        validateS3Url: checkIfS3UrlIsValid,
        downloadFileByS3Url(event, s3Url) {
            if (!this.validateS3Url(s3Url)) {
                event.preventDefault();
                event.stopPropagation();
                this.showToast('Download Link Expired', this.TOST().ERROR);
            }
        },
        defaultFunction() {
            this.getUserData();
        },
        getUserData() {
            this.userName = JSON.parse(localStorage.loginResp).data.USER_NAME
        },
        isThreeHoursAgo(time) {
            //Not working----need to be fixed
            const givenTime = moment(time);
            const currentTime = moment();
            const hoursDifference = currentTime.diff(givenTime, 'hours');
            if (hoursDifference === 3) return 'disabled';
            else return '';
        },
        fetchDownloadReport(userId) {
            let self = this;
            apiService("post", cvApiPath.getDownloadReports, { userId, time : moment().unix() })
                .then((response) => {
                    if (response.status == 200) {
                        self.tableData = response.data.data;
                        self.tableDataCount = response.data.count[0].totalCount
                        self.dataLoader = false;
                        self.onPaginatorModelChange(self.currentPage);
                        let isInprogressDataExists = self.tableData.find(e => e.STATUS == 'pending');
                        if (isInprogressDataExists) setTimeout(() => {
                            if (self.enableFetchStatus) this.fetchDownloadReport(userId);
                        }, 30000)
                    }
                })
                .catch((error) => {
                    self.dataLoader = false;
                    self.tabledata = [];
                    self.tableDataCount = 0;
                });
        },
        convertTimeFormat(dateTime) {
            const formattedDateTime = moment(dateTime).format('D/M/YYYY h:mm:ss A');
            return formattedDateTime;
        }
    }
}
</script>

<style setup>
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
</style>
