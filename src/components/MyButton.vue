<template>
    <button @click="handleClick"
        class="flex items-center justify-center px-3 py-2 border border-transparent rounded-lg shadow-sm text-xs font-normal border-cement">
        <slot name="icon"></slot>
        <span>{{ buttonText }}</span>
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        buttonText: {
            type: String,
            default: 'Button Text' // Default button text
        }
    },
    methods: {
        handleClick() {
            // Emit a click event to the parent component
            this.$emit('click');
        }
    }
};
</script>

<style scoped>
/* Add scoped styles if needed */
</style>