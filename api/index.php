
<?php 

require_once 'medoo.php';

require_once 'config.php';
//directory where api is hosted
$dirName = "api";
//get method
$method = $_SERVER['REQUEST_METHOD'];
//get query string
$queryString = $_SERVER['QUERY_STRING'];
//get parameters from request 
$request = $_SERVER['REQUEST_URI'];
$requestArr = explode('/', $request);
$key = array_search($dirName, $requestArr);
//take out anyting before the api directory
$allParameters = array_slice($requestArr, $key + 1);

define('NOT_VALID', "Not a valid request");
//check if query used
if($queryString){
	$query = explode('=',$queryString);
	$allParameters[0] = explode('?', $allParameters[0])[0];
}
$params = array_slice($allParameters,1);
switch ($allParameters[0]) {
	case 'users':
		usersHandler($params);
		break;
	case 'tricks':
		tricksHandler($params);
		break;
	case 'interests':
		interestsHandler($params);
		break;
	case 'signups':
		signupsHandler($params);
		break;
	default:
		errorHandler(NOT_VALID);

}

function usersHandler($params){

	if(empty($params)){
		//get all users
		echo "All";
	}
}
function tricksHandler($params){
	if(empty($params)){
		//get all users
		echo "All";
	}
}
function interestsHandler($params){
	global $method;
	if($method == "POST"){
		addInterest();
	} else 
		if(empty($params[0])){
			getInterests();

		} else{
			global $request;
			errorHandler(NOT_VALID, "Can't process our request on interests. Request: {$request}");
		}
}//interestHandeler
function signupsHandler($params){
	
	global $method;
	if($method == "POST"){
		addSignup();
	} else if($method == "DELETE"){
		deleteSignUp($params);
	}else 
		if(empty($params[0])){
			getSignups();

		} else {
			switch ($params[0]) {
				case 'id':
					//echo "All with id {$params[1]}<br>";
					break;
				case 'name':
					//echo "All with Name {$params[1]}<br>";
				break;
				case 'email':
					// echo "All with email {$params[1]}<br>";
				break;
				case 'interests':
					// echo "All with interests {$params[1]}<br>";
				break;
				case 'birthday':
					// echo "All with Birthday {$params[1]}<br>";
				break;
				
				default:
					errorHandler(NOT_VALID);
					break;
			}//switch
		}//else
}//signupsHandlers

function errorHandler($error){
	global $allParameters;
	$response_array = ['status' => 404, 'error' => $error];
	setResponse($response_array);
}

function setResponse($response_array){
	http_response_code($response_array['status']);
	header('Content-type: application/json');
	echo json_encode($response_array);
}

function getSignups(){
	$jfaDb = new medoo([

					'database_type' => 'mysql',

					'database_name' => 'jfa',

					'server' => 'localhost',

					'username' => DB_USERNAME,

					'password' => DB_PASS,

					'charset' => 'utf8'

				]);	

	$users = $jfaDb->select(DB_SIGNUPS_LIST, ['id', 'name', 'email']);
	$response_array = ['status' => 201, 'signups' => $users];
	setResponse($response_array);		
}

function addSignup(){
	$jfaDb = new medoo([

					'database_type' => 'mysql',

					'database_name' => 'jfa',

					'server' => 'localhost',

					'username' => DB_USERNAME,

					'password' => DB_PASS,

					'charset' => 'utf8'

				]);

	$postVariables = json_decode(file_get_contents('php://input'));
		$ids = [];
		//get all interests for signup
		foreach ($postVariables->interests as $value) {
			array_push($ids, intval($value->id));
		}
		//get interests name from database
		$interests = $jfaDb->select(DB_FLOW_TYPES, ['name'], ["id" => $ids]);

		//remove interests from object for insertion to db
		unset($postVariables->interests);
		//set signup date
		$postVariables->signup_date = date('Y-m-d');
		//insert signup
		$jfaDb->insert(DB_SIGNUPS_LIST, [$postVariables]);
		//get signups id
		$id = intval($jfaDb->get(DB_SIGNUPS_LIST,'id',["email" => $postVariables->email]));
		//insert interest into table
		if($interests)
		foreach ($interests as $value) {
			$jfaDb->insert(DB_SIGNUPS_INTERESTS, ['id' => $id, 'interest' => $value["name"]]);

		}
		/* Error Checking */

		if ($jfaDb->error()[1] == NULL) {

			$response_array = ['status' => 201, 'signups' => $postVariables];

		} else {

			$response_array = ['status' => 404, 'reason' => $jfaDb->error()[2]];

		}

		setResponse($response_array);

}
function deleteSignUp($params)
{
		$jfaDb = new medoo([

					'database_type' => 'mysql',

					'database_name' => 'jfa',

					'server' => 'localhost',

					'username' => DB_USERNAME,

					'password' => DB_PASS,

					'charset' => 'utf8'

				]);


	$jfaDb->delete(DB_SIGNUPS_LIST, ['id'=>$params[0]]);

	/* Error Checking */

		if ($jfaDb->error()[1] == NULL) {

			$response_array = ['status' => 201, 'user' => $params[0]];

		} else {

			$response_array = ['status' => 404, 'reason' => $jfaDb->error()[2], 'id' => $param[0]];

		}

		setResponse($response_array);

}
function getInterests(){
	$jfaDb = new medoo([

						'database_type' => 'mysql',

						'database_name' => 'jfa',

						'server' => 'localhost',

						'username' => DB_USERNAME,

						'password' => DB_PASS,

						'charset' => 'utf8'

				]);	

	/* Get users id */
	$interests = $jfaDb->select('flow_types', ['id', 'name']);
	
	
	/* Error Checking */

	if ($jfaDb->error()[1] == NULL) {

		$response_array = ['status' =>'201', 'interests' => $interests];

	} else {

		$response_array = ['status' =>'404', 'reason' => $jfaDb->error()[2]];

	}

	setResponse($response_array);
}

function addInterests(){

}


 ?>
