<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span style="margin-right: 10px;">参数类型</span>
        <el-input v-model="parCd" placeholder="Please input Par title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchParByCd()">查找</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="openAddDialog()">添加</el-button>
        <el-button class="pan-btn pink-btn" type="text" @click="batchDeletePar()">删除</el-button>
      </div>

      <el-table ref="parTable" v-loading="tableLoading" :data="parInfos" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="参数主键" align="center">
          <template slot-scope="{row}">
            <span>{{ row.parCd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参数值" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.parValue }}</span>
          </template>
        </el-table-column>
        <el-table-column label="参数说明" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getParInfoWhenUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="deleteParInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllParInfo()">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="parInfo" label-width="140px" :rules="parRule">
        <el-form-item label="参数主键" prop="parCd">
          <el-input v-model="parInfo.parCd"></el-input>
        </el-form-item>

        <el-form-item label="参数值" prop="parValue">
          <el-input v-model="parInfo.parValue"></el-input>
        </el-form-item>

        <el-form-item label="参数说明" prop="description">
          <el-input v-model="parInfo.description"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Parameter' ? addParInfo() : updateParInfo()">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllPar,
    searchPar,
    addPar,
    deletePar,
    getParWhenUpdate,
    updatePar,
    batchDeletePar
  } from '@/network/admin/admin-parameter.js'

  export default {
    name: "admin-parameter",
    data() {
      return {
        parCd: "",
        // Table变量
        tableKey: 0,
        parInfos: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 8,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Parameter",
        // 添加新商品
        parInfo: {
          parId: "",
          parCd: "",
          parValue: "",
          description: "",
          userId: ""
        },
        parRule: {
          parCd: [{
            required: true,
            message: 'Please input parameter',
            trigger: 'blur'
          }],
          parValue: [{
            required: true,
            message: 'Please input value',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getAllParInfo();
    },
    methods: {
      getAllParInfo() {
        var getAllParVO = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllPar(getAllParVO).then(response => {
            this.parInfos = response.data.list
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
      searchParByCd() {
        var searchParVO = {
          parCd: this.parCd,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchPar(searchParVO).then(response => {
            this.parInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            this.tableLoading = false
          }).catch(error => {
            this.parInfos = []
            reject(error);
            this.tableLoading = false
          })
        })
      },
      addParInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.parInfo.userId = this.$store.getters.userName
            return new Promise((resolve, reject) => {
              addPar(this.parInfo).then(response => {
                this.$message.success("Add Par Successfully!")
                this.ifOpenDialog = false;
                this.getAllParInfo()
                resolve()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })

      },
      getParInfoWhenUpdate(row) {
        this.dialogFunction = "Modify Parameter"
        this.ifOpenDialog = true
        return new Promise((resolve, reject) => {
          getParWhenUpdate({
            parId: row.parId
          }).then(response => {
            this.parInfo.parId = row.parId
            this.parInfo.parCd = response.data.parCd
            this.parInfo.parValue = response.data.parValue
            this.parInfo.description = response.data.description
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateParInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.parInfo.userId = this.$store.getters.userName
            return new Promise((resolve, reject) => {
              updatePar(this.parInfo).then(response => {
                this.$message.success("Modify Par Successfully!")
                this.ifOpenDialog = false;
                resolve()
                this.getAllParInfo()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      deleteParInfo(row, index) {
        return new Promise((resolve, reject) => {
          deletePar({
            parId: row.parId
          }).then(response => {
            resolve()
            this.getAllParInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeletePar() {
        var data = this.$refs.parTable.selection;
        console.log(data)
        if (data.length == 0) {
          this.$message.warning("Please choose parameters")
        } else {
          var parIds = []
          for (var i = 0; i < data.length; i++) {
            parIds[i] = data[i].parId
          }
          return new Promise((resolve, reject) => {
            batchDeletePar(parIds).then(response => {
              resolve()
              this.getAllParInfo()
            }).catch(error => {
              reject(error);
            })
          })
        }
      },
      openAddDialog() {
        this.dialogFunction = "Add Parameter"
        this.ifOpenDialog = true
      },
      closeDialog() {
        this.parInfo = {
          parId: "",
          parCd: "",
          parValue: "",
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
