<template>
  <div class="detail-container">
    <van-tabs type="card" swipeable background="#3C85F7" title-active-color="#3C85F7" color="#fff">
      <van-tab
        class="inspection-item"
        :title="item.bussinessName"
        v-for="(item) in cartData"
        :key="item.businessId"
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
              <van-field label="工程名称：" :value="inData.monitorName" readonly />
            </van-cell-group>
            <van-field
              clickable
              name="picker"
              :value="inData.item1"
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
          <!-- <div>{{item.businessId}}</div> -->
          <!-- data-cart -->
          <!-- 每页有几个检查项 group => superviseInfoThirdList（包含具体检查项目）-->
          <div
            class="data-card"
            v-for="(dataItem, index) in item.businessIdPageConfigData"
            :key="dataItem.id"
          >
            <!-- 根据配置数据动态渲染 -->
            <!-- getGroupData(item.businessId,dataItem.groupName)" -->
            <!-- :groupData="getGroupData('f05df0d0d7d911ea814900ff7beea89a','group1')" -->
            <data-list
              :editSpecialList="editSpecialList"
              :editData="dataItem"
              :id="item.businessId"
              :group="dataItem.groupName"
              ref="dataCart"
            ></data-list>
            <div class="projectNum">{{ index + 1 }}</div>
          </div>

          <!-- footer -->
          <van-cell-group class="footer">
            <van-field label="监督措施：" :value="inData.item2" readonly />
            <van-field name="radio" label="处理结果：">
              <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">下发整改通知</van-radio>
                  <van-radio name="2">下发局部停工通知</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="检查人：" :value="inData.itemMonitor" readonly />
            <van-field label="检查时间：" :value="inData.dateItemRecord.split(' ')[0]" readonly />
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
      -->
    </van-tabs>
    <!-- 返回 -->
    <div class="back" @click="$router.go(-1)">
      <van-icon name="arrow-left" />
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import http from '@/utils/http.js'
import DataList from '@/components/InspectionDataCart.vue'
export default {
  data() {
    return {
      editSpecialList: [], // 新增编辑列表
      inData: [],
      checkboxGroup: [],
      // pageConfigData:[],//页面配置数据
      id: '',
      group: '',
      bussinessName: [], // 头部专项检查名称
      inspectionData: {}, // 专项检查总数据
      cartData: [],
      editData: {},
      groupData: {}, //每一页数据
      value: '',
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      radio: '1',
      superviseInfoData:{},//新增造的总数据
      superviseInfoItemList:[],//新增造的二级表
      superviseInfoThirdList:[]//新增造的三级表
    }
  },
  components: {
    DataList
  },
  // item.businessId===editSpecialList[index].businessId?editSpecialList[index].superviseInfoThirdList:[]
  computed: {},
  mounted() {
    this.editSpecial()
  },
  methods: {

    createData() {
      let itemData = {
        superviseInfoId: '533f3139db8311ea824d00ff7beea89a',
        superviseInfoItemId: '1855fea3db8c11ea824d00ff7beea89a',
        bussinessId: 'f05df0d0d7d911ea814900ff7beea89a',
        bussinessName: '在建工程项目现场检查情况表',
        groupName: 'group1',
        item1: '施工现场门禁设施',
        item2: '1',
        item3: '施工现场配备门禁设施，得1分，否则不得分。',
        item4: '1'
      }
      let arrLength=[]
      this.cartData.forEach(item=>{
       arrLength.push(item.businessIdPageConfigData.length )
      })
      console.log(arrLength)
     let listData=arrLength.map(v=>Array(v).fill(itemData))
      console.log('listData',listData)
      
     let data= listData.map(item=>{
       let infoItemList={
         "superviseInfoId": "533f3139db8311ea824d00ff7beea89a",
          "bussinessId": "f05df0d0d7d911ea814900ff7beea89a",
          "bussinessName": "在建工程项目现场检查情况表",
          "superviseInfoThirdList":[]
      }
       console.log(item)
        infoItemList.superviseInfoThirdList=item
        console.log('infoItemList',infoItemList)
        return infoItemList
      })
      console.log('data',data)
    },
    getIte() {
      // return 1
      console.log('ok', this.getGroupData('f05df0d0d7d911ea814900ff7beea89a', 'group1'))
    },
    randomString(e) {
      //形参e,需要产生随机字符串的长度
      //如果没有传参，默认生成32位长度随机字符串
      e = e || 32
      //模拟随机字符串库
      var t = 'abcdefhijkmnprstwxyz2345678',
        a = t.length, //字符串t的长度，随机数生成最大值
        n = ''
      for (let i = 0; i < e; i++) {
        //随机生成长度为e的随机字符串拼接
        n += t.charAt(Math.floor(Math.random() * a))
      }
      //返回随机组合字符串
      return n
    },
    getId() {
      this.editSpecialList.forEach(item => {
        item.id = this.randomString()
        item.superviseInfoThirdList.forEach(ite => {
          ite.id = this.randomString()
          console.log(ite.id)
        })
      })
    },
    // 新增编辑
    async editSpecial() {
      let payload = {
        bussinessId: 'f05df0d0d7d911ea814900ff7beea89a,fcea7ad2d7c711ea814900ff7beea89a',
        bussinessName: '在建工程项目现场检查情况表,现场作业人员抽查',
        currentBussinessId: 'f05df0d0d7d911ea814900ff7beea89a',
        id: '1',
        projectId: 'E46D1EA9-651A-E954-BF10-21E6EB496061',
        userId: '1'
      }
      const { data: res } = await http.post('/editInspection', payload)
      console.log(res)
      this.inData = res.superviseInfoData //头尾部固定数据
      this.editSpecialList = this.inData.superviseInfoItemList //页面具体总数据

      this.inspectionData.pageConfigData = res.pageConfigData // 页面配置项数据
      this.inspectionData.lockData = this.inData
      // this.bussinessName=res.businessName.split(',')
      this.getId()
      this.editSpecialList.forEach(item => {
        const dataList = item.superviseInfoThirdList

        // 给 pageConfigData 添加businessId 对应的 bussinessName属性
        this.inspectionData.pageConfigData.forEach(ite => {
          const configData = ite.businessIdPageConfigData
          if (ite.businessId === item.bussinessId) {
            ite.bussinessName = item.bussinessName
            // console.log(configData)
            // dataList.forEach(dataItem => {
            //   configData.forEach(configItem => {
            //     // console.log(configItem)
            //     // console.log(dataItem)
            //     if (dataItem.groupName === configItem.groupName) {
            //       configItem.surfaceConfigItem.forEach(cellItem => {
            //         if (dataItem[cellItem.fieldName] !== undefined) {
            //           // return groupData=dataItem
            //           cellItem.value = dataItem[cellItem.fieldName]
            //         }
            //       })
            //     }
            //   })
            // })
          }

          const arr1 = [
            {
              groupName: 'group1',
              surfaceConfigItem: [{ fieldName: 'item1' }, { fieldName: 'item2' }]
            },
            {
              groupName: 'group2',
              surfaceConfigItem: [{ fieldName: 'item1' }, { fieldName: 'item2' }]
            },
            {
              groupName: 'group3',
              surfaceConfigItem: [{ fieldName: 'item1' }, { fieldName: 'item2' }]
            }
          ]
          const arr2 = [
            {
              groupName: 'group1',
              item1: 'value123',
              item2: 'value2'
            },
            {
              groupName: 'group2',
              item1: 'value1',
              item2: 'value78'
            },
            {
              groupName: 'group3',
              item1: 'value1',
              item2: 'value5'
            }
          ]
          // console.log(arr1,arr2)
          for (let i = 0; i < arr2.length; i++) {
            const tmp2 = arr2[i]
            for (let j = 0; j < arr1.length; j++) {
              const tmp1 = arr1[j]
              if (tmp2.groupName == tmp1.groupName) {
                for (let k = 0; k < tmp1.surfaceConfigItem.length; k++) {
                  const tmp3 = tmp1.surfaceConfigItem[k]
                  if (tmp2[tmp3.fieldName]) {
                    tmp3.value = tmp2[tmp3.fieldName]
                  }
                }
              }
            }
          }
        })
        return this.inspectionData.pageConfigData
      })
      this.cartData = JSON.parse(JSON.stringify(this.inspectionData.pageConfigData))
      this.createData()
      console.log(this.editSpecialList, this.inspectionData.pageConfigData)
      console.log('专项检查总数据', this.inspectionData, 'cartData', this.cartData)
    },
    // 保存
    specialSave() {
      console.log(this.$refs.dataCart)
      this.$refs.dataCart.isValidate()
      Toast.success('已保存')
    },
    // 提交
    specialSubmit() {
      Dialog.confirm({
        title: '提示',
        message: '是否提交检查记录'
      })
        .then(() => {
          // on confirm
          Toast.success('已提交')
          console.log('已提交')
        })
        .catch(() => {
          // on cancel
          console.log('已取消')
        })
    },
    tabData(item, index) {
      if (item.businessId === this.editSpecialList[index].businessId) {
        console.log('ok', this.editSpecialList[index].superviseInfoThirdList)
        return this.editSpecialList[index].superviseInfoThirdList
      }
    },

    onConfirm(value) {
      this.value = value
      this.showPicker = false
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-card {
  margin-top: 15px;
  position: relative;
  &::before {
    content: '';
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
