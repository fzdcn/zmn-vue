<template>
  <div class="Register">
    <common-nav :navTitle="name"></common-nav>
    <div class="register-content">
      <div class="telphone">
        <span>手机号码</span>
        <input v-model.trim="form.cellphone" id="tel-number" type="tel" placeholder="请输入手机号">
      </div>
      <div class="message">
        <span>短信验证码</span>
        <input v-model.trim="form.verifyCode" id="message-number" type="text" placeholder="请输入验证码">
        <div @click="sendSms" class="message-code fr">{{ sendSmsTime > 0 ? sendSmsTime : '发送验证码' }}</div>
      </div>
      <div class="password">
        <span>密码</span>
        <input v-model.trim="form.password" id="password-number" type="password" placeholder="请输入密码">
      </div>
    </div>
    <!--注册-->
    <div @click="register" class="btn-submit">注册</div>
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
        validate_code: {
          attribute1: '',
          attribute2: '',
          operate: '',
          inputValue: ''
        },
        imgCode: '',
        uuid: '',
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
      getUuid() {
        return Date.parse(new Date());
      },
      pushCode() {
        let num = this.getUuid();
        this.uuid = num;
        this.imgCode = http.baseUrl + 'captcha/get?uuid=' + num;
      },
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
            image_code: this.validate_code.inputValue,
            uuid: this.uuid,
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
  @import "../../assets/common.styl";
  .register-content
    border-top solid 1px $fc-e6e6e6
    margin-top px2rem(100px)
    background-color $white
    > div
      border-bottom solid 1px $fc-e6e6e6
      padding 0 px2rem(15px)
      height px2rem(88px)
      line-height px2rem(88px)
      span
        height px2rem(42px)
        line-height px2rem(42px)
        font-size $f28
        color $fc-333
        display inline-block
        width px2rem(150px)
        text-align left
        margin-right px2rem(55px)
      input
        height px2rem(42px)
        max-width px2rem(340px)
        line-height px2rem(42px)
        font-size $f28
        color $fc-333
        text-align left
      /* WebKit browsers */
      ::input-placeholder
        color $fc-ccc
      /* Mozilla Firefox 4 to 18 */
      :placeholder
        color $fc-ccc
        opacity 1
      /* Mozilla Firefox 19+ */
      ::placeholder
        color $fc-ccc
        opacity 1
      /* Internet Explorer 10+ */
      :input-placeholder
        color $fc-ccc
      .change-btn
        width px2rem(150px)
        height px2rem(50px)
        border-radius px2rem(5px)
        margin-top px2rem(19px)
        color $fc-ee600c
        line-height px2rem(50px)
        text-align center

      .verification-code
        width px2rem(150px)
        height px2rem(50px)
        border-radius px2rem(5px)
        margin-top px2rem(19px)
        color $fc-ee600c
        line-height px2rem(50px)
        text-align center
        margin-right: px2rem(5px)
      .message-code
        height px2rem(50px)
        border-radius px2rem(5px)
        margin-top px2rem(19px)
        line-height px2rem(50px)
        text-align center
        width px2rem(150px)
        font-size px2rem(24px)
        color $fc-00a84c
        border 1px solid $fc-00a84c

  .btn-submit
    width px2rem(600px)
    height px2rem(90px)
    margin px2rem(75px)
    text-align center
    color $white
    font-size $f36
    background-color $fc-00a84c
    line-height px2rem(90px)
    border-radius px2rem(40px)
    -moz-border-radius px2rem(40px)
</style>
