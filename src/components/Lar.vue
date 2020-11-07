<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar title="约课记录" />
    <!-- 选项卡 -->
    <van-tabs v-model="active" title-active-color="orangered">
      <van-tab title="待上课">
        <van-empty
          class="custom-image"
          image="https://wap.365msmk.com/img/no-message.8d3ca5af.png"
          description="还没有待上课记录哦"
          image-size="1.78rem"
         
        >
       
        <van-button @click="onLogin" v-show="show" class="bottom-button">
            立即登录
          </van-button>
          <van-button @click="onChange" v-show="!show" class="bottom-button">
            立即约课
          </van-button>
        </van-empty>
      </van-tab>
      <van-tab title="已上课">
        <van-empty
          class="custom-image"
          image="https://wap.365msmk.com/img/no-message.8d3ca5af.png"
          description="还没有上课记录哦"
          image-size="1.78rem"
        >
         <van-button @click="onLogin" v-show="show" class="bottom-button">
            立即登录
          </van-button>
          <van-button @click="onChange" v-show="!show" class="bottom-button">
            立即约课
          </van-button>
        </van-empty>
      </van-tab>
      <van-tab title="已取消">
          <van-empty
          class="custom-image"
         image="https://wap.365msmk.com/img/no-message.8d3ca5af.png"
          description="还没有取消上课记录哦"
          image-size="1.78rem"
        />
        
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "0",
      show:true
    };
  },
  created() {},
  mounted() {
    var token = localStorage.getItem("Token")
    if(token == null){
      this.show = true;
    }else if(token){
      this.show = false
    }
  },
  methods: {
      //点击跳转到一对一辅导
      onLogin(){
          this.$router.push("/login")
      },
      onChange(){
           this.$router.push("/oto")
      }
  },
};
</script>

<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
.van-button{
    background: orangered;
    color: white;
}
 .custom-image{
   margin-top:1rem ;
    
  }
</style>

