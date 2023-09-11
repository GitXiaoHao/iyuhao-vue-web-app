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
                 :categoryName="item.blogCategoryName"
        />
      </template>
    </div>
    <div class="right">
      <div class="right-category">
        <div class="category-title">
          <div class="title-main">分类专栏</div>
          <div class="title-more">更多 >></div>
        </div>
        <div class="category-main" v-if="categoryList.length">
          <BoxItem v-for="category in categoryList"
                  :small="true" :title="category.blogCategoryName"
                   :count="category.blogCategoryEssayCount"
                   coverWidth="50"
                   coverHeight="50"
                   borderRadios="10"
                   :cover="category.blogCategoryCover"
          >
          </BoxItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {BlogArticleType} from "@/type/article";
import BoxItem from "@/components/BoxItem.vue";
import {useArticleStore} from "@/store/article";
import {useCategoryStore} from "@/store/category";
import {CategoryType} from "@/type/category";


const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const blogArticleList = reactive<BlogArticleType[]>([])
const categoryList =reactive<CategoryType[]>([])
const getData = async () => {
  //获取数据
  blogArticleList.length = 0
  Object.assign(blogArticleList,articleStore.getArticleList)
  Object.assign(categoryList,categoryStore.getCategoryList)
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
    //flex: 1;
    background-color: #fff;
    padding: 10px;
    margin: 0;
    width: 850px;
  }
  .right {
    margin-left: 10px;
    background-color: #fff;
    width: 300px;
    height: auto;
    position: fixed;
    right: 60px;
    .right-category{
      display: flex;
      flex-direction: column;
      height: 100%;
      .category-title{
        margin: 20px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        .title-more{
          color: #108b96;
        }
        .title-more:hover{
          cursor: pointer;
        }
      }
      .category-main{
        margin: 0 0 0 10px;
        padding-bottom: 10px;

      }
    }
  }
}
</style>