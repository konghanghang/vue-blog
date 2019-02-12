// 首页
const index = () => import('../views/index.vue')
// 文章发布页面
const newArticle = () => import('../views/article/create.vue')
// 文章编辑
const articleEdit = () => import('../views/article/create.vue')
// 文章详情
const detail = () => import('../views/article/details.vue')
// 登录注册
const login = () => import('../views/login.vue')
// 个人中心
const userInfo = () => import('../views/user/index.vue')
// 个人中心文章
const userArticle = () => import('../views/user/index.vue')
// 列表展示
const mensesShow = () => import('../views/menses/show.vue')

const routes = [
  {
    /*首页*/
    path: '/',
    component:index
  },
  {
    /*首页*/
    path: '/index',
    component:index
  },
  {
    /*发布页面*/
    path: '/article/add',
    name:'newArticle',
    component:newArticle
  },
  {
    /*文章编辑*/
    path: '/article/edit/:articleId',
    name:'articleEdit',
    meta:{edit:true},
    component:articleEdit
  },
  {
    /*文章详情页面*/
    path: '/article/:id',
    name:'detail',
    component:detail
  },
  {
    /*登录注册*/
    path: '/login',
    name:'login',
    meta:{login:true},
    component:login
  },
  {
    /*登录注册*/
    path: '/register',
    name:'register',
    meta:{login:true,register:true},
    component:login
  },
  {
    /*个人中心信息*/
    path: '/user/index/info',
    name:'userInfo',
    component:userInfo
  },
  {
    /*个人中心文章*/
    path: '/user/index/article/:page',
    name:'userArticle',
    component:userArticle
  },
  {
    /*列表展示*/
    path: '/k/menses/show/:page',
    name:'mensesShow',
    component:mensesShow
  }
]

export default routes