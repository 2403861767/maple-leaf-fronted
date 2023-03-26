<template>
  <div >
    <van-cell center title="心动模式">
      <template #right-icon>
        <van-switch v-model="isMatchMode" size="24" />
      </template>
    </van-cell>
    <user-card-list :user-list="userList"></user-card-list>
    <van-empty v-if="!userList || userList.length<1" description="数据为空"></van-empty>
  </div>
</template>

<script setup lang="ts">
import {Toast} from "vant";
import {onMounted, ref, watchEffect} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";


const route = useRoute()
const userList = ref([])
const isMatchMode = ref<boolean>(false)



const loadData = async () =>{
  let userListData
  // 心动模式
  if (isMatchMode.value){
    const num = 10
    const res = await myAxios.get('/user/match', {
      params: {
        num,
      }
    })
    userListData = res.data
    console.log("userListData="+userListData)
    if (userListData){
      userListData.forEach(user => {
        if (user.tags){
          user.tags = JSON.parse(user.tags)
        }
      })
      userList.value = userListData
    }
  }else {
    // 普通模式
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize:8,
        pageNum: 1,
      }
    })
        .then(function (response) {
          console.log('/user/recommend success', response)
          Toast.success('请求成功！')
          return response.data.records;
        })
        .catch(function (error) {
          console.log('/user/recommend error', error)
          Toast.fail('请求失败！')
        })
    console.log("userListData="+userListData)
    if (userListData){
      userListData.forEach(user => {
        if (user.tags){
          user.tags = JSON.parse(user.tags)
        }
      })
      userList.value = userListData
    }
  }
}

watchEffect(() => {
  loadData()
})
onMounted(async () => {

})

const mockUser = {
  id: 1,
  username: "seeleaf",
  userAccount: 'seeleaf',
  avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
  profile: '一名精神萧火，阿巴巴爸爸爸爸爸爸爸爸爸爸爸爸阿爸巴巴爸爸，啊巴巴爸爸',
  gender: 0,
  phone: '1231231',
  email: '1231231@qq.com',
  userRole: 0,
  planetCode: 1,
  tags: ['java', 'emo', '打工中', 'emo', '打工中'],
  createTime: new Date(),
}


</script>

<style scoped>

</style>
