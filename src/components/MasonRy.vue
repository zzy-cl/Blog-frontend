<!--author: zzy-->
<!---->
<template>
  <Waterfall :list="list" :breakpoints="breakpoints" :width="360">
    <template #item="{item}">
      <div class="card">
        <el-image style="width: 360px" :src=item.src fit="scale-down"/>
      </div>
    </template>
  </Waterfall>
</template>

<script setup>
import {Waterfall} from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/style.css'
import {getAlbumPictureList} from "@/api/picture";
import {ref} from "vue";

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
const list =ref([])
getAlbumPictureList({album_id:3}).then(res=>{
  console.log(res)
  list.value=res.data.data
})

</script>

<style lang="scss" scoped>
// 让照片再单独的小div中剧中
:deep(.waterfall-item) {
  display: flex;
  justify-content: center;
}
.el-image{
  border-radius: 10px;
}
</style>
