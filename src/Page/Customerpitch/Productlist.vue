<template>
    <div>
        <v-flex mt-4 mb-4 style="text-align:center; font-weight:bold;"> Product List details </v-flex>
        <v-data-table
            hide-actions
            :headers="headers"
            :items="productdata"
            class="elevation-1">
            <template slot="items" slot-scope="props">
                <!-- <td>{{ props.item._id | formate-id('P')}}</td> -->
                <td>{{ props.item.product_Code}}</td>
                <td class="text-xs-left">{{ props.item.productType }}</td>
                <td class="one_td" >
                     <v-menu transition="scale-transition" style="cursor:pointer; border-radius: 12px; "  >
                                                <v-chip ref="channel_chip" outline class="mx-0" slot="activator" style="cursor:pointer !important; font-family:roboto; font-weight:600; letter-spacing: 0.4px; " >
                                                    {{ props.item.arr}}
                                                </v-chip>

                                            <v-card class="pa-3" style="border-radius: 12px;" >
                                                         <ul
                                                            v-for="(item, index) in props.item.final"
                                                            :key="index"
                                                            style="display:flex; flex-direction: column;"
                                                            >
                                                            <li style="margin-bottom:4px;" >{{ item }}</li>
                                                            </ul>
                                            </v-card>



					 </v-menu>


                      </td>
                            <!-- <v-menu open-on-hover top offset-y>
                                        <template v-slot:activator="{ on }">
                                            <v-btn
                                            color="primary"
                                            dark
                                            v-on="on"
                                            >
                                            Dropdown
                                            </v-btn>
                                        </template>

                                        <v-list>
                                            <v-list-item
                                            v-for="(item, index) in items"
                                            :key="index"
                                            >
                                              <v-list-item-title>{{ item.title }}</v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                            </v-menu> -->
                <td class="text-xs-left text-no-wrap ">{{ props.item.productName | short}}</td>
                <td class="text-xs-left text-no-wrap">{{ props.item.productDescription | short }}</td>
                <!-- <td class="text-xs-left">{{ props.item.roleCode }}</td> -->
                <!-- <td class="text-xs-left">{{ props.item.channelName}}</td> -->
                <td class="text-xs-left">{{ props.item.createdDate }}</td>
                <td class="text-xs-left">{{ props.item.createdBy }}</td>
                <td class="text-xs-left">{{ props.item.updtedDate }}</td>
                <td class="text-xs-left">{{ props.item.updateBy }}</td>
                <td class="text-xs-left"><span class="status" :style="{color: props.item.active == 'Inactive' ? '#d61111' : '#13961c'}">{{ props.item.active }}</span></td>
                <td class="text-xs-left"><v-btn @click="editProduct(props.item)" icon><v-icon color="#636363">edit</v-icon></v-btn></td>
            </template>
        </v-data-table>

             <div class="text-xs-center pagination">
                              <v-pagination
                                v-model="page"
                                @input="next($event)"
                                :length="pageLength"
                              ></v-pagination>
             </div>

    </div>
</template>
<script>
import axios from 'axios'
import support from '../../common/getProductFromStore'

export default {
    props: {
        callback: Function
    },
    created(){
        this.$store.commit('SET_PAGE_TITLE','Product List');
        this.tabledata('all', 0);
    },
    mounted() {
        this.headers.map(e =>{
            e.sortable = false;
        });
    },
    data(){
        return{

             page:1,
            skip:0,
            skipdiffrence:this.paginationdiff(),
            pageLength:0,
            carDialogDoc:false,
            productdata:[],
            description:'',
            showList: false,
            allProducts: [],
            headers: [
                { text: 'Product ID', value: 'id'},
                { text: 'Category Name', value: 'category'},
                { text: 'Channel', value: 'chid'},
                { text: 'Product Name', value: 'title'},
                { text: 'Description', value: 'content' },
                // { text: 'Role Code', value: 'role_code' },
                // { text: 'Channel Name', value: 'channel_name' },
                { text: 'Created Date', value: 'created_date'},
                { text: 'Created By', value: 'created_by' },
                { text: 'Updated By', value: 'updated_by' },
                { text: 'Updated Date', value: 'updated_date'},
                { text: 'Status', value: 'status' },
                { text: 'Action', value: 'action'},
            ],
            holdSelectedIndex: 0
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

    watch:{

        channelis:function(val){
            console.log("incoming value from computed is ->", val);
            this.tabledata(val, 0);
        }

    },

    computed:{

            channelis(){

                return this.$store.state.product_channel_id

            }

    },

    methods:{

         next(e){

                let skipdata = e - 1
                console.log('data',skipdata)
                if(skipdata === 0 ){
                    this.skip = 0
                }else{
                    this.skip = this.skipdiffrence*skipdata
                }
                console.log('skip data',this.skip)
                this.tabledata(this.channeldatafilter,this.skip)
         },

        sortit(a, b) {
                return a - b;
        },

        imgWindow(event) {
            this.description=event.productDescription
            console.log('popup::::',this.description)
            this.carDialogDoc = true;
            this.imgSlideIndex = 3;
            console.log('hdkjsahdkjah');
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

        tabledata(e, skip){
            // let API = http://127.0.0.1:5010/secure/admin/getProductsAll?productId=5ac71c50389e780bccd2ad72
            let self = this;
            this.productdata = [];
            var fetch_products
            if(e == 'all' || e == null){
                fetch_products = 'getProductsAll?skip='+skip
            }else{
                fetch_products = 'getProductsAll?channel_code='+e+'&skip='+skip
            }

            console.log("full api build is ->", fetch_products )

            this.GET(fetch_products , (res, error) => {
                if (!error) {
                    if (res.data.errCode == 256 || res.data.errCode == 505) {
                        self.showList = false;
                        self.showToast('Product not found' , self.TOST().INFO);
                        self.$emit('onNotFound', false);
                        return;
                    }

                    if(res.data.errCode == -1){

                        var pageLen = res.data.errMsg[1]
                        let totalCount = pageLen[0].count
                        // console.log('Page Length: ->',totalCount)
                        this.pageLength = Math.ceil(totalCount/this.skipdiffrence)
                        console.log("PG LEN from Product-List ->", this.pageLength)

                        let _getRespData = this.allProducts = res.data.errMsg[0];
                        let _length = _getRespData.length;

                        // When first time data is load on the table from the API
                        let temp = [];
                        console.log("FROM build-api");
                        _getRespData.forEach((e, index, array) => {
                            temp.push(self.mapFields(e, index));
                        });

                        self.productdata = temp;

                        // chch
                        self.productdata.map(e=>{
                             e.arr = e.ch_c.map(ch=>{
                                    return " "+ch.ch_name
                                    // return parseInt(ch.ch.slice(2, ch.ch.length))
                              })
                              e.final = e.arr
                              var len = e.final.length

                            if(e.arr.length > 2){
                                 e.arr = e.arr.toString().slice(0, 28).concat('...')
                            }else{
                                 e.arr = e.arr.toString().replace(/[,]/g, ", ");
                            }
                            //   e.arr = e.arr.slice(0,len - 2)
                            //   e.arr.sort(this.sortit);
                            //   e.arr = [...new Set(e.arr)];
                        })



                    //      self.productdata.map(e=>{
                    //         e.final = e.arr.map(arr=>{
                    //                   return  arr =  "CH"+arr.toString()+" + "
                    //         })
                    //           e.final = [...new Set(e.final)];
                    //           e.final = e.final.toString().replace(/[,]/g, "");
                    //           var len = e.final.length
                    //           e.final = e.final.slice(0,len - 2)
                    //    })
                                                                    // this.$refs

                        console.log('Data FOR TABLE IS -> ' , self.productdata);
                        self.showList = true;
                        self.$emit('onNotFound', true);
                    } else {
                        self.showList = false;
                        self.showToast('Database Error' , self.TOST().ERROR);
                        self.$emit('onNotFound', false);
                    }

                } else {
                    console.log(error);
                    self.showToast('Something wen\'t wrong' , self.TOST().ERROR);
                    self.$emit('onNotFound', false);
                }

                self.showLoader(false);
            });
        },
        mapFields(e, index) {
            // console.log('E is  = > ' , e);

            return {
                index: index,
                _id: e._id,
                product_Code: e.product_code,
                productType: Boolean(e.productCategory) ? e.productCategory.productCategoryName : '-',
                productName:e.productName,
                productDescription:e.productDescription,
                active: e.active === 1 ? "Active" : "Inactive",
                channelName: e.channelCode.channelName,
                ch_c: e.channelCodeList,
                // roleCode: e.role_name.roleName,
                createdDate: new Date(parseInt(e.createdDate)).toLocaleDateString(),
                createdBy: e.created_by.first_name +' '+ e.created_by.last_name,
                updtedDate: new Date(parseInt(e.lastupdatedOn)).toLocaleDateString(),
                updateBy: e.updated_by.first_name +' '+ e.updated_by.last_name,
            }
        },
        editProduct(product, option = 0) {
            let self = this;
            // console.log('I am ', product);
            this.GET('getProductsAll?productId='+product._id, (res, error) => {
                if(error) {
                    self.showToast('Something went wrong', self.TOST().ERROR);
                    console.log('Error ', error);
                    return;
                }
                if (res.data.errCode == -1) {

                    if(option === 1){
                            // alert("from option 1");
                       // option = 1: Insert updated data into table
                       console.log("product data @->",   res.data.errMsg[0][0]);
                        let temp = self.productdata.splice(0, self.productdata.length);
                        self.productdata = [];

                        res.data.errMsg[0].forEach((e, index, array) => {
                            temp[self.holdSelectedIndex] = self.mapFields(e, self.holdSelectedIndex);
                        });

                        self.productdata = temp.splice(0, temp.length);

                        temp = undefined
                    } else {
                        // option = 0: Its mean load seleted data into form for edit
                        /**
                         * This code is only for tempory because API response is not porper for this admin module
                         * so this arrangment is done by front-end side for (module workes properly without any disturbance)
                         * Note: Here all conditions are only for arrangment of data
                         */

                        console.log('Response of db !-->' , res.data.errMsg[0][0]);
                        let _data = res.data.errMsg[0][0];
                        _data = self.assignNewProperties(_data);
                        self.commit('SAVE_PRODUCTS', _data);
                        self.showToast('Scroll Top', self.TOST().INFO);
                        self.holdSelectedIndex = product.index;
                        console.log("The index is ",  self.holdSelectedIndex);
                        self.$emit('on-edit', {});
                    }
                } else {
                    self.showToast('Database Error', self.TOST().ERROR);
                }
            });
        },

        assignNewProperties(_data) {
            if (!_data.hasOwnProperty('productReasons')) {
                _data = Object.assign({
                    productReasons: {
                        reason1 : "",
                        reason2 : "",
                        reason3 : "",
                        reason4 : "",
                        reason5 : ""
                    }
                }, _data);
            }

            if (!_data.hasOwnProperty('productImages')) {
                _data = Object.assign({
                    productImages : {
                        name : "",
                        type : ""
                    },
                }, _data);
            }

            if (!_data.hasOwnProperty('productVideo')) {
                _data = Object.assign({
                    productVideo : {
                        name : null,
                        type : null
                    },
                }, _data);
            }

            if (!_data.hasOwnProperty('productBrochure')) {
                _data = Object.assign({
                    productBrochure : []
                }, _data);
            }

            return _data;
        }
    }
}

</script>
<style>

.v-menu__content{
    border-radius: 12px;
    border:2px orannge dashed;

}

.status{
     font-family:roboto; font-weight:500; letter-spacing:0.1px;
}
.pointer {cursor: pointer;}
.v-toolbar__content, .v-toolbar__extension {
    align-items: center;
    display: flex;
    padding: 0;
}

     .sd-tb-row-img {
        width: 70px;
        height: 40px;
    }

</style>


