<template>
    <div class="min-h-screen flex flex-col items-center">
        <TopHeader />
        <ActionBar v-if="placementInfo" :placementInfo="placementInfo"></ActionBar>
        <main class="flex flex-col items-center justify-center flex-grow px-8">
            <v-row class="mt-4 w-full max-w-7xl justify-center">
                <v-col cols="12" v-if="!placementInfo && fetchError">
                    <v-card class="w-full text-center shadow-lg rounded-lg border border-fog-gray ">
                        <v-card-text class="text-xl text-gray-600">
                            Sorry, this creative wasn't found.
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="10" v-if="placementInfo">
                    <v-row v-if="alertMessage">
                        <v-col cols="12">
                            <AlertBanner :alertMessage="alertMessage" class="bg-danger-red rounded-md" />
                        </v-col>
                    </v-row>
                    <v-row class="mt-2">
                        <v-col>
                            <v-card class="h-100 shadow-lg rounded-lg border border-fog-gray">
                                <v-card-title class="pb-2">{{ totalTests }} Test run</v-card-title>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="6">
                                            <MyGauge :value="passedRate" :size="100" :width="20">
                                                <template v-slot:default> {{ passedRate }}% </template>
                                            </MyGauge>
                                            <div class="text-center">{{ passedCount }} passed</div>
                                        </v-col>
                                        <v-col cols="6">
                                            <MyGauge :value="failedRate" :size="100" :width="20">
                                                <template v-slot:default> {{ failedRate }}% </template>
                                            </MyGauge>
                                            <div class="text-center">{{ failedCount }} failed</div>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col>
                            <v-card class="h-100 shadow-lg rounded-lg border border-fog-gray">
                                <v-card-title class="pb-2">Criteria</v-card-title>
                                <v-card-text class="mt-2 mx-2">
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <MyLinearGauge :value="accessibilityRate" color="error" />
                                            <span class="mt-1 block">Accessibility: {{ accessibilityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <MyLinearGauge :value="brandSafetyRate" color="error" />
                                            <span class="mt-1 block">Brand safety: {{ brandSafetyRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <MyLinearGauge :value="adSizeFormatRate" color="error" />
                                            <span class="mt-1 block">Ad size and format: {{ adSizeFormatRate }}%</span>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col>
                            <v-card class="h-100 shadow-lg rounded-lg border border-fog-gray">
                                <v-card-title class="pb-2">Severity</v-card-title>
                                <v-card-text class="mt-2 mx-2">
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <MyLinearGauge :value="highSeverityRate" color="warning" />
                                            <span class="mt-1 block">High: {{ highSeverityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <MyLinearGauge :value="midSeverityRate" color="warning" />
                                            <span class="mt-1 block">Mid: {{ midSeverityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <MyLinearGauge :value="lowSeverityRate" color="warning" />
                                            <span class="mt-1 block">Low: {{ lowSeverityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>

                    <hr class="mb-4 mt-6 border-t border-gray-300">
                    <v-row class="flex items-center justify-between mb-1">
                        <v-col cols="auto">
                            <h3 class="text-xl font-semibold">Requirements</h3>
                        </v-col>
                        <v-col cols="auto" class="text-right mr-1">
                            <MyButton buttonText="Export">
                                <template v-slot:icon>
                                    <svg class="h-3 w-3 mr-2 flex-shrink-0" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M8.5 1C8.22386 1 8 1.22386 8 1.5C8 1.77614 8.22386 2 8.5 2H13.2929L7.14645 8.14645C6.95118 8.34171 6.95118 8.65829 7.14645 8.85355C7.34171 9.04882 7.65829 9.04882 7.85355 8.85355L14 2.70711V7.5C14 7.77614 14.2239 8 14.5 8C14.7761 8 15 7.77614 15 7.5V1.5C15 1.22386 14.7761 1 14.5 1H8.5ZM2.5 4.5C2.22386 4.5 2 4.72386 2 5V13.5C2 13.7761 2.22386 14 2.5 14H11C11.2761 14 11.5 13.7761 11.5 13.5V9.25C11.5 8.97386 11.7239 8.75 12 8.75C12.2761 8.75 12.5 8.97386 12.5 9.25V13.5C12.5 14.3284 11.8284 15 11 15H2.5C1.67157 15 1 14.3284 1 13.5V5C1 4.17157 1.67157 3.5 2.5 3.5H6.75C7.02614 3.5 7.25 3.72386 7.25 4C7.25 4.27614 7.02614 4.5 6.75 4.5H2.5Z"
                                            fill="#454555" />
                                    </svg>
                                </template>
                            </MyButton>
                        </v-col>
                    </v-row>
                    <!-- Compliance Issues List -->
                    <div class="overflow-hidden rounded-lg border shadow-lg">
                        <v-card class="mt-0 first:mt-2 rounded-none border-b" v-for="(issue, index) in issues"
                            :key="issue.title">
                            <!-- Custom top bar with smaller height, custom color, and centered content -->
                            <div class="bg-fog-gray text-gray-800 h-10 flex items-center justify-between cursor-pointer"
                                :class="{ 'border-b': isCardOpen[index] }" @click="toggleCard(index)">
                                <div class="flex items-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" class="ml-4">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M8 1C8.36699 1 8.7045 1.20102 8.87929 1.52372L15.3793 13.5237C15.5471 13.8336 15.5395 14.2089 15.3592 14.5117C15.1788 14.8145 14.8524 15 14.5 15H1.5C1.14758 15 0.821187 14.8145 0.640849 14.5117C0.46051 14.2089 0.452859 13.8336 0.620708 13.5237L7.12071 1.52372C7.2955 1.20102 7.63301 1 8 1ZM7 10V5H9V10H7ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                            fill="#FF3448" />
                                    </svg>
                                    <div class="ml-2 text-sm">{{ issue.title }}</div>
                                </div>
                                <svg :class="{ 'rotate-90': !isCardOpen[index] }" width="16" height="16"
                                    viewBox="0 0 16 16" fill="none" class="mr-4" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.64645 5.64645C3.84171 5.45118 4.15829 5.45118 4.35355 5.64645L8 9.29289L11.6464 5.64645C11.8417 5.45118 12.1583 5.45118 12.3536 5.64645C12.5488 5.84171 12.5488 6.15829 12.3536 6.35355L8.35355 10.3536L8 10.7071L7.64645 10.3536L3.64645 6.35355C3.45118 6.15829 3.45118 5.84171 3.64645 5.64645Z"
                                        fill="#818391" />
                                </svg>
                            </div>

                            <!-- Card content (conditionally rendered based on toggle state) -->
                            <v-card-text v-if="isCardOpen[index]">
                                <div><strong>Issue:</strong> {{ issue.issue }}</div>
                                <div><strong>Recommendation:</strong> {{ issue.recommendation }}</div>
                            </v-card-text>
                        </v-card>
                    </div>
                </v-col>
            </v-row>
        </main>
    </div>
</template>

<script>
import TopHeader from './../components/TopHeader.vue';
import ActionBar from './../components/ActionBar.vue';
import MyGauge from '@/components/MyGauge.vue';
import MyButton from '@/components/MyButton.vue';
import MyLinearGauge from '@/components/MyLinearGauge.vue';
import AlertBanner from '@/components/AlertBanner.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'ComplianceView',
    components: {
        TopHeader,
        MyGauge,
        MyLinearGauge,
        AlertBanner,
        ActionBar,
        MyButton,
    },
    setup() {
        const route = useRoute();
        const issues = ref([]);
        const placementInfo = ref(null);
        const fetchError = ref(false);

        const alertMessage = ref(0);
        const passedCount = ref(0);
        const failedCount = ref(0);
        const accessibilityRate = ref(0);
        const brandSafetyRate = ref(0);
        const adSizeFormatRate = ref(0);
        const highSeverityRate = ref(0);
        const midSeverityRate = ref(0);
        const lowSeverityRate = ref(0);

        // Array to track open/close state of each card (initialized as true for open by default)
        const isCardOpen = ref([]);

        const totalTests = computed(() => (passedCount.value + failedCount.value));
        const passedRate = computed(() => ((passedCount.value / (passedCount.value + failedCount.value)) * 100).toFixed(0));
        const failedRate = computed(() => ((failedCount.value / (passedCount.value + failedCount.value)) * 100).toFixed(0));

        const fetchIssues = async (id) => {
            try {
                const response = await fetch(`/compliance-issues/${id}.json`);
                if (!response.ok) {
                    throw new Error('Creative not found');
                }
                // eslint-disable-next-line no-debugger
                // debugger;
                const data = await response.json();
                issues.value = data.issues;
                placementInfo.value = data.placementInfo;
                alertMessage.value = data.alertMessage;
                passedCount.value = data.passedCount;
                failedCount.value = data.failedCount;
                accessibilityRate.value = data.accessibilityRate;
                brandSafetyRate.value = data.brandSafetyRate;
                adSizeFormatRate.value = data.adSizeFormatRate;
                highSeverityRate.value = data.highSeverityRate;
                midSeverityRate.value = data.midSeverityRate;
                lowSeverityRate.value = data.lowSeverityRate;

                // Initialize isCardOpen array based on number of issues, all set to true for open by default
                isCardOpen.value = Array(data.issues.length).fill(true);
            } catch (error) {
                fetchError.value = true;
                console.error('Error fetching issues:', error);
            }
        };

        const toggleCard = (index) => {
            // Toggle the boolean value at the specified index
            isCardOpen.value[index] = !isCardOpen.value[index];
        };

        fetchIssues(route.params.id);

        return {
            issues,
            placementInfo,
            totalTests,
            passedRate,
            failedRate,
            alertMessage,
            passedCount,
            failedCount,
            accessibilityRate,
            brandSafetyRate,
            adSizeFormatRate,
            highSeverityRate,
            midSeverityRate,
            lowSeverityRate,
            fetchError,
            toggleCard,
            isCardOpen,
        };
    },
};
</script>

<style scoped>
.text-center {
    text-align: center;
}

.rotate-90 {
    transform: rotate(-90deg);
}
</style>