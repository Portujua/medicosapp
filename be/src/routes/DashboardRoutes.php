<?php 

$app->group('/dashboard', function() use ($app){
	$app->get('/summary', function() use ($app) {
		$response = new Response(DashboardService::getInstance()->summary());
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>