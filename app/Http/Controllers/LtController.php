<?php
/**
 * author       : dot.f <fangyanliang@yiban.cn>
 * createTime   : 2016/8/10 11:41
 * description  : 联通用户通话记录抓取
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class LtController extends Controller
{
	/**
	*	@return String
	*
	* 	@desc 随机生成ip算法,预防服务器ip限制
	*/
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
	/**
	 *
	 *	@param $url 		String 	(http://www.webdomin.com/api/data)
	 *	@param $cookieFile 	String 	(/filepath/../filename.ext)
	 *	@param $post 		Array
	 *	@param $headerArr 	Array
	 *
	 *	@return json_string
	 *	
	 *	@desc 模拟POST登录，并存储cookie信息
	*/
	public function login_post($url, $cookieFile, $post,$headerArr) {
	    	$ch = curl_init();//初始化curl模块
	    	curl_setopt($ch, CURLOPT_URL, $url);//登录提交的地址
	    	curl_setopt($ch, CURLOPT_HEADER, 1);//是否显示头信息
	    	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//是否自动显示返回的信息
	    	curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile); //设置Cookie信息保存在指定的文件中
	    	curl_setopt($ch, CURLOPT_POST, 1);//post方式提交
	    	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));//要提交的信息
	    	curl_setopt($ch, CURLOPT_HTTPHEADER , $headerArr );  //构造IP
	    	$rs = curl_exec($ch); //执行cURL抓取页面内容
	    	curl_close($ch);
	    	return $rs;
	}
	/**
	 *
	 *	@param $url 		String 	(http://www.webdomin.com/api/data)
	 *	@param $cookieFile 	String 	(/filepath/../filename.ext)
	 *	@param $get 		Array
	 *	@param $headerArr 	Array
	 *
	 *	@return json_string
	 *	
	 *	@desc 模拟GET登录，并存储cookie信息
	*/
	public function login_get($url,$cookieFile, $get,$headerArr)
	{
		$ch = curl_init();//初始化curl模块
		curl_setopt($ch, CURLOPT_URL, $url."?".http_build_query($get));//登录提交的地址
		curl_setopt($ch, CURLOPT_HEADER, 0);//是否显示头信息
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 0);//是否自动显示返回的信息
		curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile); //设置Cookie信息保存在指定的文件中
		curl_setopt($ch, CURLOPT_HTTPHEADER , $headerArr );  //构造IP
		$rs = curl_exec($ch); //执行cURL抓取页面内容
		curl_close($ch);
		return $rs;
	}
	/**
	 *	通过login接口的cookie，查询之前请求检查登陆，并从新记录cookie,
	 *	跳过此步会导致查询不成功，联通特点
	 *
	 *	@param $url 		String 	(http://www.webdomin.com/api/data)
	 *	@param $cookieFile 	String 	(/filepath/../filename.ext)
	 *	@param $post 		Array
	 *	@param $headerArr 	Array
	 *
	 *	@return json_string
	 *	
	 *	@importent 
	*/
	public function checkLogin($url,$cookieFile, $post,$headerArr)
	{
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile); //读取cookie
		curl_setopt($ch, CURLOPT_COOKIEJAR, $cookieFile); //设置Cookie信息保存在指定的文件中
		curl_setopt($ch, CURLOPT_POST, 1);//post方式提交
		curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));//要提交的信息
		curl_setopt($ch, CURLOPT_HTTPHEADER , $headerArr );  //构造IP
		$rs = curl_exec($ch); //执行cURL抓取页面内容
		curl_close($ch);
		return $rs;
	}
	/**
	 *	@desc 根据$cookiePath获取cookie,并根据cookie
	 *	登录成功后获取数据
	 *
	 *	@param $url 		String 	(http://www.webdomin.com/api/data)
	 *	@param $cookieFile 	String 	(/filepath/../filename.ext)
	 *	@param $post 		Array
	 *	@param $headerArr 	Array
	 *
	 *	@return json_string
	*/
	public function get_content($url, $cookieFile,$post,$headerArr) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    	curl_setopt($ch, CURLOPT_COOKIEFILE, $cookieFile); //读取cookie
	    	curl_setopt($ch, CURLOPT_POST, 1);//post方式提交
	    	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));//要提交的信息
	    	curl_setopt($ch, CURLOPT_HTTPHEADER , $headerArr );  //构造IP
	    	$rs = curl_exec($ch); //执行cURL抓取页面内容
	    	curl_close($ch);
	    	return $rs;
	}
	/**
	 *	@desc 拼接Header字符串
	 *
	 *	@param $header 	Array
	 *
	 *	@return String
	*/
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
	/**
	*
	* 	@desc 判断元素是否在数组中
	*	
	*	@param $val String
	*	@param $arr Array
	*	
	*	@return bool
	*/
	public function inArray($val,$arr){
		for($i=0;$i<count($arr);$i++){
			if($val == $arr[$i]) return true;
		}
		return false;
	}

	/**
	*
	* 	@desc 获取对应id的运营商名称
	*	
	*	@param $id Interget
	*	
	*	@return String
	*/
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
	/**
	*
	* 	@desc 获取毫秒级别的时间戳
	*	
	*	@return Float(length=13)
	*/
	public function getMillisecond() {
		list($t1, $t2) = explode(' ', microtime());
		return (float)sprintf('%.0f',(floatval($t1)+floatval($t2))*1000);
	}

    public function index()
    {
    	//cookie file path

    		$cookie_file = storage_path('cookie') . '/cookie.lt.txt';

    	//如果文件不存在（默认为当前目录下）

		if(!file_exists($cookie_file)){	    
			$fh = fopen($cookie_file,"w");
		    fclose($fh);
		}

		//登陆url

		$login_url  = 'https://uac.10010.com/portal/Service/MallLogin';

		//伪造ip

		$ip = self::rand_ip();

		$userName = xxx;
		$password = xxx;

		//获取13位的时间戳

		$requestTime = self::getMillisecond();

		$get = array(
			"callback"=>"jQuery1720271313352129561_".$requestTime,
			"req_time"=>$requestTime,
			"redirectURL"=>"http://www.10010.com",
			"userName"=> $userName,
			"password"=> $password,
			"pwdType"=>"01",
			"productType"=>"01",
			"redirectType"=>"01",
			"rememberMe"=>"1",
			"_"=>$requestTime
		);

		$header = array(
			"Accept"=>"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Language"=>"en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,af;q=0.2,zh-TW;q=0.2,ja;q=0.2",
			"Cache-Control"=>"max-age=0",
			"Connection"=>"keep-alive",
			"Content-Type"=>"application/x-www-form-urlencoded",
			"Host"=>"uac.10010.com",
			"Origin"=>"https://uac.10010.com",
		    "Referer"=>"https://uac.10010.com/portal/homeLogin",//登陆之后跳转
		    "Upgrade-Insecure-Requests"=>"1",
		    "User-Agent"=>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
		    "CLIENT-IP" => "".$ip."",
		    "X-FORWARDED-FOR" => "".$ip."",
		);

		$headerStr = self::get_header_str($header);

		//清除返回跳转页面
		ob_start();
		self::login_get($login_url, $cookie_file, $get,$headerStr);
		ob_end_clean();
		$header = array(
			"Accept"=>"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
			"Accept-Language"=>"en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,af;q=0.2,zh-TW;q=0.2,ja;q=0.2",
			"Cache-Control"=>"max-age=0",
			"Connection"=>"keep-alive",
			"Content-Type"=>"application/x-www-form-urlencoded",
			"Host"=>"iservice.10010.com",
			"Origin"=>"https://iservice.10010.com",
		    "Referer"=>"iservice.10010.com/e3/query/call_dan.html",//登陆之后跳转
		    "Upgrade-Insecure-Requests"=>"1",
		    "User-Agent"=>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
		    "CLIENT-IP" => "".$ip."",
		    "X-FORWARDED-FOR" => "".$ip."",
			"X-Requested-With">"XMLHttpRequest"
		    );

		//联通特有的 查询之前先请求checklogin
		$checkLoginUrl = "http://iservice.10010.com/e3/static/check/checklogin";

		//添加时间戳参数
		$checkLoginUrl .= "?_=".self::getMillisecond();

		$checkResultJsonString = self::checkLogin($checkLoginUrl, $cookie_file, $get,$header);

		$checkResultArray = json_decode( $checkResultJsonString );
		
		//var_dump($checkResultArray);
		//@todo: 0 dx 1 yd 2 lt 3 no
		//@todo: 记录登陆成功比
		//@todo: 记录检查登陆成功比
		//@todo: 记录数据查询成功比
		//@todo: 日志格式

		if($checkResultArray && $checkResultArray->isLogin){
			//add success log
		}else{
			//add error log
			return json_encode(array(
				'result'=>0
			));
		}

		//查询参数数组
		$data = array(
			'pageNo' => "1",
			'pageSize' => "500",
			'beginDate' =>"2016-07-01",
			'endDate' => "2016-07-31",
		);
		
		//联通url的随带参数

		$urlnext = array(
			"_"=>self::getMillisecond(),
			"menuid"=>"000100030001"
		);
		
		//获取通话记录url
		
		$get_url = 'http://iservice.10010.com/e3/static/query/callDetail';

		$get_url = $get_url."?".http_build_query($urlnext);

		$header = array(
			"Accept"=>"application/json, text/javascript, */*; q=0.01",
			"Accept-Language"=>"en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,af;q=0.2,zh-TW;q=0.2,ja;q=0.2",
			"Connection"=>"keep-alive",
			"Content-Type"=>"application/x-www-form-urlencoded;charset=UTF-8",
			"Host"=>"iservice.10010.com",
			"Origin"=>"http://iservice.10010.com",
			"Referer"=>"http://iservice.10010.com/e3/query/call_dan.html?menuId=000100030001",
			"User-Agent"=>"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36",
			"X-Requested-With"=>"XMLHttpRequest",
			"CLIENT-IP" => "".$ip."",
			"X-FORWARDED-FOR" => "".$ip."",
		);

		$headerStr = self::get_header_str($header);

		$requestResultJsonString = self::get_content($get_url,$cookie_file,$data,$headerStr);

		$CallRecordResultArray = json_decode($requestResultJsonString);

		echo $requestResultJsonString;

	}
}

















