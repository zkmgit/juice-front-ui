<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" size="small" :model="queryParams" inline>

        <el-form-item label="快递单号：">
          <el-input v-model="queryParams.tracking_number" clearable />
        </el-form-item>
      </el-form>
    </el-card>

    <basic-table ref="basicTableRef" :table-columns="tableColumns" :query-params="queryParams" :selection="true" :api-fn="apiFn">
      <template #tableButton />
    </basic-table>
  </div>
</template>

<script>
import { getTableData } from './api.js'
import { BasicTable } from '@/components/Table'

export default {
  name: 'Logistics',
  components: { BasicTable },
  data() {
    return {
      queryParams: {
        tracking_number: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: '快递单号', prop: 'tracking_number', width: '140' },
        { label: '快递名称', prop: 'tracking_name', width: '80' },
        { label: '订单编号', prop: 'order_number', width: '130' },
        { label: '用户id', prop: 'user_id', width: 100 },
        { label: '收货人', prop: 'receiver', width: 120 },
        { label: '详细收获地址', prop: 'address', width: 130 },
        { label: '收货人电话', prop: 'phone', width: 100 },
        { label: '物流备注', prop: 'remark', width: 180 },
        { label: '是否删除', prop: 'isDelete', width: 120 },
        { label: '创建时间', prop: 'createTime', width: 140 },
        { label: '修改时间', prop: 'updateTime', width: 140 }
      ]
    }
  },
  created() {
    this.apiFn = getTableData
  },
  methods: {
    refreshTableData() {
      this.$refs.basicTableRef.queryData()
    }
  }
}
</script>
