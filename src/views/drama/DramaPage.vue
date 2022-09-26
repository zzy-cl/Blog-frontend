<!--author: zzy-->
<!---->
<template>
  <div id="dramapage">
    <div class="header">
      <h1>网剧记录</h1>
    </div>

    <div class="btns">
      <div class="dramabtn" @click="wantSee">
        <div class="dramaname">想看</div>
        <div class="dramacount">{{ countForm.count1 }}</div>
      </div>
      <div class="dramabtn" @click="newSee">
        <div class="dramaname">在看</div>
        <div class="dramacount">{{ countForm.count2 }}</div>
      </div>
      <div class="dramabtn" @click="overSee">
        <div class="dramaname">已看</div>
        <div class="dramacount">{{ countForm.count3 }}</div>
      </div>
    </div>
    <h2 style="margin:1rem 0 0 10px">网剧状态：{{ dramaname }}，共{{ count }}部网剧</h2>

    <div>
      <div v-for="(item,index) in dramasListForm" :key="index" class="drama">
        <el-image :src="item.cover_img" fit="cover"/>
        <div class="content">
          <div class="dramaname1">
            <a :href="item.url" target="_blank"><h2>{{ item.dramaname }}</h2></a>
          </div>
          <div class="dramainfo">
            <div class="info"><span>网剧集数</span><span>{{ item.newset }}/{{ item.allset }}</span></div>
            <div class="info"><span>网剧平台</span><span>{{ item.platform }}</span></div>
            <div class="info"><span>网剧类型</span><span>{{ item.category }}</span></div>
            <div class="info"><span>网剧状态</span><span>{{ item.state }}</span></div>
            <div class="info"><span>更新时间</span><span>{{ item.updatetime }}</span></div>
            <!--            <div><span>平台</span><span>{{ item.platform }}</span></div>-->
          </div>
          <div class="indroduce"><p>简介：{{ item.introduce }}</p></div>
        </div>
      </div>
    </div>

    <WalinePage></WalinePage>
  </div>
</template>

<script setup>
import {getDramasListFe} from "@/api/drama";
import {ref} from "vue";
import WalinePage from "@/components/WalinePage.vue";

const countForm = ref([])
const getCount = () => {
  getDramasListFe({state: '想看'}).then(res => {
    countForm.value.count1 = res.data.data.length
  })
  getDramasListFe({state: '在看'}).then(res => {
    countForm.value.count2 = res.data.data.length
  })
  getDramasListFe({state: '已看'}).then(res => {
    countForm.value.count3 = res.data.data.length
  })
}
getCount()

const dramasListForm = ref([])
const count = ref(0)
const dramaname = ref('')
const wantSee = () => {
  getDramasListFe({state: '想看'}).then(res => {
    console.log(res.data.data)
    dramasListForm.value = res.data.data
    count.value = res.data.data.length
    dramaname.value = '想看'
  })
}
const newSee = () => {
  getDramasListFe({state: '在看'}).then(res => {
    dramasListForm.value = res.data.data
    count.value = res.data.data.length
    dramaname.value = '在看'
  })
}
newSee()
const overSee = () => {
  getDramasListFe({state: '已看'}).then(res => {
    dramasListForm.value = res.data.data
    count.value = res.data.data.length
    dramaname.value = '已看'
  })
}
</script>

<style lang="scss" scoped>
#dramapage {
  margin: 0 1rem;
  background-color: var(--background);
}

.header {
  display: flex;
  justify-content: center;
}

.btns {
  display: flex;

  .dramabtn {
    width: 90px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    background-color: var(--button-color);
    border-radius: 0 15px;
    margin: 0 10px;
    cursor: pointer;

    .dramaname {
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dramacount {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--button-color2);
      border-radius: 15px 15px 0 15px;
    }
  }
}

.drama {
  display: flex;
  justify-content: space-around;
  margin: 1rem;
  background-color: var(--background1);
  border-radius: 10px;
  //封面
  .el-image {
    width: 180px;
    height: 240px;
    margin: 1rem;
  }

  //主体内容
  .content {
    flex: 1;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    //标题
    .dramaname1 {
      width: 100%;
    }

    //详细信息
    .dramainfo {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      margin: 1rem 0;

      div {
        width: 110px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .dramainfo div:nth-child(2), .dramainfo div:nth-child(4) {
      border-left: 0.5px var(--button-color) solid;
      border-right: 0.5px var(--button-color) solid;
    }

  }
}

//---------------------移动端----------------------
@media (max-width: 1280px) {
  .drama {
    .el-image {
      width: 90px;
      height: 120px;
    }

    .content {

      .dramainfo div:nth-child(2), .dramainfo div:nth-child(3), .dramainfo div:nth-child(4) {
        display: none;
      }

      .dramainfo div:nth-child(1) {
        border-right: 0.5px var(--button-color) solid;
      }

      .indroduce {
        display: none;
      }
    }
  }
}
</style>
