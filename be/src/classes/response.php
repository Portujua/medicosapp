<?php
	/**
	* It contains all Response methods
	*
	* @package Configuration
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 18/09/2019
	* @license MIT
	*/
	
	define("STATUS_OK", 200);
	define("STATUS_CREATED", 201);
	define("STATUS_ACCEPTED", 202);
	define("STATUS_NO_CONTENT", 204);
	define("STATUS_BAD_REQUEST", 400);
	define("STATUS_UNAUTHORIZED", 401);
	define("STATUS_FORBIDDEN", 403);
	define("STATUS_NOT_FOUND", 404);
	define("STATUS_METHOD_NOT_ALLOWED", 405);
	define("STATUS_TIMEOUT", 408);
	define("STATUS_INTERNAL_SERVER_ERROR", 500);
	define("STATUS_NOT_IMPLEMENTED", 501);

  /**
	* Base response class
	*
	* Contains the methods related to a basic http response
	* @method Array getData()
	* @method Int getStatus()
	* @method Void setSlim(Slim $slim)
	* @method JSON getResponse(Boolean $jsonParse)
	* @method Response getBaseUnauthorized(String $message)
	* @method Response getBaseInternalError(String $message)
	*/
	class Response {
		/**
		* The slim instance
		*
		* @var Slim
		*/
		private $slim;

		/**
		* The query data result
		*
		* @var Array
		*/
		private $data;

		/**
		* The response status
		*
		* @var Int
		*/
		private $status;

		/**
		* Class constructor
		*
		* @return void
		*/
		public function __construct($data, $status = STATUS_OK) {
			$this->slim = null;
			$this->data = $data instanceof Response ? $data->getData() : $data;
			$this->status = $data instanceof Response ? $data->getStatus() : $status;
		}

		/**
		* Gets the data query result
		*
		* @return Array
		*/
		public function getData() {
			return $this->data;
		}

		/**
		* Gets the response status
		*
		* @return Int
		*/
		public function getStatus() {
			return $this->status;
		}

		/**
		* Sets the slim instance
		*
		* @return void
		*/
		public function setSlim($slim) {
			$this->slim = $slim;
		}

		/**
		* Gets the JSON response
		*
		* @return JSON
		*/
		public function getResponse($jsonParse = true) {
			if ($jsonParse instanceof Response) {
				return $jsonParse->getResponse();
			}

			$this->slim->response()->status($this->status);

			return $jsonParse ? json_encode(["status" => $this->status, "data" => $this->data], JSON_NUMERIC_CHECK) : $this->data;
		}

		/**
		* Gets the base response for unauthorized status (401)
		*
		* @return Response
		*/
		public static function getBaseUnauthorized($message = "Error trying to access private content.", $jsonParse = true) {
			return new Response($message, STATUS_UNAUTHORIZED);
		}

		/**
		* Gets the base response for internal server error status (501)
		*
		* @return Response
		*/
		public static function getBaseInternalError($message = "There has been an error.", $jsonParse = true) {
			return new Response($message, STATUS_INTERNAL_SERVER_ERROR);
		}

		public static function getBaseMethodNotAllowed($message = "Method not allowed.", $jsonParse = true) {
			return new Response($message, STATUS_METHOD_NOT_ALLOWED);
		}

		public static function getBaseNoContent($message = "No content found.", $jsonParse = true) {
			return new Response($message, STATUS_NO_CONTENT);
		}

		public static function getBaseRecordNotFound($message = "Record not found.", $jsonParse = true) {
			return new Response($message, STATUS_ACCEPTED);
		}

		public static function getBaseRecordCreated($message = "Record created successfully.", $jsonParse = true) {
			return new Response($message, STATUS_CREATED);
		}
  }
?>