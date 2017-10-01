<?php
  class PatientService implements IPatientService {
    private static $instance = null;

    private $repository;
    private $locationRepository;

    private function __construct() {
      $this->repository = new PatientRepository();
      $this->locationRepository = new LocationRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new PatientService();
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
        $patient = new Patient($this->repository->find($id));

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
        $patient = new Patient($this->repository->find($data[Patient::$pk]));

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
        $patient = new Patient($this->repository->find($data[Patient::$pk]));

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
        if (is_array($this->find($data[Patient::$pk]))) {
          $this->repository->delete($data);

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