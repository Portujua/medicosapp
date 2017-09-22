<?php
	/**
	* It contains all User Entity methods.
	*
	* @package Classes
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 30/04/2017
	* @license MIT
	*/

	/**
	* User class.
	*/
	class User extends BaseEntity {
		/**
		* User table in database
		*
		* @var String
		*/
		static public $tableName = "user";

		private $data;

		/**
		* Class constructor
		*
		* @return void
		*/
		public function __construct($data = []) {
			$this->data = Util::mergeOptions(self::$base, $data);
		}

		public function get($field = null) {
			return $field == null ? $this->data : $this->data[$field];
		}

		public static function getBase() {
			return [
				new Field("id", false),
				new Field("username", false, true),
				new Field("password", false),
			];
		}

		public static function getSearcheableFields() {
			$sfs = array();

			foreach (self::getBase() as $f) {
				if ($f->isSearcheable()) {
					$sfs[] = $f->getName();
				}
			}

			return $sfs;
		}
	}

?>