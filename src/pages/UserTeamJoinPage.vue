<template>
  <div id="teamPage">
    <van-search v-model="searchText"  placeholder="搜索队伍" @search="onSearch" />
    <van-empty v-if="!teamList || teamList.length<1" description="数据为空"></van-empty>
    <team-card-list :teamList="teamList"></team-card-list>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from '../components/TeamCardList.vue'
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {Toast} from "vant";

const router = useRouter();
const searchText =ref('')
// 跳转
const doJoinTeam = () => {
  router.push({
    path: '/team/add'
  })
}
const teamList = ref([])

const listTeam = async (val='') => {
  const res = await myAxios.get('/team/list/my/join',{
    params:{
      searchText: val
    }
  })
  if (res.code === 0){
    Toast.success("查询成功!")
    teamList.value = res.data
  }else {
    Toast.fail("加载队伍失败，请刷新重试")
  }
}

const onSearch =  (val) => {
  listTeam(val)
}

onMounted( () => {
  listTeam()
})
</script>

<style scoped>

</style>
