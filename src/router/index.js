import Vue from 'vue'
import VueRouter from 'vue-router'
import Lar from "@/components/Lar"



Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: '/home',
  name: 'Home',
  component: function () {
    return import('../views/Home.vue')
  },

    redirect:"/index", //默认显示index页面
    children:[  
        {
          path:"/index",  //首页路由
          name:"Index",
          component: function () {
            return import('../components/Index.vue')
          },
          meta:{
            title:"首页"
          }
        },
     
      {
        path:"/my",
        name:"my",
        meta:{
          title:"我的"
        },
        component: function () {
          return import('../components/my/My.vue')},
        // var token=window.localStorage.getItem('Token')
        beforeEnter(to,from,next){
          console.log(to,from,next)
          if(localStorage.Token){
              next()
          }else{
          next()
            setTimeout(()=>{
               next("/login")
            },200)
          }
         }
      
  
    },
    
        {
          path: '/couser',  //课程路由
          name: 'Couser', 
          meta:{
            title:"课程"
          },
          component: function () {
            return import('../components/Couser/Couser.vue')
          },
        
        },
     
      {
        path: "/lar", //约课记录路由
        name: "Lar",
        component: Lar,
        meta:{
          title:"约课记录"
        },
      },
      {
        path: '/exercise',  //练习
        name: 'exercise',
        meta:{
          title:"练习"
        },
        component: function () {
          return import('../views/Exercise/Exercise_index.vue')
        },
      },
  
  ]

},
// 一级路由区域

{
    path: "/changeSubject", //修改个人学科
    name: "ChangeSubject",
    component: function () {
      return import("@/components/myChild/ChangeSubject.vue")
    },
    meta: {
      title: '修改学科'
    }
  },


// 我的学习卡
{
  path:"/MyLearningCard",
  name:"MyLearningCard",
  component:()=>{
    return import("../components/my/MyLearningCard")
  },
  meta:{
    title:"学习卡"
  }
},

// 我的优惠券
{
  path:"/MyDiscount",
  name:"MyDiscount",
  component:()=>{
    return import("@/components/my/MyDiscount")
  },
  meta:{
    title:"优惠券"
  }
},

// 会员
{
path:"/MyVip",
name:"MyVip",
component:()=>{
  return import("@/components/my/MyVip")
},
meta:{
  title:"会员"
}
},

// 搜索
{
  path:'/search',
  name:"search",
  component:()=>{
    return import("@/components/Search")
  },
  meta:{
   title:"搜索"
  }
},

// 我的学习
{
 path:"/mystudy",
 name:"mystudy",
 component:()=>{
  return import("@/components/my/MyStudy")

 },
 meta:{
   title:"我的学习"
 }

},

// 立即学习
{
  path:"/study",
  name:"study",
  component:()=>{
    return import("@/components/Couser/Study")
  },
  meta:{
    title:"学习详情"
  }
},

// 确认订单
{
  path:"/confirmOrder",
  name:"confirmOrder",
  component:()=>{
    return import("@/components/Couser/ConfirmOrder")
  },
  meta:{
    title:"确认订单"
  }
},

// 我的订单
{
  path:"/myorder",
  name:"myorder",
  component:function(){
         return import("@/components/my/MyOrder")
  },
  meta:{
    title:"我的订单"
  }
 
},

//  我的关注
  {
   path:"/my-attention",
   name:"MyAttention",
   component:function(){
     return import("@/components/my/MyAttention")
   },
  meta:{
   title:"我的关注"
  }

  },


// 我的收藏
{
  path:"/my-collect",
  name:"MyCollect",
  component:function(){
    return import("@/components/my/MyCollect")
  },
 meta:{
  title:"我的收藏"
 }

 },
// 我的余额
{
  path:"/mybalance",
  name:"MyBalance",
  component:function(){
    return import("@/components/my/MyBalance")
  },
 meta:{
  title:"我的余额"
 }

 },
{
  path:"/mingxi",
  name:"Mingxi",
  component:function(){
    return import("@/components/my/mingxi")
  },
 meta:{
  title:"余额明细"
 }

 },

  {
      path: "/xiaoxi", //我的消息
      name: "xiaoxi",
      component: function () {
        return import("@/components/myChild/xiaoxi.vue")
      },
      meta: {
        title: '消息通知',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },
    {
      path: "/yijian", //系统通知
      name: "yijian",
      component: function () {
        return import("@/components/myChild/yijian.vue")
      },
      meta: {
        title: '意见反馈',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },
    {
      path: "/kechengTz", //课程通知
      name: "kechengTz",
      component: function () {
        return import("@/components/myChild/kechengTz.vue")
      },
      meta: {
        title: '课程通知',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },
    {
      path: "/xitongTz", //系统通知
      name: "xitongTz",
      component: function () {
        return import("@/components/myChild/xitongTz.vue")
      },
      meta: {
        title: '系统通知',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },
    {
      path: "/dingdanTz", //订单通知
      name: "dingdanTz",
      component: function () {
        return import("@/components/myChild/dingdanTz.vue")
      },
      meta: {
        title: '订单通知',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },
    {
      path: "/yuekeTz", //约课通知
      name: "yuekeTz",
      component: function () {
        return import("@/components/myChild/yuekeTz.vue")
      },
      meta: {
        title: '约课通知',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },
    {
      path: "/kaoshiTz", //考试通知
      name: "kaoshiTz",
      component: function () {
        return import("@/components/myChild/kaoshiTz.vue")
      },
      meta: {
        title: '考试通知',
        isShowNav: true,
        isShowLeft: true,
        isShowRight: false,
      }
    },

  

  // 一对一辅导
  {
    path:"/oto",
    name:"oto",
    meta:{
      title:"一对一辅导"
    },
    component:function(){
      return import("@/components/Couser/Oto.vue")
    },
    
  },

  
// 登录路由
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("@/views/login/Login.vue")
    },
    meta:{
      title:"登录"
    }
  },

  {
    path: "/retrieve",//找回密码页面
    name: "Retrieve",
    meta:{
      title:"找回密码"
    },
    component: function () {
      return import("@/views/login/Retrieve.vue")
    },
  },
  {
    path: "/setPass",//设置密码页面
    name: "SetPass",
    meta:{
      title:"设置密码"
    },
    component: function () {
      return import("@/views/login/Setpass.vue")
    },
  },
 
  // 课程详情
  {
    path: '/couserDetail',
    name: 'couserDetail',
    meta:{
      title:"课程详情"
    },
    component: function () {
      return import('../components/Couser/couserDetail.vue')
    }
  },

// 登录路由
{
  path: "/login",
  name: "login",
  component: function () {
    return import("@/views/login/Login.vue")
  },
},

{
  path: "/retrieve", //找回密码页面
  name: "Retrieve",
  component: function () {
    return import("@/views/login/Retrieve.vue")
  },
},
 {
  path: "/setPass", //设置密码页面
  name: "SetPass",
  component: function () {
    return import("@/views/login/Setpass.vue")
  },
}, 
{
  path: "/setPerson", //登录设置密码页面
  name: "SetPerson",
  component: function () {
    return import("@/views/login/SetPerson.vue")
  },
  meta: {
    title: '设置'
  }
},
{
  path: "/mySet", //我的设置密码页面
  name: "MySet",
  component: function () {
    return import("@/components/myChild/MySet.vue")
  },
  meta: {
    title: '设置密码'
  }
}, 
{
  path: "/changepass", //改变密码
  name: "Changepass",
  component: function () {
    return import("@/components/myChild/ChangePass.vue")
  },
  meta: {
    title: '修改密码'
  }
}, 
{
  path: "/personal", //修改个人信息
  name: "Personal",
  component: function () {
    return import("@/components/myChild/Personal.vue")
  },
  meta: {
    title: '修改个人信息'
  }
},
// 修改个人信息下的小页面
{
  path: "/changeName", //修改个人信息
  name: "ChangeName",
  component: function () {
    return import("@/components/myChild/ChangeName.vue")
  },
  meta: {
    title: '修改个人信息'
  }
},

{
  path: "/changeSex", //修改个人信息
  name: "ChangeSex",
  component: function () {
    return import("@/components/myChild/ChangeSex.vue")
  },
  meta: {
    title: '修改个人信息'
  }
},

{
  path: "/changeSubject", //修改个人信息
  name: "ChangeSubject",
  component: function () {
    return import("@/components/myChild/ChangeSubject.vue")
  },
  meta: {
    title: '修改个人信息'
  }
},



// 课程详情
{
  path: '/couserDetail',
  name: 'couserDetail',
  component: function () {
    return import('../components/Couser/couserDetail.vue')
  }
},



//练习下面的小页面
  {
    path: '/oneElect',//考点专练下的第一个页面
    name: "oneElect",
    component: () => import('../views/Exercise/one_elect.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "考点专练"
    }
  },
  //练习下的九宫格里的搜索页面
  {
    path: '/exerciseSearch',//考点专练下的第一个页面
    name: "exerciseSearch",
    component: () => import('../views/Exercise/exercise_search.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "考点专练"
    }
  },
  {
    path: '/fourAll',//考点专练下的第一个页面
    name: "fourAll",
    component: () => import('../views/Exercise/four_all.vue'),

  },
  {
    path: '/one',//考点专练下的第二个页面
    name: "one",
    component: () => import('../views/Exercise/one.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "题库选择"
    }
  },
  {
    path: '/two',//套卷练习下的第一个页面
    name: "two",
    component: () => import('../views/Exercise/two.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "套卷练习"
    }
  },
  {
    path: '/three',//仿真模考下的第一个页面
    name: "three",
    component: () => import('../views/Exercise/three.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "仿真模考"
    }
  },
  {
    path: '/four',//错题练习下的第一个页面
    name: "four",
    component: () => import('../views/Exercise/four.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "错题练习"
    }
  },
  {
    path: '/five',//测评记录下的第一个页面
    name: "five",
    component: () => import('../views/Exercise/five.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "测评记录"
    }
  },
  {
    path: '/six',//习题收藏下的第一个页面
    name: "six",
    component: () => import('../views/Exercise/six.vue'),
    meta: {
      isShowNav: true,
      isShowLeft:true,
      isShowRight:true,
      title: "习题收藏"
    }
  },



 //学习日历
  {
    path: '/date',
    name: 'date',
    component: function () {
      return import('../components/Couser/Date.vue')
    },
    meta:{
      isShowNav: true,
      isShowLeft:true,
      isShowRight:false,
      title:"学习日历"
    }
  },



 {
  path: '/yuyue',
  name: 'Yuyue',
  component: function () {
    return import('../components/Couser/Yuyue.vue')
  },
  meta:{
    title:"预约课程"
  },
},

  {
    path: '/teacher',  //讲师详情
    name: 'Teacher',
    meta:{
      title:"讲师详情"
    },
    component: function () {
      return import('../components/Couser/Teacher.vue')
    }
  },
  {
    path: '/yuyue',  //预约
    name: 'Yuyue',
    meta:{
      title:"预约"
    },
    component: function () {
      return import('../components/Couser/Yuyue.vue')
    }
  },
 

]


const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})



export default router