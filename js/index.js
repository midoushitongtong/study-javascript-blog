
$(function () {

	//菜单

	$('#header .member').hover(function () {
		$(this).css('background', 'url(images/arrow2.png) no-repeat 53px center');
		$('#hedaer .member_ul').show().animate({
			mul : {
				o : 100,
				h : 103
			}
		});
	}, function () {
		$(this).css('background', 'url(images/arrow.png) no-repeat 53px center');
		$('#hedaer .member_ul').animate({
			mul : {
				o : 0,
				h : 0
			},
			fn : function () {
				$('#header .member_ul').hide();
			}
		});
	});

	$('#hedaer .member_ul li a').hover(function () {
		$(this).animate({
			t : 32,
			attr : 'backgroundPosition',
			target : 20
		});
	}, function () {
		$(this).animate({
			t : 32,
			attr : 'backgroundPosition',
			target : 13
		});
	});

	//菜单

	//画布

	var screen = $('#screen');

	//画布

	//登陆

	var login = $('#login');
	login.center(350, 250).resize(function () {
		if (login.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#hedaer .login').click(function () {
		login.center(350, 250).show();
		screen.lock().animate({
			t : 20,
			attr : 'o',
			target : 30,
		});
	});
	$('#login .close').click(function () {
		login.hide();
		screen.animate({
			t : 20,
			attr : 'o',
			target : 0,
			fn : function () {
				screen.unlock();
			}
		});		
	});

	//登陆
	
	//注册

	var reg = $('#reg');
	reg.center(600, 550).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#hedaer .reg').click(function () {
		reg.center(600, 550).show();
		screen.lock().animate({
			t : 20,
			attr : 'o',
			target : 30
		});
	});
	$('#reg .close').click(function () {
		reg.hide();
		screen.animate({
			t : 20,
			attr : 'o',
			target : 0,
			fn : function () {
				screen.unlock();
			}
		});		
	});

	//注册

	//拖拽

	reg.drag($('#reg h2').first());
	login.drag($('#login h2').first());

	//拖拽

	//分享

	$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	$(window).bind('scroll', function () {
		setTimeout(function () {
			$('#share').animate({
				attr : 'y',
				target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2,
				t : 3
			});
		}, 100);
	});
	$('#share').hover(function () {
		$(this).animate({
			attr : 'x',
			target : 0
		});
	}, function () {
		$(this).animate({
			attr : 'x',
			target : -211
		});
	});

	//分享

	//导航

	$('#nav .about li').hover(function () {
		var target  = $(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			t : 20,
			attr : 'x',
			target : target + 20,
			fn : function () {
				$('#nav .white').animate({
					t : 10,
					attr : 'x',
					target : -target
				});
			}
		});
	}, function () {
		$('#nav .nav_bg').animate({
			t : 20,
			attr : 'x',
			target : 20,
			fn : function () {
				$('#nav .white').animate({
					t : 10,
					attr : 'x',
					target : 0
				});
			}
		});
	});

	//导航

	//侧栏

	$('#sidebar h2').toggle(function () {
		$(this).next().animate({
			t : 13,
			mul : {
				o : 0,
				h : 0
			}
		});
	}, function () {
		$(this).next().animate({
			t : 13,
			mul : {
				o : 100,
				h : 150
			}
		});
	});

	//侧栏

	$('form').eq(0).first().reset();

	//注册

	//用户名

	$('form').eq(0).form('user').bind('focus', function () {
		$('#reg .info_user').show();
		$('#reg .succ_user').hide();
		$('#reg .error_user').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').hide();
		} else if (!check_user()) {
			$('#reg .info_user').hide();
			$('#reg .succ_user').hide();
			$('#reg .error_user').show();
		} else {
			$('#reg .info_user').hide();
			$('#reg .succ_user').show();
			$('#reg .error_user').hide();
		}
	});

	function check_user() {
		var flag = true;
		if (!/^([\w]{2,20})$/.test(trim($('form').form('user').value()))) {
			$('#reg .error_user').html('输入不合法，请重新输入');
			return false;
		} else {
			$('#reg .loading').show();
			ajax({
				method : 'post',
				url : 'implements/is_user.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#reg .info_user').hide();
						$('#reg .error_user').html('用户名已存在');
						flag = false;
					} else {
						flag = true;
					}
					$('#reg .loading').hide();
				},
				async : false
			});
		}
		return flag;
	}

	//用户名

	//密码

	$('form').eq(0).form('pass').bind('focus', function () {
		$('#reg .info_pass').show();
		$('#reg .succ_pass').hide();
		$('#reg .error_pass').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_pass').hide();
			$('#reg .succ_pass').hide();
			$('#reg .error_pass').hide();
		} else {
			 if (check_pass()) {
			 	$('#reg .info_pass').hide();
				$('#reg .succ_pass').show();
				$('#reg .error_pass').hide();
			} else {
				$('#reg .info_pass').hide();
				$('#reg .succ_pass').hide();
				$('#reg .error_pass').show();
			}	
		}
	});

	$('form').eq(0).form('pass').bind('keyup', function () {
		check_pass();
	});

	function check_pass() {
		var value = trim($('form').eq(0).form('pass').value());
		var value_length = value.length;
		var code_length = 0;

		if (value_length >= 6 && value_length <= 20) {
			$('#reg .info_pass .q1').html('●').css('color', 'orange');
		} else {
			$('#reg .info_pass .q1').html('○').css('color', '#ccc');
		}

		if (value_length > 0 && !/\s/.test(value)) {
			$('#reg .info_pass .q2').html('●').css('color', 'orange');
		} else {
			$('#reg .info_pass .q2').html('○').css('color', '#ccc');
		}

		if (/[\d]/.test(value)) {
			code_length++;
		}
		if (/[a-z]/.test(value)) {
			code_length++;
		}
		if (/[A-Z]/.test(value)) {
			code_length++;
		}
		if (/[^0-9a-zA-Z]/.test(value)) {
			code_length++;
		}
		if (code_length >= 2) {
			$('#reg .info_pass .q3').html('●').css('color', 'orange');
		} else {
			$('#reg .info_pass .q3').html('○').css('color', '#ccc');
		}

		if (value_length >= 10 && code_length >= 3) {
			$('#reg .info_pass .s1').css('color', 'orange');
			$('#reg .info_pass .s2').css('color', 'orange');
			$('#reg .info_pass .s3').css('color', 'orange');
			$('#reg .info_pass .s4').html('高').css('color', 'orange');
		} else if (value_length >= 8 && code_length >= 2) {
			$('#reg .info_pass .s1').css('color', 'orange');
			$('#reg .info_pass .s2').css('color', 'orange');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('中').css('color', 'orange');
		} else if (value_length >= 1) {
			$('#reg .info_pass .s1').css('color', 'orange');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('低').css('color', 'orange');
		} else {
			$('#reg .info_pass .s1').css('color', '#ccc');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('');
		}

		if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
			return true;
		} else {
			return false;
		}
	}

	//密码

	//密码

	$('form').eq(0).form('notpass').bind('focus', function () {
		$('#reg .info_notpass').show();
		$('#reg .succ_notpass').hide();
		$('#reg .error_notpass').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_notpass').hide();
		} else {
			if (check_notpass()) {
				$('#reg .info_notpass').hide();
				$('#reg .succ_notpass').show();
				$('#reg .error_notpass').hide();
			} else {
				$('#reg .info_notpass').hide();
				$('#reg .succ_notpass').hide();
				$('#reg .error_notpass').show();
			}
		}
	});

	function check_notpass() {
		if (trim($('form').eq(0).form('notpass').value()) == trim($('form').eq(0).form('pass').value())) return true;
	}

	//密码

	//提问

	$('form').eq(0).form('ques').bind('change', function () {
		if (check_ques()) $('#reg .error_ques').hide();
	});

	function check_ques() {
		if ($('form').eq(0).form('ques').value() != 0) return true;
	}

	//提问

	//问题

	$('form').eq(0).form('ans').bind('focus', function () {
		$('#reg .info_ans').show();
		$('#reg .succ_ans').hide();
		$('#reg .error_ans').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_ans').hide();
		} else {
			if (check_ans()) {
				$('#reg .info_ans').hide();
				$('#reg .succ_ans').show();
				$('#reg .error_ans').hide();
			} else {
				$('#reg .info_ans').hide();
				$('#reg .succ_ans').hide();
				$('#reg .error_ans').show();
			}
		}
	});

	function check_ans() {
		if (trim($('form').eq(0).form('ans').value()).length >= 2 && trim($('form').eq(0).form('ans').value()).length <= 20) return true;
	}

	//问题

	//邮箱

	$('form').eq(0).form('email').bind('focus', function () {

		//界面
		if ($(this).value().indexOf('@') == -1) {
			$('#reg .all_email').show();
		}

		$('#reg .info_email').show();
		$('#reg .succ_email').hide();
		$('#reg .error_email').hide();
	}).bind('blur', function () {

		//界面
		$('#reg .all_email').hide();

		if (trim($(this).value()) == '') {
			$('#reg .info_email').hide();
		} else {
			if (check_email()) {
				$('#reg .info_email').hide();
				$('#reg .succ_email').show();
				$('#reg .error_email').hide();
			} else {
				$('#reg .info_email').hide();
				$('#reg .succ_email').hide();
				$('#reg .error_email').show();
			}
		}
	});

	function check_email() {
		if (/^[\w\.\-]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
	}

	//自动

	$('form').eq(0).form('email').bind('keyup', function (event) {

		if ($(this).value().indexOf('@') == -1) {
			$('#reg .all_email').show();
			$('#reg .all_email li span').html($(this).value());
		} else {
			$('#reg .all_email').hide();
		}

	});

	$('form').eq(0).form('email').bind('keydown', function (event) {
		$('#reg .all_email li').css('background', 'none');

		//↓
		if (event.keyCode == 40) {
			if (this.index == undefined || this.index >= $('#reg .all_email li').length() - 1) {
				this.index = 0;
			} else {
				this.index ++;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#eee');
		}

		//↑
		if (event.keyCode == 38) {
			if (this.index == undefined || this.index <= 0) {
				this.index = $('#reg .all_email li').length() - 1;
			} else {
				this.index --;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#eee');
		}

		if (event.keyCode == 13) {
			$(this).value($('#reg .all_email li').eq(this.index).text());

			this.index = undefined;
			$('#reg .all_email').hide();
			
		}
		
	});

	$('#reg .all_email li').bind('mousedown', function () {
		$('form').eq(0).form('email').value($(this).text());
	});

	//自动

	$('#reg .all_email li').hover(function () {
		$(this).css('background', '#eee');
	}, function () {
		$(this).css('background', 'none');
	});

	//邮箱

	//日期

	var year = $('form').eq(0).form('year');
	var month = $('form').eq(0).form('month');
	var day = $('form').eq(0).form('day');

	for (var i = 1953; i <= 2016; i ++) {
		year.first().add(new Option(i, i), undefined);
	}

	for (var i = 1; i <= 12; i ++) {
		month.first().add(new Option(i, i), undefined);
	}

	var day30 = [4, 6, 9, 11];
	var day31 = [1, 3, 5, 7, 8, 10, 12];
	
	year.bind('change', select_day);
	month.bind('change', select_day);
	day.bind('change', function () {
		if (check_brithday()) $('#reg .error_brithday').hide();
	});

	function check_brithday() {
		if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}

	function select_day() {
		if (year.value() != 0 && month.value() != 0) {
			day.first().options.length = 1;
			var cur_day = 0;
			if (inArray(day31, parseInt(month.value()))) {
				cur_day = 31;
			} else if (inArray(day30, parseInt(month.value()))) {
				cur_day = 30;
			} else {
				if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0) {
					cur_day = 29;
				} else {
					cur_day = 28;
				}
			}
			for (var i = 1; i <= cur_day; i ++) {
				day.first().add(new Option(i, i), undefined);
			}
		} else {
			day.first().options.length = 1;
		}
	}

	//日期
	
	//ps

	$('form').eq(0).form('ps').bind('keyup', check_ps).bind('paste', function () {
		setTimeout(check_ps, 30);
	});

	$('#reg .ps .clear').click(function () {
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0, 200));
		check_ps();
	});

	function check_ps() {
		var num = 200 - $('form').eq(0).form('ps').value().length;
		if (num >= 0) {
			$('form .ps').eq(0).show();
			$('form .ps .num').eq(0).html(num);
			$('form .ps').eq(1).hide();
			return true;
		} else {
			$('form .ps').eq(0).hide();
			$('form .ps .num').eq(1).html(Math.abs(num)).css('color', 'blue');
			$('form .ps').eq(1).show();
			return false;
		}
	}

	//ps


	//提交

	$('form').eq(0).form('sub').click(function () {

		var flag = true;

		if (!check_user()) {
			$('#reg .error_user').show();
			flag = false;
		}

		if (!check_pass()) {
			$('#reg .error_pass').show();
			flag = false;
		}

		if (!check_notpass()) {
			$('#reg .error_notpass').show();
			flag = false;
		}

		if (!check_ques()) {
			$('#reg .error_ques').show();
			flag = false;
		}

		if (!check_ans()) {
			$('#reg .error_ans').show();
			flag = false;
		}

		if (!check_email()) {
			$('#reg .error_email').show();
			flag = false;
		}

		if (!check_brithday()) {
			$('#reg .error_brithday').show();
			flag = false;
		}

		if (!check_ps()) {
			flag = false;
		}

		if (flag) {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('正在提交注册中...');
			this.disabled = true;
			$(this).css('backgroundPosition', 'right');

			ajax({
				method : 'post',
				url : 'implements/register.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#loading').hide();
						$('#success').show().center(200, 40);
						$('#success p').html('注册成功');
						$('form').first().reset();
						_this.disabled = false;
						$(_this).css('backgroundPosition', 'left');

						setTimeout(function () {
							$('#success').hide();
							reg.hide();
							screen.animate({
								attr : 'o',
								target : 0,
								fn : function () {
									screen.unlock();
								}
							});
						}, 1500);

					}
				},
				async : true
			});

		}

	});

	//提交



	$('form').eq(1).form('sub').click(function () {
		if (/^[\w]{2,20}$/.test(trim($('form').eq(1).form('user').value())) && trim($('form').eq(1).form('pass').value()).length >= 6) {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('正在登陆中 ！');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'implements/is_login.php',
				data : $('form').eq(1).serialize(),
				success : function (text) {
					$('#loading').hide();
					if (text == 0) {
						$('#login .info').html('用户名或者密码不正确').show();
					} else {
						$('#login .info').html('');
						$('#success').show().center(200, 40);
						$('#success p').html('登陆成功请等待 ！');
						setCookie('user', trim($('form').eq(1).form('user').value()));						
						setTimeout(function () {
							$('#success').hide();
							login.hide();
							$('form').eq(1).first().reset();
							screen.animate({
								attr : 'o',
								target : 0,
								fn : function () {
									screen.unlock();
									$('#header .reg').hide();
									$('#header .login').hide();
									$('#header .info').show().html(getCookie('user') + '.你好');
								}
							});
						}, 1500);
					}
					_this.disabled = false;
					$(_this).css('backgroundPosition', 'left');
				},
				async : true
			});
		} else {
			$('#login .info').html('用户名或密码不正确！').show();
		}
	});



	//轮播器

	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color', '#666');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	var banner_index = 1;

	var banner_type = 1;

	var banner_time = setInterval(banner_fn, 3000);

	//手动
	$('#banner ul li').hover(function () {
		clearInterval(banner_time);
		if ($(this).css('color') != 'rgb(102, 102, 102)') {
			banner(this, banner_index == 0 ? $('#banner img').length() - 1 : banner_index - 1);
		}
	}, function () {
		banner_index = $(this).index() + 1;
		banner_time = setInterval(banner_fn, 3200);
	});

	function banner(obj, prev) {
		$('#banner ul li').css('color', '#eee');
		$(obj).css('color', '#666');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		if (banner_type == 1) {
			$('#banner img').eq(prev).animate({
				attr : 'o',
				target : 0
			});
			$('#banner img').eq($(obj).index()).animate({
				attr : 'o',
				target : 100
			});
		} else if (banner_type == 2) {
			$('#banner img').eq(prev).animate({
				attr : 'y',
				target : 150
			}).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'y',
				target : 0
			}).css('top', '-150px').opacity(100);
		}
	
	}

	function banner_fn() {
		if (banner_index >= $('#banner ul li').length()) banner_index = 0;
		banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner img').length() - 1 : banner_index - 1);
		banner_index ++;
	}

	//轮播器

	//坚持加载

	var wait_load = $('.wait_load');
	wait_load.opacity(0);

	$(window).bind('scroll', _wait_load);
	$(window).bind('resize', _wait_load);

	function _wait_load() {
		setTimeout(function () {
			for (var j = 0; j < wait_load.length(); j ++) {
				var _this = wait_load.ge(j);
				if (getInner().height + getScroll().top >= offsetTop(_this)) {
					$(_this).attr('src', $(_this).attr('xsrc')).animate({
						attr : 'o',
						target : 100
					});
				}
			}
		}, 100);
	};

	//坚持加载


	//预加载

	var photo_big = $('#photo_big');
	
	photo_big.center(610, 515).resize(function () {
		if (photo_big.css('display') == 'block') {
			screen.lock();
		}
	});

	$('#photo dl dt img').click(function () {
		photo_big.center(610, 515).show();
		screen.lock().animate({
			attr : 'o',
			target : 30
		});

		var temp_img = new Image();
		
		$(temp_img).bind('load', function () {
			$('#photo_big .big img').attr('src', temp_img.src).animate({
				attr : 'o',
				target : 100
			}).css('width', '600px').css('height', '452px').css('top', 0).opacity(0);
		});
		temp_img.src = $(this).attr('bigsrc');

		//预加载前后图片
		var children = this.parentNode.parentNode;
		
		prev_img_next(children);

	});

	$('#photo_big .close').click(function () {
		photo_big.hide();
		screen.animate({
			attr : 'o',
			target : 0,
			fn : function () {
				screen.unlock();
			}
		});
		//关闭窗口替换loading.gif
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '200px');
	});
	//拖拽
	photo_big.drag($('#photo_big h2').first());
	
	//预加载
	
	//鼠标经过

	$('#photo_big .big .left').hover(function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 62
		});
	}, function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 0
		});
	});

	$('#photo_big .big .right').hover(function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 62
		});
	}, function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 0
		});
	});

	//鼠标经过

	//预加载

	$('#photo_big .big .left').click(function () {

		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '200px');

		var current_img = new Image();

		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100
			}).css('width', '600px').css('height', '452px').css('top', 0).opacity(0);
		});
		current_img.src = $(this).attr('bigsrc');

		var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;

		prev_img_next(children);

	});

	$('#photo_big .big .right').click(function () {

		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '200px');

		var current_img = new Image();

		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100
			}).css('width', '600px').css('height', '452px').css('top', 0).opacity(0);
		});
		current_img.src = $(this).attr('bigsrc');

		var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;

		prev_img_next(children);

	});

	function prev_img_next(children) {

		var prev = prevIndex($(children).index(), children.parentNode);
		var next = nextIndex($(children).index(), children.parentNode);

		var prev_img = new Image();
		var next_img = new Image();

		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');

		$('#photo_big .big .left').attr('bigsrc', prev_img.src);
		$('#photo_big .big .right').attr('bigsrc', next_img.src);

		$('#photo_big .big img').attr('index', $(children).index());

		$('#photo_big .big .index').html(parseInt($(children).index()) + 1 + ' / ' + $('#photo dl dt img').length());
	}

	//预加载

	//发文

	var blog = $('#blog');
	blog.center(580, 350).resize(function () {
		if (blog.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#hedaer .member .blog').click(function () {
		blog.center(580, 350).show();
		screen.lock().animate({
			t : 20,
			attr : 'o',
			target : 30
		});
	});
	$('#blog .close').click(function () {
		blog.hide();
		screen.animate({
			t : 20,
			attr : 'o',
			target : 0,
			fn : function () {
				screen.unlock();
			}
		});		
	});

	blog.drag($('#blog h2').first());

	$('form').eq(2).form('sub').click(function () {
		if (trim($('form').eq(2).form('title').value()).length <= 0 || trim($('form').eq(2).form('content').value()).length <= 0) {
			$('#blog .info').html('发表失败：标题或者内容不能为空！').show();
		} else {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('正在发表中 ！');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'implements/add_blog.php',
				data : $('form').eq(2).serialize(),
				success : function (text) {
					$('#loading').hide();
					if (text == 1) {
						$('#blog .info').html('');
						$('#success').show().center(200, 40);
						$('#success p').html('发文成功请等待 ！');					
						setTimeout(function () {
							$('#success').hide();
							blog.hide();
							$('form').eq(2).first().reset();
							screen.animate({
								attr : 'o',
								target : 0,
								fn : function () {
									screen.unlock();

									$('#index').html('<span class="loading"></span>');
									$('#index .loading').show();

									ajax({
										method : 'post',
										url : 'implements/get_blog.php',
										data : {},
										success : function (text) {
											$('#index .loading').hide();
											var json = JSON.parse(text);
											var html = '';
											for (var i = 0; i < json.length; i ++) {
												html += '<div class="content"><h2><em>' + json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
											}
											$('#index').html(html);
											for (var i = 0; i < json.length; i ++) {
												$('#index .content').eq(i).animate({
													attr : 'o',
													target : 100
												});
											}
										},
										async : true
									});
									
								}
							});
						}, 1500);
					}
					_this.disabled = false;
					$(_this).css('backgroundPosition', 'left');
				},
				async : true
			});
		}
	});

	//发文

	//获取发文

	$('#index').html('<span class="loading"></span>');
	$('#index .loading').show();

	ajax({
		method : 'post',
		url : 'implements/get_blog.php',
		data : {},
		success : function (text) {
			$('#index .loading').hide();
			var json = JSON.parse(text);
			var html = '';
			for (var i = 0; i < json.length; i ++) {
				html += '<div class="content"><h2><em>' + json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
			}
			$('#index').html(html);
			for (var i = 0; i < json.length; i ++) {
				$('#index .content').eq(i).animate({
					attr : 'o',
					target : 100
				});
			}
		},
		async : true
	});

	//获取发文

	//skin

	var skin = $('#skin');

	skin.center(580, 350).resize(function () {
		if (skin.css('display') == 'block') {
			screen.lock();
		}
	});

	$('#hedaer .member .skin').click(function () {
		skin.center(580, 350).show();
		screen.lock().animate({
			t : 20,
			attr : 'o',
			target : 30
		});
		$('#skin .skin_bg').html('<span class="loading"></span>');

		ajax({
			method : 'post',
			url : 'implements/get_skin.php',
			data : {
				type : 'all'
			},
			success : function (text) {
				var json = JSON.parse(text);
				var html = '';
				for (var i = 0; i < json.length; i ++) {
					html += '<dl><dt><img src="images/' + json[i].small_bg + '" big_bg="' + json[i].big_bg + '" bg_color="' + json[i].bg_color + '"></dt><dd>' + json[i].bg_text + '</dd></dl>';
				}
				$('#skin .skin_bg').html(html).animate({
					attr : 'o',
					target : 100
				}).opacity(0);

				$('#skin dl dt img').click(function () {
					$('body').css('background', $(this).attr('bg_color') + ' ' + 'url(images/' + $(this).attr('big_bg') + ') no-repeat');
					ajax({
						method : 'post',
						url : 'implements/get_skin.php',
						data : {
							type : 'set',
							big_bg : $(this).attr('big_bg')
						},
						success : function (text) {
							if (text == 1) {
								$('#success').center(200, 40);
								$('#success').show();
								$('#success p').html('　　成功');
								setTimeout(function () {
									$('#success').hide();
								}, 1200);
							}
						},
						async : false
					});
				});

			},
			async : true
		});

	});
	$('#skin .close').click(function () {
		skin.hide();
		screen.animate({
			t : 20,
			attr : 'o',
			target : 0,
			fn : function () {
				screen.unlock();
			}
		});		
	});

	skin.drag($('#skin h2').first());

	ajax({
		method : 'post',
		url : 'implements/get_skin.php',
		data : {
			type : 'main'
		},
		success : function (text) {
			var json = JSON.parse(text);
			$('body').css('background', json.bg_color + ' ' + 'url(images/' + json.big_bg + ') no-repeat');
		},
		async : true
	});

	//skin



});