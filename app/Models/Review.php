<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;
    protected $fillable = ['id', 'content', 'rating'];
    // protected $guarded = ['id'];

    public function bookable()
    {
        return $this->belongsTo('bookable');
    }

    public function booking()
    {
        return $this->belongsTo('booking');
    }

    public function getIncrementing()
    {
        return false;
    }

    public function getKeyType()
    {
        return 'string';
    }
}
