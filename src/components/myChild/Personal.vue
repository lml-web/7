<template>
  <div>
      <input ref="file" type="file" style="display:none;" @change="changeImg">
    <!-- 标题 -->
    <div class="back_container">
      <van-nav-bar title="个人信息" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="person_null"></div>
    <!-- 个人资料 -->
    <div class="all_data_container">
      <div class="all_data_wrapper">
        <span>头像</span>
        <div class="data_right" @click="changeHead">
          <span>
            <img :src="info.avatar" alt="" />
          </span>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="all_data_wrapper" @click="changeName">
        <span>昵称</span>
        <div class="name_data_right">
          <span> {{info.nickname}} </span>
          <van-icon name="arrow" size="0.25rem" color="#b7b7b7" />
        </div>
      </div>
      <div class="all_data_wrapper">
        <span>手机号</span>
        <div class="name_data_right">
          <span> {{info.mobile}} </span>
          <van-icon name="arrow" size="0.28rem" color="#fff" />
        </div>
      </div>
      <div class="all_data_wrapper" @click="changeSex">
        <span>性别</span>
        <div class="name_data_right">
          <span> {{info.sex | sex}} </span>
          <van-icon name="arrow" size="0.25rem" color="#b7b7b7" />
        </div>
      </div>
      <div class="all_data_wrapper" @click="changedate">
        <span>出生日期</span>
        <div class="name_data_right">
          <van-field v-model="info.birthday" input-align="right" />
          <van-icon name="arrow" size="0.25rem" color="#b7b7b7" />
        </div>
      </div>
      <div class="all_data_wrapper" @click="changes">
        <span>所在城市</span>
        <div class="name_data_right">
          <van-field v-model="dizhi" input-align="right" size="mini" />
          <van-icon name="arrow" size="0.25rem" color="#b7b7b7" />
        </div>
      </div>
      <div class="all_data_wrapper">
        <span>学科</span>
        <div class="name_data_right" @click="$router.push('/changeSubject')">
          <span style="margin-right:0.03rem;" v-for="(i,k) in info.attr" :key="k" v-show="i.attr=='学科'"> {{i.attr_value}}  </span>
          <van-icon name="arrow" size="0.25rem" color="#b7b7b7" />
        </div>
      </div>
      <div @click="gradePopup=true" class="all_data_wrapper">
        <span>年级</span>
        <div class="name_data_right">
                   <span v-for="(i,k) in info.attr" :key="k" v-show="i.attr=='年级'"> {{i.attr_value}} </span>

          <van-icon name="arrow" size="0.25rem" color="#b7b7b7" />
        </div>
      </div>
    </div>
    <!-- 更改头像 -->
    <van-popup v-model="headshow" position="bottom">
      <ul class="headStyle">
        <li @click="updataImg()">拍照</li>
        <li  @click="updataImg()">从手机相册选择</li>
        <li>取消</li>
      </ul>
    </van-popup>
    <!-- 时间选择 -->
    <van-popup v-model="dateshow" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmTime"
        @cancel="cancels"
      />
    </van-popup>
    
    <!-- 年级选择器 -->
    <van-popup v-model="gradePopup" position="bottom">
      
          <van-picker
        @confirm="onConfirm"
      show-toolbar
      :columns="columns"
    
    />

    </van-popup>

    <!-- 城市选择 -->
    <van-popup v-model="cityshow" position="bottom">
      <van-area
        :area-list="bm"
     
        @cancel="cancel"
        ref="djj"
        @change="Picker"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import { Area ,} from "vant";
import {updateImageSubmit,updateAjax,getAttribute} from "@/utils/api"
Vue.use(Area);
export default {
  data() {
    return {
      dizhi:"",
      gradePopup:false,
      headshow: false,
      dateshow: false,
      minDate: new Date(1890, 0, 1),
      maxDate: new Date(),
      currentDate:new Date(),
      birthdate: "",
      nowdate: new Date().toLocaleDateString(),
      changeCity: "内蒙古自治区，呼和浩特市，武川县",
      cityshow: false,
      areaList: "",
      bm: {
        province_list: {},
        city_list: {},
        county_list: {},
      },
      city: "",
      county: "",
      sheng: "",
      tem: "",
      info:"",
      columns:[],
      queryCity:{province_id: "110000", city_id: "110100", district_id: "110101"}
    };
  },
  methods: {

    // 获取学科信息
    async attribute(){


      let res = await getAttribute()
         console.log(res)
        //  this.columns=res.data[0]

         res.data[0].value.forEach((res)=>{
            this.columns.push({
              keyId:res.id,
              text:res.name
            })
         })
    },

   async onConfirm(val){
    this.gradePopup=false
     this.info.attr.push(val)
    //  let res = await updateAjax({})
     console.log(this.info.attr)
     let  arr = []
      this.info.attr.forEach((el, index) => {
         arr.push({
             "attr_id":el.attr_id,"attr_val_id":el.attr_val_id
         })
      });

      arr.push({
         "attr_id":1,"attr_val_id":val.keyId
      })
   
      arr=arr.filter((res)=>{
        return res.attr_id
      })
      

        console.log(arr)
        let  res = await updateAjax({'user_attr':JSON.stringify(arr)})
        // console.log(res)
        this.getInfo()
    
    },

    // 获取个人信息
    getInfo(){

    

       this.$http.get("/api/app/userInfo").then((res) => {
      console.log(res);
      this.info=res.data
      this.dizhi=res.data.province_name+" "+res.data.city_name+" "+res.data.district_name
    
    this.currentDate=new Date(res.data).toLocaleDateString().replaceAll('/','-')
   
  console.log(this.currentDate)
   });

    },
   
  //  更新头像
    updataImg(){

      this.$refs.file.click()  

    },
  
  // 上传图片
   async changeImg(){

      let formdata = new FormData()
       
      formdata.append("file",event.target.files[0])
      console.log(formdata)

      let { data:res } = await updateImageSubmit(formdata)
         console.log(res)
      
      // 调用更新图片方法
        this.updateInfoImg({
                avatar:res.path
            })

    },

    // 更新图片
    async updateInfoImg(params){
        let res = await updateAjax(params)
        console.log(res)
        if(res.code==200){ 
           //更新成功重新渲染页面
           this.headshow=false
          this.getInfo()
         
        }

    },

    // 点击左上角返回
    onClickLeft() {
      this.$router.push("/my");
    },
    // 点击头像选择框
    changeHead() {
      this.headshow = true;
    },
    // 跳转到改变名字页面
    changeName() {
      this.$router.push({
          path:"/changeName",
          query:{
            name:this.info.nickname,
            mobile:this.info.mobile
          }
          
        });
    },
    // 改变性别
    changeSex() {
      this.$router.push({
         path:"/changeSex",
          query:{
           sex:this.info.sex
          }}
      );
    },
    changes() {
      this.cityshow = true;
      this.bm = { ...this.bm };
      console.log(this.bm);
    },
    // 日期
    changedate() {
      this.dateshow = true;
    },
    // 时间选择框的完成
  async  confirmTime(val) {
      // console.log(val.toLocaleDateString());
      // console.log(this.nowdate);
      if (new Date(val).toLocaleDateString() == this.nowdate) {
        this.$toast("出生日期最少是当前日期的前一天");
      } else {
        this.birthdate = new Date(val).toLocaleDateString();
        this.birthdate=this.birthdate.replace(/\//g,'-')
        this.dateshow = false;
        
        let res = await updateAjax({birthday:new Date( val).toLocaleDateString().replaceAll('/','-')})

        console.log(res)
        this.getInfo()
    

      }
    },
    // 时间取消
    cancels() {
      this.dateshow = false;
    },
    
    // 确认修改城市
   async confirm(){
    let res = await updateAjax(this.queryCity)
    console.log(res)
    if(res.code==200){

      this.getInfo()
      this.cityshow=false

    }

    },

    // 城市选择取消
    cancel() {
      this.cityshow = false;
    },
    // 当改变省份时
    async Picker(Picker, data, index) {
      console.log( data, index);
      if (index == 0) {
        this.sheng = data[index].name;
        console.log(data[index])
        this.queryCity.province_id=data[index].code
        var datases = await this.$http.get(
          "/api/app/sonArea/" + data[index].code
        );
        this.bm.city_list = {};
        console.log( datases.data)
        datases.data.forEach((el) => {
          this.$set(this.bm.city_list, el.id, el.area_name);
        });

        var arr = [];
        for (const key in this.bm.city_list) {
          arr.push(key);
        }
        // console.log(arr);
        var datas = await this.$http.get("/api/app/sonArea/" + arr[0]);
        // console.log(datas.data);
        datas.data.forEach((el) => {
          this.$set(this.bm.county_list, el.id, el.area_name);
        });
        this.queryCity={
          province_id: data[index].code, city_id:datases.data[0].id, district_id: datas.data[0].id
        }
        console.log(datases)

      } else if (index == 1) {
        // window.alert("jinini");
        this.city = data[index].name;
        this.queryCity.city_id=data[index].code
        var data = await this.$http.get("/api/app/sonArea/" + data[index].code);
        data.data.forEach((el) => {
          this.$set(this.bm.county_list, el.id, el.area_name);
        });
        console.log(data)
        this.queryCity.district_id=data.data[0].code
      } else if (index == 2) {
        this.county = data[index].name;
        this.queryCity.district_id=data[index].code
        
        this.tem = this.sheng + "," + this.city + "," + this.county;
        // console.log(this.tem);
      }
    },
    async beijing() {
      var res = await this.$http.get("/api/app/sonArea/0");
      res.data.forEach((element) => {
        this.bm.province_list[element.id] = element.area_name;
      });
      // console.log(this.bm.province_list);
      var arrs = [];
      for (const keys in this.bm.province_list) {
        arrs.push(keys);
      }
      console.log(arrs[0]);
      var data = await this.$http.get("/api/app/sonArea/" + arrs[0]);

      data.data.forEach((el) => {
        this.$set(this.bm.city_list, el.id, el.area_name);
      });
      // alert(this.bm.city_list)
      var arr = [];
      for (const key in this.bm.city_list) {
        arr.push(key);
      }
      var datas = await this.$http.get("/api/app/sonArea/" + arr[0]);

      datas.data.forEach((el) => {
        this.$set(this.bm.county_list, el.id, el.area_name);
      });
      // console.log(this.bm.city_list);
      // console.log(this.bm.county_list);
    },
  },
  mounted() {
    this.beijing();
    this.attribute()
  },
  created(){
    this.getInfo()

  }
};
</script>
<style lang="scss" soped>
.back_container {
  width: 100%;
}
.person_null {
  width: 100%;
  height: 0.1rem;
  background-color: #f0f2f5;
}
// 个人资料
.all_data_container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .all_data_wrapper {
    width: 90%;
    height: 0.7rem;
    font-size: 0.14rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f2f5;
    .data_right {
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      //   个人资料头像
      span {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .van-icon-arrow {
        font-size: 0.28rem;
        color: #b7b7b7;
        font-weight: 100;
      }
    }
    // 其余个人资料
    .name_data_right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #8c8c8c;
    }
  }
}
.headStyle {
  width: 100%;
  li {
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.01rem solid #f0f2f5;
  }
}
.van-icon-arrow-left {
  color: #000 !important;
  font-size: 0.25rem !important;
}
.van-nav-bar__title {
  font-size: 0.22rem !important;
}
.van-field__control {
  color: #8c8c8c !important;
  font-size: 0.14rem !important;
}
</style>