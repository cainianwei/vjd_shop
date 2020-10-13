import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import User from '@/components/User.vue'
import Welcome from '@/components/Welcome'
import Member from '@/components/member'
import MemberLevel from '@/components/memberlevel'
import SetShop from '@/components/setshop'
import ProfitPercent from '@/components/setshop/ProfitPercent'
import OrderCompute from '@/components/datacount/OrderCompute'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home',
        redirect: '/welcome'
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: Welcome
      },
      {
        path: '/user',
        name: 'User',
        component: User
      },
      {
        path: '/member',
        name: 'Member',
        component: Member
      },
      {
        path: '/memberLevel',
        name: 'MemberLevel',
        component: MemberLevel
      },
      {
        path: '/setShop',
        name: 'SetShop',
        component: SetShop
      },
      {
        path: '/profitPrcent',
        name: 'ProfitPrcent',
        component: ProfitPercent
      },
      {
        path: '/orderCompute',
        name: 'OrderCompute',
        component: OrderCompute
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//全局路由守卫
router.beforeEach((to,from,next)=>{
  if(to.path==='/login')return next()
  const token=window.localStorage.getItem('token')
  if(!token) return next('/login')
  next()
})

export default router
