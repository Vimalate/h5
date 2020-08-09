<template>
  <div class="inspection-item van-hairline--surround">
    <div class="name">
      <span>XXXXX检查项目</span>
      <van-checkbox v-model="isChecked"></van-checkbox>
    </div>
    <div class="desc">
      <span>巡检专家 | 刘秀宝</span>
      <span>日期 | 2020-03-08</span>
    </div>
     <div class="projectNum">2</div>
  </div>
</template>

<script>
export default {
  name: 'InspectionItem',
  props: {
    isChecked: Boolean
  },
  data() {
    return {}
  },
  computed: {
    // isChecked
  }
}
</script>

<style lang="scss" scoped>
.inspection-item {
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 95%;
  box-sizing: border-box;
  // border: 1px solid #eee;
  font-size: 14px;
  padding: 0 15px;
  box-shadow: 0 5px 8px lightgray;
  &::before {
    content: '';
    border: 12px solid #3c85f7;
    height: 0;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .projectNum {
    position: absolute;
    color: #fff;
    top: 0;
    left: 2px;
    transform: rotate(-40deg);
  }
  .name {
    display: flex;
    height: 40px;
    font-weight: 600;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
  }
  .desc {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }
}
</style>
