<template>
  <div class="page">
    <div class="header">
      <a class="dir" href="#" @click='$router.back()'
        ><img src="../../assets/images/arrowLeft.jpg" alt="#"
      /></a>
      <a href="index.html"
        ><img src="../../assets/images/logo.jpg" alt="logo"
      /></a>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="inpt">
      <em></em>
      <input type="submit" value="搜索商品" />
    </div>
    <ul class="main">
      <li v-for="item in goodslist" :key="item.id" @click='$router.push("/comdetail?id="+item.id)'>
        <img :src="$imgUrl+item.img" alt="#" />
        <div>
          <h3>
            {{item.goodsname}}
          </h3>
          <p class="txt1"><span>&yen;</span>{{item.price.toFixed(2)}}</p>
          <p class="txt2">3625条评论</p>
        </div>
      </li>
    </ul>
    <div class="footer">
      <ul>
        <li class="active">
          <a href="index.html">
            <img src="../../assets/images/iconIndex2.jpg" alt="#" />
            <p>首页</p>
          </a>
        </li>
        <li>
          <a href="shopcar.html">
            <img src="../../assets/images/iconCart.jpg" alt="#" />
            <p>购物车</p>
          </a>
        </li>
        <li>
          <a href="../../assets/Me.html">
            <img src="../../assets/images/iconMine.jpg" alt="#" />
            <p>我的</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../../util/axios";
export default {
  data() {
    return {
      goodslist: [],
    };
  },
  mounted() {
    getGoods({
      fid: this.$route.query.id,
    }).then((res) => {
        console.log(res);
      if (res.code == 200) {
        this.goodslist = res.list;
      }
    });
  },

  components: {},
};
</script>

<style lang="" scoped>
@import "../../assets/css/sortlist.css";
</style>
