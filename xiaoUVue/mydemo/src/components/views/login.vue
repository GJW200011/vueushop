<template>
  <div class="page">
    <div class="header">
       <goback/>
      <!-- <a class="dir" @click="$router.back()" href="#"
        ><img src="../../assets/images/arrowLeft (2).jpg" alt="arrow"
      /></a> -->
      <h2>登录</h2>
      <h2 @click="$router.push('/register')">注册</h2>
    </div>
    <div class="cton">
      <ul>
        <li>
          <span>手机号:</span>
          <input type="text" v-model="logininfo.phone" />
        </li>
        <li>
          <span>密&nbsp;&nbsp;&nbsp;码:</span>
          <input type="password" v-model="logininfo.password" />
        </li>
        <li class="borBtm0 fr">
          <em class="pwd">忘记密码</em>
        </li>
        <li class="borBtm0">
          <button type="button" @click="login">登录</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import goback from "../../common/goback";
import { getLogin } from "../../util/axios";
import { Toast } from "vant";

export default {
  data() {
    return {
      logininfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // console.log(this.logininfo);
      getLogin(this.logininfo)
        .then((res) => {
          // console.log(res);
          if (res.code == 200) {
            Toast.success("登录成功");
            sessionStorage.setItem('logininfo',JSON.stringify(res.list))
            this.$router.push('/index')
          }else{
            Toast.fail(res.msg);
          }
        })
       
    },
  },
  components: {
    goback
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/login.css";
</style>
