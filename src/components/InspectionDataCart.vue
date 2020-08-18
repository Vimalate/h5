<template>
  <div>
    <!-- 每个检查项有几个检查项目 -->
    <van-form label-width="105" v-for="(ite, idx) in editData.surfaceConfigItem" :key="idx">
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
      <van-field
        :readonly="ite.isEdit=='0'"
        :required="ite.isEdit=='1'"
        clickable
        colon
        type="textarea"
        autosize
        center
        rows="1"
        v-model="groupData[ite.fieldName]"
        :label="ite.cellName"
        v-if="ite.controlCode==='date'"
      />
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
      groupData: {} //每一组检查项的数据
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
    // console.log(this.editData)
    console.log(this.id, this.group)
    this.getData()
  },
  methods: {
    getData() {
      this.editSpecialList.forEach(item => {
        if (item.bussinessId === this.id) {
          // 找到了那一页数据
          // console.log(item)
          item.superviseInfoThirdList.forEach(ite => {
            if (ite.bussinessId === this.id && ite.groupName === this.group) {
              //  console.log('ite',ite)
              this.groupData = ite
              console.log(this.groupData)
              // return  this.groupData
            } else {
              // console.log('未匹配')
              return { name: '出错了' }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>