<template lang="html">
    <header>
        <div class="row">
            <div class="col-3 toggel-menu">
                logo
                 </div>
            <div class="col-3 app-name">
 
                <!-- <a id=" logo" href="/">
                    <img src="//img.alicdn.com/tps/TB1zBLaPXXXXXXeXXXXXXXXXXXX-121-59.svg" width="30%">
                </a> -->
            </div>
            <div class="col-3 tools">
                tools
            </div>
        </div>
       

    </header>
</template>

<script>
</script>

<style lang="css">
    header {
        /* width: 100%; */
        height: 50px;
        /* padding: 0 40px; */
        /* padding-right: 40px; */
        padding-right: 40px;
        padding-left: 40px;
        position: absolute;
        background-color: #F2F2F2;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
        top: 0;
        left: 0;
        right: 0;
        z-index: 9999;
    }
    
    .row {
        width: 100%;
        display: flex;
        /* border: 2px solid black; */
        height: 50px;
        justify-content: space-between;
        align-items: center;
        /* background: gray; */
    }
    
    .col-3 {
        width: 100%;
    }
    
    .toggel-menu {
        background: red;
    }
    
    .app-name {
        /* background: green; */
        /* padding: 10px; */
        display: flex;
        align-content: center;
    }
    
    header .logo {
        display: block;
    }
    
    .tools {
        background: blueviolet;
    }
</style>