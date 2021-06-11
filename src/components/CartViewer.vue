<template>
  <v-container>
    <v-row class="d-flex justify-space-around">
      <v-col cols="12" sm="12" md="12" lg="9" xl="6">
        <v-card flat outlined class="cart-wrapper" v-if="cart.length > 0">
          <v-row class="cart cart-header font-weight-bold">
            <v-col cols="6">
              Product
            </v-col>
            <v-col cols="6">
              Quantity
            </v-col>
          </v-row>
          <v-row class="cart cart-info my-6" v-for="(item, i) in cart" :key="i">
            <v-col cols="6">
              {{ item.title }}
            </v-col>
            <v-col cols="6">
              {{ item.quantity }}
            </v-col>
          </v-row>
        </v-card>
        <v-card
          flat
          outlined
          class="cart-wrapper pa-8 d-flex justify-center"
          v-else
        >
          <div>
            Cart is empty :(
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import userSelection from "@/models/userSelection";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class ProductViewer extends Vue {
  get cart(): userSelection[] {
    return this.$store.getters.getCart;
  }
}
</script>
<style lang="scss">
.cart-wrapper {
  padding-right: 1rem;

  .cart {
    .col {
      text-align: center;
    }

    &.cart-header {
      padding-left: 0.8rem;
      padding-top: 0.7rem;

      .col {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &.cart-info {
      padding-left: 0.8rem;
      .col {
        padding: 0.2rem 0.5rem;
      }
    }
  }
}
</style>