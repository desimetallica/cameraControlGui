<template>
  <div class="dashboard">
    <div class="row">
      <div class="flex xs12 md6 lg4">
        <receivers-list/>
      </div>
    
      <div class="flex xs12 md6 lg6">
        <receiver v-if="selectedReceiver != null" :selectedReceiver="selectedReceiver" />
      </div>
    </div>

    <div class="row row-equal">
      <div class="flex xs12 lg6">
      </div>
      <div class="flex xs12 lg6">
      </div>
    </div>
  </div>
</template>

<script>
import ReceiversList from '@/components/ReceiversList.vue'
import Receiver from '@/components/Receiver.vue'
import { mapState } from "vuex"

export default {
  name: 'dashboard',

  components: {
    ReceiversList,
    Receiver
  },
  computed: {
    ...mapState([
      "selectedReceiver"
    ]),
  },
  methods: {
    
  },
}
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
       margin-bottom: 10px !important;
      &__title {
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
