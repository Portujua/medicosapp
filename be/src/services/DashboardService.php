<?php
  class DashboardService implements IDashboardService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new DashboardRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new DashboardService();
      }

      return self::$instance;
    }

    public function summary() {
      try {
        return $this->repository->summary();
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