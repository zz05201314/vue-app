<template>
  <div class="login-page">
    <div class="left"></div>
    <video
      src="../../assets/video/bg_video.mp4"
      loop="loop"
      autoplay="autoplay"
      class="bg_video"
    ></video>
    <div class="login-container">
      <h1 class="title">千锋管理系统</h1>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm'"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            style="width:240px"
            type="text"
            v-model="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            style="width:240px"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" prop="captcha"
          ><el-input
            class="captcha"
            type="text"
            v-model="loginForm.captcha"
            autocomplete="off"
            status-icon="false"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
          <span
            class="captcha-svg"
            v-html="captchaSvg"
            @click="refreshCaptcha"
          ></span>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            class="button"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//登入逻辑的实现
//1.收集用户输入的username&password传递给后端

//2.登入通过后,将后端返回的token存到本地,跳转到主页
//3.每次请求的时候,携带token到请求头authorization

//4.展示token校验正确的数据

//5.校验不通过,跳转到登入页
// 验证码
import { login, getCaptcha, verifyCaptcha } from "@/api";
import { mapMutations } from "vuex";
export default {
  data() {
    /**
     * @param {Object} rule 一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback
     *
     */
    var validateUsername = (rule, value, callback) => {
      // 用户名正则，4到16位（字母，数字，下划线，减号）
      // var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
      if (!value) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 密码验证
    var validatePassword = (rule, value, callback) => {
      // 校验密码
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    // 验证码校验
    var validateCaptcha = (rule, value, callback) => {
      // 校验密码
      if (value === "" || value.length !== 5) {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      // 获取的验证码结构
      captchaSvg: "",
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.fetch_captcha();
  },
  methods: {
    // 验证码
    // 刷新验证码
    refreshCaptcha() {
      this.fetch_captcha();
    },
    fetch_captcha() {
      // 设置验证码
      getCaptcha().then(res => {
        // console.log(res);
        this.captchaSvg = res.data.img;
      });
    },
    // 键盘事件
    ...mapMutations(["SET_USERINFO"]),
    submitForm(formName) {
      // 校验通过
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 先校验验证码成功发送请求
          let verifyRes = await verifyCaptcha(this.loginForm.captcha);
          // console.log(verifyRes);
          // return;
          if (!verifyRes.data.state) {
            this.$message.error("验证码输入错误，请重新输入");
            return;
          }
          // 登入框优化
          const loading = this.$loading({
            lock: true,
            text: "正在登入",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // 本地校验通过
          // console.log(this.loginForm.username, this.loginForm.password);
          let { username, password } = this.loginForm;
          login(username, password)
            .then(res => {
              //  服务器响应，关闭对话框
              loading.close();
              // console.log(res);
              if (res.data.state) {
                // 用户名密码正确
                this.$message.success("登录成功");
                localStorage.setItem("proj-token", res.data.token);
                localStorage.setItem(
                  "proj-userInfo",
                  JSON.stringify(res.data.userInfo)
                );
                // 更改vuex中userinfo的值
                this.SET_USERINFO(res.data.userInfo);
                // 跳转登录页面
                // 面包屑
                this.$router.push("/Welcome");
              } else {
                //用户名密码错误
                this.$message.error("用户名密码错误");
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
/* 验证码 */
.captcha-svg {
  background-color: #fff;
  height: 45px;
  display: inline-block;
  cursor: pointer;
  width: 138px;
}
/* 表单样式 */
.el-form {
  width: 400px;
  position: absolute;
}
.login-page {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.login-container {
  width: 400px;
  height: 480px;
  z-index: 9;
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.2);
}

/* 背景视频 */
/* .bg_video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
} */
/* 标题 */
.title {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 50px;
  text-align: center;
}
/* 提交按钮 */
.button {
  width: 250px;
  text-align: center;
  border: 1px solid #ccc;
  outline: 0;
  background: linear-gradient(90deg, #66b1ff, #002aee);
}
/* 背景图片 */
.left {
  width: 50%;
  height: 100%;
  background-image: url("../../assets/imgs/bg2.png");
  background-repeat: no-repeat;
  background-size: 50%;
  position: absolute;
  opacity: 0.7;
  z-index: 1;
  background-position: 60% 65%;
}
</style>
