<template>
 <div>
 <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
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

</style>
