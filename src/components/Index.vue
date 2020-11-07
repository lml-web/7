<template>
  <div class="index">
    <LoginMessage
      @Login="LoginMessageShow = !LoginMessageShow"
      :show="LoginMessageShow"
      v-show="LoginMessageShow"
    ></LoginMessage>

    <!-- 轮播图布局 -->
    <div class="banner">
      <el-carousel height="2.18rem">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <img :src="item.banner_img" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 导航布局 -->
    <div class="nav">
      <ul>
        <li @click="$router.push('/couser')">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAA8CAYAAADSfGxZAAAFZUlEQVRoQ+1bW2xUVRRd68xMeZPaFESeBkuLhkekk6IfxDEEMQqUmWGMwcQPE5FEo9GYGONP/TIh8UH88BsNwTDObR0CGsUImGDAGVEQIn1JIBYqBSwtr5m5Z5tbaDLYoXPb28d8nPs1ybl7n7PXXWedk8leRN6zfv3pSr/f9wypN4uwlhAheJKQvVnNfblc2fkLFy72ptPBbH5cqf0OhcQ/ZcqJaWVl02dRsmtJrtPQywmQwG+AfJG1M98mk0s7+9dO50dDg6jjx5vrofE2qFYC4htYnPQC6gREpwl1BD5/KpF48DRAKQ0ghNFoexVsvVKAWlCCAJYDmDZwfbQBSYPqo2XLHoo3NFD3AbEp3FKvIZ8CmFesKBE4hfcQuASgTSi7/f7pTfH4AxeLxY7G+MaNV8qV6opSEBVIjQgqSU4FRBWbTwSdCmproqmqibG1Jyv05EBCgFCxwHuNk8hCuF+RO5Dhz7dU9koyWXMNoB5uzsJxomKxi5Ntu7tcCR63oV8g1NOATPAwz8GcrTczGm2Lira/BOD3kOxOaN82+UegjwE4qrRKZcVOJ5OLO7zk3rCh/X6lsisUVJ1QgnSoD84CpI/RHp8ciJcZibRaEB32mGxAuAhyJLodYEB1REQn/P7Md/H4koybuUKhH/0VFfNDgH4eIo8BmCki95EcgQ/2/xWovYyEW/4GZLabxXl/hx0UvHnmXHfjvU6eWEx8OtuyUYhtABZ6n9NNBl5gJNx8tbCyukkwrHe6QLXFsqoaC0WHw+1riNxOADOGlX14Qb0OI256FJuhT00esqxFTxQGonk/gdVDT+op4ta4AEHiWsKqnlpo6ZFwcw+AgmOeSh00mOMFBHXCWlTg0gZEIy22SPE7wMiCYoDoP/YNI24jYRhhGHG3xhhGGEYYRhQ8d83WMFvDbA2zNQa7lBuNMBphNMJohNEIF39dGLE0YmnE0oilEUsjli4QMGJpxNKIpRFLF1JhbpZGLI1YGrE0YmnE0gUC+WI55j1UIEuuUaTHaSY7BeBh9+h5f7MEgWhmJNKyGyIx7+W5zzAYEJFws9OtOxKNpO4XBCQZibRththOO9+YPSXHCGIrY+va5tsB+zCAOWOFRCkBIYIOZfMphkJ/Tawoz34G4kUARTvaRwKsUgHCcRoQ2JHT+vXbNoX69lVa5XaNFStKBQgAl0GELav6UB8QfQ3g5XNfA+XjkfjixXKUChCK8l7X5Y5tBw48mbtLnaPh5u0CbAEwsVgxXsZL4NS4CeJzy6p+pb+Ou4CIxQ5PyuUq3yL4BiCj1hQ+zoz4F4IPc1pvTyYXO+3Ofc+A89oBQzIzH9VKPgBk1Wic6eMEhGOqOQLiHZ9v0i/x+Lwb+ay+58XF8U3YduuzFHlVgKUQTAc5yY1Xqti2GQsg7pwI10H2CORPQH9y9mzNvnSaBR2Krm5wkcipBSKBOooESdQKuAKQ8uGyZRSBcL56twC/UyRFqKOiJGVZ1e1FP06xF/LHa2tTgTlzJlQEAhNna40QgSggdQACQ8kDoNdqrC5gQwSGaVPIkvhVNCz6yr6/caP3fGfnzUtD8ae6YsRgRcZirVW2Lc9BY5NAHLvkNBKDue4cw+QPVlP1mkJ5I+HT3wBcOzjbJCPCq1ToANhIqp2JxMJWLx5Uz0D0F+O4b2eUn1liq1wQIkEI60A8MsAdRLQqW1766uuanwoBEY22BSF6l4hU5Y87ZjkQfxBMQUuKwqNqwq2Tbs1yxRg7YkDkT+ScPJnMzMoyxQU29DpA6gHMFeCYz+d7v6vr7EHnElN4caLC4ZbVhLwL0HH1ngO4F0BSa7ZrPfnSnj2zrxcrbKjj/wFPducAYoibwgAAAABJRU5ErkJggg=="
          />
          <p>特色课</p>
        </li>
        <li @click="$router.push('/oto')">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA8CAYAAADRy2JxAAAEDElEQVRoQ+2aTWhUVxTH/+fNRyYmE78WirTQFgwiXSjFjWDRlR+k0CIOlJiaVk1VNGrGmBZaOy24EXSmlBqk2inUyaRZKM3MFFxoNt1VQXEhiogSSKwL48ckMTNz7yk3VQntTN7Me2HezJv3tveee+7vnnP+9773LgFAaGjIPZ4eeVsCX4KwCZKXgEhTbRX3EP4mxiXp1b46tfHjYTPzIwX+/PloO4i/AfCGmcHKZcsAa6ALYnKiIxzY9dioX+pOxJZL4Eq1gM8AfeRyy/dPbG67bRg+mIxFwWg3OoBldkTMLFaf+qDthtE5UDDRNwrwUqMDWGnHkKvMwQ/GBAiVKW46K2sePhFjK6NnxrcDb67mncibyT7LbJ20d9LeWPJR0KZq352KLmX2vguX5n+9NDmAmB7kXqTvh7ftHLMlfFeqv5lYXARjZZ6cEAD+AmG/LeGDidhBAJFCxaBejEAYtCV8VzL2NTG+m1UJCE9rFx6AA29so7DeqtAhp6i0dyJvw33eibye2jtp76S99cptZAaO2ud5pXUEzxG82YvJOd4aEZtKsHEEr0YFb0oKXhP+cPvN/2ZhLaj9XUHYGGlpvVcz8OoTFAETID7pn/AeDwUCmfLAT/8Wxp9EuE7M2XKLHhMxMacl+NaLSW/qdCCQzjeHuU97IgbzOZGRx0T92OOp4TpZbvhlzc0cWr9B/VWe9efqnMIzIEAUnwR39ra0jpUbulR/cwf/b8TPC4/siWxqGy11Ilb0nxt4VWPA2Vx26mjko0+fWAFixKdpeJXqBPSJXKazmsCnr9WNj/wiGa16C5f/bK+T6ocuRhdoLs8KaFSv56Cc7STIzRqvJaJOMC/S8/1/eAUO/klkMz35In7093N+ofl6AV4PaC49B2VtZ3U9D00gqgOritV7q0vGnoAxX3UrJtW/+CO+OivkNfX9T2/wSm+nI6l4J0vZw0ATgfpFRhyLbC2s6l2D51uIKFHpYMXMj7YNDHjfdE++xW6PJ+eWwz9s2f5sNkNbwRezQjP7dCV/20Ccu2yLtC8V/lAy9o6LoWp+Qam2lda/ZNHqSJyZ59caf4ZEoNqjXzK8it7h5K/rNNbOMrCcqlj1DcGrPfTwYP97mov3QvJmAEuq8f6uMfiXxbtv4MdGX8PiZaRhviayPstqmqlegrYQcIBR/CVqU/CWwRZwfCQR382QYQDzitEjW8F3XD3jaRpp3AtCiIGFesGxFbyCDQ1FfemJuh2QfFqvBGwH/yrawVTfLkiEAW4oVAK2hVcl4H/o30PM3xYqAdvCqwxoH4r6Fo97PyFGb74SsDX8qxLoTsY/E1J+D0LDjEOZrAn46V1gtPFzxvSV1Je7AN2pCfjXJZCu3wqSx8H8yEXo+Qf3I4hni2PDwwAAAABJRU5ErkJggg=="
          />
          <p >一对一辅导</p>
        </li>
        <li @click="studyCalendar">
          <img
            src="data:image/png;base64,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"
          />
          <p>学习日历</p>
        </li>
      </ul>
    </div>

    <!-- 列表布局 -->
    <div class="list">
      <div v-for="(i, k) in list" :key="k">
       
      
        <template v-if="i.channel_info.type >2">
          <div class="famous">
            <div class="list_title">
              <p class="red_title"></p>
              <span>{{ i.channel_info.name }}</span>
            </div>

            <ul>
              <li
                @click="toTeacher(item)"
                v-for="(item, key) in i.list"
                :key="key"
              >
                <img :src="item.teacher_avatar" alt="" />
                <div>
                  <p>{{ item.teacher_name }}</p>
                  <p>{{ item.introduction }}</p>
                </div>
              </li>
            </ul>
          </div>
        </template>

        <template v-if="i.channel_info.type == 1">
          <div class="excellent_course">
            <div class="list_title">
              <p class="red_title"></p>
              <span> {{ i.channel_info.name }} </span>
            </div>
            <ul>
              <li
                @click="toDetail(item)"
                v-for="(item, key) in i.list"
                :key="key"
              >
                <p>
                  {{ item.title }}
                </p>
                <p>共{{ item.total_periods }}课时</p>
                <div>
                  <img :src="item.teachers_list[0].teacher_avatar" alt="" />
                  <p>{{ item.teachers_list[0].teacher_name }}</p>
                </div>
                <div>
                  <p>{{ item.sales_num }}人报名</p>
                  <p class="farge" v-show="item.price != 0">
                    <img
                      data-v-5955fa02=""
                      src="https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20191HHDExgz0u1567065946.png"
                      class="price-ico"
                    />
                    <span>{{ item.price }}</span>
                  </p>
                  <span v-show="item.price == 0" class="free">免费</span>
                </div>
              </li>
            </ul>
          </div>
        </template>


      </div>
    </div>
  </div>
</template>

<script>
import LoginMessage from "@/components/LoginMessage";
export default {
  name: "index",
  components: {
    LoginMessage,
  },
  data() {
    return {
      type: ["名师阵容", "精品课程", "推荐课程", "明星讲师"],
      banner: [
        //轮播图数据
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019LnKumseuhw1569839569.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20193KAjU2cB6h1569839562.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20197Cxc53hktC1569839552.jpg",
        "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019MGNW3BtiS91569839576.jpg",
      ],
      activeKey: 1,

      list: [],
      LoginMessageShow: false,
      data: "",
    };
  },
  created() {},
  mounted() {
    this.getIndexList(); //调用获取列表数据的方法
    this.getBanner(); //调用获取轮播图数据的方法
  },
  methods: {
    
    // 跳转到学习日历
    studyCalendar(){

      if(localStorage.Token){
          
          this.$router.push("/date")
      }else{
        this.LoginMessageShow=true
      }

    },

    async getIndexList() {
      //获取列表数据
      let { data } = await this.$http.get("/api/app/recommend/appIndex");
     
      this.list = data
       console.log(this.list);
    },

    async getBanner() {
      let { data } = await this.$http.get("/api/app/banner");
      //  console.log(data)
      this.banner = data;
    },

    // 跳转到课程详情
    toDetail(val) {
      console.log(val);
      this.$router.push({
        path: "/couserDetail",
        query: {
          couserDetailId: val.id,
          course_type: val.course_type,
        },
      });
    },

    // 跳转到教师阵容详情页面
    toTeacher(i) {
      if (!localStorage.Token) {
        this.LoginMessageShow = !this.LoginMessageShow;
      } else {
        this.$router.push({
          path: "Teacher",
          query: {
            teacherId: i.teacher_id,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  position: relative;
  //   overflow: auto;
}
// 轮播图样式
.el-carousel__item h3 {
  color: #475669;
  font-size: 0.14rem;
  opacity: 0.75;
  width: 100%;
  height: 2.18rem;
  margin: 0;
}
.banner {
  img {
    width: 100%;
    height: 2.18rem;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

//   导航样式
.nav {
  width: 100%;
  height: 1.12rem;
  padding-bottom: 0.2rem;
  display: flex;
  justify-content: space-around;
  position: absolute;
  //   background: red;
  z-index: 100;
  top: 2rem;
  ul {
    width: 3.88rem;
    height: 1.12rem;
    display: flex;
    justify-content: space-around;

    li {
      width: 1.12rem;
      height: 1.12rem;
      border-radius: 0.08rem;
      background: white;
      display: flex;
      flex-direction: column;
      padding-top: 0.23rem;
      align-items: center;
      img {
        width: 0.22rem;
        height: 0.23rem;
        margin-bottom: 0.2rem;
      }
      p {
        font-size: 0.12rem;
      }
    }
  }
}

// 列表模块

.list {
  width: 100%;
  padding: 0.15rem;
  margin-top: 1.2rem;
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    li {
      width: 100%;

      background: white;
      margin-bottom: 0.2rem;
      display: flex;
      border-radius: 0.04rem;
      padding: 0.16rem;
      //   align-items: center;
    }
  }
  .list_title {
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
}

// 名师阵容
.famous {
  width: 100%;

  ul {
    li {
      height: 0.88rem;
      img {
        width: 0.43rem;
        height: 0.43rem;
        margin-right: 0.15rem;
        border-radius: 50%;
      }
      div {
        width: 3rem;
        height: 0.47rem;
        > :nth-child(1) {
          font-size: 0.22rem;
          margin-bottom: 0.05rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > :nth-child(2) {
          font-size: 0.16rem;
          color: #b7b7b7;
            overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

// 精品课程
.excellent_course {
  width: 100%;
  li {
    height: 2.1rem;
    flex-direction: column;
    > :nth-child(1) {
      font-size: 0.16rem;
      height: 0.48rem;
    }
    > :nth-child(2) {
      font-size: 0.12rem;
      height: 0.32rem;
      line-height: 0.32rem;
      img {
        width: 0.29rem;
        height: 0.29rem;
        border-radius: 50%;
      }
      p {
        font-size: 0.12rem;
      }
    }
    > :nth-child(3) {
      display: flex;
      height: 0.71rem;
      align-items: center;
      img {
        width: 0.29rem;
        height: 0.29rem;
        margin-right: 0.05rem;
      }
      p {
        font-size: 0.12rem;
        color: #595959;
      }
    }
    > :nth-child(4) {
      display: flex;
      width: 100%;
      align-items: center;
      height: 0.48rem;
      justify-content: space-between;
      border-top: 0.01rem solid #f9f9f9;
      > :nth-child(1) {
        width: 2.93rem;
        height: 0.48rem;
        display: flex;
        align-items: center;
      }
    }
  }
}
.farge {
  //免费
  width: 0.53rem;
  height: 0.48rem;
  line-height: 0.48rem;
  img {
    width: 0.13rem;
    height: 0.14rem;
    margin-right: 0.02rem;
  }
  span {
    color: red;
  }
}
.free {
  color: green;
  font-size: 0.2rem;
}

// 明星讲师
.mingxing {
  width: 100%;

  ul {
    li {
      height: 0.88rem;
      img {
        width: 0.43rem;
        height: 0.43rem;
        margin-right: 0.15rem;
        border-radius: 50%;
      }
      div {
        width: 3rem;
        height: 0.47rem;

        > :nth-child(1) {
          margin-bottom: 0.05rem;
          > :nth-child(1) {
            font-size: 0.22rem;
            margin-right: 0.05rem;
          }
          > :nth-child(2) {
            font-size: 0.12rem;
            color: #eb7a8d;
          }
        }
        > :nth-child(2) {
          font-size: 0.16rem;
          color: #b7b7b7;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
