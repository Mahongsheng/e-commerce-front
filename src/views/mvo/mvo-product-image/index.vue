<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Product Title：</span>
        <el-input v-model="productTitle" placeholder="Please input product title" style="width: 40vw;"></el-input>
        <el-button class="pan-btn tiffany-btn" type="text" @click="searchProductImageByTitle()">Search</el-button>
        <el-button class="pan-btn light-blue-btn" type="text" @click="openAddDialog()">Add</el-button>
        <el-button class="pan-btn pink-btn" type="text" @click="batchDeleteproductCat()">Delete</el-button>
      </div>

      <el-table ref="productTable" v-loading="tableLoading" :data="productImages" border fit highlight-current-row
        style="width: 100%;">
        <el-table-column align="center" type="selection" width="100px">
        </el-table-column>
        <el-table-column label="Product Title" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Category" width="200px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.categoryName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Image" width="220px" align="center">
          <template slot-scope="{row}">
            <img :src="row.imageUri" alt="" style="width: 200px;">
          </template>
        </el-table-column>
        <el-table-column label="Status" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="getProductCatWhenUpdate(row)">
              Edit
            </el-button>
            <el-button size="mini" type="danger" @click="deleteProductCat(row,$index)">
              Delete
            </el-button>
            <el-button size="mini" type="success" v-if="row.status!='入仓中'" @click="handleStatus(row)">{{proOperation(row)}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :page-count="totalPage"
        :current-page.sync="pageNum" :hide-on-single-page="ifOnlyOnePage" style="margin: 1vw auto;text-align: center;"
        @current-change="getAllproductImage()">
      </el-pagination>
    </el-card>

    <el-dialog title="Product Infomation" :visible.sync="ifOpenAddDialog" width="70%" center top="5vh" @closed="closeAddDialog()">

      <el-form ref="addForm" :model="productImage" label-width="150px">
        <el-form-item label="Product Title">
          <el-select v-model="productImage.proId" clearable placeholder="请选择">
            <el-option v-for="item in productWithNoImage" :key="item.proId" :label="item.title" :value="item.proId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Product Category">
          <el-cascader v-model="productImage.category" :options="productCats" :props="{ value: 'catId', label: 'catName', children :'viceCats'}"></el-cascader>
        </el-form-item>


        <el-form-item label="Upload Images">
          <el-upload ref="upload" :action="uploadUrl" multiple accept="image/png, image/jpeg" list-type="picture-card"
            :auto-upload="false" :file-list="urlList" :http-request="uploadSectionFile" :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button @click="uploadImages()">上传图片</el-button>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenAddDialog = false">Cancel</el-button>
        <el-button type="primary" @click="addProductCategory()">Save</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Product Infomation" :visible.sync="ifOpenUpdateDialog" width="70%" center top="5vh" @closed="closeUpdateDialog()">

      <el-form ref="modifyForm" :model="productImage" label-width="150px">
        <el-form-item label="Product Title">
          <el-input disabled v-model="productImage.title"></el-input>
        </el-form-item>

        <el-form-item label="Product Category">
          <el-cascader v-model="productImage.category" :options="productCats" :props="{ value: 'catId', label: 'catName', children :'viceCats'}"></el-cascader>
        </el-form-item>

        <el-form-item label="Upload Images">
          <el-upload ref="upload" :action="uploadUrl" multiple accept="image/png, image/jpeg" list-type="picture-card"
            :auto-upload="false" :file-list="urlList" :http-request="uploadSectionFile" :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button @click="uploadImages()">上传图片</el-button>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ifOpenUpdateDialog = false">Cancel</el-button>
        <el-button type="primary" @click="updateProductCategory()">Save</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAllProduct,
    searchProduct,
    addProduct,
    deleteProduct,
    getProductWhenUpdate,
    updateProduct,
    getAllCategory,
    changeStatus,
    getOSSPolicy,
    uploadToOSS
  } from '@/network/mvo/mvo-product-image.js'

  import axios from 'axios'
  export default {
    name: "mvo-product-image",
    data() {
      return {
        productTitle: "",
        // Table变量
        tableKey: 0,
        productImages: [],
        productWithNoImage: [],
        tableLoading: true,
        // 分页控件变量
        pageSize: 10,
        totalPage: 1,
        pageNum: 1,
        ifOnlyOnePage: false,
        // 是否打开弹窗
        ifOpenAddDialog: false,
        ifOpenUpdateDialog: false,
        // 已选商品分类
        productCat: "",
        productCats: [{
          catId: 1,
          catName: "ceshi",
          viceCats: [{
            catId: 2,
            catName: "ceshi2",
          }]
        }],
        // 添加新商品
        productImage: {
          proId: "",
          userId: "",
          category: [],
          images: []
        },
        imageList: [],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        // 上传参数
        uploadUrl: "",
        urlList: []
      }
    },
    computed: {
      proOperation() {
        return function(row) {
          var operation = "";
          if (row.status == "待入仓") {
            operation = "入仓"
          } else if (row.status == "待上架") {
            operation = "上架"
          } else if (row.status == "上架中") {
            operation = "下架"
          }
          return operation
        }
      }
    },
    created() {
      this.getAllproductImage();
    },
    methods: {
      getAllproductImage() {
        var getAllProductImageVO = {
          manId: this.$store.getters.manId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllProduct(getAllProductImageVO).then(response => {
            this.productImages = response.data.list
            this.totalPage = response.data.totalPage
            this.pageNum = response.data.pageNum
            console.log(this.productImages)
            this.productWithNoImage = []
            for (var i = 0; i < this.productImages.length; i++) {
              if (this.productImages[i].imageUri == null) {
                this.productWithNoImage.push(this.productImages[i])
              }
            }
            resolve()
            this.tableLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
      searchProductImageByTitle() {
        var searchProductImageVO = {
          manId: this.$store.getters.manId,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.productTitle
        }
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          searchProduct(searchProductImageVO).then(response => {
            this.productImages = response.data.list
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
      openAddDialog() {
        this.getAllImageCategory();
        this.ifOpenAddDialog = true;
      },
      getAllImageCategory() {
        return new Promise((resolve, reject) => {
          getAllCategory().then(response => {
            this.productCats = response.data
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      addProductCategory() {
        this.$refs['addForm'].validate((valid) => {
          if (valid) {
            if (this.productImage.category.length == 0) {
              this.$message.error("Please select category!")
            } else {
              console.log(this.productImage)
              this.productImage.userId = this.$store.getters.userName
              return new Promise((resolve, reject) => {
                addProduct(this.productImage).then(response => {
                  this.ifOpenAddDialog = false
                  this.getAllproductImage()
                  console.log(response)
                  resolve()
                }).catch(error => {
                  reject(error)
                })
              })
            }
          }
        })
      },
      uploadImages() {
        this.$refs.upload.submit()
      },
      getProductCatWhenUpdate(row) {
        this.ifOpenUpdateDialog = true
        this.productImage.proId = row.proId
        this.productImage.title = row.title
        this.getAllImageCategory();
      },
      updateProductCategory() {
        this.$refs['modifyForm'].validate((valid) => {
          if (valid) {
            if (this.productImage.category.length == 0) {
              this.$message.error("Please select category!")
            } else {
              this.productImage.userId = this.$store.getters.userName
              return new Promise((resolve, reject) => {
                updateProduct(this.productImage).then(response => {
                  console.log(response)
                  this.ifOpenUpdateDialog = false
                  this.getAllproductImage()
                  resolve()
                }).catch(error => {
                  reject(error)
                })
              })
            }
          }
        })
      },
      closeUpdateDialog() {
        this.productImage = {
          proId: "",
          userId: "",
          category: [],
          images: []
        }
        this.urlList = []
      },
      batchDeleteproductCat() {
        var data = this.$refs.productTable.selection;
        console.log(data)
        if (data.length == 0) {
          this.$message.warning("Please choose products and then delete them")
        } else {
          var proIds = []
          for (var i = 0; i < data.length; i++) {
            proIds[i] = data[i].proId
          }

          return new Promise((resolve, reject) => {
            deleteProduct(proIds).then(response => {
              console.log(response)
              this.getAllproductImage()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        }
      },
      deleteProductCat(row, index) {
        var proIds = []
        proIds[0] = row.proId

        return new Promise((resolve, reject) => {
          deleteProduct(proIds).then(response => {
            this.getAllproductImage()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      closeAddDialog() {
        this.productImage = {
          proId: "",
          userId: "",
          category: [],
          images: []
        }
        this.urlList = []
      },
      handleStatus(row) {
        var productStatusVO = {
          proId: row.proId,
          status: row.status
        }
        console.log(productStatusVO)
        return new Promise((resolve, reject) => {
          changeStatus(productStatusVO).then(response => {
            this.getAllproductImage()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getOSSPolicyBeforeUpload() {
        return new Promise((resolve, reject) => {
          axios.get('http://localhost:9040/aliyun/oss/policy', {
            headers: {
              'Authorization': this.$store.getters.token,
            }
          }).then((res) => {
            resolve(res)
          }).catch((err) => {
            reject(err)
          })
        })
      },
      async uploadSectionFile(params) {
        console.log(params)
        console.log(this.$refs.upload.uploadFiles)

        let policy = await this.getOSSPolicyBeforeUpload()
        let res = policy.data
        let uploadFileVO = new FormData();
        //多个文件上传
        uploadFileVO.append("Key", res.data.dir + params.file.name);
        uploadFileVO.append("OSSAccessKeyId", res.data.accessKeyId);
        uploadFileVO.append("Policy", res.data.policy);
        uploadFileVO.append("Signature", res.data.signature);

        uploadFileVO.append("success_action_status", '200');
        uploadFileVO.append("callback", res.data.callback);
        uploadFileVO.append("dir", res.data.dir);
        uploadFileVO.append("host", res.data.host);
        uploadFileVO.append("file", params.file);

        let fileUrl = res.data.host + "/" + res.data.dir + params.file.name
        console.log(fileUrl)

        return new Promise((resolve, reject) => {
          uploadToOSS(uploadFileVO).then(response => {
            console.log(response)
            this.productImage.images.push(response.data)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  @import "src/styles/btn.scss";

  .pan-btn {
    margin-left: 1vw;
    width: 130px;
  }

  .dialog-span {
    // width: 50%;
    // display: flex;
    // align-items: center;
  }
</style>
