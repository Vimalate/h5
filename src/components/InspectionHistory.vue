<template>
  <div class="history-container">
     <van-search
            v-model="searchValue"
            shape="round"
            right-icon
            input-align="center"
            placeholder="请输入搜索关键词"
            class="search"
            clearable
          />
          <div class="search-bottom-bg"></div>
    <div class="history-list van-hairline--surround" v-for="(item) in historyData" :key="item.id">
      <div class="item name">
        <span>专项检查名称：</span>
        <span>XXXXX检查项目</span>
      </div>
      <div class="item Monitor">
        <span>检察人员：</span>
        <span>{{item.itemMonitor}}</span>
      </div>
      <div class="item date">
        <span>检查日期：</span>
        <span class="date-record">{{item.dateItemRecord}}</span>
      </div>
      <div class="btn">
        <van-button type="primary" size="mini" @click="clickEdit">编辑</van-button>
        <van-button type="info" size="mini" @click="clickRead">查看</van-button>
        <van-button type="warning" size="mini" @click="clickRemove">删除</van-button>
      </div>
      <!-- <div class="projectNum">{{ index + 1 }}</div> -->
    </div>
  </div>
</template>

<script>
import http from '@/utils/http.js'
export default {
  name: 'InspectionHistory',
  // props:['historyData'],
  data() {
    return {
      // list:[]
      searchValue: '',
      historyData:[]
    }
  },
  mounted() {
    this.getHistory()
  },
  methods: {
     async getHistory() {
      let params = {
        orderColumn: 'create_time',
        orderType: 'DESC',
        pageNo: 1,
        pageSize: 10,
        projectId: 'E46D1EA9-651A-E954-BF10-21E6EB496061'
      }
      const { data: res } = await http.post('/historyList', params)
      console.log(res)
      this.historyData=res.records
      console.log(this.historyData)
    },
    clickEdit() {
      // data = {
      //   orderColumn: 'create_time',
      //   orderType: 'DESC',
      //   pageNo: 1,
      //   pageSize: 10,
      //   projectId: 'E46D1EA9-651A-E954-BF10-21E6EB496061'
      // }
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
.search{
  width: 100vw;
}
.search-bottom-bg {
  height: 5px;
  background-color: #f8f8f8;
}
</style>
