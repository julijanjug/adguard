<template>
    <div class="min-h-screen flex flex-col items-center">
        <TopHeader />
        <main class="flex flex-col items-center justify-center flex-grow px-8">
            <v-row class="mt-4 w-full max-w-7xl">
                <v-col cols="12" v-if="!placementInfo">
                    <v-card outlined class="w-full text-center shadow-lg rounded-lg border border-fog-gray">
                        <v-card-text class="text-xl text-gray-600">
                            Sorry, this creative wasn't found.
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="3" v-if="placementInfo">
                    <v-card outlined>
                        <v-card-title>Placement info</v-card-title>
                        <v-card-text>
                            <div>Placement ID: <strong>{{ placementInfo.placementId }}</strong></div>
                            <div>Creative ID: <strong>{{ placementInfo.creativeId }}</strong></div>
                            <div>Ad format: <strong>{{ placementInfo.adFormat }}</strong></div>
                            <div>Creative size: <strong>{{ placementInfo.creativeSize }}</strong></div>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="9" v-if="placementInfo">
                    <v-row v-if="alertMessage">
                        <v-col cols="12">
                            <div
                                class="bg-danger-red text-charcoal h-10 flex items-center justify-between cursor-pointer rounded-md">
                                <div class="flex items-center">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="ml-4"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.8047 4.49133L11.5087 0.195333C11.3837 0.0703004 11.2141 3.77583e-05 11.0373 0L4.96267 0C4.78587 3.77583e-05 4.61633 0.0703004 4.49133 0.195333L0.195333 4.49133C0.0703004 4.61633 3.77583e-05 4.78587 0 4.96267L0 11.0373C3.77583e-05 11.2141 0.0703004 11.3837 0.195333 11.5087L4.49133 15.8047C4.61633 15.9297 4.78587 16 4.96267 16H11.0373C11.2141 16 11.3837 15.9297 11.5087 15.8047L15.8047 11.5087C15.9297 11.3837 16 11.2141 16 11.0373V4.96267C16 4.78587 15.9297 4.61633 15.8047 4.49133ZM14.6667 10.7613L10.7613 14.6667H5.23867L1.33333 10.7613V5.23867L5.23867 1.33333H10.7613L14.6667 5.23867V10.7613Z"
                                            fill="#FF3448" />
                                        <path
                                            d="M10.2085 2.6665H5.79117L2.6665 5.79117V10.2085L5.79117 13.3332H10.2085L13.3332 10.2085V5.79117L10.2085 2.6665ZM9.99984 8.6665H5.99984C5.82303 8.6665 5.65346 8.59627 5.52843 8.47124C5.40341 8.34622 5.33317 8.17665 5.33317 7.99984C5.33317 7.82303 5.40341 7.65346 5.52843 7.52843C5.65346 7.40341 5.82303 7.33317 5.99984 7.33317H9.99984C10.1766 7.33317 10.3462 7.40341 10.4712 7.52843C10.5963 7.65346 10.6665 7.82303 10.6665 7.99984C10.6665 8.17665 10.5963 8.34622 10.4712 8.47124C10.3462 8.59627 10.1766 8.6665 9.99984 8.6665Z"
                                            fill="#FF3448" />
                                    </svg>

                                    <div class="ml-2 text-sm">{{ alertMessage }}</div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <v-row class="mt-2">
                        <v-col>
                            <v-card outlined class="h-100 shadow-lg rounded-lg border border-fog-gray">
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
                            <v-card outlined class="h-100 shadow-lg rounded-lg border border-fog-gray">
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
                            <v-card outlined class="h-100 shadow-lg rounded-lg border border-fog-gray">
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
                    <h3 class="mb-3 text-xl font-semibold">Requirements</h3>
                    <!-- Compliance Issues List -->
                    <div class="overflow-hidden rounded-lg border shadow-lg">
                        <v-card outlined class="mt-0 first:mt-2 rounded-none border-b" v-for="(issue, index) in issues"
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
import MyGauge from '@/components/MyGauge.vue';
import MyLinearGauge from '@/components/MyLinearGauge.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'ComplianceView',
    components: {
        TopHeader,
        MyGauge,
        MyLinearGauge,
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