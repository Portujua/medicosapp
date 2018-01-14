<?php
  class SuscriptionService implements ISuscriptionService {
    private static $instance = null;

    private $repository;

    private function __construct() {
      $this->repository = new SuscriptionRepository();
    }

    public static function getInstance() {
      if (self::$instance == null) {
        self::$instance = new SuscriptionService();
      }

      return self::$instance;
    }

    public function listAll($pageable, $userId = null) {
      try {
        return $this->repository->list($pageable, $userId);
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
        $this->repository->create($data);

        return Response::getBaseRecordCreated();
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
        $patient = new UserSuscription($this->repository->find($data[UserSuscription::$pk]));

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
        $patient = new UserSuscription($this->repository->find($data[UserSuscription::$pk]));

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
        $exists = $this->find($data[UserSuscription::$pk]);

        if ($exists instanceof Response) {
          return $exists;
        }
        else if (is_array($exists) || is_object($exists)) {
          $this->repository->delete(Util::simplify($data, false));

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

    public function approve($id) {
      try {
        $exists = $this->find($id);

        if ($exists instanceof Response) {
          return $exists;
        }
        else if (is_array($exists) || is_object($exists)) {
          if ($exists->status == "REVISION") {
            $this->repository->approve($id);
            
            return "Suscripción aprobada con éxito.";
          }
          else {
            return Response::getBaseMethodNotAllowed("Solo se pueden aprobar suscripciones en REVISIÓN.");
          }
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

    public function decline($id) {
      try {
        $exists = $this->find($id);

        if ($exists instanceof Response) {
          return $exists;
        }
        else if (is_array($exists) || is_object($exists)) {
          if ($exists->status == "PENDIENTE" || $exists->status == "REVISION") {
            $this->repository->decline($id);

            return "Suscripción rechazada con éxito.";
          }
          else {
            return Response::getBaseMethodNotAllowed("No se puede rechazar una suscripción en estado " . $exists->status . ".");
          }
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

    public function registerPayment($id, $data) {
      try {
        $exists = $this->find($id);

        if ($exists instanceof Response) {
          return $exists;
        }
        else if (is_array($exists) || is_object($exists)) {
          if ($exists->status == "PENDIENTE") {
            $this->repository->registerPayment($id, $data);
            
            return "Pago de suscripción registrado con éxito.";
          }
          else {
            return Response::getBaseMethodNotAllowed("Solo se pueden aprobar suscripciones en PENDIENTE.");
          }
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