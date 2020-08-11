import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import order from './modules/order'
import bvo from './modules/bvo.js'
import mvo from './modules/mvo.js'
import permission from './modules/permission.js'
import tagsView from './modules/tagsView.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    order,
    bvo,
    mvo,
    permission,
    tagsView
  },
  getters
})

export default store
