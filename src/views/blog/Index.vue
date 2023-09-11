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
        <div class="category-main">
          <BoxItem :small="true" title="Java" coverWidth="50"
                   :count="1"
                   coverHeight="50"></BoxItem>
        </div>
      </div>
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
    //flex: 1;
    background-color: #fff;
    padding: 10px;
    margin: 0;
    width: 75%;
  }
  .right {
    margin-left: 10px;
    background-color: #fff;
    width: 300px;
    height: 400px;
    position: fixed;
    right: 60px;
    .right-category{
      display: flex;
      flex-direction: column;
      .category-title{
        margin: 20px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding-bottom: 15px;
        .title-more{
          color: #108b96;
        }
        .title-more:hover{
          cursor: pointer;
        }
      }
      .category-main{
        margin: 0 0 0 20px;
      }
    }
  }
}
</style>