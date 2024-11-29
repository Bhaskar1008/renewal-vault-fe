<template>
    <div>
        <v-data-table
            :headers="headers"
            :items="productdata"
            class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item._id | formate-id('B')}}</td>
                <td class="text-xs-left">{{ props.item.productType }}</td>
                <td class="text-xs-left text-no-wrap ">{{ props.item.productName | short}}</td>
                <td class="text-xs-left text-no-wrap">{{ props.item.productDescription | short }}</td>
                <td class="text-xs-left">{{ props.item.createdDate }}</td>
                <td class="text-xs-left">{{ props.item.createdBy }}</td>
                <td class="text-xs-left"><span :style="{color: props.item.active == 'Inactive' ? '#d61111' : '#13961c'}">{{ props.item.active }}</span></td>
                <td class="text-xs-left">{{ props.item.pubStatus }}</td>
                <td class="text-xs-left">{{ props.item.publishedBy }}</td>
                <td class="text-xs-left">{{ props.item.publishedDate }}</td>
                <td class="text-xs-left"><v-btn @click="editProduct(props.item)" icon><v-icon color="#636363">edit</v-icon></v-btn></td>
            </template>
        </v-data-table>

    </div>
</template>
<script>
import axios from 'axios'
import support from './fetchBlogs'

export default {
    props: {
        callback: Function,
        modifiedReponse: Object
    },
    created() {
        this.tabledata();
    },
    data() {
        return {
            carDialogDoc:false,
            productdata:[],
            description:'',
            showList: false,
            allProducts: [],
            doc_index: 0,
            editActive: false,
            headers: [
                {
                    text: 'Blog ID',
                    align: 'center',
                    sortable: false,
                    value: 'id'
                },
                { text: 'Category', value: 'category'},
                { text: 'Title', value: 'title', width: '200px'},
                { text: 'Content', value: 'content' },
                { text: 'Created Date', value: 'created_date'},
                { text: 'Created By', value: 'created_by' },
                { text: 'Status', value: 'status' },
                { text: 'Published Status', value: 'published_status' },
                { text: 'Published By', value: 'published_by'},
                { text: 'Date', value: 'date'},
                { text: 'Action', value: 'action'},
            ],
        }
    },

    filters: {
        short(text) {
            try {
                if (text.length > 50) { text = text.slice(0, 50)+'...';}
            }catch(err) {}
            return text;
        },
        formateId(id, initial) {
            try {
                if (id == null || id == undefined || id == "") { return id; }
                return initial + id.slice(16, 25).toUpperCase();
            } catch (err) { return id; }
        }
    },

    methods: {
        imgWindow(event) {
            this.description=event.productDescription
            console.log('popup::::',this.description)

            this.carDialogDoc = true;
            this.imgSlideIndex = 3;
            console.log('hdkjsahdkjah');
        },

        resetValues() {
            this.doc_index =  0;
            this.editActive = false;
        },

        changeTheStatus_Product(radio, _data_, index) {
            let self = this;
            // console.log(radio, 'Value of radio button ');
            this.showConfirmDialog('Confirm', 'Are you sure you want to change this?', event => {
                if (event == 1) {
                    let modified_data = self.assignNewProperties(self.allProducts[index]);
                    modified_data.active = radio.toString(); // Convert integer to String
                    self.commit('SAVE_PRODUCTS', modified_data);
                    // calling Parent function throught props in component which is act like a component
                    self.callback({code: 200, http_method: 'PUT'});
                } else {
                    self.productdata[index].active = radio == "0" ? "1" : "0";
                }
            });
        },

        tabledata() {
            /**
             * @author Khan Usama
             * Note: Dont confuse with varibles name because all code is replicated from product module
             */
            const FETCH_ALL_BLOGS = 'fetchBlogs?filter=0';
            let self = this;
            this.productdata = [];
            this.GETUSER(FETCH_ALL_BLOGS,
                res => {
                if (res.data.errCode == 4) {
                    self.showToast('Database Error' , self.TOST().ERROR);
                    self.$emit('onNotFound', false);
                }
                if (res.data.errCode == 505) {
                    self.showList = false;
                    // self.showToast('No blogs are found' , self.TOST().INFO);
                    self.$emit('onNotFound', false);
                    return;
                }
                if (res.data.errCode == -1) {
                    let _getRespData = this.allProducts = res.data.errMsg;
                    let _length = _getRespData.length;

                    for (let i = 0; i < _length; i++) {
                        self.productdata.push(this.assignProps(_getRespData[i], i));
                    }
                    self.showList = true;
                    self.$emit('onNotFound', true);
                } else {
                    self.showList = false;
                    self.showToast('Database Error' , self.TOST().ERROR);
                    self.$emit('onNotFound', false);
                }
            })
            .catch(err => {
                self.showToast('Something goes wrong' , self.TOST().ERROR);
                console.log(err);
            });
        },

        /**
         * @param product is belongs to blog
         */
        editProduct(product) {
            let self = this;
            this.editActive = true;
            this.doc_index = product.index;
            this.fetchBlogById(product._id, res => {
                self.commit('SAVE_EDIT_BLOG', res[0]);
                // console.log('getting blog by id : ' , res[0])
                self.$emit('on-edit', {});
            });
        },

        assignProps(blog_obj, i) {
            return {
                index: i,
                _id: blog_obj._id,
                productType: blog_obj.category.blogCategoryName,
                productName: blog_obj.title,
                productDescription: blog_obj.content,
                // active: blog_obj.active == 1 ? "Active" : "Inactive",
                active: blog_obj.category.active == 0 ? "Inactive" : blog_obj.active == 1 ? "Active" : "Inactive",
                createdBy_id: blog_obj.createdBy._id,
                createdBy: blog_obj.createdBy.first_name + ' ' +blog_obj.createdBy.last_name,
                createdDate: new Date(parseInt(blog_obj.createdDate)).toLocaleDateString(),
                publishedBy: blog_obj.publishedBy == null ? '-' : blog_obj.publishedBy,
                pubStatus: blog_obj.status,
                publishedDate: blog_obj.publishedDate == null ? '-' : new Date(parseInt(blog_obj.publishedDate)).toLocaleDateString()
            }
        },

        fetchBlogById(id, onSucess) {
            // const USER_PATH = this.API_Service();
            const FETCH_BLOGS_BY_ID = 'fetchBlogs?byId='+id;

            this.GETUSER(FETCH_BLOGS_BY_ID,
            res => {
                if (res.data.errCode == 4) {
                    self.showToast('Database Error' , self.TOST().ERROR);
                    return;
                }

                if (res.data.errCode == 23) {
                    self.showToast('Requested blog id is invalid' , self.TOST().WARNING);
                    return;
                }

                if (res.data.errCode == 505) {
                    self.showToast('No blogs are found' , self.TOST().INFO);
                    return;
                }

                if (res.data.errCode == -1) {
                    onSucess(res.data.errMsg);
                    return;
                }
            })
            .catch(err => {
                console.log(err);
                self.showToast('Something goes wrong' , self.TOST().ERROR);
            });
        }
    },

    watch: {
        /**
         * Date 28/02/2019
         * @author Khan Usama
         */
        modifiedReponse(latest, old) {
            let self = this;
            let _clonning = this.productdata.slice(0, this.productdata.length);     // copy of another array

            this.fetchBlogById(latest._id, res => {
                try {
                    if (self.editActive == false) {
                        self.productdata.push(self.assignProps(res[0]));
                        // self.showToast('New Blog is loaded in the table' , self.TOST().SUCCESS);
                    } else {
                        self.productdata = [];
                        let modified = self.assignProps(res[0], self.doc_index);
                        _clonning[self.doc_index] = modified;
                        self.productdata = _clonning.slice(0, _clonning.length);
                        _clonning = undefined;
                        // self.editActive = false;
                        // self.doc_index = 0;
                        // self.showToast('Table updated' , self.TOST().SUCCESS);
                    }
                } catch(err) {
                    console.log('Syntax : ', err);
                    self.showToast('Syntax error' , self.TOST().ERROR);
                }
            });
        }
    }
}

</script>
