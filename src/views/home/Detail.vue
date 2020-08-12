<template>
  <div class="detail-container">
    <van-tabs type="card" swipeable background="#3C85F7" title-active-color="#3C85F7" color="#fff">
      <van-tab
        class="inspection-item"
        :title="item.bussinessName"
        v-for="(item) in editSpecialList"
        :key="item.bussinessId"
      >
        <div class="detail-card">
          <!-- header -->
          <div class="header">
            <van-cell-group :border="false">
              <van-field
                label-width="100"
                label="专项检查名称："
                center
                :value="item.bussinessName"
                readonly
              />
              <van-field label="工程名称：" :value="superviseInfoData.projectBame" readonly />
            </van-cell-group>
            <van-field
              clickable
              name="picker"
              :value="superviseInfoData.item1"
              label="检查类型："
              label-class="inspection-type-title"
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
          <!-- data-cart -->

          <div
            class="data-card"
            v-for="(dataItem, index) in item.superviseInfoThirdList"
            :key="dataItem.id"
          >
            <van-field
              readonly
              clickable
              colon
              type="textarea"
              autosize
              center
              rows="1"
              name="picker"
              :value="dataItem.item1"
              label="评分项目"
              placeholder="点击选择检查项"
            />
            <van-field readonly clickable colon name="picker" :value="dataItem.item2" label="分值" />
            <van-field
              colon
              label="评分标准"
              rows="1"
              type="textarea"
              autosize
              center
              readonly
              :value="dataItem.item3"
            />
            <van-field colon v-model="dataItem.item4" type="number" label="评分" />
             <!-- <van-field colon name="checkboxGroup" label="评分">
              <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1" shape="square">符合</van-radio>
                  <van-radio name="2" shape="square">不符合</van-radio>
                </van-radio-group>
              </template>
            </van-field> -->
            <!-- <van-field
              label-width="100"
              colon
              center
              label="主要存在问题"
              :value="dataItem.item5"
              readonly
            /> -->
            <div class="projectNum">{{index+1}}</div>
          </div> 
          <!-- 根据配置数据动态渲染 -->
          <!-- <div class="data-card" >
            <div  v-for="(item, index) in pageConfigData" :key="index">
               <van-field
              colon
              :label="item.cellName"
              rows="1"
              type="textarea"
              autosize
              center
              readonly
              :value="item.defaultValue"
             v-if="item.controlCode==='input'"
            />
          </div>
            <div class="projectNum">{{index+1}}</div>
            
          </div> -->
          
          <!-- footer -->
          <van-cell-group class="footer">
            <van-field label="监督措施：" :value="superviseInfoData.item2" readonly />
            <van-field name="radio" label="处理结果：">
              <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">下发整改通知</van-radio>
                  <van-radio name="2">下发局部停工通知</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="检查人：" :value="superviseInfoData.itemMonitor" readonly />
            <van-field
              label="检查时间："
              :value="superviseInfoData.dateItemRecord.split(' ')[0]"
              readonly
            />
            <van-field label="附件" value="PDF" readonly />
          </van-cell-group>
          <!-- 上传 -->
          <van-uploader class="upload" :after-read="afterRead" />
        </div>
        <!-- 保存或提交 -->
        <div class="save-special">
          <div class="save-special-btn">
            <van-button type="info" @click="specialSave" class="save">保存</van-button>
            <van-button plain type="info" @click="specialSubmit" class="submit">提交</van-button>
          </div>
        </div>
      </van-tab>
      <!-- <van-tab title="专项检查2">专项检查 2</van-tab> -->
      <!-- <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>
      <van-tab title="专项检查3">专项检查 3</van-tab>-->
    </van-tabs>
    <!-- 返回 -->
    <div class="back" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import http from "@/model/specialInspection/http.js";
export default {
  data() {
    return {
      editSpecialList: [], //新增编辑列表
      superviseInfoData: [],
      checkboxGroup: [],
      pageConfigData:[],//页面配置数据

      bussinessName:[],//头部专项检查名称
      inspectionData:{},//专项检查总数据
      value: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false,
      radio: "1",
    };
  },
  mounted() {
    this.editSpecial();
  },
  methods: {
    // 新增编辑
    async editSpecial() {
      let payload = {
        bussinessId:
          "f05df0d0d7d911ea814900ff7beea89a,fcea7ad2d7c711ea814900ff7beea89a",
        bussinessName: "在建工程项目现场检查情况表,现场作业人员抽查",
        currentBussinessId: "f05df0d0d7d911ea814900ff7beea89a",
        id: "1",
        projectId: "E46D1EA9-651A-E954-BF10-21E6EB496061",
        userId: "1",
      };
      const { data: res } = await http.post("/editSpecialInspection", payload);
      console.log(res);
      this.superviseInfoData = res.superviseInfoData;//头尾部固定数据
      this.editSpecialList = this.superviseInfoData.superviseInfoItemList;//页面具体总数据
      // this.editSpecialList.pageConfigData = res.pageConfigData;
      this.pageConfigData=res.pageConfigData//页面配置项数据
      // console.log(this.pageConfigData);
      // console.log("superviseInfoData", this.superviseInfoData);
      // console.log("editSpecialList", this.editSpecialList);
      this.pageConfigData.map(item=>{
        item.businessName=item.businessName===this.editSpecialList.map(ite=>{
          
        })
      })
      this.inspectionData.pageConfigData=this.pageConfigData
      this.inspectionData.lockData=this.superviseInfoData
      this.bussinessName=res.businessName.split(',')
      console.log('专项检查总数据',this.inspectionData,'专项检查名称：',this.bussinessName)
      

      // this.editSpecialList = res;
    },
    // 保存
    specialSave() {
      Toast.success("已保存");
    },
    // 提交
    specialSubmit() {
      Dialog.confirm({
        title: "提示",
        message: "是否提交检查记录",
      })
        .then(() => {
          // on confirm
          Toast.success("已提交");
          console.log("已提交");
        })
        .catch(() => {
          // on cancel
          console.log("已取消");
        });
    },

    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
};
</script>

<style lang="less" scoped>
.data-card {
  margin-top: 15px;
  position: relative;
  &::before {
    content: "";
    border: 12px solid #199ed8;
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
  height: 66px;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-tabs__nav {
    width: 75vw;
    border-radius: 20px;
    padding: 0;
    overflow-x: auto;
  }
}
.detail-container {
  position: relative;
  background-color: #f8f8f8;
  height: 100%;
  width: 100%;
  .inspection-item {
    display: flex;
    justify-content: center;
    align-items: center;
    .detail-card {
      width: 95vw;
      .footer {
        margin-top: 15px;
      }
    }
  }
}
.inspection-type-title {
  color: #969799;
  font-weight: 600;
}
// /deep/.van-field__body {
//   border: 1px solid #ccc;
//   padding: 0 15px;
//   border-radius: 5px;
// }
.upload {
  margin-top: 10px;
  margin-bottom: 100px;
}
.save-special {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: #fff;
  height: 90px;
  .save-special-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    .save {
      border-radius: 6px;
      width: 160px;
      margin-right: 6px;
    }
    .submit {
      border-radius: 6px;
      margin-left: 6px;
      width: 160px;
    }
  }
}
/deep/.van-uploader__upload {
  background-color: #fff;
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
</style>
