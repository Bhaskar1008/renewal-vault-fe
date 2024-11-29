<template>
    <div>
            <div>
                <div class="makecenter mgt" >
                    <p class="mainttl" style="color:#424242;" >{{center_title}}</p> 
                </div>
                <hr>
                <v-layout justify-center class="mt-5" >
                    <div v-for="(c, index) in card_data" :key="index" >
                    <v-card
                        ripple
                        flat
                        class="pa-2 ma-2 bdr centerthings"
                        width="165px"
                        height="165px">
                            <div class="makecenter cp" >
                                <div :style="{backgroundColor:c.clr}" class="circleitis" >
                                        <img :src="c.icon" width="35px" height="35px" style="position:absolute;" />
                                </div>
                                <p class="removeP typoone mrg" >{{c.title.toUpperCase()}}</p>
                                <p class="removeP count_dash" v-if="c.count != ''" >{{c.count}}</p>
                                <p class="removeP fontweight mrgsp"  v-if="c.subttl != ''" >Sales | Producers</p>
                            </div>
                    </v-card>
                    </div>
                </v-layout>
            </div>
    </div>
</template>


<script>
export default {
    
    created(){

    },
    data(){
        return{

            card_data:[
                {
                    clr:"#1994A3",
                    icon:"../../web/assets/man.png",
                    title:"Users/Employees",
                    count:"340",
                    subttl:""
                },
                 {
                    clr:"#7D9654",
                    icon:"../../web/assets/face.png",
                    title:"Producers",
                    count:"24",
                    subttl:""
                },
                 {
                    clr:"#2F8273",
                    icon:"../../web/assets/Layer 2@2x(1).png",
                    title:"KPI",
                    count:"",
                    subttl:"Sales | Producers"
                },
                 {
                    clr:"#8078AD",
                    icon:"../../web/assets/docrefresh.png",
                    title:"Renewal Policies",
                    count:"150",
                    subttl:""
                },
                 {
                    clr:"#AA78AD",
                    icon:"../../web/assets/book.png",
                    title:"Resource Center",
                    count:"502",
                    subttl:""
                },
                
            ],

            icon:"../../web/assets/Layer 2@2x(1).png",
            center_title:"Tata AIG – App Admin",
        }
    },

    methods:{

    }
}

</script>

<style scoped>

    .centerthings{
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0px;
          box-shadow: 0px 1px 6px -7px rgba(0,0,0,0.15);
    }

    .centerthings:hover{
        bottom: 5.5px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s bottom ease-in-out;
        box-shadow: 0px 1px 16px -7px rgba(0,0,0,0.25);

    }

    .bdr{
        border:1px solid #f1f3f3;
    }

    .makecenter{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .removeP{
        margin-bottom:0px !important;
    }

    .count_dash{
        font-family:roboto;
        font-size: 20px;
        font-weight: 700;
        margin-top:4px;

    }

    .circleitis{
        position:relative; 
        width:75px; 
        height:75px; 
        background-color:#01b4bb; 
        border-radius:55px; 
        display:flex; 
        justify-content:center;
        align-items:center;
    }
    
    .typoone{
        font-family:roboto;   
        color: #424242;
        font-size: 12px;
        letter-spacing: 0.4px;
    }

    .mainttl{
        font-size: 35px;
        font-weight: 500;
    }

    .mrg{
        margin: 10px 0px;
    }
    .cp{
        cursor:pointer;
    }
    .mgt{
       margin-top: 45px;
    }
    .fontweight{
        font-weight: 500;
    }
    .mrgsp{
        margin-top: 4px;
    }


</style>

   

