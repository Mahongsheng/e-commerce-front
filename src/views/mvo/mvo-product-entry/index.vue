<template>
  <div>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>Product Title：</span>
        <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchProductByTitle()">Search</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="openAddDialog()">Add</el-button>
        <el-button class="pan-btn pink-btn" type="text" @click="batchDeleteProductInfo()">Delete</el-button>
      </div>

      <el-table ref="productTable" v-loading="tableLoading" :data="productInfos" border fit highlight-current-row style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="Product Title" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Product Price" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.retailPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="War Number" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.warNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="sku" align="center">
          <template slot-scope="{row}">
            <span>{{ row.skuCd }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getProductInfoWhenUpdate(row)">
              Edit
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="deleteProductInfo(row,$index)">
              Delete
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllProductInfo()">
      </el-pagination>
    </el-card>

    <el-dialog :title="dialogFunction" :visible.sync="ifOpenDialog" width="75%" center top="5vh" destroy-on-close
      @closed="closeDialog()">
      <el-form ref="form" :model="productInfo" label-width="160px" :rules="addRules">
        <el-form-item label="Product Title" prop="title">
          <el-input v-model="productInfo.title"></el-input>
        </el-form-item>
        <div style="display: flex; flex-direction: row;margin-left: 61px;">
          <el-form-item label="Length(cm)" label-width="98px" style="width: 14vw;" prop="length">
            <el-input v-model.number="productInfo.length" maxlength="7"></el-input>
          </el-form-item>
          <el-form-item label="Width(cm)" label-width="96px" style="width: 14vw;" prop="width">
            <el-input v-model.number="productInfo.width" maxlength="7"></el-input>
          </el-form-item>
          <el-form-item label="Height(cm)" label-width="96px" style="width: 14vw;" prop="height">
            <el-input v-model.number="productInfo.height" maxlength="7"></el-input>
          </el-form-item>
          <el-form-item label="Weight(kg)" label-width="96px" style="width: 14vw;" prop="weight">
            <el-input v-model.number="productInfo.weight" maxlength="5"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="sku" prop="skuCd">
          <el-input v-model="productInfo.skuCd"></el-input>
        </el-form-item>

        <el-form-item label="ean" prop="ean">
          <el-input v-model="productInfo.ean"></el-input>
        </el-form-item>

        <el-form-item label="Model" prop="model">
          <el-input v-model="productInfo.model"></el-input>
        </el-form-item>

        <el-form-item label="Retail Price" prop="retailPrice">
          <el-input v-model="productInfo.retailPrice"></el-input>
        </el-form-item>

        <el-form-item label="Warranty Day" prop="warrantyDay">
          <el-input v-model="productInfo.warrantyDay"></el-input>
        </el-form-item>

        <el-form-item label="eBay Description" style="margin-bottom: 1vh;">
          <ebayEditor id="ebayTextEditor" ref="ebayTextEditor" :fileName="'file'" :canCrop="canCrop" :uploadUrl="uploadUrl"
            v-model="productInfo.ebayDescription"></ebayEditor>
        </el-form-item>

        <el-form-item label="Amazon Description" style="margin-top: 1vh; margin-bottom: 1vh;">
          <amazonEditor id="amazonTextEditor" ref="amazonTextEditor" :fileName="'file'" :canCrop="canCrop" :uploadUrl="uploadUrl"
            v-model="productInfo.amazonDescription"></amazonEditor>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenDialog = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFunction == 'Add Product' ? addProductInfo() : updateProductInfo()">{{dialogFunction}}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import ebayEditor from '@/components/Quilleditor/index.vue'
  import amazonEditor from '@/components/Quilleditor/index.vue'

  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {
    getAllProduct,
    searchProduct,
    addProduct,
    deleteProduct,
    getProductWhenUpdate,
    updateProduct,
    batchDeletePro
  } from '@/network/mvo/mvo-product-entry.js'

  export default {
    name: "mvo-product-entry",
    data() {
      return {
        productTitle: "",
        // Table变量
        tableKey: 0,
        productInfos: null,
        tableLoading: true,
        // 分页控件变量
        pageSize: 8,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenDialog: false,
        dialogFunction: "Add Product",
        // 添加新商品
        productInfo: {
          ean: "",
          height: "",
          length: "",
          model: "",
          retailPrice: "",
          skuCd: "",
          title: "",
          upc: "",
          userId: "",
          warrantyDay: "",
          weight: "",
          width: "",
          manId: "",
          ebayDescription: "",
          amazonDescription: ""
        },
        // 副文本编辑器
        ebayContent: "",
        amazonContent: "",
        canCrop: false,
        /*测试上传图片的接口，返回结构为{url:''}*/
        uploadUrl: 'http://localhost:9040/upload/uploadImage',
        addRules: {
          title: [{
              required: true,
              message: 'Please input product title',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 100,
              message: 'The product title contains search keywords, brand name, color, size, and model.',
              trigger: 'blur'
            }
          ],
          width: [{
              required: true,
              message: 'Input width',
              trigger: 'blur'
            },
            {
              type: 'number',
              message: 'Must be number'
            }
          ],
          height: [{
            required: true,
            message: 'Input height',
            trigger: 'blur'
          }, {
            type: 'number',
            message: 'Must be number'
          }],
          length: [{
            required: true,
            message: 'Input length',
            trigger: 'blur'
          }, {
            type: 'number',
            message: 'Must be number'
          }],
          weight: [{
            required: true,
            message: 'Input weight',
            trigger: 'blur'
          }, {
            type: 'number',
            message: 'Must be number'
          }],
          skuCd: [{
            required: true,
            message: 'Please input sku',
            trigger: 'blur'
          }, {
            max: 8,
            message: 'Sku must be less than 8',
            trigger: 'blur'
          }],
          ean: [{
            required: true,
            message: 'Please input ean',
            trigger: 'blur'
          }],
          model: [{
            required: true,
            message: 'Please input model',
            trigger: 'blur'
          }],
          retailPrice: [{
            required: true,
            message: 'Please input price',
            trigger: 'blur'
          }],
          warrantyDay: [{
            required: true,
            message: 'Please input warranty Day',
            trigger: 'blur'
          }]
        }
      }
    },
    components: {
      ebayEditor,
      amazonEditor
    },
    watch: {
      "productInfo.width"() {
        if (this.productInfo.width < 0) {
          this.productInfo.width = Number(this.productInfo.width.toString().replace(/\-/g, ''));
        }
      },
      "productInfo.length"() {
        if (this.productInfo.length < 0) {
          this.productInfo.length = Number(this.productInfo.length.toString().replace(/\-/g, ''));
        }
      },
      "productInfo.height"() {
        if (this.productInfo.height < 0) {
          this.productInfo.height = Number(this.productInfo.height.toString().replace(/\-/g, ''));
        }
      },
      "productInfo.weight"() {
        if (this.productInfo.weight < 0) {
          this.productInfo.weight = Number(this.productInfo.weight.toString().replace(/\-/g, ''));
        }
      }
    },
    created() {
      this.getAllProductInfo();
    },
    methods: {
      getAllProductInfo() {
        var getAllProductVO = {
          manId: this.$store.getters.manId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllProduct(getAllProductVO).then(response => {
            this.productInfos = response.data.list
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
      searchProductByTitle() {
        var searchProductVO = {
          manId: this.$store.getters.manId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.productTitle
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchProduct(searchProductVO).then(response => {
            this.productInfos = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            resolve()
            this.tableLoading = false
          }).catch(error => {
            this.tableLoading = false
            reject(error);
          })
        })
      },
      addProductInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.productInfo.userId = this.$store.getters.userName
            this.productInfo.manId = this.$store.getters.manId
            return new Promise((resolve, reject) => {
              addProduct(this.productInfo).then(response => {
                this.$message.success("Add Product Successfully!")
                this.ifOpenDialog = false;
                this.getAllProductInfo()
                resolve()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      getProductInfoWhenUpdate(row) {
        this.dialogFunction = "Modify Product"
        this.ifOpenDialog = true
        return new Promise((resolve, reject) => {
          getProductWhenUpdate({
            proId: row.proId
          }).then(response => {
            this.productInfo = {
              proId: row.proId,

              ean: response.data.ean,
              height: parseFloat(response.data.height),
              length: parseFloat(response.data.length),
              model: response.data.model,
              retailPrice: response.data.retailPrice,
              skuCd: response.data.skuCd,
              title: response.data.title,
              upc: response.data.upc,
              userId: "",
              warrantyDay: response.data.warrantyDay,
              weight: parseFloat(response.data.weight),
              width: parseFloat(response.data.width),
              ebayDescription: response.data.ebayDescription,
              amazonDescription: response.data.amazonDescription
            }
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeleteProductInfo() {
        var data = this.$refs.productTable.selection;
        if (data.length == 0) {
          this.$message.warning("Please choose product")
        } else {
          console.log(data)
          var proIds = []
          for (var i = 0; i < data.length; i++) {
            proIds[i] = data[i].proId
          }
          return new Promise((resolve, reject) => {
            batchDeletePro(proIds).then(response => {
              resolve()
              this.getAllProductInfo()()
            }).catch(error => {
              reject(error);
            })
          })
        }
      },
      deleteProductInfo(row, index) {
        return new Promise((resolve, reject) => {
          deleteProduct({
            proId: row.proId
          }).then(response => {
            resolve()
            this.getAllProductInfo()
          }).catch(error => {
            reject(error);
          })
        })
      },
      updateProductInfo() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.productInfo.userId = this.$store.getters.userName
            this.productInfo.manId = this.$store.getters.manId
            return new Promise((resolve, reject) => {
              updateProduct(this.productInfo).then(response => {
                this.$message.success("Modify Product Successfully!")
                this.ifOpenDialog = false;
                resolve()
                this.getAllProductInfo()
              }).catch(error => {
                reject(error);
              })
            })
          }
        })
      },
      closeDialog() {
        this.productInfo = {
          ean: "",
          height: "",
          length: "",
          model: "",
          retailPrice: "",
          skuCd: "",
          title: "",
          upc: "",
          userId: "",
          warrantyDay: "",
          weight: "",
          width: "",
          manId: "",
          ebayDescription: "",
          amazonDescription: ""
        }
      },
      changeit() {
        console.log(this.pageNum)
      },
      haha() {
        console.log(this.ebayContent)
        console.log(this.amazonContent)
      },
      openAddDialog() {
        this.ifOpenDialog = true
        this.dialogFunction = "Add Product"
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
    width: 60vw;
  }
</style>
