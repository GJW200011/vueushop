<template>
  <div>
     <el-table :data="bannerlist" style="width: 100%" row-key="id"  border  default-expand-all >
      <el-table-column prop="id" label="编号" width="100">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" width="180">
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
import { getBannerDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/getBannerList",
    }),
  },
  mounted() {
    this.getBannerListAction();
  },
  methods: {
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
      getCountActions: "banner/getCountActions",
    }),
    del(id) {
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getBannerDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新触发调取列表   // console.log(this.page)
              //  this.getCountActions()
              this.getBannerListAction();
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
    // 编辑按钮
    edit(id) {
      // console.log(1);
      this.$emit("edit", id);
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
.img {
  width: 150px;
}
</style>
