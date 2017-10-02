<?php
  class AreaService implements IAreaService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new AreaRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new AreaService();
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
        $patient = new Area($this->repository->find($id));

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
        $patient = new Area($this->repository->find($data[Area::$pk]));

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
        $patient = new Area($this->repository->find($data[Area::$pk]));

        return $patient->get();
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed($ex->getMessage());
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function delete($id) {
      try {
        $exists = $this->find($id);

        if ($exists instanceof Response) {
          return $exists;
        }
        else if (is_array($exists) || is_object($exists)) {
          $this->repository->delete($id);

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