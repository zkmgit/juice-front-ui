<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" size="small" :model="queryParams" inline>

        <el-form-item label="SPU：">
          <el-input v-model="queryParams.spu" clearable />
        </el-form-item>

        <el-form-item label="产品名称：">
          <el-input v-model="queryParams.title" clearable />
        </el-form-item>

        <el-form-item label="状态：">
          <el-select v-model="queryParams.status" filterable clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>

        <el-form-item label="分类：">
          <el-select v-model="queryParams.category_id" filterable clearable>
            <el-option v-for="(item, index) in categoryList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <basic-table ref="basicTableRef" :table-columns="tableColumns" :query-params="queryParams" :selection="true" :api-fn="apiFn">

      <template #image="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.image"
          :preview-src-list="[row.image]"
        />
      </template>

      <template #action="{ row }">
        <el-button size="mini" type="primary" @click="addSkillTime(row.id)" v-if="row.categoryName === '限时秒杀'">添加秒杀时间</el-button>
        <hr v-if="row.categoryName === '限时秒杀'">
        <el-button size="mini" type="warning" @click="modifyDialog(2, row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="deleteRow(row.id)">删除</el-button>
      </template>

      <template #tableButton>
        <el-button size="mini" type="primary" @click="modifyDialog(1)">新增</el-button>
      </template>
    </basic-table>
    <CreateEdit ref="createEditRef" />
    <SkillTimeEdit ref="skillTimeEdit" />
  </div>
</template>

<script>
import { getTableData, deleteProduct } from './api.js'
import { BasicTable } from '@/components/Table'
import CreateEdit from './CreateEdit.vue'
import SkillTimeEdit from '@/mallManager/product/SkillTimeEdit'
import { getCategoryList } from '@/api/common.js'

export default {
  name: 'Product',
  components: { BasicTable, CreateEdit, SkillTimeEdit },
  data() {
    return {
      queryParams: {
        spu: '',
        title: '',
        category_id: '',
        status: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: 'SPU', prop: 'spu', width: '100' },
        { label: '产品名称', prop: 'title', width: '100' },
        { label: '图片', prop: 'image', slot: 'image', width: 120 },
        { label: '类目名称', prop: 'categoryName', width: '100' },
        { label: '属性名称', prop: 'attributesName', width: '100' },
        { label: '产品状态', prop: 'statusName', width: 100 },
        { label: '产品价格', prop: 'price', width: 100 },
        { label: '库存', prop: 'inventory', width: 60 },
        // { label: '产品描述', prop: 'remark', width: 100 },
        { label: '秒杀开始时间', prop: 'seckillStartTime', width: 155 },
        { label: '秒杀结束时间', prop: 'seckillEndTime', width: 155 },
        { label: '创建时间', prop: 'createTime', width: 155 },
        { label: '修改时间', prop: 'updateTime', width: 155 },
        { label: '操作', slot: 'action', width: 150, fixed: 'right' }
      ],
      categoryList: []
    }
  },
  async created() {
    this.apiFn = getTableData
    await this.getCategoryList()
  },
  methods: {
    async getCategoryList() {
      const res = await getCategoryList()

      if (res.code === '1') {
        this.categoryList = res.result
      } else {
        this.categoryList = []
      }
    },
    refreshTableData() {
      this.$refs.basicTableRef.queryData()
    },
    modifyDialog(type, row) {
      this.$refs.createEditRef.init(type, row)
    },
    addSkillTime(id) {
      this.$refs.skillTimeEdit.init(id)
    },
    deleteRow(id) {
      this.$confirm('此操作将永久删除该产品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数据
        deleteProduct(id).then(_ => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.refreshTableData()
        })
      }).catch(() => {

      })
    }
  }
}
</script>
