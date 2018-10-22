import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Index from '@/components/index'
import Blog_Info from '@/components/blog_Info'
import Pull_blog from '@/components/pull_blog'
import Login from '@/components/login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path : '/index',
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
        },
        {
          path : '/pull',
          name : 'pull',
          component : Pull_blog
        }
      ]
    },
    {
      path:'/',
      name:'login',
      component:Login
    }

  ]
})
