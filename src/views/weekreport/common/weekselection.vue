<template>
  <div>
    <el-date-picker width="200px" v-model="value" type="week" :format="start + ' 至 ' + end" @change="showDate"
    :picker-options = "pickoption" firstDayOfWeek = "5" placeholder="选择周">
    </el-date-picker>
  </div>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs'
import {ref ,reactive} from 'vue';

const value = ref("");
const start = ref("");
const end = ref("");

const pickoption  = reactive({
  firstDayOfWeek: 5,
  disabledDate:(value) => {
    let today = new Date(); //获取今天日期
    let d = today.getDay(); //计算今天是周几。如果是周天，d=0
    let endTime = today.setDate(today.getDate() + (6 - d));
    return value.getTime() > endTime; //不可选本周日以后的时间
  }
});


const unabledate = (value) => {
    let today = new Date(); //获取今天日期
    let d = today.getDay(); //计算今天是周几。如果是周天，d=0
    let endTime = today.setDate(today.getDate() + (6 - d));
    return value.getTime() > endTime; //不可选本周日以后的时间
  }


const showDate = ()=>{
  let startTime = dayjs(value.value);
  let endTime = dayjs(startTime).add(6, "day");
  start.value = splitDate(startTime);
  end.value = splitDate(endTime);
  console.log(startTime)
};

const splitDate = (date)=>{
  return dayjs(date).format("YYYY-MM-DD");
}

</script>
<style lang="scss" scoped>
</style>
