import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  // INCREMENT_FOOD_COUNT,
  // DECREMENT_FOOD_COUNT,
  // CLEAR_CART,
  // RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  // reqShopRatings,
  // reqShopGoods,
  // reqShopInfo,
  // reqSearchShop
} from '../api'
export default {
  async getAddress({ commnit, state }) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)

    if (result.code == 0) {
      const address = resul.data
      commnit(RECEIVE_ADDRESS, { address })
    }
  },

  // 异步获取食品分类列表
  async getCategorys({ commit }) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, { categorys })
    }
  },

  // 异步获取商家列表
  async getShops({ commit, state }) {
    // 发送异步ajax请求
    const { longitude, latitude } = state
    const result = await reqShops(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, { shops })
    }
  },

  // 同步记录用户信息
  recordUser({ commit }, userInfo) {
    commit(RECEIVE_USER_INFO, { userInfo })
  },

  // 异步获取用户信息
  async getUserInfo({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, { userInfo })
    }
  },

  // 异步登出
  async logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },
}