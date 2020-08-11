<template>
  <div v-loading="pageLoading" element-loading-text="拼命加载中">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="search-form">
        <span>Product Title：</span>
        <el-input v-model="searchForm.searchWord" placeholder="Please input product title to search" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="onSearch">Search</el-button>
      </div>
      <div class="tab-container">
        <el-tabs v-model="activeName" style="margin-top:2vh;" type="border-card" @tab-click="handleClick">
          <el-tab-pane v-if="getSearch" label="Search Result" name="GR">
            <el-table
              v-loading="listLoading"
              ref="apTable"
              :data="searchList"
              border
              fit
              highlight-current-row
              style="width: 100%">
              <el-table-column align="center" label="Title">
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTitle(scope.row.proId)">{{ scope.row.productTitle }}</el-button>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Order No" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productOrderNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Total" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice *scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Status" >
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 1">Awaiting Payment</span>
                  <span v-if="scope.row.type == 2">Awaiting Shipment</span>
                  <span v-if="scope.row.type == 3">Shipped</span>
                  <span v-if="scope.row.type == 4">Completed</span>
                  <span v-if="scope.row.type == 5">Cancelled</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Awaiting Payment" name="AP">
            <el-table
              v-loading="listLoading"
              ref="apTable"
              :data="APlist"
              border
              fit
              highlight-current-row
              style="width: 100%">

              <el-table-column align="center" label="Title">
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTitle(scope.row.proId)">{{ scope.row.productTitle }}</el-button>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Price">
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="QTY">
                <template slot-scope="scope">
                  <span>{{ scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Sku" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productSku }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Order No" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productOrderNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Created Time" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productCreateTime }}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Awaiting Shipment" name="AS">
            <el-table
              v-loading="listLoading"
              :data="ASlist"
              border
              fit
              highlight-current-row
              style="width: 100%">

              <el-table-column align="center" label="Title">
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTitle(scope.row.proId)">{{scope.row.productTitle}}</el-button>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Price">
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="QTY">
                <template slot-scope="scope">
                  <span>{{ scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Sku" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productSku }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Order No" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productOrderNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Created Time" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productCreateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Operation" >
                <template slot-scope="scope">
                  <el-button size="mini" type="success" @click="onExpress(scope.row)"> Deliver</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Shiped" name="SH">
            <el-table
              v-loading="listLoading"
              :data="SHlist"
              border
              fit
              highlight-current-row
              style="width: 100%">

              <el-table-column align="center" label="Title">
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTitle(scope.row.proId)">{{scope.row.productTitle}}</el-button>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Price">
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="QTY">
                <template slot-scope="scope">
                  <span>{{ scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Sku" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productSku }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Order No" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productOrderNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Total" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productNum * scope.row.productPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Created Time" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productCreateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Tracking No" >
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTrack(scope.row.trackingNo)">{{scope.row.trackingNo}}</el-button>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Operation" >
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="onCancel(scope.row)"> Cancel</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Completed Orders" name="CO">
            <el-table
              v-loading="listLoading"
              :data="COlist"
              border
              fit
              highlight-current-row
              style="width: 100%">

              <el-table-column align="center" label="Title">
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTitle(scope.row.proId)">{{scope.row.productTitle}}</el-button>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Price">
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="QTY">
                <template slot-scope="scope">
                  <span>{{ scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Sku" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productSku }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Order No" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productOrderNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Created Time" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productCreateTime }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Tracking No" >
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTrack(scope.row.trackingNo)">{{scope.row.trackingNo}}</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Cancelled Orders" name="CA">
            <el-table
              v-loading="listLoading"
              :data="CAlist"
              border
              fit
              highlight-current-row
              style="width: 100%">

              <el-table-column align="center" label="Title">
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTitle(scope.row.proId)">{{scope.row.productTitle}}</el-button>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Price">
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="QTY">
                <template slot-scope="scope">
                  <span>{{ scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="Sku" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productSku }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Order No" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productOrderNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Created Time" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productCreateTime }}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
    <div class="dialog-container">
      <el-dialog :visible.sync="sendExpressVisiable" title="Send Express">
        <el-form ref="express" :model="express" :rules="formRules" label-width="120px">
          <el-form-item prop="track" label="Tracking No：">
            <el-input v-model="express.track" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onConfirm">Confirm</el-button>
            <el-button @click="closeDialog">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import
  {
    mvoGetSalList,
    sendExpress,
    cancal
  }
  from '@/network/order-management'
  import {changePassword, getAvailableMoney, withDrawMoney} from "@/network/wallet";

  export default {
    name: "mvo-order-management",
    inject: ["reload"],
    data() {
      const validateTrack = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The Tracking No can not be empty'))
        } else {
          callback()
        }
      }
      return {
        express:{
          track: '',
          saoid: '',
        },
        searchForm: {
          searchWord: ''
        },
        cancelSaoid: '',
        activeName: 'AP',
        listLoading: true,
        pageLoading: true,
        getSearch: false,
        sendExpressVisiable: false,
        APlist: [],
        ASlist: [],
        SHlist: [],
        COlist: [],
        CAlist: [],
        list: [],
        searchList: [],
        formRules: {
          track: [{
            required: true,
            trigger: 'blur',
            validator: validateTrack
          }]
        },
      }
    },
    created() {
      this.fetchData()
    },
    computed:{
      getManId(){
        return this.$store.getters.manId
      },
    },
    methods: {
      fetchData(){
        this.pageLoading = false;
        this.listloading  = true;

        this.APlist.splice(0,this.APlist.length)
        this.ASlist.splice(0,this.ASlist.length)
        this.SHlist.splice(0,this.SHlist.length)
        this.COlist.splice(0,this.COlist.length)
        this.CAlist.splice(0,this.CAlist.length)

        return new Promise((resolve, reject) => {
          mvoGetSalList({
            // i 为 manid
            i: this.getManId
          }).then(response => {
            console.log('code');
            console.log(response.code)
            console.log(response)

            // 1. AwaitingPayment 2. AwaitingShipment 3. SHIPPED 已发货 4. Complete 已完成5. Canceled已取消
            for(let i = 0; i < response.data.length; i++){
              this.list.push(response.data[i])
              if(response.data[i].type == 1){
                // console.log('AP');
                this.APlist.push(response.data[i])
                console.log(this.APlist);
              }
              if(response.data[i].type == 2){
                // console.log('AS');
                this.ASlist.push(response.data[i])
              }
              if(response.data[i].type == 3){
                // console.log('SH');
                this.SHlist.push(response.data[i])
              }
              if(response.data[i].type == 4){
                // console.log('CO');
                this.COlist.push(response.data[i])
              }
              if(response.data[i].type == 5){
                // console.log('CA');
                this.CAlist.push(response.data[i])
              }
            }
            resolve()
            this.listLoading = false
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      // 查询，查询出什么不知道，与后端沟通
      onSearch() {
        console.log(this.searchForm.searchWord);
        console.log(this.list);
        this.searchList.splice(0,this.searchList.length)
        for (let i=0;i<this.list.length;i++){
          if(this.list[i].productTitle.indexOf(this.searchForm.searchWord) != -1){
            console.log(this.list[i].productTitle);
            this.searchList.push(this.list[i])
          }
        }
        if(this.searchList.length != 0 && this.searchForm.searchWord != ''){
          this.getSearch = true;
          this.activeName = 'GR'
        }else{
          this.getSearch = false;
          this.searchList.splice(0,this.searchList.length)
          this.activeName = 'AP'
        }
        console.log(this.searchList);
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      },

      //跳转到其他界面：title、track
      //转到商品页
      gotoTitle(proid){
        console.log(proid);
        this.$router.push({
          path: '/mvo/productDetail/'+proid
        });
      },
      //转到快递
      gotoTrack(trackingNo){
        this.$store.commit('order/SET_TRACKINGNO',trackingNo)
        this.$router.push({
          path: '/other/express'
        });
      },

      // 处理 onExpress 相关事件点击
      onExpress(item){
        console.log(item);
        this.express.saoid = item.saoId
        this.sendExpressVisiable = true;
      },

      // 处理 onCancel 相关事件点击
      onCancel(item){
        this.cancelSaoid = item.saoId
        console.log(this.cancelSaoid);
        return new Promise((resolve, reject) => {
          cancal({
            // 订单编号
            i: this.cancelSaoid
          }).then(response => {
            console.log('code');
            console.log(response.code)
            resolve()
            this.reload();
          }).catch(error => {
            reject(error);
          })
        })

      },

      // 处理 onConfirm 相关事件点击
      onConfirm(){
        let trackingNo = this.express.track
        this.$refs.express.validate(valid => {
          if (valid) {
            this.closeDialog();
            return new Promise((resolve, reject) => {
              sendExpress({
                //应该发送订单编号，快递单号
                saoId: this.express.saoid,
                trackNo: trackingNo
              }).then(response => {
                console.log('code');
                console.log(response.code)
                resolve()
                this.reload();
              }).catch(error => {
                reject(error);
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })


      },

      closeDialog(){
        this.sendExpressVisiable = false;
        this.$refs.express.resetFields();
      },

      depositClick(){
        this.sendExpressVisiable = true;
      },

    }
  }
</script>


<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";
  .pan-btn {
    margin-left: 1vw;
    width: 130px;
  }
</style>
