<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permission extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'permissions';

    protected $fillable = [
        'profil_id',
        'menu_id',
        'action_id',
        'created_user',
        'updated_user',
        'deleted_user',
    ];

    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
