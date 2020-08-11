import {
  login,
  logout,
  getInfo
} from '@/api/user'
import {
  getUserName,
  setUserName,
  removeUserName,
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'


const getDefaultState = () => {
  return {
    userName: getUserName(),
    bsrId: '',
    manId: '',
    tokenHead: '',
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER_NAME: (state, userName) => {
    state.userName = userName
  },
  SET_DSRID: (state, dsrId) => {
    state.dsrId = dsrId
  },
  SET_MANID: (state, manId) => {
    state.manId = manId
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ACCOUNTNAME: (state, accountName) => {
    state.accountName = accountName
  },
}

const actions = {

  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password,
      tokenId,
      code
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        tokenId: tokenId,
        code: code
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.tokenHead + " " + data.token)
        commit('SET_USER_NAME', username)
        setUserName(username)
        setToken(data.tokenHead + " " + data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({
    commit,
    state
  }) {
    console.log(state.userName)
    return new Promise((resolve, reject) => {
      getInfo({
        userName: state.userName,
        token: state.token
      }).then(response => {
        const {
          data
        } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        commit('SET_MANID', data.manId)
        commit('SET_DSRID', data.dsrId)
        commit('SET_NAME', data.userName)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
