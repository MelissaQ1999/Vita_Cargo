<?php
require __DIR__ . '/mailer.php';

// Load the language array
$translations = [
    'nl' => [
        'err_name'        => 'Voer uw naam correct in',
        'err_email'       => 'Voer een geldig e-mailadres in',
        'err_phone'       => 'Voer een geldig telefoonnummer in',
        'err_message'     => 'Voer een bericht in',
        'mail_subject'    => 'Contactformulier',
    ],
    'en' => [
        'err_name'        => 'Please enter your name',
        'err_email'       => 'Please enter a valid email address',
        'err_phone'       => 'Please enter a valid phone number',
        'err_message'     => 'Please enter a message',
        'mail_subject'    => 'Contact form',
    ]
];

// Specific language, fallback to 'en'
$lang = $_POST['lang'] ?? 'nl';
if (! in_array($lang, ['nl','en'], true)) {
    $lang = 'en';
}

// Choose the correct language array, fallback to English
$tr = $translations[$lang] ?? $translations['en'];

function validate_input($input) {
    // Applies validation logic to the input string
    return htmlspecialchars(strip_tags(trim($input)));
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

// Form data is received here
$name           = validate_input($_POST['name'] ?? '');
$visitor_email  = validate_input($_POST['email'] ?? '');
$phoneNumber    = validate_input($_POST['phoneNumber'] ?? '');
$message        = validate_input($_POST['message'] ?? '');

$subjRaw = $_POST['subject'] ?? '';

$subject = trim($subjRaw) !== ''
         ? validate_input($subjRaw)
         : $tr['mail_subject'];

// Validates the input data
$errors = [];

if ($name === '' || preg_match("/^[0-9]+$/", $name)) {
    $errors[] = $tr['err_name'];
}

if (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = $tr['err_email'];
}

// Phone: only check if not empty
if ($phoneNumber !== '' && !preg_match("/^\+?[0-9\s\-]{7,15}$/", $phoneNumber)) {
    $errors[] = $tr['err_phone'];
}

if ($message === '') {
    $errors[] = $tr['err_message'];
}

if (!empty($errors)) {
    // Show error messages
    foreach ($errors as $error) {
        echo "<p class='error'>$error</p>";
    }
    exit;
} else {
    // Formatting email content
    $email_body = "
    <html>
    <head>
        <title>{$subject}</title>
    </head>
    <body>
        <h2>{$subject}</h2>
        <p><strong>Naam(en):</strong><br>{$name}</p>
        <p><strong>E-mailadres:</strong><br>{$visitor_email}</p>
        <p><strong>Telefoonnummer:</strong><br>{$phoneNumber}</p>
        <p><strong>Bericht:</strong><br>{$message}</p>
    </body>
    </html>
    ";

    // Plain-text version of the email body
    $email_body_text = "Onderwerp: $subject\n"
        . "Naam: $name\n"
        . "E-mailadres: $visitor_email\n"
        . "Telefoonnummer: $phoneNumber\n"
        . "Bericht: $message\n";

    // TODO: set email for the reciever here
    $to = 'info@vitacargo.com';

    // Mail settings
    send_email_helper($to, $subject, $email_body, $email_body_text );
        
    // Redirect to contact page
    header('Location:../pages/contact_succes.html', true, 303);
    exit;
}