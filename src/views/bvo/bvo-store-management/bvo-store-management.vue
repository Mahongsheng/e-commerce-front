<template>
  <div style="margin: 60px; white-space:nowrap;">

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">

      <h2>My Stores</h2>

      <el-table :data="amazonData" style="width: 100%; margin-bottom: 30px" :header-cell-style="{color: '#0f81ff'}">
        <el-table-column prop="name" label="Amazon">
        </el-table-column>
      </el-table>

      <el-table :data="ebayData" style="width: 100%" :header-cell-style="{color: '#0f81ff'}">
        <el-table-column prop="name" label="Ebay">
        </el-table-column>
      </el-table>

      <el-form-item style="margin-top: 30px;">
        <el-button type="primary" @click="toChoose('ruleForm')">Add New Store</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import{
    getStores
  } from '@/network/bvo/bvo-store.js'
  export default {
    data() {
      return {
        amazonData: [],
        ebayData: [],
        pageSize: 10,
        pageNum: 1
      }
    },
    methods: {
      getStores(){
        var getStoreVO = {
          dsrId: this.$store.getters.dsrId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        return new Promise((resolve, reject) => {
          getStores(getStoreVO).then(response => {
            var list = response.data.list;
            for(let i in response.data.list){
              if(list[i].platformType=="1"){
                this.amazonData.push({name:list[i].storeName});
              } else if(list[i].platformType=="2"){
                this.ebayData.push({name:list[i].storeName});
              }
            }
            resolve()
            console.log(response.data)
            console.log(response.data.list)
          }).catch(error => {
            reject(error);
          })
        })
      },
      toChoose(formName) {
        this.$router.push({
          path: '/bvo/bvoChoose'
        });
      }
    },
    mounted() {
      this.getStores();
    }
  }
</script>
