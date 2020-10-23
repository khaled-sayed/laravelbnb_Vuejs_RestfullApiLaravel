<?php

namespace Database\Seeders;

use App\Models\Bookable;
use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Bookable::all()->each(function (Bookable $bookable){
            $reviews = Review::factory(random_int(5,30))->make();

            $bookable->review()->saveMany($reviews);
        });
    }
}
