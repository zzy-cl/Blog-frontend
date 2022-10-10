<!--author: zzy-->
<!--页脚展示备案信息等-->
<template>
  <hr>
  <!--页脚，展示网站的相关信息-->
  <footer>
    <!--访问量-->
    <span>本站总访问量： {{ total_count }} 人</span>
    <!--所有权-->
    <span>
      Copyright © 2022 是zzy呀 All Rights Reserved
    </span>
    <!--备案信息-->
    <div>
      <span>
        <img height="18" src="https://s1.imagehub.cc/images/2022/09/08/ICP.png" alt="">
        <a href="https://beian.miit.gov.cn/" target="_blank">湘ICP备2022018737号-1</a>
      </span>
      <span>
        <img height="20" src="https://s1.imagehub.cc/images/2022/09/28/d31c47c8c3def2815fa4ee9d4eae4d88.png" alt="">
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=43011102002254" target="_blank">湘公网安备 43011102002254号</a>
      </span>
    </div>
    <!--网站运行时长-->
    <p id="RunTime">{{ RunTime }}</p>
  </footer>
</template>

<script setup>
import {ref, watch} from 'vue';
import {updateTotalCount} from "@/api/other";
import {useStore} from "@/stores/app";

const store = useStore()

// 运行时间
let BootDate = new Date("2022/05/29 00:00:00");
const RunTime = ref('')

const ShowRunTime = () => {
  let NowDate = new Date();
  let RunDateM = NowDate - BootDate // 可以进行加减
  let RunDays = Math.floor(RunDateM / (24 * 3600 * 1000));
  let RunHours = Math.floor(RunDateM % (24 * 3600 * 1000) / (3600 * 1000));
  let RunMinutes = Math.floor(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
  let RunSeconds = Math.round(RunDateM % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) / 1000);
  RunTime.value = `本博客已悄悄地运行了 ${RunDays} 天 ${RunHours} 时 ${RunMinutes} 分 ${RunSeconds} 秒(●'◡'●)`
}
setInterval(ShowRunTime, 1000)

// 总访问量
const total_count = ref('')
const getTotalCount = () => {
  if (!sessionStorage.getItem('total_count')) {
    updateTotalCount().then(res => {
      if (res.data.data) {
        sessionStorage.setItem('total_count', String(res.data.data[1][0]['total_count']))
        total_count.value = sessionStorage.getItem('total_count')
      }
    })
  } else {
    total_count.value = sessionStorage.getItem('total_count')
  }
}
watch(() => store.token, () => {
  getTotalCount()
}, {deep: true, immediate: true})
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  border-radius: 16px 16px 0 0;

  a {
    text-decoration: none;
    color: #333;
  }

  a:hover {
    color: #00a4ff;
  }
}

div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

div span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
}

div span img {
  margin-right: 5px;
}

//----------------------------------------
@media (max-width: 1280px) {
  footer {
    div {
      flex-direction: column;
    }
  }
}
</style>
