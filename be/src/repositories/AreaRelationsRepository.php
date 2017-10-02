<?php
  class AreaRelationsRepository {
    public function __construct() {
      
    }

    private function getTable() {
      return QB::table("Medico_Area");
    }

    public function findByUser($id) {
      $result = Db::run(
        $this->getTable()->where("usuario", "=", $id)
      );

      if (count($result) > 0) {
        $areas = [];
        $areaRepository = new AreaRepository();

        foreach ($result as $r) {
          $areas[] = $areaRepository->find($r->area);
        }

        return $areas;
      }
      else {
        throw new Exception("There's no record with id " . $id);
      }
    }
  }
?>