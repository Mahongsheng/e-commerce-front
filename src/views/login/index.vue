<template>
  <div>
    <div class="background">
      <img :src="imgSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
        label-position="left">

        <div class="title-container">
          <h1 class="title">Cross-border E-commerce </h1>
          <h1 class="title">Borrow-sell Platform</h1>
        </div>
        <br>

        <div class="title-container">
          <h5 style="color: #fff; margin:0 5px 10px 5px;">Login With Your Account</h5>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
            tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password"
            name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>

        <el-row>
          <el-col :span="18">
            <el-form-item prop="validateCode">
              <span class="svg-container" style="margin-left: 15px;">
                <svg-icon icon-class="validatecode" />
              </span>
              <el-input key="text" ref="validateCode" v-model="loginForm.code" type="text" placeholder="Please Input Code"
                name="validateCode" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <img :src="codeImage" @click="generateValidateCode()" style="margin-left: 5px;" />
          </el-col>
        </el-row>


        <el-button :loading="loading" type="primary" style="width:40%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

        <div class="tips">
          <span style="margin-right:20px;">BVO</span>
          <span style="margin-right:20px;"> MVO</span>
          <span> ADMIN</span>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    validUsername
  } from '@/utils/validate'

  import {
    generateValidateCode
  } from '@/api/user'

  import axios from 'axios'
  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        imgSrc: require('@/assets/bg_images/bg1.jpg'),
        tokenId: '',
        codeImage: '',
        loginForm: {
          username: 'admin',
          password: 'string',
          tokenId:'',
          code: '',
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    created() {
      this.generateValidateCode()
    },
    methods: {
      generateValidateCode() {
        axios.get("http://localhost:9010/log/generateValidateCode").then(response => {
          this.loginForm.tokenId = response.data.tokenId
          this.codeImage = response.data.img
        })
      },
      hhahah() {
        axios.get("http://localhost:9010/user/refreshToken", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdHJpbmciLCJjcmVhdGVkIjoxNTk0ODE3NzM0MTUzLCJleHAiOjE1OTU0MjI1MzR9._A401STtXdNqyfOum7yp1fI4G5FNIDJztMCTM5U6qtNJPjWMiC2QOixN6kT6-lQk8ywsqyDinAOipLmWtQxUKQ"
          }
        }).then(response => {
          console.log(response)
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
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({
                path: this.redirect || '/'
              })
              this.loading = false
            }).catch(() => {
              this.generateValidateCode()
              this.loading = false
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
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

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
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 100px rgb(121, 175, 212) inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#000000;
  $light_gray:#eee;

  .background {
    width: 100%;
    height: 100%;
    /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
  }

  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 18vh 35px 0;
      margin: 0 auto;
      overflow: hidden;
      text-align: center;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 30px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
