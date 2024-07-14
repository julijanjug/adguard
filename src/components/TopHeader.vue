<template>
	<header class="w-full py-4 bg-white shadow-md sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-8 flex justify-between items-center">
			<router-link to="/" class="text-2xl font-bold" @click.prevent="navigateTo('/')">
				HANNAH
			</router-link>
			<router-link to="/help" class="text-gray-500" @click.prevent="navigateTo('/help')">
				Help
			</router-link>
		</div>
	</header>
</template>

<script>
import { useRouter } from "vue-router";

export default {
	name: "TopHeader",
	setup() {
		const router = useRouter();

		const navigateTo = (path) => {
			router.push(path);
		};

		return {
			navigateTo,
		};
	},
};
</script>

<style scoped>
/* Optional: Add any additional custom styles */
</style>
