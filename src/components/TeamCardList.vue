<template>
  <div>
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        :title="team.name"
        thumb="https://see-leaf.oss-cn-beijing.aliyuncs.com/2023/03/8e48699a-0c9b-472d-938f-b9a7f7a83e87idea图片.jpg"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 5px;margin-top: 5px;">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `最大人数:${team.maxNum}` }}
        </div>
        <div v-if="team.expireTime">
          {{ `过期时间:${team.expireTime}` }}
        </div>
        <div>
          {{ `发布时间:${team.createTime}` }}
        </div>
      </template>
      <template #footer>
        <van-button size="mini" plain type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain  @click="doUpdateTeam(team.id)">更新队伍</van-button>
        <van-button  size="mini" type="danger" plain  @click="doQuitTeam(team.id)">退出队伍</van-button>
        <van-button  v-if="team.userId === currentUser?.id" size="mini" type="danger"  @click="doDeleteTeam(team.id)">解散队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from '../constants/team'
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {getCurrentUserState} from "../states/user";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()
interface TeamCardListProps {
  teamList: TeamType[];

}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  // @ts-ignore
  teamList: [] as TeamType[],

})

const currentUser = ref()
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}
const doJoinTeam = async (id: number) => {
  const res = await myAxios.post('/team/join', {
    teamId: id,
  })
  if (res.code === 0) {
    Toast.success("加入成功!")
  } else {
    Toast.fail("加入失败" + (res.description ? `,${res.description}` : ''))
  }
}
const doQuitTeam = async (id) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id,
  })
  if (res.code === 0) {
    Toast.success("退出成功!")
  } else {
    Toast.fail("退出失败" + (res.description ? `,${res.description}` : ''))
  }
}
const doDeleteTeam = async (id) => {
  const res = await myAxios.post('/team/delete', {
    teamId: id
  })
  if (res.code === 0) {
    Toast.success("解散成功!")
  } else {
    Toast.fail("解散失败" + (res.description ? `,${res.description}` : ''))
  }
}
onMounted(async () => {
  currentUser.value = await getCurrentUser()
})
</script>

<style scoped>

</style>
