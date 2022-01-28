<template>
  <va-card class="d-flex">
    <va-card-title>
      <h1>{{ selectedReceiver.description }}</h1>
      <div class="mr-0 text-right">
        <va-badge text="connected" color="success" class="mr-4" v-if="connectionStatus"/>
        <va-badge text="disconnected" color="warning" class="mr-4" v-else/>
      </div>
    </va-card-title>

    <va-card-content class="flex">
      <div class="flex md12 sm12 xs12" prop="action">
        <div class="title mb-2">Receiver ID</div>
        <p class="mb-3 topic-result">
          {{ selectedReceiver.id }}
        </p>
        <div class="title mb-2">Device ID</div>
        <p class="mb-3 topic-result">
          {{ selectedReceiver.device_id }}
        </p>

        <div class="title mb-2">Label</div>
        <p class="mb-3 topic-result">
          {{ selectedReceiver.label }}
        </p>
      </div>
      <va-divider />

      <div class="flex md12 sm12 xs12" v-if="compatibleFlows">
        
        <div class="title mb-2">Compatible flows</div>
        <div class="flex md12 sm12 xs12" v-for="(flow) in compatibleFlows" :key="flow.id">
          <div class="title mb-3">{{flow.description}}</div>
          <p class="mb-2 topic-result">
            {{ flow.id }}
          </p>
          <p class="mb-2 topic-result">
            {{ flow.label }}
          </p>
          <p class="mb-2 topic-result">
            {{ flow.event_type }}
          </p>
          <div class="row flex">
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
            </div>
          </div>
        </div>
        
      </div>
    </va-card-content>
  </va-card>
</template>

<script>
import { useGlobalConfig } from "vuestic-ui";
import { mapState } from "vuex";
import flowsService from "@/services/nmos/flowsService.js"
import senderService from "@/services/nmos/sendersService.js"
import devicesService from "@/services/nmos/devicesService.js"
import connectionService from "@/services/nmos/connectionService.js"
import receiversService from '@/services/nmos/receiversService';

export default {
  name: "Selected Receiver",
  props: {
    selectedReceiver: Object
  },
  data() {
    return {
      compatibleFlows: null,
      selectedSender: null,
      loading: false,
      success: false,
      res: "",
      connectionStatus: false
    };
  },
  computed: {
    ...mapState(["nmosRegistryEndpoint"]),
    theme() {
      return useGlobalConfig().getGlobalConfig().colors;
    },
  },
  mounted() {
    this.checkSubscriptionStatus(this.selectedReceiver.id);
    this.loadCompatibleSendersList();
  },
  updated() {
    this.checkSubscriptionStatus(this.selectedReceiver.id)
    this.loadCompatibleSendersList()
  },
  methods: {
    async loadCompatibleSendersList() {
      this.loading = true;
      const rqlQuery = "matches(event_type," + encodeURIComponent(this.selectedReceiver ? this.selectedReceiver.caps.event_types : "null") + ")"
      flowsService.makeRqlQuery(rqlQuery, this.nmosRegistryEndpoint).then(({ flows }) => {
        this.compatibleFlows = flows
      })
      // this.compatibleSenders;
      this.loading = false;
    },
    async clearVar() {
      setTimeout(() => {
        this.success = false;
      }, 1000);
    },
    async doDisconnect() {
      this.loading = true;

      const receiverDevice = await devicesService.getDevice(this.selectedReceiver.device_id, this.nmosRegistryEndpoint)
      const receiverControlURL = receiverDevice.device.controls.find( x => x.type === "urn:x-nmos:control:sr-ctrl/v1.1").href
      
      console.log(receiverControlURL)
      // const receiverDevice = await devicesService.getDevice(this.selectedReceiver.id, this.nmosRegistryEndpoint)
      // const receiverControlURL = receiverDevice.controls.find( x => x.type === "urn:x-nmos:control:events/v1.0").href

      /*
      curl -X PATCH -H 'Content-Type: application/json' 
      http://172.17.0.6:8080/x-nmos/connection/v1.1/single/receivers/37a97123-37d4-53d1-aba3-02a7335b3982/staged 
      -d '{
            "transport_params": [
                {}
            ],
            "activation": {
                "mode": "activate_immediate"
            },
            "master_enable": false
        }
      */
      const connectionPayload = {
        "transport_params": [{}],
        "activation":{"mode":"activate_immediate"},
        "master_enable":false,
      }
      const stagedResult = await connectionService.stageReceiver(this.selectedReceiver.id, receiverControlURL, connectionPayload)
      this.connectionStatus = false;
      this.success = true;
      this.clearVar();
      this.loading = false;
      return stagedResult
    },
    async doConnection(flow) {
      //connect to specific sender
      this.loading = true;
      const rqlQuery = "eq(flow_id," + flow.id + ")"
      const senderQueryResult = await senderService.makeRqlQuery(rqlQuery, this.nmosRegistryEndpoint)
      console.log(senderQueryResult)
      const senderDevice = await devicesService.getDevice(senderQueryResult.senders[0].device_id, this.nmosRegistryEndpoint)
      const senderControlURL = senderDevice.device.controls.find( x => x.type === "urn:x-nmos:control:sr-ctrl/v1.1").href
      
      const receiverDevice = await devicesService.getDevice(this.selectedReceiver.device_id, this.nmosRegistryEndpoint)
      const receiverControlURL = receiverDevice.device.controls.find( x => x.type === "urn:x-nmos:control:sr-ctrl/v1.1").href
      
      console.log(receiverControlURL)
      console.log(senderControlURL)
      // const receiverDevice = await devicesService.getDevice(this.selectedReceiver.id, this.nmosRegistryEndpoint)
      // const receiverControlURL = receiverDevice.controls.find( x => x.type === "urn:x-nmos:control:events/v1.0").href

      const connectionConstraints = await connectionService.getSingleSender(senderQueryResult.senders[0].id, senderControlURL)
      
      /*
      curl -X PATCH -H 'Content-Type: application/json' 
      http://172.17.0.2:8080/x-nmos/connection/v1.1/single/receivers/37a97123-37d4-53d1-aba3-02a7335b3982/staged 
      -d '{
        "transport_params":
          [{"connection_uri":"ws://nmos-cpp-sender-dev:3217/x-nmos/events/v1.0/devices/f316b157-e139-5768-891c-91811de2b0cb",
          "ext_is_07_rest_api_url":"http://nmos-cpp-sender-dev:8080/x-nmos/events/v1.0/sources/be02198a-e693-58e3-bc25-2b44722e6be9",
          "ext_is_07_source_id":"be02198a-e693-58e3-bc25-2b44722e6be9"}],
        "activation":{"mode":"activate_immediate"},
        "master_enable":true,
        "sender_id":"d65deb1d-bf69-5432-ab24-b3d384a99f77"}'
      */
      console.log(connectionConstraints)
      const connectionPayload = {
        "transport_params": [{
          "connection_uri":connectionConstraints.sender[0].connection_uri.enum[0],
          "ext_is_07_rest_api_url":connectionConstraints.sender[0].ext_is_07_rest_api_url.enum[0],
          "ext_is_07_source_id":connectionConstraints.sender[0].ext_is_07_source_id.enum[0]
        }],
        "activation":{"mode":"activate_immediate"},
        "master_enable":true,
        "sender_id":senderService.id
      }
      console.log(connectionPayload);
      const stagedResult = await connectionService.stageReceiver(this.selectedReceiver.id, receiverControlURL, connectionPayload)
      this.connectionStatus = true;
      this.success = true;
      this.clearVar();
      this.loading = false;
      return stagedResult
    },
    checkSubscriptionStatus(receiverId){
      receiversService.getConnectionStatus(receiverId, this.nmosRegistryEndpoint)
        .then(({active}) => {
          this.connectionStatus = active
        })
    }   
  },
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
