<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDetails extends Model
{
    //
    protected $table = 'user_details';
    protected $fillable = [
        'phone_no',
        'dob',
        'gender',
        'address',
    ];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
       return $this->belongsTo(User::class, 'user_id');
    }
}
