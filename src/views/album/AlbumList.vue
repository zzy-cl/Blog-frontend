<!--author: zzy-->
<!--图片集-->
<template>
  <div id="waterfall">
    <Waterfall :list="list" :breakpoints="breakpoints" :width="300" :gutter="20">
      <template #item="{item}">
        <div class="card" @click="interAlbum(item.album_id)">
          <el-image style="width: 300px;height: 300px" :src=item.cover_img fit="cover"/>
          <h2>{{ item.albumname }}</h2>
          <p>简介：{{ item.introduce }}</p>
          <p>创建时间：{{ item.create_time }}</p>
        </div>
      </template>
    </Waterfall>
  </div>
</template>

<script setup>
import {Waterfall} from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/style.css'
import {getAlbumsList} from "@/api/picture";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const breakpoints = {
  1200: { //当屏幕宽度小于等于1200
    rowPerView: 3,
  },
  800: { //当屏幕宽度小于等于800
    rowPerView: 2,
  },
  500: { //当屏幕宽度小于等于500
    rowPerView: 1,
  }
}
const list = ref([])
getAlbumsList().then(res => {
  list.value = res.data.data
})

const interAlbum = (id) => {
  router.push(`/picture/${id}`)
}
</script>

<style lang="scss" scoped>
#waterfall {
  margin: 0 1rem;
}

// 让照片再单独的小div中剧中
:deep(.waterfall-item) {
  display: flex;
  justify-content: center;
}

.card {
  width: 300px;
  border: 1px solid rgba(51, 51, 51, 0.3);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.5s linear;
  cursor: pointer;
}

.card:hover {
  box-shadow: 2px 2px 4px 2px rgba(51, 51, 51, 0.5);
  transform: scale(1.2);
  transition: all 0.5s linear;
}

.el-image {
  border-radius: 10px;
}

p, h2 {
  margin: 2px 10px;
  display: flex;
  justify-content: center;
}
</style>
