<template>
  <v-card
    class="absolute pa-7 d-flex flex-column"
    :height="!this.$store.state.isEdit ? '90vh' : 625"
    v-if="$store.state.user[0]"
  >
    <v-form
      v-model="valid"
      ref="form"
      @submit.prevent="searchOrSubmit($store.state.user[0])"
      class="d-flex flex-column flex-grow-1"
      height="100%"
    >
      <div>
        <v-text-field
          solo
          placeholder="Имя"
          dense
          :rules="nameRulesDefault"
          v-model="$store.state.user[0].firstName"
          label="Имя"
        ></v-text-field>
        <v-text-field
          solo
          placeholder="Фамилия"
          dense
          :rules="nameRulesDefault"
          v-model="$store.state.user[0].lastName"
          label="Фамилия"
        ></v-text-field>
        <v-text-field
          solo
          placeholder="Компания"
          dense
          v-model="$store.state.user[0].company"
          label="Компания"
        ></v-text-field>
        <v-text-field
          solo
          placeholder="Должность"
          dense
          v-model="$store.state.user[0].jobTitle"
          label="Должность"
        ></v-text-field>
        <v-text-field
          solo
          placeholder="Телефон"
          dense
          v-model="$store.state.user[0].phone"
          :rules="nameRulesPhone"
          label="Телефон"
        ></v-text-field>
        <v-text-field
          solo
          placeholder="E-mail"
          dense
          v-model="$store.state.user[0].email"
          :rules="nameRulesEmail"
          label="E-mail"
        ></v-text-field>
        <v-text-field
          solo
          placeholder="Интересы"
          dense
          v-model="$store.state.user[0].interests"
          label="Интересы"
        ></v-text-field>
        <v-select
          solo
          :rules="nameSelectRules"
          v-if="$store.state.isEdit"
          v-model="$store.state.user[0].status"
          :items="statuses"
          label="Обработанный/Не обработанный"
        ></v-select>
      </div>
      <small v-show="error">Необходимо заполнить хотя бы 1 поле!</small>
      <v-card-actions class="d-flex align-end mt-auto">
        <v-spacer></v-spacer>
        <v-btn @click="resetInput" v-show="!this.$store.state.isEdit"
          >Очистить</v-btn
        >
        <v-btn color="primary" type="submit">{{ messageAction }}</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import api from "@/helpers/api";
export default {
  props: {
    saveUser: Function,
    nameRulesEmail: Array,
    nameRulesPhone: Array,
    nameRulesDefault: Array,
    nameSelectRules: Array,
  },
  data() {
    return {
      statuses: [
        { text: 'True', value: true },
        { text: 'False', value: false },
      ],
      valid: false,
      result: [],
      error: false,
    };
  },
  methods: {
    resetInput() {
      this.$store.state.isSearch = 0;
      this.$refs.form.reset();
      this.getUsers();
    },
    searchUser() {
      if (
        !Object.values(this.$store.state.user[0]).some((field) => field !== "")
      ) {
        this.error = true;
        return;
      }
      this.error = false;
      this.getUsers();
    },
    getUsers() {
      const params = Object.fromEntries(
        Object.entries(this.$store.state.user[0]).filter(
          ([key, value]) => value !== ""
        )
      );
      api.getSearchUser(params).then((response) => {
        if (response.data) this.$store.state.results = response.data;
        this.$store.state.isSearch++;
      });
    },
    searchOrSubmit(val) {
      if (!this.$store.state.isEdit) {
        this.searchUser();
      } else {
        this.saveUser(val);
      }
    },
  },
  computed: {
    messageAction() {
      return !this.$store.state.isEdit ? "Применить" : "Сохранить";
    },
  },
  updated() {
    this.$emit("send-ref", this.$refs.form);
  },
};
</script>
