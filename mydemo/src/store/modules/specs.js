import { getSpecsList, getSpecsCount, } from '../../util/axios'

const state = {
    specslist: [],
    newspecslist: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
}

const getters = {
    getSpecsList(state) {
        return state.specslist
    },
    getNewSpecsList(state) {
        return state.newspecslist
    },
    getCount(state) {
        return state.total
    },
    getSize(state) {
        return state.size
    }
}

const mutations = {
    REQ_SPECSLIST(state, payload) {
        state.specslist = payload
    },
    REQ_NEWSPECSLIST(state, payload) {
        state.newspecslist = payload
    },
    REQ_COUNT(state, payload) {
        state.total = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    getSpecsActions(context) {        // console.log(context);
        getSpecsList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                if (res.data.code == 200) {


                    let data = res.data.list ? res.data.list : []
                    //提交一个mutation以及携带参数，参数就是返回的数据
                    context.commit('REQ_SPECSLIST', data)
                    if (context.state.page != 1 && data.length == 0) {
                        context.dispatch('getPageActions', context.state.page - 1)
                        this.getSpecsActions()
                    }
                }
            })
            .catch(err => {
                console.log(err, 'role捕获错误');
            })
     
    },
    getNewSpecsAction(context){
        getSpecsList()
        .then(res => {
            console.log(res,'newnewnew');
            if (res.data.code == 200) {
                context.commit('REQ_NEWSPECSLIST', res.data.list)
            }
        })
        .catch(err => {
            console.log(err, 'role捕获错误');
        })
    },
    getCountActions({ commit }) {
        getSpecsCount()
            .then(res => {
                // console.log(res,'count');
                commit('REQ_COUNT', res.data.list[0].total)
            })
    },
    getPageActions(context, payload) {
        context.commit('REQ_PAGE', payload)
        context.dispatch('getSpecsActions')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}