
var console_admin = function () {

	"use strict"
	
	var initLayoutToggles = function () {
		$('.navbar-toggle, .mainnav-toggle').click (function (e) {
			$(this).toggleClass ('is-open')
		})
	}

	var initNoticeBar = function () {
		$('.noticebar > li > a').click (function (e) {
			if (zx_console.isLayoutCollapsed ()) {
				window.location = $(this).prop ('href')
			}
		})
	}
	
	var session = {
	  	sid: null,
		timeout: null,
		init: function() {
			session.timeout = $("#session_ttl").val();
			session.set();
		},
		set: function() {
			if (!session.timeout) {
				return;
			}
			session.sid = setTimeout (function () {
				location.href = "/login.htm";
				return;
			}, session.timeout * 1000);
		},
		reset: function() {
			if (session.sid) {
				clearTimeout(session.sid);
			}
			session.set();
		}
	}
	
	   var menu = {
        init: function() {
            //menu.getAppInfos(menu.initMenus);
        },
        
        initMenus: function (menus) {
        	if(!menus) {
                $("#weixin").addClass("hidden");
                return;
            }
            if (menus['weixin.enable'] == 1) {
                $("#weixin").removeClass("hidden");
            } else {
                $("#weixin").addClass("hidden");
            }
            
            if (menus['weixin.contactsEnable'] == 1) {
                $("#weixinContacts").removeClass("hidden");
            } else {
                $("#weixinContacts").addClass("hidden");
            }
            
            if (menus['weixin.confEnable'] == 1) {
                $("#weixinConf").removeClass("hidden");
            } else {
                $("#weixinConf").addClass("hidden");
            }
            
            if (menus['weixin.journalEnable'] == 1) {
                $("#weixinJournal").removeClass("hidden");
            } else {
                $("#weixinJournal").addClass("hidden");
            }
            
            if (menus['weixin.lotteryEnable'] == 1) {
                $("#weixinLottery").removeClass("hidden");
            } else {
                $("#weixinLottery").addClass("hidden");
            }
            
            if (menus['weixin.noticeEnable'] == 1) {
                $("#weixinNotice").removeClass("hidden");
            } else {
                $("#weixinNotice").addClass("hidden");
            }
        },
        
        getAppInfos: function(callBack) {
            $.httpSend({
                url : "/weixin/appinfos",
                type : "get",
                success : function(jso) {
                    if (jso.code == 0) {
                        callBack(jso.content);
                    } else {
                        zx_console.growl({
                                    type : "error",
                                    title : '获取微信相关菜单失败',
                                    text : jso.message
                                });
                        return;
                    }
                }
            });
        }
    }

	return {
		init: function () {
			// Layouts
			zx_console.navEnhancedInit ()
			zx_console.navHoverInit ({ delay: { show: 250, hide: 350 } })      
			initLayoutToggles ()
			initNoticeBar ()

			// Components
			zx_console.initAccordions ()		
			zx_console.initFormValidation ()
			zx_console.initTooltips ()
			zx_console.initBackToTop ()		
			zx_console.initLightbox ()
			
			// session timeout
			session.init();
			
			menu.init();
		},
		updateEAB: function(ele) {
			var msgGrowl = $(ele).parents(".msgGrowl");
			$.httpSend({
				url : "/admin/eab/info/update/force",
				cache : false,
				type : "post",
				success : function(){
				},
				error : function(con) {
					zx_console.growl({type: "error", title: '错误', text: "通讯录更新失败"});
				}
			});
		},
		sessionTimeoutReset: session.reset
	}

}()

$(function () {
	console_admin.init ()
})
