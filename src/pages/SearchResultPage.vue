<template>
  <div>
    <user-card-list :user-list="userList"></user-card-list>
    <van-empty v-if="!userList || userList.length<1" description="搜索结果为空"></van-empty>
  </div>
</template>

<script setup>
import {Toast} from "vant";
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugins/myAxios.ts";
import qs from 'qs'
import UserCardList from "../components/UserCardList.vue";


const route = useRoute()
const {tags} = route.query
const userList = ref([])

onMounted(async () => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },
    paramsSerializer: {
      serialize: params => {
        return qs.stringify(params, {indices: false})
      }
    }
  })
      .then(function (response) {
        console.log('/user/search/tags success', response)
        Toast.success('请求成功！')
        return response.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error', error)
        Toast.fail('请求失败！')
      })
  // console.log("userListData="+userListData)
  if (userListData){
    userListData.forEach(user => {
      if (user.tags){
        user.tags = JSON.parse(user.tags)
      }
    })
    userList.value = userListData
  }
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
