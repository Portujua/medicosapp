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
  }
?>