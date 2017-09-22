<?php
  class AuthService implements IAuthService {
    private static $instance = null;

    private $repository;
    private $patientRepository;

    private function __construct() {
      $this->repository = new AuthRepository();
      $this->patientRepository = new PatientRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new AuthService();
      }

      return self::$instance;
    }

    public function login($data) {
      try {
        $result = $this->repository->login($data);

        $token = Session::generateId();
        Session::set($token);

        $user = $this->patientRepository->find($result->id);

        return Util::mergeOptions($user, ["token" => $token], true);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (BadCredentialsException $ex) {
        return Response::getBaseUnauthorized($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }
  }
?>