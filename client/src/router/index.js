import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import HomePage from '@/components/HomePage'
// import WelcomePage from '@/components/WelcomePage'
// import BlogEntries from '@/components/BlogEntries'
// import NewQuestion from '@/components/NewQuestion'
// import AllEntries from '@/components/AllEntries'
// import MyEntries from '@/components/MyEntries'
// import QuestionDetail from '@/components/QuestionDetail'
// import EditQuestion from '@/components/EditQuestion'

const WelcomePage = () => import(/* webpackChunkName: "group-early" */ '@/components/WelcomePage.vue')
const HomePage = () => import(/* webpackChunkName: "group-early" */ '@/components/HomePage.vue')
const BlogEntries = () => import(/* webpackChunkName: "group-late" */ '@/components/BlogEntries.vue')
const NewQuestion = () => import(/* webpackChunkName: "group-late" */ '@/components/NewQuestion.vue')
const AllEntries = () => import(/* webpackChunkName: "group-superlate" */ '@/components/AllEntries.vue')
const MyEntries = () => import(/* webpackChunkName: "group-superlate" */ '@/components/MyEntries.vue')
const QuestionDetail = () => import(/* webpackChunkName: "group-superlate" */ '@/components/QuestionDetail.vue')
const EditQuestion = () => import(/* webpackChunkName: "group-superlate" */ '@/components/EditQuestion.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: HomePage,
      children: [
        {
          path: '',
          name: 'WelcomePage',
          component: WelcomePage
        },
        {
          path: 'entries',
          component: BlogEntries,
          children: [
            {
              path: '',
              name: 'MainEntries',
              component: AllEntries
            },
            {
              path: 'allentries',
              name: 'AllEntries',
              component: AllEntries
            },
            {
              path: 'myentries',
              name: 'MyEntries',
              component: MyEntries
            }
          ]
        },
        {
          path: 'newarticle',
          name: 'NewQuestion',
          component: NewQuestion
        },
        {
          path: 'article/:id',
          name: 'QuestionDetail',
          component: QuestionDetail,
          props: true
        },
        {
          path: 'editarticle/:id',
          name: 'EditQuestion',
          component: EditQuestion,
          props: true
        }
      ]
    }
  ]
})
