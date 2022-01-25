<template>
  <div class="dashboard">
    <div class="row">
      <div class="flex xs12 md6 lg4">
        <!-- <receivers-list/> -->
      </div>
    
      <!-- <div class="flex xs12 md6 lg6">
        <receiver v-if="selectedReceiver != null" :selectedReceiver="selectedReceiver" />
      </div> -->
    </div>
    <!-- <dashboard-charts /> -->
    <!-- <dashboard-info-block />  -->
    <div class="row row-equal">
      <div class="flex xs12 lg9">
        <video-component :options="videoOptions"> </video-component>
      </div>
      <div class="flex xs12 lg9">
        <control-slider :title="gain"> </control-slider>
      </div>
      <div class="flex xs12 lg9">
        <control-slider :title="exposure"> </control-slider>
      </div>
    </div>
  </div>
</template>

<script>
// import ReceiversList from '../../../components/ReceiversList.vue'
import ControlSlider from "@/components/ControlSlider.vue"
import VideoComponent from "@/components/VideoComponent.vue"
import store from "@/store" 

export default {
  name: 'dashboard',
  data() {
    return {
      gain: "Gain",
      exposure: "Exposure",
			videoOptions: {
        fluid: true,
        muted: true,
        autoplay: true,
				controls: true,
				sources: [
					{
						src: store.state.videoSourceAddress,
						type: "application/x-mpegURL"
					}
				]
			}
		};
  },
  components: {
    VideoComponent,
    ControlSlider
  },
  computed: {

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
