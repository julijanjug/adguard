<template>
	<header
		class="w-full py-4 bg-white shadow-md flex justify-between items-center px-8"
	>
		<router-link
			to="/"
			class="text-2xl font-bold"
			@click.prevent="navigateTo('/')"
		>
			HANNAH
		</router-link>
		<router-link
			to="/help"
			class="text-gray-500"
			@click.prevent="navigateTo('/help')"
		>
			Help
		</router-link>
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

<style scoped></style>
