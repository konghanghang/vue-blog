<template>
  <transition name="fade">
    <div class="player-box flex align-center" v-show="showPlayer">
      <div @click="show" class="caret-right flex justify-center align-center">
        <i class="el-icon-caret-right"></i>
      </div>
      <iframe
        class="music1"
        frameborder="no" 
        marginwidth="0"
        height=450 
        src="//music.163.com/outchain/player?type=0&id=2192061252&auto=1&height=430">
      </iframe>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  
  computed: {
    showPlayer() {
      return this.$store.state.musicPlayer
    }
  },

  created() {
    
  },

  methods: {
    show() {
      this.$store.commit('setPlayer',false)
    }
  }
};
</script>

<style scoped lang="scss">
.player-box {
  position: fixed;
  z-index: 2000;
}

.player-box {
  right: 30px;
  bottom: 50px;
}
.caret-right {
  width: 40px;
  height: 65px;
  border: 1px solid darkgrey;
  border-radius: 2px;
  cursor: pointer;
  .el-icon-caret-right {
    font-size: 28px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter,.fade-leave-to {
  right: -300px;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>