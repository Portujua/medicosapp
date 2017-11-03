<?php
  class DashboardRepository {
    public function __construct() {
      
    }

    private function getTable($tableName) {
      return QB::table($tableName);
    }

    public function summary() {
      $summary = (object)array(
        // Current month
        "visitsCountCurrentMonth" => 0,
        "consultsCountCurrentMonth" => 0,
        "earningsCurrentMonth" => 0,
        "newUsersCountCurrentMonth" => 0,

        // Past month
        "visitsCountPastMonth" => 0,
        "consultsCountPastMonth" => 0,
        "earningsPastMonth" => 0,
        "newUsersCountPastMonth" => 0,
      );

      $currentMonth = date('m');
      $pastMonth = $currentMonth - 1;

      // Visits Count Current Month
      $query = $this->getTable('Log_Login');
      $query->where(QB::raw("month(createdAt)=$currentMonth"));
      $result = Db::run($query);

      $summary->visitsCountCurrentMonth = count($result);

      // Visits Count Past Month
      $query = $this->getTable('Log_Login');
      $query->where(QB::raw("month(createdAt)=$pastMonth"));
      $result = Db::run($query);

      $summary->visitsCountPastMonth = count($result);

      // New Users Current Month
      $query = $this->getTable('Usuario');
      $query->where(QB::raw("month(createdAt)=$currentMonth"));
      $result = Db::run($query);

      $summary->newUsersCountCurrentMonth = count($result);

      // New Users Past Month
      $query = $this->getTable('Usuario');
      $query->where(QB::raw("month(createdAt)=$pastMonth"));
      $result = Db::run($query);

      $summary->newUsersCountPastMonth = count($result);

      return $summary;
    }
  }
?>