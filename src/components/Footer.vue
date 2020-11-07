<template>
  <div>
    
    <ul class="footer-content">
        <li :class="i.path==$route.path?'active':''"  @click="to(i.path)" v-for="(i,k) in Footer_font" :key="k">
           <i :class="i.font"></i>
            <p>{{i.text}}</p>
        </li>
    </ul>
  
  </div>
</template>


<script>
export default {
  name: "Footer",
  data() {
    return {
          
          Footer_font:[
              {
                  font:"iconfont icon-xiaoyuan-",
                  text:"首页",
                  path:"/index",
              },
               {
                  font:"iconfont icon-kecheng",
                  text:"课程",
                  path:"/couser"
              },
               {
                  font:"iconfont icon-jilu",
                  text:"约课记录",
                  path:"/lar"
              },
               {
                  font:"iconfont icon-lianxi",
                  text:"练习",
                  path:"/exercise"
              },
               {
                  font:"iconfont icon-wodedangxuan",
                  path:"/my",
                   text:"我的",
              }
          ]
        
    };
  },
  created() {},
  mounted() {
      console.log(this.$route)
  },
  methods: {
     
     to(path){ //跳转路由
         
         this.$router.push({
             path:path
         })

     }

  },
};
</script>

<style lang="scss" scoped>
.footer-content{
    width: 100%;
    height: 0.55rem;
    z-index: 9999;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: white;
    li{
        width: 0.82rem;
        height: 0.54rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #B7B7B7;
        i{
           font-size: 0.22rem;
        }
        p{
            font-size: 0.14rem;
        }
       
    }
}
 .active{
    color: red !important;
}
</style>
