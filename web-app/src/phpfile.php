<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Obsługa zapytania OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Parametry połączenia z bazą danych
$host = "localhost";
$user = "root";
$password = "";
$database = "users_db";

try {
    $conn = new mysqli($host, $user, $password, $database);
    
    if ($conn->connect_error) {
        throw new Exception("Błąd połączenia z bazą: " . $conn->connect_error);
    }
    
    // Sprawdzanie czy przesłano nazwę użytkownika
    if (!isset($_POST['username']) || empty($_POST['username'])) {
        throw new Exception("Nie podano nazwy użytkownika");
    }
    
    $username = $conn->real_escape_string($_POST['username']);
    
    // Przygotowane zapytanie (prepared statement) dla bezpieczeństwa
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(["Użytkownik $username istnieje w bazie"]);
    } else {
        echo json_encode(["Użytkownik $username nie istnieje w bazie"]);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([$e->getMessage()]);
} finally {
    if (isset($conn)) {
        $conn->close();
    }
}
?>