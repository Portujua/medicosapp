<?php
  class AuthService implements IAuthService {
    private static $instance = null;

    private $repository;
    private $userRepository;

    private function __construct() {
      $this->repository = new AuthRepository();
      $this->userRepository = new UserRepository();
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

        $user = $this->userRepository->find($result->id);

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