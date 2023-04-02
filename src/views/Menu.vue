<template>
    <el-container class="home-container">
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="">
                <span>中医药健康管理平台</span>
            </div>
            <div>
                <span>欢迎你：{{ test.aname }}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-button type="info" @click="logout">安全退出</el-button>
            </div>
            
        </el-header>
        <el-container>
            <el-aside :width="iscollapse ? '64px' : '200px'">
                <div class="toggle-button" @click="toggleCollapase">|||</div>
                <el-menu background-color="#545c64" text-color="#fff" active-text-color="#409eff" unique-opened
                    :collapse="iscollapse" :collapse-transition="false" :router="true" :default-active="activePath">
                    <el-submenu index="1" >
                        <template slot="title">
                            <!-- <i :class="el-icon-location"></i> -->
                            <span>用户模块</span>
                        </template>
                        <el-menu-item index="/usermsg" >
                            <template slot="title">
                                <span>用户信息管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/useradd" >
                            <template slot="title">
                                <span>用户增加</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" >
                        <template slot="title">
                            <!-- <i :class="el-icon-location"></i> -->
                            <span>订单管理</span>
                        </template>

                        <el-menu-item index="2-1" >
                            <template slot="title">
                                <span>预约订单管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="2-2" >
                            <template slot="title">
                                <span>药材订单管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="3" >
                        <template slot="title">
                            <!-- <i :class="el-icon-location"></i> -->
                            <span>医生信息管理</span>
                        </template>
                    </el-submenu>

                    <el-submenu index="4" >
                        <template slot="title">
                            <!-- <i :class="el-icon-location"></i> -->
                            <span>药材模块</span>
                        </template>
                        <el-menu-item index="/medicalmsg" >
                            <template slot="title">
                                <span>药材信息管理</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/medicaladd" >
                            <template slot="title">
                                <span>药材增加</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/medicaldata" >
                            <template slot="title">
                                <span>药材信息数据统计</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="5" >
                        <template slot="title">
                            <!-- <i :class="el-icon-location"></i> -->
                            <span>药材类型模块</span>
                        </template>

                        <el-menu-item index="/mtmsg" >
                            <template slot="title">
                                <span>药材类型信息管理</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 主体类容 -->
            <el-main>
                <router-view></router-view>
                <!-- {{ test.aname }} -->
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import router from '@/router';

export default {
    data() {
        return {
            // 菜单列表
            menuList: [],
            iscollapse: false,
            activePath:'/welcome',//默认路径
            test: '',
            
        };
    },
    created() {
        //加载时查询menuList
        this.test =JSON.parse( window.sessionStorage.getItem('admin'));//取出session里面的path
    },
    methods: {
        logout() {
            window.sessionStorage.clear(); //清除session
            this.$router.push("/login");
        },
      
        //控制伸缩
        toggleCollapase() {
            this.iscollapse = !this.iscollapse;
        },
        //保存路径
        saveNavState(activePath){
            window.sessionStorage.setItem("activePath",activePath);
            this.activePath = activePath;
        },
    },
    components: { router }
}
</script>
<style lang="less" scoped>
//充满
.home-container {
    height: 100%;
}

//头部样式
.el-header {
    background-color: #373d41;
    display: flex;
    /*左右贴边 */
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }

}

//侧边栏样式
.el-aside {
    background-color: #333744;

    .el-menu {
        border-right: none; // 对其右边框
    }
}

//主体样式
.el-main {
    background-color: #eaedf1;
}


img {
    width: 55px;
    height: 55px;
}

//收缩按钮
.toggle-button {
    background-color: #4A5064;
    font-size: 10;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer; //显示小手
}
</style>