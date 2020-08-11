<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img">
          <img :src="productInfo.images[imgIndex]" alt="">
        </div>
        <div class="item-detail-img-row">
          <div class="item-detail-img-small" v-for="(item, index) in productInfo.images" :key="index" @mouseover="showBigImg(index)">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">校园配送</span> {{productInfo.title}}</p>
        </div>
        <div class="item-detail-tag">
          <p>
            <span v-for="(item,index) in productInfo.tags" :key="index">【{{item}}】</span>
          </p>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">价 格</span>
                <span class="item-price">￥{{productInfo.retailPrice}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">优 惠 价</span>
                <span class="item-price-full-cut">{{productInfo.minRetailPrice}}</span>
              </p>
            </div>
            <div class="item-price-row">
              <p>
                <span class="item-price-title">促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
                <span class="item-price-full-cut" v-for="(item,index) in productInfo.promotion" :key="index">{{item}}</span>
              </p>
            </div>
          </div>
          <div class="item-price-right">
            <div class="item-remarks-sum">
              <p>累计评价</p>
              <p>
                <span class="item-remarks-num">{{productInfo.remarksNum}} 条</span>
              </p>
            </div>
          </div>
        </div>
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car">
            <el-button type="danger" size="medium" @click="dropShipNow()" style="margin-left: 5px;">Dropship Now</el-button>
            <el-button type="danger" size="medium" v-if="!productInfo.ifInWishlist" @click="addToWishlist()" style="margin-left: 5px;">Add
              to Wish List</el-button>
            <el-button type="danger" size="medium" v-if="productInfo.ifInWishlist" @click="deleteFromWishlist()" style="margin-left: 5px;">Delete
              from
              Wish List</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';

  import {
    addWishlist,
    deleteWishlist
  } from "@/network/mvo/mvo-product-browse.js"
  export default {
    name: 'ShowGoods',
    data() {
      return {
        price: 32,
        selectBoxIndex: 0,
        imgIndex: 0,
      };
    },
    computed: {
      ...mapState({
        productInfo: state => state.mvo.productInfo
      }),
    },
    methods: {
      select(index1, index2) {
        this.selectBoxIndex = index1 * 3 + index2;
        this.price = this.productInfo.minRetailPrice;
      },
      showBigImg(index) {
        this.imgIndex = index;
      },
      dropShipNow() {

      },
      addToWishlist() {
        var operateWishlistVO = {
          userId: 1,
          dsrId: 1,
          proId: this.productInfo.proId,
        }
        return new Promise((resolve, reject) => {
          addWishlist(operateWishlistVO).then(response => {
            this.productInfo.ifInWishlist = true
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },
      deleteFromWishlist() {
        var operateWishlistVO = {
          userId: 1,
          dsrId: 1,
          proId: this.productInfo.proId,
        }
        return new Promise((resolve, reject) => {
          deleteWishlist(operateWishlistVO).then(response => {
            this.productInfo.ifInWishlist = false
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      }
    },
    mounted() {
      const father = this;
      setTimeout(() => {
        father.price = father.productInfo.minRetailPrice;
      }, 300);
    }
  };
</script>

<style scoped>
  /******************商品图片及购买详情开始******************/
  .item-detail-show {
    width: 80%;
    margin: 15px auto;
    display: flex;
    flex-direction: row;
    background-color: #fff;
  }

  .item-detail-left {
    width: 350px;
    margin-right: 30px;
  }

  .item-detail-big-img {
    width: 350px;
    height: 350px;
    box-shadow: 0px 0px 8px #ccc;
    cursor: pointer;
  }

  .item-detail-big-img img {
    width: 100%;
  }

  .item-detail-img-row {
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .item-detail-img-small {
    width: 68px;
    height: 68px;
    box-shadow: 0px 0px 8px #ccc;
    cursor: pointer;
  }

  .item-detail-img-small img {
    width: 100%;
  }

  /*商品选购详情*/
  .item-detail-right {
    display: flex;
    flex-direction: column;
  }

  .item-detail-title p {
    color: #666;
    font-size: 20px;
  }

  .item-detail-express {
    font-size: 14px;
    padding: 2px 3px;
    border-radius: 3px;
    background-color: #e4393c;
    color: #fff;
  }

  /*商品标签*/
  .item-detail-tag {
    font-size: 12px;
    color: #e4393c;
  }

  /*价格详情等*/
  .item-detail-price-row {
    width: 47vw;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f3f3f3;
  }

  .item-price-left {
    display: flex;
    flex-direction: column;
  }

  .item-price-title {
    color: #999999;
    font-size: 14px;
    margin-right: 15px;
  }

  .item-price-row {
    margin: 5px 0px;
  }

  .item-price {
    color: #e4393c;
    font-size: 23px;
    cursor: pointer;
  }

  .item-price-full-cut {
    margin-right: 5px;
    padding: 3px;
    color: #e4393c;
    font-size: 12px;
    background-color: #ffdedf;
    border: 1px dotted #e4393c;
    cursor: pointer;
  }

  .item-remarks-sum {
    padding-left: 8px;
    border-left: 1px solid #ccc;
  }

  .item-remarks-sum p {
    color: #999999;
    font-size: 12px;
    line-height: 10px;
    text-align: center;
  }

  .item-remarks-num {
    line-height: 18px;
    color: #005eb7;
  }

  .item-select {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
  }

  .item-select-title {
    color: #999999;
    font-size: 14px;
    margin-right: 15px;
  }

  .item-select-column {
    display: flex;
    flex-direction: column;
  }

  .item-select-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
  }

  .item-select-box {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .item-select-img {
    width: 36px;
  }

  .item-select-box {
    padding: 5px;
    margin-right: 8px;
    background-color: #f7f7f7;
    border: 0.5px solid #ccc;
    cursor: pointer;
  }

  .item-select-box:hover {
    border: 0.5px solid #e3393c;
  }

  .item-select-box-active {
    border: 0.5px solid #e3393c;
  }

  .item-select-img img {
    width: 100%;
  }

  .item-select-intro p {
    margin: 0px;
    padding: 5px;
  }

  .item-select-class {
    padding: 5px;
    margin-right: 8px;
    background-color: #f7f7f7;
    border: 0.5px solid #ccc;
    cursor: pointer;
  }

  .item-select-class:hover {
    border: 0.5px solid #e3393c;
  }

  .add-buy-car-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 15px;
    border-top: 1px dotted #ccc;
  }

  .add-buy-car {
    margin-top: 15px;
  }

  /******************商品图片及购买详情结束******************/
</style>
