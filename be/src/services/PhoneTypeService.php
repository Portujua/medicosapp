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
  }
?>