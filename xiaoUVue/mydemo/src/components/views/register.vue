<template>
  <div class="page">
    <div class="header">
     <goback/>
      <h2>注册</h2>
      <h2 @click="$router.push('/login')">登录</h2>
    </div>
    <div class="cton">
      <ul>
        <li>
          <span>昵&nbsp;&nbsp;&nbsp;称:</span
          ><input type="text" v-model="regInfo.nickname" />
        </li>
        <li>
          <span>手机号:</span>
          <input type="text" v-model="regInfo.phone" />
        </li>
        <li>
          <span>密&nbsp;&nbsp;&nbsp;码:</span>
          <input type="password" v-model="regInfo.password" />
        </li>
        <li>
          <span>验证码:</span>
          <input type="text" />
        </li>
        <li class="borBtm0">
          <button type="button" @click="login">注册</button>
        </li>
        <li class="borBtm0">
          <input type="checkbox" /><em class="chBox"
            >我以阅读并同意使用条款和隐私政策</em
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import goback from "../../common/goback";
import { getregister } from "../../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      regInfo: {
        phone: "",
        nickname: "",
        password: "",
      },
    };
  },
  mounted() {},
  methods: {
    login() {
      getregister(this.regInfo)
        .then((res) => {
          console.log(res);
          Toast.success("注册成功");
          this.$router.push("/login");
        })
        .catch((err) => {
          Toast.fail("注册失败");
        });
    },
  },
  components: {
    goback
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/register.css";
</style>
