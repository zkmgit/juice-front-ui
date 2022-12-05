<template>
  <el-dialog title="发货" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="快递名称" prop="tracking_name">
        <el-input v-model="formData.tracking_name" placeholder="请输入快递名称" />
      </el-form-item>

      <el-form-item label="物流备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入物流备注" />
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { insertLogistics } from './api.js'

export default {
  name: 'CreateEdit',
  data() {
    return {
      dialogVisible: false,
      formData: {
        order_id: '',
        tracking_name: '',
        remark: ''
      },
      rules: {
        tracking_name: [{ required: true, message: '请输入快递名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入物流备注', trigger: 'blur' }]
      }
    }
  },
  methods: {
    init(id) {
      this.formData.order_id = id
      this.dialogVisible = true
    },
    // 保存
    confirm() {
      const param = { ...this.formData }

      this.$refs['formData'].validate(async valid => {
        if (valid) {
          insertLogistics(param).then(res => {
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
