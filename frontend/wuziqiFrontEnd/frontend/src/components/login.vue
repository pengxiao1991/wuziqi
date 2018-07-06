<style lang="css" >
.login {
  height: 100%;
  position: relative;
}
.login .wrap {
  position: absolute;
  left: 20%;
  top: 30%;
}
.login .wrap .password {
  margin-top: 18px;
}
.login .wrap .button {
  text-align: center;
  margin-top: 30px;
}
</style>

<template >
    <div class="login">
      <div class="wrap">
        <div>
          <span>账号：</span>
          <input placeholder="请输入账号" v-model="account" name="account" type="text">

        </div>
        <div class="password">
           <span>密码：</span>
          <input placeholder="请输入密码" v-model="password" name="account" type="password">
        </div>
        <div class="button">
          <button @click="register">注册</button>
          <button @click="loginUp">登录</button>
        </div>
      
      </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  mounted() {
    if (localStorage.getItem("jwt")) {
      this.goHome();
    }
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/auth/home" });
    },
    async register() {
      let result = await this.axiosService.localReg({
        account: this.account,
        password: this.password
      });
      if (result.data.token) {
        localStorage.setItem("jwt", result.data.token);
        this.goHome();
      }
    },
    async loginUp() {
      let result = await this.axiosService.localLogin({
        account: this.account,
        password: this.password
      });
      if (result.data.token) {
        localStorage.setItem("jwt", result.data.token);
        this.goHome();
      }
    }
  }
};
</script>


