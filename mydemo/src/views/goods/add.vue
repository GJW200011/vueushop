<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '添加规格' : '编辑规格'"
      :visible.sync="addInfo.isshow"
      center
      :before-close="cancle"
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="first_cateid"
          label="一级分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择"
            @change="changeGoods(false)"
          >
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="second_cateid"
          label="二级分类"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in catechildrenlist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>

        <el-form-item
          prop="specsid"
          label="商品规格"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择"
            @change="changeSpecs(false)"
          >
            <el-option
              v-for="item in specslist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="specsattr"
          label="规格属性"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option
              v-for="item in changeSpecslist"
              :key="item"
              :label="item.attrs"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
          <!-- v-model="form.description" -->
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
import E from "wangeditor";
import { mapActions, mapGetters } from "vuex";
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
import Editor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        description: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      catechildrenlist: "",
      changeSpecslist: "",
      rules: {
        goodsname: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
        specsid: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请输入规格属性", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //接受图片信息
      fileList: [],
      changeSpecslist: [], //二级分类数组
      catechildrenlist: [], //规格属性的数组
    };
  },
  props: ["addInfo"],
  methods: {
    createEditor() {
      // console.log("富文本编辑器");
      this.editor = new E("#editor");
      // console.log(this.editor,'编辑器对象');
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // onChange图片上传的时候触发的函数
    onChange(file) {
      // console.log(file)
      this.imgUrl = file.raw;
    },
    // 图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片移出
    onRemove(file, fileList) {},
    rest() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: "",
        specsid: "",
        description: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.fileList = [];
      this.changeSpecslist = [];
      this.catechildrenlist = [];
      // console.log(this.$refs["formDialog"]);
      this.$refs["formDialog"].resetFields();
      this.imgUrl = "";
    },
    cancle() {
      this.$emit("cancle", false);
      this.rest();
    },
    // 添加列表
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.description = this.editor.txt.html();
          // console.log(this.form);
          this.form.specsattr = this.form.specsattr
            ? this.form.specsattr.join(",")
            : "";
          // console.log(this.form);
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl);
          // this.form.attrs = this.arrAttr.map((item) => item.value).join(",");
          getGoodsAdd(file).then((res) => {
            // console.log(this.form);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancle();
              //重新获取列表
              this.getGoodsListAction();
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
      getGoodsInfo({ id }).then((res) => {
        // console.log(res, "获取一条数据");
        // console.log(this.form);
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          // 转化图片
         this.fileList=this.form.img? [{url:`${this.$imgUrl}${this.form.img}`}] :[]
          this.form.specsattr = this.form.specsattr? this.form.specsattr.split(",") : [];

          this.changeGoods(true);
          this.changeSpecs(true);
          console.log(this.form);
          
        }
      });
    },
    update(formName) {
      console.log(1);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.description = this.editor.txt.html();
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
            this.imgUrl=this.imgUrl? this.imgUrl : this.form.img
          file.append("img", this.imgUrl);
        //  console.log(this.imgUrl);
          // console.log(file.get('img'));
          getGoodsEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取接口
              this.getGoodsListAction();
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

    changeGoods(n) {
      // console.log(n,'nnn');
      // console.log(this.form.first_cateid,'ididid');
      this.catelist.forEach((item) => {
        // console.log(item);
        if (item.id == this.form.first_cateid) {
          this.catechildrenlist = item.children;
        }
      });
      if (!n) {
        this.form.second_cateid = "";
      }
    },
    changeSpecs(n) {
      console.log();
      this.specslist.forEach((item) => {
        if (item.id == this.form.specsid) {
          this.changeSpecslist = item.attrs;
        }
      });
      if (!n) {
        this.form.specsattr = [];
      }
    },
    ...mapActions({
      getGoodsListAction: "goods/getGoodsListAction",
      getNewSpecsAction: "specs/getNewSpecsAction",
      getCountActions: "goods/getCountActions",
      getCateListAction: "cate/getCateListAction",
    }),
  },
  mounted() {
    this.getCateListAction();
    this.getGoodsListAction();
    this.getNewSpecsAction();
  },
  computed: {
    ...mapGetters({
      goodslist: "goods/getGoodsList",
      rolelist: "role/getRoleList",
      catelist: "cate/getCateList",
      specslist: "specs/getNewSpecsList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
.img {
  width: 150px;
}
.iptW70 {
  width: 70%;
}
</style>
