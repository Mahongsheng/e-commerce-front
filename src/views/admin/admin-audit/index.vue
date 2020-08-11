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
          <el-table-column label="账户名" align="center" >
            <template slot-scope="scope">
              {{ scope.row.accountName }}
            </template>
          </el-table-column>
          <el-table-column label="业务类型" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.transactionType == 1">充值</span>
              <span v-if="scope.row.transactionType == 2">提现</span>
              <span v-if="scope.row.transactionType == 3">消费</span>
              <span v-if="scope.row.transactionType == 4">退款</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" align="center">
            <template slot-scope="scope">
              {{ scope.row.availableMoney }}
            </template>
          </el-table-column>
          <el-table-column label="申请时间" align="center">
            <template slot-scope="scope">
              {{ scope.row.createTime }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">失败</span>
              <span v-if="scope.row.status == 2">处理中</span>
              <span v-if="scope.row.status == 4">已完成</span>
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="withdrawClick(scope.row.transactionNumber)" >audit</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-container">
          <el-pagination
            background
            align="center"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="currentPage"
            :page-size="5"
            @current-change="getPageData()"
          >
          </el-pagination>
        </div>
      </div>
      <div class="dialog-container">
      <el-dialog :visible.sync="dialogFormVisible" title="审核">
        <el-form ref="form" :model="form" label-width="180px" :rules="auditFormRules">
          <el-form-item label="审核结果：" prop="resource">
            <el-radio-group v-model="form.resource">
              <el-radio label="通过"></el-radio>
              <el-radio label="不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="如不通过，请填写原因：" prop="note">
            <el-input type="textarea" v-model="form.note"></el-input>
          </el-form-item>
          <el-form-item label="上传水单：">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSave">保存</el-button>
            <el-button @click="closeDialog">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    </div>
  </div>
</template>

<script>

  import
  {
    audit,
    getAdminFlow, walletRegister, withDrawMoney
  }
    from '@/network/wallet'

  export default {
    name: "admin-code",
    inject: ["reload"],
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
      const validateResource = (rule, value, callback) => {
        if (!value) {
          callback(new Error('You must choose one'))
        } else {
          callback()
        }
      }
      const validateNote = (rule, value, callback) => {
        if (!value) {
          callback(new Error('The note can not be empty'))
        } else {
          callback()
        }
      }
      return {
        list: null,
        listLoading: true,
        dialogFormVisible: false,

        dialogImageUrl: '',
        dialogVisible: false,

        total: 0,
        currentPage: 1,

        form: {
          transactionNumber: '',
          resource: '',
          note:''
        },
        auditFormRules: {
          resource: [{
            required: true,
            trigger: 'blur',
            validator: validateResource
          }],
          note: [{
            required: true,
            trigger: 'blur',
            validator: validateNote
          }],
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        this.getPageData()
      },
      getPageData(){
        return new Promise((resolve, reject) => {
          getAdminFlow({
            pageNum: this.currentPage,
            pageSize: 5
          }).then(response => {
            this.list = response.data.list;
            this.total = response.data.total;
            this.listLoading = false
          }).catch(error => {
            console.log(error);
            reject(error);
          })
        })
      },
      closeDialog(){
        this.dialogFormVisible = false;
        this.form.resource = '';
        this.form.note = '';
      },
      withdrawClick(number){
        console.log(number);
        this.form.transactionNumber = number
        this.dialogFormVisible = true;
      },
      onSave(){
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true;
            return new Promise((resolve, reject) => {
              audit({
                note: this.form.note,
                status: this.form.resource=="通过",
                transactionNumber: this.form.transactionNumber
              }).then(response => {
                this.closeDialog();
                this.reload();
              }).catch(error => {
                console.log(error);
                this.closeDialog();
                reject(error);
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })


      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>
  .table-container{
    padding: 3vh;
  }
  .availableMoney-container{
    padding-bottom: 3vh;
  }
  .page-container{
    padding:3vh
  }
</style>
