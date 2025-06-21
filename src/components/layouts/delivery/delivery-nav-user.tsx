import { userLoadingAtom } from "@/atoms";
import { LogOutDialog } from "@/components/dialogs/logout-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountRole } from "@/data/enum";
import { User } from "@/data/interfaces";
import { useAtomValue } from "jotai";
import { LogOut } from "lucide-react";
import { useState } from "react";

function DeliveryNavUserContent({ user }: { user: User }) {
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const handleLogoutClick = () => {
    setIsLogoutOpen(true);
  };

  const handleLogoutClose = () => {
    setIsLogoutOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-200 p-0 focus-visible:ring-offset-1"
          >
            <Avatar className="h-full w-full">
              <AvatarImage
                src={user.profileImage.url}
                alt={user.profileImage.alt}
                className="object-cover"
              />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {user.username
                  .split(" ")
                  .map((n) => n[0].toUpperCase())
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-64 overflow-hidden border border-border/50 shadow-lg"
          align="end"
          forceMount
          sideOffset={8}
        >
          <DropdownMenuLabel className="p-4 border-b border-border/50">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.profileImage.url} alt={user.profileImage.alt} className="object-cover" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {user.username
                    .split(" ")
                    .map((n) => n[0].toUpperCase())
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">Hi, {user.lastname}</p>
                  {(user.role === AccountRole.ADMIN || user.role === AccountRole.PHARMACIST) && (
                    <Badge
                      variant="outline"
                      className={
                        user.role === AccountRole.ADMIN
                          ? "border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300 text-xs font-medium px-1.5 py-0.5"
                          : "border-blue-200 dark:border-blue-800 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 text-xs font-medium px-1.5 py-0.5"
                      }
                    >
                      {user.role}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <div className="p-1">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer rounded-md text-destructive hover:text-destructive"
                onSelect={() => {
                  setIsDropdownOpen(false);
                  setTimeout(() => {
                    handleLogoutClick();
                  }, 100);
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-red-100 dark:bg-red-900/30">
                  <LogOut size={16} className="text-red-600 dark:text-red-400" />
                </div>
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogOutDialog isOpen={isLogoutOpen} onClose={handleLogoutClose} />
    </>
  );
}

export function DeliveryNavUser({ user }: { user: User }) {
  const isLoading = useAtomValue(userLoadingAtom);
  if (isLoading) return <Skeleton className="h-9 w-9 rounded-full" />;
  return <DeliveryNavUserContent user={user} />;
}