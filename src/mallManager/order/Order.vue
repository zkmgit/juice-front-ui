<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" size="small" :model="queryParams" inline>

        <el-form-item label="订单编号：">
          <el-input v-model="queryParams.order_number" clearable />
        </el-form-item>

        <el-form-item label="创建人：">
          <el-select v-model="queryParams.user_id" filterable clearable>
            <el-option v-for="(item, index) in userList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="订单状态：">
          <el-select v-model="queryParams.status" filterable clearable>
            <el-option v-for="(item, index) in statusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
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
import { getUserList } from '@/api/common.js'

export default {
  name: 'Order',
  components: { BasicTable, CreateEdit },
  data() {
    return {
      queryParams: {
        order_number: '',
        user_id: '',
        status: ''
      },
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
      ],
      userList: [],
      statusList: [
        { label: '待付款', value: 1 },
        { label: '待发货', value: 2 },
        { label: '待收货', value: 3 },
        { label: '待评价', value: 4 }
      ]
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
    // 发货
    ship(row) {
      this.$refs.createEditRef.init(row.id)
    }
  }
}
</script>
