<template>
  <div class="detail-container animate__animated animate__fadeIn" v-loading="loading"
       v-if="blogArticleDetail.blogArticleTitle">
    <div class="left animate__animated animate__fadeIn"
         :class="shrink? '' : 'left-shrink'"
    >
      <div class="title">
        {{ blogArticleDetail.blogArticleTitle }}
      </div>
      <div class="info">
        <div class="original">
          {{ blogArticleDetail.blogArticleType }}
        </div>
        <div class="information">
          <div class="all-info">
            <div class="author" v-if="blogArticleDetail.userName">
              <div class="main">{{ blogArticleDetail.userName }}</div>
            </div>
            <div class="time" v-if="blogArticleDetail.blogArticleAddTime">
              <el-icon size="18">
                <Clock/>
              </el-icon>
              <div class="time-main">
                于 {{ blogArticleDetail.blogArticleAddTime }} 发布
              </div>
            </div>
            <div class="category" v-if="blogArticleDetail.blogCategoryName">
              分类：
              <div class="main">{{ blogArticleDetail.blogCategoryName }}</div>
            </div>
            <div class="browse">
              <el-icon size="18">
                <View/>
              </el-icon>
              <div class="browse-main">{{ blogArticleDetail.blogArticleViewsNumber }}</div>
            </div>
            <div class="collection" @click="collectionClick">
              <el-icon size="18">
                <Star/>
              </el-icon>
              <div class="collection-main">收藏</div>
            </div>
          </div>
          <div class="label">
            文章标签：
            <el-tag v-for="item in articleTags">{{ item.articleTagName }}</el-tag>
          </div>
        </div>

      </div>
      <div v-html="blogArticleDetail.blogArticleContent"
           class="content"
           id="content"
      ></div>
    </div>

    <div class="shrink" @click="switchToc"
         :class="shrink ? '' : 'shrink-none'">
      <el-icon size="25" v-if="shrink">
        <ArrowRightBold/>
      </el-icon>
      <el-icon size="25" v-else>
        <ArrowLeftBold/>
      </el-icon>
    </div>
    <transition leave-active-class="animate__animated animate__fadeOutRight"
                enter-active-class="animate__animated animate__fadeInRight"
    >
      <div class="right"
           v-if="shrink"
           :class="shrink ? '' : 'right-none'"
      >
        <div class="right-main" v-if="tocArray.length">
          <div class="right-content-title">
            <div class="title-main">目录结构</div>
          </div>
          <div class="right-content-main">
            <template v-for="item in tocArray">
              <div class="main-toc-item"
                   :style="{'padding-left': (item.level * 15 + 5) + 'px'}"
                   @click="go('#' + item.id)"
              >
                {{ item.title }}
              </div>
            </template>
          </div>
        </div>
        <div class="right-main" v-if="categoryList.length">
          <div class="right-content-title">
            <div class="title-main">分类专栏</div>
            <div class="title-more">更多 >></div>
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
              >
              </BoxItem>
            </template>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {Clock, Star, View, ArrowRightBold, ArrowLeftBold} from '@element-plus/icons-vue'
import BoxItem from "@/components/BoxItem.vue";
import {go} from '@/utils/commonUtils'
import {useRoute} from "vue-router";
import {nextTick, onBeforeMount, onMounted, reactive, ref} from "vue";
import {useArticleStore} from "@/store/article";
import {BlogArticleType} from "@/type/article";
import {getArticleByIdApi, updateBlogArticleViewsNumberApi} from "@/apis/article";
import hljs from "highlight.js/lib/common"
import 'highlight.js/styles/atom-one-dark.css'
import {ArticleTag} from "@/type/tag";
import {getTagListByArticleIdApi} from "@/apis/tags";
import {appearMessage} from "@/utils/elementPlusUtils";
import {CategoryType} from "@/type/category";
import {useCategoryStore} from "@/store/category";
import {tocTags} from "@/constant-pool";
import {getCategoryByListApi} from "@/apis/category";

const shrink = ref(true)
const maximumNumberOfDisplay = ref(4)
const loading = ref(true)
const route = useRoute()
const articleStore = useArticleStore()
const categoryStore = useCategoryStore()
const blogArticleId = ref<String>()
const blogArticleDetail = reactive<BlogArticleType>({})
const articleTags = reactive<ArticleTag[]>([])
const categoryList = reactive<CategoryType[]>([])
const switchToc = () => {
  shrink.value = !shrink.value
}
const getCategoryData = async () => {

  if (!categoryStore.getCategoryList.length) {
    const res: any = await getCategoryByListApi()
    if (res.code == 200) {
      categoryStore.setCategoryList(res.data)
    }
  }
  Object.assign(categoryList, categoryStore.getCategoryList)
}
const getBlogDetailData = async () => {
  blogArticleId.value = <String>route.params.blogArticleId
  let result: any
  result = await getArticleByIdApi(blogArticleId.value)
  if (result.code == 200) {
    Object.assign(blogArticleDetail, result.data)
  }
  result = await getTagListByArticleIdApi(blogArticleId.value)
  if (result.code == 200) {
    articleTags.push(...result.data)
  }
  //添加观看次数
  await addBlogArticleViewsNumber()
  await getCategoryData()

  await nextTick(() => {
    let blocks = document.querySelectorAll("code")
    blocks.forEach(block => {
      hljs.highlightElement(block)
    })
    createToc()
  })
}
const addBlogArticleViewsNumber = async () => {
  blogArticleDetail.blogArticleViewsNumber = blogArticleDetail.blogArticleViewsNumber + 1
  blogArticleDetail.blogArticleUpdateTime = null
  const res: any = await updateBlogArticleViewsNumberApi(blogArticleDetail)
  if (res.code == 200) {
    Object.assign(blogArticleDetail, res.data)
  }
  articleStore.setArticleList([])

}
const collectionClick = () => {
  appearMessage.error("请先登录")
}

interface TocType {
  id: String
  title: String
  level: Number
}

//目录
const tocArray = ref<TocType[]>([])
const createToc = () => {
  let contentDom = document.querySelector('#content')
  const childNodes = contentDom.childNodes
  let index = 0
  childNodes.forEach((item: ChildNode) => {
    let nodeName = item.nodeName
    if (tocTags.includes(nodeName.toUpperCase())) {
      const id = "toc" + (++index)
      item.id = id
      tocArray.value.push({
        id,
        title: item.textContent,
        level: tocTags.indexOf(nodeName)
      })
    }


  })
}
/*const screenWidth = ref<Number>()
const screenHeight = ref<Number>()
window.addEventListener("resize", () => {
  screenWidth.value = document.body.clientWidth
  screenHeight.value = document.body.clientHeight
});*/
onBeforeMount(() => {
  loading.value = true
})
onMounted(() => {
  getBlogDetailData()

  //高亮显示
  loading.value = false
})
</script>

<style scoped lang="scss">
.detail-container {
  width: 100%;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  flex-direction: row;

  .left {
    padding: 10px;
    width: 900px;
    box-shadow: 2px 2px 2px 2px #ddd;
    margin: 0;
    transition: 1s;
    .title {
      font-weight: bold;
      font-size: 25px;
    }

    .info {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: #F8F8F8;
      padding: 10px 0 10px 10px;
      margin: 15px 0 10px 0;
      border-radius: 5px;

      .information {
        display: flex;
        flex-direction: column;
        //margin-bottom: 20px;
        .all-info {
          display: flex;
          flex-direction: row;

          .time {
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: 15px;
            color: #868686;

            .time-main {
              margin-left: 5px;
            }
          }

          .author {
            margin-right: 20px;
            font-size: 15px;
            display: flex;
            color: #565656;
            justify-content: center;

          }

          .browse {
            .browse-main {
              margin-left: 5px;
            }
          }

          .collection {
            .collection-main {
              margin-left: 5px;
            }
          }

          .collection:hover {
            cursor: pointer;
            color: #ee7959;
          }

          .category, .browse, .collection {
            color: #5d5d5d;
            margin-left: 25px;
          }

          .author, .category, .browse, .collection {
            display: flex;
            flex-direction: row;
            align-items: center;
          }

          .main {
            color: #2d8dc5;
          }

          .main:hover {
            cursor: pointer;
          }
        }

        .label {
          color: #989898;
          display: flex;
          flex-direction: row;
          margin-top: 15px;

          .el-tag {
            margin-left: 10px;
          }
        }
      }

      .original {
        height: 50px;
        width: 50px;
        font-size: 20px;
        color: white;
        background-color: #87c0ca;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
      }
    }

    .content {
      margin-top: 20px;
      line-height: 26px;
      word-break: break-all;

      img {
        width: 100%;
      }
    }
  }

  .right {
    box-shadow: 0 6px 6px 0 #ddd;
    margin-top: 10px;


    .right-main {
      .right-content-main {
        .main-toc-item {
          font-size: 16px;
          border-radius: 5px;
          line-height: 30px;
        }

        .main-toc-item:hover {
          cursor: pointer;
          background-color: #a4c9cc;
        }
      }
    }
  }

  .shrink {
    margin: 0;
    width: 80px;
    padding: 0;
    position: fixed;
    top: 25%;
    bottom: 220px;
    right: 305px;
    height: 500px;
    display: flex;
    align-items: center;
    transition: 1s;
  }

  .shrink:hover, .shrink-none {
    cursor: pointer;
  }

  .shrink-none {
    right: 10px;
  }

  .right-none {
    overflow: hidden;
    background-color: transparent;
    box-shadow: none;
  }

  .left-shrink {
    width: 95%;
  }
}

</style>