<template>
  <div class="page">
    <div class="header">
      <goback></goback>
      <h2>商品分类</h2>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="main">
      <div class="minlf">
        <ul>
          <!-- <li v-for="item in catelist" :key="item.id">
            <a href="#">{{ item.catename }}</a>
          </li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">欧莱雅</a></li>
          <li><a href="#">潘婷</a></li>
          <li><a href="#">资生堂</a></li>
          <li><a href="#">阿道夫</a></li>
          <li><a href="#">卡诗</a></li>
          <li><a href="#">海飞丝</a></li>-->
          <!-- <li><a class="active" href="#">资生堂</a></li>  -->
          <van-sidebar v-model="activeKey" @change="onChange">
            <van-sidebar-item
              v-for="item in catelist"
              :key="item.id"
              :title="item.catename"
            />
          </van-sidebar>
        </ul>
      </div>
      <div class="minri">
        <div class="mitop">
          <div class="title">
            <h5>{{catetitle}}</h5>
            <a href="#">更多></a>
          </div>
           <div class="con">
            <ul class="clearfix">
              <li v-for='item in catechildrenArr' :key="item.id" @click='$router.push("/sortlist?id="+item.id)' >
                <img :src="$imgUrl+item.img" alt="#" />
                <p>{{item.catename}}</p>
              </li>
            </ul>
          </div>
   
        </div>
        <div class="mibtm">
          <div class="title">
            <h5>染发类</h5>
            <a href="#">更多></a>
          </div>
          <div class="con">
            <ul class="clearfix">
              <li v-for='item in catechildrenArr' :key="item.id" @click='$router.push("/sortlist")' >
                <img :src="$imgUrl+item.img" alt="#" />
                <p>{{item.catename}}</p>
              </li>
            
            </ul>
          </div>
        </div>
      </div>
    </div>
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
          <a href="Me.html">
            <img src="../../assets/images/iconMine.jpg" alt="#" />
            <p>我的</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCateTree } from "../../util/axios";
import goback from "../../common/goback";
export default {
  data() {
    return {
      catelist: [],
      activeKey: 0,
      catechildrenArr: [],
      catetitle:''
    };
  },
  mounted() { 
    this.getCateList();
  },
  methods: {
    // 侧边栏监听事件
    onChange(e) {
       this.catechildrenArr=this.catelist[e].children
       this.catetitle=this.catelist[e].catename
    },
    getCateList() {
      getCateTree().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.catelist = res.list;
          this.catechildrenArr = res.list[this.activeKey].children;
        
        }
      });
    },
  },
  components: {
    goback,
  },
};
</script>
<style lang="" scoped>
@import "../../assets/css/sort.css";
</style>
