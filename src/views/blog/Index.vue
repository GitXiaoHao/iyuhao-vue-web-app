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
        <div class="right-content-title">
          <div class="title-main">分类专栏</div>
          <div class="title-more">
            <RouterLink to="/sc" class="sub-link">
              更多 >>
            </RouterLink>
          </div>
        </div>
        <div class="right-content-main">
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
                :to-id="category.blogCategoryId"
                to-path="/cd"
            >
            </BoxItem>
          </template>
        </div>
      </div>
      <div class="right-main" v-if="memberList.length">
        <div class="right-content-title">
          <div class="title-main">博客成员</div>
          <div class="title-more">
            <RouterLink to="/ml" class="sub-link">
              更多 >>
            </RouterLink>
          </div>
        </div>
        <div class="right-content-main">
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
                :toId="item.userId"
                toPath="/md"
            >
            </BoxItem>
          </template>
        </div>
      </div>
      <div class="right-main" v-if="specialList.length">
        <div class="right-content-title">
          <div class="title-main">专题</div>
          <div class="title-more">
            <RouterLink to="/ss" class="sub-link">
              更多 >>
            </RouterLink>
          </div>
        </div>
        <div class="right-content-main">
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
                :toId="item.blogSpecialId"
                toPath="/sd"
            >
            </BoxItem>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container-none">
    <el-empty description="当前无博客内容"/>
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
  if (!articleStore.getArticleList.length) {
    await getSpecialListData()
  }
  if (!articleStore.getArticleList.length) {
    await getArticleListData()
  }
  if (!categoryStore.getCategoryList.length) {
    await getCategoryListData()
  }
  if (!memberStore.getMemberList.length) {
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
    box-shadow: 0 6px 6px 0 #ddd;
    padding: 10px;
    margin: 0;
    border-radius: 5px;
    width: 900px;
  }

}

.container-none {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>