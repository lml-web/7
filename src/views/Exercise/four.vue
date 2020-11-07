<template>
  <div>
    <NavigationBar></NavigationBar>
    <!-- 下拉菜单 -->
    <div class="box_container">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="value1"
          :options="option1"
          title="类型不限"
        />
        <!-- <van-dropdown-item title="巩固全部错题"></van-dropdown-item> -->
      </van-dropdown-menu>
      <div>
        <span @click="onClickAll"><van-icon name="send-gift-o" />巩固全部考题</span>
        <span @click="remove"><van-icon name="todo-list-o" />移出考题</span>
      </div>
    </div>
    <!-- 空状态 -->
    <Null :title="'暂无错题记录'"></Null>
  </div>
</template>
<script>
//弹出框
import { Dialog } from "vant";
/* 引入头部 */
import NavigationBar from "@/components/navigation/NavigationBar";
/* 引入空状态 */
import Null from "@/components/null";
export default {
  components: {
    NavigationBar,
    Null,
  },
  data() {
    return {
      value1: 0,
      option1: [
        { text: "全部", value: 0 },
        { text: "套卷练习", value: 1 },
        { text: "考点专练", value: 2 },
        { text: "仿真模考", value: 3 },
      ],
    };
  },
  methods: {
    //进入巩固全部考题
    onClickAll(){
      this.$router.push("/fourAll")
    },
    //移出考题
    remove() {
      Dialog.confirm({
        message: "是否作对题目以后自动移出该错题",
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.box_container {
  width: 100vw;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .van-dropdown-menu {
    width: 25%;
    border: 0;
    box-shadow: 0;
    background: white;
  }
  span {
    margin: 0 10px;
    font-size: 0.15rem;
    .van-icon {
      margin: 0 2px;
      position: relative;
      top: 1.1px;
    }
  }
}
</style>