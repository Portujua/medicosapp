<?php
  /**
	* It contains all Pageable methods.
	*
	* @package Base
	* @author Eduardo Lorenzo <ejlorenzo19@gmail.com>
	* @since 21/09/2017
	* @license MIT
	*/

	/**
	* Pageable class
	* 
  * @method Void setTotalElements(String $totalElements)
  * @method Array get()
  * @method Boolean getSimple()
  * @method Int getPage()
  * @method Int getSize()
  * @method String getKeyword()
  * @method Boolean hasKeyword()
  * @method String getFilter()
  * @method Boolean hasFilter()
  * @method Array getFilters()
  * @method Int getTotalElements()
  * @method Int getTotalPages()
  * @method Int getOffset()
  * @method Array|Response getResponse()
	*/
  class Pageable {
    /**
    * Array with the pageable options
    *
    * @return void
    */
    private $opts;

    /**
    * Class constructor
    *
    * @param String $queryString - The queryString
		*
		* @return void
		*/
    public function __construct($queryString = []) {
      $defaults = [
        "simple" => false,
        "page" => 0,
        "size" => 9999999,
        "keyword" => "",
        "filter" => "",
        "totalElements" => 0
      ];

      $this->opts = Util::mergeOptions($defaults, $queryString);
    }

    /**
    * Sets the totalElements
    *
    * @param Int $totalElements - The total elements
		*
		* @return void
		*/
    public function setTotalElements($totalElements) {
      $this->opts["totalElements"] = $totalElements;
    }

    /**
		* Gets the pageable options
		*
		* @return Array
		*/
    public function get() {
      return $this->opts;
    }

    /**
		* Gets wether pageable is simple or not
		*
		* @return Boolean
		*/
    public function getSimple() {
      return filter_var($this->opts["simple"], FILTER_VALIDATE_BOOLEAN);
    }

    /**
		* Gets the page
		*
		* @return Int
		*/
    public function getPage() {
      return intval($this->opts["page"]);
    }

    /**
		* Gets the size
		*
		* @return Int
		*/
    public function getSize() {
      return intval($this->opts["size"]);
    }

    /**
		* Gets the keyword
		*
		* @return String
		*/
    public function getKeyword() {
      return $this->opts["keyword"];
    }

    /**
		* Gets wether it has a keyword or not
		*
		* @return Boolean
		*/
    public function hasKeyword() {
      return strlen($this->getKeyword()) > 0;
    }

    /**
		* Gets the filter string
		*
		* @return String
		*/
    public function getFilter() {
      return $this->opts["filter"];
    }

    /**
		* Gets wether it has filters or not
		*
		* @return Boolean
		*/
    public function hasFilter() {
      return strlen($this->getFilter()) > 0;
    }

    /**
		* Gets the filters array
		*
		* @return Array
		*/
    public function getFilters() {
      if (!$this->hasFilter()) {
        return [];
      }

      return Filter::extractFilters($this->getFilter());
    }

    /**
		* Gets the total elements
		*
		* @return Int
		*/
    public function getTotalElements() {
      return intval($this->opts["totalElements"]);
    }

    /**
		* Gets the total pages
		*
		* @return Int
		*/
    public function getTotalPages() {
      return ceil($this->getTotalElements() / $this->getSize());
    }

    /**
		* Gets the offset
		*
		* @return Int
		*/
    public function getOffset() {
      return $this->getSize() * $this->getPage();
    }

    /**
    * Gets the response
    *
    * @param Array|Response $response - The query result or a response (caused by some error)
		*
		* @return Array|Response
		*/
    public function getResponse($response) {
      if ($response instanceof Response) {
        return $response;
      }
      
      if ($this->getSimple()) {
        return $response;
      }
      
      $response = [
        "content" => $response,
        "page" => $this->getPage(),
        "size" => $this->getSize(),
        "totalElements" => $this->getTotalElements(),
        "totalPages" => $this->getTotalPages()
      ];

      return $response;
    }
  }
?>