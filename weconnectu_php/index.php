<?php 
declare(strict_types=1);


$config = parse_ini_file(__DIR__ ."/config.ini") ;

$serverUrl = $config['FRONT_END_URL'] ;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: '.$serverUrl);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

require __DIR__ . '/src/controller/UserController.php';
$user = new User();


match (true) {
    $method === 'GET'  && $path === '/api/userlist'      => $user->get_userlist(),
    $method === 'POST' && $path === '/api/userstore'      => $user->store(),
    $method === 'GET'  && preg_match('#^/api/userdetail/id/(\d+)$#', $path, $m) === 1
        => $user->get_user_detail((int) $m[1]),
    default => (function () {
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
    })(),
};

?> 