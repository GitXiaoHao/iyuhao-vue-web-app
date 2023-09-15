<template>
  <div class="search-box"  @mouseenter="enter(true)" @mouseleave="enter(false)">
    <el-autocomplete
        v-model="fuzzyQuery"
        :fetch-suggestions="querySearch"
        popper-class="search-txt"
        placeholder="请输入分类类型"
        class="search-txt"
        @select="handleSelect"
        :style="{'width': isBlur || fuzzyQuery.length ? '300px' : '0px'}"
    >
      <template #default="{ item }">
        <div class="value">{{ item.blogArticleTitle }}</div>
      </template>
    </el-autocomplete>
    <a class="search-btn" @click="submitSearch">
      <el-icon size="20">
        <Search />
      </el-icon>
    </a>
  </div>
</template>

<script setup lang="ts">
import {Search} from "@element-plus/icons-vue";
import {ref} from "vue";
import {useArticleStore} from "@/store/article";
import {BlogArticleType} from "@/type/article";
import {useRouter} from "vue-router";
const fuzzyQuery = ref<String>('')
const articleStore = useArticleStore()
const isBlur = ref<Boolean>(false)
const router = useRouter()
let timer:any
const submitSearch = () => {
  if(fuzzyQuery.value.length){
    router.push("/blog/" + fuzzyQuery.value)
    fuzzyQuery.value = ''
  }
}
const querySearch = (queryString: string, cb: any) =>{
  const articleList = articleStore.getArticleList
  const results = queryString
      ? articleList.filter(queryFilter(queryString))
      : articleList
  cb(results)
}
const enter = (item: Boolean) => {
  if(!item) {
    timer = setTimeout(() => {
      isBlur.value = item
      timer = null
    },2000)
  }else {
    if(timer){
      clearTimeout(timer)
      timer = null
    }
    isBlur.value = item
  }
}
const handleSelect = (item: BlogArticleType) =>{
  if (item.blogArticleTitle != null) {
    fuzzyQuery.value = item.blogArticleTitle
  }
}
const queryFilter  = (queryString) =>{
  return (restaurant: BlogArticleType) => {
    return (
        restaurant.blogArticleTitle?.toLowerCase().indexOf(queryString.toLowerCase()) != -1
    )
  }
}
</script>

<style scoped lang="scss">
.search-box{
  height: 40px;
  padding: 10px;
  display: flex;
  border-radius: 40px;
  transform: translate(-50%,-50%);
  background-color: #2f3640;
}
:deep(.el-autocomplete ){
  all: unset;
  border:none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  /* 动画过渡 */
  transition: 0.4s;
}
:deep(.el-input,.el-input__inner,.el-autocomplete ){
  all: unset;
  border:none;
  background: none;
  //outline: none;
  padding: 0;
}
:deep(.el-input__wrapper){
  all: unset;

}

.search-txt{
  border:none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  width: 0;
  /* 动画过渡 */
  transition: 0.4s;
}
.search-btn{
  color: #e84118;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2f3640;
  /* 弹性布局 水平垂直居中 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* 动画过渡 */
  transition: 0.4s;
}
.search-box:hover :deep(.el-autocomplete ){
  width: 200px;
  padding: 0 6px;
}

.search-box:hover .search-btn{
  background-color: #fff;
}
</style>