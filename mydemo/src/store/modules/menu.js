import {getMenuList} from '../../util/axios'

const state={
    menuList:[]
}

const getters={
    getMuneList(state){
        // console.log(state.menuList);
        return state.menuList
    }
}

const mutations={
   
    REQ_MUNELIST(state,payload){      
        state.menuList = payload
    },
  
}
const actions={
    getMuneListAction({commit}){
        getMenuList({
            istree:true
        })
        .then(res=>{
            if(res.data.code=200){
            //    console.log(res);
                commit('REQ_MUNELIST',res.data.list)
            }
        })
        .catch(err=>{
            console.log(err,'错误捕获');
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced:true
}