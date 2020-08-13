<template>
  <div class="detail-container">
    <van-tabs type="card" swipeable background="#3C85F7" title-active-color="#3C85F7" color="#fff">
      <van-tab class="inspection-item" title="专项检查1">
        <div class="detail-header">
          <van-cell-group :border="false">
            <van-cell
              title-class="title"
              value-class="value"
              center
              title="专项检查名称："
              value="广州市工程质量检测机构专项检查"
            />
            <van-cell title-class="title" value-class="value" center title="工程名称：" value="XXXXX工程" />
          </van-cell-group>
          <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="检查类型："
            label-class="title"
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

          <div class="data-card">
            <van-field
              readonly
              clickable
              colon
              is-link
              label-align="right"
              arrow-direction="down"
              name="picker"
              :value="value"
              label="检查项"
              placeholder="点击选择检查项"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
            <van-field
              readonly
              clickable
              colon
              is-link
              label-align="right"
              arrow-direction="down"
              name="picker"
              :value="value"
              label="检查内容"
              placeholder="点击选择检查内容"
              @click="showPicker = true"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker = false"
              />
            </van-popup>
            <van-field colon  label-align='right' label="分值" value="1" readonly />
            <van-field colon  label-align='right' name="checkboxGroup" label="检查情况">
              <template #input>
                <van-checkbox-group v-model="checkboxGroup" direction="horizontal">
                  <van-checkbox name="1" shape="square">符合</van-checkbox>
                  <van-checkbox name="2" shape="square">不符合</van-checkbox>
                </van-checkbox-group>
              </template>
            </van-field>
            <van-field label-width="90" colon center label="主要存在问题" value="证书已过期" readonly />
            <div class="projectNum">1</div>
          </div>
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
import service from '@/utils/request.js'
export default {
  data() {
    return {
      checkboxGroup: [],
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    // https://easy-mock.sucaidaohang.com/
     async getDetail(){
       const {data:res}=await service.post('/inspectionDetail')
       console.log(res)
    },
    onConfirm(value) {
      this.value = value
      this.showPicker = false
    }
  }
}
</script>

<style lang="scss" scoped>
.data-card {
  margin-top: 10px;
  position: relative;
  &::before {
    content: '';
    border: 12px solid #3c85f7;
    height: 0;
    width: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    border-right-color: transparent;
    border-bottom-color: transparent;
  }
  .projectNum {
    position: absolute;
    color: #fff;
    top: 0;
    left: 2px;
    z-index: 2;
    transform: rotate(-40deg);
  }
}
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
      .title {
        flex: 8;
        font-weight: 600;
        color: #969799;
      }
      .value {
        flex: 16;
        color: #646566;
      }
    }
  }
}
// /deep/.van-field__body {
//   border: 1px solid #ccc;
//   padding: 0 15px;
//   border-radius: 5px;
// }
.back {
  position: absolute;
  top: 17px;
  left: 12px;
  color: #fff;
  font-size: 16px;
}
</style>
