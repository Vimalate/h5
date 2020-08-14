<template>
  <div class="history-container">
    <div class="history-list van-hairline--surround" v-for="(item, index) in 3" :key="index">
      <div class="item name">
        <span>专项检查名称：</span>
        <span>XXXXX检查项目</span>
      </div>
      <div class="item Monitor">
        <span>检察人员：</span>
        <span>吴晓竹</span>
      </div>
      <div class="item date">
        <span>检查日期：</span>
        <span class="date-record">2020-7-24</span>
      </div>
      <div class="btn">
        <van-button type="primary" size="mini" @click="clickEdit">编辑</van-button>
        <van-button type="info" size="mini" @click="clickRead">查看</van-button>
        <van-button type="warning" size="mini" @click="clickRemove">删除</van-button>
      </div>
      <div class="projectNum">{{ index + 1 }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InspectionHistory',
  data() {
    return {
      // list:[]
    }
  },
  methods: {
    clickEdit() {
      console.log('clickEdit')
    },
    clickRead() {
      console.log('clickRead')
    },
    clickRemove() {
      console.log('clickRemove')
    }
  }
}
</script>

<style lang="scss" scoped>
.history-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // margin-top: px;
  .history-list {
    // border-color: #3c85f7;
    width: 95vw;
    box-shadow: 0 5px 8px lightgray;
    padding: 10px 20px 10px 0;
    box-sizing: border-box;
    margin-top: 15px;
    &::before {
      content: '';
      border: 12px solid #199ed8;
      height: 0;
      width: 0;
      position: absolute;
      top: 0;
      left: 0;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
    .item {
      height: 35px;
      display: flex;
      align-items: center;
      margin-left: 20px;
      :first-child {
        width: 30vw;
        text-align: right;
      }
      :last-child {
        color: #969799;
        // justify-content: center;
        border: 1px solid #969799;
        width: 80%;
        padding: 5px 8px;
      }
      .date-record {
        border: 0;
        // margin-left: -6px;
      }
    }
    .projectNum {
      position: absolute;
      color: #fff;
      top: 0;
      left: 2px;
      transform: rotate(-40deg);
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
