<!--author: zzy-->
<!---->
<template>
  <div id="author">
    <el-avatar :size="100" src="https://img1.imgtp.com/2022/09/05/McQtgYnF.jpg" @click="aboutMe"/>
    <h3 @click="aboutMe">是zzy呀</h3>
  </div>

  <div id="site">
    <h2 @click="aboutSite">呓语の小屋</h2>
    <p>世事漫随流水，算来一梦浮生</p>
  </div>

  <div id="catetag">
    <!--    首页-->
    <div class="btnlist" @click="shouYe">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouye"></use>
      </svg>
    </div>
    <!--    归档-->
    <div class="btnlist" @click="filePage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shounahe"></use>
      </svg>
      <p>{{ articleCount }}</p>
    </div>
    <!--    分类-->
    <div class="btnlist" @click="catePage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dingdan"></use>
      </svg>
      <p>{{ cateCount }}</p>
    </div>
    <!--    标签-->
    <div class="btnlist" @click="tagPage">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-biaoqian"></use>
      </svg>
      <p>{{ tagCount }}</p>
    </div>
    <div class="btnlist">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shezhi"></use>
      </svg>
    </div>
  </div>
  <hr>

  <!--  社交-->
  <div id="socialcontact">
    <!--    qq-->
    <div class="sociconbtn">
      <a href="https://s1.imagehub.cc/images/2022/07/07/qq.jpg" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq"></use>
        </svg>
      </a>
    </div>
    <!--    微信-->
    <div class="sociconbtn">
      <a href="https://s1.imagehub.cc/images/2022/07/07/weixin.jpg" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-wechat"></use>
        </svg>
      </a>
    </div>
    <!--    github-->
    <div class="sociconbtn">
      <a href="https://github.com/zzy-cl" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-github"></use>
        </svg>
      </a>
    </div>
    <!--    csdn-->
    <div class="sociconbtn">
      <a href="https://blog.csdn.net/qq_45882139" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-csdn"></use>
        </svg>
      </a>
    </div>
    <!--    pixiv-->
    <div class="sociconbtn">
      <a href="https://www.pixiv.net/users/85997689" target="_blank">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pixiv"></use>
        </svg>
      </a>
    </div>

  </div>
  <hr>

  <!--  其他功能-->
  <div id="other">
    <div>
      <!--    李花花-->
      <div class="otherbtn" @click="aboutGirlfriend">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
      </div>
      <!--    相册-->
      <div class="otherbtn" @click="album">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaozhang"></use>
        </svg>
      </div>
      <!--    书籍资料-->
      <div class="otherbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shu1"></use>
        </svg>
      </div>
      <!--      待办事项-->
      <div class="otherbtn" @click="inComplete">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-renwuguanli"></use>
        </svg>
      </div>
    </div>

    <div>
      <!--      通知-->
      <div class="otherbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tongzhi"></use>
        </svg>
      </div>
      <!--    视频-->
      <div class="otherbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yunshipin"></use>
        </svg>
      </div>
      <!--    追剧-->
      <div class="otherbtn" @click="drama">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianshiju"></use>
        </svg>
      </div>
      <!--      游戏-->
      <div class="otherbtn">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-youxi1"></use>
        </svg>
      </div>
    </div>
    <div class="otherbtn changetheme" @click="changeTheme()">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-heian"></use>
      </svg>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {getArticlesCountFe, getArtCates, getArtTags} from "@/api/filecatetag";
import theme from "@/styles/theme/theme";

// 更换主题函数
function changeTheme() {
  const type = localStorage.getItem('theme') == 'white' ? 'black' : 'white';
  localStorage.setItem('theme', type)
  theme.changeTheme(type)
}

const router = useRouter()

const articleCount = ref(0)
const cateCount = ref(0)
const tagCount = ref(0)
const getFilecatetagCount = () => {
  getArticlesCountFe().then(res => {
    articleCount.value = res.data.data[0]['COUNT(*)']
  })
  getArtCates().then(res => {
    cateCount.value = res.data.data.length
  })
  getArtTags().then(res => {
    tagCount.value = res.data.data.length
  })
}
getFilecatetagCount()

// 关于作者（我）
const aboutMe = () => {
  router.push('/contentinfo/1')
}
// 关于网站
const aboutSite = () => {
  router.push('/contentinfo/3')
}
// 关于女朋友
const aboutGirlfriend = () => {
  router.push('/contentinfo/2')
}
// 首页
const shouYe = () => {
  router.push('/contentlist')
}
// 归档
const filePage = () => {
  router.push('/file')
}
// 分类
const catePage = () => {
  router.push('/cate')
}
// 标签
const tagPage = () => {
  router.push('/tag')
}
// 相册
const album = () => {
  router.push('/album')
}
// 待办
const inComplete = () => {
  router.push('/incomplete')
}
// 追剧
const drama = () => {
  router.push('/drama')
}
</script>

<style lang="scss" scoped>
hr {
  border: 0;
  border-bottom: 0.5px solid rgba(51, 51, 51, 0.5);
  margin: 0 15px;
}

#site {
  height: 90px;
}

#author, #site, {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;

  h3 {
    cursor: pointer;
    color: #00a4ff;
  }
}

#site {

  h2 {
    cursor: pointer;
    font-weight: 900;
  }
}

// 标签分类
#catetag {
  height: 90px;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  .btnlist {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
  }

  .btnlist:nth-child(1), .btnlist:nth-child(5) {
    border: 1px var(--button-color) solid;
    border-radius: 50%;

    .icon {
      width: 30px;
      height: 30px;
    }

  }

  .btnlist:nth-child(1):hover, .btnlist:nth-child(5):hover {
    background-color: var(--button-color1);
  }

  .btnlist:nth-child(3) {
    border-left: 0.5px var(--button-color) solid;
    border-right: 0.5px var(--button-color) solid;
  }
}

// 社交
#socialcontact {
  height: 70px;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;

  .sociconbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .sociconbtn:hover {
    background-color: var(--button-color1);
  }
}

//其他
#other {
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    overflow: hidden;
  }

  .otherbtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;

    .icon {
      width: 40px;
      height: 40px;
    }
  }

  .otherbtn:hover {
    background-color: var(--button-color1);
  }
}

.changetheme {
  border: 1px solid var(--button-color);
}
</style>
