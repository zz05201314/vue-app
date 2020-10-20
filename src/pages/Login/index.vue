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
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input
            type="password"
            v-model="ruleForm.Pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="button"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    /**
     * @param {Object} rule 一个表单验证对象
     * @param {String} value 输入值
     * @param {Function} callback
     *
     */
    var validateUsername = (rule, value, callback) => {
      // 校验用户
      if (value === "") {
        console.log(123);
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
      // if (value === "") {
      //   callback(new Error("请输入用户名"));
      // } else {
      //   if (this.ruleForm.username !== "") {
      //     this.$refs.ruleForm.validateField("username");
      //   }
      //   callback();
      // }
    };
    var validatePassword = (rule, value, callback) => {
      // 校验密码
      if (value === "") {
        console.log(123);
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        Password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        Password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
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
.bg_video {
  display: block;
  margin: auto;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
}
/*  */
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
