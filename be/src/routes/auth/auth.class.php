<?php
/**
* It contains all Auth Entity methods.
*
* @package Classes
* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
* @since 30/04/2017
* @license MIT
*/

/**
* Auth class.
*/
class Auth extends BaseEntity {
	private static $instance = null;

  private function __construct() {
    //parent::__construct();
	}

	public static function getInstance() {
		if (Auth::$instance == null) {
			Auth::$instance = new Auth();
		}

		return Auth::$instance;
	}

	public function login($data) {
		try {
			$result = QB::table('Paciente')
					->select('id')
					->where('usuario', '=', $data['username'])
					->where('contrasena', '=', $data['password'])
					->get();

			if (count($result) == 0) {
				return Response::getBaseUnauthorized("Bad login credentials");
			}
			else {
				return $result[0];
			}
		}
		catch (Exception $ex) {
			return Response::getBaseInternalError($ex->getMessage());
		}
	}
}

?>