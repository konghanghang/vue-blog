import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routers,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
};

const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
	//未匹配到正确路由跳转到上级路由，上级路由也未匹配则跳转到首页
  if (to.matched.length === 0) {                                       
    from.path ? next({ path:from.path }) : next('/')
  } else {
    next()
  }
})

export default router