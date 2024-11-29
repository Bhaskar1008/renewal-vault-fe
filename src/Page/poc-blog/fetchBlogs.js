import _ from 'lodash'

export default {

    setProducts(_self) {

        let productData = _self.$store.getters.fetchBlog;

        if (Object.keys(productData).length !== 0) {

            let modified_productCategory = {
                abbr: productData.category._id,
                state: productData.category.blogCategoryName
            }
            _self.frmOne.productType = modified_productCategory;
            _self.frmOne.productName = productData.title;
            _self.frmOne.description = productData.content;
            _self.blogID = productData._id;

            _self.active = productData.active.toString();
            _self.imageTitle = productData.imageTitle;

            if (productData.status == 'Draft') {
                _self.publish = '0'
            } else if (productData.status == 'Published') {
                _self.publish = '1'
            }

            let struct = {}

            // if (productData.productVideo.length !== 0) {
            //     _.forEach(productData.productVideo, function(e) {
            //         struct = {
            //             thumbnail:_self.node_img_url()+e.name,
            //             fileName: e.name,
            //             fileType: e.type,
            //             active: e.active.toString()         // In string formate 1 => "1" and 0 => "0"
            //         }
            //         _self.productMedia.push(struct);
            //         struct = {};
            //     });
            // }
            // Latest condition
            console.log('Not Found' , productData.blogImages);
            if (Object.keys(productData.blogImages).length != 0) {
                struct = {
                    thumbnail:productData.blogImages.location,
                    fileName: productData.blogImages.name,
                    fileType: productData.blogImages.type,
                    active: productData.blogImages.active.toString()            // In string formate 1 => "1" and 0 => "0"
                }
                _self.productMedia.push(struct);

                // _.forEach(productData.blogImages, function(image) {


                //     struct = {};
                // });
            }

            console.log('Blog Media : ', _self.productMedia);


        }
    }
}
