import _ from 'lodash'
// only for temp not meaning or relation with the actual code
function ObjectId(id) {
    return id
}

export default {
    data() {
        // Object for testing
        return {
            "_id": ObjectId("5c54419310ef08365cb42397"),
            "productReasons": {
                "reason1": "one",
                "reason2": "two",
                "reason3": "three",
                "reason4": "four",
                "reason5": "five"
            },
            "videoTitle": "How Plans works",
            "imageTitle": "How Products works",
            "active": 1,
            "userId": ObjectId(this.getAgentInfo()._id),
            "productCategory": ObjectId("5c52cd4db349081b7c8690e7"),
            "productName": "Protection Testing",
            "productDescription": "<p>Testing</p>",
            "role_name": "AD002",
            "productImages": [{
                    "name": "2a7b0e0aa32ba64df1ca30fd72dbfda39fc23a26.jpeg",
                    "type": "jpeg",
                    "active": 1
                },
                {
                    "name": "a602c064b0ddf05d67667d5d5e0d6b6ef1a61611.jpeg",
                    "type": "jpeg",
                    "active": 1
                }
            ],
            "productVideo": [{
                "name": "9ea31519226599a27377cf9a641286c6cd162f28.mp4",
                "type": "mp4",
                "active": 1
            }],
            "videoLink": "",
            "productBrochure": []
        }
    },
    setProducts(_self, channel) {
        console.log("The CHANNEL =>", channel);
        let productData = _self.$store.getters.getProducts;
        // let productData = this.data();
        console.log(productData, 'After data saving at Store');
        if (Object.keys(productData).length !== 0) {

            console.log('PRODUCT DATA FROM STORE IS ->',productData );

            _self.frmOne.reasons1 = productData.productReasons.reason1;
            _self.frmOne.reasons2 = productData.productReasons.reason2;
            _self.frmOne.reasons3 = productData.productReasons.reason3;
            _self.frmOne.reasons4 = productData.productReasons.reason4;
            _self.frmOne.reasons5 = productData.productReasons.reason5;

            _self.frmOne.weblink = productData.web_link;
            _self.frmOne.appid = productData.appID

            _self.active = productData.active.toString();

            /**
             * Product Category dropdown contains tow keys
             * abbr : value
             * state : text
             */

            let modified_productCategory = {
                abbr: productData.productCategory._id,
                state: productData.productCategory.productCategoryName
            }
            console.log("The product ID =>", modified_productCategory)

            _self.frmOne.productType = modified_productCategory;
            _self.frmOne.productName = productData.productName;
            _self.frmOne.description = productData.productDescription;
            _self.videoURL = productData.videoLink;

            console.log("The ID in new variable =>", _self.frmOne.productType);

            // _self.frmOne.role = productData.role_name;
            // Latest
            /** Date 05/02/2019
             * When admin wants to edit selected product then all value automatically sets to the respective fields but the
             * problem is channel code and role code not set directl so I have implement these line of code
             *
             * this code take roles_code or channel code from API response and compare these value with respective arrays when values
             * are matched then it move object from the array to channel code or role code varibale then event function are called
             */

            // for (let i = 0; i < _self.rolesList.length; i++) {
            //     if (productData.role_name._id == _self.rolesList[i].abbr) {
            //         _self.frmOne.role = _self.rolesList[i];
            //     }
            // }

            // _self.channelCode = productData.channelCode;         // not required

            // let channels = _self.$store.state.chanelDetails;
            // console.log("getproductfromstore =>", _self.channelList[i].abbr)

            _self.channelList = channel.filter(e => e.active == 1).map(e => {
               
                return {
                    state: e.channelName,
                    abbr: e._id
                }
            });

            //Modified by Akshay @akrazr, just passed on the channelCode to  the V-Mode of channel drop-down and it populates as intended
          
            console.log('productData channelCode ->', productData.channelCode);
            console.log('_self.channelList[i].abbr', _self.channelList );

            // for (let i = 0; i < _self.channelList.length; i++) {

            //     if (productData.channelCode[i] == _self.channelList[i].abbr) {
                    
            //         // _self.channelCode.push(self.channelList[i].abbr);
            //         console.log('are we matchinhg ?', _self.channelList[i].abbr);
            //     }
            // }

    
            _self.channelCode = productData.channelCode
        

           

            console.log('Binded v-model of channelCode ->',  _self.channelCode);
            
                
            // event functions which send object as an event
            // _self.changeRoleCode(_self.frmOne.role);
            _self.onChannelChange(_self.channelCode);

            // -----------------------------------------------------------------------------------------------------------------------

            _self.active = productData.active.toString();
            _self.fileCategory = productData.fileCategory == null ? '' : productData.fileCategory;
            _self.videoTitle = productData.videoTitle;
            _self.imageTitle = productData.imageTitle;

            // console.log('Form fied from store' , _self.frmOne);

            /**
             * New Coditions because backend is changed
             * productVideo and productImages both are type []
             *
             * when no data then it is an empty array
             * when data then it contains multiple objects
             */

            let struct = {}

            if (productData.productVideo.length !== 0) {
                _.forEach(productData.productVideo, function(e) {
                    struct = {
                        thumbnail: '',
                        location: e.location,
                        fileName: e.name,
                        fileType: e.type,
                        active: e.active.toString() // In string formate 1 => "1" and 0 => "0"
                    }
                    _self.productMedia.push(struct);
                    struct = {};
                });
            }

            // Depreceated
            // if (productData.productVideo.name !== '' && productData.productVideo.type !== '') {
            //     struct = {
            //         thumbnail:_self.node_img_url()+productData.productVideo.name,
            //         fileName: productData.productVideo.name,
            //         fileType: productData.productVideo.type,
            //         active: productData.productVideo.active.toString()         // In string formate 1 => "1" and 0 => "0"
            //     }
            //     _self.productMedia.push(struct);
            //     struct = {};
            // }

            // temporary conditions
            // deprecated
            // if (typeof(productData.productImages) == "string") {
            //     struct = {
            //         thumbnail: productData.productImages,
            //         fileName: productData.productImages,
            //         fileType: '',
            //         active: "1"
            //     }
            //     _self.productMedia.push(struct);
            //     struct = {};

            // } else if (productData.productImages.name !== '' && productData.productImages.type !== '') {
            //     struct = {
            //         thumbnail:_self.node_img_url()+productData.productImages.name,
            //         fileName: productData.productImages.name,
            //         fileType: productData.productImages.type,
            //         active: productData.productImages.active.toString()            // In string formate 1 => "1" and 0 => "0"
            //     }
            //     _self.productMedia.push(struct);
            //     struct = {};
            // }

            // Latest condition
            if (productData.productImages.length !== 0) {
                _.forEach(productData.productImages, function(image) {
                    struct = {
                        location: image.location,
                        thumbnail: '',
                        fileName: image.name,
                        fileType: image.type,
                        active: image.active.toString() // In string formate 1 => "1" and 0 => "0"
                    }
                    _self.productMedia.push(struct);
                    struct = {};
                });
            }

            console.log('Media : ', _self.productMedia);

            if (productData.productBrochure.length !== 0) {
                for (let prdObj of productData.productBrochure) {
                    // let index = _self.language.findIndex( obj => obj.state == prdObj.language);
                    struct = {
                        fileName: prdObj.files.name,
                        fileType: prdObj.files.type,
                        fileCategory: prdObj.fileCategory,
                        // language: _self.language[index].abbr,
                        language: prdObj.language,
                        brochureType: prdObj.brochureType,
                        location: prdObj.location,
                        active: prdObj.active.toString(),
                    }
                    _self.brochuresDetails.push(struct);
                    struct = {};
                }
            }
        }
    }
}
