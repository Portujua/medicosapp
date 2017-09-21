<?php
	/**
	* It contains all User Entity methods.
	*
	* @package Base
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 30/04/2017
	* @license MIT
	*/

	/**
	* Base entity class for common methods across entities.
	* 
	* @method Db getDb()
	* @method Array setData(Array $base, Array $vals)
	* @method Array mergeOptions(Array $base, Array $vals, Boolean $addIfUndefined)
	* @method Array|String parseResponse(Array|String $pdoResponse, Boolean $isError, Boolean $jsonParse)
	*/
	class BaseEntity {
		/**
		* Database connection variable.
		*
		* Database connection will prevail as long as class instantiation lives.
		*
		* @var Db
		*/
		private $db;

		/**
		* Entity current data.
		*
		* It depends on the class that extends from this class.
		*
		* @deprecated No current use.
		*
		* @var Array
		*/
		public $data;

		/**
		* Class constructor
		*
		* @return void
		*/
		public function __construct() {
			$this->db = new Db();
			$this->slim = new \Slim\Slim;
			$this->data = [];
		}

		/**
		* Returns database connection.
		* 
		* @return Db - Returns the current opened database connection
		*/
		public function getDb() {
			return $this->db;
		}

		/**
		* Sets the data for this entity
		*
		* @deprecated No current use.
		* 
		* @param Array $base - Base array which contain entity attributes
		* @param Array $vals - Values array to be overwritten in the base array
		*
		* @return Array - Returns the modified data array
		*/
		public function setData($base = [], $vals = []) {
			$this->data = Util::mergeOptions($base, $vals);
			return $this->data;
		}
	}

?>