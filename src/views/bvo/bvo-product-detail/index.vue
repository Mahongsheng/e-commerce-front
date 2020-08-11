<template>
  <div class="bvo-product-detail">
    <!-- 商品信息展示 -->
    <ShowGoods></ShowGoods>
    <!-- 商品详细展示 -->
    <ShowGoodsDetail></ShowGoodsDetail>
  </div>

</template>

<script>
  import ShowGoods from "@/views/bvo/bvo-product-detail/components/ShowGoods.vue"
  import ShowGoodsDetail from "@/views/bvo/bvo-product-detail/components/ShowGoodsDetail.vue"
  import {
    mapState,
    mapMutations
  } from 'vuex';
  import {
    getProductDetail
  } from "@/network/bvo/bvo-product-browse.js"
  export default {
    name: "bvo-product-detail",
    components: {
      ShowGoods,
      ShowGoodsDetail
    },
    created() {
      this.getProductInfoDetail()
    },
    methods: {
      getProductInfoDetail() {
        return new Promise((resolve, reject) => {
          getProductDetail({
            proId: this.$route.params.id,
            dsrId: this.$store.getters.dsrId
          }).then(response => {

            var data = response.data
            var productInfo = { // 商品详情
              proId: data.proId,
              images: data.images,
              title: data.title,
              tags: [data.mainCatName, data.viceCatName],
              retailPrice: data.retailPrice,
              minRetailPrice: data.minRetailPrice,
              promotion: ["跨店满减"],
              remarksNum: 100,
              setMeal: [],
              hot: [],
              goodsDetail: data.images,
              param: [{
                  title: "商品名称:",
                  content: "iPhone 7手机壳"
                },
                {
                  title: "商品编号",
                  content: "10435663237"
                }
              ],
              remarks: [],
              ifInWishlist: data.ifInWishlist,

              amazonDescription :data.amazonDescription,
              ebayDescription:data.ebayDescription,
            }
            this.$store.commit("bvo/SET_PRODUCT_INFO", productInfo)
            console.log(this.$store.state.bvo.productInfo)
            resolve()
          }).catch(error => {
            reject(error);
          })
        })
      },

    }
  }
</script>

<style>
</style>
