<template>
  <div>
    <el-dialog
      :title="addInfo.isadd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.isshow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级分类"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
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
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <!-- 
            el-upload 上传文件 
          action必选参数，上传的地址 ，我们的项目不需要上传地址，我们会把图片地址储存到数据库
          list-type	文件列表的类型	string	text/picture/picture-card
          on-preview	点击文件列表中已上传的文件时的钩子	function(file)
          on-remove	文件列表移除文件时的钩子
          auto-upload	是否在选取文件后立即进行上传 ,在我们的项目中取消自动上传
         -->
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list='fileList'
            :limit='1'
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
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        catename: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      imgUrl:'', //接受图片信息,
      fileList:[]
    };
  },
  props: ["addInfo"],
  computed: {
    ...mapGetters({
      catelist: "cate/getCateList",
    }),
  },
  mounted() {
    this.getCateListAction();
  },
  methods: {
    onExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // onChange图片上传的时候触发的函数
    onChange(file){
      // console.log(file)
      this.imgUrl=file.raw
    },
    // 图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片移出
    onRemove(file, fileList) {},
    ...mapActions({
      getCateListAction: "cate/getCateListAction",
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
          file.append('img',this.imgUrl)
              getCateAdd(file).then((res) => {
              if (res.data.code == 200) {
                this.$message.success(res.data.msg);
                //关闭弹框
                this.cancel();
                //重新获取列表
                this.getCateListAction();
              
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
          let data = this.form
          let file =new FormData()
          for(let i in data){
            file.append(i,data[i])
          }
          this.imgUrl=this.imgUrl? this.imgUrl : this.form.img
          file.append('img',this.imgUrl)
          getCateEdit(file).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getCateListAction();
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
      getCateInfo({ id })
        .then((res) => {
          this.form = res.data.list;
          this.form.id = id;
          // 转化图片
          this.fileList=this.form.img? [{url:`${this.$imgUrl}${this.form.img}`}] :[]
        })
        .catch((err) => [this.$message.error(res.data.msg)]);
    },
    cancel() {
      this.$emit("cancel", false);
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl='',
      this.fileList=[]
    },
    // 下拉菜单修改出发事件

  },

  components: {},
};
</script>

<style lang="" scoped>
</style>
 