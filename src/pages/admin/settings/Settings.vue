<template>
  <div>
    <div class="row row-equal">
      <va-card class="flex xs12 md6 lg6">
        <va-card-title>
          <h1>Genaral Configuration</h1>
        </va-card-title>

        <va-card-content>
          <div class="flex" prop="rioTag">
            <va-input v-model="cyanviewPrimaryTag" label="Rio Tag"></va-input>
          </div>
          <div class="flex" prop="secondaryTag">
            <va-input v-model="cyanviewSecondaryTag" label="Secondary Tag"></va-input>
          </div>
          <div class="flex" prop="nmosControlEndpoint">
            <va-input v-model="nmosControlEndpoint" label="Nmos Camera Control Endpoint"></va-input>
          </div>
          <div class="flex" prop="nmosRegistryEndpoint">
            <va-input v-model="nmosRegistryEndpoint" label="Nmos Registry Endpoint"></va-input>
          </div>
          <div class="flex" prop="nmosGainEndpoint">
            <va-input v-model="nmosGainEndpoint" label="Nmos Gain Endpoint"></va-input>
          </div>
          <div class="flex" prop="nmosExposureEndpoint">
            <va-input v-model="nmosExposureEndpoint" label="Nmos Exposure Endpoint"></va-input>
          </div>
          <div class="flex" prop="videoSourceAddress">
            <va-input v-model="videoSourceAddress" label="Video Control Source Address"></va-input>
          </div>
          <va-divider />
          <div class="text--secondary">Auto-saved no need to refresh</div>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "dashboard",
  components: {},
  computed: {
    cyanviewPrimaryTag: {
      get() {
        return this.$store.state.cyanviewPrimaryTag;
      },
      set(value) {
        this.$store.commit("changeCyanviewPrimaryTag", value);
      },
    },
    cyanviewSecondaryTag: {
      get() {
        return this.$store.state.cyanviewSecondaryTag;
      },
      set(value) {
        this.$store.commit("changeCyanviewSecondaryTag", value);
      },
    },
    nmosControlEndpoint: {
      get() {
        return this.$store.state.nmosControlEndpoint;
      },
      set(value) {
        this.$store.commit("changeNmosControlEndpoint", value);
      },
    },
    nmosRegistryEndpoint: {
      get() {
        return this.$store.state.nmosRegistryEndpoint;
      },
      set(value) {
        this.$store.commit("changeNmosRegistryEndpoint", value);
      },
    },
    nmosGainEndpoint: {
      get() {
        return this.$store.state.nmosGainEndpoint;
      },
      set(value) {
        this.$store.commit("changeNmosGainEndpoint", value);
      },
    },
    nmosExposureEndpoint: {
      get() {
        return this.$store.state.nmosExposureEndpoint;
      },
      set(value) {
        this.$store.commit("changeNmosExposureEndpoint", value);
      }
    },
    videoSourceAddress: {
      get() {
        return this.$store.state.videoSourceAddress;
      },
      set(value) {
        this.$store.commit("changeVideoSourceAddress", value);
      }
    }
  },
};
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
