import Vue from 'vue'
import Router from 'vue-router'




Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/index',
      component:()=>import('@/components/views/index'),
     
      children:[
        {
          path:'/home',
          component:()=>import('@/components/pages/home'),
          name:'首页',
        },
        {
          path:'/mine',
          component:()=>import('@/components/pages/mine'),
          name:'个人中心',
        },
        {
          path:'/shopcar',
          component:()=>import('@/components/pages/shopcar'),
          name:'购物车',
        },
        {
          path:'',
          redirect:'/home'
        },
      ]
    },
    {
      path:'/sort',
      component:()=>import('@/components/views/sort')
    },
    {
      path:'/sortlist',
      component:()=>import('@/components/views/sortlist')
    },
    {
      path:'/shopcarorde',
      component:()=>import('@/components/views/shopcarorde')
    },
    {
      path:'/comdetail',
      component:()=>import('@/components/views/comdetail')
    },
    {
      path:'/login',
      component:()=>import('@/components/views/login')
    },
    {
      path:'/register',
      component:()=>import('@/components/views/register')
    },
    {
      path:'*',
      redirect:'/index'
    }
  ]
})
