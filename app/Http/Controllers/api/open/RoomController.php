<?php

namespace App\Http\Controllers\api\open;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Room;

use App\Http\Resources\open\StudentResource;

class RoomController extends Controller
{
    public function getRoomStudents(Room $room) {
        return StudentResource::collection($room->student);
    }
}
