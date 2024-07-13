<template>
	<div
		class="min-h-screen flex flex-col items-center justify-center bg-gray-100"
	>
		<TopHeader />

		<main class="flex flex-col items-center justify-center flex-grow px-8">
			<h1 class="text-3xl font-bold mb-4 text-center">
				Real time accessibility scanning and monitoring
			</h1>
			<p class="text-gray-700 mb-8 text-center">
				Scan your generated tag to learn if it meets conformance standards.
			</p>
			<div
				class="flex items-center w-full max-w-md bg-white p-2 rounded-lg shadow"
			>
				<input
					type="text"
					placeholder="Paste tag"
					class="w-full p-3 border-0 rounded-l-lg focus:outline-none focus:ring-0 text-gray-600 h-12"
				/>
				<button
					@click="startScan"
					class="flex items-center bg-purple-500 text-white text-sm py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 max-w-full w-[80%]"
				>
					<svg
						class="h-5 w-5 mr-1 flex-shrink-0"
						viewBox="0 -1 18 18"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_37_170)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M2 0L3 2L2 4L4 3L6 4L5 2L6 0L4 1L2 0ZM12 4L14 3L16 4L15 2L16 0L14 1L12 0L13 2L12 4ZM12 14L13 12L12 10L14 11L16 10L15 12L16 14L14 13L12 14ZM8.93918 4.93899L6.29248 7.58569L8.4138 9.70701L11.0605 7.06031L8.93918 4.93899ZM0.000732422 13.8784L5.58688 8.29227L7.7082 10.4136L2.12205 15.9997L0.000732422 13.8784Z"
								fill="white"
							/>
						</g>
						<defs>
							<clipPath id="clip0_37_170">
								<rect width="16" height="16" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<span class="ml-1"> Start AdGuard Scan </span>
				</button>
			</div>
		</main>
	</div>
</template>

<script>
import TopHeader from "./../components/TopHeader.vue";

export default {
	name: "HomeView",
	components: {
		TopHeader,
	},
	methods: {
		startScan() {
			this.$router.push({ name: "Scan" });
		},
	},
};
</script>

<style>
/* Add any additional custom styles here */
</style>
