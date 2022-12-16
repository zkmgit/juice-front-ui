<template>
  <el-dialog :title="titleList[type]" :visible.sync="dialogVisible" width="40%" @close="closeDialog">
    <el-form ref="formData" class="query_form" size="small" :model="formData" :rules="rules" label-width="120px" label-position="right">
      <el-form-item label="产品名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入产品名称" clearable />
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item label="类目" prop="category_id">
            <el-select v-model="formData.category_id" placeholder="请选择" filterable clearable>
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="属性" prop="attributes">
            <el-select v-model="formData.attributes" multiple filterable clearable placeholder="请选择">
              <el-option v-for="item in attributeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="价格" prop="price">
            <el-input-number v-model="formData.price" :min="0" :precision="2" label="请输入价格" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="库存" prop="inventory">
            <el-input-number v-model="formData.inventory" :min="0" :precision="2" label="请输入库存" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="原价" prop="original_price">
            <el-input-number v-model="formData.original_price" :min="0" :precision="2" label="请输入原价" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="formData.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="主图" prop="image">
        <UploadImage ref="imageRef" v-model="formData.image" :headers="headers" />
      </el-form-item>

      <el-form-item label="产品详情图片" prop="details_img">
        <UploadImage ref="detailsImgRef" v-model="formData.details_img" :headers="headers" :limit="10" />
      </el-form-item>

      <el-form-item label="描述" prop="remark">
        <el-input v-model="formData.remark" resize="none" type="textarea" placeholder="请输入产品描述" clearable />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click.stop="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { insertProduct, updateProduct } from './api.js'
import { getAttributeList, getCategoryList } from '@/api/common.js'
import { UploadImage } from '@/components/UploadImage'
import { getToken } from '@/utils/auth'

export default {
  name: 'CreateEdit',
  components: {
    UploadImage
  },
  data() {
    return {
      type: '',
      titleList: ['', '新增产品', '编辑产品'],
      dialogVisible: false,
      formData: {
        id: '',
        title: '',
        image: '',
        price: '',
        original_price: '',
        details_img: '',
        status: 1,
        category_id: '',
        categoryName: '',
        inventory: '',
        attributes: [],
        attributesName: '',
        remark: ''
      },
      rules: {
        title: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        image: [{ required: true, message: '请选择主图', trigger: 'change' }],
        price: [{ required: true, message: '请输入产品价格', trigger: 'blur' }],
        original_price: [{ required: true, message: '请输入产品原价', trigger: 'blur' }],
        details_img: [{ required: true, message: '请选择产品详情图', trigger: 'change' }],
        category_id: [{ required: true, message: '请选择类目', trigger: 'change' }],
        inventory: [{ required: true, message: '请输入库存', trigger: 'blur' }],
        attributes: [{ required: true, message: '请选择属性', trigger: 'change' }],
        remark: [{ required: true, message: '请输入产品描述', trigger: 'blur' }]
      },
      attributeList: [],
      categoryList: [],
      headers: {
        Authorization: ''
      }
    }
  },
  methods: {
    async getAttributeList() {
      const res = await getAttributeList()

      if (res.code === '1') {
        this.attributeList = res.result
      } else {
        this.attributeList = []
      }
    },
    async getCategoryList() {
      const res = await getCategoryList()

      if (res.code === '1') {
        this.categoryList = res.result
      } else {
        this.categoryList = []
      }
    },
    async init(type, row) {
      this.headers.Authorization = getToken()
      await this.getAttributeList()
      await this.getCategoryList()
      this.dialogVisible = true

      this.type = type
      // 回显
      if (type === 2) {
        const fields = ['id', 'title', 'image', 'price', 'original_price', 'details_img', 'status', 'category_id', 'inventory', 'attributes', 'remark', 'categoryName', 'attributesName']

        fields.forEach(field => {
          if (['image'].includes(field)) {
            this.$nextTick(() => {
              this.$refs['imageRef'].setFileListValue([{ name: row.title, url: row.image }])
              this.formData[field] = row[field]
            })
          } else if (['details_img'].includes(field)) {
            const fileList = row[field].split(',').map((url, index) => {
              return {
                name: `name-${index}`,
                url
              }
            })
            this.$nextTick(() => {
              this.$refs['detailsImgRef'].setFileListValue(fileList)
              this.formData[field] = row[field]
            })
          } else if (['attributes'].includes(field)) {
            this.formData[field] = row[field].split(',').map(value => +value)
          } else {
            this.formData[field] = row[field]
          }
        })
      }
    },
    // 保存
    confirm() {
      let method = ''

      const param = { ...this.formData }
      param.attributes = this.formData.attributes.join(',')
      // 类目名称
      const row = this.categoryList.find(item => +item.value === +param.category_id)

      if (row) {
        param.categoryName = row.label
      }
      // 属性
      const attrNames = this.attributeList.filter(item => param.attributes.split(',').includes(`${item.value}`)).map(sItem => sItem.label).join(',')

      if (attrNames) {
        param.attributesName = attrNames
      }

      if (this.type === 1) {
        method = insertProduct
        Reflect.deleteProperty(param, 'id')
      } else {
        method = updateProduct
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
      this.$refs['imageRef'].resetComRef()
      this.$refs['detailsImgRef'].resetComRef()
      Object.assign(this.$data.formData, this.$options.data().formData)
    }
  }
}
</script>
