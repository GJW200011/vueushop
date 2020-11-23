<template>
  <div class="footer">
    <ul>
      <router-link class="nav"  active-class="active" tag="li" to="/home">
        <div  @click="imginfo">
          <em class="iconfont icon-home"></em>
          <!-- <img src="../assets/images/iconIndex2.jpg" alt="#" /> -->
          <p>首页</p>
        </div>
      </router-link>
      <router-link  class="nav" active-class="active" tag="li" to="/shopcar">
        <div @click="imginfo" >
           <em class="iconfont icon-gouwuche"></em>

        <p>购物车</p>
        </div>
      </router-link>
      <router-link  @click="imginfo" class="nav" active-class="active" tag="li" to="/mine">
        <div @click="imginfo" >
           <em class="iconfont icon-iconfuzhi"></em>
        <p>我的</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    imginfo(){
    }
  },
  components: {},
};
</script>

<style lang="" scoped>
.footer {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
}
.footer ul {
  background: #fff;
  width: 7.5rem;
  border-top: 0.01rem solid #ebebeb;
  display: flex;
  justify-content: space-between;
  padding: 0 0.35rem;
  height: 1.2rem;
  align-items: center;
  box-sizing: border-box;
}
.footer ul li {

  text-align: center;
}

.footer ul li em{
  font-size: 0.6rem;
}
.footer ul li p {
  font: 0.2rem/0.4rem "微软雅黑";
  color: #838383;
}
.footer ul li.active em,
.footer ul li.active p {
  color: #f46809;
}
</style>
