export const state = () => ({
  userid: 2,
  mobiles: [],
})

export const mutations = {
  setMobiles(state, payload) {
    state.mobiles = payload
  },
}

export const actions = {
  async getMobile({ state, commit }) {
    const response = await this.$axios.post(
      '/api/index.php?action=get_mobile',
      { userid: state.userid }
    )
    if (response.code === 0 && response.data.mobiles) {
      commit('setMobiles', response.data.mobiles)
    }
    return response
  },
  async saveMobile({ state, dispatch }, payload) {
    const response = await this.$axios.post(
      '/api/index.php?action=save_mobile',
      {
        userid: state.userid,
        mobiles: payload,
      }
    )
    if (response.code === 0) {
      dispatch('getMobile', { userid: payload.userid })
    }
    return response
  },
  getMobileById(_, userid) {
    return this.$axios.post('/api/index.php?action=get_mobile', { userid })
  },
}
