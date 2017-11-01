<?php
  class UserService implements IUserService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new UserRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new UserService();
      }

      return self::$instance;
    }

    public function listAll($pageable) {
      try {
        return $this->repository->listAll($pageable);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function listAllPatients($pageable) {
      try {
        return $this->repository->listAllPatients($pageable);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function listAllMedics($pageable) {
      try {
        return $this->repository->listAllMedics($pageable);
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

        // Set admin token to allow return the added user
        $temp = null;
        if (!Session::isActive()) {
          $temp = Session::generateId();
          Session::set($temp);
        }

        // Get the new user
        $patient = new User($this->repository->find($id));

        // Unset the temporal token
        if ($temp != null) {
          Session::_unset($temp);
        }

        return $patient->get();
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
        $patient = new User($this->repository->find($data[User::$pk]));

        return $patient->get();
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
        $patient = new User($this->repository->find($data[User::$pk]));

        return $patient->get();
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
        $exists = $this->find($data[User::$pk]);

        if ($exists instanceof Response) {
          return $exists;
        }
        else if (is_array($exists) || is_object($exists)) {
          $this->repository->delete(Util::simplify($data, false));

          return "Record deleted successfully";
        }
        else {
          throw new RecordNotFoundException();
        }
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed($ex->getMessage());
      }
      catch (RecordNotFoundException $ex) {
        return Response::getBaseRecordNotFound($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }
  }
?>