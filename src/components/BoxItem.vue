<template>
  <div :class="small ? 'small-item' : 'box-item'">
    <div class="cover" :style="{
      'width': coverWidth + 'px',
      'height': coverHeight + 'px'
    }">
      <Cover :cover="cover" :borderRadios="borderRadios"></Cover>
    </div>
    <div class="small-content" v-if="count != -1">
      <div class="content-main">
        <div class="content-title">
          {{ title }}
        </div>
        <div class="content-summary" v-if="summary">
          {{summary}}
        </div>
      </div>
      <div class="content-count">
        {{ count }}篇
      </div>
    </div>
    <div v-else class="content">
      <div class="content-title">{{ title }}</div>
      <div class="content-summary">{{ summary }}</div>
      <div class="content-footer">
        <div class="footer-time">
          {{ time }}
        </div>
        <div class="footer-author">
          <template v-if="author">
            作者：
            <div class="author">{{ author }}</div>
          </template>
        </div>
        <div class="footer-special">
          <template v-for="item in specialList">
            <template v-if="item.blogSpecialId == specialId">
              专栏：
              <div class="special">{{ item.blogSpecialName }}</div>
            </template>
          </template>
        </div>
        <div class="footer-category">
          <template v-if="categoryName">
            分类：
            <div class="category">
              {{ categoryName }}
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cover from "@/components/Cover.vue";
import {useSpecialStore} from "@/store/special";
import {onMounted, reactive} from "vue";
import {SpecialType} from "@/type/special";
import {useCategoryStore} from "@/store/category";
import {CategoryType} from "@/type/category";

const props = defineProps({
  small: {
    type: Boolean,
    default: false
  },
  cover: {
    type: String
  },
  borderRadios: {
    type: String,
    default: '0'
  },
  coverWidth: {
    type: String,
    default: '110'
  },
  coverHeight: {
    type: String,
    default: '110'
  },

  title: {
    type: String
  },
  summary: String,
  time: String,
  author: String,
  specialId: String,
  categoryName: String,
  count: {
    type: Number,
    default: -1
  }
})

const categoryStore = useCategoryStore()
const specialStore = useSpecialStore()
const specialList = reactive<SpecialType[]>([])
const categoryList = reactive<CategoryType[]>([])
const getItemData = () => {
  Object.assign(specialList, specialStore.getSpecialList)
  Object.assign(categoryList, categoryStore.getCategoryList)
}
onMounted(() => {
  if (props.count == -1) {
    getItemData()
  }
})
</script>

<style scoped lang="scss">
.box-item {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;

  .content {
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    .content-title {
      font-size: 18px;
      color: #108b96;
    }

    .content-summary {
      word-break: break-all;
      margin: 12px 0;
      font-size: 14px;
      line-height: 22px;
      white-space: normal;
      color: #999aaa;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      //超出两行 就省略号
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .content-footer {
      display: flex;
      flex-direction: row;
      position: relative;
      bottom: 10px;
      top: 20px;
      margin: 0;
      font-size: 14px;
      align-items: center;

      .footer-time {
        margin-right: 10px;
      }

      .footer-author, .footer-special, .footer-category {
        display: flex;
        margin-right: 10px;
        flex-direction: row;
        align-items: center;
      }

      .special, .author, .category {
        color: #108b96;
        font-size: 18px;
      }
    }
  }

  .content-title:hover, .author:hover, .special:hover, .category:hover {
    cursor: pointer;
  }
}

.box-item:hover {
  background-color: #eaeef1;
}

.small-item {
  margin-bottom: 10px;
  display: flex;
  .small-content {
    display: flex;
    flex-direction: row;
    width: 90%;
    margin: 0 5px;
    justify-content: space-between;
    align-items: center;
    .content-main{
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      .content-title {
        color: #108b96;
        display: block;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .content-summary{
        position: relative;
        top: 0;
        font-size: 14px;
        color: #999aaa;
        margin-top: 15px;
      }
    }

    .content-count {
      color: #999aaa;
    }
  }
}
</style>