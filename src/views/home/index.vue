<template>
  <div class="container">
    <!-- <nav-bar class="head" :barProps="barProps" @click-left="goBack"></nav-bar> -->
    <div class="main">
      <van-tabs type="card" background="#3C85F7" title-active-color="#3C85F7" color="#fff">
        <van-tab title="专项检查" dot>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              class="list"
            >
              <div class="inspection-header van-hairline--surround">
                <div class="name">
                  <span>XXXXX检查项目</span>
                  <van-checkbox v-model="isChecked"></van-checkbox>
                </div>
                <div class="desc">
                  <span>检查时间范围</span>
                  <div>
                    <span class="date">2020-03-08</span>
                    <span class="date-line">—</span>
                    <span class="date">2020-03-08</span>
                  </div>
                </div>
                <div class="projectNum">1</div>
              </div>
              <!--  检查项目 -->
              <InspectionItem :isChecked="isChecked" />
            </van-list>
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
          />
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
import InspectionItem from '@/components/InspectionItem.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  data() {
    return {
      barProps: {
        title: '专项检查',
        leftArrow: true,
        classStyle: 'blue'
      },
      checked: true,
      isChecked: true,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      searchValue: ''
    }
  },
  components: {
    InspectionItem,
    NavBar
  },
  methods: {
    goBack() {},
    goDetail() {
      this.$router.push({ name: 'Detail' })
    },
    goInspectionDetail() {},
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
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
  // &:before {
  //   content: '';
  //   position: absolute;
  //   border: 10px solid #e6686e;
  //   height: 0;
  //   width: 0;
  //   border-right-color: transparent;
  //   border-bottom-color: transparent;
  //   top: 0;
  //   left: 0;
  // }
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
.container {
  position: relative;
}
.back {
  position: absolute;
  top: 17px;
  left: 12px;
  color: #fff;
  font-size: 16px;
}
/deep/.van-tabs__wrap {
  width: 100%;
  background-color: #3c85f7;
  height: 50px;
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
