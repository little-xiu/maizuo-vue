<template>
<app-content id="my-content">
	<form class="ipt-wrap">
		<div class="ipt-box">
   		<input type="text" placeholder="输入手机号码" class="ipt">
			<div class="ipt-bg"></div>
		</div>
		<div class="ipt-box">
   		<input type="text" placeholder="输入验证码" class="ipt">
			<div class="ipt-bg"></div>
		</div>
		<div class="btn-wrap">
   		<button class="login-btn">登录</button>
		</div>
  </form>
</app-content>
</template>
<style scoped>
	#my-content {
		background-color: #f6f6f6;
	}
	.ipt-wrap {
		padding: 0rem .62rem 0rem .62rem;
	}
	.ipt-box {
		position: relative;
		margin-top: .62rem;
	}
	.ipt-bg {
		position: absolute;
		top: 20px;
    height: 12px;
    width: 100%;
    border: 1px solid #c4c4c4;
    border-top: none;
	}
	.ipt {
		background-color: #f6f6f6;
		display: block;
    width: 100%;
    height: 32px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    box-sizing: border-box;
	}
	.btn-wrap {
		text-align: center;
	}
	.login-btn {
		width: 163px;
		background-color: #fe8233;
		color: #fff;
		border: none;
		border-radius: 36px;
		margin-top: 1.6rem;
		padding: 8px 12px;
		font-size: 15px;
		outline: none;
	}
</style>