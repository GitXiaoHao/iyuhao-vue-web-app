<template>
  <div class="detail-container" v-loading="loading">
    <div class="left animate__animated animate__fadeIn" >
      <div class="title">
        {{blogArticleDetail.blogArticleTitle}}
      </div>
      <div class="info">
        <div class="time">

        </div>
        <div class="author">

        </div>
        <div class="special">

        </div>
      </div>
    </div>
    <div class="right animate__animated animate__fadeIn">

    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onBeforeMount, onMounted, reactive, ref} from "vue";
import {useArticleStore} from "@/store/article";
import {BlogArticleType} from "@/type/article";
const loading = ref(true)
const route = useRoute()
const articleStore = useArticleStore()
const blogArticleId = ref<String>(<String>route.params.blogArticleId)
const blogArticleDetail = reactive<BlogArticleType>({})
const getBlogDetailData = () => {
  const articleList = articleStore.getArticleList;
  articleList.forEach(article => {
    if(article.blogArticleId == blogArticleId.value){
      Object.assign(article,blogArticleDetail)
      return
    }
  })
}
onBeforeMount(() => {
  loading.value = true
})
onMounted(() => {
  getBlogDetailData()
  loading.value = false
})
</script>

<style scoped lang="scss">

</style>