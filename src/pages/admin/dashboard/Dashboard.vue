<template>
  <div class="dashboard">
    <div class="row row-equal">
      <div class="flex xs12 lg9">
        <video-component :options="videoOptions"> </video-component>
      </div>

      <div class="flex xs12 md9 lg9">
        <div v-if="connectedReceivers.length != 0">
          <div v-for="(receiver, idx) in connectedReceivers" :key="idx">
            <control-slider :receiver="receiver"> </control-slider>
          </div>  
        </div>
      </div>
    </div>  
  </div>
</template>


<script>
// import ReceiversList from '../../../components/ReceiversList.vue'
import ControlSlider from "@/components/ControlSlider.vue"
import VideoComponent from "@/components/VideoComponent.vue"
import store from "@/store" 
import { mapState } from "vuex"

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
  mounted() {
    store.dispatch("fetchConnectedReceivers")
  },
  computed: {
    ...mapState(["connectedReceivers"]),
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
