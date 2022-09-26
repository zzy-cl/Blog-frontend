<!--author: zzy-->
<!---->
<template>
  <div class="body">

    <!--侧边栏-->
    <div class="side-menu">
      <SidebarBody></SidebarBody>
    </div>

    <!--主体-->
    <div class="main">
      <el-scrollbar height="100vh">
        <!--头部-->
        <header>
          <h1>{{ articleInfo.title }}</h1>
          <h5>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-author"></use>
            </svg>
            作者： {{ articleInfo.username }}
          </h5>
          <span>阅读量：{{ articleInfo.read_count }}</span>
          <span>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-calendar2"></use>
              </svg>
              发表于： {{ articleInfo.create_time }}
            </p>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-calendar2"></use>
              </svg>
              更新于： {{ articleInfo.update_time }}</p>
          </span>
          <span>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-folderOpen"></use>
              </svg> 分类： {{ articleInfo.catename }}
            </p>
            <p>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tags"></use>
              </svg>
              标签： {{ articleInfo.tagnames }}</p>
          </span>
        </header>

        <el-divider>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shu"></use>
          </svg>
        </el-divider>

        <!--文章区-->
        <v-md-preview :text="text"></v-md-preview>

        <!--评论区-->
        <WalinePage></WalinePage>
        <!--页脚，展示网站的相关信息-->
        <FooterDisplay></FooterDisplay>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import {getArticleinfo, getArticlesFeInfo, getArticleTagsFe} from "@/api/content";
import FooterDisplay from "@/components/FooterDisplay.vue";
import WalinePage from "@/components/WalinePage.vue";
import {useRoute} from "vue-router";
import SidebarBody from "@/views/sidebardetails/SidebarBody.vue";

const route = useRoute()

let text = ref('内容无法加载...')
// console.log(route.params.article_id)
const articleInfo = ref({})

//请求函数
const onsubmit = (article_id) => {
  getArticlesFeInfo({article_id: article_id}).then(res => {
    console.log(res)
    articleInfo.value = res.data.data[1][0]
    articleInfo.value.tagnames = ''
    getArticleTagsFe(articleInfo.value).then(res => {
      for (let j = 0; j < res.data.data.length; j++) {
        if (j === res.data.data.length - 1) {
          articleInfo.value.tagnames += res.data.data[j].tagname
        } else {
          articleInfo.value.tagnames += res.data.data[j].tagname + ' | '
        }
      }
    })
    articleInfo.value.content = articleInfo.value.content.match(/u[\S]*/)
    getArticleinfo(articleInfo.value.content).then(res => {
      text.value = res.data
    })
  })
}

//侦听器，监听 route.params 的变化，然后更新内容
watch(() => route.params, (value) => {
  onsubmit(value.article_id)
}, {deep: true, immediate: true})

</script>

<style lang="scss" scoped>
.body {
  display: flex;
}

.icon {
  width: 15px;
  height: 15px;
}

//侧边菜单栏
.side-menu {
  background-color: var(--background);
  width: 320px;
  height: 100vh;
}

//主体
.main {
  height: 100vh;
  width: 100%;
  flex: 1;
}

// 分割线
.el-divider {
  border: 10px;
  background-color: var(--pink-color);
}

:deep(.el-divider__text) {
  background-color: transparent;

  .icon {
    width: 30px;
    height: 30px;
  }
}

.el-scrollbar {
  background-color: var(--background);
  margin: 0 1rem;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

header span {
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0 0.5rem;
  }
}

// 内容展示区
.v-md-editor-preview {
  :deep(.github-markdown-body) {
    padding: 1rem 2rem;
  }
}

//-----------------------------------------
@media (max-width: 600px) {
  header span {
    display: block;
  }
}

@media (max-width: 1280px) {
  .side-menu {
    display: none;
  }
}
</style>
