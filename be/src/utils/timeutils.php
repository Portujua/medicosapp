<?php

  class TimeUtils {
    public static function modify($from, $time) {
      $c = clone $from;
      $c->modify($time);
      return $c;
    }
    
    public static function getFirstDayOfMonth($date, $iso8601 = false) {
      $r = new DateTime($date->format('Y-m') . "-01");
      return $iso8601 ? $r->format('Y-m-d') . "T00:00:00Z" : $r;
    }

    public static function getLastDayOfMonth($date, $iso8601 = false) {
      $r = new DateTime($date->format('Y-m') . "-" . $date->format('t'));
      return $iso8601 ? $r->format('Y-m-d') . "T00:00:00Z" : $r;
    }

    public static function getFirstDayOfPastMonth($date, $iso8601 = false) {
      $r = self::getFirstDayOfMonth(self::modify($date, '-1 month'));
      return $iso8601 ? $r->format('Y-m-d') . "T00:00:00Z" : $r;
    }

    public static function getLastDayOfPastMonth($date, $iso8601 = false) {
      $r = self::getLastDayOfMonth(self::modify($date, '-1 month'));
      return $iso8601 ? $r->format('Y-m-d') . "T00:00:00Z" : $r;
    }
  }

?>