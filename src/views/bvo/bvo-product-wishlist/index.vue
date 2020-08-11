<template>
  <div style="position: relative; min-height: calc(100vh - 50px);" v-loading="pageLoading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <el-tabs v-model="activeCat" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="全部商品" name="全部商品">
        <el-row>
          <div class="seckill-content">
            <el-card class="seckill-item" v-for="product in productsFromWishlist" :key="product.proId" shadow="hover">
              <el-button type="info" size="mini" class="delete" icon="el-icon-delete" circle @click="deleteProFromWit(product.proId)"></el-button>
              <div class="seckill-item-img">
                <router-link :to="'productDetail/'+ product.proId"><img :src="product.image"></router-link>
              </div>
              <div class="seckill-item-info">
                <p>{{product.title}}</p>
                <p>
                  <span class="seckill-price text-danger">
                    <svg-icon icon-class="money" />{{product.minRetailPrice}}
                  </span>
                  <span class="seckill-retail-price"><s>{{product.retailPrice}}</s></span>
                </p>
              </div>
            </el-card>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-for="cat in allCats" :key="cat.catId" :label="cat.catName" :name="cat.catName">
        <el-row>
          <div class="seckill-content">
            <el-card class="seckill-item" v-for="product in productsFromWishlist" :key="product.proId" shadow="hover">
              <el-button type="info" size="mini" class="delete" icon="el-icon-delete" circle></el-button>
              <div class="seckill-item-img">
                <router-link :to="'productDetail/'+ product.proId"><img :src="product.image"></router-link>
              </div>
              <div class="seckill-item-info">
                <p>{{product.title}}</p>
                <p>
                  <span class="seckill-price text-danger">
                    <svg-icon icon-class="money" />{{product.minRetailPrice}}
                  </span>
                  <span class="seckill-retail-price"><s>{{product.retailPrice}}</s></span>
                </p>
              </div>
            </el-card>
          </div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-button size="mini" style="position: absolute; right: 8px; top: 5px;">批量删除</el-button>
  </div>

</template>

<script>
  import {
    getAllCat,
    getWishlist,
    deletePro,
    batchDeletePro
  } from "@/network/bvo/bvo-product-wishlist.js"
  export default {
    name: "bvo-product-wishlist",
    data() {
      return {
        pageLoading: true,
        allCats: [], // {catId: "",catName: ""}
        activeCat: "全部商品",
        currentDate: new Date(),
        productsFromWishlist: [], // {proId: "",image: "",title: "",minRetailPrice: "",retailPrice: ""}
      };
    },
    created() {
      this.getAllCatFromWishlist();
      this.getAllProFromWishlist();
    },
    methods: {
      getAllCatFromWishlist() {
        return new Promise((resolve, reject) => {
          getWishlist({
            dsrId: 1,
            catId: ""
          }).then(response => {
            this.productsFromWishlist = response.data
            console.log(response.data)
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      getAllProFromWishlist() {
        return new Promise((resolve, reject) => {
          getAllCat({
            dsrId: 1
          }).then(response => {
            this.allCats = response.data
            console.log(response.data)
            this.pageLoading = false
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      handleTabClick() {
        var nextCatId = 0
        if (this.activeCat == "全部商品") {
          nextCatId = ""
        } else {
          for (var i = 0; i < this.allCats.length; i++) {
            if (this.allCats[i].catName == this.activeCat) {
              nextCatId = this.allCats[i].catId
              break;
            }
          }
        }
        return new Promise((resolve, reject) => {
          getWishlist({
            dsrId: 1,
            catId: nextCatId
          }).then(response => {
            this.productsFromWishlist = response.data
            console.log(response.data)
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      deleteProFromWit(proIdDelete) {
        return new Promise((resolve, reject) => {
          deletePro({
            dsrId: 1,
            proId: proIdDelete
          }).then(response => {
            this.handleTabClick()
            this.$message.success("删除成功！")
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      batchDeleteProFromWit() {
        return new Promise((resolve, reject) => {
          batchDeletePro({
            dsrId: 1,
            proIds: [1, 2, 3]
          }).then(response => {
            this.handleTabClick()
            this.$message.success("批量删除成功！")
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      }
    }
  }
</script>

<style>
  p {
    width: 200px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .el-tabs {
    border-top: 1px solid #EBEEF5;
    /* margin-top: 1px; */
  }

  .seckill-content {
    width: 100%;
    height: 100%;
  }

  .seckill-item {
    position: relative;
    width: 250px;
    height: 310px;
    /* margin-top: 15px; */
    margin-left: 15px;
    padding: 0px;
    /*   box-shadow: 0px 0px 8px #ccc; */
    cursor: pointer;
    float: left;
  }

  .seckill-item-img {
    width: 200px;
    height: 200px;
    margin: 0px auto;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }

  .seckill-item-img img {
    width: 170px;
    height: 170px;
    margin-left: 15px;
    margin-top: 15px;
    transition: margin-top 0.3s;
  }

  .seckill-item-img:hover img {
    margin-top: 6px;
    transition: margin-top 0.3s;
  }

  .seckill-item .delete {
    position: absolute;
    top: 1px;
    right: 1px;
    display: none;
  }

  .seckill-item:hover .delete {
    display: initial;
    /*当鼠标hover时展示*/
  }

  .seckill-item-info {
    padding: 5px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 12px;
  }

  .seckill-item-info i:first-child {
    font-size: 14px;
  }

  .svg-icon {
    width: 15px;
    height: 15px;
  }

  .seckill-price {
    margin-right: 5px;
    font-size: 25px;
    font-weight: bold;
    color: #ff0000;
  }

  .seckill-retail-price {
    color: #ff0000;
  }

 .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-left: none;
    border-top: none;
  }
</style>
