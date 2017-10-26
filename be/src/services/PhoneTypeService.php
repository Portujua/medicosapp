<?php
  class PhoneTypeService implements IPhoneTypeService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new PhoneTypeRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new PhoneTypeService();
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
  }
?>