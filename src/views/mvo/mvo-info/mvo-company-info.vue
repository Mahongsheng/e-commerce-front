<template>
  <div style="margin: 40px; white-space:nowrap;">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
      <el-form-item label="Company Name (CN)" prop="companyNameCN">
        <el-col :span="8">
          <el-input v-model="ruleForm.companyNameCN" placeholder="Please enter the Chinese name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Company Name (EN)" prop="companyNameEN">
        <el-col :span="8">
          <el-input v-model="ruleForm.companyNameEN" placeholder="Please enter the English name"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="Brief Introduction" prop="intro" style="margin-bottom: 30px;">
        <Tinymce ref="editor" v-model="ruleForm.intro" :height="400" />
      </el-form-item>

      <el-form-item label="GMC Report Type" prop="type">
        <el-col :span="8">
          <el-input v-model="ruleForm.type" placeholder="Please enter the type"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="GRC Report URL" prop="url">
        <el-col :span="8">
          <el-input v-model="ruleForm.url" placeholder="Please enter the URL"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">Save</el-button>
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button type="info" @click="cancel('ruleForm')">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import {
    getCompany,
    initCompany,
    updateCompany
  } from '@/network/mvo/mvo-man-info.js'

  export default {
    components: {
      Tinymce
    },
    data() {
      return {
        ruleForm: {
          companyNameCN: '',
          companyNameEN: '',
          intro: '',
          type: '',
          url: '',
        },
        rules: {
          companyNameCN: [{
            required: true,
            message: 'Please enter the Chinese name',
            trigger: 'blur'
          }],
          companyNameEN: [{
            required: true,
            message: 'Please enter the English name',
            trigger: 'blur'
          }],
          intro: [{
            required: true,
            message: 'Please enter the Introduction',
            trigger: 'blur'
          }],
          type: [{
            required: true,
            message: 'Please enter the GMC Report Type',
            trigger: 'blur'
          }],
          url: [{
            required: true,
            message: 'Please enter the GMC Report URL',
            trigger: 'blur'
          }]
        },
        companyInfo: {
          manId: '',
          nameEn: '',
          nameCn: '',
          gmcReportType: '',
          gmcReportUrl: '',
          createdBy: '',
          creationDate: '',
          lastUpdateBy: '',
          lastUpdateDate: '',
          callCnt: '',
          remark: '',
          stsCd: '',
          description: ''
        }
      };
    },
    methods: {
      getCompany() {
        var getCompanyVO = {
          manId: this.$store.getters.manId
        }
        return new Promise((resolve, reject) => {
          getCompany(getCompanyVO).then(response => {
            this.ruleForm.companyNameCN = response.data.nameCn;
            this.ruleForm.companyNameEN = response.data.nameEn;
            var intro = response.data.description;
            console.log(response.data.description);
            this.$refs.editor.setContent(intro);
            console.log(this.$refs.editor.getContent());
            this.ruleForm.type = response.data.gmcReportType;
            this.ruleForm.url = response.data.gmcReportUrl;
            resolve();
            // location.reload();
          }).catch(error => {
            reject(error);
          })
        })
      },
      readComanyInfo() {
        this.companyInfo.nameCn = this.ruleForm.companyNameCN;
        this.companyInfo.nameEn = this.ruleForm.companyNameEN;
        this.companyInfo.description = this.$refs.editor.getContent();
        console.log(this.companyInfo.description);
        this.companyInfo.gmcReportType = this.ruleForm.type;
        this.companyInfo.gmcReportUrl = this.ruleForm.url;
        this.companyInfo.manId = this.$store.getters.manId;
        this.companyInfo.createdBy = this.$store.getters.userName;
        this.companyInfo.lastUpdateBy = this.$store.getters.userName;
      },
      updateCompany() {
        this.readComanyInfo();
        return new Promise((resolve, reject) => {
          updateCompany(this.companyInfo).then(response => {
            console.log(response);
            this.$message.info("Operate Successfully!")
            resolve()
            this.getAllProductInfo();
            this.clearInfo();
            this.$router.push({
              path: '/mvo/mvoMyInfo'
            });
          }).catch(error => {
            reject(error);
          })
        })
      },
      clearInfo(){
        this.companyInfo = {
          manId: '',
          nameEn: '',
          nameCn: '',
          gmcReportType: '',
          gmcReportUrl: '',
          createdBy: '',
          creationDate: '',
          lastUpdateBy: '',
          lastUpdateDate: '',
          callCnt: '',
          remark: '',
          stsCd: '',
          description: ''
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateCompany();
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      cancel(formName) {
        this.clearInfo();
        this.$router.push({
          path: '/mvo/mvoMyInfo'
        });
      }
    },
    mounted() {
      this.getCompany();
    }
  }
</script>
