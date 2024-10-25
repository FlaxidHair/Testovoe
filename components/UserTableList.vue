<template>
  <v-responsive width="80vw">
    <v-container>
      <v-card class="pa-5">
        <v-container d-flex justify-space-between>
          <v-toolbar-title
            >{{ pageText
            }}<v-btn icon @click="fetchUsers">
              <v-icon color="primary">mdi-refresh</v-icon>
            </v-btn></v-toolbar-title
          >
          <v-row justify="end">
            <v-col class="d-flex" sm="2">
              <v-select
                filled
                label="Действия"
                dark
                :items="itemsSelect"
                hide-details
                color="secondary"
                class="secondary"
                background-color="primary"
                :value="selectedActions"
                @input="actionsChange"
                @click="selectedActionsReset"
              >
                <template v-slot:item="{ item }">
                  <div>{{ item }}</div>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
        <v-data-table
          :headers="headers"
          :items="users"
          loading-text="Загрузка..."
          :loading="loading"
          @update:options="fetchUsers"
          no-data-text="Нет результатов"
          no-result-text="Нет результатов"
          @click:row="selectUser($event)"
          :value="$store.state.user"
          height="66vh"
        >
          <template v-slot:[`item.status`]="{ item }">
            <div v-if="item.status == true">
              <v-icon color="blue">mdi-cloud-check</v-icon>
            </div>
            <div v-if="item.status == false">
              <v-icon color="red">mdi-cloud-off-outline</v-icon>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </v-responsive>
</template>

<script>
export default {
  props: {
    users: Array,
    loading: Boolean,
    pageText: String,
    selectedActions: String,
    selectedActionsReset: Function,
  },
  data() {
    return {
      headers: [
        { text: "Статус", value: "status" },
        { text: "Имя", value: "firstName" },
        { text: "Фамилия", value: "lastName" },
        { text: "Компания", value: "company" },
        { text: "Должность", value: "jobTitle" },
        { text: "Телефон", value: "phone" },
        { text: "Email", value: "email" },
        { text: "Интересы", value: "interests" },
      ],
      options: {
        page: 1,
        itemsPerPage: 10,
      },
      itemsSelect: ["Изменить", "Удалить", "Добавить"],
    };
  },
  methods: {
    fetchUsers() {
      this.$emit("fetchUsers");
    },
    deleteUser(user) {
      this.$emit("deleteUser", user);
    },
    selectUser(user) {
      this.$emit("selectUser", user);
    },
    actionsChange(el) {
      if (this.$store.state.user.length) {
        if (el === "Удалить") {
          return this.$emit("deleteUser", this.$store.state.user[0]);
        } else if (el === "Изменить" && this.$store.state.user[0].id) {
          !this.$store.state.isEdit ? (this.$store.state.isEdit = true) : null;
        }
      }
      if (el === "Добавить") {
        this.$store.commit("newUser");
        this.$store.state.isEdit = true;
      }
    },
  },
};
</script>

<style></style>
