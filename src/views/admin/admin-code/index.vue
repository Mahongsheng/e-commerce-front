<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span style="margin-right: 10px;">字典类型</span>
        <el-input v-model="cdmType" placeholder="Please input Cdm Type" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchCdmByType()">查找</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="openAddDialog()">添加</el-button>
        <el-button class="pan-btn pink-btn" type="text" @click="batchDeleteCdm()">删除</el-button>
      </div>

      <el-table ref="cdmTable" v-loading="tableLoading" :data="cdmInfos" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="字典类型" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cdmType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用途描述" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="编码" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cdmCd }}</span>
          </template>
        </el-table-column>

        <el-table-column label="编码值" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.cdmValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getCdmInfoWhenUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="deleteCdmInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllCdmInfo()">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="cdmInfo" label-width="100px" :rules="codeRule">
        <el-form-item label="字典类型" prop="cdmType">
          <el-input v-model="cdmInfo.cdmType"></el-input>
        </el-form-item>

        <el-form-item label="用途描述" prop="description">
          <el-input v-model="cdmInfo.description"></el-input>
        </el-form-item>

        <el-form-item label="编码" prop="cdmCd">
          <el-input v-model="cdmInfo.cdmCd"></el-input>
        </el-form-item>

        <el-form-item label="编码值" prop="cdmValue">
          <el-input v-model="cdmInfo.cdmValue"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Code' ? addCdmInfo() : updateCdmInfo()">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllCdm,
    searchCdm,
    addCdm,
    deleteCdm,
    getCdmWhenUpdate,
    updateCdm,
    batchDeleteCdm
  } from '@/network/admin/admin-code.js'

  export default {
    name: "admin-code",
    data() {
      return {
        cdmType: "",
        // Table变量
        tableKey: 0,
        cdmInfos: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 8,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Code",
        // 添加新商品
        cdmInfo: {
          cdmId: "",
          cdmType: "",
          cdmCd: "",
          description: "",
          cdmValue: "",
          userId: ""
        },
        codeRule: {
          cdmType: [{
            required: true,
            message: 'Please input type',
            trigger: 'blur'
          }],
          cdmCd: [{
            required: true,
            message: 'Please input code',
            trigger: 'blur'
          }],
          cdmValue: [{
            required: true,
            message: 'Please input value',
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.getAllCdmInfo();
    },
    methods: {
      getAllCdmInfo() {
        var getAllCdmVO = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllCdm(getAllCdmVO).then(response => {
            this.cdmInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      searchCdmByType() {
        var searchCdmVO = {
          cdmType: this.cdmType,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchCdm(searchCdmVO).then(response => {
            this.cdmInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            this.tableLoading = false
          }).catch(error => {
            this.cdmInfos = []
            reject(error);
            this.tableLoading = false
          })
        })
      },
      addCdmInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.cdmInfo.userId = this.$store.getters.userName
            return new Promise((resolve, reject) => {
              addCdm(this.cdmInfo).then(response => {
                this.$message.success("Add Cdm Successfully!")
                this.ifOpenDialog = false;
                this.getAllCdmInfo()
                resolve()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      getCdmInfoWhenUpdate(row) {
        this.dialogFunction = "Modify Code"
        this.ifOpenDialog = true
        return new Promise((resolve, reject) => {
          getCdmWhenUpdate({
            cdmId: row.cdmId
          }).then(response => {
            this.cdmInfo.cdmId = row.cdmId
            this.cdmInfo.cdmCd = response.data.cdmCd
            this.cdmInfo.cdmType = response.data.cdmType
            this.cdmInfo.cdmValue = response.data.cdmValue
            this.cdmInfo.description = response.data.description
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateCdmInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.cdmInfo.userId = this.$store.getters.userName
            return new Promise((resolve, reject) => {
              updateCdm(this.cdmInfo).then(response => {
                this.$message.success("Modify Cdm Successfully!")
                this.ifOpenDialog = false;
                resolve()
                this.getAllCdmInfo()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      deleteCdmInfo(row, index) {
        return new Promise((resolve, reject) => {
          deleteCdm({
            cdmId: row.cdmId
          }).then(response => {
            resolve()
            this.getAllCdmInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeleteCdm() {
        var data = this.$refs.cdmTable.selection;
        console.log(data)
        if (data.length == 0) {
          this.$message.warning("Please choose codes")
        } else {
          var cdmIds = []
          for (var i = 0; i < data.length; i++) {
            cdmIds[i] = data[i].cdmId
          }
          return new Promise((resolve, reject) => {
            batchDeleteCdm(cdmIds).then(response => {
              resolve()
              this.getAllCdmInfo()
            }).catch(error => {
              reject(error);
            })
          })
        }
      },
      openAddDialog() {
        this.dialogFunction = "Add Code"
        this.ifOpenDialog = true
      },
      closeDialog() {
        this.cdmInfo = {
          cdmId: "",
          cdmType: "",
          cdmCd: "",
          cdmValue: "",
          description: "",
          userId: ""
        }
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

  .box-card {
    border-bottom: none;
  }

  .el-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .el-form-item {
    width: 40vw;
  }
</style>
