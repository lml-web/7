<template>
  <div class="yuyue">
    <div class="header">
      <header>
        <span>
          <van-icon name="arrow-left" size="0.3rem" @click="$router.go(-1)" />
        </span>
        <h3>预约课程</h3>
      </header>
    </div>
    <section>
      <div class="xiang">
        <div class="top">
          <img
            data-v-0da794c7=""
            alt=""
            :src="teacherInfo.avatar"
          />
          <div class="zi">
            <p>
              <span>{{teacherInfo.teacher_name}}</span>
            </p>
            <p>
              <span>{{teacherInfo.sex | sex}}</span>
              <span>{{teacherInfo.teach_age}}年教龄</span>
            </p>
          </div>
          <van-button
            round
            type="info"
            color="#EB6100"
            plain
            @click="$router.go(-1)"
            >查看详情</van-button
          >
        </div>
      </div>

      <div class="list">
        <div class="list_title">
          <p class="red_title"></p>
          <span>选择时间 （北京时间）</span>
        </div>
        
        <div class="date">
          
        <ul >
        
           <li @click="changeTime(i.isdisabled,i.day,k)" :style="{'color':i.isdisabled?'#B7B7B7':''}"  :class="{'dateActive':k==isActive}" v-for="(i,k) in dayList" :key="k">
             <p>{{i.week }}</p>
             <p>{{i.day}}</p>
           </li>
        </ul>
        </div>
       
        <div v-show="list.length==0"  class="empty">
          <img data-v-0fa74510="" src="https://wap.365msmk.com/img/empty.0d284c2e.png" />
          <p data-v-0fa74510="">暂无信息</p>
        </div>
      </div>
    </section>

    <footer @click="lijiyuyue">立即预约</footer>
  </div>
</template>

<script>
import {teacher,invite,selectTime} from "@/utils/api"
export default {
  // 组件名称
  name: "",
  // 组件参数 接收来自父组件的数据
  props: [],
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      list: [], //课程列表
      teacherInfo:"",
      day:new Date(),
      dayList:[],
      isActive:""
    };
  },
  // 计算属性
  computed: {
    nowtime(){
        
        let month=new Date(this.day).getMonth()
 let date=new Date(this.day).getDate()
 console.log( month+'/'+date)
 return  month+'/'+date
    },
    
  

  },
  // 侦听器
  watch: {
    
  },
  // 组件方法
  methods: {

    // 获取老师信息
     async getteacher(){
      let {data} = await teacher(this.$route.query.yuyueId)
      this.teacherInfo=data.teacher
      console.log(data)
    },

    // 选择时间
   async changeTime(i,k,index){

      if(i){
        return false
      }
     this.isActive=index
      this.dayList[index].isActive=true
      // console.log(k)
     
     let res = await selectTime({teacher_id: "3", week_day: new Date(k).getDate(), is_next: 0})
     
    //  console.log(res)

    },

    // 立即预约
    lijiyuyue(){

      this.$toast("请选择预约时间")

    },

    // 获取时间列表
    async getTime(){
     
      let res = await invite({teacher_id:this.$route.query.yuyueId , week_day: this.day.getDay(), is_next: 0})
        
      // console.log(res)
      
      this.dayList=res.data.weekDateList
      let year=new Date().getFullYear()+'/'
      // 转换日期格式
      this.dayList=  this.dayList.map((res)=>{

        return year+res.replace('月','/').replace('日','')
      })
      // console.log(this.dayList)
      
     
      // 添加后一个星期时间
      let num=new Date(this.dayList[6])
     console.log(num)
      for( let i=1 ; i<8; i++){
          
          this.dayList.push(new Date(num.getTime()+i*1000*60*60*24))

      }
     
      let weekArr=["周日","周一","周二","周三","周四","周五","周六"]
      this.dayList= this.dayList.map((res)=>{

         
         return {
           week:weekArr[new Date(res).getDay()],
           day:new Date(res).getMonth()+'/'+new Date(res).getDate(),
           isdisabled:new Date(res).getDate()<new Date().getDate(),
         
         }
          
         

      })
      console.log( this.dayList)

     this.isActive= this.dayList.findIndex((res)=>{
        return new Date(res.day).getDate()==new Date().getDate()
      })


        
      console.log(this.dayList)
    


    }
  },
  
  mounted() {
    
        this,this.getteacher()
        this.getTime()

  },
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.yuyue {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  height: 1.2rem;
  background: linear-gradient(180deg, #63b7fe, #4e7de3);
  color: white;
  header {
    width: 100%;
    height: 0.5rem;
    display: flex;
    box-sizing: border-box;
    padding: 0 0.2rem;
    align-items: center;
    h3 {
      width: 3.3rem;
      text-align: center;
    }
  }
}
section {
  flex: 1;
  .xiang {
    width: 94%;
    // height: 1.4rem;
    background: white;
    box-sizing: border-box;
    margin: -0.7rem auto 0;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    border-radius: 0.05rem;
    .top {
      width: 100%;
      height: 0.88rem;
      display: flex;
      align-items: center;
      img {
        width: 0.43rem;
        margin-right: 0.1rem;
      }
      .zi {
        flex: 1;
        :nth-child(1) {
          height: 0.3rem;
          line-height: 0.3rem;
          :nth-child(2) {
            color: red;
            font-size: 0.12rem;
            margin-left: 0.1rem;
          }
        }
        :nth-child(2) {
          font-size: 0.12rem;
          color: #8c8c8c;
        }
      }
      // button {
      //   width: 0.7rem;
      //   height: 0.3rem;
      //   color: orange;
      //   border-radius: 0.15rem;
      //   background: #ccc;
      //   font-size: 0.12rem;
      //   border: none;
      // }
    }
  }
}

// 列表区域
.list {
  flex: 1;
  padding: 0.1rem;
  .list_title {
    margin-top: 0.1rem;
    width: 100%;
    height: 0.18rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.2rem;
    .red_title {
      width: 0.03rem;
      height: 100%;
      background: red;
    }
    > :nth-child(2) {
      font-size: 0.16rem;
      margin-left: 0.1rem;
    }
  }
  
  .date{
    width: 100%;
    height: 0.8rem;
    background: white;
    
    overflow: auto;
    ul{
      min-width: 101%;
      height: 100%;
      display: flex;
    li{
      width: 0.61rem !important;
      height: 0.67rem;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
     padding-left: 0.3rem;
      p{
        width: 0.61rem;
        font-size: 0.14rem;
        text-align: center;
        ;
      }
    }
    .dateActive{
     color: red;
    }
    }

  }

  .empty{
   width: 100%;
   height: 2.32rem;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   img{
     width: 1.64rem;
   }
   p{
     font-size: 0.16rem;
   }
  }

}

footer {
  width: 100%;
  height: 0.5rem;
  background: #ea7a2f;
  color: white;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.2rem;
}
</style>
