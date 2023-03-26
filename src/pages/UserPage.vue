<template>
  <template v-if="user">
    <van-cell title="当前的登录的用户" :value="user?.username" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
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
  if (res) {
    // console.log(res)
    user.value = res
    console.log('user = ', user)
    Toast.success('获取用户信息成功')
  } else {
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
