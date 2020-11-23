<template>
  <div class="page">
    <div class="header">
      <a class="logo" href="#"
        ><img src="../../assets/images/logo.jpg" alt="logo"
      /></a>
      <input class="search" type="search" placeholder="寻找商品" />
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="navbar">
      <ul class="clearfix">
        <li class="btn"><a href="#">推荐</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">鞋包</a></li>
        <li><a href="#">居家</a></li>
        <li><a href="#">母婴儿童</a></li>
        <li><a href="#">美食</a></li>
        <li><a href="#">果蔬</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
      </ul>
      <p class="arrow"></p>
    </div>
    <div class="banner">
      <a href="#">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in bannerlist" :key="item.id">
            <!-- {{$imgUrl}}
            {{item.img}} -->
            <img class="bannerimg" :src="$imgUrl + item.img" alt="" />
          </van-swipe-item>
        </van-swipe>
      </a>
    </div>
    <div class="icons">
      <ul>
        <li>
          <a href="#">
            <img src="../../assets/images/indexicon1.jpg" alt="#" />
            <p>限时抢购</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/images/indexicon2.jpg" alt="#" />
            <p>积分商城</p>
          </a>
        </li>
        <li>
          <a href="#">
            <img src="../../assets/images/indexicon3.jpg" alt="#" />
            <p>联系我们</p>
          </a>
        </li>
        <li>
          <a href="javascript:;" @click="$router.push('/sort')">
            <img src="../../assets/images/indexicon4.jpg" alt="#" />
            <p>商品分类</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="limit">
      <div class="limitlf">
        <h2><em></em>限时秒杀</h2>
        <p class="txt1">每天零点场 好货秒不停</p>
        <p class="txt2">
          <span>02</span>:<span>16</span>:<span>45</span
          ><span class="dif">秒杀</span>
        </p>
        <div class="pic1">
          <img src="../../assets/images/shop_5.jpg" alt="#" />
        </div>
        <div class="much">&yen;14.8</div>
      </div>
      <div class="limitlr">
        <div class="top">
          <div class="tolf">
            <h4>品牌上新</h4>
            <p>每日9点<span>抢大牌</span></p>
            <img class="pic2" src="../../assets/images/brand.jpg" alt="#" />
          </div>
          <div class="tori">
            <img class="pic3" src="../../assets/images/indexshop.jpg" alt="#" />
          </div>
        </div>
        <div class="btm">
          <div class="btlf ctn">
            <h4>每日十件</h4>
            <p>只为你选好货</p>
            <div class="pic">
              <img src="../../assets/images/shop_2.jpg" alt="#" />
            </div>
          </div>
          <div class="btri ctn">
            <h4>拼啊</h4>
            <p>超级好价拼团</p>
            <div class="pic">
              <img src="../../assets/images/shop_3.jpg" alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bar">
      <img src="../../assets/images/bar.jpg" alt="bar" />
    </div>
    <div class="hot">
      <van-tabs type="card" >
        <van-tab title="热门推荐" class="con">
          <li v-for="item in goodslist" :key="item.id">
            <img :src="$imgUrl+item.img" alt="#" />
            <div class="cton">
              <h3>{{ item.goodsname }}</h3>
              <p class="txt1">&yen;{{ item.market_price }}</p>
              <p class="txt2">已售200件</p>
              <a href="javascript:;">立即抢购</a>
            </div>
          </li>
        </van-tab>
        <van-tab title="只看新品" class="con">
           <li v-for="item in newlist" :key="item.id">
            <img :src="$imgUrl+item.img" alt="#" />
            <div class="cton">
              <h3>{{ item.goodsname }}</h3>
              <p class="txt1">&yen;{{ item.market_price }}</p>
              <p class="txt2">已售200件</p>
              <a href="javascript:;">立即抢购</a>
            </div>
          </li>
        </van-tab>
        <van-tab title="只看热卖" class="con">
           <li v-for="item in hotlist" :key="item.id">
            <img :src="$imgUrl+item.img" alt="#" />
            <div class="cton">
              <h3>{{ item.goodsname }}</h3>
              <p class="txt1">&yen;{{ item.market_price }}</p>
              <p class="txt2">已售200件</p>
              <a href="javascript:;">立即抢购</a>
            </div>
          </li>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { getBannerList, getIndexGoods } from "../../util/axios";
export default {
  data() {
    return {
      num: 0,

      bannerlist: [],
      hotlist: [],
      newlist: [],
      goodslist: [],
    };
  },
  mounted() {
    getBannerList().then((res) => {
      if (res.code == 200) {
        this.bannerlist = res.list;
      }
    
    });

    getIndexGoods().then((res) => {
      if ((res.code = 200)) {
          console.log(res);
        this.hotlist = res.list[0].content;
        this.newlist = res.list[1].content;
        this.goodslist = res.list[2].content;
        // console.log(this.goodslist);
      }
    });
  },
  methods: {
    // $imgUrl
    hotTab(i) {
      this.num = i;
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
@import "../../assets/css/index.css";
/* .hot .van-tabs .van-tab{
 font: 0.24rem/0.52rem "微软雅黑";
  outline: .01rem solid #f26b11;
} */
</style>
