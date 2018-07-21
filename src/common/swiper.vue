<template>
	<div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
	</div>
</template>
<script type="text/javascript">
	export default {
		methods: {
			updataSwiper() {
				this.swiper.update();
				this.swiper.reLoop();
				this.swiper.slideTo(1,0);
				this.swiper.startAutoplay();
			}
		},
		mounted () {
			this.swiper = new Swiper(this.$refs.swiper,{
				pagination: '.swiper-pagination',
				loop: true,
				autoplay: 2000,
				autoplayDisableOnInteraction : false,//手动滑动后,又可以继续轮播
			})
		}
	}
</script>