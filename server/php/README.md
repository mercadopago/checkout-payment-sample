# Checkout payment processing with Checkout Pro

## Using a PHP server with simple routing

### Requirements
- PHP 7.1 or higher
- [Composer](https://getcomposer.org/download) dependency manager
- Read our [testing instructions](https://www.mercadopago.com/developers/en/guides/online-payments/checkout-pro/test-integration)
- Setup your credentials: 
  - Private Access Token on server-side [`server.php`](https://github.com/mercadopago/checkout-payment/server/php/server.php#L6)

### How to run it
- php composer.phar install
- php -S localhost:8080 server.php
- Navigate to http://localhost:8080 on your browser
