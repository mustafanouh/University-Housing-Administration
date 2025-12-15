<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{

    public function run(): void
    {
        $admin = Role::create(["name" => "Admin"]);
        $itOffice = Role::create(["name" => "itOffice"]);
        $accountant = Role::create(["name" => "accountant"]);
        $mentor = Role::create(["name" => "mentor"]);
        $storageKeeper = Role::create(["name" => "storageKeeper"]);
        $maintenanceService = Role::create(["name" => "maintenanceService"]);
        $student = Role::create(["name" => "student"]);

        // //////////////////////////////////////////////////////////////////////////////////////////////////

        //

        // //////////////////////////////////////////////////////////////////////////////////////////////////

        //

        // //////////////////////////////////////////////////////////////////////////////////////////////////


    }
}
