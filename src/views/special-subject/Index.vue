<template>
  <div class="layout-container">
    <template v-for="item in specialList">
      <BoxItem4List
          :cover="item.blogSpecialCover"
          :count="item.blogSpecialEssayCount"
          :title="item.blogSpecialName"
          :summary="item.blogSpecialBriefIntroduction"
          borderRadios="5"
          width="27"
          toPath="/sd"
          :toId="item.blogSpecialId"
          @collectionClick="collectionClick"
          :collectionNumber="item.blogSpecialFavoriteNumber"
          :collection="true"
      ></BoxItem4List>
    </template>
  </div>
</template>

<script setup lang="ts">

import {onMounted, reactive} from "vue";
import BoxItem4List from "@/components/BoxItem4List.vue";
import {useSpecialStore} from "@/store/special";
import {getSpecialListApi} from "@/apis/special";
import {SpecialType} from "@/type/special";
import {appearMessage} from "@/utils/elementPlusUtils";

const specialStore = useSpecialStore()
const specialList = reactive<SpecialType[]>([])
/**
 * 添加收藏次数
 * @param id
 */
const collectionClick = (id) => {
  appearMessage.error("请先登录！")
}
const getData = async () => {
  if (!specialStore.getSpecialList.length) {
    const res: any = await getSpecialListApi()
    if (res.code == 200) {
      specialStore.setSpecialList(res.data)
    }
  }
  Object.assign(specialList, specialStore.getSpecialList)
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.layout-container{
  width: 99%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ddd;
}
.layout-container:hover{
  box-shadow: 0 0 2px 2px #ddd;
}
</style>