<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '角色添加' : '编辑角色'"
      :visible.sync="addInfo.isshow"
      center
      :before-close="cancle"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="rolename"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="menulist"
            default-expand-all
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title',
            }"
            check-strictly
          >
          </el-tree>
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
        <el-button type="primary" v-else @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getRoleAdd, getRoleInfo, getRoleEdit } from "../../util/axios";
export default {
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    rest() {
      (this.form = {
        rolename: "",
        menus: "",
        status: 1,
      }),
        this.$refs.tree.setCheckedKeys([]);
    },
    cancle() {
      this.$emit("cancle", false);
      this.rest();
    },
    // 添加列表
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          //调取添加接口
          this.form.menus = this.$refs.tree.getCheckedKeys().join(",");

          getRoleAdd(this.form).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancle();
              //重新获取列表
              this.getRoleActions();
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
    look(id) {
      getRoleInfo({ id }).then((res) => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
          //setCheckedKeys 	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
          // this.form.menus = this.$refs.tree.setCheckedKeys(
          //   JSON.parse(this.form.menus)
          // );
          this.form.menus = this.form.menus
            ? this.$refs.tree.setCheckedKeys(this.form.menus.split(","))
            : [];
          this.form.id = id;
        }
      });
    },
    update() {
      //转化menu的数据类型
      this.form.menus = this.$refs.tree.getCheckedKeys().join(",");
      // console.log(this.form,'表单信息')
      //调取添加接口
      getRoleEdit(this.form).then((res) => {
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
    },
    ...mapActions({
      getRoleActions: "role/getRoleActions",
      getMuneListAction: "menu/getMuneListAction",
    }),
  },
  mounted() {
    this.getMuneListAction();
  },
  computed: {
    ...mapGetters({
      menulist: "menu/getMuneList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
