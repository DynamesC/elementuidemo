<template>
    <div class="login_container">
      <div class="login_box">
        <div class="avatar_box">
          <img src="../assets/logo.png" alt="">
        </div>
        <el-form label-width="0px" :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="login_form">
          <el-form-item  prop="username">
            <el-input v-model="loginForm.username"  prefix-icon="el-icon-message"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">Login</el-button>
            <el-button type="info" @click="resetLoginForm">reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: 'username should not be null', trigger: 'blur' },
          { min: 3, max: 10, message: 'username needs to fit 3 to 5 characters', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'password please', trigger: 'blur' },
          { min: 3, max: 10, message: 'password needs to fit 3 to 5 characters', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      // this.loginForm.username = ''
      // this.loginForm.password = ''
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: result } = await this.$http.post('login', this.loginForm)
        if (result.meta.status !== 200) return this.$message.error('login failed')
        this.$message.success('successfully login')
        console.log(result)
        //  how to redirect to main page with token stored
        window.sessionStorage.setItem('token', result.data.token)
        this.$router.push('home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
  margin: 0;
  padding: 0;
}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box{
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
}
</style>
