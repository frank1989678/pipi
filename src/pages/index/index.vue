<template>
<div class="page">
    <div class="link"
        :style="'opacity:' + (1 - index * 0.02)"
        :key="item.key"
        v-for="(item, index) in routers"
        @click="openAppPage(item)"
    >{{item.name}}</div>
</div>
</template>




<script>
import utils from '@/utils';
import appPageReady from '@/mixins/appPageReady';
import app from '@/mixins/appRouter';

export default {
    mixins: [appPageReady],
    data() {
        return {
            routers: [
                {name: '跳网页', key: 'openWeb', para: {title: '网页标题名称', url: 'https://h5.apeiwan.com/htm/video/school.html'}},
                {name: '名片页', key: 'openUserCard', para: {userId: 36}},
                {name: '游戏分类列表', key: 'openCat', para: {categoryId: 30, categoryName: '王者荣耀'}},
                {name: '接单设置页面', key: 'openSet'},
                {name: '单个品类接单设置页面', key: 'openSkillSet', para: {categoryId: 30, categoryName: '王者荣耀', recId: 439}},
                {name: '编辑品类资料页面', key: 'openSkillEdit', para: {categoryId: 30, recId: 439}},
                {name: '下单页面', key: 'openOrdering', para: {productId: 4767}},
                {name: '我的接单列表', key: 'openAcceptList'},
                {name: '我的下单记录', key: 'openOrderList'},
                {name: '我的优惠券', key: 'openMyCoupon'},
                {name: '皮皮币充值', key: 'openRechargeCoin'},
                {name: '钻石充值', key: 'openRechargeDiamoned'},
                {name: '聊天室tab', key: 'openAppTab', para: 1},
                {name: '动态tab', key: 'openAppTab', para: 2},
                {name: '图文动态详情', key: 'openDynamic', para: {dynamicId: 3785}},
                {name: '进入房间（需要密码）', key: 'openRoom', para: {roomNo: 649739}},
                {name: '返回app', key: 'goBackToApp'}
            ]
        }
    },
    methods: {
        // 这里只做展示使用，实际得判断app版本是否支持
        openAppPage(item) {
            app.routers[item.key](item.para)
        },
        // 领取优惠券
        async onReceive() {
        }
    },
    mounted() {
    }
}
</script>