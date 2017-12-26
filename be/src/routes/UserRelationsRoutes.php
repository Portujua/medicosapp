<?php

$app->group('/users', function() use ($app){
	$authToken = $app->request->headers->get('Auth-Token');
  Session::setLastToken($authToken);
  
  $app->get('/:userId/suscriptions', function($userId) use ($app) {
		$pageable = new Pageable($app->request->params());

		$response = new Response(SuscriptionService::getInstance()->listAll($pageable, $userId));
		$response->setSlim($app);
		echo $response->getResponse();
  });

	$app->post('/:userId/suscriptions', function($userId) use ($app) {
    $data = json_decode($app->request->getBody(), true);

    $prePayload = [
      "tipo_suscripcion" => $data,
      "usuario" => $userId,
			"consultas_restantes" => $data['cant_cons'],
			"costo_de_compra" => $data['costo']
    ];

		$response = new Response(
			SuscriptionService::getInstance()->create(Util::createPayload(UserSuscription::class, $prePayload))
		);
		$response->setSlim($app);
		echo $response->getResponse();
	});
});

?>