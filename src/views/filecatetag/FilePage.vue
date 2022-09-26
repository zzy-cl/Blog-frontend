<!--author: zzy-->
<!--归档-->
<template>
  <div id="filepage">
    <div class="header">
      <h1>归档</h1>
    </div>
    <el-timeline>
      <h2>共{{ count }}篇文章</h2>
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
import {getArticlesFe} from "@/api/filecatetag";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const form = reactive({
  pageNum: 1,
  pageSize: 10000
})
const articleList = ref([])
const count = ref(0)
getArticlesFe(form).then(res => {
  articleList.value = res.data.data[1]
  count.value = res.data.data[0][0]['COUNT(*)']
  for (let i = 0; i < articleList.value.length; i++) {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    articleList.value[i].color = `rgb(${r},${g},${b})`
  }
})
const articleInfo = (article_id) => {
  router.push(`/contentinfo/${article_id}`)
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
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
