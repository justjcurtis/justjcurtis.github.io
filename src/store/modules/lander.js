const state = {
    hasLanded : false
};
const getters = {
    hasLanded: state => state.hasLanded
};
const actions = {
    land({commit}){
        commit('setHasLanded', true)
    }
};
const mutations = {
    setHasLanded: (state, value) => state.hasLanded = value
};

export default{
    state,
    getters,
    actions,
    mutations
}
