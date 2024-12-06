<template>
  <div class="w3-responsive w3-card-4 col-md-12">
    <div class="card-container w3-striped w3-bordered w3-margin w3-padding-large">
      <Form @submit="onSubmit" :validation-schema="schema">
        <div class="form-group">
          <label for="firstName" class="required-field">First name</label>
          <Field :value="currentUser.firstName" id="firstName" name="firstName" type="text" class="w3-input w3-border"/>
          <ErrorMessage name="firstName" class="error-feedback"/>
        </div>

        <div class="form-group">
          <label for="lastName" class="required-field">Last name</label>
          <Field :value="currentUser.lastName" id="lastName" name="lastName" type="text" class="w3-input w3-border"/>
          <ErrorMessage name="lastName" class="error-feedback"/>
        </div>

        <div class="form-group">
          <label for="email" class="required-field">Email</label>
          <Field :value="currentUser.email" id="email" name="email" type="email" class="w3-input w3-border"/>
          <ErrorMessage name="email" class="error-feedback"/>
        </div>

        <div v-if="this.new">
          <div class="form-group">
            <label for="password" class="required-field">Password</label>
            <Field id="password" name="password" type="password" class="w3-input w3-border"/>
            <ErrorMessage name="password" class="error-feedback"/>
          </div>
        </div>

        <div v-else>
          <div class="form-group">
            <label for="newPassword">New password</label>
            <Field id="newPassword" name="newPassword" type="password" class="w3-input w3-border"/>
            <ErrorMessage name="newPassword" class="error-feedback"/>
          </div>

          <div class="form-group">
            <label for="oldPassword">Old password</label>
            <Field id="oldPassword" name="oldPassword" type="password" class="w3-input w3-border"/>
            <ErrorMessage name="oldPassword" class="error-feedback"/>
          </div>
        </div>

        <div class="form-group w3-center">
          <button class="w3-button w3-block button-border-transition" :disabled="loading" style="margin-top: 2.5em">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            {{ this.new ? 'Create' : 'Update' }}
          </button>
        </div>
      </Form>

      <div v-if="message" class="alert" :class="successful === true? 'alert-success' : 'alert-danger'">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import {ErrorMessage, Field, Form} from "vee-validate";
import * as yup from "yup";

let listener;

export default {
  name: "UserForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    new: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  expose: ['setSubmitListener', 'setLoading', 'setMessage'],
  data() {
    const schema = yup.object().shape({
      firstName: yup
          .string()
          .required("First name is required!")
          .matches(/^[a-zA-Z]{1,50}$/, "Please enter a valid text"),
      lastName: yup
          .string()
          .required("Last name is required!")
          .matches(/^$|^[a-zA-Z]{1,50}$/, "Please enter a valid text"),
      email: yup
          .string()
          .required("Email is required!")
          .matches(/^[a-z0-9._-]+@[a-z]+\.[a-z.]{2,10}$/, "Please, enter a valid email (example@mail.com)"),
      password: yup
          .string()
          .when({
            is: this.new,
            then: yup.string().required("Password is required!")
                .matches(/^$|^[a-zA-Z0-9]{8,20}$/, "Your password should be 8-20 chars, containing a-Z or 0-9")
          }),
      newPassword: yup
          .string()
          .matches(/^$|^[a-zA-Z0-9]{8,20}$/, "Your password should be 8-20 chars, containing a-Z or 0-9"),
      oldPassword: yup
          .string()
          .matches(/^$|^[a-zA-Z0-9]{8,20}$/, "Your old password should be 8-20 chars, containing a-Z or 0-9"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      currentUser: this.new ? {} : this.$store.state.auth.user,
    };
  },
  methods: {
    setSubmitListener(listener) {
      this.listener = listener;
    },
    setLoading(loading) {
      this.loading = loading;
    },
    setMessage(message, successful) {
      this.successful = successful ? successful : false;
      this.message = message;
    },
    onSubmit(user, actions) {
      this.message = "";
      this.successful = false;

      if (user.newPassword && user.newPassword !== '' && (!user.oldPassword || user.oldPassword === '')) {
        actions.setFieldError('oldPassword', 'Please enter old password');
      } else if (user.oldPassword && user.oldPassword !== '' && (!user.newPassword || user.newPassword === '')) {
        actions.setFieldError('newPassword', 'Please enter new password');
      } else {
        this.listener(user);
      }
    },
  },
};
</script>
