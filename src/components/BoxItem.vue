<template>
  <div class="box-item">
    <div class="cover">
      <Cover :cover="cover" ></Cover>
    </div>
    <div class="content">
      <div class="content-title">{{title}}</div>
      <div class="content-summary">{{summary}}</div>
      <div class="content-footer">
        <div class="footer-time">

        </div>
        <div class="footer-author">

        </div>
        <div class="footer-special">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cover from "@/components/Cover.vue";

const props = defineProps({
  cover: {
    type: String
  },
  title:  {
    type: String
  },
  summary: String
})
</script>

<style scoped lang="scss">
.box-item{
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  .cover{
    width: 110px;
    height: 110px;
  }
  .content{
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
    margin-left: 20px;
    .content-title{
      font-size: 15px;
      color: #108b96;
    }
    .content-summary{
      word-break: break-all;
      margin: 12px 0;
      font-size: 14px;
      line-height: 22px;
      white-space: normal;
      color: #999aaa;
      display: block;
      overflow:hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .content:hover{
    cursor: pointer;
  }
}
</style>