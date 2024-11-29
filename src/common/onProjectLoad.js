import axios from 'axios'

export default {
    getFileCategroy(self, user_id, cb) {
        self.GET('get_file_category?userId=' + user_id, function(res, error) {

            if (error) {
                // self.showToast('Something goes wrong', self.TOST().ERROR);
                console.log('Error ', error);
                return;
            }

            // When database fails
            if (res.data.errCode == 4) {
                // self.showToast('Database Error', self.TOST().ERROR);
                return;
            }
            // Clear
            self.commit('SAVE_FILE_CATEGORY', 'clear');

            if (res.data.errCode == -1) {
                // Convert Integer value to string to bind value properly at radio button
                // let fileCategory = res.data.errMsg.map( obj => obj.categoryName);
                res.data.errMsg.forEach(obj => { self.commit('SAVE_FILE_CATEGORY', obj.categoryName); });
                cb();
            } else {
                cb();
                // self.showToast('Data not found', self.TOST().INFO);
            }
        });
    },
    insertNewOne(self, sendData, user_id, success) {
        self.POST('new_file_category/' + user_id, sendData, (res, error) => {

            if (error) {
                // self.showToast('Something goes wrong', self.TOST().ERROR);
                console.log(error);
                return;
            }

            if (res.data.errCode == 4) {
                // if (typeof(res.data.errMsg) == "string") {
                //     self.showToast('Database Error', self.TOST().ERROR);
                // } else {
                //     self.showToast('This sequence is already exist', self.TOST().WARNING);
                // }
            }

            if (res.data.errCode == 1) {
                // self.showToast('Mandatory fields are not found', self.TOST().WARNING);
                return;
            }
            if (res.data.errCode == -1) {
                // let category = res.data.errMsg.map(obj => obj.categoryName);
                self.commit('SAVE_FILE_CATEGORY', res.data.errMsg.categoryName);
                success(1);
                return;
            }
        });
    },

    /**
     * Date 21/01/2018
     * @function loadProductCategories
     * @description The product categories, comming from the database through API and bind at dropdown after filtering the list
     *
     * Note: I am using Array.map for maping as an another array with only required data
     */
    loadProductCategories(self, userId) {
        // it is a mixin
        // let userId = '5b3b4cc28fa96d39870443e3';
        console.log("Called from Product Category Master");
        self.GET('getprodCategory?filter=1', function(res, error) {
            if (error) {
                console.log(error);
                // self.showToast('Something goes wrong, please check console', self.TOST().ERROR);
                return;
            }
            if (res.data.errCode == -1) {
                self.commit('SAVE_PRODUCT_CATEGORY', 'clear');
                // let productCategory = [];
                // productCategory = res.data.errMsg.map( obj => { return });
                res.data.errMsg.forEach(obj => {
                    // Only active products are allowed to save
                    if (obj.active == 1) {
                        self.commit('SAVE_PRODUCT_CATEGORY', { abbr: obj._id, state: self.doSentenceCase(obj.productCategoryName) });
                    }
                });
            } else {
                // self.showToast('Product Categories are not found', self.TOST().INFO);
            }
        });
    },

    loadRoleCodes(self, cb) {
        let roles = []
        self.GET('getrole?userId='+self.getAgentInfo()._id, function(resp, error) {
            if (!error) {
                let roleList = resp.data.errMsg[0];
                for (let i = 0; i < roleList.length; i++) {
                    let data = {
                        state: roleList[i].roleName,
                        abbr: roleList[i]._id
                    }
                    roles.push(data);
                    data = {};
                }
                self.commit('SAVE_ROLE_CODES', roles);
                cb();
            } else {
                cb()
                console.log(error);
            }
        });
    },

    getBlogsCategories(self) {
        const FETCH_B_CATEGORIES = 'fetch_blogCategories?filter=1';
        this.GETUSER(FETCH_B_CATEGORIES , function(res , error){
            if (res.data.errCode == -1) {
                self.commit('SAVE_BLOGS_CATEGORY', 'clear');
                res.data.errMsg.forEach(obj => {
                    self.commit('SAVE_BLOGS_CATEGORY', { abbr: obj._id, state: self.doSentenceCase(obj.blogCategoryName) });
                });
            }
        })
    },

    getChannel(self, response) {
        self.GET('getchannel?userId=' + self.getAgentInfo()._id+'&filter=1', res => {
            if (res.data.errCode == -1) {
                response(res.data.errMsg)
            }
        });
    },
}
