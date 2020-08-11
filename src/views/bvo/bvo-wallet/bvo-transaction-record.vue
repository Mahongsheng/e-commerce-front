<template>
  <div class="balance-container">
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
      >
        <el-table-column label="Transaction Number" align="center" >
          <template slot-scope="scope">
            {{ scope.row.transactionNumber }}
          </template>
        </el-table-column>
        <el-table-column label="Available Money" align="center">
          <template slot-scope="scope">
            {{ scope.row.transactionMoney }}
          </template>
        </el-table-column>
        <el-table-column label="Create Time" align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="Status" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">失败</span>
            <span v-if="scope.row.status == 2">处理中</span>
            <span v-if="scope.row.status == 4">已完成</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {depositMoney, getTransactionRecord} from '@/network/wallet'

  export default {
    name: 'bvo-transaction-record',
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
      return {
        list: null,
        listLoading: true
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
        this.listLoading = true
        return new Promise((resolve, reject) => {
          getTransactionRecord(
            {
              accountName: this.getAccountName
            }
          ).then(response => {
            this.list = response.data
            console.log(this.list)
            this.listLoading = false
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      }
    }
  }
</script>

<style scoped>
  .table-container{
    padding: 3vh;
  }
  .balance-container{
    padding-bottom: 3vh;
  }
</style>
