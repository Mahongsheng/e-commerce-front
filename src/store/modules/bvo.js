const getDefaultState = () => {
  return {
    productInfo: { // 商品详情
      proId: 1,
      images: ["https://e-commerce-oss.oss-cn-beijing.aliyuncs.com/images/1593771713868.png",
        "https://e-commerce-oss.oss-cn-beijing.aliyuncs.com/images/item-detail-2.jpg"
      ],
      title: '这是一个测试',
      tags: ["手机", "电脑"],
      minRetailPrice: "",
      retailPrice: "",
      promotion: ["跨店满减"],
      remarksNum: 1000,
      setMeal: [],
      hot: [],
      goodsDetail: ["https://e-commerce-oss.oss-cn-beijing.aliyuncs.com/images/1593771713868.png",
        "https://e-commerce-oss.oss-cn-beijing.aliyuncs.com/images/item-detail-2.jpg"
      ],
      param: [{
          title: "商品名称:",
          content: "iPhone 7手机壳"
        },
        {
          title: "商品编号",
          content: "10435663237"
        }
      ],
      remarks: []
    },
  }
}

// const state = getDefaultState()

const state = {
  productInfo:{}
}

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PRODUCT_INFO: (state, productInfo) => {
    state.productInfo = productInfo
  },
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
