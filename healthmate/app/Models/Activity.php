<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\UserHealthDetailsController;

class Activity extends Model
{
    use HasFactory;

    protected $table = 'healthmate_users';
    protected $keyType = 'string'; // To support UUID
    public $incrementing = false; // UUIDs are non-incrementing


    protected $fillable = [
        'user_health_details_id',
        'title',
        'time',
        'duration',
        'calories_burn',
    ];

    public function userHealthDetails(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(UserHealthDetails::class, 'user_health_details_id');
    }
}
