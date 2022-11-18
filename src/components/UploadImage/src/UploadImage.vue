<template>
  <div>
    <el-upload
      ref="uploadRef"
      v-model="modelValue"
      :limit="limit"
      :action="actionUrl"
      :headers="headers"
      :list-type="listType"
      :on-preview="handlePictureCardPreview"
      :on-success="onSuccess"
      :on-remove="handleRemove"
      :file-list="fileList"
      :multiple="multiple"
      :disabled="disabled"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    limit: {
      type: Number,
      default: 1
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      actionUrl: process.env.VUE_APP_UPLOAD_API,
      fileList: []
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    // 文件上传成功
    onSuccess(res) {
      if (res.code === '1') {
        if (this.value) {
          this.$emit('input', `${this.value},${res.result.url}`)
        } else {
          this.$emit('input', res.result.url)
        }

        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    },
    // 删除图片
    handleRemove(file) {
      let url = ''

      if (Reflect.has(file, 'response')) {
        url = file.response.result.url
      } else {
        url = file.url
      }

      // 删除照片墙的url
      const index = this.fileList.findIndex(item => item.url === url)

      if (index !== -1) {
        this.fileList.splice(index, 1)
      }

      // v-model绑定值重新赋值
      const splitValue = this.value.split(',')
      const delUrlIndex = splitValue.findIndex(item => item === url)

      if (delUrlIndex !== -1) {
        splitValue.splice(index, 1)
      }

      this.$emit('input', `${splitValue.join(',')}`)
    },
    // 图片预览
    handlePictureCardPreview(file) {
      if (this.type === 2) {
        this.dialogImageUrl = file.url
      } else {
        this.dialogImageUrl = file.response.result.url
      }

      this.dialogVisible = true
    },
    // 重置组件
    resetComRef() {
      this.fileList = []
      if (this.$refs['uploadRef']) this.$refs['uploadRef'].clearFiles()
    },
    // 设置照片墙
    setFileListValue(fileList) {
      this.fileList = fileList
    }
  }
}
</script>
