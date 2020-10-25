<template>
  <div class="home-page">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200">
        <em class="logo"></em>
        <!-- 菜单高亮样式-->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :router="true"
          :collapse="isCollapse"
        >
          <qf-sub-menu :sideMenu="menuList"></qf-sub-menu>
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
                <!--iconfont icon-zhankai -->
                <i
                  :class="[
                    'iconfont',
                    isCollapse ? 'icon-zhankai' : 'icon-shouqi'
                  ]"
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
                <b class="nickname">{{ userInfo.nickname }}</b>
                <span class="quit" @click="quit">退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <!-- 处理面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/Welcom' }"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item
              :to="{ path: crumb.path }"
              v-for="crumb in crumbs"
              >{{ crumb.meta.name }}</el-breadcrumb-item
            >
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getLoginLog } from "@/api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  // 映射
  computed: {
    ...mapState(["userInfo", "menuList", "crumbs"])
  },
  mounted() {
    getLoginLog().then(res => {
      // console.log(res);
    });
  },
  methods: {
    // 退出登录
    quit() {
      // 清除token和userInfo
      // 跳珠到登入页
      localStorage.removeItem("proj-token");
      localStorage.removeItem("proj-userInfo");
      // 刷新页面
      window.location.reload();

      this.$router.push("/login");
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
  color: rgb(2, 255, 78);
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