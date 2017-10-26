<?php
  class ChatService implements IChatService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new ChatRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new ChatService();
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