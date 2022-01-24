<template>
  <va-card class="d-flex">
    <va-card-title>
      <h1>Control Action</h1>
      <div class="mr-0 text-right">
        <a class="mr-0 link" @click="doPost"> Resend </a>
      </div>
    </va-card-title>

    <va-card-content class="flex">
      <va-inner-loading :loading="loading">
        <div class="flex md12 sm12 xs12" prop="action">
          <div class="title mb-2">Topic result</div>
          <p class="mb-3 topic-result">
            {{ cyanviewPrimaryTag }}/{{ cyanviewSecondaryTag }}/{{ action }}
            {{ payload }}
          </p>
          <va-divider />
        </div>
        <div class="flex md12 sm12 xs12" prop="action">
          <va-input
            v-model="action"
            placeholder="action"
            label="action"
          ></va-input>
        </div>
        <div class="flex md12 sm12 xs12" prop="payload">
          <va-input
            v-model="payload"
            placeholder="payload"
            label="payload"
          ></va-input>
        </div>
        <div class="row flex">
          <div>
            <va-button size="small" @click="doPost"> Publish </va-button>
          </div>
          <div>
            <transition name="fade">
              <p class="fade" v-show="success">Sent</p>
            </transition>
          </div>
        </div>
      </va-inner-loading>
    </va-card-content>
  </va-card>
</template>

<script>
import axios from "axios";
import { useGlobalConfig } from "vuestic-ui";
import { mapState } from "vuex";

export default {
  name: "ControlItem",
  data() {
    return {
      action: "camhead/action/mult/export",
      payload: "2.5",
      // receivers: [],
      loading: false,
      // visibleList: []
      success: false,
      res: "",
      badgeTimeout: 1000,
      postCount: 0,
    };
  },
  computed: {
    ...mapState([
      "nmosControlEndpoint",
      "nmosRegistryEndpoint",
      "cyanviewSecondaryTag",
      "cyanviewPrimaryTag"
    ]),
    theme() {
      return useGlobalConfig().getGlobalConfig().colors;
    },
  },
  methods: {
    async loadReceiversList() {
      this.loading = true;
      const { data } = await axios.get(
        this.nmosRegistryEndpoint +
          "x-nmos/query/v1.3/receivers?paging.order=update&paging.limit=10"
      );
      this.receivers = data;
      this.loading = false;
    },
    async clearVar() {
      setTimeout(() => {
        this.success = false;
      }, 1000);
    },
    async doPost() {
      this.loading = true;

      // POST request using axios with async/await
      const topic =
        this.cyanviewPrimaryTag +
        "/" +
        this.cyanviewSecondaryTag +
        "/" +
        this.action +
        "," +
        this.payload;
      const config = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      };
      // axios.put(url, content, config).then(response => {
      //     ...
      // });
      console.log(topic);
      this.res = await axios
        .post(this.nmosControlEndpoint, topic, config)
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
      this.success = true;
      this.clearVar();
      this.loading = false;
    },
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
