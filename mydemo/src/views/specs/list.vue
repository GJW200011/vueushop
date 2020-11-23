<template>
  <div>
    <el-table :data="specslist" style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column label="规格属性" width="180">
        <template slot-scope="item" >
          <div>
            <el-tag v-for='attrname in item.row.attrs' :key='attrname'>
              {{attrname}}
            </el-tag>

          </div>
        </template>
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
            <el-button type="warning" @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(scope.row.id)"
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
import { getSpecsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getSpecsActions();
    this.getCountActions();
  },
  computed: {
    ...mapGetters({
      specslist: "specs/getSpecsList",
      total: "specs/getCount",
      size: "specs/getSize",
      
    }),
  },
  methods: {
    ...mapActions({
      getSpecsActions: "specs/getSpecsActions",
      getCountActions: "specs/getCountActions",
      getPageActions: "specs/getPageActions"
    }),
    del(id) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口 
          // console.log(id);       
          getSpecsDelete({ id }).then((res) => { 
            if (res.data.code == 200) {    
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getSpecsActions();
              this.getCountActions();
              // this.getCountActions()
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
    edit(id) {
      this.$emit("edit", id);
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
