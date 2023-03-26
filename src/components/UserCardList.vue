<template>
  <div>
    <van-card
        v-for="user in props.userList"
        :tag="user.planetCode"
        :desc="user.profile"
        :title="user.username"
        :thumb="user.avatarUrl"
    >
      <template #tags>
        <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 5px;margin-top: 5px;">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {UserType} from "../models/user";

interface UserCardListProps {
  userList: UserType[];
}
const props =withDefaults(defineProps<UserCardListProps>(),{
  // @ts-ignore
  userList: [] as UserType[]
})
</script>

<style scoped>

</style>
