import {getRoleList} from '../../util/axios'

const state={
    roulelist:[]
}

const getters={
    getRoleList(state){
        return state.roulelist
    }
}

const mutations={
    REQ_ROLELIST(state,payload){
        state.roulelist=payload
    }
}

const actions={
    getRoleActions({commit}){
        getRoleList()
        .then(res=>{
           if(res.data.code==200){
            //    console.log(res.data.list);
               commit('REQ_ROLELIST',res.data.list)
           }
        })
        .catch(err=>{
            console.log(err,'role捕获错误');
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}