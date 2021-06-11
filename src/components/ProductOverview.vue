<template>
  <div class="home d-flex flex-column">
    <div class="d-flex flex-wrap new-options mx-12">
      <v-card
        v-for="(type, i) in productTypes"
        :key="i"
        width="400"
        class="ma-8 product-type"
        @mouseover="type.hover = true"
        @mouseleave="type.hover = false"
        :style="hoverStyle(type.hover, type.hoverColor)"
        @click="toProduct(type.slug)"
        tabindex="0"
      >
        <v-card-title class="justify-center">
          {{ type.displayName }}
        </v-card-title>
        <div class="text-center">
          <v-icon class="new-icon">{{ type.icon }}</v-icon>
        </div>
      </v-card>
    </div>
    <div>&nbsp;</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator"
import productType from "@/models/productType"

@Component
export default class ProductHome extends Vue {
  private productTypes: productType[] = [
    {
      slug: "businesscards",
      displayName: "Visitekaartjes",
      icon: "mdi-card-account-details-outline",
      hover: false,
      hoverColor: "#C8E6C9"
    },
    {
      slug: "flyers",
      displayName: "Flyers",
      icon: "mdi-helicopter",
      hover: false,
      hoverColor: "#FFCDD2"
    },
    {
      slug: "posters",
      displayName: "Posters",
      icon: "mdi-image",
      hover: false,
      hoverColor: "#BBDEFB"
    }
  ]

  private hoverStyle(hover: boolean, color: string) {
    return hover 
      ? {
        boxShadow: `0 0 2.5rem ${color}`
      } as CSSStyleDeclaration
      : {}
  }

  private toProduct(slug: string) {
    this.$router.push(`/product/${slug}`)
  }
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  justify-content: space-evenly;

  .new-options {
    justify-content: space-evenly;
  }

  .new-icon {
    font-size: 12.5rem;
    color: #234;
  }
}
</style>
