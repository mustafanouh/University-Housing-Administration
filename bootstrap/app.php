<?php

use App\Http\Middleware\Authenticated;
use App\Http\Middleware\CheckAccountantRole;
use App\Http\Middleware\CheckAdminRole;
use App\Http\Middleware\CheckItOfficeRole;
use App\Http\Middleware\CheckMaintenanceRole;
use App\Http\Middleware\CheckMentorRole;
use App\Http\Middleware\CheckStorageKeeperRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            // 'auth' => \App\Http\Middleware\Authenticate::class,
            "AuthenticatedUser" => Authenticated::class,
            "Admin" => CheckAdminRole::class,
            "Accountant" => CheckAccountantRole::class,
            "ITOffice" => CheckItOfficeRole::class,
            "Maintenance" => CheckMaintenanceRole::class,
            "Mentor" => CheckMentorRole::class,
            "StorageKeeper" => CheckStorageKeeperRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
