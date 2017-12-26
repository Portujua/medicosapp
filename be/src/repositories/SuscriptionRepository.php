<?php
  class SuscriptionRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table(UserSuscription::$tableName);
    }

    public function list($pageable = null, $userId) {
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
  }
?>