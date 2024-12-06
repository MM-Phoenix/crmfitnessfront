<template>
  <div class="header-height"></div>
  <div class="w3-container pfs-form-page-container">
    <hr>
    <div class="w3-center h2-input-container">
      <h2>Edit Profile</h2>
    </div>
    <UserForm ref="userForm" :new="false"/>
  </div>
</template>

<script>
import UserForm from '../form/UserForm'
import UserAPI from "@/api/UserAPI";

export default {
  name: "Profile",
  components: {UserForm},
  mounted() {
    const userForm = this.$refs.userForm;

    userForm.setSubmitListener((user) => {
      userForm.setLoading(true);

      UserAPI.updateUser(user).then(
          (data) => {
            userForm.setLoading(false);

            if (data.status === 200) {
              userForm.setMessage("Your data has been updated", true);
            } else {
              userForm.setMessage("Something wrong. Talk to admin.");
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
