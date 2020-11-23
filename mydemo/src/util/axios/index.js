import http from './axios'

export function getMenuAdd(data){
    return http.post('/api/menuadd',data)
}

export function getMenuList(params){
    return http.get('/api/menulist',{
        params
    })
}

export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}
export function getMenuEdit(data){
    return http.post('/api/menuedit',data)
}
export function getMenuDelete(data){
    return http.post('/api/menudelete',data)
}


// 角色管理
export function getRoleAdd(data){
    return http.post('/api/roleadd',data)
}
export function getRoleList(params){
    return http.get('/api/rolelist',{
        params
    })
}
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}
export function getRoleEdit(data){
    return http.post('/api/roleedit',data)
}
export function getRoleDelete(data){
    return http.post('/api/roledelete',data)
}

// 商城管理
export function getUserAdd(data){
    return http.post('/api/useradd',data)
}
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}
export function getUserCount(params){
    return http.get('/api/usercount',{
        params
    })
}
export function getUserEdit(data){
    return http.post('/api/useredit',data)
}
export function getUserDelete(data){
    return http.post('/api/userdelete',data)
}
export function getUserLogin(data){
    return http.post('/api/userlogin',data)
}
// 商品分类

export function getCateAdd(data){
    return http.post('/api/cateadd',data)
}

export function getCateList(params){
    return http.get('/api/catelist',{
        params
    })
}
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}
// 商城规格
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
export function getSpecsCount(params){
    return http.get('/api/specscount',{
        params
    })
}
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
// 商城管理
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
export function getGoodsCount(params){
    return http.get('/api/goodscount',{
        params
    })
}
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
//会员管理
export function getMemberList(params){
    return http.get('/api/memberlist',{
        params
    })
}
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}
// 轮播图管理

export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}

export function getBannerList(params){
    return http.get('/api/bannerlist',{
        params
    })
}
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
export function getBannerEdit(data){
    return http.post('/api/bannerdit',data)
}
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}
// 限时秒杀
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
export function getSeckList(params){
    return http.get('/api/secklist',{
        params
    })
}
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}
