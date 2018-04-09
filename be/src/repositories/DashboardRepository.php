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


        // New Dashboard
        "visitsCount" => [],
        "newUsersCount" => [],
        "consultsCount" => [],
        "earningsSum" => []
      );

      $today = new DateTime;

      // Visits Count per day
      $query = $this->getTable('Log_Login');
      $query->select(array(
        QB::raw("count(*) as count"),
        QB::raw("date(createdAt) as day"),
      ));
      $query->where(QB::raw("datediff(now(), createdAt) < 1"));
      $query->groupBy(QB::raw("date(createdAt)"));
      $result = Db::run($query);

      $month = date('m');
      $year = date('Y');

      $start_date = "01-".$month."-".$year;
      $start_time = strtotime($start_date);

      $end_time = strtotime("+1 month", $start_time);

      for($i=$start_time; $i<$end_time; $i+=86400)
      {
        $dayList[] = date('Y-m-d', $i);
      }

      $visitsCount = [];

      foreach ($dayList as $day) {
        $count = 0;

        // check if the day exists
        foreach ($result as $r) {
          if ($r->day == $day) {
            $count = $r->count;
          }
        }

        $visitsCount[] = array(
          "count" => $count,
          "day" => $day
        );

        // Stop at today
        if ($day == date('Y-m-d')) {
          break;
        }
      }

      $summary->visitsCount = $visitsCount;

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

      // New users this month
      $query = $this->getTable('Usuario');
      $query->select(array(
        QB::raw("count(*) as count"),
        QB::raw("date(createdAt) as day"),
      ));
      $query->where(QB::raw("datediff(now(), createdAt) < 1"));
      $query->groupBy(QB::raw("date(createdAt)"));
      $result = Db::run($query);

      $newUsersCount = [];

      foreach ($dayList as $day) {
        $count = 0;

        // check if the day exists
        foreach ($result as $r) {
          if ($r->day == $day) {
            $count = $r->count;
          }
        }

        $newUsersCount[] = array(
          "count" => $count,
          "day" => $day
        );

        // Stop at today
        if ($day == date('Y-m-d')) {
          break;
        }
      }

      $summary->newUsersCount = $newUsersCount;

      // // Incomes this month
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
        //$summary->consultsCountCurrentMonth = is_numeric($result[0]->consultas) ? $result[0]->consultas : 0;
      }

      // // Incomes past month
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
        //$summary->consultsCountPastMonth = is_numeric($result[0]->consultas) ? $result[0]->consultas : 0;
      }

      // Incomes summary
      $query = $this->getTable('Suscripcion');
      $query->select(array(
        QB::raw("sum(costo_de_compra) as count"),
        QB::raw("date(createdAt) as day"),
      ));
      $query->where(QB::raw("datediff(now(), createdAt) < 1 and status='APROBADO'"));
      $query->groupBy(QB::raw("date(createdAt)"));
      $result = Db::run($query);

      $earningsSum = [];

      foreach ($dayList as $day) {
        $count = 0;

        // check if the day exists
        foreach ($result as $r) {
          if ($r->day == $day) {
            $count = $r->count;
          }
        }

        $earningsSum[] = array(
          "count" => $count,
          "day" => $day
        );

        // Stop at today
        if ($day == date('Y-m-d')) {
          break;
        }
      }

      $summary->earningsSum = $earningsSum;

      // Consults this month
      $query = $this->getTable('Mensaje');
      $query
        ->where(QB::raw("datediff(now(), createdAt) <= 30 and html REGEXP '^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}\~[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$'"));

      $result = Db::run($query);
      $summary->consultsCountCurrentMonth = count($result);

      // Consults past month
      $query = $this->getTable('Mensaje');
      $query
        ->where(QB::raw("datediff(now(), createdAt) <= 60 and datediff(now(), createdAt) > 30 and html REGEXP '^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}\~[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$'"));

      $result = Db::run($query);
      $summary->consultsCountPastMonth = count($result);

      // Consults this month
      $query = $this->getTable('Mensaje');
      $query->select(array(
        QB::raw("count(*) as count"),
        QB::raw("date(createdAt) as day"),
      ));
      $query->where(QB::raw("datediff(now(), createdAt) < 1 and html REGEXP '^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}\~[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$'"));
      $query->groupBy(QB::raw("date(createdAt)"));
      $result = Db::run($query);

      $consultsCount = [];

      foreach ($dayList as $day) {
        $count = 0;

        // check if the day exists
        foreach ($result as $r) {
          if ($r->day == $day) {
            $count = $r->count;
          }
        }

        $consultsCount[] = array(
          "count" => $count,
          "day" => $day
        );

        // Stop at today
        if ($day == date('Y-m-d')) {
          break;
        }
      }

      $summary->consultsCount = $consultsCount;

      return $summary;
    }
  }
?>