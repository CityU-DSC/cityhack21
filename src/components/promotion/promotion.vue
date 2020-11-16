<!-- This is the page for the promotion -->
<template>
    <div id="novin-alert-container">
        <div v-for="message in messages" v-bind:key="message.id" class="alert novin-alert" :class="message.class">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            {{ message.body }}
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                messages: [],
            }
        },
        methods: {
            SelfAlert: function (message) {
                let app = this;
                message.type = typeof message.type !== 'undefined' ? message.type : 'info';
                message.class = 'alert' + message.type;
                let index = app.messages.push(message) - 1;
                if (typeof message.duration !== 'undefined') {
                    window.setTimeout(function () {
                        app.messages.splice(index, 1);
                    }, message.duration * 1000);
                }
            }
        }
    }
</script>