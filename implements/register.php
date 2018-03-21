<?php

	require dirname(__FILE__).'/config.php';

	$_birthday = $_POST['year'].'-'.$_POST['month'].'-'.$_POST['day'];

	$query = "INSERT INTO blog_user (
										user,
										pass,
										ques,
										ans,
										email,
										brithday,
										ps
									) 
							VALUES (
										'{$_POST['user']}',
										sha1('{$_POST['pass']}'),
										'{$_POST['ques']}',
										'{$_POST['ans']}',
										'{$_POST['email']}',
										'$_birthday',
										'{$_POST['ps']}'
									)";

	mysql_query($query) or die ('写入失败'.mysql_error());
	sleep(1);
	echo mysql_affected_rows();

	mysql_close();

?>