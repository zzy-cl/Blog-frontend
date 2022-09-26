<!--author: zzy-->
<!---->
<template>
  <div>
    <!--首页头部旋转球球-->
    <div id="home-head">
      <div id="home-info">
        <span class="loop"></span>
        <span class="loop"></span>
        <span class="loop"></span>
        <span class="loop"></span>
        <span class="loop">
              <div class="wrap">
                <h1>呓语の小屋</h1>
                <h3>Hi, I'm zzy.</h3>
                <h5></h5>
              </div>
            </span>
      </div>
    </div>
    <div class="articlelist">
      <el-card shadow="hover" v-for="item in tableData" :key="item" body-style="padding:0;display:flex;">
        <!--文章图片-->
        <el-image :src=item.cover_img></el-image>

        <div class="kong"></div>
        <div class="maininfo">
          <h1 @click="getArticleFeInfo(item)">{{ item.title }}</h1>
          <!--时间信息-->
          <div class="date">
            <span>
                    <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-calendar2"></use>
            </svg>
              发表于：{{ item.create_time }}
            </span>
            <span>
                    <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-calendar2"></use>
            </svg>
              更新于：{{ item.update_time }}
            </span>
          </div>
          <!--分类标签-->
          <div class="categories">
            <!--分类-->
            <span>
                    <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-folderOpen"></use>
            </svg>
              {{ item.catename }}
            </span>
            <!--标签-->
            <span>
                    <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tags"></use>
            </svg>
          {{ item.tagnames }}
            </span>
          </div>
        </div>
      </el-card>
    </div>
    <div id="pagination">
      <el-pagination background layout="prev, pager, next" @size-change="handlesizeChange"
                     @current-change="handlecurrentChange" :current-page="limitForm.pageNum"
                     :page-size="limitForm.pageSize" :pager-count="6" :total=count></el-pagination>
    </div>
  </div>
</template>

<script setup>
import {getArticlesFe, getArticleTagsFe} from "../../api/content";
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router'

const router = useRouter()

// 分页
const limitForm = reactive({
  pageNum: 1,// 页码
  pageSize: 10// 每页显示的条数
})
const handlesizeChange = (pageSize) => {
  limitForm.pageNum = 1;
  limitForm.pageSize = pageSize;
  onSubmit();
};
const handlecurrentChange = (pageNum) => {
  limitForm.pageNum = pageNum;
  sessionStorage.setItem('pageNum', pageNum)
  onSubmit();
};
const count = ref(0); // 总数量
const tableData = ref([])
const onSubmit = () => {
  // 把页数保存到会话存储，防止刷新页面造成丢失
  if (sessionStorage.getItem('pageNum') !== null) {
    limitForm.pageNum = Number(sessionStorage.getItem('pageNum'))
  }
  getArticlesFe(limitForm).then(res => {
    console.log(res)
    count.value = res.data.data[0][0]["COUNT(*)"]
    tableData.value = res.data.data[1]
    for (let i = 0; i < tableData.value.length; i++) {
      tableData.value[i].tagnames = ''
      getArticleTagsFe(tableData.value[i]).then(res => {
        for (let j = 0; j < res.data.data.length; j++) {
          if (j === res.data.data.length - 1) {
            tableData.value[i].tagnames += res.data.data[j].tagname
          } else {
            tableData.value[i].tagnames += res.data.data[j].tagname + ' | '
          }
        }
      })
    }
  })
}
setTimeout(() => {
  onSubmit()
}, 200)

const getArticleFeInfo = (item) => {
  // 不会添加history记录，无法回退
  // router.replace('/contentinfo')
  // 可以回退
  let article_id = item.article_id
  router.push(`/contentinfo/${article_id}`)
}
</script>

<style lang="scss" scoped>
#home-head {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

#home-info {
  width: 35rem;
  height: 35rem;
  position: relative;

  .loop {
    position: absolute;
    width: 35rem;
    height: 35rem;
    display: inline-block;
  }

  // 第一个圈
  .loop:first-child {
    border-radius: 38% 62% 63% 37%/41% 44% 56% 59%;
    background: var(--background1);
    opacity: .3;
    transform: rotate(30deg);
    animation: loop1 10s linear infinite;
  }

  @keyframes loop1 {
    0% {
      transform: rotate(30deg)
    }
    100% {
      transform: rotate(390deg)
    }
  }
  // 第二个圈
  .loop:nth-child(2) {
    border-radius: 38% 62% 63% 37%/41% 44% 56% 59%;
    background: var(--background1);
    opacity: 0.45;
    transform: rotate(60deg);
    animation: loop2 15s linear infinite;
  }

  @keyframes loop2 {
    0% {
      transform: rotate(60deg)
    }
    100% {
      transform: rotate(420deg)
    }
  }
  // 第三个圈
  .loop:nth-child(3) {
    border-radius: 38% 62% 63% 37%/41% 44% 56% 59%;
    background: var(--background1);
    opacity: 0.3;
    transform: rotate(90deg);
    animation: loop3 10s linear infinite;
  }

  @keyframes loop3 {
    0% {
      transform: rotate(90deg)
    }
    100% {
      transform: rotate(450deg)
    }
  }
  // 第四个圈
  .loop:nth-child(4) {
    border-radius: 38% 62% 63% 37%/41% 44% 56% 59%;
    background: var(--background1);
    opacity: 0.45;
    transform: rotate(120deg);
    animation: loop4 15s linear infinite;
  }

  @keyframes loop4 {
    0% {
      transform: rotate(120deg)
    }
    100% {
      transform: rotate(480deg)
    }
  }

  .loop:nth-child(5) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loop .wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .loop .wrap h1 {
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 10px;
    color: var(--font-color);
    letter-spacing: 10px
  }

  .loop .wrap h3 {
    font-size: 3rem;
    color: var(--font-color);
    margin: 10px 0;
    font-weight: 700;
  }
}

.articlelist {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-card {
  width: 60rem;
  height: 15rem;
  margin: 1rem;
  opacity: 0.8;
  border-radius: 16px;
}

.icon {
  width: 15px;
  height: 15px;
}

.date span {
  margin: 0 1rem;
}

// 封面图
.el-image {
  height: 15rem;
}

.maininfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.kong {
  flex: 1;
}

.categories span {
  margin: 0 20px;
  font-size: 10px;
  color: var(--font-color1);
}

h1, .categories span {
  cursor: pointer;
}

#pagination {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

:deep(.btn-prev), :deep(.btn-next), :deep(.el-pager li) {
  //background-color: transparent !important;
  opacity: 0.7;

  //  button i
}

// {
//  background-color: transparent !important;
//}

//------------------移动端---------------------
@media (max-width: 1280px) {
  .el-image, .kong {
    display: none;
  }
  .el-card {
    height: 225px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .categories {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .date {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
