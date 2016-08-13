<?php
/**
 * author       : dot.f <fangyanliang@yiban.cn>
 * createTime   : 2016/8/10 11:41
 * description  :
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class HistoryController extends Controller
{
	//随机生成ip算法
	public function rand_ip(){
		$ip_long = array(
	        array('607649792', '608174079'), //36.56.0.0-36.63.255.255
	        array('975044608', '977272831'), //58.30.0.0-58.63.255.255
	        array('999751680', '999784447'), //59.151.0.0-59.151.127.255
	        array('1019346944', '1019478015'), //60.194.0.0-60.195.255.255
	        array('1038614528', '1039007743'), //61.232.0.0-61.237.255.255
	        array('1783627776', '1784676351'), //106.80.0.0-106.95.255.255
	        array('1947009024', '1947074559'), //116.13.0.0-116.13.255.255
	        array('1987051520', '1988034559'), //118.112.0.0-118.126.255.255
	        array('2035023872', '2035154943'), //121.76.0.0-121.77.255.255
	        array('2078801920', '2079064063'), //123.232.0.0-123.235.255.255
	        array('-1950089216', '-1948778497'), //139.196.0.0-139.215.255.255
	        array('-1425539072', '-1425014785'), //171.8.0.0-171.15.255.255
	        array('-1236271104', '-1235419137'), //182.80.0.0-182.92.255.255
	        array('-770113536', '-768606209'), //210.25.0.0-210.47.255.255
	        array('-569376768', '-564133889'), //222.16.0.0-222.95.255.255
	    );
		$rand_key = mt_rand(0, 14);
		$huoduan_ip= long2ip(mt_rand($ip_long[$rand_key][0], $ip_long[$rand_key][1]));
		return $huoduan_ip;
	}

	//模拟登录
	public function login_post($url, $cookie, $post,$headerArr) {
	    $curl = curl_init();//初始化curl模块
	    curl_setopt($curl, CURLOPT_URL, $url);//登录提交的地址
	    curl_setopt($curl, CURLOPT_HEADER, 0);//是否显示头信息
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 0);//是否自动显示返回的信息
	    curl_setopt($curl, CURLOPT_COOKIEJAR, $cookie); //设置Cookie信息保存在指定的文件中
	    curl_setopt($curl, CURLOPT_POST, 1);//post方式提交
	    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($post));//要提交的信息
	    curl_setopt($curl, CURLOPT_HTTPHEADER , $headerArr );  //构造IP
	    curl_exec($curl);//执行cURL
	    curl_close($curl);//关闭cURL资源，并且释放系统资源
	}
	//登录成功后获取数据
	public function get_content($url, $cookie,$post,$headerArr) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie); //读取cookie
	    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));//要提交的信息
	    curl_setopt($ch, CURLOPT_HTTPHEADER , $headerArr );  //构造IP
	    $rs = curl_exec($ch); //执行cURL抓取页面内容
	    curl_close($ch);
	    return $rs;
	}

	//拼接Header字符串
	public function get_header_str($header){
		$headerArr = array();
		foreach( $header as $n => $v ) {
			$headerArr[] = $n .':' . $v;
		}
		return $headerArr;
	}

	/*
	 * 判断是否是正确的手机号，以及手机的运营商
	 * @param {String} num
	 *
	 * 返回值:
	 *      0 不是手机号码
	 *      1 移动
	 *      2 联通
	 *      3 电信
	 *      4 不确定
	 */
	public function isPhoneNum($num) {
		$lag = 0;
		$phoneRe = '/^1\d{10}$/';
		$dx = [133,153,180,181,189]; /*电信*/
		$lt = [130,131,132,145,155,156,185,186];/*联通*/
		$yd = [134,135,136,137,138,139,147,150,151,152,157,158,159,182,183,184,187,188];/*移动*/


		if(preg_match($phoneRe,$num)){
			$temp = substr($num , 0 , 3);
			if(inArray($temp,$yd)) return 1;
			if(inArray($temp,$lt)) return 2;
			if(inArray($temp,$dx)) return 3;
			return 4;
		}
		return flag;
	}

	public function inArray($val,$arr){
		for($i=0;$i<count($arr);$i++){
			if($val == $arr[$i]) return true;
		}
		return false;
	}

	public function get_phone_servers($id){
		$arr = [
	        '格式错误',//0
	        '移动',//1
	        '联通',//2
	        '电信',//3
	        '没有服务'//4
        ];
        return $arr[$id];
    }


    public function index()
    {
    	$cookie_file = storage_path('cookie') . '/cookie.txt';

		if(!file_exists($cookie_file)){	    //如果文件不存在（默认为当前目录下）
			$fh = fopen($cookie_file,"w");
		    fclose($fh);		    //关闭文件
		}

		$login_url  = 'http://service.js.10086.cn/actionDispatcher.do';
		$get_url = 'http://service.js.10086.cn/my/actionDispatcher.do';

		$ip = self::rand_ip();

		$post = array(
			"userLoginTransferProtocol"=>"https",
			"redirectUrl"=>"index.html",
			"reqUrl"=>"login",
			"busiNum"=>"LOGIN",
			"operType"=>"0",
			"passwordType"=>"1",
			"isSavePasswordVal"=>"0",
			"isSavePasswordVal_N"=>"1",
			"currentD"=>"1",
			"loginFormTab"=>"http",
			"loginType"=>"1",
			"phone-login"=>"on",
			"mobile"=>"18860975543",
			"city"=>"NJDQ",
			"password"=>"880920",
			"verifyCode"=>"",
			);

		$header = array(
			"Accept"=>"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Language"=>"en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,af;q=0.2,zh-TW;q=0.2,ja;q=0.2",
			"Cache-Control"=>"max-age=0",
			"Connection"=>"keep-alive",
			"Content-Type"=>"application/x-www-form-urlencoded",
			"Cookie"=>"yjcxFlag=1; WTCX_MY_ZHYEJYXQ=MY_ZHYEJYXQ+1470798252502; nulluserQuitCountMonthALL7=1; forwardActSmqllNew=1; WTCX_MY_INDEX=MY_INDEX+1470823491725; WTCX_MY_WDTC=MY_WDTC+1470824456082; 18860975543userQuitCountMonthALL7=1; last_success_login_mobile=18860975543; WTCX_MY_QDCX=MY_QDCX+1470826259321; city=NTDQ; CmLocation=250|250; onedayonetime=1; AlteonP=AuT2I2ddqMBRw+4tKqMIDg$$; JSESSIONID=ydxQXtGF20RGqB1Yg9xmvKQlywqHxTJklLtNpwBHwGZqwF74nPRQ!758079959; topUserMobile=; CmProvid=js; WT_FPC=id=2d7388b25365f5f5dcf1470797470989:lv=1470989494378:ss=1470989479135; login_error_number_https=18860975543; login_error_loginType_https=1; login_error_passwordType_https=1",
			"Host"=>"service.js.10086.cn",
			"Origin"=>"http://service.js.10086.cn",
		    "Referer"=>"http://service.js.10086.cn/login.html?url=index.html",//登陆之后跳转
		    "Upgrade-Insecure-Requests"=>"1",
		    "User-Agent"=>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
		    "CLIENT-IP" => "".$ip."",
		    "X-FORWARDED-FOR" => "".$ip."",
		    );

		$headerStr = self::get_header_str($header);

		//清除返回跳转页面
		ob_start();
		self::login_post($login_url, $cookie_file, $post,$headerStr);
		ob_end_clean();

		$data = array(
			'reqUrl' => "MY_QDCXQueryNew",
			'busiNum' => "QDCX",
			'queryMonth' => "201608",
			'queryItem' => "1",
			'qryPages'=> "1:1002:-1",
			'qryNo' =>"1",
			'operType' =>"3",
			'queryBeginTime' =>"2016-08-01",
			'queryEndTime' => "2016-08-31",
			);

		$header = array(
			"Accept"=>"*/*",
			"Accept-Language"=>"en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,af;q=0.2,zh-TW;q=0.2,ja;q=0.2",
			"Connection"=>"keep-alive",
			"Content-Type"=>"application/x-www-form-urlencoded; charset=UTF-8",
			"Host"=>"service.js.10086.cn",
			"Origin"=>"http://service.js.10086.cn",
			"Referer"=>"http://service.js.10086.cn/my/MY_QDCX.html?t=1470992283837",
			"User-Agent"=>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
			"X-Requested-With"=>"XMLHttpRequest",
			"CLIENT-IP" => "".$ip."",
			"X-FORWARDED-FOR" => "".$ip."",
			);

		$headerStr = self::get_header_str($header);

		echo self::get_content($get_url,$cookie_file,$data,$headerStr);

	}
}
