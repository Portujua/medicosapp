<?php
  class SuscriptionTypeService implements ISuscriptionTypeService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new SuscriptionTypeRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new SuscriptionTypeService();
      }

      return self::$instance;
    }

    public function listAll($pageable, $active) {
      try {
        return $this->repository->listAll($pageable, $active);
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
        $suscriptionType = new SuscriptionType($this->repository->find($id));

        return $suscriptionType->get();
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
        $suscriptionType = new SuscriptionType($this->repository->find($data[SuscriptionType::$pk]));

        return $suscriptionType->get();
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