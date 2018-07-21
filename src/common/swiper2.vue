<template>
	<div class="swiper-container swiper-container-horizontal" ref="swiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
	</div>
</template>
<script type="text/javascript">
	export default {
		methods: {
			updateSwiper () {
				this.swiper.update();
				this.swiper.slideTo(0,0);
			}
		},
		mounted () {
			this.swiper = new Swiper(this.$refs.swiper,{
				slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 20
			})
		}
	}
</script>