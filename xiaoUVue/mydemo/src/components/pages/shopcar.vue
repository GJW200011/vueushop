<template>
  <div>
    <div class="header">
      <a class="dir" href="#"
        ><img src="../../assets/images/arrowLeft (2).jpg" alt="arrow"
      /></a>
      <h2>购物车</h2>
      <p class="menu">
        <span></span>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="cton">
      <ul class="main">
        <!-- [idx==num?'  tw':''] -->
        <li
          :class="[idx == idxnum ? ' tw' : '']"
          v-for="(item, idx) in shopCarList"
          @touchstart="romvtw(idx)"
          @touchmove="movemaLe12(idx)"
          :key="item.id"
        >
          <div class="con">
            <div class="lef">
              <ul>
                <li>
                  <input
                    type="checkbox"
                    value="yes"
                    @change="checkone"
                    v-model="item.check"
                  />
                </li>
                <li><img :src="$imgUrl + item.img" alt="#" /></li>
                <li>
                  <h4>{{ item.goodsname }}</h4>
                  <p class="txt1">
                    规格:<span>{{ item.spec }}</span>
                  </p>
                  <p class="txt2">&yen;{{ item.price }}</p>
                </li>
              </ul>
            </div>
            <div class="rit clearfix">
              <button class="fl" @click="sub(idx)">一</button>
              <input class="fl" type="text" :placeholder="item.num" />
              <button class="fl" @click="add(idx)">十</button>
            </div>
          </div>
          <a class="del" @click="del(idx)" href="javascript:;">删除</a>
        </li>
      </ul>
      <div class="btm">
        <div class="lft">
          <input
            type="checkbox"
            value="全选"
            @change="checkAll"
            v-model="allcheck"
          />全选
        </div>
        <div class="rit">
          <ul>
            <li class="txt1">
              <!-- {{(shopCarList.money*shopCarList.listnum).toFixed(2)}} -->
              <h5>
                总计:<span>&yen;{{ allPrice | toPrice(2) }}</span>
              </h5>
              <p>不含运费,以优惠&yen;0.00</p>
            </li>
            <li class="btn">
              <input type="submit" value="去结算(2件)" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCarList, getCarDelete } from "../../util/axios";
export default {
  data() {
    return {
      a: "",
      b: "",
      allcheck: false,
      idxnum: null,
      shopCarList: [],
    };
  },
  mounted() {
    this.getCarListmo();
  },
  methods: {
    // 获取购物车列表
    getCarListmo() {
      getCarList({
        uid: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.shopCarList = res.list;
      });
    },

    // 删除操作
    del(i) {
      console.log(i);
      getCarDelete({
        id: this.shopCarList[i].id,
      }).then((res) => {
        if (res.code == 200) {
          this.getCarListmo();
        }
      });
      // this.shopCarList.splice(i, 1);
      this.idxnum = null;
      // this.checkone();
    },
    romvtw(i) {
      this.a = event.touches[0].clientX;
    },
    // 滑动操作
    movemaLe12(i) {
      this.b = event.touches[0].clientX;
      if (this.a - this.b > 30) {
        this.idxnum = i;
      }
      if (this.a - this.b < 30) {
        this.idxnum = -1;
      }

      // this.num=i
    },
    // 加件数
    add(i) {
      console.log(this);
      this.shopCarList[i].num++;
    },
    // 减件数
    sub(i) {
      if (this.shopCarList[i].num <= 1) {
        return;
      }
      this.shopCarList[i].num--;
    },
    // 全选
    checkAll() {
      // console.log(this.shopCarList.length);
      if (this.shopCarList) {
        this.shopCarList.forEach((item) => (item.check = this.allcheck));
      }
    },
    // 单选控制全选
    checkone() {
      this.allcheck = this.shopCarList.every((item) => item.check);
    },
  },
  computed: {
    allPrice() {
      if (this.shopCarList) {
        let sum = 0;
        this.shopCarList.forEach((item, index) => {
          if (item.check) {
            sum += item.price * item.num;
            return;
          }
        });
        return sum;
      }else{
        return 0
      }
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
@import "../../assets/css/shopcar.css";
</style>
