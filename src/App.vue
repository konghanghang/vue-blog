<template>
  <div id="app" :class="$store.state.dot ? 'main-loading' : ''">
  	
  	<loading></loading>
  	<mainNav v-if="!$route.meta.login"></mainNav>
  	
  	<div class="main-container">
  		<div class="main">
        <router-view/>
      </div>
  	</div>
  	
  	<music></music>

    <div class="wrapper">
        <a class="logo" href="#">Chase</a>
        <div class="footer-left">
            <p class="copyright">Copyright 2020 &copy; 备案号： <a href="http://www.beian.miit.gov.cn/" target="_blank" title="粤ICP备18128459号-1">粤ICP备18128459号-1</a></p>
            <p class="footer-links"><a href="#">Contact Us</a> I <a href="#">Terms &amp; Conditions</a> I<a href="#">Privacy</a></p>
        </div>
        <!-- <div class="footer-right">
            <a href="#" class="social facebook">Facebook</a>
            <a href="#" class="social twitter">Facebook</a>
            <a href="#" class="social google">Facebook</a>
        </div> -->
        <div class="clear"></div>
    </div>

  	<div v-if="$store.state.dot" class="mask">
      <div class="rotate-loading">
        <div class="rotate-loading2">
          <div class="dot-box">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	
import mainNav from './components/nav'
import footer from './components/footer'
import loading from './components/loadingBar'
import music from './components/music'

export default {
  name: 'app',
  components: {
    mainNav,
    footer,
		loading,
    music
	},
	created() {
	}
}
</script>

<style lang="scss">
@import './assets/css/common.css';

.main-container {
	padding-top: 60px;
	width: 100%;
	
	.main {
		padding: 0 20px;
		width: 100%;
		max-width: 1000px;
		margin: auto;
		min-height: calc(100vh - 60px);
	}
}

.main-loading {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to bottom left,
    #6fc7b5 0%,
    #13bdce 20%,
    #0094d9 40%,
    #5a3694 60%,
    #ee4d74 80%,
    #f58c58 100%
  );
  background-size: 600%;
  background-position: 100% 0%;
  animation: gradient 7s ease-in-out infinite;
  z-index: 9999;
  
  .rotate-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border-top: 8px solid transparent;
    border-left: 8px solid #fff;
    border-right: 8px solid #fff;
    border-bottom: 8px solid transparent;
    animation: rotate 5s linear infinite;
    
    .rotate-loading2 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border-left: 8px solid transparent;
      border-top: 8px solid #fff;
      border-bottom: 8px solid #fff;
      border-right: 8px solid transparent;
      animation: rotate 2.5s linear infinite reverse;
      
      .dot-box {
        position: relative;
        width: 30px;
        height: 30px;
        
        .bounce1, .bounce2 {
          position: absolute;
          background-color: #fff;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: .7;
          top: 0;
          left: 0;
          -webkit-animation: bounce 3s infinite ease-in-out;
          animation: bounce 3s infinite ease-in-out;
        }
        
        .bounce2 {
          -webkit-animation-delay: -1s;
          animation-delay: -1s;
        }
      }
    }
  }
}

@keyframes bounce {
  0%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  50% {
      -webkit-transform: scale(1);
      transform: scale(1);
  }
}

@keyframes gradient {
  50% {
    background-position: 0% 100%;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
