<template>
    <div class="page">
        <div class="header">
            <a class="dir" href="shopcar.html"><img src="../../assets/images/arrowLeft (2).jpg" alt="arrow"></a>
            <h2>确认订单</h2>
            <p class="menu">
                <span></span>
                <span></span>
                <span></span>
            </p>
        </div>
        <div class="main">
            <div class="wrap1">
                <div class="con">
                    <div class="txt txt1">
                        <p>收货人:YouSu</p>
                        <p>10000000000</p>
                    </div>
                    <div class="txt txt2">
                        <p class="wi122">收货地址:</p>
                        <p>北京市海淀区银泉路清林苑6号楼中共优就业总部3层</p>
    
                    </div>
                </div>
                <img src="../../assets/images/arrowRight.jpg" alt="#">
            </div>
            <div class="wrap2">
                <div class="top">
                 <div class="lft">
                     <img src="../../assets/images/shop_4.jpg" alt="#">
                     <div>
                         <p class="txt">
                             雅诗兰黛护肤霜
                         </p>
                         <p>规格:50g</p>
                     </div>
                 </div>
                 <p class="rit">&yen;123.00</p>
                </div>
                <div class="con">
                 <p>购买数量:</p>
                 <div class="clearfix">
                     <button class="fl">－</button>
                     <input class="fl" type="text" placeholder="1">
                     <button class="fl">十</button>
                 </div>
                </div>
                <div class="btm">
                    <p>配送方式</p>
                    <p>XX快递</p>
                </div>
             </div>
            <div class="wrap3">
                <div class="up">
                    <p>优惠券</p>
                    <p>无可用</p>
                </div>
                <div class="down">
                    <p>使用积分</p>
                    <div class="rit clearfix">
                        <input class="fl" type="text" placeholder="输入积分">
                        <button class="fl">使用</button>
                        <p class="fl">可用<span>50</span>积分</p>
                    </div>
                </div>
            </div>
            <div class="wrap4">
                <ul>
                    <li>
                        <p class="txt1">商品金额</p>
                        <p class="txt2">&yen;123.00</p>
                    </li>
                    <li>
                        <p class="txt1">运费</p>
                        <p class="txt2">+&yen;0.00</p>
                    </li>
                    <li>
                        <p class="txt1">优惠券</p>
                        <p class="txt2">-&yen;0.00</p>
                    </li>
                    <li>
                        <p class="txt1">会员优惠</p>
                        <p class="txt2">-&yen;0.00</p>
                    </li>
                    <li>
                        <p class="txt1">积分抵扣</p>
                        <p class="txt2">-&yen;0.00</p>
                    </li>
                </ul>
            </div>
            <div class="wrap5">
                <p>实付金额:<span>&yen;123.00</span></p>
                <button>提交订单</button>
            </div>
         </div>
        <div class="footer">
            <ul>
                <li>
                    <a href="index.html">
                        <img src="../../assets/images/iconIndex.jpg" alt="#">
                        <p>首页</p>
                    </a>
                </li>
                <li class="active">
                    <a href="shopcar.html">
                        <img src="../../assets/images/iconCart2.jpg" alt="#">
                        <p>购物车</p>
                    </a>
                </li>
                <li>
                    <a href="Me.html">
                        <img src="../../assets/images/iconMine.jpg" alt="#">
                        <p>我的</p>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
 data() {
 return {

 };
 },
 components:{
}
};
</script>

<style lang="" scoped>
@import '../../assets/css/shopcarorder.css'
</style>
