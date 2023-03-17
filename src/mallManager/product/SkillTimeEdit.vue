<template>
  <el-dialog title="秒杀时间" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="限时秒杀时间" prop="title">
        <el-date-picker
          v-model="Time"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
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
import { updateSkillProduct } from '@/mallManager/product/api'

export default {
  name: 'CreateEdit',
  data() {
    return {
      dialogVisible: false,
      Time: ['', ''],
      formData: {
        id: '',
        seckill_start_time: '',
        seckill_end_time: ''
      },
      rules: {
        seckill_start_time: [{ required: true, message: '请选择开始秒杀时间', trigger: 'change' }],
        seckill_end_time: [{ required: true, message: '请选择结束秒杀时间', trigger: 'blur' }]
      },
      headers: {
        Authorization: ''
      }
    }
  },
  methods: {
    async init(id) {
      this.headers.Authorization = getToken()
      this.dialogVisible = true
      this.formData.id = id
    },
    // 保存
    confirm() {
      this.formData.seckill_start_time = this.Time[0]
      this.formData.seckill_end_time = this.Time[1]
      const param = { ...this.formData }
      let method
      // eslint-disable-next-line prefer-const
      method = updateSkillProduct
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
