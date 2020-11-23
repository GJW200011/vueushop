<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menulist"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="this.form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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
        <el-button @click="cancel">取 消</el-button>
        <el-button
          v-if="addInfo.isadd"
          @click="add('formDialog')"
          type="primary"
          >添 加</el-button
        >
        <el-button v-else @click="update('formDialog')" type="primary">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenuAdd, getMenuInfo ,getMenuEdit} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
// 引入封装好的二级路由
import { indexRouters } from "../../router";
export default {
  data() {
    return {
      form: {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      indexRouters,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      iconList: [
        "el-icon-star-on",
        "el-icon-star-off",
        "el-icon-success",
        "el-icon-remove-outline",
        "el-icon-plus",
      ],
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      menulist: "menu/getMuneList",
    }),
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMuneListAction",
      
    }),
    // 添加表格
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          //调取添加接口
          getMenuAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
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
    // 编辑表格
    update(formName) {
       this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          //调取添加接口
          getMenuEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
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
      getMenuInfo({ id })
        .then((res) => {
          this.form = res.data.list;
          this.form.id = id;
        })
        .catch((err) => [this.$message.error(res.data.msg)]);
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        title: "",
        pid: 0,
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 下拉菜单修改出发事件
    changeMenu() {
      // console.log(this.form.pid);
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },

  components: {},
};
</script>

<style lang="" scoped>
</style>
 