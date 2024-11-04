# Vultr Cloud Project

HealthMate website powering itself with Laravel React framework deploying on Vultr.

## Technology Need 
- Laravel CLI 
- Node (above v18)
- Composer
- PHP (above v8.2)
- Sqlite3

### Installing packages and modules
```bash
# Install composer modules
composer install

# update composer modules
composer update

# Install node packages
npm install

# Build frontend react 
npm run build
```

### Command to remember when working on this Laravel website
```bash
# Run PHP Laravel server
php artisan serve

# Create migration file
php artisan make:migration [name_of_migration]

# Initate migration
php artisan migrate

# Create php controller and model
php artisan make:controller [NameOfController]
php artisan make:model [NameOfModel]
```