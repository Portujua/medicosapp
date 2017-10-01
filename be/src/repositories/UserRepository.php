<?php
  class UserRepository {
    private $table;

    public function __construct() {
      $this->table = QB::table(User::$tableName);
    }

    public function list($pageable = null, $get = null) {
      // Base query
      $baseQuery = $this->table->where('usuario', '!=', 'root');

      if ($get == "patients") {
        $baseQuery->where("es_medico", 0);
      }
      else if ($get == "medics") {
        $baseQuery->where("es_medico", 1);
      }

      $query = $baseQuery->select(array(
        "id",
        "nombre",
        "segundo_nombre",
        "apellido",
        "segundo_apellido",
        "tipo_cedula",
        "cedula",
        "email",
        "usuario",
        "fecha_nacimiento",
        "sexo",
        "estado_civil",
        "estado",
        "direccion",
        "lugar",
        "es_medico",
        QB::raw("concat_ws(' ', nombre, segundo_nombre, apellido, segundo_apellido) as nombre_completo")
      ));

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (User::getSearcheableFields() as $sf) {
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
        $pageable->setTotalElements($baseQuery->count());
      }

      // Run the final query
      $result = Db::run($query);

      // Add the locations
      $locationRepository = new LocationRepository();

      foreach ($result as $patient) {
        $patient->lugar = $locationRepository->find($patient->lugar);
      }

      return $pageable != null ? $pageable->getResponse($result) : $result;
    }

    public function listPatients($pageable = null) {
      return $this->list($pageable, "patients");
    }

    public function listMedics($pageable = null) {
      return $this->list($pageable, "medics");
    }

    public function find($id) {
      $result = Db::run($this->table->where(User::$pk, '=', $id));

      if (count($result) > 0) {
        $user = $result[0];

        // Add the locations
        $locationRepository = new LocationRepository();
      
        $user->lugar = $locationRepository->find($user->lugar);

        return $user;
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }

    public function add($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->insert($data);

      return $data['id'];
    }

    public function update($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(User::$pk, $data[User::$pk])->update($data);
    }

    public function patch($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(User::$pk, $data[User::$pk])->update($data);
    }

    public function delete($data) {
      if (!Session::isActive()) {
        throw new MethodNotAllowedException();
      }

      $this->table->where(User::$pk, $data[User::$pk])->delete();
    }
  }
?>