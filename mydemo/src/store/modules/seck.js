import {getSeckList} from '../../util/axios'

const state={
    secklist:[]
}

const getters={
    getSeckList(state){
        return state.secklist
    }
}

const mutations={
    REQ_SECKLIST(state,payload){
        state.secklist=payload
    }
}

const actions={
    getSeckListActions({commit}){
        getSeckList()
        .then(res=>{
           if(res.data.code==200){
               console.log(res);
            //    console.log(res.data.list);
               commit('REQ_SECKLIST',res.data.list)
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