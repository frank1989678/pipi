<!--弹窗-->
<template>
    <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @enter-cancelled="enterCancelled"
            @before-leave="beforeLeave"
            @leave="leave"
            @after-leave="afterLeave"
            @leave-cancelled="leaveCancelled"
            :name="animClassName">
        <div v-cloak :id="modelId" v-if="visible" class="pp-model">
            <div class="mask" @click="onHide" v-if="mask" ref="maskBody"></div>
            <div class="body">
                <slot></slot>
            </div>
            <!-- <div class="close" @click="onHide" v-if="btnClose"></div> -->
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Model',
    props: {
        position: {
            type: String,
            default: 'center'
        },
        visible: {
            type: Boolean,
            default: false
        },
        transition: {
            type: String,
            default: ''
        },
        // 是否有关闭按钮
        btnClose: {
            type: Boolean,
            default: true
        },
        // 是否有遮罩
        mask: {
            type: Boolean,
            default: true
        },
        // 点击遮罩关闭
        onMaskClose: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        animClassName() {
            const clsObj = {
                'center': 'modal-fadeIn',
                'bottom': 'modal-slideIn',
                'top': 'modal-slideOutDown'
            }
            return clsObj[this.position] || '';
        },
        modelId() {
            return 'model_' + (new Date).getTime();
        }
    },
    methods: {
        noScroll(e) {
           e.preventDefault() 
        },
        onHide() {
            this.onMaskClose && this.$emit('update:visible', false);
        },
        beforeEnter() {
            this.$emit('before-enter');
        },
        enter(el) {
            this.$emit('enter', el);
        },
        afterEnter(el) {
            this.$emit('after-enter', el);
            // this.$refs.maskBody.addEventListener('touchmove', this.noScroll, false)
        },
        enterCancelled() {
            this.$emit('enter-cancelled');
        },
        beforeLeave() {
            this.$emit('before-leave');
            // this.$refs.maskBody.removeEventListener('touchmove', this.noScroll, false)
        },
        leave() {
            this.$emit('leave');
        },
        afterLeave() {
            this.$emit('after-leave');
        },
        leaveCancelled() {
            this.$emit('leave-cancelled');
        }
    }
}    
</script>