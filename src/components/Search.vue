<template>
  <div class="search">
    <header>
      <van-icon @click="$router.go(-1)" name="arrow-left" />
      <input v-model="query.keywords" type="text" placeholder="请输入内容" />
      <p v-show="query.keywords == ''">取消</p>
      <p @click="getSearchList" v-show="query.keywords != ''">搜索</p>
    </header>

    <div v-show="query.keywords == ''" class="history">
      <div>
        <p>历史搜索</p>
        <i @click="clear" class="el-icon-delete"></i>
      </div>
      <ul>
        <li @click="keys(i)" v-for="(i, k) in historyList" :key="k">
          {{ i }}
        </li>
      </ul>
    </div>

           <!-- 中间课程 -->
    <section v-show="this.list.length>0">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offsetTop"
        :immediate-check="false"
        @load="onLoad"
      >
        <van-cell v-for="(item, index) in list" :key="index">
          <div @click="$router.push('/couserDetail?couserDetailId=' + item.id)">
            <p class="title">{{ item.title }}</p>
            <div class="time">
              <van-icon name="clock-o" style="margin-right: 0.1rem" />
              <span
                >{{ item.start_play_date | time }} ~
                {{ item.end_play_date | time }}</span
              >
              <span style="margin-left: 0.1rem; margin-right: 0.1rem">|</span>
              <span>共{{ item.total_periods }}课时</span>
            </div>
            <div class="tou" v-for="(i, k) in item.teachers_list" :key="k">
              <p>
                 <img :src="i.teacher_avatar" alt />
              <span>{{ i.teacher_name }}</span>
              </p>
             
              <img v-show="item.has_buy==1" src="@/assets/img/has_buy.png" alt="">
            </div>
            <p class="section_p">
              <span>{{ item.sales_num }}人已报名</span>
              <span style="color: green; font-size: 0.18rem">免费</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </section>

    </div>

</template>

<script>
import { all } from "@/utils/api";

export default {
  name: "search", //搜索
  data() {
    return {
      historyList:JSON.parse(localStorage.getItem("SearchHistory")) || [],
      offsetTop:0,
      query:{
           limit: 10,
        page: 1,
        course_type: 0,
        keywords:""
      },
      total:"",
       loading: false,
      finished: false,
      list:[]
    };
  },
  

  watch: {
    historyList(val) {
      
      localStorage.setItem("SearchHistory",JSON.stringify(val))

    },
  },
  filters: {
    time: function (val) {
      var obj = new Date(val);
      // 月
      var month = (obj.getMonth() + 1).toString().padStart(2, "0");
      // 日
      var day = obj.getDate().toString().padStart(2, "0");
      // 时
      var hour = obj.getHours().toString().padStart(2, "0");
      // 分
      var minute = obj.getMinutes().toString().padStart(2, "0");
      return month + "月" + day + "日" + " " + hour + ":" + minute;
    },
  },
  mounted() {},
  beforeRouteLeave(to,from,next){
     
    
    let ispush= this.historyList.findIndex((res)=>{
         return res==this.query.keywords
     })
     if(ispush==-1){
        this.historyList.unshift(this.query.keywords)
     }
     if(this.historyList.length>5){
       this.historyList.pop()
     }

     console.log(ispush,this.historyList)
     localStorage.setItem("SearchHistory",JSON.stringify(this.historyList))
      next()
  },
  methods: {
     

    keys(i){
             this.query.keywords=i
    },

    // 删除历史记录
    clear(){

        this.historyList=[]

    },

    //    搜索数据
    async getSearchList() {
      let res = await all(
       this.query
      );

      console.log(res)
      this.list=res.data.list
      this.total=res.data.total

    },
   
//    触底加载

    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        if (this.query.limit < this.total) {
          this.query.limit+=5;
          this.getSearchList();
        } else {
          this.finished = true;
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= this.total) {
          this.finished = true;
        }
      }, 1000);
    },

  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  height: 0.5rem;
  background: white;
  display: flex;
  padding: 0.06 0.2rem;
//   margin-bottom: 0.2rem;
  align-items: center;
  justify-content: space-around;
  border-bottom: 0.02rem #eaeaea solid;
  > :nth-child(1) {
    font-size: 0.26rem;
    font-weight: bold;
    margin-left: 0.1rem;
  }
  > :nth-child(2) {
    width: 3rem;
    height: 0.38rem;
    outline: none;
    border: 0;
    border-radius: 0.15rem;

    background: #e4e7ed;
    display: flex;
    align-items: center;
    text-indent: 0.25rem;
    font-size: 0.2rem;
  }
  > :nth-child(3) {
    font-size: 0.2rem;
    color: #d2d2d1;
    //   margin-right: 0.2rem;
  }
  > :nth-child(4) {
    font-size: 0.2rem;
    font-weight: bold;
  }
}

// 历史搜搜记录
.history {
  flex: 1;
  margin-top: 0.3rem;
  padding: 0 0.16rem;
  > :nth-child(1) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > :nth-child(1) {
      font-size: 0.2rem;
      font-weight: bold;
    }
    > :nth-child(2) {
      font-size: 0.2rem;
    }
  }

  > :nth-child(2) {
    width: 100%;
    display: flex;
    margin-top: 0.2rem;
    li {
      padding: 0.1rem;
      background: #f7f7f7;
      display: flex;
      height: 0.28rem;
      justify-content: center;
      align-items: center;
      font-size: 0.16rem;
      border-radius: 0.14rem;
      margin-right: 0.1rem;
    }
  }
}

section {
  flex: 1;
  background: #F0F2F5;
  overflow: auto;
  padding-top: 0.2rem;
}

.van-list {
  width: 100%;
  min-height: 101%;
  padding: 0.15rem 0.15rem;
}
.van-cell {
  width: 100%;

  // height: 1.9rem;
  background: white;
  box-sizing: border-box;
  padding: 0 0.15rem;
  margin-bottom: 0.15rem !important;
  border-radius: 0.05rem;
  padding-top: 0.15rem;
  .title{
      font-size: 0.2rem !important;
  }
  .time {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    font-size: 0.12rem;
    color: #666666;
  }
  .tou {
    width: 3.5rem;
    height: 0.8rem;
    display: flex;
    font-size: 0.12rem;
    align-items: center;
    color: #666666;
    display: flex;
    justify-content: space-between;
    >:nth-child(2){
      width: 0.72rem;
      height: 0.59rem;
    }
    p{
      width: 0.9rem;
      height: 100%;
      display: flex;
      align-items: center;
       img {
      width: 0.3rem;
      height: 0.3rem;
      border-radius: 50%;
      margin-right: 0.1rem;
    }
    }
   
  }
  .section_p {
    width: 100%;
    height: 0.5rem;
    // background: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f0f2f5;
    span {
      font-size: 0.12rem;
      color: #666666;
    }
  }
}
</style>
