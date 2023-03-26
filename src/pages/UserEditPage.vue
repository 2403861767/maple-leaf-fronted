<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`请输入${editUser.editName}`"

      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        确认修改
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {UserType} from "../models/user";

const route = useRoute()
const router = useRouter()
const editUser = ref({
  editKey: route.query.editKey,
  editName: route.query.editName,
  currentValue: route.query.currentValue
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser()
  if (!currentUser){
    Toast.fail('用户未登录')
    return
  }
  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    // js的动态语法
    [editUser.value.editKey as string]: editUser.value.currentValue
  })
  if (res.code === 0 && res.data >0 ){
    Toast.success('修改成功!')
    router.back();
  }else {
    Toast.fail('修改失败！')
  }
};
</script>

<style scoped>

</style>