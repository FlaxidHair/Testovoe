<template>
  <div id="app">
    <v-navigation-drawer
      stateless
      value="true"
      height="91vh"
      class="mr-2 mt-3"
      width="15vw"
    >
      <v-card elevation="2" rounded height="91vh">
        <v-container>
          <v-list d-flex>
            <v-list-group value="true" color="black">
              <template v-slot:activator>
                <span class="mr-auto">Профили</span>
              </template>
              <v-card class="mx-auto" max-width="300" tile :elevation="0">
                <v-list dense rounded height="70vh">
                  <v-list-item-group color="primary">
                    <router-link to="/" style="text-decoration: none">
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon
                            v-text="'mdi-check-circle'"
                            color="primary"
                          ></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="'Все'"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </router-link>
                    <router-link to="/statusTrue" style="text-decoration: none">
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon
                            v-text="'mdi-check-circle'"
                            color="primary"
                          ></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Обработанные'"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </router-link>
                    <router-link
                      to="/statusFalse"
                      style="text-decoration: none"
                    >
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon
                            v-text="'mdi-alert-circle'"
                            color="primary"
                          ></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="'Не обработанные'"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </router-link>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-list-group>
          </v-list>
        </v-container>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    openAsideModal: Boolean,
  },
};
</script>
