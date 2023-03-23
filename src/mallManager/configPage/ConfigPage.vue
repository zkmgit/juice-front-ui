<template>
  <div class="app-container">
    <el-card>
      <h2>批量替换所有图片的过期域名</h2>
      <div style="color: red;margin-top: 10px">注：七牛云空间域名只能维持一个月的时间</div>
      <div style="margin-top: 10px">一：七牛云创建新的空间域名，上传所有图片到新的空间；</div>
      <div style="margin-top: 10px">二：如下，批量替换功能会对数据库所有的图片url进行批量替换；</div>
      <div style="margin-top: 10px">三：需要修改后台egg的utils的空间域名；</div>
      <el-form ref="queryForm" size="small" :model="queryParams" :rules="rules" inline style="margin-top: 30px">

        <el-form-item label="过期域名：" prop="oldrealmname">
          <el-input v-model="queryParams.oldrealmname" clearable />
        </el-form-item>

        <el-form-item label="替换域名：" prop="newrealmname">
          <el-input v-model="queryParams.newrealmname" clearable />
        </el-form-item>
      </el-form>
      <el-button size="mini" type="primary" @click="batchCheck">批量替换</el-button>
    </el-card>
  </div>
</template>

<script>
import { batchCheck } from './api.js'

export default {
  name: 'ConfigPage',
  data() {
    return {
      queryParams: {
        oldrealmname: '',
        newrealmname: ''
      },
      rules: {
        oldrealmname: [{ required: true, message: '请输入过期域名', trigger: 'blur' }],
        newrealmname: [{ required: true, message: '请输入替换域名', trigger: 'blur' }]
      }
    }
  },
  created() {
  },
  methods: {
    // 批量替换域名
    batchCheck() {
      this.$refs['queryForm'].validate(async valid => {
        if (valid) {
          if (this.queryParams.oldrealmname === this.queryParams.newrealmname) {
            this.$message.error('过期域名不能跟替换域名一样！')
            return
          }
          const params = { ...this.queryParams }

          batchCheck(params).then(res => {
            if (res.code === '1') {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
          })
        } else {
          console.log('error')
        }
      })
    }
  }
}
</script>
