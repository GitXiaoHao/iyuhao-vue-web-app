<template>
  <div class="layout-container">
    <div class="member-main" v-for="item in memberList">
      <div class="cover">
        <Cover :cover="item.userCover" borderRadios="50"></Cover>
      </div>
      <div class="data">
        <div class="name">
          {{item.userName}}
        </div>
        <div class="number">
          <div class="fans">
            粉丝数：{{item.userFans}}
          </div>
          <div class="blog-number">博客：{{item.userEssayCount}}篇</div>
        </div>
        <div class="desc">
          个性签名：{{item.userAutograph}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useMemberStore} from "@/store/member";
import {onMounted, reactive} from "vue";
import {MemberType} from "@/type/member";
import {getAdminListByApi} from "@/apis/admin";
import Cover from "@/components/Cover.vue";

const memberStore = useMemberStore()
const memberList = reactive<MemberType[]>([])
const getData = async  () => {
  if(memberStore.getMemberList.length){
    Object.assign(memberList,memberStore.getMemberList)
  }else{
    const res:any = await getAdminListByApi()
    if(res.code == 200){
      Object.assign(memberList,res.data)
    }
  }
}
onMounted(() => {
 getData()
})
</script>

<style scoped lang="scss">
.layout-container{
  width: 98%;
  padding: 10px;
  .member-main{
    box-shadow: 2px 2px 2px 2px #ddd;
    margin-top: 20px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    .cover{
      width: 200px;
      height: 100%;
    }
    .data{
      margin-left: 25px;
      display: flex;
      flex-direction: column;
      .name{
        font-size: 25px;
        font-weight: bold;
      }
      .number{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        padding-right: 20px;
        line-height: 50px;
        .fans{
          margin-right: 20px;
        }
      }
    }
  }
}
</style>