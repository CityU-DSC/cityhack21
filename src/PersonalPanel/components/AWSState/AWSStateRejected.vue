<template>
    <v-alert 
        transition="scale-transition"
        dense 
        text 
        type="error" 
        id="alertAWSRejected">
        AWS Educate Account verification has been rejected
    </v-alert>
</template>

<script>
    export default {
        name: "AWSRejected"
    }
</script>
<style lang="scss" scoped>
#alertAWSRejected {
    text-align: center;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
}

</style>