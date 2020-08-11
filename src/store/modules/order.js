const getDefaultState = () => {
  return {
    payList: [],
    trackingNo: 0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PAYLIST:(state,payList)=> {
    state.payList = payList
  },
  SET_TRACKINGNO:(state,trackingNo)=> {
    state.trackingNo = trackingNo
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

