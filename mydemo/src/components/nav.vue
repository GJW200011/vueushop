<template>
  <div>
    <!-- 
            导航菜单 
            el-menu属性
          background-color	菜单的背景色（仅支持 hex 格式）  
          text-color	菜单的文字颜色（仅支持 hex 格式）
          active-text-color	当前激活菜单的文字颜色（仅支持 hex 格式）
          unique-opened	是否只保持一个子菜单的展开
          default-active	当前激活菜单的 index
          router	是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
          -->
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#336666"
      text-color="#fff"
      active-text-color="#66CCCC"
      unique-opened
      router
    >
      <el-menu-item index="home">
        <i class="el-icon-s-grid"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="item.id" v-for='item in getUserInfo.menus' :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="menu.url" v-for='menu in item.children' :key="menu.id">
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>

      </el-submenu>
  
    </el-menu>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/home",
    };
  },
  mounted() {
    this.defaultActive = this.$route.path;

  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },
  methods:{
    
  }
};
</script>

<style  lang="" scoped>
.el-menu {
  height: 90vh;
}
</style>
