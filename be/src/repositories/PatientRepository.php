<?php
  class PatientRepository {
    private $table;

    public function __construct() {
      $this->table = QB::table(Patient::$tableName);
    }

    public function list($pageable = null) {
      // Base query
      $query = $this->table->select(array(
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
        QB::raw("concat(nombre, ' ', apellido) as nombre_completo")
      ));

      if ($pageable != null) {
        // Search for keyword if available
        if ($pageable->hasKeyword()) {
          foreach (Patient::getSearcheableFields() as $sf) {
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
        $pageable->setTotalElements($this->table->count());
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

    public function find($id) {
      $result = Db::run($this->table->where(Patient::$pk, '=', $id));

      if (count($result) > 0) {
        $patient = $result[0];

        // Add the locations
        $locationRepository = new LocationRepository();
      
        $patient->lugar = $locationRepository->find($patient->lugar);

        return $patient;
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }

    // public function add($data) {
    //   if (!Session::isActive()) {
    //     throw new MethodNotAllowedException();
    //   }

    //   return $this->table->insert($data);
    // }

    // public function update($data) {
    //   if (!Session::isActive()) {
    //     throw new MethodNotAllowedException();
    //   }

    //   $this->table->where(User::$pk, $data[User::$pk])->update($data);
    // }

    // public function patch($data) {
    //   if (!Session::isActive()) {
    //     throw new MethodNotAllowedException();
    //   }

    //   $this->table->where(User::$pk, $data[User::$pk])->update($data);
    // }

    // public function delete($data) {
    //   if (!Session::isActive()) {
    //     throw new MethodNotAllowedException();
    //   }

    //   $this->table->where(User::$pk, $data[User::$pk])->delete();
    // }
  }
?>