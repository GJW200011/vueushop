<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '添加管理员' : '编辑管理员'"
      :visible.sync="addInfo.isshow"
      center  :before-close="cancle">
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="roleid"
          label="所属角色"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.roleid"
            placeholder="请选择"
            
          >
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
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
        <el-button @click="cancle">取 消</el-button>
        <el-button
          type="primary"
          v-if="addInfo.isadd"
          @click="add('formDialog')"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update('formDialog')">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getUserAdd, getUserInfo, getUserEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        username: "",
        roleid: "",
        status: 1,
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
        roleid: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    rest() {
      this.form = {
        username: "",
        roleid: "",
        status: 1,
        password: "",
        uid: "",
        randstr: "",
      }
    },
    cancle() {
      this.$emit("cancle", false);
      this.rest();
    },
    // 添加列表
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          getUserAdd(this.form).then((res) => {
            // console.log(this.form);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancle();
              //重新获取列表
              this.getUserActions();
              this.getCountActions()
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
    look(uid) {
      getUserInfo({ uid }).then((res) => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
        //   //setCheckedKeys 	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
        //   this.form.menus = this.$refs.tree.setCheckedKeys(
        //     JSON.parse(this.form.menus)
        //   );
        //   this.form.id = id;
        }
      });
    },
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //转化menu的数据类型
          // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          // console.log(this.form,'表单信息')
          //调取添加接口
          getUserEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取接口
              this.getRoleActions();
              //关闭弹框
              this.cancle();
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
      getRoleActions: "role/getRoleActions",
      getUserActions: "user/getUserActions",
      getCountActions: "user/getCountActions",
      // getPageActions: "user/getPageActions",
    }),
  },
  mounted() {
    this.getRoleActions();
  },
  computed: {
    ...mapGetters({
      rolelist: "role/getRoleList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
