<template>
  <el-dialog :title="titleList[type]" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="轮播图名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入轮播图名称" />
      </el-form-item>

      <el-form-item label="图片" prop="image">
        <el-upload
          ref="uploadRef"
          v-model="formData.image"
          :limit="1"
          :action="actionUrl"
          :headers="headers"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="onSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>

    <el-dialog :visible.sync="dialogImageVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-dialog>
</template>
<script>
import { insertCarouselImage, updateCarouselImage } from './api.js'
import { getToken } from '@/utils/auth'

export default {
  name: 'CreateEdit',
  data() {
    return {
      type: '',
      titleList: ['', '新增轮播图', '编辑轮播图'],
      dialogVisible: false,
      formData: {
        id: '',
        title: '',
        image: '',
        status: 1
      },
      rules: {
        title: [{ required: true, message: '请输入轮播图名称', trigger: 'blur' }],
        image: [{ required: true, message: '请上传轮播图', trigger: 'change' }],
        status: [{ required: true, message: '请选择轮播图状态', trigger: 'change' }]
      },
      dialogImageUrl: '',
      dialogImageVisible: false,
      actionUrl: process.env.VUE_APP_UPLOAD_API,
      headers: {
        Authorization: ''
      },
      fileList: []
    }
  },
  methods: {
    // 文件上传成功
    onSuccess(res) {
      if (res.code === '1') {
        this.formData.image = res.result.url
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    handleRemove() {
      this.fileList = []
    },
    handlePictureCardPreview(file) {
      if (this.type === 2) {
        this.dialogImageUrl = file.url
      } else {
        this.dialogImageUrl = file.response.result.url
      }

      this.dialogImageVisible = true
    },
    async init(type, row) {
      this.headers.Authorization = getToken()

      this.type = type
      // 回显
      if (type === 2) {
        const fields = ['id', 'title', 'image', 'status']

        this.fileList = [{ name: row.title, url: row.image }]

        fields.forEach(field => {
          this.formData[field] = row[field]
        })
      }

      this.dialogVisible = true
    },
    // 保存
    confirm() {
      let method = ''

      const param = { ...this.formData }

      if (this.type === 1) {
        method = insertCarouselImage
        Reflect.deleteProperty(param, 'id')
      } else {
        method = updateCarouselImage
      }

      this.$refs['formData'].validate(async valid => {
        if (valid) {
          method(param).then(res => {
            if (res.code === '1') {
              this.$message.success(res.msg)
              this.$parent.refreshTableData()
              this.dialogVisible = false
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error')
        }
      })
    },
    // 关闭dialog层
    closeDialog() {
      this.headers.Authorization = ''
      this.fileList = []
      this.$refs['formData'].resetFields()
      this.$refs['uploadRef'].clearFiles()
      Object.assign(this.$data.formData, this.$options.data().formData)
    }
  }
}
</script>
