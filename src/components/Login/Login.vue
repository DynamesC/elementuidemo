<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/logo.png" alt="">
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
          <el-button type="info" @click="resetLoginForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import router from "@/router";

const axios = require('axios').default;

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: 'username should not be null', trigger: 'blur' },
        ],
        password: [
          { required: true, message: 'password please', trigger: 'blur' },
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.$refs.loginFormRef.resetFields()
    },

    loginFailed(){
      // this.$message.error('登录错误:用户名与密码错误!');
      console.log('登录错误')
      this.$message({
        message: '账号密码错误！',
        type: 'error'
      });
    },

    loginSucceeded(response){
      window.sessionStorage.setItem('myToken', response.data.body.token)
      window.sessionStorage.setItem('userName', this.loginForm.username)
      this.$message({
        message: '登陆成功！',
        type: 'success'
      });
      console.log(window.sessionStorage.getItem('myToken'));
      router.push('/home')
    },

    login () {
      this.$refs.loginFormRef.validate(valid => {
        console.log('login pressed')
        if (!valid) return

        var data_for_login = {username : this.loginForm.username, password:this.loginForm.password}

        // const sendPostRequest = async () => {
        //   try {
        //     const resp = await axios.post('V1/Login', data_for_login);
        //     console.log(resp.data);
        //   } catch (err) {
        //     // Handle Error Here
        //     console.error(err.response);
        //   }
        // };
        //
        // sendPostRequest();

        let self = this;

        axios.post('V1/Login', data_for_login)
            .then(function (response) {
              console.log(response.data.body.token);
              self.loginSucceeded(response)
            })
            .catch(function (error) {
              console.log(error.response);
              self.loginFailed();
            });

        // const { data: result } = await this.$http.post('http://esl.ylwlesl.com:9191/V1/Login', this.loginForm)
        // console.log(result.meta.status)
        // if (result.meta.status !== 200) return this.$message.error('login failed')
        // this.$message.success('successfully login')
        // //  how to redirect to main page with token stored
        // window.sessionStorage.setItem('token', result.data.token)
        // this.$router.push('home')
      })
    }

  }
}
</script>

<style scoped>
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
  transform: translate(-50%, -50%);}

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
    background-color: #fff;}
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }

  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

</style>
