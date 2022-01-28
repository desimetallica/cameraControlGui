<template>
  <va-card class="d-flex">
    <va-card-title>
      <h1> {{receiver.description}}</h1>
      <div class="mr-0 text-right">
        <va-button size="small" @click="sendCommand"> Send </va-button>
      </div>
    </va-card-title>

    <va-card-content>
      <va-slider class="flex" v-model="value">
        <template>
          <va-input type="number" v-model="value"></va-input>
        </template>
      </va-slider>
    </va-card-content>
    <!-- <div class="row flex">
      <div v-if="!connectionStatus">
        <va-button size="small" @click="doConnection(flow)"> Connect </va-button>
      </div>
      <div v-if="connectionStatus">
        <va-button size="small" @click="doDisconnect(flow)"> Disconnect </va-button>
      </div>
      <div>
        <transition name="fade">
          <p class="fade" v-show="success">Done</p>
        </transition>
      </divgg>
    </div> -->
  </va-card>
</template>

<script>
import cameraControlService from "@/services/nmos/cameraControlService.js"
import { mapState } from "vuex"

export default {
  name: "Control Slider",
  data() {
    return {
      value: 45,
    }
  },
  methods: {
    async sendCommand(){
      if(this.receiver.description == "receiver/gain0"){
        console.log(this.nmosExposureEndpoint)
        return await cameraControlService.updateGain( this.nmosGainEndpoint, this.$data.value )
      } else if( this.receiver.description == "receiver/exposure0") {
        return await cameraControlService.updateExposure( this.nmosExposureEndpoint, this.$data.value )
      } else {
        return 0
      }
    }
  },
  computed: {
    ...mapState(["nmosExposureEndpoint","nmosGainEndpoint"])
  },
  props: {
    receiver: Object,
  }
  
};
</script>


<style scoped lang="scss">
.dashboard-contributors-list {
  flex-direction: column;

  .inner-loading {
    height: 100%;
  }
}
.topic-result {
  word-break: break-all;
  word-break: break-word;
  hyphens: auto;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-active 
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-leave-to, .fade-enter-from
/* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
