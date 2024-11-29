let putleaddata = function(_this, formdata, lead_id, callback) {
    _this.PUTUSER('updateLead/' + lead_id, formdata, response => {
        console.log("Response data", response)
            // if (response.errCode === 4) {
            //     _this.showToast('Database Error', _this.TOST().ERROR);
            //     return;
            // }
            // if (response.errCode === 9) {
            //     _this.showToast('Contact no. already exists', _this.TOST().ERROR);
            //     return;
            // }
            // if (response.errCode === 16) {
            //     _this.showToast('Appointment not booked', _this.TOST().INFO);
            //     return;
            // }
            // if (response.errCode === 1) {
            //     _this.showToast('Mandatory fields are not found', _this.TOST().WARNING);
            //     return;
            // }
            // if (response.errCode === 576) {
            //     _this.showToast(response.errMsg, _this.TOST().ERROR);
            //     return;
            // }
            // if (response.errCode === 729) {
            //     _this.showToast('Appointment already exist on same time', _this.TOST().INFO);
            //     return;
            // }
            // if (response.errCode === 625) {
            //     _this.showToast(response.errMsg, _this.TOST().ERROR);
            //     return;
            // }

        // if (response.errCode === -1) {
        //     _this.showToast('Lead Updated Successfully', _this.TOST().SUCCESS);
        // }
    })
}



export default {
    putleaddata: putleaddata
}