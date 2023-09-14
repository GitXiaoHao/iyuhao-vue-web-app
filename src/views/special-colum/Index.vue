<template>
  <div class="category-container">
    <template v-for="item in categoryList">
      <BoxItem4List
          :cover="item.blogCategoryCover"
          :count="item.blogCategoryEssayCount"
          :title="item.blogCategoryName"
          :summary="item.blogCategoryDesc"
          borderRadios="5"
          width="27"
          toPath="/cd"
          :toId="item.blogCategoryId"
      ></BoxItem4List>
    </template>
  </div>
</template>

<script setup lang="ts">

import {useCategoryStore} from "@/store/category";
import {onMounted, reactive} from "vue";
import {CategoryType} from "@/type/category";
import {getCategoryByListApi} from "@/apis/category";
import BoxItem4List from "@/components/BoxItem4List.vue";

const categoryStore = useCategoryStore()
const categoryList = reactive<CategoryType[]>([])
const getData = async () => {
  if (!categoryStore.getCategoryList.length) {
    const res: any = await getCategoryByListApi()
    if (res.code == 200) {
      categoryStore.setCategoryList(res.data)
    }
  }
  Object.assign(categoryList, categoryStore.getCategoryList)
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.category-container{
  width: 99%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-radius: 5px;
  padding: 10px;
  border: 1px solid #ddd;
}
.category-container:hover{
  box-shadow: 0 0 2px 2px #ddd;
}
</style>