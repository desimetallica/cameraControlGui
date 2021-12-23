import { createStore } from 'vuex'

export default createStore({
  strict: true, // process.env.NODE_ENV !== 'production',
  state: {
    isSidebarMinimized: false,
    userName: 'Vasili S',

    cyanviewPrimaryTag: 'cy-rio-15-173',
    cyanviewSecondaryTag: '1ep1mdy',

    nmosControlEndpoint: 'http://172.17.0.7:9999/control',
    nmosRegistryEndpoint: 'http://172.17.0.3:8080/'
  },
  mutations: {
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
    changeNmosRegistryEndpoint(state, newNmosRegistryEndpoint) {
      state.nmosRegistryEndpoint = newNmosRegistryEndpoint
    }
  },
})
