<template>
  <div class="app-container">
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

export default {
  name: 'ShoppingCart',
  components: { BasicTable },
  data() {
    return {
      queryParams: {},
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: '用户id', prop: 'user_id', width: '80' },
        { label: '产品id', prop: 'product_id', width: '80' },
        { label: 'SPU', prop: 'spu', width: '100' },
        { label: '产品名称', prop: 'title', width: '100' },
        { label: '图片', prop: 'product_image', slot: 'product_image', width: 100 },
        { label: '产品价格', prop: 'price', width: 100 },
        { label: '产品购买数量', prop: 'quantity', width: 100 },
        { label: '产品规格', prop: 'specifications', width: '100' },
        { label: '是否删除', prop: 'is_delete', width: 100 },
        { label: '创建时间', prop: 'createTime', width: 130 },
        { label: '修改时间', prop: 'updateTime', width: 130 },
        { label: '操作', slot: 'action', width: 130 }
      ]
    }
  },
  created() {
    this.apiFn = getTableData
  },
  methods: {
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
