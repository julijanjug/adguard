<template>
	<div
		class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
	>
		<TopHeader />
		<main class="flex flex-col items-center justify-center flex-grow px-8">
			<h1 class="text-3xl font-bold mb-4 text-center">Scan Page</h1>
			<MyGauge value="80" />
			<p class="text-gray-700 mb-8 text-center">
				This is the scan page where scanning will be performed.
			</p>
		</main>
	</div>
</template>

<script>
import MyGauge from "./../components/MyGauge.vue";
import TopHeader from "./../components/TopHeader.vue";

export default {
	name: "ScanView",
	components: {
		MyGauge,
		TopHeader,
	},
	data() {
		return {
			scanValue: 80,
		};
	},
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
