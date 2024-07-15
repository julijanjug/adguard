<template>
    <header class="action-bar w-full border-b py-4 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-8 flex justify-between items-center align-middle h-full">
            <div class="text-slate text-lg font-semibold">{{ placementInfo.placementName }}</div>
        </div>
    </header>
</template>

<script>
export default {
    name: "ActionBar",
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
}
</style>