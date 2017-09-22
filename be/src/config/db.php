<?php
	/**
	* It contains all the Database Methods
	*
	* @package Configuration
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 30/04/2017
	* @license MIT
	*/

	/**
	* Database class
	*
	* Contains all methods and configuration needed for the database
	*
	* @method Array run(Query $query)
	* @method Int getTotalElements(Query $query)
	* @method Void startTransaction()
	* @method Void commit()
	* @method Void rollback()
	*/
	class Db {
		private static $config = array(
			'driver'    => 'mysql',
			'host'      => 'localhost',
			'database'  => 'medicos',
			'username'  => 'root',
			'password'  => '21115476',
			'charset'   => 'utf8',
		);

		public static function getConfiguration() {
			return self::$config;
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
			if (!Session::isActive()) {
				throw new MethodNotAllowedException();
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
			$this->db->query("start transaction");
		}

		/**
		* Commits the changes on the current database transaction
		*
		* @return void
		*/
		public function commit() {
			$this->db->query("commit");
		}

		/**
		* Rolls back the changes on the current database transaction
		*
		* @return void
		*/
		public function rollback() {
			$this->db->query("rollback");
		}
	}
?>