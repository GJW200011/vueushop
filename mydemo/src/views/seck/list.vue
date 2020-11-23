<template>
  <div>
    <el-table :data="secklist" style="width: 100%">  
      <el-table-column prop="title" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="warning" @click='edit(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSeckDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSeckListActions();
  },
  computed: {
    ...mapGetters({
      secklist: "seck/getSeckList",
    }),
  },
  methods: {
    ...mapActions({
      getSeckListActions: "seck/getSeckListActions",
    }),
    del(id) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getSeckDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getSeckListActions();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
        this.$emit('edit',id)
    }
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
