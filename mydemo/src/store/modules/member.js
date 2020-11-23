import { getMemberList } from '../../util/axios'
const state = {
    memberlist: [],
}
const getters = {
    getMemberList(state) {
        return state.memberlist
    }
}
const mutations = {
    REQ_MEMBERLIST(state, payload) {
        state.memberlist = payload
    },

}
const actions = {
    getMemberActions({ commit }) {    
        getMemberList()
        .then(res => {
            console.log(res);
                if (res.data.code == 200) {
                    commit('REQ_MEMBERLIST', res.data.list)
                }
            })
        .catch(err => {
                console.log(err, 'role捕获错误');
            })
    },

}
export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}