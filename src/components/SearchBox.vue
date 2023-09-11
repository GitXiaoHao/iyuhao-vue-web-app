<template>
  <div class="search-box">
    <input type="text" class="search-txt" placeholder="想搜啥?" v-model="fuzzyQuery"/>
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
const fuzzyQuery = ref('')


const submitSearch = () => {

}
</script>

<style scoped lang="scss">
.search-box{
  height: 40px;
  padding: 10px;
  border-radius: 40px;
  transform: translate(-50%,-50%);
  background-color: #2f3640;
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
.search-box:hover .search-txt{
  width: 200px;
  padding: 0 6px;
}
.search-box:hover .search-btn{
  background-color: #fff;
}
</style>