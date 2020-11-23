<template>
  <div>
    <el-container>
      <el-header>
       bug大舞台项目
        <div class="loginfo">
          欢迎登陆
          <el-button type="danger" icon="el-icon-user-solid" circle @click='$router.push("/login")'></el-button>
          <!-- <el-button type="warning" round plain>退出</el-button> -->
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 引入导航菜单 -->
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//引入nav导航组件
import vNav from "../components/nav";
export default {
  data() {
    return {};
  },
  components: {
    vNav
  }
};
</script>

<style lang="" scoped>

.el-header{
   background:#66CCCC;
   /* display:flex */
   
}
/* .el-header h3{

} */
 .loginfo{
   /* text-align: right; */
   float: right;
   color: #CCFFFF;
 }
</style>
