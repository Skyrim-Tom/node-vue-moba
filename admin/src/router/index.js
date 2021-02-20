import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {path: '/categories/create', component: () => import('../views/CategoryEdit.vue')}, //两个不同的页面地址使用同一个路径
      {path: '/categories/edit/:id', component: () => import('../views/CategoryEdit.vue'), props: true}, //两个不同的页面地址使用同一个路径，后接props为注入参数到路由
      {path: '/categories/list', component: () => import('../views/CategoryList.vue')},

      {path: '/items/create', component: () => import('../views/ItemEdit.vue')}, //两个不同的页面地址使用同一个路径
      {path: '/items/edit/:id', component: () => import('../views/ItemEdit.vue'), props: true}, //两个不同的页面地址使用同一个路径，后接props为注入参数到路由
      {path: '/items/list', component: () => import('../views/ItemList.vue')}
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
