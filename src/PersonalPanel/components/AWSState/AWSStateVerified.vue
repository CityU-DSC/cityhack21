<template>
    <v-alert 
        transition="scale-transition"
        dense 
        text 
        type="success" 
        id="alertAWSVerified">
        AWS Educate Account has already been verified
    </v-alert>
</template>

<script>
    export default {
        name: "AWSVerified"
    }
</script>
<style lang="scss" scoped>
#alertAWSVerified {
    text-align: center;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
}

</style>