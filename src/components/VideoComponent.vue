<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
    name: "VideoPlayer",
    props: {
        options: {
            type: Object,
            default() {
              return {
                videoOptions: {
                  fluid: true,
                  muted: true,
                  autoplay: true,
                  controls: true,
                  sources: [
                    {
                      src: "https://localhost:8888/mystream/index.m3u8",
                      type: "application/x-mpegURL"
                    }
                  ]
                }
              };
            }
        }
    },
    data() {
        return {
            player: null
        }
    },
    mounted() {
        this.player = videojs(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }
}
</script>