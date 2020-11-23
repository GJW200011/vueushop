<template>
  <div class="login">
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-width="100px"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="loginForm.password"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getUserLogin } from "../util/axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions(['changeUserInfoAction']),

    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //登录逻辑
          getUserLogin(this.loginForm).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg); 
              console.log(res);
              this.changeUserInfoAction(res.data.list)
              // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
              this.$router.push("/home");
            }
          })
        } else {
           this.$message.error(res.data.msg);
          return false;
        }
      });
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #ccc;
}
.el-form {
  width: 400px;
  height: 200px;
  padding: 30px 15px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: ghostwhite;
}
</style>
