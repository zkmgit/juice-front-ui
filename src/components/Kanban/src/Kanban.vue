<template>
  <div class="board-column">
    <draggable
      :list="list"
      v-bind="$attrs"
      class="board-column-content"
      :set-data="setData"
    >
      <div v-for="(element, index) in list" :key="element.id" class="board-item">
        {{ element.name }}
        <span style="float:right;color:rgb(102, 177, 255)">{{ `第${index + 1}` }}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragKanbanDemo',
  components: {
    draggable
  },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  .board-column-header {
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }
  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 500px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    background-color: rgb(133, 130, 130);
    align-items: center;
    .board-item {
      cursor: pointer;
      width: 100%;
      height: 45px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 45px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
