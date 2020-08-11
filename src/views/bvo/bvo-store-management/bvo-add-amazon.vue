<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="Store Name:" prop="name">
        <el-col :span="8">
          <el-input v-model="ruleForm.name" placeholder="Please enter the name" :value="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Seller ID: " prop="sid">
        <el-col :span="8">
          <el-input v-model="ruleForm.sid" placeholder="Please enter the id" :value="ruleForm.sid"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Marketplace ID: " prop="mid">
        <el-col :span="8">
          <el-input v-model="ruleForm.mid" placeholder="Please enter the id" :value="ruleForm.mid"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="MWS Auth Token: " prop="token">
        <el-col :span="8">
          <el-input v-model="ruleForm.token" placeholder="Please enter the token" :value="ruleForm.token"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Add</el-button>
        <el-button @click="cancel('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import{
    addStore
  } from '@/network/bvo/bvo-store.js'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          sid: '',
          mid: '',
          token: '',
        },
        rules: {
          name: [{
            required: true,
            message: 'Please enter the name',
            trigger: 'blur'
          }],
          sid: [{
            required: true,
            message: 'Please enter the seller ID',
            trigger: 'blur'
          }],
          mid: [{
            required: true,
            message: 'Please enter the marketplace ID',
            trigger: 'blur'
          }],
          token: [{
            required: true,
            message: 'Please enter the token',
            trigger: 'blur'
          }],
        },
        addStore: {
          storeName: '',
          dsrId: '',
          strId: '',
          storeStsCd: '',
          platformType: '1',
          createdBy: '',
          creationDate: '',
          lastUpdateBy: '',
          lastUpdateDate: '',
          callCnt: '',
          remark: '',
          stsCd: ''
        }
      };
    },
    methods: {
      addAmazon(){
        this.readForm();
        return new Promise((resolve, reject) => {
          addStore(this.addStore).then(response => {
            this.$message.info("Add Successfully!")
            resolve();
          }).catch(error => {
            reject(error);
          })
        })
      },
      readForm(){
        this.addStore.storeName = this.ruleForm.name;
        this.addStore.dsrId = this.ruleForm.sid;
        this.addStore.strId = this.ruleForm.mid;
        this.addStore.storeStsCd = this.ruleForm.token;
        this.addStore.createdBy = this.$store.getters.userName;
        this.addStore.lastUpdateBy = this.$store.getters.userName;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addAmazon();
            alert('submit!');
            this.$router.push({
              path: '/bvo/storeManagement'
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      cancel(formName) {
        this.$router.push({
          path: '/bvo/storeManagement'
        });
      }
    }
  }
</script>
