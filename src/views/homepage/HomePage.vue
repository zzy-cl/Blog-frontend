<!--author: zzy-->
<!---->
<template>
  <div class="body">
    <!--左上按钮-->
    <div class="side-button side-button-outside" v-if="sidemenu===false" @click="sidemenu=true">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-menu2"></use>
      </svg>
    </div>

    <!--侧边菜单栏-->
    <Transition name="side">
      <div class="side-menu" v-if="sidemenu===true">
        <!--关闭按钮图标-->
        <div class="side-button side-button-inside" @click="sidemenu=false">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-off-search"></use>
          </svg>
        </div>
        <!--主体-->
        <SidebarBody></SidebarBody>
      </div>
    </Transition>
    <!--侧边空白区-->
    <Transition name="sideblank">
      <div class="sideblank" v-if="sidemenu===true"></div>
    </Transition>
    <!--main内容区-->
    <div class="main">
      <!--主体内容-->
      <el-scrollbar height="100vh">
        <!--页面插入处-->
        <transition mode="out-in" enter-active-class="animate__animated animate__rollIn"
                    leave-active-class="animate__animated animate__rollOut">
          <router-view/>
        </transition>

        <!--页脚信息展示-->
        <FooterDisplay></FooterDisplay>

      </el-scrollbar>

    </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useStore} from "../../stores/app";
import SidebarBody from "@/views/sidebardetails/SidebarBody.vue";
import FooterDisplay from "@/components/FooterDisplay.vue";
import 'animate.css';

const homeStore = useStore()
let sidemenu = ref(false) // 控制侧边菜单栏弹出缩回
// 游客登陆
const userinfo = reactive({
  username: '游客',
  password: '123456'
})
homeStore.login(userinfo)
</script>

<style lang="scss" scoped>
.body {
  display: flex;
}

.side-button {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin: 1rem;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.side-button:hover {
  background-color: var(--pink-color);
}

// 侧边栏弹出图标
.icon {
  width: 2em;
  height: 2em;
}

//侧边菜单栏
.side-menu {
  width: 320px;
  height: 100vh;
  position: fixed;
  z-index: 1;
  background-color: var(--background);
  //background-color: var(--background);
}

// 菜单栏
.side-enter-active {
  transition: transform 0.2s linear;
}

.side-leave-active {
  transition: transform 0.2s linear;
}

.side-enter-from,
.side-leave-to {
  transform: translate(-320px, 0);
}

// 空白占位区
.sideblank {
  width: 320px;
  height: 100vh;
}

// 白色占位区过渡动画
.sideblank-enter-active {
  transition: width 0.18s linear;
}

.sideblank-leave-active {
  transition: width 0.18s linear;
}

.sideblank-enter-from,
.sideblank-leave-to {
  width: 0;
}

//主体
.main {
  height: 100vh;
  flex: 1;
}

//-----------------------------------------
@media (max-width: 1280px) {
  .sideblank {
    display: none;
  }
}
</style>
