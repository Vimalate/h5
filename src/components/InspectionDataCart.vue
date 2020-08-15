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
        v-model="ite.value"
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
        v-model="ite.value"
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
          <van-radio-group v-model="ite.value" direction="horizontal">
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
        v-model="ite.value"
        :label="ite.cellName"
      />
    </van-form>
  </div>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
</style>