<template>
  <div class="change_container">
    <div class="back_container">
      <van-nav-bar title="设置密码" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="con_container">
      <div class="con_wrapper">
        <!-- 输入手机号 -->
        <div class="tel_container">
          <van-field
            placeholder="请输入手机号"
            :class="active == true ? 'changBottom' : ''"
            @focus="active = true"
            @blur="active = false"
            v-model="tel"
          >
            <template #button>
              <p  @click="getmsg" v-show="getCode">获取验证码</p>
              <div class="time_box" v-show="timeOut">
                获取验证码 (<van-count-down
                  ref="countDown"
                  :time="time"
                  format="ss"
                  @finish="timeend"
                  :auto-start="false"
                />)
              </div>
            </template>
          </van-field>
        </div>
        <!-- 短信验证码 -->
        <div class="pass_container">
          <van-field
            placeholder="请输入短信验证码"
            :class="nother == true ? 'changBottom' : ''"
            @focus="nother = true"
            @blur="nother = false"
            v-model="msgCode"
          />
        </div>
        <!-- 密码 -->
        <div class="pass_container">
          <van-field
            placeholder="请输入密码"
            :class="nother1 == true ? 'changBottom' : ''"
            @focus="nother1 = true"
            @blur="nother1 = false"
            v-model="pass"
          />
        </div>
        <div class="button_wrapper">
          <van-button
            type="primary"
            size="large"
            round
            color="linear-gradient(to right, #FF9349, #FC5500)"
            @click="Signin"
            >确定</van-button
          >
        </div>
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="mes" v-show="show">
      <span>手机号码格式不正确</span>
    </div>
    <div class="mes" v-show="wrong">
      <span>输入有误，请检查</span>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { phoneTest } from "@/plugins/phoneTest.js";
export default {
  data() {
    return {
      tel: "",
      getCode: true,
      timeOut: false,
      msgCode: "",
      pass: "",
      active: false,
      nother: false,
      nother1: false,
      time: 1000 * 60,
      show: false,
      wrong: false,
    };
  },
  methods: {
    //   点击返回，返回到退出登录页面
    onClickLeft() {
      this.$router.push("/mySet");
    },
    //   点击获取验证码按钮
    getmsg() {
      console.log("msg");
      if (this.tel == "" || !phoneTest(this.tel)) {
         this.$toast("手机号码格式不正确")
        setTimeout(() => {
         this.$toast("输入有误，请检查")
        }, 1500);
        return;
      }
      // 验证码倒计时
      this.$refs.countDown.start();
      // 验证码第一个样式消失
      this.getCode = false;
      // 验证码第二个样式出现
      this.timeOut = true;
      this.$http
        .post("/api/app/smsCode", {
          mobile: this.tel,
          sms_type: "getPassword",
        })
        .then((res) => {
          console.log(res);
        });
    },

    // 倒计时结束时触发样式改变
    timeend() {
      this.timeOut = false;
      this.getCode = true;
      this.$refs.countDown.reset();
    },
    // 确定按钮
    Signin() {
      //   console.log(deng);
      if (this.tel == "" || !phoneTest(this.tel)) {
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 1500);
        return;
      }
      if (this.pass == "" || this.msgCode == "") {
        this.wrong = true;
        setTimeout(() => {
          this.wrong = false;
        }, 1500);
        return;
      }
      console.log(111);
      this.$http
        .post("/api/app/password", {
          mobile: this.tel,
          password: this.pass,
          sms_code: this.msgCode,
        })
        .then((res) => {
          console.log(res);
          if(res.code==200){
              this.$router.push("/my")
          }
        });
    },
  },
};
</script>
<style lang="scss">
.change_container {
  width: 100%;
  .con_container {
    width: 100%;
    display: flex;
    justify-content: center;
    .con_wrapper {
      width: 90%;
      .tel_container {
        border-bottom: 0.01rem solid rgba(122, 122, 122, 0.158);
      }
      .pass_container {
        border-bottom: 0.01rem solid rgba(122, 122, 122, 0.158);
      }
      .button_wrapper {
        width: 100%;
        height: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.changBottom {
  border-bottom: 0.01rem solid #fc5500;
}
.time_box{
  // width: 2rem;
  display: flex;
  align-items: center;
}
</style>