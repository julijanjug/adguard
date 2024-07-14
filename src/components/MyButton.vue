<template>
    <div>
        <v-btn :color="color" :size="size" :outlined="outlined" :rounded="rounded" :block="block" :disabled="disabled"
            :class="`${textColor}--text`">
            {{ text }}
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "MyButton",
    props: {
        text: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            default: "primary",
        },
        size: {
            type: String,
            default: "md",
        },
        outlined: {
            type: Boolean,
            default: false,
        },
        rounded: {
            type: Boolean,
            default: false,
        },
        block: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        textSize: {
            type: String,
            default: "md",
        },
        textColor: {
            type: String,
            default: "black",
        },
    },
};
</script>