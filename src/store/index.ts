import { createStore } from 'vuex'
import receiversService from "@/services/nmos/receiversService.js"
import sendersService from "@/services/nmos/sendersService.js"

export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    connectedReceivers: [Object],
    selectedReceiver: null,
    receivers: [Object],
    senders: [Object],
    isSidebarMinimized: false,
    userName: 'Test User',

    cyanviewPrimaryTag: 'cy-rio-15-173',
    cyanviewSecondaryTag: '1ep1mdy',

    nmosGainEndpoint: 'http://nmos-cpp-sender-dev:9999/',
    nmosExposureEndpoint: 'http://nmos-cpp-sender-dev:9999/',
    nmosControlEndpoint: 'http://nmos-cpp-sender-dev:9999/',
    nmosRegistryEndpoint: 'http://10.20.1.17:8000/',
    videoSourceAddress: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
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
    },
    fetchEventReceivers({ commit }) {
      const rqlQuery = "eq(caps.media_types," + encodeURIComponent("application/json") + ")"
      return receiversService.makeRqlQuery(rqlQuery, this.state.nmosRegistryEndpoint).then(({ receivers }) => {
        commit("setReceivers", receivers)
      })
    },
    fetchConnectedReceivers({ commit }) {
      const rqlQuery = "and(eq(caps.media_types," + encodeURIComponent("application/json") + "),eq(subscription.active,true))"
      // console.log(rqlQuery)
      return receiversService.makeRqlQuery(rqlQuery, this.state.nmosRegistryEndpoint).then(({ receivers }) => {
        commit("setConnectedReceivers", receivers)
      })
    },
    updateSelecetedReceiver({ commit }, receiver){
      commit("setSelectedReceiver", receiver)      
    }

  },
  mutations: {
    setConnectedReceivers(state, receivers){
      state.connectedReceivers = receivers
    },
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
    },
    changeVideoSourceAddress(state, newVideoSourceAddress) {
      state.videoSourceAddress = newVideoSourceAddress
    }
  },
})
