<?php

namespace App\Models;


use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Users extends Authenticatable {
    use Notifiable;

    protected $table = 'healthmate_users';

    // Specify that the primary key is a string uuid and incrementing
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'full_name',
        'email',
        'password',
        'birth_date',
        'phone_no',
        'gender',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'birth_date' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}
