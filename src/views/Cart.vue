<template>
  <CartViewer />
</template>

<script>
import Vue from 'vue'
import { Component } from "vue-property-decorator"
import CartViewer from "@/components/CartViewer.vue"

@Component({
  components: {
    CartViewer
  }
})
export default class Cart extends Vue {}
</script>