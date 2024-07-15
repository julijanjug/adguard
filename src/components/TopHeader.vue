<template>
	<header class="header w-full py-4 bg-fog-gray border-b sticky top-0 z-50">
		<div class="max-w-12xl mx-auto px-8 flex justify-between items-center h-full">
			<router-link to="/" class="text-2xl font-bold" @click.prevent="navigateTo('/')">
				<svg width="120" height="18" viewBox="0 0 94 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8.68708 13.9986V8.40605H3.05726V13.9799H0V0.0917969H3.05726V5.59113H8.68708V0.0917969H11.7443V13.9799H8.68708V13.9986Z"
						fill="black" />
					<path
						d="M26.1574 14L24.8897 10.8868H19.0175L17.7499 14H14.6367L20.5835 0H23.3984L29.3451 14H26.1574ZM21.9443 3.67244L20.0988 8.18376H23.7898L21.9443 3.67244Z"
						fill="black" />
					<path
						d="M41.9611 13.9993L35.2314 5.1631V13.9993H32.2114V0.0925293H35.045L41.551 8.64912V0.0925293H44.5709V13.9807H41.9611V13.9993Z"
						fill="black" />
					<path
						d="M48.6367 13.9993V0.0925293H51.6567V8.64912L58.1627 0.0925293H60.9776V13.9807H57.9576V5.1631L51.2279 13.9993H48.6367Z"
						fill="black" />
					<path
						d="M75.3878 14L74.1202 10.8868H68.248L66.9804 14H63.8672L69.8139 0H72.6288L78.5756 14H75.3878ZM71.1748 3.67244L69.3292 8.18376H73.0203L71.1748 3.67244Z"
						fill="black" />
					<path
						d="M90.1519 13.9993V8.40678H84.5221V13.9807H81.4648V0.0925293H84.5221V5.59186H90.1519V0.0925293H93.2092V13.9807H90.1519V13.9993Z"
						fill="black" />
				</svg>

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
.header {
	height: 64px;
}
</style>
