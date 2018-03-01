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
        $suscriptionRepository = new SuscriptionRepository();
        $userRepository = new UserRepository();

        // Close consult logic
        preg_match("/^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}\~[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$/", $data['html'], $firstRegexResult);

        if (count($firstRegexResult) > 0) {
          $allMessages = $this->listMessages($data['area'], $data['owner'], $data['user'], null);
          $lastMessage = end($allMessages);

          if ($lastMessage) {
            preg_match("/^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}\~[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$/", $lastMessage->html, $secondRegexResult);

            if (count($secondRegexResult) > 0) {
              return Response::getBaseInternalError("No se puede cerrar una consulta vacía");
            }
            else {
              // Substract the consult from the user
              $suscriptionRepository->substractConsult($data['user']);
            }
          }
        }

        // Check if user has consults to write
        $user = $userRepository->find($data['owner']);

        // We only check for the normal users here
        if (!$user->es_medico) {
          if (!$suscriptionRepository->hasConsults($user->id)) {
            return Response::getBaseInternalError("No posee consultas suficientes para comenzar una conversación");
          }
        }

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

    public function attachment($data) {
      return;
    }
  }
?>