<template>
  <div>
    <el-dialog
      :visible.sync="isshow"
      center
       :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称" :label-width="formLabelWidth" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

      

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary"  @click="update('formDialog')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMemberAdd, getMemberInfo, getMemberEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        nickname: "",
        phone: "",
        status: 1,
      },
      rules: {
        phone: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "手机号不正确",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "昵称2到6位",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["isshow"],
  methods: {
    // 添加动态表单事件
    rest() {
      this.form = {
          nickname: "",
        phone: "",
        status: 1,
      }
    },
    cancel() {
      this.$emit("cancel", false);
      this.rest() 
    },
    look(uid) {
      getMemberInfo({ uid }).then((res) => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getMemberEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取接口
              this.getMemberActions();
              //关闭弹框
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    ...mapActions({
      getMemberActions: "member/getMemberActions",

    }),
  },
  computed: {
    ...mapGetters({
      memberlist: "member/getMemberList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
.iptW70 {
  width: 70%;
}
</style>
