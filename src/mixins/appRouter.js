// 打开app页面
const appInvoke = (para) => {
    FLPP.JSBridge.invoke({
        cmd: 'func.openAppPage',
        data: {para: JSON.stringify(para)},
        handle: res => {}
    })
}

// app路由页面
const appRouters = {
    openWeb: {
        name: '跳网页', 
        para: (item) => {
            const ios_route = `FLWebPageViewController?urlString=${item.userId}`;
            const androidRoute = `WebViewActivity?url=${item.userId}&title={item.title}`;
            return {ios_route, androidRoute};
        }
    },
    openUserCard: {
        name: '名片页',
        para: (item) => {
            const ios_route = `KHCardViewController?userId=${item.userId}`;
            const androidRoute = `UserDetailActivity?uid=${item.userId}`;
            return {ios_route, androidRoute};
        }
    },
    openCat: {
        name: '游戏分类列表',
        para: (item) => {
            const ios_route = `KHGameMainController?categoryId=${item.categoryId}&title=${item.categoryName}`;
            const androidRoute = `ProductListActivity?categoryId=${item.categoryId}&categoryName=${item.categoryName}`;
            return {ios_route, androidRoute};
        }
    },
    openSet: {
        name: '接单设置页面',
        para: (item) => {
            const ios_route = `KHSettingOrderController`;
            const androidRoute = `JieDanSheZhiActivity_New`;
            return {ios_route, androidRoute};
        }
    },
    openSkillSet: {
        name: '单个品类接单设置页面',
        para: (item) => {
            const ios_route = `KHCategorySettingController?recId=${item.recId}&categoryId=${item.categoryId}&title=${item.categoryName}`;
            const androidRoute = `JiNengSheZhiActivity?techAuthId=${item.recId}`;
            return {ios_route, androidRoute};
        }
    },
    openSkillEdit: {
        name: '编辑品类资料页面',
        para: (item) => {
            const ios_route = `KHEditCategoryInfoController?recId=${item.recId}&categoryId=${item.categoryId}`;
            const androidRoute = `JiNengShezhiEditActivity?techAuthId=${item.recId}`;
            return {ios_route, androidRoute};
        }
    },
    openOrdering: {
        name: '下单页面',
        para: (item) => {
            const ios_route = `KHPlaceOrderController?productId=${item.productId}`;
            const androidRoute = `FillOrderActivity_New?productId=${item.productId}`;
            return {ios_route, androidRoute};
        }
    },
    openAcceptList: {
        name: '接单列表',
        para: (item) => {
            const ios_route = `KHTeacherOrderListController`;
            const androidRoute = `DaShou_OrderListActivity`;
            return {ios_route, androidRoute};
        }
    },
    openOrderList: {
        name: '下单记录',
        para: () => {
            const ios_route = `KHUserOrderListController`;
            const androidRoute = `MyOrderListActivity`;
            return {ios_route, androidRoute};
        }
    },
    openRecharge: {
        name: '皮皮币充值',
        para: (item) => {
            const ios_route = `KHChargeCoinsController`;
            const androidRoute = `ChongZhi_MoneyActivity`;
            return {ios_route, androidRoute};
        }
    },
    openRecharge: {
        name: '钻石充值',
        para: (item) => {
            const ios_route = `KHMyVirtualWalletController`;
            const androidRoute = `ChongZhi_ZuanShiActivity`;
            return {ios_route, androidRoute};
        }
    },
    openAppTab: {
        name: 'app tab页面',
        para: (tabIdx) => {
            // ios tab页面路由名称
            const pageRouter = {
                1: 'KHChatRoomHallController',
                2: 'KHDiscoveryController'
            }
            return {
                androidRoute: 'MainActivity?index=' + tabIdx,
                ios_route: pageRouter[tabIdx]
            }
        },
        version: '1.3.3'
    },
    openDynamic: {
        name: '图文动态详情',
        para: (item) => {
            const ios_route = `KHDynamicListController?dynamicId=${item.dynamicId}&titleStr=关注`;
            const androidRoute = `DongTai2_DongTaiListActivity?dynamicId=${item.dynamicId}`;
            return {ios_route, androidRoute};
        }
    },
    openMyCoupon: {
        name: '我的优惠券',
        para: (item) => {
            const ios_route = `KHMyCouponController`;
            const androidRoute = `YouHuiJuanListActivity`;
            return {ios_route, androidRoute};
        }
    },
    openRoom: {
        name: '进入房间（需要密码）',
        para: (item) => {
            const ios_route = `KHChatRoomViewController?roomNo=${item.roomNo}`;
            const androidRoute = `RoomDetailActivity_PaiDan?${item.roomNo}`;
            return {ios_route, androidRoute};
        }
    }
}

export default {
    routers: appRouters,
    invoke: appInvoke
}