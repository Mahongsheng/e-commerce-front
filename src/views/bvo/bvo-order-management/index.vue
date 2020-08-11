<template>
  <div v-loading="pageLoading" element-loading-text="拼命加载中">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="search-form">
        <span>Product Title：</span>
        <el-input v-model="searchForm.searchWord" placeholder="Please input product title to search" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="onSearch">Search</el-button>
      </div>
      <div class="tab-container">
        <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="handleClick">
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
              @selection-change="handleAPSelectionChange"
              :data="APlist"
              border
              fit
              highlight-current-row
              style="width: 100%">
              <el-table-column width="80%" align="center" type="selection">
              </el-table-column>
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

              <el-table-column  align="center" label="Total" >
                <template slot-scope="scope">
                  <span>{{ scope.row.productPrice *scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Operation" >
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="payNow(scope.row)">Pay Now</el-button>
                </template>
              </el-table-column>

            </el-table>
            <el-button class="pan-btn light-blue-btn" style="width: auto; margin-top: 5vh " @click="payNowSelected">Pay Now Above selected</el-button>
          </el-tab-pane>
          <el-tab-pane label="Awaiting Shipment" name="AS">
            <el-table v-loading="listLoading" :data="ASlist" border fit highlight-current-row style="width: 100%">

              <el-table-column width="80%" align="center" type="selection">
              </el-table-column>

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
                  <span>{{ scope.row.productPrice *scope.row.productNum }}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Shiped" name="SH">
            <el-table v-loading="listLoading" :data="SHlist" border fit highlight-current-row style="width: 100%">

              <el-table-column width="80%" align="center" type="selection">
              </el-table-column>

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
                  <span>{{ scope.row.productPrice *scope.row.productNum }}</span>
                </template>
              </el-table-column>

              <el-table-column  align="center" label="Tracking No" >
                <template slot-scope="scope">
                  <el-button type="text" @click="gotoTrack(scope.row.trackingNo)">{{scope.row.trackingNo}}</el-button>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
          <el-tab-pane label="Completed Orders" name="CO">
            <el-table v-loading="listLoading" :data="COlist" border fit highlight-current-row style="width: 100%">

              <el-table-column width="80%" align="center" type="selection">
              </el-table-column>

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
                  <span>{{ scope.row.productPrice *scope.row.productNum }}</span>
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
            <el-table v-loading="listLoading" :data="CAlist" border fit highlight-current-row style="width: 100%">

              <el-table-column width="80%" align="center" type="selection">
              </el-table-column>

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
                  <span>{{ scope.row.productPrice *scope.row.productNum }}</span>
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
  import
  {
    getVosByDsrId
  }
  from '@/network/order-management'

  export default {
      name: "bvo-order-management",
      inject: ["reload"],
      data() {
        return {
          searchForm: {
            searchWord: ''
          },
          activeName: 'AP',
          listLoading: true,
          pageLoading: true,
          getSearch: false,
          apSelection:[],
          APlist: [],
          ASlist: [],
          SHlist: [],
          COlist: [],
          CAlist: [],
          list: [],
          searchList: [],
          paylist: []
        }
      },
      created() {
        this.fetchData()
      },
      computed:{
        getDsrId(){
          return this.$store.getters.dsrId
        }
      },
      methods: {
        fetchData(){
          this.pageLoading = false;
          this.listloading = true;
          var dsrid = this.$store.getters.dsrId
          console.log('dsrid:'+dsrid);

          // 获取数据，通过 dsrid
          return new Promise((resolve, reject) => {
            getVosByDsrId({
              // i 为 dsrid
              i: this.getDsrId
              // i: 1
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
          console.log(tab, event);
        },

        //跳转到其他界面：title、pay、track
        //转到商品页
        gotoTitle(proid){
          console.log(proid);
          this.$router.push({
            path: '/bvo/productDetail/'+proid
          });
        },
        //转到付款
        gotoPay(){
          console.log(this.paylist);
          this.$store.commit('order/SET_PAYLIST',this.paylist)
          //跳转到pay界面
          this.$router.push({
            path: '/other/pay'
          });

        },
        //转到快递
        gotoTrack(trackingNo){
          this.$store.commit('order/SET_TRACKINGNO',trackingNo)
          this.$router.push({
            path: '/other/express'
          });
        },

        // 处理ap的选择
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.apTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.apTable.clearSelection();
          }
        },
        handleAPSelectionChange(val) {
          this.apSelection = val;
        },

        // 处理pay相关事件点击
        payNow(item){
          console.log('bvo-order-management payNow() item');
          this.paylist.splice(0, this.paylist.length)
          this.paylist.push(item)
          this.gotoPay();
        },
        payNowSelected(){
          this.paylist.splice(0, this.paylist.length)
          this.paylist = this.apSelection
          this.gotoPay();
        }
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
