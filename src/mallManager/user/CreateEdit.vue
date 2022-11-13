<template>
  <el-dialog :title="titleList[type]" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="formData.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="formData.email" placeholder="请输入邮箱" />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { insertUser, updateUser } from './api.js'

export default {
  name: 'CreateEdit',
  data() {
    return {
      type: '',
      titleList: ['', '新增用户', '编辑用户'],
      dialogVisible: false,
      formData: {
        id: '',
        name: '',
        username: '',
        password: '',
        status: 1,
        sex: 1,
        email: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async init(type, row) {
      this.type = type
      // 回显
      if (type === 2) {
        const fields = ['id', 'name', 'username', 'password', 'sex', 'status', 'email']

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
        method = insertUser
        Reflect.deleteProperty(param, 'id')
      } else {
        method = updateUser
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
      this.$refs['formData'].resetFields()
      Object.assign(this.$data.formData, this.$options.data().formData)
    }
  }
}
</script>
