<!--author: zzy-->
<!--分类-->
<template>
  <div id="filepage">
    <div class="header">
      <h1>分类</h1>
    </div>
    <div class="cates">
      <div class="catebtn animate__animated animate__backInDown" v-for="(item,index) in catesList" :key="index"
           @click="getArticlesList(item)">
        <div class="catename">{{ item.catename }}</div>
        <div class="catecount">{{ item.count }}</div>
      </div>
    </div>
    <el-timeline>
      <h2>{{ catename }}共{{ count }}篇文章</h2>
      <el-timeline-item
          v-for="(item, index) in articleList"
          :key="index"
          :timestamp="item.publish_time"
          placement="top"
          :color="item.color"
          icon="StarFilled"
          size="large"
      >
        <el-card shadow="hover" @click="articleInfo(item.article_id)">
          <p>第{{ item.article_id }}篇：《{{ item.title }}》</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <!--评论区-->
    <WalinePage></WalinePage>
  </div>
</template>

<script setup>
import {getArtCates, getCateArticleList} from "@/api/filecatetag";
import {ref} from "vue";
import {useRouter} from "vue-router";
import 'animate.css';

const router = useRouter()

// 获取分类列表
const catesList = ref([])
getArtCates().then(res => {
  catesList.value = res.data.data
  for (let i = 0; i < catesList.value.length; i++) {
    getCateArticleList({cate_id: res.data.data[i].cate_id}).then(res => {
      catesList.value[i].count = res.data.data.length
    })
  }
})

// 获取文章列表
const articleList = ref([])
const catename = ref('')
const count = ref(0)
const getArticlesList = (item) => {
  getCateArticleList({cate_id: item.cate_id}).then(res => {
    articleList.value = res.data.data
    for (let i = 0; i < articleList.value.length; i++) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      articleList.value[i].color = `rgb(${r},${g},${b})`
    }
    count.value = res.data.data.length
    catename.value = `分类:${item.catename},`
  })
}
// 跳转
const articleInfo = (article_id) => {
  router.push(`/contentinfo/${article_id}`)
}
</script>

<style lang="scss" scoped>
// 头部
.header {
  display: flex;
  justify-content: center;
}

// 分类列表
.cates {
  display: flex;
  justify-content: center;
  flex-flow: wrap;

  .catebtn {
    width: 100px;
    height: 30px;
    font-family: 'Songti SC', 'Noto Serif SC', STZhongsong, STKaiti, Roboto, serif;
    color: var(--font-color);
    display: flex;
    justify-content: space-between;
    background-color: var(--button-color);
    border-radius: 7px;
    cursor: pointer;
    margin: 10px;
    border-radius: 0 15px;
    transition: all 1s linear 0s;

    .catename {
      font-weight: 900;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 30px;
    }

    .catecount {
      width: 30px;
      height: 30px;
      font-weight: 900;
      background-color: var(--button-color3);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px 15px 0 15px;
      transition: all 1s linear 0s;
    }
  }

  .catebtn:hover {
    background-color: var(--button-color2);
    color: var(--font-color);

    .catecount:hover {
      background-color: var(--button-color);
      transition: all 1s linear 0s;
    }
  }
}

#filepage {
  margin: 0 1rem;
  background-color: var(--background);
}

#waline {
  background-color: rgba(255, 255, 255, 0);
}

.el-card {
  cursor: pointer;
  margin-right: 3rem;
  border-radius: 16px;
}

:deep(.el-timeline-item__tail) {
  border-left: 2px solid var(--pink-color);
}
</style>
