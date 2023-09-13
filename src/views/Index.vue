<template>
  <el-container class="index-container">
    <el-header class="animate__animated animate__fadeInDown header"
    >
      <div class="header-nav">
        <RouterLink to="/">
          <div class="nav-image">
            <img src="src/assets/image/index/logo.png"
                 alt="" class="image">
          </div>
        </RouterLink>

        <div class="nav-menu">
          <RouterLink class="sub-menu-link"
                      :to="link.to"
                      v-for="link in routerLink"
          >{{ link.name }}
          </RouterLink>
        </div>
      </div>
      <div class="header-content">
        <SearchBox/>
      </div>
    </el-header>
    <el-main class="animate__animated animate__fadeIn main">
      <RouterView/>
    </el-main>
    <el-footer class="animate__animated animate__fadeInUp footer">
      <Footer/>
    </el-footer>
    <el-backtop/>
  </el-container>
</template>


<script setup lang="ts">

import Footer from "@/components/Footer.vue";
import {onMounted, reactive} from "vue";
import {RouterLinkType} from "@/type/router";
import SearchBox from "@/components/SearchBox.vue";
import {getSpecialListApi} from "@/apis/special";
import {useSpecialStore} from "@/store/special";
import {getArticleByListApi} from "@/apis/article";
import {useArticleStore} from "@/store/article";
import {getCategoryByListApi} from "@/apis/category";
import {useCategoryStore} from "@/store/category";
import {getAdminListByApi} from "@/apis/admin";
import {useMemberStore} from "@/store/member";

const specialStore = useSpecialStore()
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const memberStore = useMemberStore()
//列表
const routerLink = reactive<RouterLinkType[]>([
  {

    to: "/blog",
    name: "博客"
  },
  {
    // special colum
    to: "/sc",
    name: "分类专栏"
  },
  {
    // special subject
    to: "/ss",
    name: "专题"
  },
  {
    //member list
    to: "/ml",
    name: "成员"
  },
  {
    //Message Board
    to: "/mb",
    name: "留言板"
  },
])
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
  await getSpecialListData()
  await getArticleListData()
  await getCategoryListData()
  await getAdminListData()
}


onMounted(() => {
  getData()
})

</script>

<style scoped lang="scss">
.index-container {
  padding-top: 80px;

  .header {
    width: 100vw;
    height: 80px;
    background-color: #37424E;
    border-bottom: 1px solid #eaeef1;
    box-shadow: 0 2px 6px 0 #ddd;
    position: fixed;
    top: 0;
    z-index: 5;

    .header-nav {
      width: 1350px;
      height: 100%;
      display: flex;
      align-items: center;
      margin-left: 50px;
      float: left;

      .nav-image {
        width: 200px;
        height: 70%;
        display: flex;
        align-items: center;
        justify-content: center;

        .image {
          width: 100%;
          height: 100%;
        }
      }

      .nav-menu {
        font-size: 20px;
        border-bottom: none !important;

        .sub-menu-link {
          color: white !important;
          margin-left: 35px;
          text-decoration: none;
        }

        .sub-menu-link:hover {
          color: #d5ebe1 !important;
        }

        .active {
          color: #ee7959 !important;
        }
      }

    }

    .header-content {
      /* 绝对定位 水平垂直居中 */
      position: absolute;
      top: 50%;
      left: 80%;
    }
  }

  .main {
    height: auto;
    width: 80%;
    margin: 0 auto;
    justify-content: center;
  }

  .footer {
    padding: 0;
    //overflow-x: hidden;
    margin: 200px 0 0;
    width: 100%;
  }
}


</style>