<template>
  <div class="dashboard">
    <div class="row">
      <div class="flex xs12 md6 lg4">
        <receivers-list/>
      </div>

      <div class="flex xs12 md6 lg6">
        <control-item />
      </div>
    </div>

    <!-- <dashboard-charts /> -->
    <!-- <dashboard-info-block />  -->
    <div class="row row-equal">
      <div class="flex xs12 lg6">
        <!-- <dashboard-tabs @submit="addAddressToMap"/> -->
      </div>
      <div class="flex xs12 lg6">
        <!-- <dashboard-map ref="dashboardMap"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import ControlItem from './ControlItem.vue'
import ReceiversList from './ReceiversList.vue'

// import DashboardTabs from './DashboardTabs'
// import DashboardContributorsList from './DashboardContributorsList.vue'
// import DashboardCharts from './DashboardCharts'
// import DashboardInfoBlock from './DashboardInfoBlock'
// import DashboardMap from './DashboardMap'

export default {
  name: 'dashboard',
  components: {
    // DashboardCharts,
    // DashboardInfoBlock,
    // DashboardTabs,
    // DashboardContributorsList,
    ReceiversList,
    ControlItem,
    // DashboardMap,
  },
  methods: {
    addAddressToMap ({ city, country }) {
      this.$refs.dashboardMap.addAddress({ city: city.text, country })
    },
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
