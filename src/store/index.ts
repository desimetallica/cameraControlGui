import { createStore } from 'vuex'
import receiversService from "@/services/nmos/receiversService.js"
import sendersService from "@/services/nmos/sendersService.js"

export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {

    selectedReceiver: null,
    receivers: [],
    senders: [],
    isSidebarMinimized: false,
    userName: 'Test User',

    cyanviewPrimaryTag: 'cy-rio-15-173',
    cyanviewSecondaryTag: '1ep1mdy',

    nmosGainEndpoint: 'http://172.17.0.5:9999/gain',
    nmosExposureEndpoint: 'http://172.17.0.5:9999/exposure',
    nmosControlEndpoint: 'http://172.17.0.5:9999/control',
    nmosRegistryEndpoint: 'http://docker-easy-nmos-registry:8080/'
  },
  getters: {

  },
  actions: {
    fetchReceivers({ commit }) {
      return receiversService.getReceivers(this.state.nmosRegistryEndpoint).then(({ receivers }) => {
        commit("setReceivers", receivers)
      })
    },
    fetchSenders({ commit }) {
      return sendersService.getSenders(this.state.nmosRegistryEndpoint).then(({ senders }) => {
        commit("setSenders", senders)
      })
    }
  },
  mutations: {
    setSelectedReceiver(state, receiver){
      state.selectedReceiver = receiver
    },
    setSenders(state, senders) {
      state.senders = senders;
    },
    setReceivers(state, receivers) {
      state.receivers = receivers;
    },
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
    changeUserName(state, newUserName) {
      state.userName = newUserName
    },
    changeCyanviewPrimaryTag(state, newPrimaryTag) {
      state.cyanviewPrimaryTag = newPrimaryTag
    },
    changeCyanviewSecondaryTag(state, newSecondaryTag) {
      state.cyanviewSecondaryTag = newSecondaryTag
    },
    changeNmosControlEndpoint(state, newNmosControlEndpoint) {
      state.nmosControlEndpoint = newNmosControlEndpoint
    },
    changeNmosGainEndpoint(state, newNmosGainEndpoint) {
      state.nmosGainEndpoint = newNmosGainEndpoint
    },
    changeNmosExposureEndpoint(state, newNmosExposureEndpoint) {
      state.nmosExposureEndpoint = newNmosExposureEndpoint
    },
    changeNmosRegistryEndpoint(state, newNmosRegistryEndpoint) {
      state.nmosRegistryEndpoint = newNmosRegistryEndpoint
    }
  },
})
