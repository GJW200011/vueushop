<template>
  <div>
   <vBread></vBread>
       <el-button type="primary" plain round @click='add'>添加</el-button>
    <vList @edit='edit'></vList>
    <v-add :addInfo='addInfo' @cancle='cancle' ref='dialog'></v-add>
  </div>
</template>

<script>
import vBread from '../../components/breadcrumb'
import vList from './list'
import vAdd from './add'
export default {
  data() {
    return {
      addInfo:{
        isshow:false,
        isadd:true
      }
    };
  },
  methods:{
    // 添加按钮
    add(){
      this.addInfo.isshow=true
      this.addInfo.isadd=true
    },
    // 取消按钮
    cancle(e){
      this.addInfo.isshow=e
    },
    edit(e){

       this.addInfo.isshow=true
        this.addInfo.isadd=false
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
