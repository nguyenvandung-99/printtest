<template>
  <ProductViewer />
</template>

<script>
import Vue from 'vue'
import { Component } from "vue-property-decorator"
import ProductViewer from '@/components/ProductViewer.vue'

@Component({
  components: {
    ProductViewer
  }
})
export default class ViewProduct extends Vue {}
</script>