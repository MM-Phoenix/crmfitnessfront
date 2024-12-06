<template>
  <div class="header-height"></div>
  <div class="w3-container" style="min-height:80vh">
      <div class="w3-half" style="height:88vh">
        <div class="w3-container pfs-form-page-container">
          <hr>
          <div class="w3-center h2-input-container">
            <h2>Sign in</h2>
          </div>

          <div class="w3-responsive w3-card-4 col-md-12">
            <div class="card-container w3-striped w3-bordered w3-margin w3-padding-large">
              <Form @submit="handleLogin" :validation-schema="schema">
                <div class="form-group">
                  <label for="email">Email</label>
                  <Field id="email" name="email" type="text" class="w3-input w3-border"/>
                  <ErrorMessage name="email" class="error-feedback"/>
                </div>
                <div class="form-group">
                  <label for="password">Password</label>
                  <Field id="password" name="password" type="password" class="w3-input w3-border"/>
                  <ErrorMessage name="password" class="error-feedback"/>
                </div>

                <div class="form-group">
                  <button class="w3-button w3-block button-border-transition" :disabled="loading">
            <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
            ></span>
                    <span>Login</span>
                  </button>
                </div>

                <div class="form-group">
                  <div v-if="message" class="alert" :class="successful === true ? 'alert-success' : 'alert-danger'">
                    {{ message }}
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div class="w3-half img-half-right-container">
        <img class="w3-image w3-grayscale-min img-half-right-high" style="object-position: 30% 20%" src="../assets/images/jump.jpg" alt="Fitness">
      </div>
  </div>

</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";
import UserForm from "@/components/form/UserForm.vue";

export default {
  name: "Login",
  components: {UserForm, Form, Field, ErrorMessage,},
  data() {
    const schema = yup.object().shape({
      email: yup.string().required("Email is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      successful: false,
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
          () => {
            this.successful = true;
            this.message = 'Welcome back! 👋🏻';
            this.$router.push("/");
          },
          (error) => {
            this.loading = false;
            this.successful = false;
            this.message = 'Oops, something went wrong... 🫣';
          }
      );
    },
  },
};
</script>

<style scoped>

</style>