<template>
  <div class="oto">
    <!-- 头部 -->
    <header>
      <i @click="$router.go(-1)" class="el-icon-arrow-left"></i>
      <p>一对一辅导</p>
      <i @click="toSeach()" class="el-icon-search"></i>
    </header>

    <!-- 内容区域 -->
      <div class="content">

   

      <!-- 日期 -->
      <div v-show="content == 1" class="date">
        <van-calendar
          :show-title="false"
          :show-mark="false"
          :default-date="defaultDate"
          type="single"
          :poppable="false"
          :show-subtitle="false"
          lazy-render
          @select="changeDate"
          row-height="0.6rem"
          :show-confirm="false"
          :style="{ height: '3rem' }"
        />

        <!-- 时段 -->
        <div class="shiduan">
          <p>时段</p>
          <div>
            <p @click="changeTime(1)">
              <input
                v-model="startTime"
                placeholder="开始时间"
                type="text"
              /><span><van-icon name="underway" /></span>
            </p>
            <p @click="changeTime(2)">
              <input
                v-model="endTime"
                placeholder="结束时间"
                type="text"
              /><span><van-icon name="underway" /></span>
            </p>
          </div>
        </div>

        <!-- 日期弹框 -->
        <van-popup position="bottom" v-model="popup_show">
          <div style="width: 100%">
            <van-datetime-picker
              v-model="currentTime"
              @confirm="confirm"
              @canel="canel"
              type="time"
              title="选择时间"
              :min-hour="10"
              :max-hour="20"
            />
          </div>
        </van-popup>

        <!-- 按钮 -->
        <div class="date_btn">
          <button @click="reset">重置</button>
          <button @click="schooltime">确定</button>
        </div>
      </div>

      <!-- 列表 -->
      <div v-show="content == 0" class="mingxing">
              <!-- 选项卡 -->
      <div class="tab">
        <p @click="tab(1)" :class="content == 1 ? 'bottom' : ''">
          选择上课时间<span></span>
        </p>
        <p @click="tab(2)" :class="content == 2 ? 'bottom' : ''">
          选择老师条件<span></span>
        </p>
      </div>
        <ul>
          <li @click="toDetail(i)" v-for="(i, k) in list" :key="k">
            <img :src="i.avatar" alt="" />
            <div>
              <p>
                <span>{{ i.real_name }}</span>
              </p>
              <p>{{ i.sex | issex }} {{ i.teach_age }}年教龄</p>
            </div>
            <p>预约</p>
          </li>
        </ul>
      </div>


      <!-- 选择老师条件区域 -->

      <div v-show="content == 2" class="Teacher_condition">
     
        <div class="content">
          <p>老师类型</p>
          <ul>
            <li
              @click="checkedType = i.level_id"
              :class="{ active: checkedType == i.level_id }"
              v-for="(i, k) in typeList"
              :key="k"
            >
              {{ i.level_name }}
            </li>
          </ul>

          <p>只看</p>
          <section>
            <p><input v-model="is_collect" type="checkbox" />已关注</p>
            <p><input v-model="is_attended" type="checkbox" />上过课的</p>
          </section>

          <p>性别</p>
          <ul>
            <li @click="checkedSex = 0" :class="{ active: checkedSex == 0 }">
              男
            </li>
            <li @click="checkedSex = 1" :class="{ active: checkedSex == 1 }">
              女
            </li>
          </ul>
          <p>年级</p>
          <ul>
            <li
              @click="checkedClass = i.attr_val_id"
              :class="{ active: checkedClass == i.attr_val_id }"
              v-for="(i, k) in classList.child"
              :key="k"
            >
              {{ i.attr_val_name }}
            </li>
          </ul>
          <p>学科</p>
          <ul>
            <li
              @click="checkedSubject = i.attr_val_id"
              :class="{ active: checkedSubject == i.attr_val_id }"
              v-for="(i, k) in subjectList.child"
              :key="k"
            >
              {{ i.attr_val_name }}
            </li>
          </ul>
        </div>

        <div class="date_btn">
          <button @click="resetCondition">重置</button>
          <button @click="screenCondition">确定</button>
        </div>
      </div>
      </div>

    <LoginMessage @Login="LoginMessageShow = !LoginMessageShow"
      :show="LoginMessageShow"
      v-show="LoginMessageShow"></LoginMessage>
  </div>
</template>

<script>
import { otoList, condition } from "@/utils/api";
import LoginMessage from "@/components/LoginMessage"
export default {
  name: "oto", //一对一辅导页面
  components:{
    LoginMessage
  },
  filters: {
    issex(val) {
      if (val == 0) {
        return "男";
      } else {
        return "女";
      }
    },
  },
  data() {
    return {
      content: 0,
      dates: "",
      defaultDate: new Date(),
      currentTime: "12:00",
      drawer: false,
      popup_show: false,
      startTime: "",
      endTime: "",
      status: 1, //开始和结束时间的状态
      query: {
        page: 1,
        limit: 10,
        attr_val_id: 18,
      },
      list: [],
      typeList: [],
      classList: [],
      subjectList: [],
      checkedClass: 18,
      checkedSubject: "",
      checkedType: "",
      checkedSex: "3",
      is_attended: "",
      is_collect:0,
      LoginMessageShow :false
    };
  },
  created() {},
  mounted() {
    this.getTeacherList();
    this.getTeacherCondition();
  },
  methods: {
    toDetail(i){

       if (!localStorage.Token) {
        this.LoginMessageShow = !this.LoginMessageShow;
      } else {
        this.$router.push({
          path: "/Teacher",
          query: {
            teacherId: i.teacher_id,
          },
        });
      }
    


    },

    // 显示哪个选项卡
    tab(i) {
      if (this.content == i) {
        this.content = 0;
      } else {
        this.content = i;
      }
    },

    // 跳转到搜索
    toSearch(){



    },

    // 确定筛选

    screenCondition() {

      if(this.is_attended){
        this.is_attended=1
      }else{
        this.is_attended=0
      }
      
      if(this.is_collect){
           this.is_collect=1
      }else{
        this.is_collect=0
      }

      this.query = {
        page: 1,
        limit: 10,
        start_time: "",
        end_time: "",
        level_id: this.checkedType,
        is_collect: this.is_collect,
        is_attended: this.is_attended,
        sex: this.checkedSex,
        attr_val_id:this.checkedSubject+","+this.checkedClass,
      };

      this.getTeacherList()

      this.content=0
    },
    
    // 重置老师条件
    resetCondition(){

    },
   

    // 获取条件列表
    async getTeacherCondition() {
      let res = await condition();

      console.log(res);

      this.typeList = res.data.otoTeacherLevel;
      this.classList = res.data.attrList[0];
      this.subjectList = res.data.attrList[1];
    },

    //  获取老师列表
    async getTeacherList() {
      let res = await otoList(this.query);
      console.log(res);
      this.list = res.data;
    },

    // 重置
    reset() {
      this.startTime = "";
      this.endTime = "";
      console.log(this.defaultDate);
      this.defaultDate = new Date();
      this.getTeacherList();
      this.content = 0;
    },

    // 选择上课时间
    async schooltime() {
      this.query = {
        page: 1,
        limit: 10,
        start_time: this.dates + "%20" + this.startTime,
        end_time: this.dates + "%20" + this.endTime,
        level_id: "",
        is_collect: 0,
        is_attended: 0,
        sex: "",
        attr_val_id: 18,
      };

      this.getTeacherList();
      this.content = 0;
    },

    changeDate(val) {
      console.log(new Date(val).toLocaleDateString().replaceAll("/", "-"));
      this.dates = new Date(val).toLocaleDateString().replaceAll("/", "-");
    },

    //   确定时间
    confirm(val) {
      this.popup_show = false;
      console.log(val);
      if (this.status == 1) {
        this.startTime = val;
      } else {
        this.endTime = val;
      }
    },
    //   取消
    canel() {
      this.popup_show = false;
    },

    //   选择时间
    changeTime(val) {
      this.status = val;
      this.popup_show = !this.popup_show;
    },
  },
};
</script>

<style lang="scss" scoped>
// 选择老师条件区域
.Teacher_condition {
  width: 100%;
  background: white;
  height: 100%;
  // padding: 0.2rem;
  // overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
  > .content {
    flex: 1;
    background: white;
    padding: 0.2rem 0.1rem;
    > p {
      font-size: 0.16rem;
      margin-bottom: 0.05rem;
    }
    section {
      width: 100%;
      margin-bottom: 0.2rem;
      border-bottom: 0.01rem solid #f1f1f1;
      display: flex;

      p {
        width: 0.85rem;
        height: 0.36rem;
      }
      input {
        border: 0.02rem solid #e2e2e2;
        margin-right: 0.05rem;
      }
    }

    > ul,
    div {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 0 0.1rem;
      margin-bottom: 0.2rem;
      border-bottom: 0.01rem solid #f1f1f1;
      // justify-content: space-between;
      li,
      p {
        width: 0.75rem;
        height: 0.36rem;
        margin-right: 0.17rem;

        background: #f5f5f5;
        text-align: center;
        line-height: 0.36rem;
        margin-bottom: 0.1rem;
      }
      .active {
        background: #ebeefe;
        color: #eb6152;
      }
    }
  }
}

.oto {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 头部 */
header {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  border-bottom: 0.01rem solid #f5f5f5;
  justify-content: space-between;
  > :nth-child(1),
  > :nth-child(3) {
    width: 0.4rem;
    height: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.22rem;
    font-weight: bold;
  }
  > :nth-child(2) {
    font-size: 0.2rem;
  }
}

// 内容区域
.content {
  flex: 1;
  background: #f0f2f5;
  overflow: auto;
  display: flex;
  flex-direction: column;
  // overflow: auto;
  // padding-top: 0.3rem;
}

// 选项卡
.tab {
  width: 100%;
  height: 0.46rem;
  display: flex;
  background: white;
  p {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.16rem;

    span {
      height: 0;
      width: 0;
      overflow: hidden;
      font-size: 0;
      line-height: 0;
      border-style: solid;
      border-width: 0.08rem;
      margin-left: 0.1rem;
      margin-top: 0.13rem;
      border-color: #cacaca transparent transparent transparent;
    }
  }

  .bottom {
    color: red;
    span {
      margin-bottom: 0.2rem;
      border-color: transparent transparent red transparent;
    }
  }
}

// 列表
.mingxing {
  width: 100%;

  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.2rem;
    li {
      width: 100%;
      background: white;
      margin-bottom: 0.2rem;
      display: flex;
      border-radius: 0.08rem;
      padding: 0.16rem;
      height: 0.88rem;
      align-items: center;
      img {
        width: 0.43rem;
        height: 0.43rem;
        margin-right: 0.15rem;
        border-radius: 50%;
      }
      > :nth-child(3) {
        width: 0.76rem;
        height: 0.34rem;
        text-align: center;
        line-height: 0.34rem;
        background: #ebeefe;
        border-radius: 0.2rem;
        color: #eb6100;
      }
      div {
        width: 2.23rem;
        height: 0.47rem;

        > :nth-child(1) {
          margin-bottom: 0.05rem;
          > :nth-child(1) {
            font-size: 0.22rem;
            margin-right: 0.05rem;
          }
        }
        > :nth-child(2) {
          font-size: 0.14rem;
          color: #b7b7b7;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

// 日期
.date {
  width: 100%;
  height: 100%;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  .shiduan {
    width: 3.7rem;
    height: 1rem;
    position: absolute;

    top: 3.4rem;
    background: white;
    display: flex;
    padding: 0.2rem;
    flex-direction: column;
    > :nth-child(1) {
      height: 0.18rem;
      font-size: 0.16rem;
      margin-bottom: 0.1rem;
    }
    > div {
      display: flex;
      justify-content: space-between;
      p {
        width: 1.56rem;
        height: 0.36rem;
        border: 0.01rem solid slategray;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          width: 1.19rem;
          height: 0.18rem;
          margin-left: 0.1rem;
          border: 0;
          background: #fafafa;
        }
        span {
          width: 0.36rem;
          height: 0.2rem;
          background: white;
          i {
            color: #c8c8c8;
          }
        }
      }
    }
  }
}
.date_btn {
  width: 100%;
  height: 0.46rem;
  position: absolute;
  bottom: 0;
  display: flex;
  left: 0;
  > :nth-child(1) {
    width: 50%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    border: 0;
  }
  > :nth-child(2) {
    width: 50%;
    height: 100%;
    border: 0;

    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
}
</style>
