<template>
  <div class="data-card-container">
    <div class="data-card">
      <van-form
        label-width="105"
        v-for="(ite,idx) in editData.surfaceConfigItem"
        :key="idx+ite.surfaceConfigId"
        ref='form'
      >
        <div class="van-hairline--bottom">
          <van-field
            :readonly="ite.isEdit=='0'"
            clickable
            colon
            type="textarea"
            autosize
            center
            rows="1"
            :required="ite.isEdit==='1'"
            v-model.trim="groupData[ite.fieldName]"
            :label="ite.cellName"
            v-if="ite.controlCode==='textarea'"
            class="van-hairline--bottom"
            :rules="ite.isEdit==='1'?[{ required: true, message: `请填写${ite.cellName}` }]:[]"
          />
        </div>
        <div class="van-hairline--bottom">
          <van-field
            :readonly="ite.isEdit=='0'"
            colon
            type="textarea"
            autosize
            center
            rows="1"
            :required="ite.isEdit==='1'"
            v-model.trim="groupData[ite.fieldName]"
            :label="ite.cellName"
            v-if="ite.controlCode==='input'"
            :rules="ite.isEdit==='1'?[{ required: true, message: `请填写${ite.cellName}` }]:[]"
          />
        </div>
        <div class="van-hairline--bottom">
          <van-field
            :readonly="ite.isEdit=='0'"
            colon
            :required="ite.isEdit==='1'"
            v-if="ite.controlCode==='number'"
            clickable
            type="number"
            v-model.trim="groupData[ite.fieldName]"
            :label="ite.cellName"
            :rules="ite.isEdit==='1'?[{ required: true, message: `请填写${ite.cellName}` }]:[]"
          />
        </div>
        <!-- <div class="van-hairline--bottom">
          <van-field
            :readonly="ite.isEdit!=='1'"
            :required="ite.isEdit==='1'"
            colon
            v-if="ite.controlCode==='date'"
            clickable
            v-model="groupData[ite.fieldName]"
            :label="ite.cellName"
          />
        </div>-->
        <div class="van-hairline--bottom"  v-if="ite.controlCode==='date'">
          <van-field
            :readonly="ite.isEdit!=='1'"
            :required="ite.isEdit==='1'"
            colon
            clickable
            name="calendar"
            :value="groupData[ite.fieldName]"
            :label="ite.cellName"
            placeholder="点击选择日期"
            @click="isshowCalendar(groupData[ite.fieldName])"
          />
          <van-calendar
            v-model="showCalendar"
            @confirm="confirmDate"
            @closed ='selectDate(groupData[ite.fieldName])'
          />
        </div>

        <div class="van-hairline--bottom">
          <van-field
            colon
            v-if="ite.controlCode=='radio'"
            name="checkboxGroup"
            :label="ite.cellName"
            :required="ite.isEdit==='1'"
          >
            <template #input>
              <van-radio-group v-model="groupData[ite.fieldName]" direction="horizontal">
                <van-radio :name="1" shape="square">是</van-radio>
                <van-radio :name="0" shape="square">否</van-radio>
              </van-radio-group>
            </template>
          </van-field>
        </div>
        <div class="van-hairline--bottom">
          <van-field
            name="checkbox"
            colon
            v-if="ite.controlCode=='checkbox'"
            :label="ite.cellName"
            :required="ite.isEdit==='1'"
          >
            <template #input>
              <van-checkbox v-model="groupData[ite.fieldName]" shape="square" />
            </template>
          </van-field>
        </div>
      </van-form>

      <div class="projectNum">{{signIndex+1}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InspectionDataCard",
  props: {
    signIndex: {
      type: Number,
    },
    editData: {
      type: Object,
      default: () => ({}),
    },
    editSpecialList: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      groupData: {}, //每一组检查项的数据
      showCalendar: false,
      value: "",
    };
  },
  // watch: {
  //   groupData: {
  //     immediate: true,
  //     handler(val) {
  //       console.log(val)
  //     }
  //   }
  // },
  created(){
  },
  mounted() {
    // console.log(this.groupData)
    // console.log(this.editData)
    // console.log(this.id, this.group);
    // console.log(this.$refs.form)

    this.getData();
  },
  methods: {
    getData() {
      // console.log(this.editSpecialList);
      this.editSpecialList.forEach((item) => {
        if (item.bussinessId === this.id) {
          // 找到了那一页数据
          // console.log(item);
          // console.log(' 找到了那一页数据')
          item.superviseInfoThirdList.forEach((ite) => {
            if (ite.bussinessId === this.id && ite.groupName === this.group) {
              // console.log(this.group);
              //  console.log('ite',ite)
              this.groupData = ite;
              // console.log(this.groupData);
              // return  this.groupData
            } else {
              // console.log('未匹配')
              // return { name: "出错了" };
            }
          });
        }
      });
    },
    isshowCalendar(value) {
      this.showCalendar = true;
      this.value = value;
    },
    confirmDate(date) {
      // let dateValue = this.isshowCalendar();
      console.log(date)
      this.value = `${date.getMonth() + 1}/${date.getDate()}`;
      this.$emit('input',`${date.getMonth() + 1}/${date.getDate()}`)
      this.showCalendar = false;
    },
    selectDate(date){
      // this.date=
      console.log(date)
    },
    
  },
};
</script>
<style lang="less" scoped>
.data-card {
  margin-top: 15px;
  position: relative;
  font-size: 16px;
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
</style>