<template>
    <v-alert 
        transition="scale-transition"
        dense 
        text 
        type="warning" 
        id="alertAWSNotVerified">
        AWS Educate Account has not yet been Verified
    </v-alert>
</template>

<script>
    export default {
        name: "AWSNotVerified"
    }
</script>
<style lang="scss" scoped>
#alertAWSNotVerified {
    text-align: center;
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
}

</style>