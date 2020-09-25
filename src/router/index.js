import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import User from '@/components/User.vue'
import Welcome from '@/components/Welcome'

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
