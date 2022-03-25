<template>
  <div class="login-container">
    <div class="login">
      <h1>可视化分工系统</h1>

      <el-form
        :labelPosition="labelPosition"
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone" class="form-item">
          <el-input placeholder="请输入手机号" v-model="ruleForm.phone"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="form-item">
          <el-input placeholder="请输入密码" v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <div class="subBtn">
          <el-button class="el-subBtn" @click="submitForm">登 录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ruleForm as IruleForm } from './config/types'
import rules from './config/rules'
import { ElForm } from 'element-plus'
import useSubmit from './hooks'
const labelPosition = ref<string>('right')
const ruleForm = reactive<IruleForm>({
  phone: '13333333333',
  password: '123456'
})
//获取虚拟dom节点
const ruleFormRef = ref<InstanceType<typeof ElForm>>()
//登录
const submitForm = useSubmit(ruleFormRef, ruleForm)
</script>

<style scoped lang="less">
.login-container {
  .wh();
  background: url('@/assets/img/bg.svg');
  display: flex;
  align-items: center;
  .login {
    margin-left: 60%;
    width: 30%;
    height: 40%;
    background-color: @bgColor;
    border-radius: 40px;
    opacity: 0.8;
    h1 {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      opacity: 0.5;
      font-size: 30px;
      margin-bottom: 80px;
    }
  }
}
.demo-ruleForm {
  .w();

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
}
.form-item {
  width: 60%;
  border: 2px solid #d565fe;
  &:nth-child(1) {
    margin-bottom: 30px;
  }
  &:nth-child(2) {
    margin-bottom: 50px;
  }
}
.subBtn {
  width: 50%;
  .el-subBtn {
    .w();
    font-weight: 600;
    font-size: 16px;
    background-color: #d565fe;
  }
}
</style>
