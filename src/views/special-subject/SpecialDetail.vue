<template>
  <div class="detail-container">
    <div class="detail-header">
      <BoxItem4List
          :cover="special.blogSpecialCover"
          :count="special.blogSpecialEssayCount"
          :title="special.blogSpecialName"
          :summary="special.blogSpecialBriefIntroduction"
          borderRadios="5"
          width="98"
          toPath="/sd"
          :blogSpecialViewsNumber="special.blogSpecialViewsNumber"
          :toId="special.blogSpecialId"
          :collectionNumber="special.blogSpecialFavoriteNumber"
          @collectionClick="collectionClick"
          :collection="true"
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
    <div class="detail-selected">

    </div>
  </div>
</template>

<script setup lang="ts">

import BoxItem4List from "@/components/BoxItem4List.vue";
import BoxItem from "@/components/BoxItem.vue";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import {BlogArticleType} from "@/type/article";
import {SpecialType} from "@/type/special";
import {getArticleBySpecialIdApi} from "@/apis/article";
import {getSpecialByIdApi, updateSpecialApi} from "@/apis/special";
import {useSpecialStore} from "@/store/special";
import {appearMessage} from "@/utils/elementPlusUtils";

const route = useRoute()
const special = reactive<SpecialType>({})
const blogArticleList = reactive<BlogArticleType[]>([])
const specialStore = useSpecialStore()
/**
 * 添加收藏次数
 * @param id
 */
const collectionClick = (id) => {
  appearMessage.error("请先登录！")
}
const addBlogSpecialViewsNumber = async () => {
  special.blogSpecialViewsNumber = special.blogSpecialViewsNumber + 1
  special.blogSpecialUpdateTime = null
  const res: any = await updateSpecialApi(special)
  if (res.code == 200) {
    Object.assign(special, res.data)
  }
  specialStore.setSpecialList([])
}
const getArticleData = async (id: String) => {
  if (id) {
    const res: any = await getArticleBySpecialIdApi(id)
    if (res.code == 200) {
      Object.assign(blogArticleList, res.data)
    }
  }
}
const getData = async () => {
  let id = <String>route.params.blogSpecialId
  const res: any = await getSpecialByIdApi(id)
  if (res.code == 200) {
    Object.assign(special, res.data)
  }
  await getArticleData(special.blogSpecialId)
  await addBlogSpecialViewsNumber()
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