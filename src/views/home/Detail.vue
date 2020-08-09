<template>
  <div class="detail-container">
    <van-tabs type="card" swipeable background="#3C85F7" title-active-color="#3C85F7" color="#fff">
      <van-tab class="inspection-item" title="专项检查1">
        <div class="detail-header">
          <van-cell-group :border='false'>
            <van-cell title-class='title' value-class='value' center title="专项检查名称：" value="广州市工程质量检测机构专项检查" />
            <van-cell title-class='title' value-class='value' center title="工程名称：" value="XXXXX工程"  />
          </van-cell-group>
          <!-- <div>
            <span>专项检查名称：</span>
            <span>广州市工程质量检测机构专项检查</span>
          </div>
          <div>
            <span>工程名称：</span>
            <span>XXXXX工程</span>
          </div> -->
          <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="检查类型："
            label-class='title'
            placeholder="点击选择检查类型"
            @click="showPicker = true"
            right-icon="arrow-down"
          />
          <van-popup v-model="showPicker" position="bottom">
            <van-picker
              show-toolbar
              :columns="columns"
              @confirm="onConfirm"
              @cancel="showPicker = false"
            />
          </van-popup>
        </div>
      </van-tab>
      <van-tab title="专项检查2">专项检查 2</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
    </van-tabs>
    <!-- 返回 -->
    <div class="back" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false
    }
  },
  methods: {
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.van-tabs__wrap {
  background-color: #3c85f7;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-tabs__nav {
    width: 75vw;
    border-radius: 20px;
    padding: 0;
  }
}
.detail-container {
  position: relative;
  .inspection-item {
    display: flex;
    justify-content: center;
    align-items: center;
    .detail-header {
      width: 95vw;
      .title{
        flex:8;
        font-weight:600;
        color: #969799;
      }
      .value{
        flex:16;
        color: #646566;
      }
    }
  }
}
/deep/.van-field__body {
  border: 1px solid #ccc;
  padding: 0 15px;
  border-radius: 5px;
}
.back {
  position: absolute;
  top: 17px;
  left: 12px;
  color: #fff;
  font-size: 16px;
}
</style>
