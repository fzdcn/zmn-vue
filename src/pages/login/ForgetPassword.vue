<template>
  <div class="forget-password">
    <common-nav :navTitle="name"></common-nav>
    <div class="info-form bt-e6e6e6 bg-fff">
      <div class="list-item bb-e6e6e6">
        <span class="style-h font-3">手机号</span>
        <input type="tel" placeholder="请输入手机号" v-model="phone" class="style-p fc-333">
      </div>
      <div class="list-item bb-e6e6e6">
        <span class="style-h font-3">验证码</span>
        <input type="number" placeholder="请输入6位短信验证码" v-model="code" class="style-p fc-333">
        <div class="yan fc-00a84c bd-00a84c" @click="sendCode">{{ sendSmsTime > 0 ? sendSmsTime : '发送验证码' }}</div>
      </div>
      <div class="list-item bb-e6e6e6">
        <span class="style-h font-3">新密码</span>
        <input type="password" placeholder="请输入新密码" v-model="password" class="style-p fc-333">
      </div>
    </div>
    <div class="sure fc-fff bg-00a84c" @click="submit">确定</div>
  </div>
</template>

<script>
  import CommonNav from '../../components/CommonNav';
  import {showAlert, isWeChat, goBack} from '../../config/functions';
  export default {
    name: 'ForgetPassword',
    components: {CommonNav},
    data(){
      return {
        name: '找回密码',
        phone: '',
        code: '',
        password: '',
        password_second: '',
        sendSmsTime: 0
      }
    },
    methods: {
      sendCode: function () {
        if (!this.phone) {
          showAlert('手机号不能为空', 'warning');
          return false;
        }
        if (!/^1[0-9][0-9]{9}$/.test(this.phone)) {
          showAlert('手机号格式不正确', 'warning');
          return false;
        }
        if (this.sendSmsTime <= 0) {
          this.$httpPost('login/fast-send-sms', {
            cellphone: this.phone,
          }).then(({data}) => {
            showAlert(data, 'success');
            this.sendSmsTime = 60;
            this.sendSmsInterval = setInterval(() => {
              this.sendSmsTime--;
              if (this.sendSmsTime <= 0) {
                clearInterval(this.sendSmsInterval);
              }
            }, 1000);
          }).catch((error) => {
            console.log(error);
          })
        }
      },
      submit: function () {
        if (!this.phone) {
          showAlert('手机号不能为空', 'warning');
          return
        }
        if (!/^1[0-9][0-9]{9}$/.test(this.phone)) {
          showAlert('手机号格式不正确', 'warning');
          return
        }
        if (!this.password) {
          showAlert('密码不能为空', 'warning');
          return
        }
        if (this.password.length < 6) {
          showAlert('密码长度不能小于六位', 'warning');
          return
        }
        this.$httpPost('login/back-password', {
          cellphone: this.phone,
          password: this.password,
          verifyCode: this.code,
          type: isWeChat ? 25 : 20
        }).then(({data}) => {
          showAlert('密码修改成功', 'succsee');
          goBack();
        }).catch((error) => {
          console.log(error);
        })
      }
    },
    mounted(){
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../assets/common.styl";
  .info-form
    margin-top px2rem(100px)
    .list-item
      padding 0 px2rem(15px)
      height px2rem(88px)
      line-height px2rem(88px)
      /* WebKit browsers */
      ::-webkit-input-placeholder
        color $fc-ccc
      /* Mozilla Firefox 4 to 18 */
      :-moz-placeholder
        color $fc-ccc
        opacity 1
      /* Mozilla Firefox 19+ */
      ::-moz-placeholder
        color $fc-ccc
        opacity 1
      /* Internet Explorer 10+ */
      :-ms-input-placeholder
        color $fc-ccc
      .style-h
        height px2rem(42px)
        line-height px2rem(42px)
        font-size $f28
        color $fc-333
        display inline-block
        width px2rem(150px)
        text-align left
      .style-p
        height px2rem(42px)
        max-width px2rem(340px)
        line-height px2rem(42px)
        font-size $f28
        text-align left
      .yan
        float right
        width px2rem(150px)
        line-height px2rem(50px)
        font-size $f24
        text-align center
        margin px2rem(20px) px2rem(10px)

  .sure
    width px2rem(600px)
    height px2rem(88px)
    text-align center
    border-radius px2rem(55px)
    line-height px2rem(88px)
    margin px2rem(70px) auto
</style>
