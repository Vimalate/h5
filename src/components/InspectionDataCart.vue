<template>
  <div>
    <!-- 每个检查项有几个检查项目 -->
    <van-form label-width="105" v-for="(ite, idx) in editData.surfaceConfigItem" ref="form" :key="idx">
      <van-field
        :readonly="ite.isEdit=='0'"
        clickable
        colon
        type="textarea"
        autosize
        center
        rows="1"
        name="picker"
        v-model="groupData[ite.fieldName]"
        :label="ite.cellName"
        :required="ite.isEdit=='1'"
        v-if="ite.controlCode==='input'"
      />
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
      <van-field
        :required="ite.isEdit=='1'"
        colon
        v-if="ite.controlCode=='radio'"
        name="checkboxGroup"
        :label="ite.cellName"
      >
        <template #input>
          <van-radio-group v-model="groupData[ite.fieldName]" direction="horizontal">
            <van-radio :name="1" shape="square">是</van-radio>
            <van-radio :name="0" shape="square">否</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        :required="ite.isEdit=='1'"
        readonly
        colon
        v-if="ite.controlCode=='number'"
        clickable
        v-model="groupData[ite.fieldName]"
        :label="ite.cellName"
      />
    </van-form>
  </div>
</template>

<script>
export default {
  name: 'InspectionDataCard',
  props: {
    editData: {
      type: Object,
      default: () => ({})
    },
    editSpecialList: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    group: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      groupData: {} ,//每一组检查项的数据
      showCalendar: false,
    }
  },
  // watch: {
  //   groupData: {
  //     immediate: true,
  //     handler(val) {
  //       console.log(val)
  //     }
  //   }
  // },
  mounted() {
    // console.log(this.groupData)
    console.log('editData',this.editData)
    // console.log(this.id, this.group)
    this.hasDefaultValue()
    this.getData()
    // this.$refs.form.validate(valid=>{
    //   if(valid){
    //     alert('ok')
    //   }
    // })
    // this.$refs.form.validateAll()
    // console.log(this.$refs.form.validate())
  },
  methods: {
    hasDefaultValue(){
      this.editData.surfaceConfigItem.forEach(ele=>{
        if(ele.defaultValue){
          console.log(ele.defaultValue)
        }
      })
    },
    isValidate(){
      console.log('ok')
      //  this.$refs.form.validate().then(e=>{
      //    console.log(e)
      //  })
    },
    getData() {
      this.editSpecialList.forEach(item => {
        if (item.bussinessId === this.id) {
          // 找到了那一页数据
          // console.log(item)
          item.superviseInfoThirdList.forEach(ite => {
            if (ite.bussinessId === this.id && ite.groupName === this.group) {
              //  console.log('ite',ite)
              this.groupData = ite
              //  console.log(ite.defaultValue)
              // if(ite.defaultValue){
              //   console.log(ite.defaultValue)
              //   this.groupData[ite.fieldName]=ite.defaultValue
              // }
              // console.log(this.groupData)
              // return  this.groupData
            } else {
              // console.log('未匹配')
              return { name: '出错了' }
            }
          })
        }
      })
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
  }
}
</script>

<style lang="scss" scoped>
</style>