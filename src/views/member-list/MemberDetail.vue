<template>
  <div class="layout-container">
    <div class="member-main">
      <div class="cover">
        <Cover :cover="member.userCover" borderRadios="50"></Cover>
      </div>
      <div class="data">
        <div class="name">
          {{ member.userName }}
        </div>
        <div class="number">
          <div class="fans">
            粉丝数：{{ member.userFans }}
          </div>
          <div class="blog-number">博客：{{ member.userEssayCount }}篇</div>
        </div>
        <div class="desc">
          个性签名：{{ member.userAutograph }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, reactive} from "vue";
import {useMemberStore} from "@/store/member";
import {MemberType} from "@/type/member";
import Cover from "@/components/Cover.vue";

const route = useRoute()
const memberStore = useMemberStore()
const member = reactive<MemberType>({})
const getData = async () => {
  const id = route.params.id
  memberStore.getMemberList.forEach(item => {
    if (item.userId == id) {
      Object.assign(member, item)
      return
    }
  })
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.layout-container {
  width: 98%;
  padding: 10px;

  .member-main {
    box-shadow: 2px 2px 2px 2px #ddd;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: row;

    .cover {
      width: 200px;
      height: 100%;
    }

    .data {
      margin-left: 25px;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 25px;
        font-weight: bold;
      }

      .number {
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        padding-right: 20px;
        line-height: 50px;

        .fans {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>