<template>
  <div class="login-container">
    <el-form class="login-form" :rules="rules" :model="loginForm">
      <div class="title-container">
        <img class="Verificationcode" src="@/assets/commout/logo.595745bd.png" alt="">
      </div>
      <el-form-item prop="loginName">
        <span class="svg-container el-icon-mobile-phone" />
        <el-input
          v-model="loginForm.loginName"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="passwordtype"
        />
        <span class="show-pwd">
          <svg-icon :icon-class="passwordtype === 'password' ? 'eye' : 'eye-open'" @click="iconShow" />
        </span>
      </el-form-item>
      <el-form-item prop="Verificationcode">
        <span
          class="svg-container el-icon-circle-check
"
        />
        <el-input
          v-model="loginForm.Verificationcode"
          class="elinput"
        />
        <span class="show-Verificationcode" @click="getLoginimg">
          <img :src="staticMap" alt="">
        </span>
      </el-form-item>

      <el-button class="elbutton" @click="getlogin">登录</el-button>

    </el-form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

import { Loginimg } from '@/api/login'
// import { validphone } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    // const phonevali = (rel, value, callback) => {
    //   if (!validphone(value)) {
    //     callback(new Error('格式不正确'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        Verificationcode: ''
      },

      rules: {
        loginName: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
          // { validator: phonevali, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 16, message: '格式不正确', trigger: 'blur' }
        ],
        Verificationcode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      passwordtype: 'password',
      staticMap: '',
      token: ''
    }
  },
  created() {
    const id = uuidv4()
    const a = id.split('-').join('')
    console.log(a)
    this.token = a
    Loginimg(a).then(d => {
      console.log(d)
      if (d.data) { // 如果返回的有值，则使用返回的底图
        // 先将二进制的流转为blob，注意后面type一定要设置为图片格式
        const blob = new Blob([d.data], { type: 'image/jpeg' })
        var Fr = new FileReader()
        Fr.readAsDataURL(blob)
        Fr.onload = (event) => {
          // 这个就是转换为的base64图片地址
          this.staticMap = event.target.result
        }
      }
    })
    // Loginimg(id).then(res => {
    //   console.log(res)
    // })
  },

  methods: {
    iconShow() {
      this.passwordtype === 'password' ? this.passwordtype = '' : this.passwordtype = 'password'
    },
    getlogin() {
      // console.log(1)
      // const { data } = await Login({ loginName: this.loginForm.loginName, password: this.loginForm.password, code: this.Verificationcode, clientToken: this.token, loginType: 0 })
      // console.log(data)
      this.$store.dispatch('user/loginActions', {
        loginName: this.loginForm.loginName,
        password: this.loginForm.password,
        code: this.loginForm.Verificationcode,
        clientToken: this.token,
        loginType: 0
      })
    },
    getLoginimg() {
      const id = uuidv4()
      const a = id.split('-').join('')
      console.log(a)
      this.token = a
      Loginimg(a).then(d => {
        console.log(d)
        if (d.data) { // 如果返回的有值，则使用返回的底图
        // 先将二进制的流转为blob，注意后面type一定要设置为图片格式
          const blob = new Blob([d.data], { type: 'image/jpeg' })
          var Fr = new FileReader()
          Fr.readAsDataURL(blob)
          Fr.onload = (event) => {
          // 这个就是转换为的base64图片地址
            this.staticMap = event.target.result
          }
        }
      })
    }

    //
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      border: none;
      color:#889aa4;
    }
  }

  .el-form-item__content {
    line-height: 49px;
    position: relative;
    font-size: 14px;
    border: 1px solid #889aa4;
    border-radius:5px ;
}
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  background: url('~@/assets/commout/background.be4fae7d.png');
  background-size:cover ;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    height: 388px;
    max-width: 100%;
    padding: 70px 35px 0;
    margin: 0 auto;
    // overflow: hidden;
    background-color: #fff;
    margin-top: 100px;
    border-radius:10px ;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    size: 30px;
  }

  .title-container {
    // position: relative;
    img{
      width: 96px;
      position: absolute;
      top: -40px;
      left: 210px;
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .elbutton{
    width:100%;
    height:52px;
    margin-bottom:30px;
    background-color: #4c67e6;
    border-radius:10px ;

  }
}
.bottominput{
  .elinput{
  width: 200px;
}
}
.show-Verificationcode{
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
