<template>
  <div>
    <el-table :data="memberlist" style="width: 100%">
      <el-table-column prop="uid" label="会员编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="180">
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
            <el-button type="warning" @click="edit(scope.row.uid)">编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination :page-size='size' background layout="prev, pager, next" :total="total" @current-change='currentChange'>
    </el-pagination> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getMemberActions();
  },
  computed: {
    ...mapGetters({

      memberlist: "member/getMemberList"
    }),
  },
  methods: {
    ...mapActions({
      getMemberActions: "member/getMemberActions"

    }),
    edit(uid) {
      this.$emit("edit", uid);
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
