<template>
  <div>
    <v-bread></v-bread>
    <el-button type="primary" plain round @click="isadd">添加</el-button>
    <v-listinfo @edit="edit"></v-listinfo>
    <v-add ref='dialog' @cancel="cancel" :addInfo="addInfo"></v-add>
  </div>
</template>

<script>
import vBread from "../../components/breadcrumb";
import vListinfo from "./list";
import vAdd from "./isadd";
export default {
  data() {
    return {
      addInfo: {
        isshow: false,
        isadd: true,
      },
    };
  },
  methods: {
    isadd() {
      this.addInfo.isshow = true;
      this.addInfo.isadd = true;
    },
    cancel(e) {
      this.addInfo.isshow = e;
    },
    // 编辑按钮
    edit(e){ 
       this.addInfo.isshow = true,
       this.addInfo.isadd=false,
       this.$refs.dialog.look(e)
    }
  },
  components: {
    vBread,
    vListinfo,
    vAdd,
  },
};
</script>

<style  lang="" scoped>
.el-button {
  margin-top: 20px;
}
</style>
