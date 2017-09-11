<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html class="no-js" lang="en">

<head>
<title>数据搜索</title>

<!--右边表格-->
<link rel="stylesheet" href="/static/css/font-awesome.css">
<link rel="stylesheet" href="/static/css/bootstrap.css">
<link rel="stylesheet" href="/static/css/console-admin.css">
<link rel="stylesheet" href="/static/css/console-flat.css">
<link rel="stylesheet" href="/static/css/ucc.css">
<link rel="stylesheet" href="/static/css/scojs.css">
<link rel="stylesheet" href="/static/css/msgGrowl.css">

<script src="/static/js/jquery-1.11.0.min.js"></script>
<script src="/static/js/jquery-migrate-1.1.0.min.js"></script>

<script src="/static/js/bootstrap.min.js"></script>
<!-- App JS -->
<script src="/static/js/jquery.validate.js"></script>
<script src="/static/js/jquery.blockUI.js"></script>
<script src="/static/js/console-core.js"></script>
<script src="/static/js/console-admin.js"></script>
<script src="/static/js/sco.modal.js"></script>
<script src="/static/js/sco.confirm.js"></script>
<script src="/static/js/msgGrowl.js"></script>
<script src="/static/js/httpSend.js"></script>
<script src="/static/js/jquery_dataTable.js"></script>
<script src="/static/js/dataTables.js"></script>
<script src="/static/js/parsley.js"></script>
<script src="/static/js/search/search.js"></script>

<style type="text/css">
td a.btn {
	padding: 6px 9px;
}
</style>
</head>

<body>

	<div style="height:30%"></div>
	<div>
		<!-- 数据搜索begin -->
		<form id="production-data-search-form" method="post"
			class="form-horizontal">
			<div class="row">

				<label class="col-md-4 control-label"><h4>搜索条件</h4></label>
				<div class="col-md-2">
					<div class="form-group" style="left: 11px">
						<select id="search-type-select" class="btn btn-default"
							style="width: 120px">
							<option value="mac">MAC搜索</option>
							<option value="sn">SN搜索</option>
						</select>
					</div>
				</div>

				<div class="col-md-2">
					<div class="form-group">
						<input id="data-search" name="data-search" title="搜索"
							style="width: 250px; float: right" type="text"
							class="form-control">
					</div>
				</div>
				<div class="col-md-1">
					<button type="submit" class="btn btn-secondary"
						 title="根据MAC地址/IMEI搜索">搜索</button>
				</div>
			</div>
		</form>
		<!-- 数据搜索end -->
		
		<br />
		<br />
		<div>
			<table id="show-imei-form" class="table keyvalue-table" style="width:35%;margin:0 auto">
				<tr>
					<td class="kv-key"><h4>IMEI</h4></td>
					<td id="imeiValue" class="kv-value"></td>
				</tr>
			</table>
		</div>
				
	</div>
	
	

</body>
</html>