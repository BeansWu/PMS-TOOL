var search = {

	// 获取IMEI
	getImei : function() {
		$.blockUI({ message: '<img src="././static/image/wait.png" height="200" width="150" />',
			   css: {top: '30%',left: '40%',width: '0%',border: '0px'},
			   overlayCSS:{ backgroundColor: '#F5F5F5',opacity: 0.8,cursor: 'default'},
			   fadeIn : 1000
			});
		var key = $("#search-type-select option:selected").val();
		var value = $("#data-search").val();
		$.get("/self/produce/tool/search", {
			key : key,
			value : value
		}, function(ret) {
			var result;
			if (ret.code == 0) {
				$("#imeiValue").children("span").remove();
				$("#imeiValue").append(
						"<span style='color:red'><h4>" + ret.content
								+ "</h4></span>");
			} else {
				$("#imeiValue").children("span").remove();
				$("#imeiValue").append(
						"<span style='color:red'><h4>查询不到数据</h4></span>");
			}
			$.unblockUI({fadeOut : 1000});
		});
	},

}

$(document).ready(function() {
	// 表单验证
	$("#production-data-search-form").validate({
		rules : {
			"data-search" : {
				required : true,
			}
		},
		messages : {
			"data-search" : {
				required : "<span style='color:red'>搜索值不能为空</span>"
			}
		},
		submitHandler : function(form) {
			search.getImei();
		}
	});
});
