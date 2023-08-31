<div class="spinner">
	<div />
	<div />
	<div />
	<div />
</div>

<style>
	.spinner {
		position: relative;
		width: 80px;
		height: 80px;
	}

	.spinner div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 6px solid #fed;
		border-radius: 50%;
		animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: #fed transparent transparent transparent;
	}

	.spinner div:nth-child(1) {
		animation-delay: -0.45s;
	}

	.spinner div:nth-child(2) {
		animation-delay: -0.3s;
	}

	.spinner div:nth-child(3) {
		animation-delay: -0.15s;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
