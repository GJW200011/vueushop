<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.isshow"
      center
       :before-close="cancle"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, idx) in arrAttr"
          :key="idx"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-input
            class="iptW70"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="idx == 0" @click="addTree">新增规格</el-button>
          <el-button v-else @click="delattr(item)">删除</el-button>
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
        <el-button type="primary" v-else @click="update('formDialog')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      arrAttr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
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
    // 删除
    delattr(item) {
      console.log(item);
      var index = this.arrAttr.indexOf(item);
      console.log(index);
      // if (index !== -1) {
      //   this.arrAttr.splice(index, 1);
      // }
    },
    // 添加动态表单事件
    addTree() {
      if (this.arrAttr.length <= 6) {
        this.arrAttr.push({
          value: "",
        });
      } else {
        this.$message.warning("最多添加6条");
      }
    },

    rest() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.arrAttr = [
        {
          value: "",
        },
      ];
    },
    cancle() {
      this.$emit("cancle", false);
      this.rest();
    },
    // 添加列表
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
          getSpecsAdd(this.form).then((res) => {
            // console.log(this.form);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancle();
              //重新获取列表
              this.getSpecsActions();
              this.getCountActions();
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
      getSpecsInfo({ id }).then((res) => {
        // console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          // this.form = res.data.list;
          let data = res.data.list[0];
          this.form = data;
          data.attrs.map((item, idx) => {
            if (idx == 0) {
              this.arrAttr[0].value = item;
            } else {
              this.arrAttr.push({
                value: item,
              });
            }
          });
          //   //setCheckedKeys 	通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性
          //   this.form.menus = this.$refs.tree.setCheckedKeys(
          //     JSON.parse(this.form.menus)
          //   );
          //   this.form.id = id;
        }
      });
    },
    update(formName) {
      // console.log(1);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //转化menu的数据类型
          // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
          // console.log(this.form,'表单信息')
          //调取添加接口
          this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
          // console.log(this.form, "update");
          getSpecsEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取接口
              this.getSpecsActions();
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
      getSpecsActions: "specs/getSpecsActions",
      getCountActions: "specs/getCountActions",
    }),
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
.iptW70 {
  width: 70%;
}
</style>
