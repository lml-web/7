<template>
  <div class="Text">
    <!-- 头部 -->
    <van-sticky>
      <header>
        <van-icon @click="$router.go(-1)" name="arrow-left" />
        <span v-show="titleStatus > 0"
          ><a
            @click="titleStatus = 1"
            :class="{ titleActive: titleStatus == 1 }"
            href="#jieshao"
            >课程介绍</a
          ></span
        >
        <span v-show="titleStatus > 0"
          ><a
            @clickt="titleStatus = 2"
            :class="{ titleActive: titleStatus == 2 }"
            href="#dagang"
            >课程大纲</a
          ></span
        >
        <span v-show="titleStatus > 0"
          ><a
            @click="titleStatus = 3"
            :class="{ titleActive: titleStatus == 3 }"
            href="#pinglun"
            >课程评价</a
          ></span
        >
        <p v-if="titleStatus == 0">课程详情</p>
        <i @click="share" class="el-icon-share"></i>
      </header>
    </van-sticky>
    <!-- 中间 -->
    <section @scroll.passive="getScroll($event)" id="section">
      <div class="content" id="content">
        <!-- 第一块 -->
        <div class="top">
          <p class="arr_title">{{ arr.title }}</p>
          <p>
            <van-icon
              v-show="is_collect == 0"
              @click="isCollect"
              name="star-o"
              size="0.25rem"
            />
            <van-icon
              @click="cancel_collect"
              v-show="is_collect == 1"
              color="#FC5500"
              name="star"
            />
          </p>

          <span>免费</span>
          <p class="p1">
            <span>共{{ arr.total_periods }}课时</span>
            <span style="margin: 0 0.1rem">|</span>
            <span>{{ arr.sales_num }}人已报名</span>
          </p>
          <p class="p1">
            开课时间：{{ arr.start_play_date }} ~ {{ arr.end_play_date }}
          </p>
        </div>
        <!-- 第二块 -->
        <div class="bottom">
          <p>教学团队</p>
          <div class="tou" v-for="(item, index) in arr1" :key="index">
            <div class="xiang" @click="goto(item.teacher_id)">
              <img :src="item.avatar" alt />
              <span>{{ item.teacher_name }}</span>
            </div>
          </div>
        </div>
        <!-- 课程介绍 -->
        <div id="jieshao" ref="jieshao" class="jieshao">
          <p>课程介绍</p>
          <p style="fontSize:0.16rem; margin:0.1rem 0;">{{ arr.course_statement }}</p>
        </div>
        <!-- 课程大纲 -->
        <div id="dagang" ref="dagang" class="gang">
          <p>课程大纲</p>
          <div class="gang_list">
            <ul v-for="(item, index) in arr3" :key="index">
              <li @click="jumpVideo(item.video_id)">
                <div>
                  <span class="dian"></span>
                  <span class="hui">回放</span>
                  <span>{{ item.periods_title }}</span>
                </div>
                <p>
                  <span
                    style="margin-right: 0.18rem"
                    v-for="(i, k) in item.teachers"
                    :key="k"
                    >{{ i.teacher_name }}</span
                  >
                  <span>{{ item.start_play }}</span> ~
                  <span>{{ item.end_play }}</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 课程评论-->
        <div id="pinglun" ref="pinglun" class="lun">
          <p>课程评论</p>
          <div class="ping">
            <ul>
              <li v-for="(item, index) in arr4" :key="index">
                <div class="tu">
                  <img :src="item.avatar" alt />
                </div>
                <div class="zi">
                  <p>
                    <span style="margin-right: 0.1rem; font-size: 0.14rem">{{
                      item.nickname
                    }}</span>
                    <van-rate
                      v-model="item.grade"
                      readonly
                      size="0.14rem"
                      color="#ea7a2f"
                    ></van-rate>
                    <span>{{ item.created_at }}</span>
                  </p>
                  <p
                    style="
                      margin-top: 0.1rem;
                      color: #8c8c8c;
                      font-size: 0.12rem;
                    "
                  >
                    {{ item.content }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- 尾部立即报名 -->
    <footer @click="apply()" v-show="arr.is_buy == 0">立即报名</footer>
    <footer @click="study()" v-show="arr.is_buy == 1">立即学习</footer>

    <!-- 分享二维码 -->
    <van-overlay :show="show" @click="close">
      <div class="wrapper" >
        <div class="block" @click.stop>
          <p>分享</p>
          <p id="qrcode" ref="qrcode"></p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>

    import QRCode from 'qrcodejs2'
import { first, two, treen, cancelCollect, applyApi,downOrder } from "../../utils/api";
import axios from "axios";
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
      kai: true,
      titleStatus: 0,
      top: 0,
      show: false,
      flag: true,
      id: this.$route.query.couserDetailId||localStorage.getItem("couserDetailId"), //传过来的id
      arr: [], //课程内容
      arr1: [], //头像内容
      arr3: [], //课程大纲
      arr4: [], //课程评论
      page: 1, //第几页
      limit: 10, //数量
      is_collect: 0, //是否收藏
    };
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    getscroll(val) {
      console.log(val);
    },
    
  },
  
  beforeRouteLeave(to,from,next){
      
      if(localStorage.Token&&to.path=="/login"){
         
         next("/couser")

      }
      next()

  },

  // 组件方法
  methods: {
    getScroll(event) {
      let jieshao = this.$refs.jieshao.offsetTop - 60;
      // console.log(jieshao);
      let dagang = this.$refs.dagang.offsetTop - 60;
      let pinglun = this.$refs.pinglun.offsetTop - 0;
      let top = event.target.scrollTop;

      if (top > 10 && top < jieshao) {
        this.titleStatus = 1;
      } else if (top > dagang && top < pinglun) {
        this.titleStatus = 2;
      } else if (top > pinglun) {
        this.titleStatus = 3;
      } else if (top < 10) {
        this.titleStatus = 0;
      }
      // console.log(top, jieshao, dagang, pinglun);
    },

    // 跳转到视频
    jumpVideo(id){

      window.location.href=`https://b62268033.at.baijiayun.com/web/playback/index?classid=${id}&token=b2ltdBu3G_n2k75tP5p2wGpyIBOrBvGKGDJWXfIa-xME3WuzF8STARlHfN6_xDNX3EqSkiDSYgg`

    },

    // 分享
    share() {
      this.show=true
      let qrcode = new QRCode("qrcode", {
        width: 160, // 设置宽度，单位像素
        height: 160, // 设置高度，单位像素
        text: "https://www.baidu.com", // 设置二维码内容或跳转地址
      });

      console.log(qrcode);
    },

    close(){
            this.show=false
            // alert("44")
    },

    // 收藏
    async isCollect() {
      let res = await this.$http.post("/api/app/collect", {
        course_basis_id: this.id,
        type: 1,
      });

      console.log(res);
      if (res.code == 200) {
        this.couserInfo();
        this.$toast.success("收藏成功");
      }
    },

    //  取消收藏
    async cancel_collect() {
      let res = await cancelCollect(this.arr.collect_id);
      if (res.code == 200) {
        this.$toast("已取消收藏");
        this.couserInfo();
      }
      console.log(res);
    },

    // 立即报名
    async apply() {
      // this.$router.push({
        //跳转到确认订单页面
      //   path: "/confirmOrder",
      //   query: {
      //     confirmOrderId: this.id,
      //   },
       let res = await downOrder(
           {shop_id:this.id, type: "3"}
        )
        console.log(res)
        if(res.code==201){
          this.$toast(res.msg)
          this.couserInfo()
        }else if(res.code==200){
          this.$toast(res.data.msg)

        }

       
      // });
    },

    // 立即学习
    study() {
      this.$router.push(`/study?course_id=${this.id}`);
    },

    async couserInfo() {
      // 课程内容
      let { data } = await first("/courseInfo/basis_id=" + this.id);
      console.log(data);
      this.arr = data.info;
      this.is_collect = data.info.is_collect;
      this.arr1 = data.teachers;
    },

    async courseChapter() {
      // 课程大纲
      let { data: res } = await two("/courseChapter", { id: this.id });
      console.log(res);
      this.arr3 = res;
    },
    async courseComment() {
      // 课程评论
      let { data: lun } = await treen("/courseComment", {
        page: 1,
        limit: 10,
        id: this.id,
      });
      console.log(lun);
      this.arr4 = lun.list;
    },
    goto(id) {
      if (localStorage.Token) {
        this.$router.push("/teacher?teacherId=" + id);
      } else {
        this.$router.push("/login");
      }
    },
  },
  created() {},
  /**
 /**
 * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
 * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
 */
  mounted() {
    this.couserInfo();
    this.courseChapter();
    this.courseComment();
     localStorage.setItem("couserDetailId",this.id)
  },
};
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--使用了scoped属性之后，父组件的style样式将不会渗透到子组件中，-->
<!--然而子组件的根节点元素会同时被设置了scoped的父css样式和设置了scoped的子css样式影响，-->
<!--这么设计的目的是父组件可以对子组件根元素进行布局。-->
<style scoped lang="scss">
.Text {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
  display: flex;
  flex-direction: column;
  // overflow: auto;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 3.2rem;
    height: 2.6rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.2rem;
    >:nth-child(1){
      width: 100%;
      height: 0.4rem;
      text-align: center;
      font-size: 0.25rem;
      line-height: 0.6rem;
    }
     >:nth-child(2){
      width: 100%;
      display: flex;
      justify-content: center;
      height: 2.2rem;
      align-items: center;
      img{
        width:1.8rem !important;
        height: 1.8rem  !important;
      }
    }
  }

// 头部布局
header {
  height: 0.5rem;
  width: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 0 0.1rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0.2rem;
  background: white;
  border-bottom: 1px solid #f1f1f1;

  .titleActive {
    font-size: 0.2rem;
    font-weight: bold;
    color: #333333;
  }
  a {
    font-size: 0.16rem;
    color: #8c8c8c;
    text-decoration: none;
  }
}

// 中间第一块
section {
  flex: 1;
  overflow: auto;
}
.content {
  width: 100%;
  min-height: 101%;
  box-sizing: border-box;
  overflow: auto;
  .top {
    width: 100%;
    box-sizing: border-box;
    padding: 0.15rem 0.15rem;
    background: white;
    position: relative;
    > :nth-child(2) {
      position: absolute;
      right: 0.2rem;
      top: 0rem;
      font-size: 0.16rem;
      .van-icon {
        width: 0.5rm;
        height: 0.5rem;
        font-size: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    > :nth-child(1) {
      width: 3rem;
      font-size: 0.16rem;
    }

    > span {
      display: block;
      color: orange;
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.2rem;
    }
    > .p1 {
      height: 0.3rem;
      font-size: 0.16rem;
      color: #8c8c8c;
    }
  }
  // 第二块
  .bottom {
    background: white;
    width: 100%;
    margin-top: 0.2rem;
    box-sizing: border-box;
    padding: 0.2rem 0.1rem;
    .tou {
      width: 100%;
      height: 1rem;
      .xiang {
        width: 0.8rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 0.2rem 0.1rem;
        align-items: center;
        img {
          width: 0.4rem;
          height: 0.4rem;
          margin-bottom: 0.1rem;
        }
      }
    }
  }
  // 课程介绍
  .jieshao {
    width: 100%;
    // height: 0.8rem;
    background: white;
    margin-top: 0.2rem;
    box-sizing: border-box;
    padding: 0.1rem 0.1rem;
  }
  // 课程大纲
  .gang {
    width: 100%;
    background: white;
    margin-top: 0.2rem;
    box-sizing: border-box;
    padding: 0.2rem 0.1rem;
    .gang_list {
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.2rem;
      ul {
        width: 100%;
        height: 100%;
        li {
          width: 100%;
          height: 100%;
          margin-top: 0.15rem;
          div {
            display: flex;
            height: 0.3rem;
            align-items: center;
            .dian {
              display: block;
              width: 0.05rem;
              height: 0.05rem;
              background: #ea7a2f;
              border-radius: 50%;
              margin-right: 0.1rem;
            }
            .hui {
              display: block;
              color: white;
              background: #ea7a2f;
              font-size: 0.12rem;
              width: 0.4rem;
              height: 0.2rem;
              text-align: center;
              line-height: 0.2rem;
              margin-right: 0.1rem;
            }
            span {
              font-size: 0.14rem;
              color: #595959;
            }
          }
          p {
            box-sizing: border-box;
            font-size: 0.14rem;
            color: #8c8c8c;
            padding: 0 0.3rem;
          }
        }
      }
    }
  }
  // 课程评论
  .lun {
    width: 100%;
    background: white;
    margin-top: 0.2rem;
    box-sizing: border-box;
    padding: 0.18rem 0.1rem;
    .ping {
      width: 100%;
      height: 100%;
      ul {
        width: 100%;
        height: 100%;
        li {
          box-sizing: border-box;
          width: 100%;
          height: 0.7rem;
          padding: 0.15rem 0.15rem;
          display: flex;
          .tu {
            width: 0.3rem;
            height: 100%;
            box-sizing: border-box;
            padding-bottom: 0.1rem;
            img {
              width: 0.3rem;
              height: 100%;
              border-radius: 50%;
            }
          }
          .zi {
            padding-left: 0.1rem;
            box-sizing: border-box;
            p {
              width: 3.2rem;
              > :nth-child(3) {
                font-size: 0.14rem;
                color: #8c8c8c;
                float: right;
              }
            }
          }
        }
      }
    }
  }
}
// 尾部
footer {
  width: 100%;
  height: 0.5rem;
  background: #ea7a2f;
  color: white;
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.2rem;
  // position: fixed;
  // bottom: 0;
}
.isShow {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.ischange {
  font-size: 0.18rem;
  color: black;
}
.change {
  font-size: 0.14rem;
  color: #6666;
}
</style>