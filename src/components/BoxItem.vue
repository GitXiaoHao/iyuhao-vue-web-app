<template>

  <div :class="small ? 'small-item' : 'box-item'">
    <div class="cover" :style="{
      'width': coverWidth + 'px',
      'height': coverHeight + 'px'
    }">
      <Cover :cover="cover" :borderRadios="borderRadios ? borderRadios : '0'"></Cover>
    </div>
    <div class="small-content" v-if="count != -1">
      <div class="content-main">
        <div class="content-title">
          <RouterLink :to="toPath + '/' + toId" class="sub-menu-link">
            {{ title }}
          </RouterLink>
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
      <div class="content-title">
        <RouterLink :to="toPath + '/' + toId" class="sub-menu-link">
          {{ title }}
        </RouterLink>
      </div>
      <div class="content-summary">{{ summary }}</div>
      <div class="content-footer">
        <div class="footer-time">
          {{ time }}
        </div>
        <div class="footer-author">
          <template v-if="author">
            作者：
            <div class="author">
              <RouterLink :to="'md/' + authorId" class="sub-menu-link">
                {{ author }}
              </RouterLink>
            </div>
          </template>
        </div>
        <div class="footer-special">
          <template v-for="item in specialList">
            <template v-if="item.blogSpecialId == specialId">
              专栏：
              <div class="special">
                <RouterLink :to="'sd/' + specialId" class="sub-menu-link">
                  {{ item.blogSpecialName }}
                </RouterLink>
              </div>
            </template>
          </template>
        </div>
        <div class="footer-category">
          <template v-if="categoryName">
            分类：
            <div class="category">
              <RouterLink :to="'cd/' + categoryId" class="sub-menu-link">
                {{ categoryName }}
              </RouterLink>
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
import {onMounted, reactive, ref} from "vue";
import {SpecialType} from "@/type/special";
import {useCategoryStore} from "@/store/category";
import {useMemberStore} from "@/store/member";

const props = defineProps({
  small: {
    type: Boolean,
    default: false
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
  count: {
    type: Number,
    default: -1
  },
  cover: String,
  title: String,
  summary: String,
  time: String,
  author: String,
  specialId: String,
  toId: String,
  toPath:String,
  categoryName: String,
})
const authorId = ref('')
const categoryId = ref('')
const categoryStore = useCategoryStore()
const specialStore = useSpecialStore()
const memberStore = useMemberStore()
const specialList = reactive<SpecialType[]>([])
const getItemData = () => {
  Object.assign(specialList, specialStore.getSpecialList)
  memberStore.getMemberList.forEach(item => {
    if(item.userName == props.author){
      authorId.value = <string>item.userId
      return
    }
  })
  categoryStore.getCategoryList.forEach(item => {
    if(item.blogCategoryName == props.categoryName){
      categoryId.value = <string>item.blogCategoryId
      return
    }
  })

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
    .content-summary{
      margin: 12px 0;
      line-height: 22px;
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
      .content-summary{
        position: relative;
        top: 0;
        color: #999aaa;
        margin-top: 15px;
      }
    }
    .content-count {
      color: #999aaa;
    }
  }
}
.box-item:hover, .small-item:hover{
  background-color: #f0faff;
}

.content-title:hover, .author:hover, .special:hover, .category:hover {
  cursor: pointer;
}
.content-summary {
  word-break: break-all;
  white-space: normal;
  font-size: 14px;
  color: #999aaa;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  //超出两行 就省略号
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.content-title {
  color: #108b96 !important;
  display: block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sub-menu-link{
  color: #108b96 !important;
  text-decoration: none;
}
</style>