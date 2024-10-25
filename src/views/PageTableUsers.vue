<template>
  <div>
    <v-dialog v-model="$store.state.isEdit" max-width="600px">
      <UserInputForm
        @send-ref="receiveRef"
        :saveUser="saveUser"
        :nameRulesEmail="nameRulesEmail"
        :nameRulesPhone="nameRulesPhone"
        :nameRulesDefault="nameRulesDefault"
        :nameSelectRules="nameSelectRules"
        @fetchUsers="fetchUsers"
      ></UserInputForm>
    </v-dialog>
    <v-container>
      <UserTableList
        @fetchUsers="fetchUsers"
        @deleteUser="deleteUser"
        @selectUser="selectUser"
        :loading="loading"
        :users="users"
        :pageText="pageText"
        :selectedActions="selectedActions"
        :selectedActionsReset="selectedActionsReset"
      >
      </UserTableList>
      <v-snackbar v-model="snackbar" color="primary">
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="secondary"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Закрыть
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import UserTableList from "@/components/UserTableList.vue";
import UserInputForm from "@/components/UserInputForm.vue";
import api from "@/helpers/api";

export default {
  components: { UserTableList, UserInputForm },
  data() {
    return {
      users: [],
      loading: false,
      snackbar: false,
      snackbarText: "",
      pageText: "",
      selectedActions: "",
      refForm: null,
      nameRulesPhone: [
        (v) => !!v || "Телефон обязателен",
        (v) =>
          /^\(\d{3}\) \d{3}-\d{4}$/.test(v) ||
          "Введите номер в формате (555) 123-1234",
      ],
      nameRulesEmail: [
        (v) => !!v || "Email обязателен",
        (v) => /.+@.+\..+/.test(v) || "Введите корректный Email",
      ],
      nameRulesDefault: [(v) => !!v || "Необходимо заполнить!"],
      nameSelectRules: [(v) => v != null || 'Выберите статус!']
    };
  },
  methods: {
    selectUser(item) {
      this.$store.state.user = [item];
      this.selectedActions = null;
    },
    fetchUsers() {
      this.loading = true;
      let method;
      if (this.$route.name === "status-false") {
        method = api.getUsersInActiveList();
        this.pageText = "Необработанные";
      } else if (this.$route.name === "status-true") {
        method = api.getUsersActive();
        this.pageText = "Обработанные";
      } else if (this.$route.name === "status-all") {
        method = api.getUsers();
        this.pageText = "Все";
      }
      method
        .then((response) => {
          this.users = response.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    textSnackbar(message) {
      this.snackbar = true;
      this.snackbarText = message;
    },
    selectedActionsReset() {
      this.selectedActions = "";
    },
    saveUser(user) {
      if (this.refForm.validate()) {
        if (user.id) {
          this.loading = true;
          api.updateUser(user.id, user).then(() => {
            this.fetchUsers;
            this.textSnackbar("Вы успешно обновили пользователя");
          });
        } else {
          this.loading = true;
          api.createUser(user).then(() => {
            this.fetchUsers;
            this.textSnackbar("Вы успешно создали пользователя");
          });
        }
        this.selectedActions = "";
        this.loading = false;
        this.$store.state.isEdit = false;
      }
    },
    deleteUser(user) {
      api
        .deleteUser(user.id)
        .then(this.fetchUsers)
        .then(() => {
          this.selectedActions = "";
          this.textSnackbar("Вы успешно удалили пользователя!");
        });
    },
    receiveRef(ref) {
      this.refForm = ref;
    },
  },
  computed: {
    getStateSearch() {
      return this.$store.state.isSearch;
    },
  },
  watch: {
    $route() {
      this.fetchUsers();
    },
    getStateSearch(nVal) {
      if (nVal) this.users = this.$store.state.results;
    },
  },
};
</script>
