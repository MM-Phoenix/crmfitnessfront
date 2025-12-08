<template>
  <div class="header-height"></div>
  <div class="w3-container" style="min-height:80vh">
    <div class="w3-half" style="height:88vh">
      <div class="w3-container pfs-form-page-container">
        <hr>
        <div class="w3-center h2-input-container">
          <h2>Реєстрація</h2>
        </div>
        <UserForm ref="userForm"/>
      </div>
    </div>
    <div class="w3-half img-half-right-container">
      <img class="w3-image w3-grayscale-min img-half-right-high" style="object-position: 20% 20%" src="../assets/images/runningjump.jpg" alt="Yoga">
    </div>

  </div>
</template>

<script>
import UserForm from './form/UserForm'
import AuthAPI from "@/api/AuthAPI";

export default {
  name: "Register",
  components: {UserForm},
  mounted() {
    const userForm = this.$refs.userForm;

    userForm.setSubmitListener((user) => {
      userForm.setLoading(true);

      AuthAPI.signUp(user).then(
          (data) => {
            userForm.setLoading(false);

            if (data.status === 200) {
              userForm.setMessage("Ви зареєстровані", true);

              this.$store.dispatch("auth/login", user).then(
                  () => {
                    this.$router.push("/");
                  },
                  (error) => {
                    this.loading = false;
                    userForm.setMessage(error.data);
                  }
              );
            } else {
              userForm.setMessage("Щось пішло не так. Зверніться до адміністратора.");
            }
          },
          (error) => {
            userForm.setLoading(false);
            userForm.setMessage(error.response.data.detail);
          })
    });
  }
};
</script>
