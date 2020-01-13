<template>
  <div class="wrapper">
        <a class="logo" href="#">Chase</a>
        <div class="footer-left">
            <p class="copyright">Copyright 2016 &copy; Chase / More Templates <a href="http://www.cssmoban.com/" target="_blank" title="模板之家">模板之家</a> - Collect from <a href="http://www.cssmoban.com/" title="网页模板" target="_blank">网页模板</a></p>
            <p class="footer-links"><a href="#">Contact Us</a> I <a href="#">Terms &amp; Conditions</a> I<a href="#">Privacy</a></p>
        </div>
        <div class="footer-right">
            <a href="#" class="social facebook">Facebook</a>
            <a href="#" class="social twitter">Facebook</a>
            <a href="#" class="social google">Facebook</a>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },
  computed: {
  },

  created() {
    
  },

  methods: {
  }
}
</script>


<style>
.wrapper {
	background: #444;
	margin-top: 0px;
	color: #fff;
	text-align: center;
	padding: 60px 0;
}

a {
    color: #fff;
}

a.logo {
	display: block;
	float: left;
	color: #fff;
	text-indent: -4999px;
	/* background: url(../images/logo-footer.png) no-repeat; */
	margin: 0 0 0 40px;
	padding: 0 0 40px 0;
	width: 56px;
	height: 74px;
}

.footer-left {
	float: left;
	text-align: left;
	margin-top: 5px;
	margin-left: 50px;
}

.footer-right {
	float: right;
	margin-top: 20px;
	text-align: right;
}

p {
	font-size: 17px;
	margin: 5px;
}

p.copyright {
	font-family: 'Arimo', sans-serif;
	text-transform: uppercase;
	font-weight: 700;
}

.footer-links {
	color: #777;
}

.footer-links a {
	color: #777;
	margin: 0 20px;
}

.footer-links a:hover {
	color: #5dae87;
}

.footer-links a:first-of-type {
	margin: 0 20px 0 0;
}

.footer-right a.social {
	display: inline-block;
	width: 44px;
	height: 44px;
	background: no-repeat center;
	text-indent: -4999px;
	overflow: hidden;
	text-align: left;
	background-color: #363636;
	border-radius: 999px;
	margin-left: 10px;
}

.footer-right a.social:hover {
	background-color: #5dae87;
}
</style>