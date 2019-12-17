<template>
    <van-list :error.sync="isMoreError"
        class="pull-more-wrap"
        v-model="isMoreLoadingModel"
        :finished="isMoreFinished"
        loading-text="拼命加载更多中..."
        @load="load" />
</template>
<!-- finished-text="我是有底线的..." -->

<script>
export default {
    name: 'LoadMore',
    props: {
        isMoreLoading: {
            type: Boolean
        },
        isMoreFinished: {
            type: Boolean
        },
        isMoreError: {
            type: Boolean
        }
    },
    watch: {
        isMoreLoading: {
            handler: function(val) {
                this.isMoreLoadingModel = val;
            },
            immediate: true
        },
        isMoreLoadingModel(val) {
            this.$emit('update:isMoreLoading', val)
        }
    },
    data() {
        return {
            isMoreLoadingModel: true
        }
    },
    methods: {
        load() {
            this.$emit('load')
        }
    }
}
</script>
