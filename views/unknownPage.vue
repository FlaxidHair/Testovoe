<template>
  <div class="d-flex align-center flex-column mr-auto ml-auto mt-16">
    <h1 class="mt-16">Вы бездействовали более 10 секунд!</h1>
    <router-link to="/"
      ><v-btn color="primary" @click="$store.commit('generateToken')" class="mt-5"
        >Вернуться?</v-btn
      ></router-link
    >
  </div>
</template>

<script></script>

