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
        $admin = Role::create(["name" => "admin", "guard_name" => "employee"]);
        $itOffice = Role::create(["name" => "itOffice", "guard_name" => "employee"]);
        $accountant = Role::create(["name" => "accountant", "guard_name" => "employee"]);
        $mentor = Role::create(["name" => "mentor", "guard_name" => "employee"]);
        $storageKeeper = Role::create(["name" => "storageKeeper", "guard_name" => "employee"]);
        $maintenanceService = Role::create(["name" => "maintenanceService", "guard_name" => "employee"]);
        $student = Role::create(["name" => "student"]);

        // //////////////////////////////////////////////////////////////////////////////////////////////////

        //

        // //////////////////////////////////////////////////////////////////////////////////////////////////

        //

        // //////////////////////////////////////////////////////////////////////////////////////////////////


    }
}
