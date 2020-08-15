<template>
  <div class="container">
    <div class="main">
      <van-tabs type="card" background="#3C85F7" title-active-color="#3C85F7" color="#fff">
        <van-tab title="专项检查" dot>
          <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
            <!-- <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="list"
            >-->
            <div class="list">
              <div
                class="inspection-header van-hairline--surround"
                v-for="(item,index) in specialList"
                :key="item.id"
              >
                <div class="name">
                  <span>{{item.specialInspectionName}}</span>
                  <van-checkbox v-model="isChecked"></van-checkbox>
                </div>
                <div class="desc">
                  <span>检查时间范围</span>
                  <div>
                    <span class="date">{{item.checkStartTime}}</span>
                    <span class="date-line">—</span>
                    <span class="date">{{item.checkEndTime}}</span>
                  </div>
                </div>
                <div class="projectNum">{{index+1}}</div>
              </div>
              <!--  检查项目 -->
              <!-- <InspectionItem :isChecked="isChecked" /> -->
              <!-- </van-list> -->
            </div>
          </van-pull-refresh>
          <div class="submit" @click="goInspectionDetail">
            <van-button
              class="submit-btn"
              block
              type="info"
              @click="goDetail"
              native-type="submit"
            >确定</van-button>
          </div>
        </van-tab>
        <van-tab title="历史记录">
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
          <inspection-history></inspection-history>
        </van-tab>
      </van-tabs>
    </div>
    <div class="back" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </div>
  </div>
</template>

<script>
// 检查项目
// import InspectionItem from "@/components/program/businessComponents/specialInspection/InspectionItem.vue";
// 历史记录
import InspectionHistory from '@/components/InspectionHistory.vue'
import http from '@/utils/http.js'
export default {
  data() {
    return {
      specialList: {}, //专项检查列表
      checked: true,
      isChecked: true,
      isLoading: false,
      searchValue: ''
    }
  },
  components: {
    // InspectionItem,
    InspectionHistory
  },
  mounted() {
    this.getSpecialList()
  },
  methods: {
    // 获取专项检查列表
    async getSpecialList() {
      const { data: res } = await http.get('/getData')
      console.log(res)
      this.specialList = res.records
      this.specialList.map(item => {
        item.checkEndTime = item.checkEndTime.split(' ')[0]
        item.checkStartTime = item.checkStartTime.split(' ')[0]
      })
      console.log(this.specialList)
    },

    goBack() {},
    goDetail() {
      this.$router.push({ name: 'Detail' })
      // this.editSpecial();
    },
    goInspectionDetail() {},
    onRefresh() {
      this.getSpecialList()
      this.isLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
// .head{}
.inspection-header {
  background-color: #fff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 95%;
  box-sizing: border-box;
  font-size: 14px;
  padding: 0 15px;
  box-shadow: 0 5px 8px lightgray;
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
    .date {
      color: #969799;
      border: 1px solid #ccc;
      padding: 6px 15px;
      border-radius: 3px;
    }
    .date-line {
      margin: 0 5px;
    }
  }
}
.search-bottom-bg {
  height: 5px;
  background-color: #f8f8f8;
}
.container {
  position: relative;
}
.back {
  position: absolute;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  top: 24px;
  left: 8px;
  color: #fff;
  font-size: 16px;
}
/deep/.van-tabs__wrap {
  width: 100%;
  background-color: #3c85f7;
  height: 66px;
  // margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-tabs__nav {
    width: 70vw;
    border-radius: 20px;
    overflow: hidden;
  }
}

.main {
  .list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 15px;
  }
}
.submit {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.submit-btn {
  width: 80vw;
}
.time {
  span {
    margin-right: 20px;
  }
}
</style>
