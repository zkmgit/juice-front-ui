<template>
  <div class="app-container">
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
import { getTableData, deleteAnnouncement } from './api.js'
import { BasicTable } from '@/components/Table'
import CreateEdit from './CreateEdit.vue'

export default {
  name: 'CarouselImage',
  components: { BasicTable, CreateEdit },
  data() {
    return {
      queryParams: {
        title: '',
        order_num: '',
        status: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: 80 },
        { label: '公告标题', prop: 'title', width: 100 },
        { label: '公告内容', prop: 'content', width: 300 },
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
      this.$confirm('此操作将永久删除该公告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数据
        deleteAnnouncement(id).then(_ => {
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
