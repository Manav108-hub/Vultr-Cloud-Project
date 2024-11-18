<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class HealthIssues extends Model
{
    // Define the table name if it's different from the model name in plural
    protected $table = 'health_issues';

    // Specify the primary key type and its default value
    public $incrementing = false;
    protected $keyType = 'string';

    // Define the fillable properties for mass assignment
    protected $fillable = [
        'id',
        'user_id',
        'issue_description',
        'severity',
        'last_checkup_date',
        'prescribed_medications',
    ];

    // Automatically generate a UUID for the primary key upon creation
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    // Define any relationships (example: belongs to User)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
