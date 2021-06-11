<template>
  <v-container>
    <v-snackbar
      class="snack-bar"
      v-model="show"
      :color="color"
      :timeout="timeout"
    >
      <div class="d-flex justify-space-between">
        <div class="snackbar-message">
          <div
            v-for="(message, i) in messages"
            :key="i"
            class="snackbar-content"
          >
            {{ message }}
          </div>
        </div>
        <v-btn text @click="show = false" class="snackbar-close">Close</v-btn>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {
  private show = false;
  private messages: string[] = [];
  private color = "";
  private timeout = 5000;

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/showMessage") {
        if (this.messages.length >= 4) this.messages.pop();
        this.messages.push(state.snackbar.content);
        this.color = state.snackbar.color;
        this.show = true;
        this.timeout = this.timeout === 5000 ? 5001 : 5000;
      }
    });
  }

  @Watch("show")
  onPropertyChanged() {
    if (!this.show) this.messages = [];
  }
}
</script>
<style lang="scss">
.snack-bar {
  margin-bottom: 2rem;

  .v-snack__content {
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  }

  .snackbar-message {
    padding-top: 0.5rem;
    font-size: 1rem;

    .snackbar-content {
      padding-bottom: 1rem;
      padding-top: 0.5rem;
    }
  }

  .snackbar-close {
    margin: auto 0;
  }
}
</style>
