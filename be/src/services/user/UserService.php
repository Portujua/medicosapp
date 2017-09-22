<?php
  class UserService implements IUserService {    
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new UserRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new self();
      }

      return self::$instance;
    }

    public function list($pageable) {
      try {
        return $this->repository->list($pageable);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function find($id) {
      try {
        return $this->repository->find($id);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function create($data) {
      try {
        $id = $this->repository->add($data);
        $user = new User($this->repository->find($id));

        return $user->get();
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function update($data) {
      try {
        $this->repository->update($data);
        $user = new User($this->repository->find($data[User::$pk]));

        return $user->get();
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function patch($data) {
      try {
        $this->repository->patch($data);
        $user = new User($this->repository->find($data[User::$pk]));

        return $user->get();
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function delete($data) {
      try {
        $this->repository->delete($data);

        return "Record deleted successfully";
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }
  }
?>