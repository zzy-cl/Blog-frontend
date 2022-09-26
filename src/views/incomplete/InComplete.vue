<!--author: zzy-->
<!---->
<template>
  <div id="incomplete">
    <div class="header">
      <h1>待办列表</h1>
    </div>
    <el-timeline>
      <el-timeline-item
          v-for="(item, index) in IncompletesList"
          :key="index"
          :timestamp="item.deadline"
          placement="top"
          :type="item.type"
          :icon="item.icon"
          size="large"
      >
        <el-card shadow="hover">
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>

    <!--评论区-->
    <WalinePage></WalinePage>
  </div>
</template>

<script setup>
import {getIncompletesListFe} from "@/api/incomplete";
import {ref} from "vue";
import WalinePage from "@/components/WalinePage.vue";

const IncompletesList = ref([])
const getIncompletesList = () => {
  getIncompletesListFe().then((res => {
    console.log(res)
    IncompletesList.value = res.data.data
    for (let i = 0; i < IncompletesList.value.length; i++) {
      if (IncompletesList.value[i].is_completed === '未完成') {
        IncompletesList.value[i].type = 'warning'
        IncompletesList.value[i].icon = 'StarFilled'
      } else {
        IncompletesList.value[i].type = 'success'
        IncompletesList.value[i].icon = 'SuccessFilled'
      }
    }
  }))
}
getIncompletesList()
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
}

#incomplete {
  margin: 0 1rem;
  background-color: var(--background);
}

#waline {
  background-color: rgba(255, 255, 255, 0);
}

.el-card {
  margin-right: 3rem;
  border-radius: 16px;
}

:deep(.el-timeline-item__tail) {
  border-left: 2px solid var(--pink-color);
}
</style>
