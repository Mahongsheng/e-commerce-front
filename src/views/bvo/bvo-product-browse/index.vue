<template>
  <div style="min-height: calc(100vh - 50px);" v-loading="pageLoading" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
    <el-row v-for="productsWithCat in productsWithCats">
      <div class="seckill-content">
        <h2 style="margin-left: 17px;">{{productsWithCat.catName}}</h2>
        <el-card class="seckill-item" v-for="product in productsWithCat.products" :key="product.proId" shadow="hover">
          <router-link :to="'productDetail/'+ product.proId">
            <div class="seckill-item-img">
              <img :src="product.image">
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
          </router-link>
        </el-card>
      </div>
    </el-row>
  </div>
</template>

<script>
  import {
    getAllProduct,
    searchProduct,
    addProduct,
    deleteProduct,
    getProductWhenUpdate,
    updateProduct
  } from "@/network/bvo/bvo-product-browse.js"
  export default {
    name: "bvo-goods-view",
    data() {
      return {
        pageLoading: true,
        currentDate: new Date(),
        productsWithCats: [],// {catName: "", products: [{proId: "",image: "",title: "",minRetailPrice: "",retailPrice: ""}]}
      };
    },
    created() {
      this.getAllProductInfo();
    },
    methods: {
      getAllProductInfo() {
        this.tableLoading = true
        return new Promise((resolve, reject) => {
          getAllProduct().then(response => {
            this.productsWithCats = response.data
            console.log(response.data)
            resolve()
            this.tableLoading = false
            this.pageLoading = false
          }).catch(error => {
            reject(error);
            this.tableLoading = false
          })
        })
      },
    }
  }
</script>

<style scoped>
  p {
    width: 200px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .seckill-content {
    width: 100%;
    height: 100%;
  }

  .seckill-item {
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
</style>
