<template>
	<header
		class="w-full py-4 bg-white shadow-md flex justify-between items-center px-8"
	>
		<router-link to="/" class="text-2xl font-bold" @click.prevent="navigateHome"
			>HANNAH</router-link
		>
		<a href="#" class="text-gray-500">Help</a>
	</header>
</template>

<script>
import { useRouter } from "vue-router";

export default {
	name: "TopHeader",
	setup() {
		const router = useRouter();

		const navigateHome = () => {
			router.push({ path: "/" }); // Replace '/' with your home route if it's different
		};

		return {
			navigateHome,
		};
	},
};
</script>

<style scoped>
/* Add any scoped styles here */
</style>
