<template>
  <div class="dashboard">    
    <div class="row">
      <div class="flex xs12">
        <va-card :bordered="false" >
          <va-card-title>Mqtt Config</va-card-title>
          <va-card-content>
            <form ref="configForm" hide-required-asterisk size="small" label-position="top" :model="connection">
              <div class="row">
                <div class="flex md4  xs12" prop="host" >
                  <va-input v-model="connection.host" label="Host"></va-input>
                </div>
                <div class="flex md4  xs12" prop="port" >
                  <va-input v-model.number="connection.port" type="number" placeholder="9001" label="Port"></va-input>
                </div>
                <div class="flex md4  xs12" prop="mountpoint">
                  <va-input v-model="connection.endpoint" placeholder="mountpoint" label="Mountpoint"></va-input>
                </div>
                <div class="flex md4  xs12" prop="clientId" >
                  <va-input v-model="connection.clientId" label="Client ID"></va-input>
                </div>
                <div class="flex md4  xs12" prop="username">
                  <va-input v-model="connection.username" placeholder="Username" label="Username"></va-input>
                </div>
                <div class="flex md4  xs12" prop="password">
                  <va-input v-model="connection.password" placeholder="Password" label="Password"></va-input>
                </div> 
                     
                <div class="flex md4  xs12">        
                  <va-button
                    class="mr-4" 
                    size="small"
                    color="success"
                    :disabled="client.connected"
                    @click="createConnection"
                  > {{ client.connected ? 'Connected' : 'Connect' }} 
                  </va-button> 
                </div>
                <div class="flex md4  xs12">
                  <va-button 
                    :disabled="!client.connected" 
                    color="danger" 
                    size="small" 
                    class="mr-4" 
                    @click="destroyConnection"
                  > Disconnect
                  </va-button>
                </div>
              </div>
            </form>
          </va-card-content>
        </va-card>
        
        <va-card shadow="always" style="margin-bottom:30px;">
          <va-card-title>Subscribe</va-card-title>
          <va-card-content>
            <form ref="subscription" hide-required-asterisk size="small" label-position="top" :model="subscription">
              <div class="row">
                <div class="flex md4 sm6 xs12" prop="topic" >
                  <va-input v-model="subscription.topic" label="topic"></va-input>
                </div>
                <div class="flex md4 sm6 xs12">
                  <va-select
                    label="QoS"
                    v-model="subscription.qos"
                    textBy="label"
                    track-by="value"
                    :options="qosList"
                  />
                </div>
                <div class="flex md4 xs12">        
                  <va-button
                    class="mr-4" 
                    size="small"
                    color="success"
                    :disabled="!client.connected"
                    @click="doSubscribe"
                  > {{ subscribeSuccess ? 'Subscribed' : 'Subscribe' }} 
                  </va-button> 
                </div>
                <div class="flex md4 xs12">
                  <va-button 
                    :disabled="!client.connected" 
                    color="danger" 
                    size="small" 
                    class="mr-4" 
                    @click="doUnSubscribe"
                    v-if="subscribeSuccess"
                  >
                    Unsubscribe
                  </va-button>
                </div> 
              </div>
            </form>
          </va-card-content>
        </va-card>

        <va-card shadow="always" style="margin-bottom:30px;">
          <va-card-title>Publish</va-card-title>
          <va-card-content>
            <form ref="publish" hide-required-asterisk size="small" label-position="top" :model="publish">
              <div class="row">
                <div class="flex md4 sm6 xs12" prop="topic" >
                  <va-input v-model="publish.topic" label="topic"></va-input>
                </div>
                <div class="flex md4 sm6 xs12" prop="payload" >
                  <va-input v-model="publish.payload" label="Payload"></va-input>
                </div>
                <div class="flex md4 sm6 xs12" prop="qos">
                  <va-select
                    label="QoS"
                    v-model="publish.qos"
                    textBy="label"
                    track-by="value"
                    :options="qosList"
                  />
                </div>
                <div class="flex md4 xs12">        
                  <va-button
                    class="mr-4" 
                    size="small"
                    color="success"
                    :disabled="!client.connected"
                    @click="doPublish"
                  > Publish 
                  </va-button> 
                </div>         
              </div>
            </form>
          </va-card-content>      
        </va-card>  

        <va-card>
          <va-card-title>Receive</va-card-title>
          <va-card-content>
            <input type="textarea" :rows="3" style="margin-bottom: 15px" v-model="receiveNews"> 
          </va-card-content>
        </va-card>  

      </div>       
    </div>     
  </div>
</template>

<script>
// import DashboardCharts from './DashboardCharts'
// import DashboardInfoBlock from './DashboardInfoBlock'
// import DashboardTabs from './DashboardTabs'
// import DashboardMap from './DashboardMap'

import mqtt from 'mqtt'
console.log(process.env);

export default {
  name: 'dashboard',
  components: {
    
  },
  data() {
    return {
      connection: {
        host: '10.54.131.158',
        port: 9001,
        endpoint: '/',
        clean: true, // Reserved session
        connectTimeout: 4000, // Time out
        reconnectPeriod: 4000, // Reconnection interval
        // Certification Information
        clientId: 'mqttjs_3be2c321',
        username: '',
        password: '',
      },
      subscription: {
        topic: 'test/topic',
        qos: 0,
      },
      publish: {
        topic: 'test/topic',
        qos: 0,
        payload: '{ "msg": "Hello, I am browser." }',
      },
      receiveNews: '',
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },
  methods: {
    // Create connection
    createConnection() {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      const { host, port, endpoint, ...options } = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        console.log(connectUrl);
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
      })
    },
    doSubscribe() {
      const { topic, qos } = this.subscription
      console.log('Subscribe', topic, qos)
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        this.subscribeSuccess = true
        console.log('Subscribe to topics res', res)
        })
    },
    doUnSubscribe() {
      const { topic } = this.subscription
      console.log('unsubscribe', topic);
      this.client.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
      this.subscribeSuccess = false  
      })
    },
    doPublish() {
      const { topic, qos, payload } = this.publish
      console.log(topic, qos, payload)
      this.client.publish(topic, payload, qos, error => {
        if (error) {
          console.log('Publish error', error)
        }
      })
    },
    destroyConnection() {
      if (this.client.connected) {
        try {
          this.client.end()
          this.client = {
            connected: false,
          }
          console.log('Successfully disconnected!')
        } catch (error) {
          console.log('Disconnect failed', error.toString())
        }
      }
    }
  },
  computed: {
    isConnected() {
      return this.client.connected
    }
  }
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
