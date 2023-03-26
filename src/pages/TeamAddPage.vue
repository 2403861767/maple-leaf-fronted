<template>
  <div id="teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="队伍名"
            placeholder="请输入队伍名"
            :rules="[{ required: true, message: '请填写队伍名' }]"
        />

        <van-field
            v-model="addTeamData.description"
            name="description"
            label="队伍描述"
            rows="4"
            autosize
            type="textarea"
            placeholder="请输入队伍描述"
        />
        <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间选择"
            :placeholder="addTeamData.expireTime?addTeamData.expireTime:'点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="addTeamData.expireTime"
              type="datetime"
              title="选择过期时间"
              @confirm="onConfirm"
              :min-date="minDate"
          />
        </van-popup>

        <van-field name="maxNum" label="最大人数">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max="10" min="3"/>
          </template>
        </van-field>

        <van-field name="status" label="队伍状态">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公开</van-radio>
              <van-radio name="1">私有</van-radio>
              <van-radio name="2">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>

        <van-field
            v-if="Number(addTeamData.status) === 2"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="队伍密码"
            placeholder="请输入队伍密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          确定
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {useRouter} from "vue-router";
import {Toast} from "vant";
const router = useRouter()
const initFormData = {
  "description": "",
  "expireTime": "",
  "maxNum": 3,
  "name": "",
  "status": 0,
  "userId": 0,
  "password": "",
}
// 用户填写的表单数据
const addTeamData = ref({...initFormData})

const showPicker = ref(false);

const onConfirm = (value) => {
  showPicker.value = false;
};
const minDate = new Date();
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  const res = await myAxios.post('/team/add',postData)
  if (res.code === 0 && res.data){
    Toast.success("添加成功!")
    router.push({
      path: '/team',
      replace: true,
    })
  }else {
    Toast.fail("添加失败")
  }
}
</script>

<style scoped>

</style>
