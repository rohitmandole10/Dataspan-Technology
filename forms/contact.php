<?php
// Recipient email
$to = "info@dataspantechnologies.com";

// Sanitize inputs
$first_name  = htmlspecialchars($_POST['first_name'] ?? '');
$last_name   = htmlspecialchars($_POST['last_name'] ?? '');
$company     = htmlspecialchars($_POST['company_name'] ?? '');
$email       = filter_var($_POST['work_email'] ?? '', FILTER_SANITIZE_EMAIL);
$country     = htmlspecialchars($_POST['country'] ?? '');
$phone       = htmlspecialchars($_POST['phone_number'] ?? '');
$message     = htmlspecialchars($_POST['message'] ?? '');
$consent     = isset($_POST['marketing_consent']) ? 'Yes' : 'No';

// Validate required fields
if (!$first_name || !$last_name || !$company || !$email || !$phone) {
    http_response_code(400);
    echo "Please fill all required fields.";
    exit;
}

// Email subject
$subject = "New Contact Form Submission - Dataspan Technologies";

// Email body
$body = "
You have received a new contact form submission:

Name: $first_name $last_name
Company: $company
Email: $email
Country: $country
Phone: $phone
Marketing Consent: $consent

Message:
$message
";

// Email headers
$headers = "From: Dataspan Website <no-reply@dataspantechnologies.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Failed to send email.";
}
?>
