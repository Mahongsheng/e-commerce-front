<template>
  <div class="express-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Tracking No：{{number}}</span>
        <span></span>
      </div>
      <el-timeline>
        <el-timeline-item v-for="i in newlist" :timestamp="i.time" placement="top">
          <el-card style="width: 40%">
            {{i.status}}
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>

  import { getExpressTrack,baidu } from '@/network/order-management'

    export default {
      name: "express",
      data(){
        return {
          list: [
            {
              time: "2020-7-21 20:24:51",
              status: "北京分拨中心进行装车扫描，发往：辽宁大连分拨中心"
            },
            {
              time: "2020-7-21 01:18:48",
              status: "北京分拨中心进行中转集包扫描，发往：辽宁大连分拨中心"
            },
            {
              time: "2020-7-21 01:09:00",
              status: "北京分拨中心在分拨中心进行称重扫描"
            },
            {
              time: "2020-7-21 20:34:28",
              status: "北京石景山区金顶街公司进行揽件扫描"
            },
            {
              time: "2020-7-21 21:09:00",
              status: "北京分拨中心进行中转集包扫描，发往：辽宁大连分拨中心"
            },
            {
              time: "2020-7-21 01:09:00",
              status: "辽宁大连分拨中心在金辉分拨中心进行称重扫描"
            },
          ],
          newlist: [],
          number: 931658943036
        }
      },
      created() {
        this.fetchData()
      },
      methods:{
        fetchData(){
          // this.number = this.$store.state.order.trackingNo

          // return new Promise((resolve, reject) => {
          //   getExpressTrack({
          //     appkey: '07be25240a660f534f33b13e18a0a2b3',
          //     type: 'auto',
          //     number: 931658943036
          //   }).then(response => {
          //     console.log('code');
          //     console.log(response.code)
          //     console.log(response)
          //     this.list = response.result.result.list
          //     this.loading = false
          //   }).catch(error => {
          //     reject(error);
          //     this.loading = false
          //   })
          // })

          for (let i = 0; i <=this.list.length;i++) {
            this.newlist.push(this.list.pop());
          }
          this.newlist.push(this.list[0]);
        }
      }
    }
</script>

<style scoped>

</style>
