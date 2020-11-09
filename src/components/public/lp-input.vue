<template>
    <div class="lp-input-container">
        <input type="text" 
               :placeholder="placeholder" 
               :maxlength="maxlength"
               :class="['lp-input', {'lp-input-focus': isFocus}]"
               @input="inputValue"
               @focus="inputFocus"
               @blur="inputBlur"
               @compositionstart="virtualInputStart"
               @compositionend="virtualInputEnd"
               :value="value">
        <span class="clear" v-show="value == '' ? false : true" @click="clearValue"></span>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'lp-input',
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '输入标签名称'
        },
        maxlength: {
            type: String
        }
    },
    setup(props, context) {
        let isFocus = ref(false)    // 判断是否聚焦
        let isVirtual = ref(false)  // 判断是否虚拟输入

        // 聚焦事件
        function inputFocus() {
            isFocus.value = true
        }

        // 失去焦点事件
        function inputBlur() {
            isFocus.value = false
        }

        // 输入框内容改变事件
        function inputValue(e) {
            if(!isVirtual.value) {
                let value = e.target.value
                context.emit('_input', value)
            }     
        }

        // 清除输入框内容
        function clearValue() {
            context.emit('_input', '')
        }

        // 虚拟输入开始事件
        function virtualInputStart() {
            isVirtual.value = true
        }

        // 虚拟输入结束事件
        function virtualInputEnd(e) {
            isVirtual.value = false
            context.emit('_input', e.target.value)
        }

        return {
            isFocus, 
            inputFocus, 
            inputBlur, 
            inputValue, 
            clearValue, 
            virtualInputStart, 
            virtualInputEnd
        }
    }
}
</script>

<style>
.lp-input-container{
    height: 50px;
    position: relative;
}
.lp-input{
    display: inline-block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid #d4d3d3;
    text-indent: 10px;
    border-radius: 5px;
    color: #666;
    cursor: pointer;
    padding-right: 30px;
}
.lp-input-focus{
    border: 1px solid #0e95de;
    cursor: auto;
    box-shadow: 0 0 6px #53aee3;
}
.clear::before{
    content: '\2716';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-100%, -50%);
    cursor: pointer;
}
</style>