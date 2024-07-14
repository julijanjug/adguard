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
                    <v-card outlined>
                        <v-card-title class="red--text">
                            AdGuard detected {{ issues.length }} compliance issues.
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="4">
                                    <MyGauge :value="passedRate" :size="100" :width="20">
                                        <template v-slot:default> {{ passedRate }}% </template>
                                    </MyGauge>
                                    <div>{{ passedCount }} passed</div>
                                </v-col>
                                <v-col cols="4">
                                    <MyGauge :value="failedRate" :size="100" :width="20">
                                        <template v-slot:default> {{ failedRate }}% </template>
                                    </MyGauge>
                                    <div>{{ failedCount }} failed</div>
                                </v-col>
                                <v-col cols="4">
                                    <div>Criteria</div>
                                    <div>Accessibility: {{ accessibilityRate }}%</div>
                                    <div>Brand safety: {{ brandSafetyRate }}%</div>
                                    <div>Ad size and format: {{ adSizeFormatRate }}%</div>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <div>Severity</div>
                                    <div>High: {{ highSeverityRate }}%</div>
                                    <div>Mid: {{ midSeverityRate }}%</div>
                                    <div>Low: {{ lowSeverityRate }}%</div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-row class="mt-4">
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
                                            <v-progress-linear v-model="accessibilityRate" color="error" height="12"
                                                rounded />
                                            <span class="mt-1 block">Accessibility: {{ accessibilityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <v-progress-linear v-model="brandSafetyRate" color="error" height="12"
                                                rounded />
                                            <span class="mt-1 block">Brand safety: {{ brandSafetyRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <v-progress-linear v-model="adSizeFormatRate" color="error" height="12"
                                                rounded />
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
                                            <v-progress-linear v-model="highSeverityRate" color="warning" height="12"
                                                rounded />
                                            <span class="mt-1 block">High: {{ highSeverityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <v-progress-linear v-model="midSeverityRate" color="warning" height="12"
                                                rounded />
                                            <span class="mt-1 block">Mid: {{ midSeverityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                    <v-row class="flex items-center">
                                        <v-col cols="12">
                                            <v-progress-linear v-model="lowSeverityRate" color="warning" height="12"
                                                rounded />
                                            <span class="mt-1 block">Low: {{ lowSeverityRate }}%</span>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>


                    <hr class="my-4 border-t border-gray-300">
                    <h3 class="mt-4 mb-2 text-xl font-semibold">Requirements</h3>
                    <!-- Compliance Issues List -->
                    <div class="overflow-hidden rounded-lg border shadow-lg">
                        <v-card outlined class="mt-0 first:mt-2 rounded-none" v-for="issue in issues" :key="issue.title">
                            <!-- Custom top bar with smaller height, custom color, and centered content -->
                            <div class="bg-fog-gray text-gray-800 h-10 flex items-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" class="ml-4">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M8 1C8.36699 1 8.7045 1.20102 8.87929 1.52372L15.3793 13.5237C15.5471 13.8336 15.5395 14.2089 15.3592 14.5117C15.1788 14.8145 14.8524 15 14.5 15H1.5C1.14758 15 0.821187 14.8145 0.640849 14.5117C0.46051 14.2089 0.452859 13.8336 0.620708 13.5237L7.12071 1.52372C7.2955 1.20102 7.63301 1 8 1ZM7 10V5H9V10H7ZM9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"
                                        fill="#FF3448" />
                                </svg>
                                <div class="ml-2 text-sm">{{ issue.title }}</div>
                            </div>

                            <!-- Card content -->
                            <v-card-text>
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
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'ComplianceView',
    components: {
        TopHeader,
        MyGauge,
    },
    setup() {
        const route = useRoute();
        const issues = ref([]);
        const placementInfo = ref(null);
        const fetchError = ref(false);

        const passedCount = ref(0);
        const failedCount = ref(0);
        const accessibilityRate = ref(0);
        const brandSafetyRate = ref(0);
        const adSizeFormatRate = ref(0);
        const highSeverityRate = ref(0);
        const midSeverityRate = ref(0);
        const lowSeverityRate = ref(0);

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
                passedCount.value = data.passedCount;
                failedCount.value = data.failedCount;
                accessibilityRate.value = data.accessibilityRate;
                brandSafetyRate.value = data.brandSafetyRate;
                adSizeFormatRate.value = data.adSizeFormatRate;
                highSeverityRate.value = data.highSeverityRate;
                midSeverityRate.value = data.midSeverityRate;
                lowSeverityRate.value = data.lowSeverityRate;
            } catch (error) {
                fetchError.value = true;
                console.error('Error fetching issues:', error);
            }
        };

        fetchIssues(route.params.id);

        return {
            issues,
            placementInfo,
            totalTests,
            passedRate,
            failedRate,
            passedCount,
            failedCount,
            accessibilityRate,
            brandSafetyRate,
            adSizeFormatRate,
            highSeverityRate,
            midSeverityRate,
            lowSeverityRate,
            fetchError
        };
    },
};
</script>

<style scoped>
.text-center {
    text-align: center;
}
</style>
