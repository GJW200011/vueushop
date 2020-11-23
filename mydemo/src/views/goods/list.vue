<template>
  <div>
       <el-table
      :data="goodslist"
      style="width: 100%"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="商品编号" width="100">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="150">
      </el-table-column>
      <el-table-column prop="price" label="商品价格" width="150"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格" width="150"> </el-table-column>
      <el-table-column label="图片" width="160">
        <template slot-scope="scoped">
          <img class="img" :src="$imgUrl + scoped.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品"  width="60%">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖" width="60%">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态"  width="60%">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scoped">
          <div>
            <el-button
              type="primary"
              @click="edit(scoped.row.id)"
              size="small"
              round
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              round
              @click="del(scoped.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :page-size='size' background layout="prev, pager, next" :total="total" @current-change='currentChange'>
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsListAction();
    this.getCountActions();
  },
  computed: {
    ...mapGetters({
      goodslist: "goods/getGoodsList",
      total: "goods/getCount",
      size: "goods/getSize",
      
    }),
  },
  methods: {
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getCountActions: "goods/getCountActions",
      getPageActions: "goods/getPageActions"
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
          getGoodsDelete({ id }).then((res) => { 
            if (res.data.code == 200) {    
              this.$message.success(res.data.msg);
              //重新触发调取列表
              this.getGoodsListAction();
              this.getCountActions();
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
.img{
  width: 120px;
}
.el-pagination {
  float: right;
  margin: 20px 35px 0 0;
}
</style>
