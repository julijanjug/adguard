<template>
    <header class="action-bar w-full border-b py-4 sticky z-50 bg-white">
        <div class="max-w-12xl mx-auto px-8 flex justify-between items-center h-full">
            <div class="text-slate text-lg font-semibold">{{ placementInfo.placementName }}</div>
            <div class="flex space-x-3">
                <MyButton buttonText="Contact admin for help" />
                <MyButton buttonText="I've fixed it. Scan Again" class="scan-btn">
                    <template v-slot:icon>
                        <svg class="h-4 w-4 mr-1 flex-shrink-0" viewBox="0 -2 19 19" fill="none"
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
                    </template>
                </MyButton>
            </div>
        </div>
    </header>
</template>

<script>
import MyButton from './MyButton.vue';

export default {
    name: "ActionBar",
    components: {
        MyButton,
    },
    props: {
        placementInfo: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
.action-bar {
    height: 72px;
    top: 64px;
}
.scan-btn {
    background-color: #1966FF;
    color: white;
}
</style>
