<?php
	function loadFiles($folder) {
		$files = array_filter(glob($folder), 'is_file');
		
		foreach ($files as $f)
		{
			if (strpos($f, 'BaseEntity.php') !== false) continue;

			$path = $f;
			$GLOBALS['includes'][] = $path;
		}
	}

	function load($folders) {
		if (is_string($folders)) {
			$folders = [$folders];
		}

		foreach ($folders as $folderPath) {
			loadFiles($folderPath);

			// Load files inside folders
			$dirs = array_filter(glob($folderPath), 'is_dir');
			
			foreach ($dirs as $folder) {
				loadFiles($folder."/*");
			}
		}
	}

	$GLOBALS['includes'] = array();

	include 'vendor/autoload.php';
	include 'src/models/BaseEntity.php';

	// Create MercadoPago
	$mp = array(
		"id" => "6481827979814574",
		"secret" => "jdAQ8lfjugyNC9ZyEjIwhH5SOnJeqxGf",
		"app" => null,

		/* Production */
		// "app_private_key" => "APP_USR-6481827979814574-111001-d55dc99fcab50a81874608508e9fe80b__LC_LA__-194272281",
		// "app_public_key" => "APP_USR-9b2bacdf-6f91-401c-a7a8-d17b5b369143",
		
		/* Sandbox */
		"private_key" => "TEST-6481827979814574-111001-6e8f2e673e0aa5caa1db46371c75e85e__LD_LB__-194272281",
		"public_key" => "TEST-1a3e9528-4eea-4942-9d0a-1e8e83e1c360",
	);

	// $mp['app'] = new MP($mp['id'], $mp['secret']);

	// $GLOBALS['mp'] = $mp;

	// $me = ($mp->get("/users/me"))['response'];

	//$balance = $mp->get("/users/" . $me['id'] . "/mercadopago_account/balance");

	// $payment = array(
	// 	"binary_mode" => true,
	// 	"description" => "This is a test",
	// 	"transaction_amount" => 500
	// );

	// $promise = $mp->post("/v1/payments", $payment);

	// $toPrint = $promise;

	// print_r(json_encode($toPrint));
	// header("Content-Type: application/json");
	// die();

	//print_r($mp->get_preference("194272281-1cfc091e-ead1-41bb-9fb9-6aec06636548"));

	// $preference_data = array (
  //   "items" => array (
  //       array (
  //           "title" => "Test",
  //           "quantity" => 1,
  //           "currency_id" => "VEF",
  //           "unit_price" => 500
  //       )
  //   )
	// );

	// $preference = $mp->create_preference($preference_data);

	// print_r ($preference);

	// Utils
	load([
		"src/utils/*",
		"src/exceptions/*",
		"src/config/*",
		"src/classes/*",
		"src/models/*",
		"src/repositories/*",
		"src/interfaces/*",
		"src/services/*",
	]);

	foreach ($GLOBALS['includes'] as $inc) {
		require $inc;
	}

	$GLOBALS['includes'] = array();

	new \Pixie\Connection('mysql', Db::getConfiguration(), 'QB');
	$app = new \Slim\Slim;

	// Routes	
	load("src/routes/*");

	foreach ($GLOBALS['includes'] as $inc) {
		require $inc;
	}

	//$app->response()->header('Content-Type', $app->request->headers->get('Content-Type'));
	$app->response()->header('Content-Type', 'application/json');
	$app->response()->header('Access-Control-Allow-Origin', '*');
	$app->response()->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
	$app->response()->header('Access-Control-Allow-Headers', 'Auth-Token, Content-Type');

	$app->run();