import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
import globalLocal from '@/utils/local'

const getDefaultState = () => {
  return {
    token: getToken(),
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    globalLocal.set('token', token)
  },
}

const actions = {
  // user login
  login({ commit }, token) {
    return new Promise((resolve, reject) => {
      login({token: token }).then(response => {
        const { data, roles } = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  storeToken({commit}, token){
	  return new Promise(resolve => {
		  commit('SET_TOKEN', token)
		  setToken(token)
		  resolve()
	  })
  },
  // get user info
  getInfo({ commit, state }) {
	 console.log("2222222222",state)
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('请求失败，请重新操作.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

