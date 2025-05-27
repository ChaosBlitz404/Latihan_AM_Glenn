<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Application Status</title>
</head>
<body>
    <h2>Hello, {{ $username }}!</h2>
    <p>We wanted to update you on the status of your application:</p>
    <h3>Status: {{ $status }}</h3>
    
    @if ($status == 'Approved')
        <p>Congratulations! You have been approved. Welcome aboard!</p>
    @else
        <p>We regret to inform you that your application has been rejected. Please try again later or contact support for more information.</p>
    @endif
</body>
</html>
