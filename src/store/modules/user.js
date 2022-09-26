import { Login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginActions({ commit }, data1) {
      console.log('123')
      const { data } = await Login(data1)
      console.log(data)
      commit('SET_TOKEN', data.token)
    }
  }
}
