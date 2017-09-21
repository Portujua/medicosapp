<?php
	class Db {
		private static $ignoreToken = false;

		private static $instance = null;
		
		private function __construct() {
			
		}
	
		public static function getInstance() {
			if (Db::$instance == null) {
				Db::$instance = new Db();
			}
	
			return Db::$instance;
		}

		/**
		* Runs a query
		*
		* Runs a query with the current database connection and return it result
		*
		* @param Query $sql - The database query
		*
		* @return Array - Returns the array containing the query result
		*/
		public static function run($sql) {
			if (!Session::isActive() && !Db::$ignoreToken) {
				return Response::getBaseUnauthorized();
			}

			return $sql->get();
		}

		/**
		* Obtains the total elements
		*
		* Runs a query and returns the total rows of it
		*
		* @param Query $query - The database query
		*
		* @return Int - Returns the number of rows
		*/
		public static function getTotalElements($query) {
			$result = $query->get();
			$total = 0;

			if (count($result) == 0) {
				return 0;
			}

			$result = $result[0];

			foreach ($result as $key => $val) {
				$total += $val;
			}
			
			return $total;
		}

		/**
		* Starts a transaction on the current database connection
		*
		* @return void
		*/
		public function startTransaction() {
			Db::getInstance()->query("start transaction");
		}

		/**
		* Commits the changes on the current database transaction
		*
		* @return void
		*/
		public function commit() {
			Db::getInstance()->query("commit");
		}

		/**
		* Rolls back the changes on the current database transaction
		*
		* @return void
		*/
		public function rollback() {
			Db::getInstance()->query("rollback");
		}

		/**
		* Sets wether it should ignore the session token or not
		*
		* @return void
		*/
		public static function setIgnoreToken($value) {
			Db::getInstance()->$ignoreToken = $value;
		}
	}
?>