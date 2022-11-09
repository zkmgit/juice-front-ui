<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div>
      <Swiper v-if="list.length > 0" style="text-align: center" :auto-play="true" :show-indicator="true" interval="2500" duration="500">
        <Slide v-for="(item, index) in list" :key="index">
          <el-image style="width: 564px;height: 300px" :src="item.value" />
        </Slide>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCarouselImageList } from '@/api/common.js'
import { Swiper, Slide } from 'vue-swiper-component'

export default {
  name: 'Dashboard',
  components: {
    Swiper,
    Slide
  },
  data() {
    return {
      list: [1, 2, 3]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    getCarouselImageList().then(res => {
      this.list = res.result
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
