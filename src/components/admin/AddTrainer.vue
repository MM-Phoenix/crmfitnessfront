<template>
  <div class="header-height"></div>
  <div class="w3-container pfs-form-page-container">
    <hr>
    <div class="w3-center h2-input-container">
      <h2>Add trainer</h2>
    </div>
    <UserForm ref="userForm"/>
  </div>
</template>

<script>
import UserForm from '../form/UserForm'
import AdminAPI from "@/api/AdminAPI";

export default {
  name: "AddTrainer",
  components: {UserForm},
  mounted() {
    const userForm = this.$refs.userForm;

    userForm.setSubmitListener((user) => {
      userForm.setLoading(true);

      AdminAPI.createTrainer(user).then(
          (data) => {
            userForm.setLoading(false);

            if (data.status === 200) {
              userForm.setMessage("Trainer has been created", true);
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
