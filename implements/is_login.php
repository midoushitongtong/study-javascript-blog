<?php
	require 'config.php';
	$_pass = sha1($_POST['pass']);
	$query = mysql_query("SELECT user,pass FROM blog_user WHERE user='{$_POST['user']}' AND pass='{$_pass}' LIMIT 1");
	if (mysql_fetch_array($query)) {
		sleep(1);
		echo 1;
	} else {
		sleep(1);
		echo 0;
	}
	mysql_close();
?>