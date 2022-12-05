<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" size="small" :model="queryParams" inline>

        <el-form-item label="姓名：">
          <el-input v-model="queryParams.name" clearable />
        </el-form-item>

        <el-form-item label="用户名：">
          <el-input v-model="queryParams.username" clearable />
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
      <template #action="{ row }">
        <el-button size="mini" type="warning" @click="modifyDialog(2, row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="deleteRow(row.id)">删除</el-button>
      </template>

      <template #tableButton>
        <el-button size="mini" type="primary" @click="modifyDialog(1)">新增</el-button>
      </template>
    </basic-table>
    <CreateEdit ref="createEditRef" />
  </div>
</template>

<script>
import { getTableData, deleteUser } from './api.js'
import { BasicTable } from '@/components/Table'
import CreateEdit from './CreateEdit.vue'

export default {
  name: 'User',
  components: { BasicTable, CreateEdit },
  data() {
    return {
      queryParams: {
        username: '',
        name: '',
        status: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: '用户名', prop: 'username', width: '100' },
        { label: '姓名', prop: 'name', width: '100' },
        { label: '性别', prop: 'sexName', width: '100' },
        { label: '状态', prop: 'statusName', width: 100 },
        { label: '邮箱', prop: 'email', width: 90 },
        { label: '创建时间', prop: 'createTime', width: 90 },
        { label: '修改时间', prop: 'updateTime', width: 90 },
        { label: '操作', slot: 'action', width: 90 }
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
    modifyDialog(type, row) {
      this.$refs.createEditRef.init(type, row)
    },
    deleteRow(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 删除数据
          deleteUser(id).then(_ => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.refreshTableData()
          })
        })
        .catch(() => {})
    }
  }
}
</script>
