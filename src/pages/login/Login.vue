<template>
  <div class="login bg-fff">
    <div class="set white bb-e6e6e6">
      <div class="set-on fc-000 bg-fff">登录</div>
    </div>
    <div class="wx-login">
      <div class="top-logo">
        <img src="../../../static/images/wx-logo.png">
      </div>
      <div class="input-con">
        <div class="loing-tab">
          <ul>
            <li v-for="item in tab" class="text-center fc-00a84c">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="phone fc-e6e6e6 bb-e6e6e6">
          <input type="tel" placeholder="请输入手机号" class="input-style" v-model="form.phone">
        </div>
        <div class="phone fc-e6e6e6 bb-e6e6e6">
          <input type="password" placeholder="请输入密码" class="input-style" v-model="form.password">
        </div>
        <div class="forget">
          <router-link class="fc-00a84c" :to="{name:'forget-password'}"> 忘记密码？</router-link>
        </div>
      </div>
    </div>
    <div class="but one bg-00a84c fc-fff" @click="submit">登录</div>
    <div @click="$router.push({name:'register'})" class="but two bd-00a84c fc-00a84c">注册</div>
  </div>
</template>

<script>
  import {showAlert, isWeChat} from '../../config/functions'
  export default {
    name: 'Login',
    components: {},
    data(){
      return {
        form: {
          phone: '',
          password: '',
        },
        tab: ['账号登录'],
        sendSmsTime: 0,
        sendSmsInterval: false
      }
    },
    methods: {
      submit() {
        if (this.verification()) {
          this.passWordLogin();
        }
      },
      passWordLogin() {
        this.$httpPost('login/index', {
          cellphone: this.form.phone,
          password: this.form.password,
          type: isWeChat ? 25 : 20
        }).then(({data}) => {
          this.$store.dispatch('userSignIn', data);
          showAlert('登陆成功！', 'success');
          let redirectName = this.$store.getters.loginRedirect;
          if (!redirectName) {
            redirectName = 'home';
          }
          this.$router.replace({path: redirectName});
        }).catch((error) => {
          console.log(error);
        })
      },
      // 表单验证
      verification() {
        if (!this.form.phone) {
          showAlert('手机号不能为空', 'warning');
          return false;
        }
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.phone)) {
          showAlert('手机格式不正确', 'warning');
          return false;
        }
        if (!this.form.password) {
          showAlert('密码不能为空', 'warning');
          return false;
        }
        return true;
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl"
  .login
    width 100%
    padding-bottom px2rem(250px)
    .set
      width 100%
      position: fixed
      top: 0
      height px2rem(88px)
      line-height px2rem(88px)
      z-index 100
      .set-on
        text-align center
        font-size $f36

    .wx-login
      margin-top px2rem(89px)
      .top-logo
        width px2rem(458px)
        margin 0 auto px2rem(100px)
        text-align center
        padding-top px2rem(100px)
        img
          width px2rem(458px)
          height px2rem(136px)
      .input-con
        width px2rem(604px)
        border-radius px2rem(10px)
        box-shadow 0 0 px2rem(20px) rgba(0, 135, 61, 0.4);
        margin 0 auto
        padding px2rem(30px) 0
        .loing-tab
          position relative
          width 70%
          margin 0 auto px2rem(50px)
          ul
            display table
            width 100%
            li
              height px2rem(50px)
              line-height px2rem(50px)
              font-size $f32
              margin auto
              width 100%
        .phone
          border-bottom 1px solid
          margin: 0 px2rem(55px) px2rem(20px) px2rem(55px)
          .input-style
            line-height px2rem(60px)
            font-size $f28
            color #999
            width 100%
            /* WebKit browsers */
            &::-webkit-input-placeholder
              color $fc-ccc
            /* Mozilla Firefox 4 to 18 */
            &:-moz-placeholder
              color $fc-ccc
            /* Mozilla Firefox 19+ */
            &::-moz-placeholder
              color $fc-ccc
            /* Internet Explorer 10+ */
            &:-ms-input-placeholder
              color $fc-ccc
        .forget
          text-align right
          width 100%
          a
            font-size $f24
            display inline-block
            height px2rem(24px)
            line-height px2rem(24px)
            padding-right px2rem(55px)
    .but
      text-align center
      height px2rem(88px)
      width px2rem(502px)
      border-radius px2rem(55px)
      line-height px2rem(88px)
      margin px2rem(95px) auto
    .one
      margin-bottom 0
    .two
      border 1px solid
      margin-top px2rem(50px)
</style>
