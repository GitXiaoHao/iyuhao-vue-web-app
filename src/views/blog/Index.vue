<template>
  <div class="container-layout">
    <div class="left">
      <template v-for="item in blogArticleList">
        <BoxItem/>
      </template>
    </div>
    <div class="right">

    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {BlogArticleType} from "@/type/article";
import BoxItem from "@/components/BoxItem.vue";

const blogArticleList = reactive<BlogArticleType[]>([])
</script>

<style scoped lang="scss">
.container-layout{
  margin-top: 10px;
  display: flex;
  .left{
    flex: 1;
    background-color: #fff;
    padding: 10px;
  }
  .right{
    margin-left: 10px;
    background-color: #fff;
    width: 300px;

  }
}
</style>