<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="rules" status-icon>
    <img src="../assets/avatar.jpg" alt />
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登陆</el-button>
      <el-button class="reset" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      form: {
        // admin
        // 123456
        username: '',
        password: ''
      },
      // 校验表单信息
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    // 表单登陆
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          const { meta, data } = res.data
          if (meta.status === 200) {
            // 储存token到本地存储
            localStorage.setItem('token', data.token)
            // 跳转页面
            this.$router.push('home')
          } else {
            // 提示错信息
            this.$message.error(meta.msg)
          }
        })
      })
    },
    // 表单重置
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="less">
body {
  background: #2d434c;

  .el-form {
    width: 400px;
    padding: 75px 40px 15px;
    margin: 200px auto;
    border-radius: 20px;
    background: #fff;
    position: relative;

    img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      border: 10px solid #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      box-sizing: border-box;
    }

    .reset {
      margin-left: 70px;
    }
  }
}
</style>
