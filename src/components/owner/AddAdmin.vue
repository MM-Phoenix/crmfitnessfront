<template>
  <div class="header-height"></div>
  <div class="w3-container pfs-form-page-container">
    <hr>
    <div class="w3-center h2-input-container">
      <h2>Add admin</h2>
    </div>
    <UserForm ref="userForm"/>
  </div>
</template>

<script>
import UserForm from '../form/UserForm'
import OwnerAPI from '@/api/OwnerAPI'

export default {
  name: "AddAdmin",
  components: {UserForm},
  mounted() {
    const userForm = this.$refs.userForm;

    userForm.setSubmitListener((user) => {
      userForm.setLoading(true);

      OwnerAPI.createAdmin(user).then(
          (data) => {
            userForm.setLoading(false);

            if (data.status === 200) {
              userForm.setMessage("Admin has been created", true);
            } else {
              userForm.setMessage("Something wrong. Talk to programmer.");
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
