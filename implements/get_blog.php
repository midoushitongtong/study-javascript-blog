<?php

	require 'config.php';

	$query = mysql_query("SELECT title,content,date FROM blog_blog ORDER BY date DESC LIMIT 0,3");

	$json = '';
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		$json .= json_encode($row).',';
	}
	sleep(1);
	echo '['.substr($json, 0, strlen($json) - 1).']';

?>