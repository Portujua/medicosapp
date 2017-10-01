<?php
	/**
	* It contains all Session methods
	*
	* @package Configuration
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 18/09/2019
	* @license MIT
  */

  define('SESSION_TIMEOUT', 1800);

  /**
	* Session class
	*
	* Contains all methods and configuration needed for the sessions. All methods are static
	*/
	class Session {
    /**
    * Last token received (not global)
    * 
    * @var String
    */
    private static $lastToken;

    /**
    * Admin token to bypass login
    *
    * @var String
    */
    private static $adminToken = "AA99884a9af8100d53f352132cbad0206463fc7b76df3211ff1597a6a98f286625";

    private static $table;

    /**
    * Starts the php session manager
    *
    * @return void
    */
    static private function start() {
      //@session_start();
      self::$table = QB::table("Session");
    }

    /**
    * Checks wether the session name is active or not
    *
    * @param String $name - The name of the session
    *
    * @return Boolean - Returns true if exists and it's active, otherwise returns false
    */
    static public function isActive($token = null) {
      self::start();      

      if ($token == null) {
        $token = self::$lastToken;
      }

      if ($token == self::$adminToken) {
        return true;
      }

      $sessionCheck = self::$table->where("token", $token)->get();

      if (count($sessionCheck) > 0) {
        return true;
      }

      return false;
    }

    /**
    * Sets the token to be checked on the run database method
    *
    * @return void
    */
    static public function setLastToken($token) {
      self::$lastToken = $token;
    }

    /**
    * Creates a session
    *
    * @return void
    */
    static public function set($token = null) {
      self::start();

      if ($token == null) {
        $token = self::$lastToken;
      }
      else {
        self::$lastToken = $token;
      }

      self::$table->insert([
        "token" => $token
      ]);
    }

    /**
    * Removes a session
    *
    * @return void
    */
    static public function unset($token = null) {
      self::start();

      if ($token == null) {
        $token = self::$lastToken;
      }

      self::$table->where("token", $token)->delete();
    }

    /**
    * Generates a random session id
    *
    * @return String - The session ID
    */
    static public function generateId() {
      return bin2hex(openssl_random_pseudo_bytes(32));
    }
  }
?>