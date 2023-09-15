<template>
  <div class="footer">
    <div class="top-image">
      <IconBox/>
    </div>
    <hr/>
    <div class="bottom-text">
      <div class="bottom-beian">
        <img src="@/assets/image/beian.png" alt="">
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42030402000172">
          {{publicNetworkSecurityStr}}
        </a>
      </div>
      <span class="bottom-span">
          <a href="https://beian.miit.gov.cn/" target="_blank">{{filingNumberStr}}</a>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">

import IconBox from "@/components/IconBox.vue";
import {ref} from "vue";
const publicNetworkSecurityStr = ref("鄂公网安备42030402000172号")
const filingNumberStr = ref("鄂ICP备2023011277号")
</script>

<style scoped lang="scss">
.footer {
  background-color: #37424E;
  height: 250px;
  width: 100vw;
  padding: 25px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0;
  z-index: 2;
  .top-image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px 0;
  }
  hr {
    width: 80%;
    margin: 10px auto;
    height: 0.1px;
    background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0),
            cyan,
            rgba(0, 0, 0, 0)
    );
  }

  .bottom-text {
    margin-top: 25px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 20px;
    .bottom-beian{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
    .bottom-span{
      margin-left: 50px;
    }
    a {
      margin-left: 5px;
      text-decoration: none;
    }
    a:link, a:visited, a {
      color: #939393;
    }

    a:hover {
      color: #87c0ca;
    }
  }
}
</style>