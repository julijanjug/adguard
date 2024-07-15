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
			<div class="w-full max-w-3xl mt-6 relative">
				<textarea v-model="tag"
					placeholder="Paste the generated tag here and select the guideline before clicking the 'Start AdGuard Scan' button."
					class="w-full h-80 p-4 rounded-lg focus:outline-none focus:ring-2 text-gray-700 resize-none bg-fog-gray placeholder-center"
					:class="{ 'blur': scanInProgress }"></textarea>
				<Transition>
					<div v-if="scanInProgress" class="absolute inset-0 flex items-center justify-center anima">
						<div class="text-center">
							<svg class=" h-10 w-10 text-purple-500 mx-auto mb-4" viewBox="0 0 16 16" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g clip-path="url(#clip0_39_50356)">
									<path
										d="M13 6C12.8011 6 12.6103 5.92098 12.4697 5.78033C12.329 5.63968 12.25 5.44891 12.25 5.25C12.25 4.85218 12.092 4.47064 11.8107 4.18934C11.5294 3.90804 11.1478 3.75 10.75 3.75C10.5511 3.75 10.3603 3.67098 10.2197 3.53033C10.079 3.38968 10 3.19891 10 3C10 2.80109 10.079 2.61032 10.2197 2.46967C10.3603 2.32902 10.5511 2.25 10.75 2.25C11.1478 2.25 11.5294 2.09196 11.8107 1.81066C12.092 1.52936 12.25 1.14782 12.25 0.75C12.25 0.551088 12.329 0.360322 12.4697 0.21967C12.6103 0.0790176 12.8011 0 13 0C13.1989 0 13.3897 0.0790176 13.5303 0.21967C13.671 0.360322 13.75 0.551088 13.75 0.75C13.75 1.14782 13.908 1.52936 14.1893 1.81066C14.4706 2.09196 14.8522 2.25 15.25 2.25C15.4489 2.25 15.6397 2.32902 15.7803 2.46967C15.921 2.61032 16 2.80109 16 3C16 3.19891 15.921 3.38968 15.7803 3.53033C15.6397 3.67098 15.4489 3.75 15.25 3.75C14.8522 3.75 14.4706 3.90804 14.1893 4.18934C13.908 4.47064 13.75 4.85218 13.75 5.25C13.75 5.44891 13.671 5.63968 13.5303 5.78033C13.3897 5.92098 13.1989 6 13 6Z"
										fill="#C936EE" />
									<path
										d="M6 16C5.73478 16 5.48043 15.8946 5.29289 15.7071C5.10536 15.5196 5 15.2652 5 15C5 13.9391 4.57857 12.9217 3.82843 12.1716C3.07828 11.4214 2.06087 11 1 11C0.734784 11 0.48043 10.8946 0.292893 10.7071C0.105357 10.5196 0 10.2652 0 10C0 9.73478 0.105357 9.48043 0.292893 9.29289C0.48043 9.10536 0.734784 9 1 9C2.06087 9 3.07828 8.57857 3.82843 7.82843C4.57857 7.07828 5 6.06087 5 5C5 4.73478 5.10536 4.48043 5.29289 4.29289C5.48043 4.10536 5.73478 4 6 4C6.26522 4 6.51957 4.10536 6.70711 4.29289C6.89464 4.48043 7 4.73478 7 5C7 6.06087 7.42143 7.07828 8.17157 7.82843C8.92172 8.57857 9.93913 9 11 9C11.2652 9 11.5196 9.10536 11.7071 9.29289C11.8946 9.48043 12 9.73478 12 10C12 10.2652 11.8946 10.5196 11.7071 10.7071C11.5196 10.8946 11.2652 11 11 11C9.93913 11 8.92172 11.4214 8.17157 12.1716C7.42143 12.9217 7 13.9391 7 15C7 15.2652 6.89464 15.5196 6.70711 15.7071C6.51957 15.8946 6.26522 16 6 16Z"
										fill="#C936EE" />
								</g>
								<defs>
									<clipPath id="clip0_39_50356">
										<rect width="16" height="16" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<p class="text-md text-purple-500">Scanning...</p>
						</div>
					</div>
				</Transition>
			</div>
			<div class="w-full max-w-3xl flex justify-between items-center mt-2">
				<CustomDropdown :value="selectedOption" @option-selected="handleOptionSelected"
					:disabled="scanInProgress"></CustomDropdown>
				<button @click="startScan"
					:class="{ 'bg-purple-500 cursor-pointer': !isButtonDisabled, 'bg-gray-400 cursor-not-allowed': isButtonDisabled }"
					:disabled="isButtonDisabled || scanInProgress"
					class="flex items-center text-white text-sm py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ml-2 w-4/12">
					<!-- Magic wand icon -->
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
					<!-- Spinner icon -->
					<svg v-if="scanInProgress" class="animate-spin h-5 w-5 mr-1 flex-shrink-0" viewBox="0 0 24 24"
						fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
						</circle>
						<path class="opacity-75" fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.96 7.96 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
						</path>
					</svg>
					<span class="ml-1">Start AdGuard Scan</span>
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
				// this.$router.push({ name: "Compliance", params: { id: this.tag, guideline: this.selectedOption.value } });
				this.$router.push({ name: "Compliance", params: { id: 'test', guideline: this.selectedOption.value } });
			}, 2100);
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
.blur {
	filter: blur(2px);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
