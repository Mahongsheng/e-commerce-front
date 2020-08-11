<template>
  <div>
    <div class="availableMoney-container">
      <div class="table-container">
        <el-table
          v-loading="listLoading"
          :data="list"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="Account Name" align="center" >
            <template slot-scope="scope">
              {{ form.accountName }}
            </template>
          </el-table-column>
          <el-table-column label="Available Money" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableMoney }}
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="withdrawClick(scope.$index)" >withdraw</el-button>
              <el-button type="success" size="mini" @click="goToRecord" >record</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-container">
          <el-dialog :visible.sync="dialogFormVisible" title="Withdraw">
            <el-form ref="form" :model="form" :rules="formRules" label-width="150px">
              <el-form-item prop="flow" label="Money Amout : $">
                <el-input v-model.number="form.flow" />
              </el-form-item>
              <el-form-item prop="password" label="Password">
                <el-input type="password" v-model="form.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onWithdraw">Withdraw</el-button>
                <el-button @click="closeDialog">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import
  {
    getAvailableMoney, walletRegister,
    withDrawMoney,
  }
    from '@/network/wallet'

  export default {
    name: "mvo-available-money",
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
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The password can not be empty'))
        } else {
          callback()
        }
      }
      const validateFlow = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The value you want to withdraw can not be empty'))
        }
        if (!Number.isInteger(value)) {
          callback(new Error('please input number'));
        } else {
          callback()
        }
      }
      return {
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        form: {
          accountName:'',
          flow:'',
          password:''
        },
        formRules: {
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
          flow:[{
            required: true,
            trigger: 'blur',
            validator: validateFlow
          }]
        },
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
      fetchData() {
        this.form.accountName = this.getAccountName
        this.listLoading = true
        return new Promise((resolve, reject) => {
          getAvailableMoney({
            accountName: this.form.accountName
          }).then(response => {
            this.list = response.data;
            this.listLoading = false
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      closeDialog(){
        this.dialogFormVisible = false;
        this.form.flow = '';
        this.form.password = '';
        this.$refs.form.resetFields();
      },
      withdrawClick(){
        console.log(this.form.accountName)
        this.dialogFormVisible = true;
      },
      onWithdraw(){
        this.$refs.form.validate(valid => {
          console.log('valid:'+valid);
          if (valid) {
            return new Promise((resolve, reject) => {
              withDrawMoney({
                accountName: this.form.accountName,
                flow: this.form.flow,
                password: this.form.password
              }).then(response => {
                console.log('mvo-available-money onWithdraw() withDrawMoney code is ');
                console.log(response.code);
                this.closeDialog();
              }).catch(error => {
                console.log(error);
                reject(error);
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      goToRecord(){
        this.$router.push({
          path: '/mvo/mvoTransactionRecord'
        })
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
  .table-container{
    padding: 3vh;
  }
  .availableMoney-container{
    padding-bottom: 3vh;
  }
</style>
