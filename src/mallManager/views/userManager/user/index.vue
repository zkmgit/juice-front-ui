<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="ID" prop="id" width="80" />

      <el-table-column label="用户名" prop="username" min-width="100" />

      <el-table-column label="姓名" prop="name" min-width="100" />

      <el-table-column label="性别" prop="sexName" min-width="100" />

      <el-table-column label="用户状态" min-width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用"
            :active-value="1"
            :inactive-value="2"
          />
        </template>
      </el-table-column>

      <el-table-column label="邮箱" prop="email" min-width="100" />

      <el-table-column label="创建时间" prop="create_time" min-width="100" />
    </el-table>
    <el-pagination
      background
      :current-page="queryParam.pn"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
<!--  <input/>-->
</template>

<script>
import { getTableData } from '@/mallManager/api/userManager/user.js'

export default {
  name: 'User',
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      queryParam: {
        pn: 1,
        ps: 10
      },
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.queryParam.pn = currentPage
      this.fetchData()
    },
    handleSizeChange(limit) {
      this.queryParam.ps = limit
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getTableData(this.queryParam).then(res => {
        if (res.code === '1') {
          this.list = res.result
          this.$message.success('查询成功')
        } else {
          this.$message.error('查询失败')
        }
        this.total = res.total
        this.listLoading = false
      })
    }
  }
}
</script>
