<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex justify-space-between title-bar align-center">
        <div class="title-bar-div text-h5 no-text-decoration">
          <router-link to="/">
            <v-btn color="indigo">
              Logo
            </v-btn>
          </router-link>
        </div>
        <div class="no-text-decoration">
          <div v-if="!isHome">
            <router-link
              v-for="(option, i) in menuOptions"
              :key="i"
              :to="`/product/${option.slug}`"
            >
              <v-btn
                class="mx-3 pa-5 grey--text text--darken-3"
                color="light-green lighten-3"
              >
                {{ option.displayName }}
              </v-btn>
            </router-link>
          </div>
        </div>
        <div class="title-bar-div d-flex justify-end">
          <v-btn color="red lighten-2" @click="toCart">
            <v-icon>mdi-shopping-outline</v-icon>
            <sub>{{ cart.length }}</sub>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>

    <Snackbar />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Snackbar from "@/components/Snackbar.vue";

@Component({
  components: {
    Snackbar
  }
})
export default class App extends Vue {
  private menuOptions = [
    {
      slug: "flyers",
      displayName: "FLYERS"
    },
    {
      slug: "businesscards",
      displayName: "VISITEKAARTJES"
    },
    {
      slug: "posters",
      displayName: "POSTERS"
    }
  ];

  created() {
    const cart = localStorage.getItem('cart');
    if (cart) this.$store.commit('setCart', JSON.parse(cart));
  }

  toCart() {
    this.$router.push("/cart");
  }

  get isHome() {
    return this.$route.path === "/";
  }

  get cart() {
    return this.$store.getters.getCart;
  }
}
</script>
<style lang="scss">
.title-bar {
  width: 100%;

  &-div {
    width: 15%;
  }

  .no-text-decoration {
    a:link,
    a:visited,
    a:hover,
    a:active {
      text-decoration: none;
    }
  }
}
</style>
