<template>
	<el-row>
		<el-row>
			<el-col :span="24">
				<h1>{{$route.meta.register ? '注册' : '登录'}}</h1>
			</el-col>
		</el-row>

		<el-row>
			<el-col :span="18" :offset="3">
				<el-card>
					<el-form v-if="$route.meta.register" :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">

						<el-form-item prop="username" label="用户名">
							<el-input v-model="loginForm.username"></el-input>
						</el-form-item>

						<el-form-item prop="nickname" label="昵称">
							<el-input v-model="loginForm.nickname"></el-input>
						</el-form-item>

						<el-form-item prop="password" label="密码">
							<el-input type="password" v-model="loginForm.password"></el-input>
						</el-form-item>

						<el-form-item prop="email" label="邮箱">
							<el-input v-model="loginForm.email"></el-input>
						</el-form-item>

						<el-form-item style="margin-bottom: 10px;">
							<el-button type="primary" :loading="submitting" @click="onSubmit">提交</el-button>
						</el-form-item>

						<el-form-item style="margin: 0;">
							<a class="register" @click="goLogin">去登录</a>
						</el-form-item>
					</el-form>

					<el-form v-else :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="loginForm">

						<el-form-item prop="username" label="用户名">
							<el-input v-model="loginForm.username" placeholder="请输入用户名或邮箱"></el-input>
						</el-form-item>

						<el-form-item prop="password" label="密码">
							<el-input type="password" v-model="loginForm.password"></el-input>
						</el-form-item>

						<el-form-item style="margin-bottom: 10px;">
							<el-button type="primary" :loading="submitting" @click="onSubmit">提交</el-button>
						</el-form-item>

						<el-form-item style="margin: 0;">
							<a class="register" @click="goRegister">去注册</a>
						</el-form-item>
					</el-form>
				</el-card>

			</el-col>
		</el-row>
	</el-row>
</template>

<script>
import user from "../api/user";

export default {
  components: {},
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
        username: "",
        nickname: ""
      },

      rules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  computed: {
    submitting() {
      return this.$store.state.submitting;
    }
  },

  created() {},

  methods: {
    goRegister() {
      this.$router.push({
        path: "/register"
      });
    },
    goLogin() {
      this.$router.push({
        path: "/login"
      });
    },
    onSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.commit("setSubmit", true);
          if (this.$route.meta.register) {
            user.register(this.loginForm).then(ret => {
                this.$message({
                  message: "注册成功,请登录",
                  type: "success"
                });

                this.goLogin();

                this.$store.commit("setSubmit", false);
              }).catch(err => {
                this.$message.error(err.data.message);
                this.$store.commit("setSubmit", false);
              });
          } else {
            user.login(this.loginForm).then(ret => {
                console.log("登录成功", ret);
                window.localStorage.setItem("jianbaba-token", ret.data.message);
                window.localStorage.setItem('jianbaba-userInfo',JSON.stringify(ret.data.data))
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
                this.$store.commit("setSubmit", false);
                this.$store.commit("setUserInfo", ret.data.data);
                if (this.$route.query.target_url) {
                  window.location.href =
                    "" + decodeURIComponent(this.$route.query.target_url);
                } else {
                  this.$router.push({
                    path: "/index"
                  });
                }
              }).catch(err => {
                this.$message.error(err.data.message);
                this.$store.commit("setSubmit", false);
              });
          }
        } else {
          this.$message.error("请正确填写表单");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-top: 20px;
}
.loginForm {
  padding: 20px 20px 0 20px;
}
.register {
  float: right;
  color: #409eff;
}
</style>