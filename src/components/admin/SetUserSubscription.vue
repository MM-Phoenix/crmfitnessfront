<template>
  <div class="header-height"></div>
  <div class="w3-container pfs-form-page-container">
    <hr>
    <div class="w3-center h2-input-container">
      <h2>Add subscription</h2>
    </div>

    <div v-if="users.length" class="w3-responsive w3-card-4">
      <table class="w3-table w3-striped w3-bordered">
        <thead>
        <tr class="w3-theme">
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Subscription</th>
          <th>Confirm</th>
        </tr>
        </thead>
        <tbody ref="tableBody">
        <tr v-for="(user, idx) in users">
          <td>{{ user.email }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.firstName }}</td>
          <td v-show="user.remainingServicesCount">
            <span>{{user.subscription}} ( {{user.remainingServicesCount}} )</span>
          </td>
          <td v-show="!user.remainingServicesCount">
            <select class="w3-select" name="group" ref="subscription" @change="setSubscriptionToUser(user, $event.target.value)">
              <option style="display:none" selected>Select subscription</option>
              <option v-for="subscription in subscriptions" :value="subscription.type" :selected="user.subscription === subscription.type">
                {{subscription.type}} ( {{subscription.count}} )
              </option>
            </select>
          </td>
          <td style="text-align: left">
            <button class="w3-button button-border-transition" style="padding: 2px 14px; font-size: 13px" @click="saveUserSubscription(user, idx)" :disabled="user.remainingServicesCount">Add</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="text-align: center">
      <div style="font-size:100px">🤷</div>
      There are no users for now.
    </div>
  </div>
</template>

<script>
import AdminAPI from "@/api/AdminAPI";

export default {
  data() {
    return {
      users: [],
      subscriptions: []
    }
  },
  methods: {
    setSubscriptionToUser(user, subscription) {
      user.subscription = subscription;
    },

    saveUserSubscription(user, idx) {
      if (user.subscription) {
        AdminAPI.setUserSubscription(user.id, user.subscription).then(
            (result) => {
              console.log('result: ', result);
              if (result.status === 200) {
                this.users[idx] = result.data;
              }
            }
        )
      }
    }
  },

  created() {
    AdminAPI.getSubscriptions().then(
        (result) => {
          for (let id in result.data) {
            this.subscriptions.push(result.data[id]);
          }
        }
    )

    AdminAPI.getClients().then(
        (result) => {
          for (let id in result.data) {
            this.users.push(result.data[id]);
          }
        }
    )
  }
}
</script>
