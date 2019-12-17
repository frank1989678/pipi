import compareVersion from '@/utils/compareVersion'

// 打开app页面
const appInvoke = (para) => {
    FLPP.JSBridge.invoke({
        cmd: 'func.openAppPage',
        data: { para: JSON.stringify(para) },
        handle: res => {}
    })
}

// app路由页面
const appRouters = {
    // 跳网页
    openWeb(item) {
        const ios_route = `FLWebPageViewController?urlString=${item.url}`;
        const androidRoute = `WebViewActivity?url=${item.url}?title={item.title}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 名片页
    openUserCard(item) {
        const ios_route = `KHCardViewController?userId=${item.userId}`;
        const androidRoute = `UserDetailActivity?uid=${item.userId}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 游戏分类列表（android端，多个参数之间都用？拼接）
    openCat(item) {
        const ios_route = `KHGameMainController?categoryId=${item.categoryId}&title=${item.categoryName}`;
        const androidRoute = `ProductListActivity?categoryId=${item.categoryId}?categoryName=${item.categoryName}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 接单设置页面
    openSet() {
        const ios_route = `KHSettingOrderController`;
        const androidRoute = `JieDanSheZhiActivity_New`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 单个品类接单设置页面
    openSkillSet(item) {
        const ios_route = `KHCategorySettingController?recId=${item.recId}&categoryId=${item.categoryId}&title=${item.categoryName}`;
        const androidRoute = `JiNengSheZhiActivity?techAuthId=${item.recId}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 编辑品类资料页面
    openSkillEdit(item) {
        const ios_route = `KHEditCategoryInfoController?recId=${item.recId}&categoryId=${item.categoryId}`;
        const androidRoute = `JiNengShezhiEditActivity?techAuthId=${item.recId}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 下单页面
    openOrdering(item) {
        const ios_route = `KHPlaceOrderController?productId=${item.productId}`;
        const androidRoute = `FillOrderActivity_New?productId=${item.productId}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 接单列表
    openAcceptList(item) {
        const ios_route = `KHTeacherOrderListController`;
        const androidRoute = `DaShou_OrderListActivity`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 下单记录
    openOrderList() {
        const ios_route = `KHUserOrderListController`;
        const androidRoute = `MyOrderListActivity`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 皮皮币充值
    openRechargeCoin(item) {
        const ios_route = `KHChargeCoinsController`;
        const androidRoute = `ChongZhi_MoneyActivity`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 钻石充值
    openRechargeDiamoned(item) {
        const ios_route = `KHMyVirtualWalletController`;
        const androidRoute = `ChongZhi_ZuanShiActivity`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    /**
     * 打开app tab页面
     * @param  {Number} tabIdx [1: 聊天室, 2: 动态]
     * @return {null}
     */
    openAppTab(tabIdx = 1) {
        // ios tab页面路由名称
        const pageRouter = {
            1: 'KHChatRoomHallController',
            2: 'KHDiscoveryController'
        }
        const para = {
            ios_route: pageRouter[tabIdx],
            androidRoute: 'MainActivity?index=' + tabIdx
        }
        appInvoke(para);
    },
    // 图文动态详情
    openDynamic(item) {
        const ios_route = `KHDynamicListController?dynamicId=${item.dynamicId}&titleStr=关注`;
        const androidRoute = `DongTai2_DongTaiListActivity?dynamicId=${item.dynamicId}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 我的优惠券
    openMyCoupon(item) {
        const ios_route = `KHMyCouponController`;
        const androidRoute = `YouHuiJuanListActivity`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    // 进入房间（需要密码）
    openRoom(item) {
        const ios_route = `KHChatRoomViewController?roomNo=${item.roomNo}`;
        const androidRoute = `RoomDetailActivity_PaiDan?${item.roomNo}`;
        const para = {ios_route, androidRoute}
        appInvoke(para);
    },
    goBackToApp() {
        if (FLPP.JSBridge.isPiPiApp) {
            FLPP.JSBridge.invoke({
                cmd: 'func.goBack',
                data: {}
            })
        } else {
            window.history.go(-1);
        }
    }
}

export default {
    routers: appRouters,
    invoke: appInvoke
}
