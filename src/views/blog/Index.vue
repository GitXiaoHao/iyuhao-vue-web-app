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

       <div class="right-main" v-if="categoryList.length">
         <div class="content-title">
           <div class="title-main">分类专栏</div>
           <div class="title-more">更多 >></div>
         </div>
         <div class="content-main">
           <template v-for="(category,index) in categoryList">
             <BoxItem
                 :small="true"
                 :title="category.blogCategoryName"
                 :count="category.blogCategoryEssayCount"
                 coverWidth="50"
                 coverHeight="50"
                 borderRadios="10"
                 :cover="category.blogCategoryCover"
                 v-if="index <= maximumNumberOfDisplay"
             >
             </BoxItem>
           </template>
         </div>
       </div>
       <div class="right-main" v-if="memberList.length">
         <div class="content-title">
           <div class="title-main">博客成员</div>
           <div class="title-more">更多 >></div>
         </div>
         <div class="content-main">
           <template v-for="(item,index) in memberList">
             <BoxItem
                 :small="true"
                 :title="item.userName"
                 :count="item.userEssayCount"
                 coverWidth="50"
                 coverHeight="50"
                 borderRadios="50"
                 :cover="item.userCover"
                 v-if="index <= maximumNumberOfDisplay"
             >
             </BoxItem>
           </template>
         </div>
       </div>
       <div class="right-main" v-if="specialList.length">
         <div class="content-title">
           <div class="title-main">专题</div>
           <div class="title-more">更多 >></div>
         </div>
         <div class="content-main">
           <template v-for="(item,index) in specialList">
             <BoxItem
                 :small="true"
                 :title="item.blogSpecialName"
                 :count="item.blogSpecialEssayCount"
                 coverWidth="50"
                 coverHeight="50"
                 borderRadios="10"
                 :cover="item.blogSpecialCover"
                 v-if="index <= maximumNumberOfDisplay"
             >
             </BoxItem>
           </template>
         </div>
       </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {BlogArticleType} from "@/type/article";
import BoxItem from "@/components/BoxItem.vue";
import {useArticleStore} from "@/store/article";
import {useCategoryStore} from "@/store/category";
import {CategoryType} from "@/type/category";
import {SpecialType} from "@/type/special";
import {useSpecialStore} from "@/store/special";
import {useMemberStore} from "@/store/member";
import {MemberType} from "@/type/member";

const maximumNumberOfDisplay = ref(4)
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const specialStore = useSpecialStore()
const memberStore = useMemberStore()
const blogArticleList = reactive<BlogArticleType[]>([])
const categoryList =reactive<CategoryType[]>([])
const specialList = reactive<SpecialType[]>([])
const memberList = reactive<MemberType[]>([])
const getData = async () => {
  //获取数据
  Object.assign(blogArticleList,articleStore.getArticleList)
  Object.assign(categoryList,categoryStore.getCategoryList)
  Object.assign(specialList,specialStore.getSpecialList)
  Object.assign(memberList,memberStore.getMemberList)
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
    top: 110px;
    bottom: 220px;
    position: fixed;
    right: 60px;
    overflow-y:scroll;

    padding: 10px;
    .right-main{
      display: flex;
      flex-direction: column;
      height: auto;
      .content-title{
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
      .content-main{
        margin: 0 0 0 10px;
        padding-bottom: 10px;
      }
    }
  }
}
</style>