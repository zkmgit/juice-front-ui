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

        <el-form-item label="创建人：">
          <el-select v-model="queryParams.user_id" filterable clearable>
            <el-option v-for="(item, index) in userList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="产品规格：">
          <el-input v-model="queryParams.specifications" clearable />
        </el-form-item>
      </el-form>
    </el-card>

    <basic-table ref="basicTableRef" :table-columns="tableColumns" :query-params="queryParams" :selection="true" :api-fn="apiFn">

      <template #product_image="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.product_image"
          :preview-src-list="[row.product_image]"
        />
      </template>

      <template #action="{ row }">
        <el-button size="mini" type="danger" @click="deleteRow(row.id)">删除</el-button>
      </template>

      <template #tableButton />
    </basic-table>
  </div>
</template>

<script>
import { getTableData, deleteShoppingCart } from './api.js'
import { BasicTable } from '@/components/Table'
import { getUserList } from '@/api/common.js'

export default {
  name: 'ShoppingCart',
  components: { BasicTable },
  data() {
    return {
      queryParams: {
        spu: '',
        title: '',
        user_id: '',
        specifications: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: '用户id', prop: 'user_id', width: '80' },
        { label: '产品id', prop: 'product_id', width: '80' },
        { label: 'SPU', prop: 'spu', width: 100 },
        { label: '产品名称', prop: 'title', width: 120 },
        { label: '图片', prop: 'product_image', slot: 'product_image', width: 100 },
        { label: '产品价格', prop: 'price', width: 100 },
        { label: '产品购买数量', prop: 'quantity', width: 100 },
        { label: '产品规格', prop: 'specifications', width: 120 },
        { label: '购物车状态', prop: 'statusName', width: 110 },
        { label: '创建时间', prop: 'createTime', width: 130 },
        { label: '修改时间', prop: 'updateTime', width: 130 },
        { label: '操作', slot: 'action', width: 130 }
      ],
      userList: []
    }
  },
  async created() {
    this.apiFn = getTableData
    await this.getUserList()
  },
  methods: {
    async getUserList() {
      const res = await getUserList()

      if (res.code === '1') {
        this.userList = res.result
      } else {
        this.userList = []
      }
    },
    refreshTableData() {
      this.$refs.basicTableRef.queryData()
    },
    deleteRow(id) {
      this.$confirm('此操作将永久删除该购物车, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数据
        deleteShoppingCart(id).then(_ => {
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
