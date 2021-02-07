<template>
    <teleport to="body" v-if="!isDestory">
        <div class="message_container"
            :class="[
                {'show': isShow},
                {'hide': !isShow},
                {'enter': isEnter},
                {'leave': isLeave},
                type
            ]" 
            :style="{
                'top': `${seed * 70}px`
            }">
            <div class="content">

                <i :class="[
                        `lp-message-${type}`, 
                        'icon', 
                        'fa', 
                        {'fa-info-circle': type == 'info'},
                        {'fa-check-circle': type == 'success'},
                        {'fa-times-circle': type == 'err'},
                        {'fa-exclamation-triangle': type == 'warning'},
                    ]"/>

                <div class="txt"
                    :class="[`txt_${type}`]">
                    {{content}}
                </div>
            </div>

        </div>
    </teleport>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
    name: "lp-message",
    props: {
        type: {
            type: String,
            default: 'info'
        },
        lastTime: {
            type: Number,
            default: 2500
        },
        content: {
            type: String,
            default: '这是一条提示信息'
        },
        isShow: {
            type: Boolean,
            default: false
        },
        isLeave: {
            type: Boolean,
            default: false
        },
        isEnter: {
            type: Boolean,
            default: false
        },
        seed: {
            type: Number,
            default: 0
        },
        isDestory: {
            type: Boolean,
            default: false
        }
    }
})
</script>

<style scoped>
    .message_container{
        width: 400px;
        height: 50px;
        border-radius: 8px;
        position: fixed;
        transition: all 500ms ease;
        opacity: 0;
        filter:alpha(opacity=0);
        z-index: 1000;
        left: 50%;
        transform: translate(-50%, 20px);
    }
    .show{
        opacity: 1;
        filter:alpha(opacity=100);
    }
    .message_container.leave{
        top: 0;
    }
    .hide{
        opacity: 0;
        filter:alpha(opacity=0);
    }
    .content{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .icon, .txt{
        float: left;
    }
    .icon{
        height: 20px;
        width: 20px;
        margin-left: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .txt{
        margin-left: 10px;
        font-size: 15px;
    }
    .txt_info, .lp-message-info{
        color: #909399;
    }
    .txt_success, .lp-message-success{
        color: #3BC965;
    }
    .txt_warning, .lp-message-warning{
        color: #eea832;
    }
    .txt_err, .lp-message-err{
        color: #de3c3c;
    }
    .info{
        background-color: #eBEEF5;
        border: 1px solid #e5e8ee;
    }
    .success{
        background-color: #e7f6e3;
        border: 1px solid #e3f1df
    }
    .err{
        background-color: #f6ecec;
        border: 1px solid #f5e3e3;
    }
    .warning{
        background-color: #f8f2ec;
        border: 1px solid #f3e5da;
    }
</style>
