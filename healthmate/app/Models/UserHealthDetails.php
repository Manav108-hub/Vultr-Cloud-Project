<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserHealthDetails extends Model
{
    use HasFactory;

    protected $table = 'user_health_details';

    protected $fillable = [
        'id',
        'healthmate_user_id',
        'weight',
        'height',
        'activity_level',
        'daily_steps',
        'heart_rate',
        'sleep_score',
    ];

    public $incrementing = false;
    protected $keyType = 'string';

    public function user()
    {
        return $this->belongsTo(User::class, 'healthmate_user_id'. 'id');
    }

    public function activity(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Activity::class, 'user_health_details_id');
    }
}
