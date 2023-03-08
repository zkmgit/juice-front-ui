<template>
  <el-dialog :title="titleList[type]" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="公告标题" prop="title">
        <el-input v-model="formData.title" placeholder="请输入公告标题" />
      </el-form-item>

      <el-form-item label="公告内容" prop="content">
        <el-input v-model="formData.content" resize="none" type="textarea" placeholder="请输入公告内容" clearable />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { insertAnnouncement, updateAnnouncement } from './api.js'
import { getToken } from '@/utils/auth'

export default {
  name: 'CreateEdit',
  data() {
    return {
      type: '',
      titleList: ['', '新增公告', '编辑公告'],
      dialogVisible: false,
      formData: {
        id: '',
        title: '',
        content: ''
      },
      rules: {
        title: [{ required: true, message: '请输入公告名称', trigger: 'blur' }],
        content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }]
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
    handleRemove() {
      this.fileList = []
    },
    async init(type, row) {
      this.headers.Authorization = getToken()

      this.type = type
      // 回显
      if (type === 2) {
        const fields = ['id', 'title', 'content']

        this.fileList = [{ title: row.title, content: row.content }]

        fields.forEach(field => {
          this.formData[field] = row[field]
        })
      }

      this.dialogVisible = true
    },
    // 保存
    confirm() {
      let method

      const param = { ...this.formData }

      if (this.type === 1) {
        method = insertAnnouncement
        Reflect.deleteProperty(param, 'id')
      } else {
        method = updateAnnouncement
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
      Object.assign(this.$data.formData, this.$options.data().formData)
    }
  }
}
</script>
