<template>
  <div class="page">
    <div class="header">
        <goback/>
      <!-- <a class="dir" href="#" @click="$router.back()"
        ><img src="../../assets/images/arrowLeft (2).jpg" alt="arrow"
      /></a> -->
      <h2>我的订单</h2>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="hdbtm">
      <ul>
        <li>
          <div class="pic">
            <img src="../../assets/images/mine.png" alt="#" />
          </div>
          <div class="txt">
            <h3 v-if="userInfo">{{ userInfo.nickname }}</h3>
            <h3 v-else>未登录</h3>
            <p>V1</p>
          </div>
        </li>
        <li>
          <a href="javascript:;" v-if="userInfo" @click="quit">退出登录</a>
          <a href="javascript:;" v-else @click="$router.push('/login')"
            >去登录</a
          >
        </li>
      </ul>
    </div>
    <div class="main">
      <ul class="top">
        <li>
          <a href="#">
            <img src="../../assets/images/iconMine_1.jpg" alt="#" />
            <p>全部订单</p>
          </a>
        </li>
        <li>
          <a href="shopcar.html">
            <img src="../../assets/images/iconMine_2.jpg" alt="#" />
            <p>代付款</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/images/iconMine_3.jpg" alt="#" />
            <p>待收货</p>
          </a>
        </li>
      </ul>
      <ul class="ctn">
        <li>
          <div class="con">
            <img src="../../assets/images/iconMine_6.jpg" alt="#" />
            <p>我的钱包</p>
          </div>
          <img src="../../assets/images/arrowRight.jpg" alt="#" />
        </li>
        <li>
          <div class="con">
            <img src="../../assets/images/iconMine_7.jpg" alt="#" />
            <p>我的优惠券</p>
          </div>
          <img src="../../assets/images/arrowRight.jpg" alt="#" />
        </li>
        <li>
          <div class="con">
            <img src="../../assets/images/iconMine_6.jpg" alt="#" />
            <p>我的二维码</p>
          </div>
          <img src="../../assets/images/arrowRight.jpg" alt="#" />
        </li>
        <li>
          <div class="con">
            <img src="../../assets/images/iconMine_8.jpg" alt="#" />
            <p>我的小伙伴</p>
          </div>
          <img src="../../assets/images/arrowRight.jpg" alt="#" />
        </li>
        <li>
          <div class="con">
            <img src="../../assets/images/iconMine_5.jpg" alt="#" />
            <p>地址管理</p>
          </div>
          <img src="../../assets/images/arrowRight.jpg" alt="#" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import goback from "../../common/goback";
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("logininfo")
      ? JSON.parse(sessionStorage.getItem("logininfo"))
      : "";
    // console.log(this.userInfo, "哈哈哈哈");
  },
  methods: {
    quit() {
      sessionStorage.removeItem("logininfo");
      this.$router.push("/login");
    },
  },
  components: {
    goback,
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/mine.css";
</style>
