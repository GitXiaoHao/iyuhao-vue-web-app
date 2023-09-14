<template>
  <div class="detail-container">
    <div class="detail-header">
      <BoxItem4List
          :cover="category.blogCategoryCover"
          :count="category.blogCategoryEssayCount"
          :title="category.blogCategoryName"
          :summary="category.blogCategoryDesc"
          borderRadios="5"
          width="98"
          toPath="/cd"
          :toId="category.blogCategoryId"
      ></BoxItem4List>
    </div>
    <div class="detail-main">
      <div v-if="blogArticleList.length">
        <template v-for="item in blogArticleList">
          <BoxItem :cover="item.blogArticleCover"
                   :title="item.blogArticleTitle"
                   :summary="item.blogArticleSummary"
                   :time="item.blogArticleUpdateTime"
                   :author="item.userName"
                   :special-id="item.blogSpecialId"
                   :categoryName="item.blogCategoryName"
                   :to-id="item.blogArticleId"
                   to-path="/bd"
          />
        </template>
      </div>
      <el-empty description="空空如也" v-else/>
    </div>

  </div>
</template>

<script setup lang="ts">

import BoxItem4List from "@/components/BoxItem4List.vue";
import BoxItem from "@/components/BoxItem.vue";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import {getCategoryByIdApi} from "@/apis/category";
import {CategoryType} from "@/type/category";
import {getArticleByCategoryNameApi} from "@/apis/article";
import {BlogArticleType} from "@/type/article";

const route = useRoute()
const category = reactive<CategoryType>({})
const blogArticleList = reactive<BlogArticleType[]>([])
const getArticleData = async (name: String) => {
  console.log(name)
  if (name) {
    const res: any = await getArticleByCategoryNameApi(name)
    if (res.code == 200) {
      Object.assign(blogArticleList, res.data)
    }
  }
}
const getData = async () => {
  let id = <String>route.params.blogCategoryId
  const res: any = await getCategoryByIdApi(id)
  if (res.code == 200) {
    Object.assign(category, res.data)
  }
  await getArticleData(category.blogCategoryName)
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .detail-header {
    display: flex;
    width: 96%;
    align-items: center;
    justify-content: center;

  }

  .detail-main {
    box-shadow: 2px 2px 2px 2px #ddd;
    width: 100%;
    padding: 10px;
  }
}
</style>