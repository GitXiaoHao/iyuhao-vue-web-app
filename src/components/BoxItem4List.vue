<template>
  <div class="list-container"
     :style="{'width': width + '%'}">
    <div class="list-cover" :style="{
      'width': coverWidth + 'px',
      'height': coverHeight + 'px'
    }">
      <Cover :cover="cover" :borderRadios="borderRadios"></Cover>
    </div>
    <RouterLink class="list-content" :to="toPath + '/' + toId">
      <div class="content-title">
        {{title}}
      </div>
      <div class="content-summary">
        {{summary}}
      </div>
      <div class="content-count">
        文章数:{{count}}
        <div v-if="collection" class="collection-main">
          <div class="collection-number">
            收藏数：{{collectionNumber}}
          </div>
          <div class="add-collection" @click="collectionClick">
            <el-icon size="15">
              <Star/>
            </el-icon>
            <div>收藏</div>
          </div>
        </div>
        <div class="browse" v-if="blogSpecialViewsNumber != -1">
          <el-icon size="18">
            <View/>
          </el-icon>
          <div class="browse-main">{{ blogSpecialViewsNumber }}</div>
        </div>
      </div>

    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import {Star,View} from '@element-plus/icons-vue'
import Cover from "@/components/Cover.vue";
const emits = defineEmits(['collectionClick'])
const props = defineProps({
  coverWidth: {
    type: String,
    default: '110'
  },
  coverHeight: {
    type: String,
    default: '110'
  },
  width: {
    type: String,
    default: '100'
  },
  borderRadios: {
    type: String,
    default: '0'
  },
  count: {
    type: Number,
    default: 0
  },
  collection: {
    type: Boolean,
    default: false
  },
  blogSpecialViewsNumber:{
    type: Number,
    default: -1
  },
  cover: String,
  title: String,
  summary: String,
  toId: String,
  toPath:String,
  collectionNumber: Number,

})



const collectionClick = () => {
  emits('collectionClick',props.toId)
}
</script>

<style scoped lang="scss">
.list-container:hover{
  background-color: #d4e5ef ;
}
.list-container{
  display: flex;
  margin: 10px 20px;
  border: 2px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  height: 110px;
  flex-direction: row;
  .list-cover{

  }
  .list-content:hover{
    cursor: pointer;
  }
  .list-content{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    text-decoration: none;
    padding: 0 15px 15px;
    .content-title{
      font-size: 18px;
      color: #108b96;
    }
    .content-summary{
      color: black;
      word-break: break-all;
      white-space: normal;
      font-size: 16px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      //超出1行 就省略号
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical
    }
    .content-count{
      color: #999aaa;
      font-size: 13px;
      display: flex;
      flex-direction: row;
      .collection-main{
        margin-left: 20px;
        display: flex;
        flex-direction: row;
        .collection-number{

        }
        .add-collection{
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          align-items: center;
        }
        .add-collection:hover{
          cursor: pointer;
          color: #ee7959;
        }
      }
      .browse {
        color: #5d5d5d;
        margin-left: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        .browse-main {
          margin-left: 5px;
        }
      }
    }

  }
}
</style>