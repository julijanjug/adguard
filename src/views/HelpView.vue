<template>
	<div
		class="min-h-screen flex flex-col items-center justify-center"
	>
		<TopHeader />
		<main class="flex flex-col items-center justify-center flex-grow px-8">
			<h1 class="text-3xl font-bold mb-4 text-center">Need help?</h1>
			<p class="text-gray-700 mb-8 text-center">Too bad. You're on your own.</p>
		</main>
	</div>
</template>

<script>
import TopHeader from "./../components/TopHeader.vue";

export default {
	name: "HelpView",
	components: {
		TopHeader,
	},
};
</script>

<style scoped>
/* Add any additional custom styles here */
</style>
