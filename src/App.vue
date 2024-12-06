<template>
  <div class="w3-top">
    <div class="w3-bar w3-white w3-card">
      <nav class="navbar navbar-expand" style="padding: 0; text-outline: none">
        <router-link to="/" v-bind:class="isCurrentPage('/')" class="w3-bar-item w3-button w3-wide">PFS</router-link>
        <div class="navbar-nav mr-auto">
          <li v-if="showCreateAdmin" class="nav-item">
            <router-link to="/owner" v-bind:class="isCurrentPage('/owner')" class="w3-bar-item w3-button">ADD ADMIN</router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/trainer" v-bind:class="isCurrentPage('/admin/trainer')" class="w3-bar-item w3-button">ADD TRAINER</router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/client" v-bind:class="isCurrentPage('/admin/client')" class="w3-bar-item w3-button">ADD CLIENT</router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/users" v-bind:class="isCurrentPage('/admin/users')" class="w3-bar-item w3-button">SUBSCRIPTIONS</router-link>
          </li>
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin/schedule" v-bind:class="isCurrentPage('/admin/schedule')" class="w3-bar-item w3-button">SCHEDULE</router-link>
          </li>
          <li v-if="showTrainerBoard" class="nav-item">
            <router-link to="/trainer/schedule" v-bind:class="isCurrentPage('/trainer/schedule')" class="w3-bar-item w3-button">SCHEDULE</router-link>
          </li>
          <li v-if="showUserBoard" class="nav-item">
            <router-link to="/schedule" v-bind:class="isCurrentPage('/schedule')" class="w3-bar-item w3-button">SCHEDULE</router-link>
          </li>
        </div>
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" v-bind:class="isCurrentPage('/register')" class="w3-bar-item w3-button">
              <!--            <font-awesome-icon icon="user-plus"/>-->
              SIGN UP
            </router-link>
          </li>
          <li v-if="!currentUser" class="nav-item">
            <router-link to="/login" v-bind:class="isCurrentPage('/login')" class="w3-bar-item w3-button">
              <!--            <font-awesome-icon icon="sign-in-alt"/>-->
              SIGN IN
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/profile" v-bind:class="isCurrentPage('/profile')" class="w3-bar-item w3-button">
              {{ currentUser.firstName }} {{ currentUser.lastName }}
            </router-link>
          </li>
          <li class="nav-item" style="cursor: pointer">
            <a class="w3-bar-item w3-button" @click.prevent="logOut">
              <!--            <font-awesome-icon icon="sign-out-alt"/>-->
              SIGN OUT
            </a>
          </li>
        </div>
      </nav>
    </div>
  </div>

  <div style="margin-top: 4em">
    <router-view/>
    <div  v-show="showFooter" style="padding-bottom: 30vh"></div>
  </div>

  <!-- Footer -->
  <div v-show="showFooter" style="position: absolute; bottom: 0; width: 100%; height: 24.7vh">
    <footer v-show="showFooter" class="w3-center w3-black w3-padding-64" id="contact">
      <hr>
      <p>Contact us</p>

      <div class="w3-xlarge w3-section">
        <a class="fa fa-phone w3-hover-opacity icon-link" href="tel:050-207-3879"></a>
        <a class="fa fa-envelope w3-hover-opacity icon-link" href="mailto:makasyeyeva.mariya@lll.kpi.ua"></a>
        <a class="fa fa-telegram w3-hover-opacity icon-link" href="https://t.me/masha_3009"></a>
        <a class="fa fa-whatsapp w3-hover-opacity icon-link" href="https://wa.me/380502073879"></a>
      </div>
    </footer>
  </div>

</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showCreateAdmin() {
      return this.currentUser && this.currentUser.role ? this.currentUser.role.includes('OWNER') : false;
    },
    showAdminBoard() {
      return (this.currentUser && this.currentUser.role) ? this.currentUser.role.includes('ADMIN') || this.showCreateAdmin : false;
    },
    showTrainerBoard() {
      return this.currentUser && this.currentUser.role ? this.currentUser.role.includes('TRAINER') : false;
    },showUserBoard() {
      return this.currentUser && this.currentUser.role ? this.currentUser.role.includes('CLIENT') : false;
    },
    showFooter() {
      return this.$store.state.showFooter;
    }
  },
  methods: {
    isCurrentPage: function (pagePath) {
      return this.$router.currentRoute.value.path === pagePath ? 'w3-button-hover' : '';
    },
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
  }
};
</script>
