<template>
  <div>
    <el-table :data="catelist" style="width: 100%" row-key="id"  border  default-expand-all   :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="分类编号" width="100">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column  label="图片" width="200" >
        <template slot-scope="scoped">
          <img class="img" :src="$imgUrl+scoped.row.img" alt="">
          </template> 
      </el-table-column>
      <el-table-column prop="status" label="状态" width="200">
             <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scoped">
          <div>
            <el-button type="primary" @click="edit(scoped.row.id)" size="small" round
              >编辑</el-button
            >
            <el-button type="danger" size="small" round @click="del(scoped.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getCateDelete}from '../../util/axios'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      catelist: "cate/getCateList",
    }),
  },
  mounted() {
    this.getCateListAction();
  },
  methods: {
    ...mapActions({
      getCateListAction:  "cate/getCateListAction",
      getCountActions:  "cate/getCountActions",
      
    }),
    del(id) {
     this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getCateDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表   // console.log(this.page)
              //  this.getCountActions()
              this.getCateListAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑按钮
    edit(id){
      this.$emit('edit',id)
    }
  },
  components: {},
};
</script>

<style lang="" scoped>
.img{
  width: 150px;

}
</style>
