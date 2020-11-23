//引入封装好的接口
import { getGoodsList, getGoodsCount } from '../../util/axios'

//state
const state = {
    goodslist: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
}

//getters
const getters = {
    //封装了一个state中菜单列表
    getGoodsList(state) {
        return state.goodslist
    },
    getCount(state) {
        return state.total
    },
    getSize(state) {
        return state.size
    }
}

//mutations
const mutations = {
    //去修改state中菜单列表
    REQ_GOODSLIST(state, payload) {
        state.goodslist = payload
    },
    REQ_COUNT(state, payload) {
        state.total = payload
    },
    REQ_PAGE(state, payload) {
        state.page = payload
    }
}

//actions
const actions = {
    //获取菜单列表
    getGoodsListAction(context) {
        getGoodsList({
            size: context.state.size,
            page: context.state.page,
        })
            .then(res => {
                console.log(res, '响应')
                if (res.data.code == 200) {
                    let data = res.data.list ? res.data.list : []
                    //提交一个mutation以及携带参数，参数就是返回的数据
                    context.commit("REQ_GOODSLIST", data)
                    if (context.state.page != 1 && data.length == 0) {
                        context.dispatch('getPageActions', context.state.page - 1)
                        this.getGoodsListAction()
                    }
                }
            })
            .catch(err => {
                console.log(err, '错误响应')
            })
    },
    getCountActions({ commit }) {
        console.log(1);
        getGoodsCount()
            .then(res => {
                console.log(res, 'count');
                commit('REQ_COUNT', res.data.list[0].total)
            })
    },
    getPageActions(context, payload) {
        context.commit('REQ_PAGE', payload)
        context.dispatch('getGoodsListAction')
    }
}


//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced: true
}