<template>
  <ProductOverview />
</template>

<script>
import Vue from 'vue'
import { Component } from "vue-property-decorator"
import ProductOverview from "@/components/ProductOverview.vue"

@Component({
  components: {
    ProductOverview
  }
})
export default class Product extends Vue {}
</script>