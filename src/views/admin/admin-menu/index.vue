<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-table ref="menuTable" v-loading="tableLoading" :data="menuInfos" border fit highlight-current-row style="width: 100%;"
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="id">
          <el-table-column label="Icon" align="center">
            <template slot-scope="{row}">
              <svg-icon :icon-class="row.icon" />
            </template>
          </el-table-column>
          <el-table-column label="Name" align="center">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Route Name" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="Sort" align="center">
            <template slot-scope="{row}">
              <span>{{ row.sort }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="danger" @click="deleteMenuInfo(row,$index)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button class="pan-btn light-blue-btn" type="text" @click="ifOpenDialog = true">Add</el-button>
    </el-card>

    <el-dialog title="Add Menu" :visible.sync="ifOpenDialog" width="50%" center top="5vh" destroy-on-close @closed="closeDialog()">
      <el-form ref="form" :model="menuInfo" label-width="110px" :rules="menuRole">
        <el-form-item label="Name" prop="title">
          <el-input v-model="menuInfo.title"></el-input>
        </el-form-item>

        <el-form-item label="Icon" prop="icon">
          <el-select v-model="menuInfo.icon" placeholder="Please choose icon" style="width: 100%;">
            <svg-icon slot="prefix" :icon-class="menuInfo.icon" />
            <el-option v-for="icon in icons" :key="this" :label="icon" :value="icon">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Route Name" prop="name">
          <el-input v-model="menuInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="Sort" prop="sort">
          <el-input v-model="menuInfo.sort"></el-input>
        </el-form-item>

        <el-form-item label="If Father">
          <el-switch v-model="ifFatherMenu"></el-switch>
        </el-form-item>

        <el-form-item label="Select Father">

          <el-select v-model="menuInfo.parentId" placeholder="Please select father menu" :disabled="ifFatherMenu" style="width: 100%;">
            <el-option v-for="father in menuInfos" :key="father.id" :label="father.title" :value="father.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addMenuInfo()">Save</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    getAllMenu,
    addMenu,
    deleteMenu,
  } from '@/network/admin/admin-menu.js'

  export default {
    name: "admin-menu",
    data() {
      return {
        menuType: "",
        // Table变量
        tableKey: 0,
        ifFatherMenu: false,
        menuInfos: [],
        tableLoading: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Code",
        // 添加新商品
        menuInfo: {
          title: "",
          name: "",
          icon: "",
          level: "",
          sort: "",
          parentId: "",
          hidden: "",
        },
        icons: [
          "excel",
          "peoples",
          "people",
          "documentation",
          "drag",
          "edit"
        ],
        menuRole: {
          title: [{
            required: true,
            message: 'Please input title',
            trigger: 'blur'
          }],
          icon: [{
            required: true,
            message: 'Please select icon',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: 'Please input name',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: 'Please input sort number',
            trigger: 'blur'
          }],
        }
      }
    },
    created() {
      this.getAllMenuInfo();
    },
    methods: {
      getAllMenuInfo() {
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllMenu().then(response => {
            this.menuInfos = response.data
            resolve()
            console.log(response.data)
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      addMenuInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            console.log(this.menuInfo)
            return new Promise((resolve, reject) => {
              addMenu(this.menuInfo).then(response => {
                this.$message.success("Add menu Successfully!")
                this.ifOpenDialog = false;
                this.getAllMenuInfo()
                resolve()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })

      },
      deleteMenuInfo(row, index) {
        return new Promise((resolve, reject) => {
          deleteMenu({
            menuId: row.id
          }).then(response => {
            resolve()
            this.getAllMenuInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      closeDialog() {
        this.menuInfo = {
          title: "",
          name: "",
          icon: "",
          level: "",
          sort: "",
          parentId: "",
          hidden: "",
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
