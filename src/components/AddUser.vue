<template>
    
</template>

<script>
export default {
    props: {
        dialogVisible: {
            type: Boolean,
        }
    },
    methods: {
        closeDialogVisible(){
            this.$emit('change-dialogvisible');
        }
    }
}
</script>

<style>

</style>