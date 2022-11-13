<template>
  <el-dialog :title="titleList[type]" :visible.sync="dialogVisible" width="35%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="属性名称" prop="attribute_name">
        <el-input v-model="formData.attribute_name" placeholder="请输入属性名称" />
      </el-form-item>

      <el-form-item label="属性值" prop="attribute_value">
        <el-button type="primary" style="margin-bottom: 10px" @click="addAttributeValue">新增</el-button>

        <div v-for="(item, index) in formData.attribute_value" :key="index">
          <el-input v-model="formData.attribute_value[index].value" style="width: 60%" placeholder="请输入属性值" /> <i class="el-icon-delete" @click="delAttributeValue(index)" />
        </div>
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
  </el-dialog>
</template>
<script>
import { insertAttribute, updateAttribute } from './api.js'

export default {
  name: 'CreateEdit',
  data() {
    return {
      type: '',
      titleList: ['', '新增属性', '编辑属性'],
      dialogVisible: false,
      formData: {
        id: '',
        attribute_name: '',
        attribute_value: [
          { value: '' }
        ],
        status: 1
      },
      rules: {
        attribute_name: [{ required: true, message: '请输入属性名称', trigger: 'blur' }],
        attribute_value: [{ required: true, message: '请输入属性值', trigger: 'blur' }],
        status: [{ required: true, message: '请选择属性状态', trigger: 'change' }]
      }
    }
  },
  methods: {
    // 新增属性
    addAttributeValue() {
      this.formData.attribute_value.push({ value: '' })
    },
    // 删除属性
    delAttributeValue(index) {
      this.formData.attribute_value.splice(index, 1)
    },
    async init(type, row) {
      this.type = type
      // 回显
      if (type === 2) {
        const fields = ['id', 'attribute_name', 'attribute_value', 'status']

        fields.forEach(field => {
          if (['attribute_value'].includes(field)) {
            try {
              this.formData[field] = row[field].split(',').map(value => {
                return {
                  value
                }
              })
            } catch {
              this.formData[field] = [{ value: '' }]
            }
          } else {
            this.formData[field] = row[field]
          }
        })
      }

      this.dialogVisible = true
    },
    // 保存
    confirm() {
      if (this.formData.attribute_value.length === 0 || this.formData.attribute_value.some(item => !item.value)) {
        this.$message.error('属性值不能为空.')
        return
      }

      let method = ''

      const param = { ...this.formData }
      param.attribute_value = this.formData.attribute_value.map(item => item.value).join(',')

      if (this.type === 1) {
        method = insertAttribute
        Reflect.deleteProperty(param, 'id')
      } else {
        method = updateAttribute
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
