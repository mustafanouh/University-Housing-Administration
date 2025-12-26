<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Unit;
use App\Models\Room;
use App\Models\Storage;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {

        $this->call(RolesAndPermissionsSeeder::class);

        echo "\033[33mcreating\033[0m \033[36m10\033[0m Unit Records\n";
        $units = Unit::factory(10)->create();
        echo "\033[32msuccessfully\033[0m created \033[36m10\033[0m Unit records\n";

        echo "\033[33mcreating\033[0m first admin employee\n";
        Employee::factory()->create()->assignRole("admin");
        echo "\033[32msuccessfully\033[0m created admin employee\n";

        echo "\033[33mcreating\033[0m \033[36m2\033[0m acountant employees\n";
        Employee::factory()->create()->assignRole("accountant");
        Employee::factory()->create()->assignRole("accountant");
        echo "\033[32msuccessfully\033[0m created \033[36m2\033[0m accountant employees\n";

        echo "\033[33mcreating\033[0m \033[36m3\033[0m itOffice employees\n";
        Employee::factory()->create()->assignRole("itOffice");
        Employee::factory()->create()->assignRole("itOffice");
        Employee::factory()->create()->assignRole("itOffice");
        echo "\033[32msuccessfully\033[0m created \033[36m3\033[0m itOffice employees\n";

        echo "\033[33mcreating\033[0m maintenanceService employee\n";
        Employee::factory()->create()->assignRole("maintenanceService");
        echo "\033[32msuccessfully\033[0m created maintenanceService employee\n\n";


        echo "\033[33mcreating\033[0m \033[36mmentor\033[0m and \033[36mstorageKeeper\033[0m employee, \033[36mroom\033[0m records and \033[36mstorage\033[0m records for each unit\033[0m\n\n";
        foreach($units as $unit){
            Employee::factory(1)->for($unit)->create()->each(function ($employee) {$employee->assignRole("mentor");});
            Employee::factory(1)->for($unit)->create()->each(function ($employee) {$employee->assignRole("storageKeeper");});

            echo "\033[93mcreating\033[0m {$unit->room_count} room records for unit \033[36m{$unit->name}\033[0m\n";
            Room::factory($unit->room_count)->for($unit)->create();
            echo "\033[92msuccessfully\033[0m created room records for unit \033[36m{$unit->name}\033[0m\n";

            echo "\033[93mcreating\033[0m 6 storage records for unit \033[36m{$unit->name}\033[0m\n";
            Storage::factory(6)->for($unit)->create();
            echo "\033[92msuccessfully\033[0m created storage records for unit \033[36m{$unit->name}\033[0m\n";

            echo"\033[32munit\033[0m {$unit->name} done\n\n";
        }

        echo "\033[33mcreating\033[0m \033[36m100\033[0m student records\n";
        Student::factory(100)->create();
        echo "\033[32msuccessfully\033[0m created \033[36m100\033[0m student records\n";

    }
}
