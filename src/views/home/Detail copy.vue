<template>
  <div class="detail-container">
    <van-tabs type="card" swipeable background="#3C85F7" title-active-color="#3C85F7" color="#fff">
      <van-tab
        class="inspection-item"
        :title="bussinessNameArr[index]"
        v-for="(item,index) in cardData"
        :key="item.bussinessId"
      >
        <div class="detail-card">
          <!-- header -->
          <div class="header">
            <van-cell-group :border="false">
              <van-field
                label-width="100"
                label="专项检查名称"
                center
                colon
                :value="bussinessNameArr[index]"
                readonly
              />
              <van-field
                label="工程名称"
                colon
                type="textarea"
                autosize
                center
                rows="1"
                :value="infoData.projectName"
                readonly
              />
            </van-cell-group>
            <van-field
              clickable
              name="picker"
              :value="infoData.item1"
              label="检查类型"
              colon
              label-class="inspection-type-title"
            />
          </div>

          <!-- data-cart -->
          <div
            class="data-card"
            v-for="(dataItem,index) in item.businessIdPageConfigData"
            :key="dataItem.groupName"
          >
            <!-- 根据配置数据动态渲染 -->
            <data-card
              :editData="dataItem"
              :id="item.businessId"
              :group="dataItem.groupName"
              :editSpecialList="editSpecialList"
              :signIndex="index"
            ></data-card>
          </div>

          <!-- v-model='dataList[index]' -->
          <!-- footer -->
          <van-cell-group class="footer">
            <van-field label="监督措施：" :value="infoData.item2" readonly />
            <van-field name="radio" label="处理结果：">
              <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">下发整改通知</van-radio>
                  <van-radio name="2">下发局部停工通知</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="检查人：" :value="infoData.itemMonitor" readonly />
            <van-field
              readonly
              clickable
              name="calendar"
              :value="infoData.dateItemRecord"
              label="检查时间："
              placeholder="点击选择日期"
              @click="showCalendar = true"
            />
            <van-calendar v-model="showCalendar" @confirm="confirmDate" />
            <!-- <van-field label="检查时间：" :value="infoData.dateItemRecord" readonly /> -->
            <van-field label="附件" value="PDF" readonly />
          </van-cell-group>
          <!-- 上传 -->
          <van-uploader class="upload" :after-read="afterRead" />
        </div>
      </van-tab>
      <!-- <van-tab title="专项检查2">专项检查 2</van-tab> -->
      <!-- <van-tab title="专项检查3">专项检查 3</van-tab>
      -->
    </van-tabs>
    <!-- 保存或提交 -->
    <div class="save-special" v-if="isEdit">
      <div class="save-special-btn">
        <van-button type="info" native-type="button" @click.prevent="specialSave" class="save">保存</van-button>
        <van-button
          plain
          type="info"
          native-type="submit"
          @click.prevent="specialSubmit"
          class="submit"
        >提交</van-button>
      </div>
    </div>
    <!-- 返回 -->
    <div class="back" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import http from "@/model/specialInspection/http.js";
import dataCard from "@/components/program/businessComponents/specialInspection/InspectionDataCard.vue";
export default {
  data() {
    return {
      editSpecialList: [], //新增编辑列表
      infoData: [],
      checkboxGroup: [],
      // pageConfigData:[],//页面配置数据
      // dateItemRecord:'',
      showCalendar: false,
      id: "",
      editData: {},
      groupData: {}, //每一页数据
      bussinessName: [], //头部专项检查名称
      inspectionData: {}, //专项检查总数据
      cardData: [], //各检查项总数据
      value: "",
      showPicker: false,
      radio: "1",
      bussinessIdArr: [],
      bussinessNameArr: [],
      // isEdit: true, //是否显示提交保存按钮
      superviseInfoItemList: [], //总tab页数据=>二级表数据
      superviseInfoThirdList: [], //单个tab页数据=>三级表数据
    };
  },
  components: {
    dataCard,
  },
  created() {},
  mounted() {
    console.log(this.$route.query.id);
    console.log(this.$route.query.isEdit);

    this.editSpecial();
  },
  computed: {

    isEdit: {
      get() {
        return this.$route.query.isEdit;
      },
      // set(v) {
      //   return v;
      // },
    },
  },
  methods: {
    // 新增时构造配置对应数据
    createData() {
      let tabItemData = {
        //单个tab页
        id: "",
        superviseInfoItemId: "",
        superviseInfoId: "",
        bussinessId: "",
        bussinessName: "",
        groupName: "",
        item1: "1111",
        item2: "",
        item3: "",
        item4: "",
        item5: "",
        item6: "",
        item7: "",
        item8: "",
        item9: "",
        item10: "",
        dateItem1: "2020-8",
        dateItem2: "",
        dateItem3: "",
        radio1: "",
        radio2: "",
        radio3: "",
        checkbox1: "1",
        checkbox2: "",
        checkbox3: "",
        orderId: "",
        fileType: "",
      };

      const data = this.cardData;
      console.log(tabItemData);
      let arrLength = [];

      for (let i = 0; i < data.length; i++) {
        let pageItem = data[i].businessIdPageConfigData;
        arrLength.push(pageItem.length);
        // for(let j=0;j<pageItem.length;j++){
        //   console.log(j)
        //   superviseInfoItemObj.superviseInfoThirdList.push(tabItemData)
      }
      // arr2= arr.map(v=>Array(v).fill({...obj}))
      [2, 7];
      // 构造三级表
      let listData = arrLength.map((v) => Array(v).fill({ ...tabItemData }));
      console.log("listData:", listData);
      // 构造二级表
      let newData = listData.map((item) => {
        let infoItemList = {
          id: "",
          superviseInfoId: this.$route.query.id ? this.$route.query.id : "",
          bussinessId: "",
          bussinessName: "",
          superviseInfoThirdList: [],
        };
        console.log(item);
        infoItemList.superviseInfoThirdList = item;
        console.log("infoItemList", infoItemList);
        return infoItemList;
      });

      for (let i = 0; i < newData.length; i++) {
        newData[i].bussinessId = this.bussinessIdArr[i];
        newData[i].bussinessName = this.bussinessNameArr[i];
        newData[i].superviseInfoId = this.infoData.id ? this.infoData.id : "";
        newData[i].id = this.guid();

        let thirdList = newData[i].superviseInfoThirdList;
        for (let j = 0; j < thirdList.length; j++) {
          // thirdList[j].groupName = `group${j}`;
          thirdList[j].bussinessId = this.bussinessIdArr[i];
          thirdList[j].bussinessName = this.bussinessNameArr[i];
          thirdList[j].superviseInfoItemId = newData[i].id;
          thirdList[j].superviseInfoId = this.infoData.id
            ? this.infoData.id
            : "";
        }
      }

      let basicData = JSON.parse(JSON.stringify(newData)); //新增表单而造的基本数据结构，即对应编辑时的二级表数据
      basicData.forEach((item) => {
        item.superviseInfoThirdList.forEach((ite, i) => {
          ite.id = this.guid();
          ite.groupName = `group${i + 1}`;
        });
      });
      this.superviseInfoItemList = basicData;
      console.log("basicData", JSON.parse(JSON.stringify(basicData)));
      console.log(
        "superviseInfoItemList",
        JSON.parse(JSON.stringify(this.superviseInfoItemList))
      );
    },
    // 生成唯一id
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
        c
      ) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },

    async save() {
      let params = JSON.parse(JSON.stringify(this.infoData));
      console.log("params", params);
      // http://192.169.0.213:9999/monitorBusiness/specialInspection/saveSpecialInspection
      const res = await http.post(
        "/api/saveSpecialInspection",
        params
      );
      console.log("save", res, "params", this.infoData);
    },
    // 新增编辑
    async editSpecial() {
      this.$store.state.specialInspection.editPramas.forEach((item) => {
        this.bussinessIdArr.push(item.id);
        this.bussinessNameArr.push(item.specialInspectionName);
      });
      console.log(
        this.bussinessIdArr.join(","),
        this.bussinessNameArr.join(",")
      );
      let payload = {
        // bussinessId:
        //   "f05df0d0d7d911ea814900ff7beea89a,fcea7ad2d7c711ea814900ff7beea89a",
        // bussinessName: "在建工程项目现场检查情况表,现场作业人员抽查",
        // currentBussinessId: "f05df0d0d7d911ea814900ff7beea89a",
        // // id: "533f3139db8311ea824d00ff7beea89a",Z
        // id: "533f3139db8311ea824d00ff7beea89a",
        // projectId: "E46D1EA9-651A-E954-BF10-21E6EB496061",
        // userId: "",
        bussinessId: this.bussinessIdArr.join(","),
        bussinessName: this.bussinessNameArr.join(","),
        currentBussinessId: this.bussinessIdArr[0],
        // id: "533f3139db8311ea824d00ff7beea89a",
        id: this.$route.query.id ? this.$route.query.id : "",
        // projectId: "E46D1EA9-651A-E954-BF10-21E6EB496061",
        projectId: "",
        userId: "",
      };
      // http://192.169.0.213:9999/monitorBusiness/specialInspection/editSpecialInspection
      const { data: res } = await http.post(
        "/api/editSpecialInspection",
        payload
      );
      console.log(res);
      this.infoData = res.superviseInfoData; //头尾部固定数据

      this.inspectionData.pageConfigData = res.pageConfigData; //页面配置项数据
      this.inspectionData.lockData = this.infoData;
      // this.bussinessName=res.businessName.split(',')

      // this.editSpecialList.forEach((item) => {
      //   // let dataList = item.superviseInfoThirdList;
      //   // 给 pageConfigData 添加businessId 对应的 bussinessName属性
      //   this.inspectionData.pageConfigData.forEach((ite) => {
      //     // let configData = ite.businessIdPageConfigData;
      //     if (ite.businessId === item.bussinessId) {
      //       ite.bussinessName = item.bussinessName;

      //     }

      //     let arr1 = [
      //       {
      //         groupName: "group1",
      //         surfaceConfigItem: [
      //           { fieldName: "item1" },
      //           { fieldName: "item2" },
      //         ],
      //       },
      //       {
      //         groupName: "group2",
      //         surfaceConfigItem: [
      //           { fieldName: "item1" },
      //           { fieldName: "item2" },
      //         ],
      //       },
      //       {
      //         groupName: "group3",
      //         surfaceConfigItem: [
      //           { fieldName: "item1" },
      //           { fieldName: "item2" },
      //         ],
      //       },
      //     ];
      //     let arr2 = [
      //       {
      //         groupName: "group1",
      //         item1: "value123",
      //         item2: "value2",
      //       },
      //       {
      //         groupName: "group2",
      //         item1: "value1",
      //         item2: "value78",
      //       },
      //       {
      //         groupName: "group3",
      //         item1: "value1",
      //         item2: "value5",
      //       },
      //     ];
      //     // console.log(arr1,arr2)
      //     for (let i = 0; i < arr2.length; i++) {
      //       let tmp2 = arr2[i];
      //       for (let j = 0; j < arr1.length; j++) {
      //         let tmp1 = arr1[j];
      //         if (tmp2.groupName == tmp1.groupName) {
      //           for (let k = 0; k < tmp1.surfaceConfigItem.length; k++) {
      //             let tmp3 = tmp1.surfaceConfigItem[k];
      //             if (tmp2[tmp3.fieldName]) {
      //               tmp3.value = tmp2[tmp3.fieldName];
      //             }
      //           }
      //         }
      //       }
      //     }
      //   });
      //   return this.inspectionData.pageConfigData;
      // });
      this.cardData = JSON.parse(
        JSON.stringify(this.inspectionData.pageConfigData)
      );
      this.createData();
      this.editSpecialList = this.infoData.superviseInfoItemList
        ? this.infoData.superviseInfoItemList
        : this.superviseInfoItemList; //页面具体总数据

      console.log("editSpecialList", this.editSpecialList);
      console.log(
        "专项检查总数据",
        this.inspectionData,
        "cardData",
        this.cardData
      );
    },
    // 保存
    specialSave() {
      this.save();
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
          this.save();
          Toast.success("已提交");
          console.log("已提交");
        })
        .catch(() => {
          // on cancel
          console.log("已取消");
        });
    },
    confirmDate(date) {
      this.infoData.dateItemRecord = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
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
