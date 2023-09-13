<template>
  <div class="container-layout" v-if="blogArticleList.length">
    <div class="left">
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
                :summary="item.userRole"
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
  <div v-else class="container-none">
    <el-empty description="当前无博客内容" />
  </div>
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref} from "vue";
import {BlogArticleType} from "@/type/article";
import BoxItem from "@/components/BoxItem.vue";
import {useArticleStore} from "@/store/article";
import {useCategoryStore} from "@/store/category";
import {CategoryType} from "@/type/category";
import {SpecialType} from "@/type/special";
import {useSpecialStore} from "@/store/special";
import {useMemberStore} from "@/store/member";
import {MemberType} from "@/type/member";
import {getSpecialListApi} from "@/apis/special";
import {getArticleByListApi} from "@/apis/article";
import {getCategoryByListApi} from "@/apis/category";
import {getAdminListByApi} from "@/apis/admin";

const maximumNumberOfDisplay = ref(4)
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const specialStore = useSpecialStore()
const memberStore = useMemberStore()
const blogArticleList = reactive<BlogArticleType[]>([])
const categoryList = reactive<CategoryType[]>([])
const specialList = reactive<SpecialType[]>([])
const memberList = reactive<MemberType[]>([])


/**
 * 获取专栏list
 */
const getSpecialListData = async () => {
  const res: any = await getSpecialListApi()
  if (res.code == 200) {
    specialStore.setSpecialList(res.data)
  }
}
/**
 * 获取博客list
 */
const getArticleListData = async () => {
  const res: any = await getArticleByListApi()
  if (res.code == 200) {
    articleStore.setArticleList(res.data)
  }
}
const getCategoryListData = async () => {
  const res: any = await getCategoryByListApi()
  if (res.code == 200) {
    categoryStore.setCategoryList(res.data)
  }
}
const getAdminListData = async () => {
  const res: any = await getAdminListByApi()
  if (res.code == 200) {
    memberStore.setMemberList(res.data)
  }
}

const getData = async () => {
  if(!articleStore.getArticleList.length){
    await getSpecialListData()
    await getArticleListData()
    await getCategoryListData()
    await getAdminListData()
  }
  //获取数据
  Object.assign(blogArticleList, articleStore.getArticleList)
  Object.assign(categoryList, categoryStore.getCategoryList)
  Object.assign(specialList, specialStore.getSpecialList)
  Object.assign(memberList, memberStore.getMemberList)
}

onMounted(async () => {
  await nextTick(() => {
    getData()
  })
})
</script>

<style scoped lang="scss">
.container-layout {
  margin-top: 10px;
  display: flex;

  .left {
    //flex: 1;
    background-color: #faf9f9;
    padding: 30px;
    margin: 0;
    border-radius: 5px;
    width: 750px;
  }

  .right {
    margin-left: 10px;
    border-radius: 5px;
    background-color: #faf9f9;
    width: 300px;
    top: 110px;
    bottom: 220px;
    position: fixed;
    right: 60px;
    overflow-y: scroll;
    padding: 10px;
    min-height: 500px;

    .right-main {
      display: flex;
      flex-direction: column;
      height: auto;

      .content-title {
        margin: 20px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;

        .title-more {
          color: #108b96;
        }

        .title-more:hover {
          cursor: pointer;
        }
      }

      .content-main {
        margin: 0 0 0 10px;
        padding-bottom: 10px;
      }
    }
  }
}
.container-none{
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>