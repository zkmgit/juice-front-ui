<template>
  <el-dialog :title="titleList[type]" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="类目名称" prop="category_name">
        <el-input v-model="formData.category_name" placeholder="请输入类目名称" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="formData.status">
          <el-radio :label="1">启用</el-radio>
          <el-radio :label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="类目备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入类目备注" />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { insertCategory, updateCategory } from './api.js'

export default {
  name: 'CreateEdit',
  data() {
    return {
      type: '',
      titleList: ['', '新增类目', '编辑类目'],
      dialogVisible: false,
      formData: {
        id: '',
        category_name: '',
        remark: '',
        status: 1
      },
      rules: {
        category_name: [{ required: true, message: '请输入类目名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入类目备注', trigger: 'blur' }],
        status: [{ required: true, message: '请选择类目状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    async init(type, row) {
      this.type = type
      // 回显
      if (type === 2) {
        const fields = ['id', 'category_name', 'remark', 'status']

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
        method = insertCategory
        Reflect.deleteProperty(param, 'id')
      } else {
        method = updateCategory
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
