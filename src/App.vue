<template>
  <div id="app">
        <p v-show="toastShow" class="toast">留言失败,请下辈子再试</p>
    
   <router-view ></router-view>

   <!-- 留言 -->
    <p v-drag class="liuyan" @click=" kefu"><i style="" class="el-icon-message"></i></p>
   
   <!-- 留言页面 -->
   <div v-show="messageShow" class="message">
       
       <header>
         <p>给我们留言</p>
         <i @click=" kefu" class="el-icon-arrow-down"></i>
       </header>

        <p class="tishi">
          您好，很抱歉我们暂时无法为您提供服务，如需帮助，请留言，我们将尽快联系并解决您的问题
        </p>

        <div class="from">
          <p>手机</p>
          <input type="text" placeholder="请输入">
           <p>留言内容</p>
           <textarea name="" id="" cols="30" rows="10"></textarea>
           <button @click="submitLiuyan">提交</button>
        </div>
   </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  data(){
    return {
      toastShow:false
    }
  },
  methods:{
    kefu(){ //显示隐藏留言
        this.$store.commit("changeShow")
    },
    
    submitLiuyan(){ // 留言 
      
      this.toastShow=true

      setTimeout(()=>{
        this.toastShow=false
      },1500)
     
    }

   
  },
   computed:{

      messageShow(){
        return this.$store.state.show
      }

    }
  
}
</script>

<style lang="scss">

.toast{
  width: 2rem;
  height: 0.4rem;
  background:rgba(0, 0, 0, 0.8);
  position: absolute;
  z-index: 9999999999999999;
  top: 30%;
  left: 50%;
  margin-left: -1rem;
  margin-top: -0.2rem;
  font-size: 0.16rem;
  color: white;
  text-align: center;
  line-height: 0.4rem;
}

.liuyan{
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 50%;
  background: #007AFF;
  position: absolute;
  bottom:0.82rem ;
  right: 0.3rem;
  display: flex;
  z-index: 10000000;
  justify-content: center;
  align-items: center;
  i{
        font-size: 0.26rem;
       color: white;
  }
}

// 留言页面
.message{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10000000;
  background:#F2F3F5;
  top: 0;
  header{
    width: 100%;
    height: 0.6rem;
    background: #007AFF;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.14rem;
    color: white;
    i{
      font-size: 0.2rem;
    }
  }
}

// 提示
.tishi{
  width: 100%;
  height: 0.62rem;
  font-size: 0.12rem;
  padding: 0.2rem;
  display: flex;
  align-items: center;
}

// 表单
.from{
  width: 100%;
  >:nth-child(1){
    margin-left: 0.2rem;
    font-size: 0.12rem;
    margin-bottom: 0.1rem;
  }
  >:nth-child(2){
    width: 100%;
    height: 0.39rem;
  
    font-size: 0.12rem;
    border: 0;
    background: white;
   text-indent: 0.2rem;
   font-size: 0.12rem;
   outline: none;
  }
   >:nth-child(3){
    margin-left: 0.2rem;
    font-size: 0.12rem;
    margin-top: 0.3rem;
    margin-bottom: 0.1rem;
  }
  >:nth-child(4){
    width: 100%;
   height: 0.9rem;
    font-size: 0.12rem;
    border: 0;
    background: white;
   text-indent: 0.1rem;
   font-size: 0.12rem;
   outline: none;
   padding: 0.1rem;
  }
  button{
    width:3.7rem ;
    height: 0.4rem;
    background: #007AFF;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.14rem;
    margin-left: 0.2rem;
    border: 0;
    margin-top: 0.2rem;
  }
}
</style>
