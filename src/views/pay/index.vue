<template>
  <div class="pay-container">
    <div class="pay-item-container">
      <el-table
        ref="apTable"
        :data="payList"
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
        <el-table-column  align="center" label="Total" >
          <template slot-scope="scope">
            <span>{{ scope.row.productPrice * scope.row.productNum }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pay-form-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="Receiver">
          <el-input v-model="form.receiver" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="Mobile">
          <el-input v-model="form.mobile" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="ZIP Code">
          <el-input v-model="form.zipcode" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="Ship to">
          <el-cascader
            v-model="workarea"
            :options="options"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="Express Fee">
          <el-input :disabled="true" v-model="form.expressfee" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPay">Pay Now</el-button>
        </el-form-item>
        </el-form>
    </div>
    <div class="pay-dialog-container">
      <el-dialog :visible.sync="dialogFormVisible" title="Input Password" @submit.native.prevent>
        <el-form ref="payForm" :model="payForm" label-width="150px" :rules="payFormRules">
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="payForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Confirm</el-button>
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
    getExpressFee,
    updateStatus
  }
  from '@/network/order-management'

  import {pay, getAdminFlow, walletRegister} from '@/network/wallet'

  import area from '@/views/pay/select_area/select_area';

  export default {
    name: 'pay',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The password can not be empty'))
        } else {
          callback()
        }
      }
      return {
        options: areajson,  //areajson为引入外部js文件的json数组名称
        workarea: ['110000', '110100', '110101'],
        form: {
          receiver: 'lilei',
          mobile: '13988888888',
          zipcode: '510000',
          expressfee: 100
        },
        payForm:{
          flow: 0,
          password: ''
        },
        payList: [],
        saoIdList: [],
        address:{
          province: 0,
          city: 0,
          district: 0
        },
        dialogFormVisible: false,
        payFormRules: {
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        }
      }
    },
    created() {
      this.fetchData()
    },
    computed:{
      getAccountName(){
        return this.$store.getters.userName
      }
    },
    methods: {
      //跳转到其他界面：title、pay、track
      //转到商品页
      gotoTitle(proid){
        console.log(proid);
        this.$router.push({
          path: '/bvo/productDetail/'+proid
        });
      },
      onSubmit() {
        console.log('submit!');
        this.saoIdList.splice(0, this.saoIdList.length);
        for (let i = 0; i<this.payList.length; i++){
          this.saoIdList.push(this.payList[i].saoId)
          this.payForm.flow += this.payList[i].productPrice * this.payList[i].productNum
        }
        this.payForm.flow += this.form.expressfee

        this.$refs.payForm.validate(valid => {
          if (valid) {
            this.payMethod()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      payMethod(){
        return new Promise((resolve, reject) => {
          pay({
            accountName: this.getAccountName,
            flow: this.payForm.flow,
            password: this.payForm.password
          }).then(response => {
            this.form.expressfee = 100
            resolve()
            this.updateMethod()
            // this.$router.go(-1)
          }).catch(error => {
            reject(error);
            this.closeDialog()
          })
        })
      },
      updateMethod(){
        return new Promise((resolve, reject) => {
          updateStatus({
            // ints:orderNums
            ints: this.saoIdList
          }).then(response => {
            console.log('code');
            console.log(response.code)
            console.log(response)
            this.form.expressfee = 100
            resolve()
            this.$router.go(-1)
          }).catch(error => {
            reject(error);
            this.closeDialog()
          })
        })
      },
      onPay(){
        this.dialogFormVisible = true;
      },
      closeDialog(){
        this.dialogFormVisible = false;
        this.payForm.password = '';
        this.$refs.payForm.resetFields();
      },
      handleChange(value) {
        // console.log(value);
        this.address.province = value[0]
        this.address.city = value[1]
        this.address.district = value[2]
        this.getExpressFee();
      },
      fetchData(){
        this.payList = this.$store.state.order.payList
        this.address.province = this.workarea[0]
        this.address.city = this.workarea[1]
        this.address.district = this.workarea[2]
        this.getExpressFee()
      },
      getExpressFee(){
        return new Promise((resolve, reject) => {
          getExpressFee({
            string: this.address.province,
          }).then(response => {
            console.log('code');
            console.log(response)
            this.form.expressfee = response.data
            // this.form.expressfee = 100
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pay-container{

  }

  .pay-item-container{
    margin: 3vh auto;
    padding: 3vh;
  }

  .pay-form-container{
    width: 35%;
    margin:0 auto
  }
</style>
