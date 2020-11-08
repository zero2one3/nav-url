<template>

    <button class="lp-button-container"
            :class="[
                `lp-button-${type}`,
                {'is-round': round},
                {'is-circle': circle},
                {'is-disabled': disabled},
                {'is-plain': plain},
                {'is-loading': loading}
            ]"
            @click="btnClick"
            ref="el">
        <span v-show="loading" class="is-loading">
            <i class="fa fa-spinner fa-spin"/>
            <span style="margin-left: 5px" v-show="loading && !circle">加载中</span>
        </span>
        <span v-show="!loading">
            <slot>{{ circle? '查': 'lp-button' }}</slot>
        </span>


    </button>

</template>

<script>
    import {ref} from 'vue'
    export default {
        name: "lp-button",
        props: {
            type: {
                type: String,
                default: ''
            },
            plain: {
              type: Boolean,
              default: false
            },
            round: {
                type: Boolean,
                default: false
            },
            circle: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            }

        },
        setup(props, context) {
            let el = ref(null)
            function btnClick() {
                if(props.disabled || props.loading) return;
                context.emit('btnClick', el)
            }
            return {btnClick, el}
        }


    }
</script>

<style scoped>
    .lp-button-container{
        cursor: pointer;
        width: 80px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #d9d3d3;
        background: white;
        color: #606266;
        outline: none;
        display: inline-block;
        font-size: 14px;
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -moz-user-select: none;
        text-align: center;
        position: relative;
    }

    .lp-button-container:not(.is-disabled):not(.is-loading):hover{
        background: rgba(162, 222, 252, 0.5);
        color: #1292d9;
    }
    .lp-button-container:not(.is-disabled):not(.is-loading):active{
        border: 1px solid #3e9fd4;
    }

    .lp-button-success{
        background: #17af17;
        color: white;
        border: 1px solid #17af17;
    }
    .lp-button-success:not(.is-disabled):not(.is-loading):hover{
        background: #19c119;
        color: white;
        border: 1px solid #19c119;
    }
    .lp-button-success:not(.is-disabled):not(.is-loading):active{
        background: #22b422;
    }

    .lp-button-danger{
        background: rgba(222, 7, 7, 0.8);
        color: white;
        border: 1px solid rgba(222, 7, 7, .8);
    }
    .lp-button-danger:not(.is-disabled):not(.is-loading):hover{
        background: rgba(246, 76, 76, 1);
        color: white;
        border: 1px solid rgba(246, 76, 76, 1);
    }
    .lp-button-danger:not(.is-disabled):not(.is-loading):active{
        background: rgba(238, 0, 0, .8);
    }

    .lp-button-primary{
        background: #0c94de;
        color: white;
        border: 1px solid #0c94de;
    }
    .lp-button-primary:not(.is-disabled):not(.is-loading):hover{
        background: #0e9fef;
        color: white;
        border: 1px solid #0e9fef;
    }
    .lp-button-primary:not(.is-disabled):not(.is-loading):active{
        background: #0b8cd2;
    }

    .lp-button-warning{
        background: #f39a34;
        color: white;
        border: 1px solid #f39a34;
    }
    .lp-button-warning:not(.is-disabled):not(.is-loading):hover{
        background: #fca74b;
        color: white;
        border: 1px solid #fca74b;
    }
    .lp-button-warning:not(.is-disabled):not(.is-loading):active{
        background: #f39a34;
    }

    /*  -------------plain---------------  */
    .lp-button-container.is-plain:not(.is-disabled):not(.is-loading):hover{
        background: white;
        border: 1px solid #3e9fd4;
    }
    .lp-button-container.is-plain:not(.is-disabled):not(.is-loading):active{
        border: 1px solid #3283ac;
        color: #3283ac;
    }

    .lp-button-success.is-plain{
        background: rgba(26, 189, 26, 0.15);
        color: #61b836;
        border: 1px solid rgba(127, 201, 90, .5);
    }
    .lp-button-success.is-plain:not(.is-disabled):not(.is-loading):hover{
        background: #19c119;
        color: white;
        border: 1px solid #19c119;
    }
    .lp-button-success.is-plain:not(.is-disabled):not(.is-loading):active{
        background: #22b422;
    }

    .lp-button-danger.is-plain{
        background: rgba(222, 7, 7, 0.09);
        color: rgba(224, 63, 63, .9);
        border: 1px solid rgba(222, 7, 7, .2);
    }
    .lp-button-danger.is-plain:not(.is-disabled):not(.is-loading):hover{
        background: rgba(246, 76, 76, 1);
        color: white;
        border: 1px solid rgba(246, 76, 76, 1);
    }
    .lp-button-danger.is-plain:not(.is-disabled):not(.is-loading):active{
        background: rgba(238, 0, 0, .8);
    }

    .lp-button-primary.is-plain{
        background: rgba(12, 148, 222, .1);
        color: #0c94de;
        border: 1px solid rgba(12, 148, 222, .35);
    }
    .lp-button-primary.is-plain:not(.is-disabled):not(.is-loading):hover{
        background: #0e9fef;
        color: white;
        border: 1px solid #0e9fef;
    }
    .lp-button-primary.is-plain:not(.is-disabled):not(.is-loading):active{
        background: #0b8cd2;
    }

    .lp-button-warning.is-plain{
        background: rgba(243, 154, 52, .1);
        color: #f39a34;
        border: 1px solid rgba(243, 154, 52, .4);
    }
    .lp-button-warning.is-plain:not(.is-disabled):not(.is-loading):hover{
        background: #fca74b;
        color: white;
        border: 1px solid #fca74b;
    }
    .lp-button-warning.is-plain:not(.is-disabled):not(.is-loading):active{
        background: #f39a34;
    }

    /*  ------------- round ---------------  */
    .lp-button-container.is-round{
        border-radius: 100px;
    }

    /*  ------------- circle ---------------  */
    .lp-button-container.is-circle{
        border-radius: 50%;
        width: 45px;
    }

    /*  ------------- disabled / loading ---------------  */
    .lp-button-container.is-disabled, .lp-button-container.is-loading{
        cursor: not-allowed;
        opacity: .6;
        filter:alpha(opacity=60)
    }

    /*  ------------- loading ---------------  */

    span.is-loading{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>