<template>
  <div id="app">
    <div class="box">
      <p class="welcome">ユーザ登録</p>
      <div class="form">
        <div class="user-input1">
          <el-input
            v-model="userName"
            placeholder="ユーザ名を入力してください"
            prefix-icon="el-icon-user"
          ></el-input>
        </div>

        <div class="user-input2">
          <el-input
            v-model="password"
            placeholder="暗証番号を入力してください"
            prefix-icon="el-icon-key"
            show-password
          ></el-input>
        </div>
        <button class="user-btn1">
          <a @click="login" href="JavaScript:">
            <h3>ログイン</h3>
          </a>
        </button>
        <button class="user-btn2">
          <a @click="register" href="JavaScript:">
            <h3>新規作成</h3>
          </a>
        </button>
        <a @click="forgot" class="fp"> 暗証番号を取り戻す </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      password: "",
    };
  },
  methods: {
    // ログイン機能
    login() {
      if (
        this.userName.trim() == "" ||
        this.userName == null ||
        this.userName == undefined
      ) {
        this.$message({
          message: "ユーザ名は空にできません",
          type: "warning",
        });
        return;
      }
      if (
        this.password.trim() == "" ||
        this.password == null ||
        this.password == undefined
      ) {
        this.$message({
          message: "暗証番号は空にできません",
          type: "warning",
        });
        return;
      }
      // key-valueの形式でデータを発信する
      let formDate = new FormData();
      formDate.append("userName",this.userName);
      formDate.append("password",this.password);
      this.$http
        .post("/user/login", formDate, {
          Headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((res) => {
          this.$message({
            message:"正確で、ログインが許可されている",
            type:"success",
          });
          sessionStorage.setItem("loginId",res.data.data.loginId);
          sessionStorage.setItem("userName",res.data.data.userName);
          sessionStorage.setItem("address",res.data.data.address);
          sessionStorage.setItem("tel",res.data.data.tel);
          this.$router.push("/showindex")
          });
    },
    // 登録機能
    register(){
      this.$router.push("/register")
    },
    //暗証番号の取り戻し
    forgot(){
      this.$router.push("/password")
    }
  },
};
</script>

<style scoped>
#app {
  background-color: #ffd1b7;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  position: relative;
  background-color: #fee4d4;
  height: 400px;
  width: 600px;
}

.welcome {
  position: absolute;
  color: #302825;
  left: 36%;
  top: 20%;
  font-weight: bolder;
  font-size: xx-large;
}

.user-input1 {
  position: absolute;
  top: 35%;
  margin: 12px;
}
.user-input2 {
  position: absolute;
  top: 50%;
  margin: 12px;
}
.el-input {
  font-size: 12px;
  width: 250px;
  left: 65%;
}
.fp {
  position: absolute;
  top: 80%;
  left: 38%;
  font-size: 15px;
  margin: 12px;
  color: #707e8d;
  font-size: small;
}
.fp:hover {
  cursor: pointer;
  color: #f45f34;
  text-decoration: underline;
}
.user-btn1,
.user-btn2 {
  background: #fb966f;
  border-radius: 5px;
  border: none;
  width: 70px;
  position: absolute;
  top: 70%;
}
.user-btn1 {
  left: 33%;
}
.user-btn2 {
  left: 53%;
}
h3 {
  font-size: 14px;
  color: #f45f34;
  padding: 5px;
}
</style>
