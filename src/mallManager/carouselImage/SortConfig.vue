<template>
  <el-dialog title="轮播图排序" width="30%" top="15vh" :visible.sync="dialogShow">

    <Kanban
      :key="1"
      :list="currentSystemSort"
      :group="group"
      class="kanban current"
    />

    <div slot="footer" class="dialog_footer">
      <el-button size="small" @click="dialogShow = false">取 消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Kanban } from '@/components/Kanban'
import { batchSortCarouselImage } from './api.js'
export default {
  name: 'SortConfig',
  components: { Kanban },
  data() {
    return {
      group: 'mission',
      dialogShow: false,
      currentSystemSort: []
    }
  },
  methods: {
    init(row) {
      this.currentSystemSort = row
      this.dialogShow = true
    },
    async handleSubmit() {
      console.log('this.currentSystemSort =>', this.currentSystemSort)
      const params = this.currentSystemSort.map((item, index) => {
        return {
          id: item.id,
          order_num: index + 1
        }
      })

      const res = await batchSortCarouselImage(params)

      if (res.code === '1') {
        this.$message.success(res.msg)
        this.$parent.refreshTableData()
        this.dialogShow = false
      } else {
        this.$message.error(res.msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
