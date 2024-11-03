<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicineHistory extends Model
{
    use HasFactory;

    protected $table = 'medicine_history';

    protected $fillable = [
        'healthmate_user_id',
        'health_issue',
        'date_of_diagnosis',
        'progress',
    ];

    public function healthmateUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'healthmate_user_id');
    }
}
