<?php

namespace App\Services;
use Carbon\Carbon;




class Sdateformat{


    /**
     * dateString au format "2023-01-12"
     * transforme la date  2023-01-12 en 12  Janvier 2023
     * si $choice est vrai alors elle donnera le jour
     * @param [type] $dateString
     * @return void
     */
    public function giveDate($dateString="2023-01-01",$choice=false){
        $date = Carbon::parse($dateString);
        $formattedDate = $date->locale(app()->getLocale())->isoFormat( $choice ? 'dddd D MMMM YYYY' :'D MMMM YYYY');
        return $formattedDate;
    }


    // transforme la date 2023-12-01 en 01/12/2023
    public function changeFormat($dateString="2023-01-01")
    {
        $formattedDate = Carbon::parse($dateString)->format('d/m/Y');
        return $formattedDate;
    }
}
