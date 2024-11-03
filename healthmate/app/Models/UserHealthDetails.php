<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserHealthDetails extends Model
{
    use HasFactory;

    protected $fillable = [
        'healthmate_user_id',
        'weight',
        'height',
        'activity_level',
        'daily_steps',
        'heart_rate',
        'sleep_score',
    ];

    public function user()
    {
        return $this->belongsTo(Medicinehistory::class, 'healthmate_user_id');
    }

    public function activity(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Activity::class, 'user_health_details_id');
    }
}
