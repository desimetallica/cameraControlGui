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
          :key="idx"
        >
          <!-- <va-progress-bar
            :modelValue="getPercent(receivers.contributions)"
            :color="getProgressBarColor(idx)"
          >
            {{ contributor.contributions }} {{ $t('dashboard.charts.commits') }}
          </va-progress-bar> -->
          <p class="mt-2">{{ receiver.description }}</p>
          <p class="mt-2">ID: {{ receiver.id }}</p>
        </div>
      </va-inner-loading>
    </va-card-content>
  </va-card>
</template>

<script>
import axios from 'axios'
import { useGlobalConfig } from 'vuestic-ui'

export default {
  name: 'ControlButton',
  data () {
    return {
      receivers: [],
      loading: true,
      visibleList: []
    }
  },
  mounted () {
    this.loadReceiversList()
  },
  computed: {
    theme() {
      return useGlobalConfig().getGlobalConfig().colors
    }
  },
  methods: {
    async loadReceiversList () {
      this.loading = true
      const { data } = await axios.get('http://172.17.0.3:8080/x-nmos/query/v1.3/receivers?paging.order=update&paging.limit=10')
      this.receivers = data
      this.loading = false
    }
  },
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
