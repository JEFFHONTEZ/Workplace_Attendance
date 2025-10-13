<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'shift_name',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'start_time' => 'datetime: H:i:s',
        'end_time' => 'datetime: H:i:s',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
