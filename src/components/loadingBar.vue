<template>
	<div class="loading">
		<div class="bar" :class="{'start':load === 1,'end':load === 2}"></div>
	</div>
</template>

<script>
	export default {
		computed:{
			load() {
				return this.$store.state.loading
			}
		}
	}
</script>

<style scoped>
	.loading {
		position: fixed;
		width: 100%;
		height: 3px;
		left: 0;
		top: 0;
		z-index: 2000;
	}
	
	.bar {
		position: absolute;
		left: 0;
		top: 0;
		background-color: #13ce66;
		opacity: 1;
	}
	
	.start{
		width: 90%;
		height: 100%;
		animation: loading 6s;
	}
	
	.end{
		width: 100%;
		height: 100%;
		opacity: 0;
		animation: loadend 1s;
	}
	
	@keyframes loading {
		0% {
			width: 0;
		}
		50% {
			width: 80%;
		}
		75%{
			width: 84%;
		}
		90%{
			width: 86%;
		}
		100%{
			width: 90%;
		}
	}
	@keyframes loadend {
		0% {
			opacity: 1;
		}
		30%{
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>