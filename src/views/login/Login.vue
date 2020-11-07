<template>
  <div>
    <div class="login_pic_container">
      <div class="login_pic_wrapper">
        <div class="pic_container">
          <img src="@/assets/login_pic.png" alt="" />
        </div>
      </div>
    </div>
    <!-- 登录页面 -->
    <div class="login_input_container" v-show="loginShow">
      <div class="login_input_wrapper">
        <div class="tel_container">
          <van-field
            placeholder="请输入手机号"
            :class="active == true ? 'changBottom' : ''"
            @focus="active = true"
            @blur="active = false"
            v-model="loginTel"
          />
        </div>
        <div class="pass_container">
          <van-field
            placeholder="请输入密码"
            :class="nother == true ? 'changBottom' : ''"
            @focus="nother = true"
            @blur="nother = false"
            v-model="loginPass"
            type="password"
          />
        </div>
        <div class="password_container">
          <span @click="retrieve">找回密码</span>
          <span @click="onClick">注册/验证码登录</span>
        </div>
      </div>
    </div>
    <!-- 注册页面 -->
    <div class="logon_input_container" v-show="logonShow">
      <div class="logon_input_wrapper">
        <div class="logon_tel_container">
          <van-field
            placeholder="请输入手机号"
            :class="active == true ? 'changBottom' : ''"
            @focus="active = true"
            @blur="active = false"
            v-model="tel"
          >
            <template #button>
              <span @click="getmsg" v-show="getCode">获取验证码</span>
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
        <div class="logon_pass_container">
          <van-field
            placeholder="请输入短信验证码"
            :class="nother == true ? 'changBottom' : ''"
            @focus="nother = true"
            @blur="nother = false"
            v-model="msgCode"
          />
        </div>
        <div class="logon_password_container">
          <span>*未注册手机将自动注册</span>
          <span @click="againClick">使用密码登录</span>
        </div>
      </div>
    </div>
    <div class="login_button_container" v-show="loginShow">
      <div class="login_button_wrapper">
        <van-button
          type="primary"
          size="large"
          round
          color="linear-gradient(to right, #FF9349, #FC5500)"
          @click="Signin"
          >登录</van-button
        >
      </div>
    </div>
    <div class="login_button_container" v-show="logonShow">
      <div class="login_button_wrapper">
        <van-button
          type="primary"
          size="large"
          round
          color="linear-gradient(to right, #FF9349, #FC5500)"
          @click="logondenglu"
          >注册</van-button
        >
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="mes" v-show="show">
      <span>手机号码格式不正确</span>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Field } from "vant";
Vue.use(Field);
import axios from "axios";
import { phoneTest, passwordTest } from "@/plugins/phoneTest.js"; //验证方法

export default {
  data() {
    return {
      active: false,
      nother: false,
      loginShow: true,
      logonShow: false,
      tel: "",
      show: false,
      loginTel: "",
      loginPass: "",
      time: 60 * 1000,
      timeOut: false,
      getCode: true,
      msgCode: "",
      showtime: false,
    };
  },
  methods: {
    // 点击注册登录按钮，注册页面显示，登录页面隐藏
    onClick() {
      this.loginShow = false;
      this.logonShow = true;
    },
    // timeout(){
    //   this.timeout=false
    // },
    //点击使用密码登录，登录页面显示，注册页面隐藏
    againClick() {
      this.loginShow = true;
      this.logonShow = false;
    },
    // 点击获取验证码按钮
    getmsg() {
      if (phoneTest(this.tel) != true) {
        this.$toast({
          message: phoneTest(this.tel),
          position: "top",
        });
        return;
      }

      this.$http
        .post("/api/app/smsCode", {
          mobile: this.tel,
          sms_type: "login",
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            // 验证码倒计时
            this.$refs.countDown.start();
            // 验证码第一个样式消失
            this.getCode = false;
            // 验证码第二个样式出现
            this.timeOut = true;
          } else {
            this.$toast({
              message: "当前请求频繁,请稍后再试",
              position: "top",
            });
          }
        });
    },
    // 点击找回密码跳转该页面
    retrieve() {
      this.$router.push("/Retrieve");
    },
    // 点击首页面登录请求接口
    Signin() {
      console.log(passwordTest(this.loginPass));
      // 账号验证
      if (phoneTest(this.loginTel) != true) {
        this.$toast({
          message: phoneTest(this.loginTel),
          position: "top",
        });

        return false;
      } else if (passwordTest(this.loginPass) != true) {
        // 密码验证
        this.$toast({
          message: passwordTest(this.loginPass),
          position: "top",
        });

        return false;
      } else {
        this.$http
          .post("/api/app/login", {
            mobile: this.loginTel,
            password: this.loginPass,
            type: 1,
          })
          .then((res) => {
            console.log(res.code);
            if (res.code == 200) {
              localStorage.Token = res.data.remember_token;
              localStorage.deviceid = res.data.device_id;
              console.log(res);

              if (localStorage.getItem("returnPage")&&localStorage.getItem("returnPage")!="/mySet") {
                  console.log(localStorage.getItem("returnPage"),"/mySet")
                this.$router.push(localStorage.getItem("returnPage"));
              } else {
                this.$router.push("/my");
              }
            }
            // 把token保存到本地
          });
      }
    },
    // 点击注册页面的登录
    async logondenglu() {
      let res = await this.$http.post("/api/app/login", {
        mobile: this.tel,
        sms_code: this.msgCode,
        
        type: 2,
      });
    
        console.log(res,this.msgCode); // 是否注册过
      if (res.code == 200) {
        localStorage.Token = res.data.remember_token;
        localStorage.deviceid = res.data.device_id;
        if (res.data.is_new == 1) {
          this.$router.push("/setPass");
        } else {
          this.$router.push("/my");
        }
      } else {
        this.$toast({
          message: "验证码错误",
          position: "top",
        });
      }

    
    },
    // 倒计时结束时触发样式改变
    timeend() {
      this.timeOut = false;
      this.getCode = true;
      this.$refs.countDown.reset();
    },
  },
};
</script>


<style  lang="scss">
.login_pic_container {
  width: 100%;
  height: 1.52rem;
  .login_pic_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .pic_container {
      width: 85%;
      img {
        width: 100%;
      }
    }
  }
}
.login_input_container {
  width: 100%;
  height: 2.2rem;
  // background-color: powderblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_input_wrapper {
    width: 85%;
    .tel_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .pass_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .password_container {
      height: 6vh;
      font-size: 0.13rem;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.logon_input_container {
  width: 100%;
  height: 28vh;
  // background-color: powderblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .logon_input_wrapper {
    width: 85%;
    .logon_tel_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .logon_pass_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .logon_password_container {
      height: 6vh;
      font-size: 0.13rem;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.login_button_container {
  width: 100%;
  height: 10vh;
  // background-color: lightsalmon;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_button_wrapper {
    width: 85%;
  }
}
.changBottom {
  border-bottom: 0.01rem solid #fc5500;
}
.mes {
  width: 100%;
  color: white;
  height: 0.25rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 2.95rem;
  left: 0px;
  span {
    display: inline-block;
    width: 45%;
    font-size: 0.16rem;
    background-color: rgba(0, 0, 0, 0.534);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// .van-field__button{
//   width: 20px;
//   height: 10px;
// }
.time_box {
  margin: 0;
  padding: 0;
  height: 0.4rem;
  display: flex;
  align-items: center;
  color: #999;
  .van-count-down {
    text-align: center;
    height: 0.18rem;
    width: 0.2rm;
    font-size: 0.04rem;
    color: #999;
  }
}
</style>