<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="<c:url value="/resources/css/jquery-easyui-1.5.1/themes/default/easyui.css"/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value="/resources/css/jquery-easyui-1.5.1/themes/icon.css"/>" rel="stylesheet" type="text/css" />
	<link href="<c:url value="/resources/css/base.css"/>" rel="stylesheet" type="text/css" />
	<script src="<c:url value="/resources/js/jquery-easyui-1.4.1/jquery.easyui.min.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery-easyui-1.4.1/jquery.min.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/jquery-easyui-1.4.1/easyui-lang-zh_CN.js"/>" type="text/javascript"></script>
	<script src="<c:url value="/resources/js/base.js"/>" type="text/javascript"></script>
	<title>支付综合管理控制台</title>

	<style type="text/css">
		<!--
		body {
			left: 0px;
			width: 100%;
			height: 100%;
		}



		body.login #main {
			position: absolute;
			overflow: hidden;
			padding: 0 0 0;
			width: 1000px;
			margin-left: -550px;
			top: 20%;
			left: 50%;
			right: 50%;
		}


		.login-doLogin div {
			position: absolute;
			top: 35%;
			width: 524px;
			color: #FFFFFF;
			text-align: center;
		}

		-->
		#login-container {
			filter: alpha(Opacity = 80);
			-moz-opacity: 0.5;
			opacity: 1;
			z-index: 100;
		}

		#tbNJContent td {
			text-align: justify;
			text-justify: distribute;
			color: #4D4E52;
		}
	</style>

	<script language="javascript">

		//用户登录
		function checklogin() {

			if ($('#user_id').val() == '') {
				$.messager.alert('登录提示', '用户名不能为空！', 'info');
				return false;
			}
			if ($('#user_pwd').val() == '') {
				$.messager.alert('登录提示', '密码不能为空！', 'info');
				return false;
			}
			$.post("checkLogin.do",$("#loginForm").serialize(),function(json){
				if (json.success) {
					window.location.href = 'main/main.do';
				} else {
					$.messager.alert('提示', json.msg, 'info');
				}
			},'json');
		}

		$(document).keydown(function(event) {
			if (event.keyCode == 13) {
				checklogin();
			}
		});

	</script>


</head>
<body id="com-kyee" class="theme-default login">
<div id="main">
	<div align="right"style="text-align: right; margin: 0px 0px 0px 0px;">
		<div id="title-heading" class="pagetitle"
			 style="width: 100%; text-align: right;">
			<table border="0" cellpadding="0" cellspacing="0" align="center"
				   style="width: 100%; margin-top: 50px; margin-left: 470px;">
				<tr>
					<td style="width: 68%; text-align: left;"><a href=""
																 style="font-family: '微软雅黑'; color: #744834; margin-left: 0.8em; text-decoration: none; line-height: 32px; display: inline-block;">
						<span  style="font-size: 20pt; font-weight: bold"> &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;    </span>
					</a></td>
				</tr>
				<tr>
					<td style="width: 68%; text-align: left;"><a href=""
																 style="color: white; margin-left: 0.8em; text-decoration: none; line-height: 40px; display: inline-block;">
						<span  style="font-size: 16pt; font-weight: bold">&nbsp;&nbsp;</span>
					</a></td>
				</tr>
			</table>
		</div>
	</div>
	<div id="login-container"
		 style="width: 100%;margin-left: 350px;">
		<form id="loginForm" method="post" action=""
			  class="aui login-form-container">
			<fieldset class="compact-form-fields" id="nLogin"
					  style="display: block; top: 10px; left: 0px;">
				<legend class="assistive">
					<span>Log in to APP</span>
				</legend>
				<table border="0" cellpadding="0" cellspacing="0">
					<tr style="height: 50px;">
						<td>
							<div class="field-group">
								<label  style="font-family: '微软雅黑'; color: #003366"> 用&nbsp;&nbsp;&nbsp;户</label>
								<input id="user_id" name="user_id" type="text" />
							</div>
							<div class="field-group">
								<label  style="font-family: '微软雅黑'; color: #003366"> 密&nbsp;&nbsp;&nbsp;码 </label>
								<input id="user_pwd" name="user_pwd" type="password" />
							</div>
						</td>
					</tr>
					<tr style="height: 110px;">
						<td style="text-align: right;">
							<button type="button" style="width:100px;height:30px" onClick="checklogin()">登&nbsp;&nbsp;录</button>
						</td>
					</tr>
				</table>
			</fieldset>
		</form>
	</div>
</div>
</body>
</html>