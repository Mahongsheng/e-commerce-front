<template>
  <div>
    <div class="login-container" v-if="showWallet">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <el-form-item prop="accountName">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="accountName" v-model="loginForm.accountName" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password"
                    name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleRegister" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button
          class="pan-btn light-blue-btn"
          :loading="loading"
          type="primary"
          style="width:40%;margin-bottom:30px;"
          @click.native.prevent="handleRegister">register</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    walletRegister,
    getAvailableMoney
  } from '@/network/wallet'

  export default {
    name: "mvo-wallet",
    data(){
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          accountName: this.$store.getters.userName,
          password:''
        },
        loginRules: {
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
        showWallet: false
      }
    },
    created() {
      this.checkExist();
    },
    computed:{
      getAccountName(){
        return this.$store.getters.userName
      }
    },
    methods: {
      checkExist(){
        return new Promise((resolve, reject) => {
          getAvailableMoney({
            accountName: this.getAccountName
          }).then(response => {
            this.showWallet = false;
            this.$router.push({
              path: '/mvo/mvoAvailableMoney'
            });
          }).catch(error => {
            reject(error);
            this.showWallet = true;
          })
        })
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleRegister(){
        console.log('register')
        this.$store.commit('user/SET_ACCOUNTNAME',this.loginForm.accountName.trim())
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            return new Promise((resolve, reject) => {
              walletRegister({
                accountName: this.loginForm.accountName.trim(),
                password: this.loginForm.password
              }).then(response => {
                console.log('code');
                console.log(response.code)
                resolve()
                this.$router.push({
                  path: '/mvo/mvoAvailableMoney'
                });
                this.loading = false
              }).catch(error => {
                console.log(error);
                reject(error);
                this.loading = false
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss">

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  }
</style>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";

  .pan-btn {
    margin-left: 1vw;
    width: 130px;
  }
  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
      text-align:center;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
  }
</style>

