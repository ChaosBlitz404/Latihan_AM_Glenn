<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for handling Cross-Origin Resource
    | Sharing (CORS). By default, requests from all origins are allowed.
    |
    */
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'auth', 'logout','registration','uni','files','users','users/*','update','update/*','check-auth'],
    'allowed_methods' => ['*'], 
    'allowed_origins' => ['http://localhost:5173'], 
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], 
    'exposed_headers' => [],
    'max_age' => 0, 
    'supports_credentials' => true,
];
