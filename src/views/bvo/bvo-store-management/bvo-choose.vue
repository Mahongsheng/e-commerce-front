<template>
  <div style="width:80%; margin:60px; white-space:nowrap; text-align:center;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
      <el-form-item style="margin-bottom: 60px;">
        <span>Set up API connection with your store by account authorisation</span>
      </el-form-item>

      <el-form-item style="margin-bottom: 60px;">
          <el-button round style="width:200px; height:50px;" type="primary" @click="toAmazon('ruleForm')">Amazon</el-button>
      </el-form-item>

      <el-form-item>
          <el-button round style="width:200px; height:50px;" type="primary" @click="toEbay('ruleForm')">Ebay</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      toAmazon(formName) {
        this.$router.push({
          path: '/bvo/bvoAddAmazon'
        });
      },
      toEbay(formName) {
        this.$router.push({
          path: '/bvo/bvoAddEbay'
        });
      }
    }
  }
</script>
