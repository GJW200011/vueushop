<template>
  <div>
    <el-dialog :visible.sync="addInfo.isshow" :before-close="cancel">
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="title" label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

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
        <el-button v-else @click="update('formDialog')" type="primary"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
       
        title: "",
        img:"",
        status: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur",
          },
        ],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl: "", //接受图片信息,
      fileList: [],
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      bannerlist: "banner/getBannerList",
    }),
  },
  mounted() {
    this.getBannerListAction();
  },
  methods: {
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
    ...mapActions({
      getBannerListAction: "banner/getBannerListAction",
    }),
    // 添加表格
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {     
          let data = this.form; 
         
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          //添加img参数
          file.append("img", this.imgUrl)
          
          getBannerAdd(file).then((res) => {
            console.log(1);
            if (res.data.code == 200) {
           console.log(res);
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getBannerListAction();
            } else {
              this.$message.error(res.data.msg);
            }
          });
          //     //添加逻辑
          //     //调取添加接口
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
          let data = this.form;
          let file = new FormData();
          for (let i in data) {
            file.append(i, data[i]);
          }
          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);
          getBannerEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getBannerListAction();
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
      getBannerInfo({ id })
        .then((res) => {
          console.log(this.form,'看一条数据');
          this.form = res.data.list;
          this.form.id = id;
          // 转化图片
          this.fileList = this.form.img
            ? [{ url: `${this.$imgUrl}${this.form.img}` }]
            : [];
        })
        .catch((err) => [this.$message.error(res.data.msg)]);
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        id: "",
        title: "",
        img: "",
        status: 1,
      };
      this.fileList=[]
      this.imgUrl=''
    },
    // 下拉菜单修改出发事件
  },

  components: {},
};
</script>

<style lang="" scoped>
</style>
 