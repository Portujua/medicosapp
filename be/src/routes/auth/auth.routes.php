<?php 
/**
* Auth routes 
*
* Contains all auth routes
*
* @package Routes
* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
* @since 30/04/2017
* @license MIT
*/

$app->group('/auth', function() use ($app){
	$app->post('/', function() use ($app) {
    $data = json_decode($app->request->getBody(), true);

    $responseData = Auth::getInstance()->login($data);

    if ($responseData instanceof Response) {
      $responseData->setSlim($app);
      echo $responseData->getResponse();
    }
    else {
      $token = Session::generateId();
      Session::set($token);
      $responseData = Patient::getInstance()->get($responseData->id);

      $responseData = Util::jsonPdoToArray($responseData);

      $response = new Response(Util::mergeOptions($responseData, ["token" => $token], true));
      $response->setSlim($app);
      echo $response->getResponse();
    }
  });
  
  $app->post('/logout', function() use ($app) {
    $authToken = $app->request->headers->get('Auth-Token');
    Session::unset($authToken);

		$response = new Response("Logged out successfully");
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>