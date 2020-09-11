import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Login.vue'
import Home from '@/components/Home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Login
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //  next() direct let pass
  //  next('path') inject
  const tokenStr = window.sessionStorage.getItem('myToken')

  if (to.path === '/login') {
    if(!tokenStr)return next()
    return next(false)
  }

  if (!tokenStr) return next('/login')
  next()
})

export default router
