<template>
  <div>
    <el-table :data="userlist" style="width: 100%">
      <el-table-column prop="uid" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" width="180">
      </el-table-column>
      <el-table-column prop="roleid" label="所属角色" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
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
            <el-button type="warning" @click="edit(scope.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.uid)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination page-size='2' background layout="prev, pager, next" total="3" @current-change='currentChange'>
    </el-pagination> -->
    <el-pagination :page-size='size' background layout="prev, pager, next" :total="total" @current-change='currentChange'>
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getUserActions();
    this.getCountActions();
  },
  computed: {
    ...mapGetters({
      userlist: "user/getUserList",
      total: "user/getCount",
      size: "user/getSize",
      
    }),
  },
  methods: {
    ...mapActions({
      getUserActions: "user/getUserActions",
      getCountActions: "user/getCountActions",
      getPageActions: "user/getPageActions",

    }),
    del(uid) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getUserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              // this.getPageActions()
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getUserActions();
              this.getCountActions()
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
    edit(uid) {
      this.$emit("edit", uid);
    },
    //封装一个切换页码的事件
    currentChange(e) {
      // console.log(e, "当前页");
      this.getPageActions(e);
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
</style>
