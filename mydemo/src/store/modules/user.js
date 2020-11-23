import { getUserList,getUserCount,getUserInfo} from '../../util/axios'

const state = {
    userlist: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
}

const getters = {
    getUserList(state) {
        return state.userlist
    },
    getCount(state){
        return state.total
    },
    getSize(state){
        return state.size
    }
}                                                   

const mutations = {
    REQ_USERLIST(state, payload) {
        state.userlist = payload
    },
    REQ_COUNT(state,payload){
        state.total = payload
    },
    REQ_PAGE(state,payload){
        state.page = payload
    }
}

const actions = {
    getUserActions(context) {        // console.log(context);
        getUserList({
            size: context.state.size,
            page: context.state.page
        })
            .then(res => {
                // console.log(context);
                // console.log(res);
                if (res.data.code == 200) {
                 
                   

                    let data = res.data.list ? res.data.list : []
                    //提交一个mutation以及携带参数，参数就是返回的数据
                    context.commit('REQ_USERLIST', data)
                    if (context.state.page != 1 && data.length == 0) {
                        context.dispatch('getPageActions',context.state.page-1)
                        this.getUserActions()
                    }
                }
            })
            .catch(err => {
                console.log(err, 'role捕获错误');
            })
    },
    getCountActions({commit}){
        getUserCount()
        .then(res=>{
            // console.log(res,'count');
            commit('REQ_COUNT',res.data.list[0].total)
        })
    },
    getPageActions(context,payload){
      context.commit('REQ_PAGE',payload)
      context.dispatch('getUserActions')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}