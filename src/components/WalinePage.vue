<template>
  <div id="waline">
    <div class="text">
      <p>如果您有任何关于博客内容的相关讨论，欢迎前往博客的 <a href="https://github.com/zzy-cl/BabblingCabin/issues"
                                                              target="_blank">GitHub Discussions</a> 与我交流或直接在下方留言
      </p>
    </div>
    <Waline :serverURL="serverURL" :path="path" :emoji="emoji"/>
  </div>
</template>
<script setup>
import {computed, reactive} from 'vue';
import {useRoute} from 'vue-router';
import {Waline} from '@waline/client/dist/component';
import '@waline/client/dist/waline.css';

const serverURL = 'https://waline.zhaozeyu.top'
const path = computed(() => useRoute().path)
const emoji = reactive(
    [
      '//unpkg.com/@waline/emojis@1.1.0/qq',
      '//unpkg.com/@waline/emojis@1.1.0/bilibili',
      '//unpkg.com/@waline/emojis@1.1.0/tw-emoji',
      '//unpkg.com/@waline/emojis@1.1.0/alus',
      '//unpkg.com/@waline/emojis@1.1.0/tieba'
    ]
)
</script>
<style>
#waline {
  background-color: var(--background);
}

.text {
  border: 2px pink dashed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
}

:root {
  /* 字体大小 */
  --waline-font-size: 16px;

  /* 常规颜色 */
  --waline-white: #fff;
  --waline-light-grey: #999;
  --waline-dark-grey: #666;

  /* 主题色 */
  --waline-theme-color: pink;
  --waline-active-color: pink;

  /* 布局颜色 */
  --waline-color: #444;
  --waline-bgcolor: #fff;
  --waline-bgcolor-light: #f8f8f8;
  --waline-bgcolor-hover: #f0f0f0;
  --waline-border-color: #ddd;
  --waline-disable-bgcolor: #f8f8f8;
  --waline-disable-color: #bbb;
  --waline-code-bgcolor: #282c34;

  /* 特殊颜色 */
  --waline-bq-color: #f0f0f0;

  /* 头像 */
  --waline-avatar-size: 3.25rem;
  --waline-m-avatar-size: calc(var(--waline-avatar-size) * 9 / 13);

  /* 徽章 */
  --waline-badge-color: orange;
  --waline-badge-font-size: 0.775em;

  /* 信息 */
  --waline-info-bgcolor: #f8f8f8;
  --waline-info-color: #999;
  --waline-info-font-size: 0.625em;

  /* 渲染选择 */
  --waline-border: 1px solid var(--waline-border-color);
  --waline-avatar-radius: 50%;
  --waline-box-shadow: none;
}
</style>
