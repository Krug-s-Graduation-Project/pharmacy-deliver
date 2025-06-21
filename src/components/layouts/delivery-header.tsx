import { userAtom } from "@/atoms";
import { useAtomValue } from "jotai";
import { SquareTerminal } from "lucide-react";
import { Badge } from "../custom/badge";
import { ModeSwitcher } from "../mode-switcher";
import { DeliveryNavMobile, DeliveryNavPC, DeliveryNavUser, DeliveryOrderStatus } from "./delivery";

export default function DeliveryHeader() {
  const user = useAtomValue(userAtom)

  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b border-green-200 dark:border-green-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 shadow-sm">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-green-200/0 via-green-200 to-green-200/0 dark:from-green-800/0 dark:via-green-800/30 dark:to-green-800/0" />
      <div className="border-b px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DeliveryNavPC />
            <DeliveryNavMobile />
          </div>

          <div className="flex flex-1 items-center justify-end gap-3">
            <div className="w-full max-w-sm md:w-auto md:flex-none">
              {/* <CommandMenu /> */}
              {import.meta.env.DEV && (
                <Badge
                  variant="outline"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-3 py-1 rounded-full border-none shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="text-xs font-medium flex items-center gap-1.5">
                    <SquareTerminal className="h-4 w-4" />
                    DEVELOPMENT
                  </span>
                </Badge>
              )}
            </div>
            <nav className="flex items-center gap-1.5">
              <DeliveryOrderStatus />
              <ModeSwitcher />
              {user && <DeliveryNavUser user={user} />}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}