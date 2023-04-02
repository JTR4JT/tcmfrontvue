import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserMsg from '../views/usermsg/UserMsg.vue'
import UserEdit from '../views/usermsg/UserEdit.vue'
import UserAdd from '../views/usermsg/UserAdd.vue'
import MedicalMsg from '../views/medicalmsg/MedicalMsg.vue'
import MedicalAdd from '../views/medicalmsg/MedicalAdd.vue'
import MedicalEdit from '../views/medicalmsg/MedicalEdit.vue'
import MedicalData from '../views/medicalmsg/MedicalData.vue'
import Login from '../views/Login.vue'
import Login2 from '../views/Login2.vue'
import Login3 from '../views/Login3.vue'
import Register from '../views/Register.vue'
import Menu from '../views/Menu.vue'
import Welcome from '../components/Welcome.vue'
import MtMsg from '../views/medicaltypemsg/MtMsg.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  // {
  //   path: '/usermsg',
  //   name: 'usermsg',
  //   component: UserMsg
  // },
 
 
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/login2',
    name: 'login2',
    component: Login2
  },
  {
    path: '/login3',
    name: 'login3',
    component: Login3
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  
  {
    path: '/menu',
    name: 'menu',
    component: Menu,
    redirect:"/welcome",
    children:[
              {
                path: "/welcome",
                component: Welcome
            },
            {
              path: "/usermsg",
              component: UserMsg

          },
          {
            path: '/useredit',
            name: 'useredit',
            component: UserEdit
          },
          {
            path: '/useradd',
            name: 'useradd',
            component: UserAdd
          },
          {
            path: '/medicalmsg',
            name: 'medicalmsg',
            component: MedicalMsg
          },
          {
            path: '/medicaladd',
            name: 'medicaladd',
            component: MedicalAdd
          },
          {
            path: '/medicaledit',
            name: 'medicaledit',
            component: MedicalEdit
          },
          {
            path: '/medicaldata',
            name: 'medicaldata',
            component: MedicalData
          },
          {
    path: '/mtmsg',
    name: 'mtmsg',
    component: MtMsg
          },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
