<?php
  class DashboardRepository {
    public function __construct() {
      $this->mp = $GLOBALS['mp'];
    }

    private function getTable($tableName) {
      return QB::table($tableName);
    }

    public function summary() {
      // Load my user id
      // $me = ($this->mp['app']->get("/users/me"))['response'];
      // $id = $me['id'];

      $summary = (object)array(
        // Current month
        "visitsCountToday" => 0,
        "consultsCountCurrentMonth" => 0,
        "earningsCurrentMonth" => 0,
        "newUsersCountCurrentWeek" => 0,

        // Past month
        //"visitsCountPastWeek" => 0,
        "consultsCountPastMonth" => 0,
        "earningsPastMonth" => 0,
        "newUsersCountPastWeek" => 0,
      );

      $today = new DateTime;

      // Visits Count Today
      $query = $this->getTable('Log_Login');
      $query->where(QB::raw("datediff(now(), createdAt) < 1"));
      $result = Db::run($query);

      $summary->visitsCountToday = count($result);

      // Visits Count Past Month
      // $query = $this->getTable('Log_Login');
      // $query->where(QB::raw("week(createdAt)=$pastWeek"));
      // $result = Db::run($query);

      // $summary->visitsCountPastWeek = count($result);

      // New Users Current Week
      $query = $this->getTable('Usuario');
      $query->where(QB::raw("datediff(now(), createdAt) <= 7"));
      $result = Db::run($query);

      $summary->newUsersCountCurrentWeek = count($result);

      // New Users Past Week
      $query = $this->getTable('Usuario');
      $query->where(QB::raw("datediff(now(), createdAt) <= 14 and datediff(now(), createdAt) > 7"));
      $result = Db::run($query);

      $summary->newUsersCountPastWeek = count($result);

      // // Incomes this month
      // $totalIncome = 0.0;
      // $totalRequested = 0;

      // $queryString = array(
      //   "limit" => 50,
      //   "offset" => 0,
      //   "range" => "date_created", 
      //   "begin_date" => TimeUtils::getFirstDayOfMonth($today, true), 
      //   "end_date" => TimeUtils::getLastDayOfMonth($today, true)
      // );

      // do {
      //   $monthHistoric = ($this->mp['app']->get("/v1/balance/history", $queryString))['response'];

      //   foreach ($monthHistoric['results'] as $r) {
      //     $totalIncome += intval($r['amount']);
      //   }

      //   $queryString['offset']++;
      //   $totalRequested += $queryString['limit'];
      // } while ($totalRequested < intval($monthHistoric['paging']['total']));

      // $summary->earningsCurrentMonth = $totalIncome;

      $query = $this->getTable('Suscripcion');
      $query
        ->select(array(
          QB::raw("sum(costo_de_compra) as ingresos"),
          QB::raw("count(costo_de_compra) as consultas")
        ))
        ->where(QB::raw("datediff(now(), createdAt) <= 30 and status='APROBADO'"));
      $result = Db::run($query);

      if (count($result) > 0) {
        $summary->earningsCurrentMonth = is_numeric($result[0]->ingresos) ? $result[0]->ingresos : 0;
        $summary->consultsCountCurrentMonth = is_numeric($result[0]->consultas) ? $result[0]->consultas : 0;
      }

      // // Incomes past month
      // $totalIncome = 0.0;
      // $totalRequested = 0;

      // $queryString = array(
      //   "limit" => 50,
      //   "offset" => 0,
      //   "range" => "date_created", 
      //   "begin_date" => TimeUtils::getFirstDayOfPastMonth($today, true), 
      //   "end_date" => TimeUtils::getLastDayOfPastMonth($today, true)
      // );

      // do {
      //   $monthHistoric = ($this->mp['app']->get("/v1/balance/history", $queryString))['response'];

      //   foreach ($monthHistoric['results'] as $r) {
      //     $totalIncome += intval($r['amount']);
      //   }

      //   $queryString['offset']++;
      //   $totalRequested += $queryString['limit'];
      // } while ($totalRequested < intval($monthHistoric['paging']['total']));

      // $summary->earningsCurrentMonth = $totalIncome;

      $query = $this->getTable('Suscripcion');
      $query
        ->select(array(
          QB::raw("sum(costo_de_compra) as ingresos"),
          QB::raw("count(costo_de_compra) as consultas")
        ))
        ->where(QB::raw("datediff(now(), createdAt) <= 60 and datediff(now(), createdAt) > 30 and status='APROBADO'"));
      $result = Db::run($query);

      if (count($result) > 0) {
        $summary->earningsPastMonth = is_numeric($result[0]->ingresos) ? $result[0]->ingresos : 0;
        $summary->consultsCountPastMonth = is_numeric($result[0]->consultas) ? $result[0]->consultas : 0;
      }

      return $summary;
    }
  }
?>