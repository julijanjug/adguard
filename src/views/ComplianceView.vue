<template>
	<div class="min-h-screen flex flex-col items-center bg-gray-100">
		<TopHeader />

		<main class="flex flex-col items-center justify-center flex-grow px-8">
			<v-row class="mt-4 w-full max-w-7xl">
				<v-col cols="12" v-if="!placementInfo">
					<v-card outlined class="w-full text-center">
						<v-card-text>
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

					<!-- Compliance Issues List -->
					<v-card outlined class="mt-4" v-for="issue in issues" :key="issue.title">
						<v-card-title>{{ issue.title }}</v-card-title>
						<v-card-text>
							<div><strong>Issue:</strong> {{ issue.issue }}</div>
							<div><strong>Recommendation:</strong> {{ issue.recommendation }}</div>
						</v-card-text>
					</v-card>
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