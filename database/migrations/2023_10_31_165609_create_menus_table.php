<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('libelle_fr');
            $table->string('libelle_en');
            $table->string('target');
            $table->string('icone');
            $table->string('code');
            $table->integer('position');
            $table->integer('statut')->defaut(0);
            $table->string('typemenu');
            $table->unsignedBigInteger('menu_id')->nullable()->index();
            $table->integer('created_user')->nullable();
            $table->integer('updated_user')->nullable();
            $table->integer('deleted_user')->nullable(); 
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
