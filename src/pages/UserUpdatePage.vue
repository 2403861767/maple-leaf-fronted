<template>
  <template v-if="user">
  <van-cell title="昵称" is-link to="/user/edit" @click="toEdit('username','昵称',user.username)" :value="user.username"/>
  <van-cell title="账号" :value="user.userAccount"/>
  <van-cell title="头像" is-link to="/user/edit" @click="toEdit('avatarUrl','头像',user.avatarUrl)">
    <img style="height: 48px;" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="性别" @click="toEdit('gender','性别', user.gender)" is-link to="/user/edit" :value="user.gender"/>
  <van-cell title="电话" @click="toEdit('phone','电话', user.phone)" is-link to="/user/edit" :value="user.phone"/>
  <van-cell title="邮箱" @click="toEdit('email','邮箱', user.email)" is-link to="/user/edit" :value="user.email"/>
  <van-cell title="星球编号" :value="user.planetCode"/>
  <van-cell title="注册时间" :value="user.createTime"/>
</template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";

const mockUser = {
  id: 1,
  username: 'seeleaf',
  userAccount: 'seeleaf',
  avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
  gender: '男',
  phone: '18307984130',
  email: '13456@qq.com',
  planetCode: '1',
  tags: [],
  createTime: new Date(),
}

const user = ref();

onMounted(async () => {
  const res = await getCurrentUser()
  if (res){
    // console.log(res)
    user.value = res
    console.log('user = ',user)
    Toast.success('获取用户信息成功')
  }else {
    Toast.fail('获取用户信息失败')
  }
})
const router = useRouter()
const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}



</script>

<style scoped>

</style>
