<template>
  <el-dialog title="充值" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="充值金额" prop="title">
        <el-input-number v-model="num" :precision="2" :step="0.1" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getToken } from '@/utils/auth'
import { Recharge } from '@/mallManager/wxUser/api'

export default {
  name: 'CreateEdit',
  data() {
    return {
      dialogVisible: false,
      historyBalance: 0, // 历史金额
      num: 0, // 历史金额
      formData: {
        balance: 0 // 总金额
      },
      rules: {
        num: [{ required: true, message: '请输入大于0的数字', trigger: 'change' }]
      },
      headers: {
        Authorization: ''
      }
    }
  },
  methods: {
    async init(row) {
      this.headers.Authorization = getToken()
      this.dialogVisible = true
      this.formData.id = row.id
      this.historyBalance = row.balance
    },
    // 保存
    confirm() {
      this.formData.balance = this.historyBalance + this.num
      const param = { ...this.formData }
      let method
      // eslint-disable-next-line prefer-const
      method = Recharge
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
