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
        <el-button type="primary" size="mini" :disabled="[1, 3, 4].includes(row.status)" @click="ship(row)">发货</el-button>
      </template>

      <template #tableButton />
    </basic-table>
    <CreateEdit ref="createEditRef" />
  </div>
</template>

<script>
import { getTableData } from './api.js'
import { BasicTable } from '@/components/Table'
import CreateEdit from './CreateEdit.vue'

export default {
  name: 'Order',
  components: { BasicTable, CreateEdit },
  data() {
    return {
      queryParams: {},
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '70' },
        { label: '订单编号', prop: 'order_number', width: '150' },
        { label: '用户id', prop: 'user_id', width: '80' },
        { label: '购物车id', prop: 'cart_ids', width: '80' },
        { label: '订单总金额', prop: 'total_amount', width: 100 },
        { label: '订单总数量', prop: 'total_quantity', width: 120 },
        { label: '订单状态', prop: 'statusName', width: 100 },
        { label: '收货人', prop: 'receiver', width: 100 },
        { label: '收货地址', prop: 'address', width: 150 },
        { label: '收货人电话', prop: 'phone', width: 120 },
        { label: '订单备注', prop: 'remark', width: 200 },
        { label: '创建时间', prop: 'createTime', width: 160 },
        { label: '修改时间', prop: 'updateTime', width: 160 },
        { label: '操作', slot: 'action', width: 130, fixed: 'right' }
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
    // 发货
    ship(row) {
      this.$refs.createEditRef.init(row.id)
    }
  }
}
</script>
