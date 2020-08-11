<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-table ref="roleTable" v-loading="tableLoading" :data="roleInfos" border fit highlight-current-row style="width: 100%;"
          row-key="id">
          <el-table-column label="Number" align="center" type="index" width="200">
          </el-table-column>
          <el-table-column label="Role" width="300" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Description" width="300" align="center">
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Operation" align="center" class-name="small-padding fixed-width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="getMenus(row)">
                Authorization
              </el-button>
              <el-button type="primary" size="mini" @click="getRoleInfoWhenUpdate(row)">
                Edit
              </el-button>
              <el-button size="mini" type="danger" @click="deleteRoleInfo(row,$index)">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-button class="pan-btn light-blue-btn" type="text" @click="getAllMenuWhenAdd()">Add</el-button>
    </el-card>

    <el-dialog title="Show Menus" :visible.sync="ifShowOpenDialog" width="50%" center top="5vh" destroy-on-close>
      <el-table :data="roleMenus" height="65vh" border style="width: 100%;" row-key="id" v-loading="menuTableLoading">
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
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ifShowOpenDialog = false">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Add Role" :visible.sync="ifAddOpenDialog" width="50%" center top="5vh" destroy-on-close @closed="closeDialog()">
      <el-form ref="addForm" :model="roleInfo" label-width="90px" :rules="roleRule" label-position="left">
        <el-form-item label="Role" prop="name">
          <el-input v-model="roleInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="roleInfo.description"></el-input>
        </el-form-item>

        <el-transfer style="text-align: left; display: inline-block" v-model="choosedMenu" filterable :titles="['All', 'Selected']"
          :button-texts="['', '']" :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
          :data="allMenus">
          <!-- @change="handleChange" -->
          <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
        </el-transfer>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifAddOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addRoleInfo()">Save</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Modify Role" :visible.sync="ifModifyOpenDialog" width="50%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="modifyForm" :model="roleInfo" label-width="90px" :rules="roleRule" label-position="left">
        <el-form-item label="Role" prop="name">
          <el-input v-model="roleInfo.name"></el-input>
        </el-form-item>

        <el-form-item label="Description">
          <el-input v-model="roleInfo.description"></el-input>
        </el-form-item>

        <el-transfer v-loading="updateMenuLoading" style="text-align: left; display: inline-block" v-model="choosedMenu"
          :right-default-checked="[10,11]" filterable :titles="['All', 'Selected']" :button-texts="['', '']" :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
          :data="allMenus">
          <!-- @change="handleChange" -->
          <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
        </el-transfer>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifModifyOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="updateRoleInfo()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAllRole,
    getPermissionMenuList,
    addRole,
    deleteRole,
    getMenuWhenUpdateRole,
    updateRole,
  } from '@/network/admin/admin-role.js'

  import {
    getAllMenu
  } from '@/network/admin/admin-menu.js'

  export default {
    name: "admin-code",
    data() {
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
      return {
        roleType: "",
        // Table变量
        tableKey: 0,
        roleInfos: [{
          roleId: "",
          roleName: "",
        }],
        roleMenus: [],
        tableLoading: true,
        menuTableLoading: true,
        // 分页控件变量
        pageSize: 8,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifShowOpenDialog: false,
        ifAddOpenDialog: false,
        ifModifyOpenDialog: false,
        updateMenuLoading: false,

        allMenus: [],
        choosedMenu: [],
        choosedMenuUpdate: [],
        // 添加新商品
        roleInfo: {
          id: "",
          name: "",
          description: ""
        },
        roleRule: {
          name: [{
            required: true,
            message: 'Please input name',
            trigger: 'blur'
          }]
        }
      }
    },
    created() {
      this.getAllRoleInfo();
    },
    methods: {
      getAllRoleInfo() {
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllRole().then(response => {
            this.roleInfos = response.data
            resolve()
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      addRoleInfo() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            var addRoleVO = {
              roleName: this.roleInfo.name,
              description: this.roleInfo.description,
              menus: this.choosedMenu
            }

            return new Promise((resolve, reject) => {
              addRole(addRoleVO).then(response => {
                this.$message.info("Add Role Successfully!")
                this.ifAddOpenDialog = false
                this.getAllRoleInfo()
                resolve()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      getMenus(row) {
        this.ifShowOpenDialog = true
        this.menuTableLoading = true
        return new Promise((resolve, reject) => {
          getPermissionMenuList({
            roleId: row.id
          }).then(response => {
            this.roleMenus = response.data
            this.menuTableLoading = false
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      getAllMenuWhenAdd() {
        this.ifAddOpenDialog = true
        return new Promise((resolve, reject) => {
          getAllMenu().then(response => {
            var allMenusRaw = new Array()
            for (let i = 0; i < response.data.length; i++) {
              let father = {
                key: response.data[i].id,
                label: response.data[i].name,
                disabled: false
              }
              allMenusRaw.push(father)
              let children = response.data[i].children
              for (let j = 0; j < children.length; j++) {
                let child = {
                  key: children[j].id,
                  label: children[j].name,
                  disabled: false
                }
                allMenusRaw.push(child)
              }
            }
            this.allMenus = allMenusRaw
            resolve()
            console.log(this.allMenus)
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      getRoleInfoWhenUpdate(row) {
        this.roleInfo.id = row.id
        this.roleInfo.name = row.name
        this.roleInfo.description = row.description
        this.ifModifyOpenDialog = true
        this.updateMenuLoading = true
        return new Promise((resolve, reject) => {
          getAllMenu().then(response => {
            var allMenusRaw = new Array()
            for (let i = 0; i < response.data.length; i++) {
              let father = {
                key: response.data[i].id,
                label: response.data[i].name,
                disabled: false
              }
              allMenusRaw.push(father)
              let children = response.data[i].children
              for (let j = 0; j < children.length; j++) {
                let child = {
                  key: children[j].id,
                  label: children[j].name,
                  disabled: false
                }
                allMenusRaw.push(child)
              }
            }
            this.allMenus = allMenusRaw
            return new Promise((resolve, reject) => {
              getMenuWhenUpdateRole({
                roleId: row.id
              }).then(response => {
                this.choosedMenu = response.data
                this.updateMenuLoading = false
                resolve()
              }).catch(error => {
                reject(error);
              })
            })
            resolve()
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      updateRoleInfo() {
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            var updateRoleVO = {
              roleId: this.roleInfo.id,
              roleName: this.roleInfo.name,
              description: this.roleInfo.description,
              menus: this.choosedMenu
            }
            console.log(this.choosedMenu)
            return new Promise((resolve, reject) => {
              updateRole(updateRoleVO).then(response => {
                this.$message.info("Modify Role Successfully!")
                this.ifModifyOpenDialog = false;
                resolve()
                this.getAllRoleInfo()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      deleteRoleInfo(row, index) {
        return new Promise((resolve, reject) => {
          deleteRole({
            roleId: row.id
          }).then(response => {
            resolve()
            this.getAllRoleInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      closeDialog() {
        this.roleInfo = {
          id: "",
          name: "",
          description: ""
        }
        this.choosedMenu = []
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
