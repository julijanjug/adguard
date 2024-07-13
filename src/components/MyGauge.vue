<template>
	<v-container class="flex flex-col items-center justify-center">
		<v-progress-circular
			:model-value="animatedValue"
			:size="150"
			:width="30"
			:rotate="-90"
			:color="gaugeColor"
			bg-color="#hhhhhh"
		>
			<template v-slot:default>{{ animatedValue }} / 100</template>
		</v-progress-circular>
	</v-container>
</template>

<script>
export default {
	name: "MyGauge",
	props: {
		value: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			animatedValue: 0,
			animationStartTime: null,
			animationDuration: 2000, // Duration in milliseconds
		};
	},
	computed: {
		gaugeColor() {
			if (this.animatedValue >= 80) return "success";
			if (this.animatedValue >= 50) return "warning";
			return "error";
		},
	},
	mounted() {
		// Start the animation when the component mounts
		this.animateGauge();
	},
	methods: {
		animateGauge() {
			this.animationStartTime = Date.now();
			this.animateValue();
		},
		animateValue() {
			const currentTime = Date.now();
			const elapsedTime = currentTime - this.animationStartTime;

			// Use cubic easing function for smooth animation
			const easing = this.easingFunction(elapsedTime / this.animationDuration);

			// Calculate animated value based on easing
			this.animatedValue = Math.round(this.value * easing);

			// Continue animation until duration is reached
			if (elapsedTime < this.animationDuration) {
				requestAnimationFrame(this.animateValue);
			} else {
				// Ensure final value is exact
				this.animatedValue = this.value;
			}
		},
		easingFunction(t) {
			// Cubic easing function: easeInOutCubic
			if ((t /= 0.5) < 1) return 0.5 * t * t * t;
			return 0.5 * ((t -= 2) * t * t + 2);
		},
	},
};
</script>

<style scoped>
.text-center {
	text-align: center;
}
</style>
