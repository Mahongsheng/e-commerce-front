<template>
  <div class="dashboard-container" align="center">
    <el-image :src="imgSrc" style="vertical-align:middle;" alt="ECO电商平台" />
    <el-image src="https://s1.ax1x.com/2020/07/21/U5Mt8U.png" style="width: 75vh; height: 75vh; margin-top: 4vh; vertical-align:middle;"></el-image>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'Welcome',
    data() {
      return {
        imgSrc: require('@/assets/images/orange-brand.png'),
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
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
