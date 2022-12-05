<template>
  <div class="app-container">
    <el-card>
      <el-form ref="queryForm" size="small" :model="queryParams" inline>

        <el-form-item label="轮播图名称：">
          <el-input v-model="queryParams.title" clearable />
        </el-form-item>

        <el-form-item label="排序：">
          <el-input v-model="queryParams.order_num" clearable />
        </el-form-item>

        <el-form-item label="状态：">
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

      <template #image="{ row }">
        <el-image
          style="width: 100px; height: 100px"
          :src="row.image"
          :preview-src-list="[row.image]"
        />
      </template>

      <template #tableButton>
        <el-button size="mini" type="primary" @click="modifyDialog(1)">新增</el-button>
        <el-button size="mini" type="primary" @click="sortDialog">轮播图排序</el-button>
      </template>
    </basic-table>
    <CreateEdit ref="createEditRef" />
    <SortConfig ref="sortConfigRef" />
  </div>
</template>

<script>
import { getTableData, deleteCarouselImage } from './api.js'
import { BasicTable } from '@/components/Table'
import CreateEdit from './CreateEdit.vue'
import SortConfig from './SortConfig.vue'

export default {
  name: 'CarouselImage',
  components: { BasicTable, CreateEdit, SortConfig },
  data() {
    return {
      queryParams: {
        title: '',
        order_num: '',
        status: ''
      },
      apiFn: () => {},
      tableColumns: [
        { label: 'ID', prop: 'id', width: '80' },
        { label: '轮播图名称', prop: 'title', width: '100' },
        { label: '图片', prop: 'image', slot: 'image', width: 200 },
        { label: '轮播图状态', prop: 'statusName', width: 100 },
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
      this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数据
        deleteCarouselImage(id).then(_ => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.refreshTableData()
        })
      }).catch(() => {

      })
    },
    async sortDialog() {
      const res = await getTableData({ ps: 999, pn: 1 })

      if (res.code === '1') {
        const data = res.result.map(item => {
          return {
            id: item.id,
            name: item.title
          }
        })

        this.$refs.sortConfigRef.init(data)
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>
