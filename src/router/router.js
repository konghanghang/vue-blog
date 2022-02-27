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
// 个人中心我的回复
const myReplay = () => import('../views/user/index.vue')
// 个人中心回复我的
const received = () => import('../views/user/index.vue')
// 列表展示
const mensesShow = () => import('../views/menses/show.vue')
// 任务列表展示
const jobs = () => import('../views/job/jobs.vue')
// 试题题目
const exam = () => import('../views/exam/exam.vue')

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
    /*个人中心我的回复*/
    path: '/user/index/article/replay/:page',
    name:'myReplay',
    component: myReplay
  },
  {
    /*个人中心回复我的*/
    path: '/user/index/article/received/:page',
    name:'received',
    component: received
  },
  {
    /*列表展示*/
    path: '/menses/:page',
    name:'mensesShow',
    component:mensesShow
  },
  {
    /*列表展示*/
    path: '/jobs/:page',
    name:'jobs',
    component:jobs
  },
  {
    /*列表展示*/
    path: '/exam',
    name:'exam',
    component: exam
  }
]

export default routes