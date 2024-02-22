<template>
  <div id="app">
    <!-- 検索エリアの入力された項目 -->
    <div class="search-box">
      <el-form
        :inline="true"
        ref="form"
        :model="limits"
        label-width="80px"
        size="mini"
        ><el-form-item>
          <el-input
            v-model="limits.id"
            placeholder="IDを入力してください"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="limits.roleName"
            placeholder="ニックネームを入力してください"
          ></el-input>
        </el-form-item>
        <!-- 日付ピッカー -->
        <el-form-item>
          <el-date-picker
            v-model="value1"
            type="daterange"
            :default-time="['00:00:00']"
            range-separator="~"
            start-placeholder="日付FROM"
            end-placeholder="日付TO"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 住所カスケードセレクタ -->
        <el-form-item>
          <el-cascader
            v-model="value"
            :options="addressOptions"
            @change="handleChange"
            :show-all-levels="false"
            :props="{ value: 'id', label: 'title' }"
          ></el-cascader>
        </el-form-item>

        <el-form-item size="large">
          <el-button type="primary" @click="initUser">検索</el-button>
          <el-button @click="clear">クリア</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- ユーザ情報一覧テーブル -->
    <div class="user-table">
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="userList"
        border
        :show-overflow-tooltip="true"
        highlight-current-row
        @row-click="rowClick"
        style="width: 100%"
      >
      <!-- ラジオテーブル -->
        <el-table-column label="選択" fixed="left" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.row.tel" v-model="userList.tel"
              >{{ "   " }}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="index" type="index" width="50" label="ID"></el-table-column>
        <el-table-column prop="userName" label="ユーザ名" width="180">
        </el-table-column>
        <el-table-column prop="roleName" label="ニックネーム" width="180">
        </el-table-column>
        <el-table-column prop="address" label="住所"> </el-table-column>
        <el-table-column prop="tel" label="電話番号" width="180">
        </el-table-column>
        <el-table-column
          prop="validPeriodEnd"
          label="有効期間終了日"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="registrationDate" label="登録年月日" width="180">
        </el-table-column>
      </el-table>
      <!-- 画面に遷移するボタン -->
      <div class="button-box">
        <el-button type="primary" @click="update">変更</el-button>
        <el-button type="primary" @click="detail">詳細</el-button>
        <el-button type="primary" @click="create">新規作成</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      addressOptions: [],
      value1: "",
      limits: {
        id: "",
        roleName: "",
        validPeriodStart: "",
        validPeriodEnd: "",
        title: "",
      },
      userList: [],
    };
  },
  created() {
    this.initUser();
    this.initAddressOptions();
  },
  methods: {
    // 住所選択肢の初期化
    initAddressOptions() {
      this.$http.get("/address/getAddressOptions").then((res) => {
        console.log(res);
        this.addressOptions = res.data.data;
      });
    },
    handleChange(value) {
      console.log(value);
    },
    // 検索一覧画面の初期化
    initUser() {
      if (this.value1 != null) {
        this.limits.startTime = this.value1[0];
        this.limits.endTime = this.value1[1];
      }
      this.$http.post("/user/showUser/", this.limits).then((res) => {
        this.userList = res.data.data;
      });
    },
    // 入力した検索項目をクリアする
    clear() {
      this.limits = {
        id: "",
        roleName: "",
        validPeriodStart: "",
        validPeriodEnd: "",
        address: "",
      };
      this.value1 = [];
      this.value = [];
    },
    rowClick(val) {
      // this.tenderProjectId = val.data.projectId;
      console.log(val);
      this.userList.id = val.data.id;
    },
    update() {},
    detail() {},
    create() {},
  },
};
</script>

<style scoped>
.el-input {
  width: 220px;
}
#app {
  background-color: #fee4d4;
}
.search-box {
  width: 80%;
  position: relative;
  top: 10%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.user-table {
  position: relative;
  top: 15%;
  margin: 0 auto;
  width: 90%;
}
.button-box {
  position: absolute;
  right: 20px;
  margin-top: 20px;
}
</style>
