<template>
  <div>
    <vBread></vBread>
    <!-- <el-button type="primary" plain round @click="add">添加</el-button> -->
        <vList @edit='edit'></vList>
    <v-add :isshow='isshow' @cancel='cancel' ref='dialog'></v-add>
  </div>
</template>

<script>
import vBread from "../../components/breadcrumb";
import vList from './list'
import vAdd from './add'
export default {
  data() {
    return {
     
        isshow: false,
    
    };
  },
   methods:{
    // 取消按钮
    cancel(e){
      this.isshow=false
    },
    edit(e){
       this.isshow=true
        this.$refs.dialog.look(e)
    }
  },
  components:{
      vBread,
      vList,
      vAdd
  }
};
</script>

<style  lang="" scoped>
.el-button {
  margin-top: 20px;
}
</style>
