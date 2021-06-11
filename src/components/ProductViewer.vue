<template>
  <v-container>
    <div v-if="currentSelection.sku !== ''" class="ma-4">
      <v-row>
        <v-col
          cols="12"
          xs="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          v-for="(prop, i) in product.properties"
          :key="i"
          class="my-2"
        >
          <v-select
            v-if="prop.slug !== 'size'"
            outlined
            :label="prop.title || prop.slug"
            v-model="currentSelection.properties[i].value"
            :items="prop.options"
            :item-text="prop.name ? 'name' : 'slug'"
            item-value="slug"
            hide-details
          />
          <v-select
            v-else
            outlined
            :label="prop.title"
            v-model="currentSelection.properties[i].value"
            :items="
              prop.options.filter((option, idx) => idx !== customSizeIndex)
            "
            item-text="name"
            item-value="slug"
            hide-details
          >
            <template v-slot:append-item>
              <v-divider />
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="d-flex justify-space-between">
                    <v-checkbox
                      v-model="customSize"
                      label="Custom"
                      color="green"
                      value="Custom"
                      class="mr-2"
                    />
                    <v-text-field
                      v-if="customSize"
                      v-model="currentSelection.properties[i].value"
                      label="?? x ??"
                      placeholder="?? x ??"
                      :hint="customSizeRange"
                    />
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" lg="4" xl="3" class="my-2">
          <v-text-field
            v-model.number="currentSelection.quantity"
            outlined
            type="number"
            label="Quantity"
            min="0"
            :max="product.maxDesigns"
            :hint="`Maximum of ${product.maxDesigns}`"
          />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-center mb-5">
        <v-col cols="12" xs="12" sm="6" md="6" lg="4" xl="3">
          <v-btn
            block
            :disabled="currentSelection.quantity == 0"
            @click="addToCart"
          >
            Add To Cart
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import userSelection from "@/models/userSelection";
import productJson from "@/models/productJson";

@Component
export default class ProductViewer extends Vue {
  private productName = "";
  private currentSelection = new userSelection();
  private customSize = false;
  private customSizeIndex = -1;
  private customSizeRange = "";

  async mounted() {
    this.productName = this.$route.params.productName;
    await this.$store.dispatch("getProductSetToStore", {
      productName: this.productName
    });
    this.currentSelection = {
      ...this.currentSelection,
      sku: this.product.sku,
      properties: this.product.properties.map((p: any) => ({
        slug: p.slug,
        value: ""
      }))
    };
    const sizeIndex = this.product.properties.findIndex(
      (prop: any) => prop.slug === "size"
    );
    this.customSizeIndex = this.product.properties[sizeIndex].options.findIndex(
      (option: any) => option.slug === "custom"
    );
    const customSizeProp = this.product.properties[sizeIndex].options[
      this.customSizeIndex
    ].customSizes;
    this.customSizeRange = `Width from ${customSizeProp.minWidth} - ${customSizeProp.maxWidth} and height from ${customSizeProp.minHeight} - ${customSizeProp.maxHeight}`;
  }

  @Watch("currentSelection", { deep: true })
  limitQuantity(newSelection: userSelection) {
    if (newSelection.quantity > this.product.maxDesigns)
      newSelection.quantity = this.product.maxDesigns;
    if (newSelection.quantity < 0) newSelection.quantity = 0;
  }

  addToCart() {
    const newItem = this.currentSelection;
    let excludeMatch = true;
    for (let i = 0; i < this.product.excludes.length; i++) {
      const excludeParams = this.product.excludes[i] as any[];
      for (let j = 0; j < excludeParams.length; j++) {
        const param = excludeParams[j];
        console.log(newItem.properties);
        const itemProperty = newItem.properties.find(
          (prop: any) => prop.slug === param.property
        );
        if (!itemProperty || !(param.options as any[]).includes(itemProperty.value)) {
          excludeMatch = false;
          break;
        }
        excludeMatch = true;
      }
      if (excludeMatch) {
        this.$store.commit(
          "snackbar/showMessage",
          {
            content: "Item is excluded",
            color: "error"
          },
          {
            root: true
          }
        );
        return;
      }
    }
    newItem.title =
      newItem.quantity == 1
        ? this.product.titleSingle
        : this.product.titlePlural;
    this.$store.dispatch("addItemToCart", { newItem: this.currentSelection });
  }

  get product(): productJson {
    return this.$store.getters.getProduct;
  }
}
</script>