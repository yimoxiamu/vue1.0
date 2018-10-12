import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Index from '@/components/index'
import Blog_Info from '@/components/blog_Info'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/',
      name : 'index',
      component : Index,
      children:[
        {
          path : '/',
          name : 'home',
          component : Home
        },
        {
          path : '/info/:blogId',
          name : 'info',
          component : Blog_Info
        }
      ]
    }
  ]
})
