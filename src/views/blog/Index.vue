<template>
  <div class="container-layout">
    <div class="left">
      <template v-for="item in blogArticleList">
        <BoxItem :cover="item.blogArticleCover"
                 :title="item.blogArticleTitle"
                 :summary="item.blogArticleSummary"
                 :time="item.blogArticleUpdateTime"
                 :author="item.userName"
                 :special-id="item.blogSpecialId"
        />
      </template>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {BlogArticleType} from "@/type/article";
import BoxItem from "@/components/BoxItem.vue";
import {getArticleByListApi} from "@/apis/article";
import {useArticleStore} from "@/store/article";


const articleStore = useArticleStore()
const blogArticleList = reactive<BlogArticleType[]>([])

const getData = async () => {
  //获取数据
  blogArticleList.length = 0
  Object.assign(blogArticleList,articleStore.getArticleList)
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.container-layout {
  margin-top: 10px;
  display: flex;

  .left {
    flex: 1;
    background-color: #fff;
    padding: 10px;
    margin: 0;

  }

  .right {
    margin-left: 10px;
    background-color: #fff;
    width: 300px;

  }
}
</style>