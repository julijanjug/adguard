<template>
	<div class="min-h-screen flex flex-col items-center justify-center">
		<TopHeader />

		<main class="flex flex-col items-center justify-center flex-grow px-8 py-12">
			<h1 class="text-4xl font-bold mb-4 text-center">
				Real time creative compliance scanning and monitoring
			</h1>
			<p class="text-gray-700 mb-8 text-center">
				Scan your Ad tag to learn if it meets the desired compliance standards.
			</p>
			<div class="w-full max-w-3xl mt-6">
				<textarea v-model="tag"
					placeholder="Paste the generated tag here and select the guideline before clicking the 'Start AdGuard Scan' button."
					class="w-full h-80 p-4 rounded-lg focus:outline-none focus:ring-2 text-gray-700 resize-none bg-fog-gray placeholder-center"></textarea>
			</div>
			<div class="w-full max-w-3xl flex justify-between items-center mt-2">
				<CustomDropdown :value="selectedOption" @option-selected="handleOptionSelected"></CustomDropdown>
				<button @click="startScan"
					:class="{ 'bg-purple-500 cursor-pointer': !isButtonDisabled, 'bg-gray-400 cursor-not-allowed': isButtonDisabled }"
					:disabled="isButtonDisabled || scanInProgress"
					class="flex items-center text-white text-sm py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2 w-4/12">
					<svg v-if="!scanInProgress" class="h-5 w-5 mr-1 flex-shrink-0" viewBox="0 -1 18 18" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_37_170)">
							<path fill-rule="evenodd" clip-rule="evenodd"
								d="M2 0L3 2L2 4L4 3L6 4L5 2L6 0L4 1L2 0ZM12 4L14 3L16 4L15 2L16 0L14 1L12 0L13 2L12 4ZM12 14L13 12L12 10L14 11L16 10L15 12L16 14L14 13L12 14ZM8.93918 4.93899L6.29248 7.58569L8.4138 9.70701L11.0605 7.06031L8.93918 4.93899ZM0.000732422 13.8784L5.58688 8.29227L7.7082 10.4136L2.12205 15.9997L0.000732422 13.8784Z"
								fill="white" />
						</g>
						<defs>
							<clipPath id="clip0_37_170">
								<rect width="16" height="16" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<svg v-if="scanInProgress" class="animate-spin h-5 w-5 mr-1 flex-shrink-0" viewBox="0 0 24 24"
						fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
						</path>
					</svg>
					<span class="ml-1">{{ scanInProgress ? 'Scanning...' : 'Start AdGuard Scan' }}</span>
				</button>
			</div>
			<div v-if="validationError" class="text-red-500 mt-2">{{ validationError }}</div>
		</main>
	</div>
</template>

<script>
import TopHeader from "./../components/TopHeader.vue";
import CustomDropdown from "./../components/CustomDropdown.vue";

export default {
	name: "HomeView",
	components: {
		TopHeader,
		CustomDropdown,
	},
	data() {
		return {
			tag: '',
			validationError: '',
			selectedOption: null,
			scanInProgress: false,
		};
	},
	computed: {
		isButtonDisabled() {
			return !(this.tag && this.selectedOption);
		}
	},
	methods: {
		startScan() {
			if (!this.tag) {
				this.validationError = 'Please enter a tag before starting the scan. (use "test")';
				return;
			}
			if (!this.selectedOption) {
				this.validationError = 'Please select a guideline before starting the scan.';
				return;
			}

			// Set scan in progress
			this.scanInProgress = true;

			// Simulate a delay of 1 second
			setTimeout(() => {
				this.validationError = '';
				this.scanInProgress = false;
				this.$router.push({ name: "Compliance", params: { id: this.tag, guideline: this.selectedOption.value } });
			}, 1200);
		},
		handleOptionSelected(option) {
			this.selectedOption = option;
		}

	},
};
</script>

<style scoped>
.placeholder-center::placeholder {
	text-align: center;
	transform: translateY(8rem) translateX(9rem);
	width: 60%;
}

</style>
