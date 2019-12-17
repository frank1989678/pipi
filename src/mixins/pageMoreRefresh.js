export const pageMoreRefresh = {
    data: function() {
        return {
            isMoreLoading: true,
            isMoreFinished: false,
            isMoreError: false,
            pageSize: 10,
            pageNum: 0
        }
    },
    computed: {
        paging() {
            if (this.pageNum === 0) {
                this.pageNum += 1;
            }
            return {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }
        },
    },
    methods: {
        // 加载更多成功
        pagePullUpSuccess(isHasNextPage) {
            this.pageNum += 1;
            this.isMoreFinished = !isHasNextPage;
            this.isMoreLoading = false;
        },
        pagePullUpResetFilter() {
            this.isMoreFinished = false;
            this.isMoreLoading = true;
            this.isMoreError = false;
            this.pageNum = 0;
        },
        // 重置下拉刷新
        pagePullUpReset() {
            this.pagePullUpResetFilter();
            this.onLoadMore();
        },
        // 分页后的成功数据进行合并
        getLoadMoreListConcat(newList, oldList) {
            // 第一页数据的话，就需要处理一下，只显示新数据
            return this.pageNum === 1 ? newList : (oldList || []).concat(newList)
        },
        // 加载失败
        pagePullUpFail() {
            this.isMoreFinished = false;
            this.isMoreLoading = false;
            this.isMoreError = true;
        },
        // 开始加载更多
        onLoadMore() {
            this.isMoreLoading = true;
            this.pagePullUpFetch && this.pagePullUpFetch();
        }
    }
};
