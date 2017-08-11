<?php

namespace App\Repositories;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class NewContentRepository {

	protected $client;

	protected $locale = '';

	public function __construct() {
		$this->client = new Client([
			'base_uri' => config('app.api_uri'),
			'timeout' => config('app.timeout'),
		]);

		$this->locale = \App::getLocale();

		if ($this->locale == 'en') {
			$this->locale = '';
		}
	}

	public function getItem($user_id = NULL) {
		$url = $this->locale . '/api/newcontent/';

		$headers = [];

		if ($user_id) {
			$headers['custom-auth-id'] = $user_id;
		}

		$response = $this->client->get($url, ['headers' => $headers]);

		return json_decode($response->getBody());
	}
}