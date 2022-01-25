<template>
  <va-card class="d-flex dashboard-contributors-list">
    <va-card-title>
      <h1>Receivers list</h1>
      <div class="mr-0 text-right">
        <a
          class="mr-0 link"
          @click="loadReceiversList"
        >
          Reload
        </a>
      </div>
    </va-card-title>

    <va-card-content>
      <va-inner-loading :loading="loading" style="width: 100%;">
        <div
          class="mb-3"
          v-for="(receiver, idx) in receivers" 
          @click="updateSelectedReceiver(receiver)"
          :key="idx"
        >
          <!-- <va-progress-bar
            :modelValue="getPercent(receivers.contributions)"
            :color="getProgressBarColor(idx2)"
          >
            {{ contributor.contributions }} {{ $t('dashboard.charts.commits') }}
          </va-progress-bar> -->
          <a class="mt-2 link">{{ receiver.label }}</a>
          <!-- <p class="mt-2">ID: {{ receiver.id }}</p> -->
        </div>
      </va-inner-loading>
    </va-card-content>
  </va-card>
</template>

<script>

import { useGlobalConfig } from 'vuestic-ui'
import { mapState } from "vuex";
import store from "@/store"

export default {
  name: 'Receiver List',
  data () {
    return {
      loading: true,
      visibleList: []
    }
  },
  mounted () {
    this.loadReceiversList()
  },
  computed: {
    ...mapState([
      "receivers"
    ]),
    theme() {
      return useGlobalConfig().getGlobalConfig().colors
    }
  },
  methods: {
    loadReceiversList() {
      // console.log(this.receivers)
      this.loading = true;
      store.dispatch("fetchReceivers")
      this.loading = false;
    },
    updateSelectedReceiver(receiver){
      this.$store.commit("setSelectedReceiver", receiver);
      // this.$store.dispatch("setSelectedReceiver", receiver)
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-contributors-list {
  flex-direction: column;

  .inner-loading {
    height: 100%;
  }
}
</style>
