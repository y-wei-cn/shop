<template>
  <el-row
    type='flex'
    justify='center'
    align='middle'
  >
    <el-col :span='8'>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="success"
            @click='startLogin'
          >登入</el-button>
          <el-button @click='resetlogin'>重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 13, message: '长度在 6 到 13 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    startLogin () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) {
          return this.$message({
            showClose: true,
            message: '登入失败',
            type: 'error'
          })
        }
        // console.log('验证成功了，开始登入')

        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            // 提示
            this.$message({
              showClose: true,
              message: '登入成功',
              type: 'success'
            })
            // 把token 保存到本地地址，用于判断是否登入过
            localStorage.setItem('token', res.data.data.token)
            // 判断登入成功后 进入home页面（编程式导航）
            this.$router.push('/home')
          } else {
            this.$message({
              showClose: true,
              message: '登入失败',
              type: 'error'
            })
          }
          // console.log(res.data.data.token)
        })
      })
    },
    resetlogin () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 15px;
}
</style>
