<template>
  <div>
    <div class="availableMoney-container">
      <div class="password-change-container">
        <div class="dialog-container">
          <el-dialog :visible.sync="changePasswordVisible" title="Change password" >
            <el-form ref="form" :model="form" label-width="125px" :rules="formRules">
              <el-form-item label="Old Password" prop="oldPassword" >
                <el-input v-model="form.oldPassword" />
              </el-form-item>
              <el-form-item label="New Password" prop="newPassword">
                <el-input type="password" v-model="form.newPassword" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onConfirm">Confirm</el-button>
                <el-button @click="closeDialog">Cancel</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
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
            <template slot-scope="scope" >
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
              <el-button type="primary" size="mini" @click="depositClick()" >deposit</el-button>
              <el-button type="success" size="mini" @click="goToRecord" >record</el-button>
              <el-button type="info" size="mini" @click="changePasswordVisible = true" >Change Password</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-container">
          <el-dialog :visible.sync="dialogFormVisible" title="Deposit" >
            <el-form ref="form" :model="form" label-width="155px" :rules="formRules">
              <el-form-item label="Deposit Amount：$" prop="flow">
                <el-input v-model.number="form.flow" />
              </el-form-item>
              <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="form.password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onDeposit">Deposit</el-button>
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
    getAvailableMoney,
    depositMoney,
    changePassword, walletRegister, withDrawMoney
  }
    from '@/network/wallet'

  export default {
    name: "bvo-available-money",
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
      const validateOldPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Old password can not be empty'))
        } else {
          callback()
        }
      }
      const validateNewPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('New password can not be empty'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The password can not be empty'))
        } else {
          callback()
        }
      }
      const validateFlow = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The value you want to deposit can not be empty'))
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
        changePasswordVisible: false,
        form: {
          accountName:'',
          flow: '',
          password:'',
          oldPassword: '',
          newPassword: ''
        },
        formRules: {
          flow: [{
            required: true,
            trigger: 'blur',
            validator: validateFlow
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }],
          oldPassword: [{
            required: true,
            trigger: 'blur',
            validator: validateOldPassword
          }],
          newPassword: [{
            required: true,
            trigger: 'blur',
            validator: validateNewPassword
          }],
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
        this.changePasswordVisible = false;
        this.form.flow = '';
        this.form.password = '';
        this.form.oldPassword = '';
        this.form.newPassword = ''
        this.$refs.form.resetFields();
      },

      onConfirm(){
        return new Promise((resolve, reject) => {
          changePassword({
            accountName:this.form.accountName,
            oldPassword:this.form.oldPassword,
            newPassword:this.form.newPassword
          }).then(response => {
            console.log('bvo-available-money onConfirm() changePasssword code is ');
            console.log(response.code);
            this.closeDialog();
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      depositClick(){
        this.dialogFormVisible = true;
      },
      onDeposit(){
        this.$refs.form.validate(valid => {
          console.log('valid:'+valid);
          if (valid) {
            return new Promise((resolve, reject) => {
              depositMoney({
                accountName: this.form.accountName,
                flow: this.form.flow,
                password: this.form.password
              }).then(response => {
                console.log('bvo-available-money onDeposit() changePasssword code is ');
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
          path: '/bvo/bvoTransactionRecord'
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
