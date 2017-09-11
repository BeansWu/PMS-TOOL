(function($) {
	
	$.httpSend = function(param) {
		
		var option = {
			url: "/admin/test",
			data: "name=wq",
			type: "get",
			dataType: "json",
			cache: false,
			timeout: 15000,
			success: null,
			error : null,
			resetSession:true
		}
		option = $.extend(option, param);
		if (!option.success) {
			option.success = function(data){};
		}
		if (!option.error) {
			option.error = function(e){};
		}
		
		// 增加错误处理
		if($.aop){
			$.aop.before({target: option, method: 'error'}, errorHandler);
		}
		
		// 处理eab更新
		if (option.eab && $.aop) {
			$.aop.after({target: option, method: 'success'}, eabHandler);
		}
		
		// 处理eab更新 自服用
		if (option.eabSelf && $.aop) {
			$.aop.after({target: option, method: 'success'}, eabeabSelfHandler);
		}
		
		// 增加会话超时处理
		if(option.resetSession&&$.aop){
			$.aop.after({target: option, method: 'success'}, sessionTimeoutHandler);
			$.aop.after({target: option, method: 'error'}, sessionTimeoutHandler);
		}
		
		
		$.ajax(option);
	};
	
	$.httpSendForm = function(param) {
		var id = param.formId;
		if(!id){
			zx_console.growl({type: "error", title: '请求失败', text: '请求参数[formId]缺少表单的id'});
			return false;
		}
		if(id.indexOf("#") != 0){
			id = "#"+id;
		}
		var option = {
				type:"POST",
				dataType:"json",
				contentType : "multipart/form-data",
				cache : false,
				timeout : 10000,
				beforeSubmit : function(){
					return true;
				},
				success:null,
				error : null,
				resetSession:true
		}
		option = $.extend(option, param);
		if (!option.success) {
			option.success = function(data){};
		}
		if (!option.error) {
			option.error = function(e){};
		}
		
		// 增加错误处理
		if($.aop){
			$.aop.before({target: option, method: 'error'}, errorHandler);
		}
		// 处理eab更新
		if (option.eab && $.aop) {
			$.aop.after({target: option, method: 'success'}, eabHandler);
		}
		// 增加会话超时处理
		if(option.resetSession&&$.aop){
			$.aop.after({target: option, method: 'success'}, sessionTimeoutHandler);
			$.aop.after({target: option, method: 'error'}, sessionTimeoutHandler);
		}
		
		$(id).ajaxSubmit(option);
		return true;
	}
	
	var errorHandler = function(e) {
		if (e[0].status == 401) {
			location.href = "/index.htm";
			return;
		}
		zx_console.growl({type: "error", title: '请求提示', text: '请求失败，无法连接到服务端. code=[ '+ e[0].status +' ]'});
	}
	
	var eabCnt = 0;
	var eabHandler = function(data) {
		if(data==false){
			return;
		}
		
		// 通知后台eab有变更
		$.httpSend({
			url:'/admin/notice/setNoticeIsEdit',
			data:data,
			success: function(data){
				if(data.code != 0){
					zx_console.growl({type: "error", title: '提示信息', text: data.message});
					return;
				}
			}
		});
		
		/*
		 * 有了固定的更新按钮，弹出框的提示不需要了，注释 by vince 2014-12-16 10:02:28
		 * zx_console.growl({ type: "info", title: '提示信息', html:
		 * '您的操作涉及企业通讯的变更，系统最迟将在' + $("#eab_update_period").val() +
		 * '小时内统一更新，您也可以选择<a eab="' + (++eabCnt) + '"
		 * href="javascript:void(0)">立即更新</a>以便客户端能立即下载到最新的通讯录', lifetime:
		 * 15000, onOpen: function(msgGrowl) {
		 * msgGrowl.siblings().has("a[eab]").each(function() { var cnt =
		 * $(this).find("a[eab]").attr("eab"); if (cnt < eabCnt) {
		 * $(this).fadeOut('fast', function() { $(this).remove (); }); } });
		 * msgGrowl.find("a").click(function() { if (msgGrowl && msgGrowl.length &&
		 * msgGrowl.is(":visible")) { console_admin.updateEAB();
		 * msgGrowl.fadeOut('medium', function() { $(this).remove (); }); } }); },
		 * onClose: function(msgGrowl) { } });
		 */
	}
	
	var eabeabSelfHandler = function(data) {
		if(data==false){
			return;
		}
		
		// 通知后台eab有变更
		$.httpSend({
			url:'/self/privacy/setNoticeIsEdit',
			data:data,
			success: function(data){
				if(data.code != 0){
					zx_console.growl({type: "error", title: '提示信息', text: data.message});
					return;
				}
			}
		});
	}
	
	var sessionTimeoutHandler = function() {
			console_admin.sessionTimeoutReset();
	}
	
})(jQuery);