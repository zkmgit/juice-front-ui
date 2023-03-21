<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" size="small" :model="queryParams" inline>

        <el-form-item label="昵称：">
          <el-input v-model="queryParams.nick_name" clearable />
        </el-form-item>

        <el-form-item label="用户状态：">
          <el-select v-model="queryParams.status" filterable clearable>
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <basic-table ref="basicTableRef" :table-columns="tableColumns" :query-params="queryParams" :selection="true" :api-fn="apiFn">
      <template #avatar_url="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.avatar_url"
          :preview-src-list="[row.avatar_url]"
        />
      </template>
      <template #action="{ row }">
        <el-button size="mini" type="primary" @click="addBalance(row)">充值</el-button>
        <el-button v-if="row.status === 1" size="mini" type="danger" @click="FreezeWxUser(row)">冻结</el-button>
        <el-button v-if="row.status === 0" size="mini" type="success" @click="thawWxUser(row)">解冻</el-button>
      </template>
    </basic-table>
    <BalanceEdit ref="balanceEditRef" />
  </div>
</template>

<script>
import { getTableData, isFreeze } from './api.js'
import { BasicTable } from '@/components/Table'
import BalanceEdit from '@/mallManager/wxUser/BalanceEdit'

export default {
  name: 'WxUser',
  components: { BasicTable, BalanceEdit },
  data() {
    return {
      queryParams: {
        nick_name: '',
        status: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: '昵称', prop: 'nickName', width: '100' },
        { label: '微信默认地址', prop: 'addr', width: '100' },
        { label: '微信头像', prop: 'avatar_url', slot: 'avatar_url', width: '100' },
        { label: '余额', prop: 'balance', width: '100' },
        { label: '状态', prop: 'statusName', width: 100 },
        { label: '创建时间', prop: 'createTime', width: 90 },
        { label: '修改时间', prop: 'updateTime', width: 90 },
        { label: '操作', slot: 'action', width: 150, fixed: 'right' }
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
    addBalance(row) {
      this.$refs.balanceEditRef.init(row)
    },
    FreezeWxUser(row) {
      this.$confirm('此操作将该小程序用户冻结, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        isFreeze({ id: row.id, status: 0 }).then(res => {
          if (res.code === '1') {
            this.$message.success(res.msg)
            this.refreshTableData()
            this.dialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      })
    },
    thawWxUser(row) {
      this.$confirm('此操作将该小程序用户解冻启用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        isFreeze({ id: row.id, status: 1 }).then(res => {
          if (res.code === '1') {
            this.$message.success(res.msg)
            this.refreshTableData()
            this.dialogVisible = false
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {

      })
    }
  }
}
</script>
