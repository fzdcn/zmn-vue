<template>
  <div class="login">
    <div class="set">
      <div class="set-on">登录</div>
    </div>
    <div class="wx-login">
      <div class="top-logo">
        <img src="../../../static/images/wx-logo.png">
      </div>
      <div class="input-con">
        <div class="loing-tab">
          <ul>
            <li @click="currentIndex = index;" v-for="(item,index) in tab"
                :class="[{'fr': index == 1},{'selected-color': index == currentIndex},{'cancel-color': index != currentIndex}]"
                style="margin: auto;width: 100%;text-align: center;">
              {{ item }}
            </li>
          </ul>
        </div>
        <template v-if="currentIndex == 0">
          <div class="phone">
            <input type="tel" placeholder="请输入手机号" class="input-style" v-model="form.phone">
          </div>
          <div class="phone">
            <input type="password" placeholder="请输入密码" class="input-style" v-model="form.password">
          </div>
          <div class="forget"><a href="forget-password.html"> 忘记密码？</a></div>
        </template>
        <template v-else>
          <div class="phone">
            <input type="tel" placeholder="请输入手机号" class="input-style" v-model="form.phone">
          </div>
          <div class="number">
            <input type="text" placeholder="请输入验证码" class="input-style" v-model="form.password">
            <div class="yan" @click="sendCode">{{ sendSmsTime > 0 ? sendSmsTime : '发送验证码' }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="but one" @click="submit">登录</div>
    <div @click="goRegister" class="but two">注册</div>
  </div>
</template>

<script>
  import {showAlert} from '../../config/functions'
  export default {
    name: 'Login',
    components: {},
    data(){
      return {
        form: {
          phone: '',
          password: '',
        },
        // tab: ['账号登录', '短信登录'],
        tab: ['账号登录'],
        currentIndex: 0,
        sendSmsTime: 0,
        sendSmsInterval: false
      }
    },
    methods: {
      submit: function () {
        if (this.currentIndex == 0) {
          if (this.verification()) {
            this.passWordLogin();
          }
        } else {
          if (this.verification()) {
            this.codeLogin();
          }
        }
      },
      passWordLogin: function () {
        this.$httpPost('login/index', {
          cellphone: this.form.phone,
          password: this.form.password,
          type: tools.isWeChatBroswer() ? 25 : 20
        }).then((data) => {
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
      codeLogin: function () {
        http.post('login/captcha-index', {
          cellphone: this.form.phone,
          captcha: this.form.password,
          type: tools.isWeChatBroswer() ? 25 : 20
        }, function (data) {
          stores.setUserObj(data);
          tools.confirm('登录成功', 'success', false, function () {
            tools.goBack();
          });
        })
      },
      // 发送验证码
      sendCode: function () {
        if (!this.form.phone) {
          tools.alert('手机号不能为空', 'warning');
          return false;
        }
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.phone)) {
          tools.alert('手机格式不正确', 'warning');
          return false;
        }
        http.post('login/fast-send-sms', {
          cellphone: this.form.phone
        }, function (data) {
          vm.sendSmsTime = 60;
          vm.sendSmsInterval = setInterval(function () {
            vm.sendSmsTime--;
            if (vm.sendSmsTime <= 0) {
              clearInterval(vm.sendSmsInterval);
            }
          }, 1000);
          tools.alert(data, 'success');
        })
      },
      // 表单验证
      verification: function () {
        if (!this.form.phone) {
          tools.alert('手机号不能为空', 'warning');
          return false;
        }
        if (!/^1[3|4|5|7|8][0-9]{9}$/.test(this.form.phone)) {
          tools.alert('手机格式不正确', 'warning');
          return false;
        }
        if (!this.form.password) {
          if (this.currentIndex == 0) {
            tools.alert('密码不能为空', 'warning');
            return false;
          } else {
            tools.alert('短信验证码不能为空', 'warning');
            return false;
          }
        }
        return true;
      },
      goRegister: function () {
        window.location.href = window.location.origin + "/wx/register.html";
      }
    },
    mounted: function () {

    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl"
  .login
    .set
      width 100%
      position: fixed
      top: 0
      height px2rem(88px)
      line-height px2rem(88px)
      background-color $white
      z-index 100
      border-bottom: 1px solid $fc-e6e6e6;
      .set-on
        text-align center
        font-size px2rem(36px)

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
              font-size px2rem(32px)
            .selected-color
              color $fc-OOa84c
            .cancel-color
              color $fc-999
          .liner
            display inline-block
            height px2rem(36px)
            border 1px solid $fc-e6e6e6
            position absolute
            left 50%
            top px2rem(7px)
        .phone
          border-bottom 1px solid $fc-e6e6e6
          margin: 0 px2rem(55px) px2rem(20px) px2rem(55px)
          .input-style
            line-height px2rem(60px)
            font-size px2rem(28px)
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
        .number
          border-bottom 1px solid $fc-e6e6e6
          margin: 0 px2rem(55px) px2rem(20px) px2rem(55px)
          .input-style
            line-height px2rem(60px)
            font-size px2rem(28px)
            color $fc-999
            width 60%
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
          .yan
            float right
            width px2rem(150px)
            line-height px2rem(60px)
            color $fc-00a84c
            font-size px2rem(28px)
            text-align center
        .forget
          text-align right
          width 100%
          a
            color $fc-00a84c
            font-size px2rem(24px)
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
      background $fc-00a84c
      color $white
      margin-bottom 0
    .two
      border $fc-00a84c solid 1px
      color $fc-00a84c
      margin-top px2rem(50px)
</style>
