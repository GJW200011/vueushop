<template>
  <div>
    <el-dialog :visible.sync="addInfo.isshow" :before-close="cancle">
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="formLabelWidth">
          <el-date-picker
            v-model="timer"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changecate()"
          >
            <el-option :value="0" label="顶级菜单" disabled></el-option>
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择"
            @change="changegoods()"
          >
            <el-option :value="0" label="顶级菜单" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option :value="0" label="顶级菜单" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
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
        <el-button
          class="btn"
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
import {
  getGoodsList,
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
} from "../../util/axios";
export default {
  data() {
    return {
      form: {
        title: "", //
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      },
      timer: "",
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
      //创建一个二级分类数组
      secondArr: [],
      goodsArr: [],
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    // 一级分类事件
    changecate(n) {
      this.catelist.forEach((item) => {
        if (item.id == this.form.first_cateid) {
          this.secondArr = item.children;
        }
      });
      if (!n) {
        this.form.second_cateid = "";
      }
    },
    changegoods(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
          //清空二级双向数据绑定还要清空三级
          if (!n) {
            this.form.goodsid = "";
          }
        }
      });
    },
    rest() {
      this.form = {
        title: "", //
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      };
      this.timer = "";
    },
    cancle() {
      this.$emit("cancle", false);
      this.rest();
    },
    // 添加列表
    add(formName) {
 
          // console.log(1);
          this.form.begintime = new Date(this.timer[0]).getTime();
          this.form.endtime = new Date(this.timer[1]).getTime();
          getSeckAdd(this.form).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancle();
              //重新获取列表
              this.getSeckListActions();
            } else {
              this.$message.error(res.data.msg);
            }
    
      });
    },
    look(id) {
      getSeckInfo({ id }).then((res) => {
        console.log(res, "获取一条数据");
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.timer = [
            new Date(parseFloat(this.form.begintime)),
            new Date(parseFloat(this.form.endtime)),
          ];
          this.changegoods(true)
          this.changecate(true)
        }

      });
    },
    update() {
          //转化menu的数据类型
          this.form.begintime = new Date(this.timer[0]).getTime();
          this.form.endtime = new Date(this.timer[1]).getTime();
          // console.log(this.form,'表单信息')
          //调取添加接口
          getSeckEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取接口
              this.getSeckListActions();
              //关闭弹框
              this.cancle();
            } else {
              this.$message.error(res.data.msg);
            }
          });
    
    },
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
      getGoodsListAction: "goods/getGoodsListAction",
      getSeckListActions: "seck/getSeckListActions",
    }),
  },
  mounted() {
    this.getCateListAction();
    this.getGoodsListAction();
  },
  computed: {
    ...mapGetters({
      catelist: "cate/getCateList",
      goodslist: "goods/getGoodsList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
.dialog-footer {
  text-align: left;
}
</style>
