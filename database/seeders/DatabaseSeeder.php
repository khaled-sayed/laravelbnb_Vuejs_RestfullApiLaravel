<?php

namespace Database\Seeders;

use App\Models\Bookable;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(BookablesTableSeeder::class);
        $this->call(BookingsTableSedeer::class);
        $this->call(ReviewTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        // \App\Models\Bookable::factory(15)->create();
        // \App\Models\User::factory(10)->create();
    }
}
