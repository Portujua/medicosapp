<?php
	/**
	* It contains all Base Entity methods.
	*
	* @package Base
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 30/04/2017
	* @license MIT
	*/

	/**
	* Base entity class for common methods across entities.
	*/
	class BaseEntity {
		/**
		* Base structure
		* 
		* @var Array
		*/
		static public $base = [];

		/**
		* Primary key in database
		*
		* @var String
		*/
		static public $pk = "id";
	}

?>