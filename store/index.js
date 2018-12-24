export const state = () => ({
  bodyState: false,
  isMobile: false
})

export const actions = {
  nuxtServerInit ({commit}, {req}) {
    const state = /Android|webOS|iPhone|iPod|BlackBerry/i.test(req.headers['user-agent'])
    commit('NUXT_SERVICE_INIT', state)
  },
  bodyState ({commit}, param) {
    commit('BODY_STATE', param)
  }
}

export const mutations = {
  BODY_STATE (state, item) {
    state.bodyState = item
  },
  NUXT_SERVICE_INIT (state, item) {
    state.isMobile = item
  }
}