<template>
	<app-content>
		购买
	</app-content>
</template>
<script type="text/javascript">
import {getBuyExTicket} from "../../services/cinemaService.js";
	export default {
		mounted () {
			getBuyExTicket().then(data=>{//需登录才行

			})
		}
	}
</script>