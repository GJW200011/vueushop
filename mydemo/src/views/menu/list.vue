<template>
  <div>
    <el-table :data="menuList" style="width: 100%" row-key="id"  border  default-expand-all   :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="菜单编号" width="100">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="100">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180" >
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"
      >
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
             <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
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
import {getMenuDelete}from '../../util/axios'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMuneList",
    }),
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMuneListAction",
    }),
    del(id) {
     this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调取删除接口
          getMenuDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getMenuList();
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
</style>
