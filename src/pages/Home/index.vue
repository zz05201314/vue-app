<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <em class="logo"></em>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :router="true"
          :collapse="isCollapse"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">管理首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">学员管理</span>
            </template>
            <el-menu-item-group>
              <!-- <span slot="title">学员项目管理</span> -->
              <el-menu-item index="/Student">学员项目管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">我的中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 顶部栏 -->
        <el-header>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <!-- [
                    'iconfont ',
                    isCollapse ? 'icon-zhankai' : 'icon-shouqi'
                  ] -->
                <i
                  class="iconfont icon-zhankai"
                  @click="isCollapse = !isCollapse"
                ></i>
                图标
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple-light">
                千锋管理系统
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <span class="el-avatar"></span>
                <span>欢迎您</span>
                <b class="nickname"></b>
                <span class="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    getLoginLog().then(res => {
      console.log(res);
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
/* logo背景图 */
.logo {
  display: block;
  height: 60px;
  background-color: #5636e0;
  background-size: 80%;
  background-position: center;
  background-image: url(../../assets/imgs/logo.png);
  background-repeat: no-repeat;
}
/* 用户名 */
.nickname {
  margin-left: 10px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;
}
/* 退出 */
.quit {
  color: red;
  cursor: pointer;
  margin-left: 10px;
}
/* 头像 */
.el-avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
/* 展开收起 */
.icon-zhankai {
  font-size: 23px;
  cursor: pointer;
}
/*顶栏header  */
.el-header {
  background: linear-gradient(135deg, #4c67ff, #5635df);
  color: #fff;
  text-align: center;
  line-height: 60px;
  height: 60px;
  padding: 0px;
}
/* 侧边栏 */
.el-aside {
  background-color: #d3dce6;
  /* background: linear-gradient(135deg, #5635df, #4c67ff); */
  color: #333;
  text-align: center;
  line-height: 200px;
}
/* 主体主体 */
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>