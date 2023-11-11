<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Models\Menu;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191);
        $menus = Menu::get();
        view()->share('menus', $menus);
        //
        $menus = Menu::where('statut', 1)->get();
        $menu_simple = Menu::orderBy('position', 'ASC')->with('menus')->where('menu_id', 0)->get();
        //
        view()->share(['menus'=> $menus, 'menu_simple' => $menu_simple]);
    }
}
