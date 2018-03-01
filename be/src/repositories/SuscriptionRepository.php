<?php
  class SuscriptionRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table(UserSuscription::$tableName);
    }

    public function listAll($pageable = null, $userId) {
      // Base query
      $query = $this->getTable()->orderBy("createdAt", "desc");

      if ($userId != null) {
        $query->where("usuario", $userId);
      }

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (UserSuscription::getSearcheableFields() as $sf) {
            $query->orWhere($sf, 'like', '%'.$pageable->getKeyword().'%');
          }
        }
  
        // Add the filters if available
        foreach ($pageable->getFilters() as $filter) {
          $query->where($filter->getField(), $filter->getOperator(), $filter->getValue());
        }
        
        // Add the page
        $query->limit($pageable->getSize())->offset($pageable->getOffset());

        // Set the total elements for the pageable
        $pageable->setTotalElements($this->getTable()->count());
      }

      // Run the final query
      $result = Db::run($query);

      // Add the rest
      $suscriptionTypeRepository = new SuscriptionTypeRepository();
      $userRepository = new UserRepository();

      foreach ($result as $row) {
        $row->tipo_suscripcion = $suscriptionTypeRepository->find($row->tipo_suscripcion);
        $row->usuario = $userRepository->find($row->usuario);
      }

      return $pageable != null ? $pageable->getResponse($result) : $result;
    }

    public function find($id) {
      $result = Db::run($this->getTable()->where(UserSuscription::$pk, '=', $id));

      if (count($result) > 0) {
        return $result[0];
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }

    public function create($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->getTable()->insert($data);
    }

    public function patch($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->getTable()->where(UserSuscription::$pk, $data[UserSuscription::$pk])->update($data);
    }

    public function approve($id) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->getTable()->where(UserSuscription::$pk, $id)->update(array("status" => "APROBADO"));
    }

    public function decline($id) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->getTable()->where(UserSuscription::$pk, $id)->update(array("status" => "RECHAZADO"));
    }

    public function registerPayment($id, $data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $data["status"] = "REVISION";

      $this->getTable()->where(UserSuscription::$pk, $id)->update($data);
    }

    public function substractConsult($userId) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $query = $this->getTable()
        ->where("usuario", $userId)
        ->where("status", "APROBADO")
        ->where("consultas_restantes", ">", 0)
        ->orderBy("createdAt", "asc");

      // Run the final query
      $result = Db::run($query);

      if (count($result) == 0) {
        throw new Exception("Este usuario no posee consultas.");
      }
      else {
        // substract 1 from the first
        $suscription = $this->find($result[0]->id);
        $suscription->consultas_restantes = intval($suscription->consultas_restantes) - 1;
        $this->getTable()->where(UserSuscription::$pk, $suscription->id)->update(json_decode(json_encode($suscription), true));
      }
    }

    public function hasConsults($userId) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $query = $this->getTable()
        ->where("usuario", $userId)
        ->where("status", "APROBADO")
        ->where("consultas_restantes", ">", 0)
        ->orderBy("createdAt", "asc");

      // Run the final query
      $result = Db::run($query);

      return count($result) > 0;
    }
  }
?>