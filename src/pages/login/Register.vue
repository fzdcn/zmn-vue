<template>
  <div class="register">
    <common-nav :navTitle="name"></common-nav>
    <div class="register-content bg-white">
      <div class="telphone">
        <span class="black-grey">手机号码</span>
        <input v-model.trim="form.cellphone" id="tel-number" class="black-grey" type="tel" placeholder="请输入手机号">
      </div>
      <div class="message">
        <span class="black-grey">短信验证码</span>
        <input v-model.trim="form.verifyCode" id="message-number" class="black-grey" type="text" placeholder="请输入验证码">
        <div @click="sendSms" class="message-code dark-green fr">{{ sendSmsTime > 0 ? sendSmsTime : '发送验证码' }}</div>
      </div>
      <div class="password">
        <span class="black-grey">密码</span>
        <input v-model.trim="form.password" id="password-number" class="black-grey" type="password" placeholder="请输入密码">
      </div>
    </div>
    <!--注册-->
    <div @click="register" class="btn-submit white bg-dark-green">注册</div>
  </div>
</template>

<script>
  import CommonNav from '../../components/CommonNav';
  import {showAlert, isWeChat} from '../../config/functions';
  export default {
    name: 'Register',
    components: {
      CommonNav
    },
    data(){
      return {
        name: "注册",
        sendSmsTime: 0,
        sendSmsInterval: false,
        confirmPassword: '',
        form: {
          // real_name: '',
          cellphone: '',
          password: '',
          verifyCode: '',
          type: isWeChat ? 25 : 20
        }
      }
    },
    methods: {
      sendSms() {
        if (!this.form.cellphone) {
          showAlert('手机号不能为空', 'warning');
          return false;
        }
        if (!/^1[0-9][0-9]{9}$/.test(this.form.cellphone)) {
          showAlert('手机格式不正确', 'warning');
          return false;
        }
        if (this.sendSmsTime <= 0) {
          this.$httpPost('login/fast-send-sms', {
            cellphone: this.form.cellphone
          }).then(({data}) => {
            showAlert(data, 'success');
            this.sendSmsTime = 60;
            this.sendSmsInterval = setInterval(() => {
              this.sendSmsTime--;
              if (this.sendSmsTime <= 0) {
                clearInterval(this.sendSmsInterval);
              }
            }, 1000)
          }).catch((error) => {
            console.log(error);
          })
        }
      },
      register: function () {
        if (this.verification() && this.sms()) {
          this.$httpPost('login/register', this.form).then(({data}) => {
            this.$store.dispatch('userSignIn', data);
            showAlert('注册并登陆成功', 'success');
            let redirectName = this.$store.getters.loginRedirect;
            if (!redirectName) {
              redirectName = 'home';
            }
            this.$router.replace({path: redirectName});
          })
        }
      },
      // 表单验证
      verification: function () {
        if (!this.form.cellphone) {
          showAlert('手机号不能为空', 'warning');
          return false;
        }
        if (!/^1[0-9][0-9]{9}$/.test(this.form.cellphone)) {
          showAlert('手机格式不正确', 'warning');
          return false;
        }
        if (!this.form.password) {
          showAlert('密码不能为空', 'warning');
          return false;
        }
        if (this.form.password.length < 6) {
          showAlert('密码长度小于六位', 'warning');
          return false;
        }
        return true;
      },
      sms: function () {
        if (!this.form.verifyCode) {
          showAlert('短信验证码不能为空', 'warning');
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
  @import "../../assets/variable.styl";
  .register-content
    margin-top px2rem(100px)
    border-top 1px solid #e6e6e6
    > div
      padding 0 px2rem(15px)
      height px2rem(88px)
      line-height px2rem(88px)
      border-bottom 1px solid #e6e6e6
      span
        height px2rem(42px)
        line-height px2rem(42px)
        font-size $f28
        display inline-block
        width px2rem(150px)
        text-align left
        margin-right px2rem(55px)
      input
        height px2rem(42px)
        max-width px2rem(340px)
        line-height px2rem(42px)
        font-size $f28
        text-align left
        /* WebKit browsers */
        &::input-placeholder
          color #ccc
        /* Mozilla Firefox 4 to 18 */
        &:placeholder
          color #ccc
          opacity 1
        /* Mozilla Firefox 19+ */
        &::placeholder
          color #ccc
          opacity 1
        /* Internet Explorer 10+ */
        &:input-placeholder
          color #ccc
      .message-code
        height px2rem(50px)
        border-radius px2rem(5px)
        margin-top px2rem(19px)
        line-height px2rem(50px)
        text-align center
        width px2rem(150px)
        font-size $f24
        border 1px solid #00a84c

  .btn-submit
    width px2rem(600px)
    height px2rem(90px)
    margin px2rem(75px)
    text-align center
    font-size $f36
    line-height px2rem(90px)
    border-radius px2rem(40px)
    -moz-border-radius px2rem(40px)
</style>
