
import utils from '@/utils'
//button点击防并发，0.3s内禁止第二次点击
import Vue from 'vue'

// 跳转到app个人主页
Vue.directive('go-app-user', {
    bind: function(el, binding) {
        el.setAttribute('userInfo', JSON.stringify(binding.value));

        el.addEventListener('click', function() {
            const item = JSON.parse(el.getAttribute('userInfo'));
            if (item.userId) {
                const ios_route = 'KHCardViewController?userId=' + item.userId;
                const androidRoute = '/khpw/UserDetailActivity?uid=' + item.userId;
                const para = JSON.stringify({ios_route, androidRoute});
                FLPP.JSBridge.invoke({
                    cmd: 'func.openAppPage',
                    data: {para}
                })
            }
        });
    },
    update: function(el, binding) {
        el.setAttribute('userInfo', JSON.stringify(binding.value));
    }
});


// 跳转到app房间
Vue.directive('go-app-room', {
    bind: function(el, binding) {
        el.setAttribute('roomInfo', JSON.stringify(binding.value));

        el.addEventListener('click', function() {
            const item = JSON.parse(el.getAttribute('roomInfo'));
            // console.log(item)
            if (item.roomNo) {
                const ios_route = 'KHChatRoomViewController?roomNo=' + item.roomNo;
                const androidRoute = 'RoomDetailActivity_PaiDan?' + item.roomNo;
                const para = JSON.stringify({ios_route, androidRoute});
                FLPP.JSBridge.invoke({
                    cmd: 'func.openAppPage',
                    data: {para}
                })
            }
        });
    },
    update: function(el, binding) {
        el.setAttribute('roomInfo', JSON.stringify(binding.value));
    }
});