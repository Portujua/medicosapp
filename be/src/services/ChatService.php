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

    public function listNotifications($pageable) {
      try {
        return $this->repository->listNotifications($pageable);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function listMessages($area, $self, $user, $pageable, $unread = false, $notification = false) { 
      try {
        return $this->repository->listMessages($area, $self, $user, $pageable, $unread, $notification);
      }
      catch (MethodNotAllowedException $ex) {
        return Response::getBaseMethodNotAllowed();
      }
      catch (Exception $ex) {
        return Response::getBaseInternalError($ex->getMessage());
      }
    }

    public function createMessage($data) {
      try {
        $id = $this->repository->add($data);
        $message = new Message($this->repository->find($id));

        return $message->get();
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