<template>
    <div class="select-container w-full">
        <div class="custom-select rounded-lg h-11" @click="toggleDropdown">
            <div class="selected-option">
                {{ selectedOption ? selectedOption.label : 'Select Compliance Type' }}
            </div>
            <div class="carrot-icon" :class="{ 'rotate-90': !isOpen }">
                <svg class="h-3 w-3" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L5 4.29289L8.64645 0.646447C8.84171 0.451184 9.15829 0.451184 9.35355 0.646447C9.54882 0.841709 9.54882 1.15829 9.35355 1.35355L5.35355 5.35355L5 5.70711L4.64645 5.35355L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z"
                        fill="#454555" />
                </svg>
            </div>
        </div>
        <ul v-if="isOpen" class="custom-options open-above shadow-lg">
            <template v-for="(group, index) in groupedOptions" :key="index">
                <li v-if="group.options.length > 0" class="group-label">{{ group.label }}</li>
                <li v-for="option in group.options" :key="option.value" @click="handleOptionClick(option)">
                    {{ option.label }}
                </li>
            </template>
        </ul>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selectedOption: null,
            isOpen: false,
            options: [
                { value: 'amazon', label: 'Amazon DSP', group: 'DSP COMPLIANCE' },
                { value: 'walmart', label: 'Walmart DSP', group: 'DSP COMPLIANCE' },
                { value: 'nbcu', label: 'NBCU', group: 'CTV INVENTORY COMPLIANCE' },
                { value: 'netflix', label: 'Netflix', group: 'CTV INVENTORY COMPLIANCE' },
                { value: 'hulu', label: 'Hulu', group: 'CTV INVENTORY COMPLIANCE' }
            ]
        };
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        groupedOptions() {
            // Group options by 'group' property
            const grouped = {};
            this.options.forEach(option => {
                if (!grouped[option.group]) {
                    grouped[option.group] = [];
                }
                grouped[option.group].push(option);
            });
            // Convert object to array of objects with 'label' and 'options' properties
            return Object.keys(grouped).map(key => ({
                label: key,
                options: grouped[key]
            }));
        }
    },
    watch: {
        value(newValue) {
            this.selectedOption = newValue; // Update selectedOption when prop value changes
        }
    },
    methods: {
        toggleDropdown() {
            if(this.disabled) return;
            this.isOpen = !this.isOpen;
        },
        handleOptionClick(option) {
            this.selectedOption = option;
            this.isOpen = false; // Close the dropdown after selection
            this.$emit('option-selected', option); // Emit selected option to parent component
        }
    }
};
</script>

<style scoped>
.select-container {
    position: relative;
    display: inline-block;
}

.custom-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #E7E8EB;
    border-radius: 0.375rem;
    background-color: white;
}

.custom-options {
    position: absolute;
    top: auto;
    bottom: 100%;
    left: 0;
    width: 100%;
    max-height: 120rem;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin-bottom: 4px;
    border: 1px solid #E7E8EB;
    border-top: none;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.custom-options li {
    padding: 0.50rem 1rem;
    cursor: pointer;
    font-size: 13px;
    font-weight: 400;
    transition: background-color 0.3s;
}

.custom-options li:hover {
    background-color: #f0f0f0;
}

.group-label {
    font-weight: 500;
    border-top: 1px solid #E7E8EB;
    color: #818391;
}

.carrot-icon {
    flex-shrink: 0;
    margin-right: 4px;
}

.selected-option {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;
    color: #818391;
}

.rotate-90 {
    transform: rotate(-90deg);
}
</style>
