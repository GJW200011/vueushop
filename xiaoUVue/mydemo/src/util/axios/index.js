import http from './axios'
// 注册
export function getregister(data){
    return http.post('/register',data)
}
// 登录
export function getLogin(data){
    return http.post('/login',data)
}
// banner
export function getBannerList(){
    return http.get('/getbanner')
}
// 获取商品信息(首页)
export function getIndexGoods(){
    return http.get('/getindexgoods')
}
// 获取分类树形结构
export function getCateTree(){
    return http.get('/getcatetree')
}
// 获取分类商品
export function getGoods(params){
    return http.get('/getgoods',{
        params
    })
}
// 获取一个商品信息
export function getGoodsInfo(params){
    return http.get('/getgoodsinfo',{
        params
    })
}
//购物车添加
export function getCarAdd(data){
    return http.post('/cartadd',data)
}
//购物车删除
export function getCarDelete(data){
    return http.post('/cartdelete',data)
}
//购物车添加
export function getCarList(params){
    return http.get('/cartlist',{
        params
    })
}