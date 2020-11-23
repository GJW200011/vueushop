<template>
  <div class="page">
    <div class="header">
      <go-back></go-back>
      <!-- <a class="dir" href="#"
        ><img src="../../assets/images/arrowLeft (2).jpg" alt="arrow"
      /></a> -->
      <h2>商品详情</h2>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="main">
      <div class="pic1">
        <!-- <img src="../../assets/images/picDetail_1.jpg" alt="#" />
        <img src="../../assets/images/picDetail_2.jpg" alt="#" /> -->
        <img :src="$imgUrl + goodsinfo.img" alt="" />
      </div>
      <div class="cton1" v-if="goodsinfo">
        <!-- <h3>娅芝贵妇素颜霜 贵妇膏神仙膏补水保湿懒人霜遮瑕珍珠膏</h3> -->
        <h3>{{ goodsinfo.goodsname }}</h3>
        <p>
          <span class="txt1">&yen;</span
          ><span class="txt2">{{ goodsinfo.price.toFixed(2) }}</span
          >(此价格不与套装优惠同时享受)
        </p>
      </div>
      <ul class="cton2">
        <li class="con1">
          <p>
            促销:<span class="txt">满减</span
            ><span class="txt2">满2件9折;3件8折</span>
          </p>
          <img src="../../assets/images/arrow.jpg" alt="#" />
        </li>
        <li class="con2">
          <p>购买数量</p>
          <div class="btn clearfix">
            <!-- <button class="btn1 fl">一</button>
            <input class="fl" type="text" placeholder="1" />
            <button class="btn2 fl">十</button> -->
            <van-stepper v-model="value" />
          </div>
        </li>
        <li class="con3">
          <p>商品属性</p>
          <img src="../../assets/images/arrow.jpg" alt="#" />
        </li>
        <li>
          <div class="con">
            <span>规格</span>
            <!-- <a class="lft" href="#">30g</a> -->
            <a class="lft" href="#" v-for="item in attrarr" :key="item">{{
              item
            }}</a>
          </div>
        </li>
      </ul>
      <div class="cton3">
        <p>商品详情</p>
      </div>
      <div class="pic2" v-html="goodsinfo.description">
        <!-- <img src="../../assets/images/picdetail_3.jpg" alt="#" />
        <img src="../../assets/images/picDetail_4.jpg" alt="#" />
        <img src="../../assets/images/picDetail_5.jpg" alt="#" />
        <img src="../../assets/images/picDetail_6.jpg" alt="#" />
        <img src="../../assets/images/picDetail_7.jpg" alt="4" /> -->
      </div>
      <ul class="cton4">
        <li class="top">
          <p>商品评价</p>
        </li>
        <li class="con">
          <p class="txt1">1235668fg</p>
          <p class="txt2">效果很好，物流到位，下次继续来!</p>
          <div class="pic">
            <img src="../../assets/images/picDetail_8.jpg" alt="#" />
            <img src="../../assets/images/picDetail_9.jpg" alt="#" />
            <img src="../../assets/images/picDetail_10.jpg" alt="#" />
          </div>
          <p class="txt3">2020-01-13</p>
        </li>
        <li class="last">
          <p>共<span>1000</span>+条评论</p>
          <a href="#">查看更多></a>
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="lft">
        <a href="shopcar.html">
          <img src="../../assets/images/iconCart.jpg" alt="#" />
          <p>购物车</p>
        </a>
        <div class="btn">2</div>
      </div>
      <div class="rit clearfix">
        <a class="shopcar fl" href="#" @click="gocar">加入购物车</a>
        <a class="buy fl" href="#">立即购买</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getGoodsInfo, getCarAdd } from "../../util/axios";
export default {
  data() {
    return {
      goodsinfo: "",
      value: 1,
      attrarr: [],
    };
  },
  mounted() {
    getGoodsInfo({
      id: this.$route.query.id,
    }).then((res) => {
      console.log(res);
      this.goodsinfo = res.list[0];
      this.attrarr = res.list[0].specsattr.split(",");
      //  console.log(this.attrarr );
    });
  },
  methods: {
    gocar() {
      getCarAdd({
        uid: JSON.parse(sessionStorage.getItem("logininfo")).uid,
        goodsid: this.goodsinfo.id,
        num: this.value,
      }).then((res) => {
        if (res.code == 200) {
          this.$router.push({
            path: "/shopcar",
            query: {
              id: JSON.parse(sessionStorage.getItem("logininfo")).uid,
            },
          });
        }
      });
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
@import "../../assets/css/comdetail.css";
</style>
