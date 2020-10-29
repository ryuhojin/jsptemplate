<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="private"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="-1"/>
	
    <meta name="_csrf_header" content="<c:out value='${_csrf.headerName}'/>"/>
    <meta name="_csrf" content="<c:out value='${_csrf.token}'/>"/>
	
    <title>BNK 시스템 템플릿</title>
	
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

	//css는 헤더에 추가하세요
</head>
<body>
	<div class="wrapper">
		<jsp:include page="/WEB-INF/views/common/헤더"/>
		<jsp:doBody/>
		<jsp:include page="/WEB-INF/views/common/푸터.jsp"/>
	</div>
	//scdript는 바디의 마지막에 추가하세요
</body>
</html>