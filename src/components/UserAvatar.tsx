import { useState } from "react";
import UserProfile from "../assets/UserProfile.svg"
import {
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center cursor-pointer focus:outline-none "
          >
            <img className="rounded-full h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10" src={UserProfile} alt="User Profile" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <UserIcon />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
