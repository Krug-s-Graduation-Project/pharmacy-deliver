import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { routes, siteConfig } from "@/config";
import { cn } from "@/lib/utils";


import { LogOut, X, Shield } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";

export function LogOutDialog({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const handleLogout = useCallback(() => {
    const promise = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Sonner" }), 1000)
      );
    localStorage.removeItem(siteConfig.auth.jwt_key);
    toast.promise(promise(), {
      loading: "Đang đăng xuất...",
      success: () => {
        onClose();
        window.location.href = routes.auth.login;
        return "Đăng xuất thành công";
      },
      error: "Đăng xuất thất bại",
    });
  }, [onClose]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md border-0 shadow-2xl bg-white dark:bg-gray-900 p-0 overflow-hidden rounded-2xl backdrop-blur-sm">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-amber-500/5 dark:from-red-900/10 dark:via-orange-900/10 dark:to-amber-900/10" />
        
        {/* Close button */}
        <div className="absolute top-4 right-4 z-20">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-200 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
          >
            <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
        
        {/* Header section với gradient background */}
        <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-red-50/40 dark:from-gray-900 dark:via-orange-950/20 dark:to-red-950/20 pt-12 pb-8 px-8">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-200/30 to-red-200/30 dark:from-orange-800/20 dark:to-red-800/20 rounded-full blur-xl" />
            <div className="absolute bottom-4 right-4 w-12 h-12 bg-gradient-to-br from-red-200/40 to-amber-200/40 dark:from-red-800/20 dark:to-amber-800/20 rounded-full blur-lg" />
          </div>
          
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            {/* Icon container */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-md animate-pulse" />
              <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 border border-red-200/50 dark:border-red-800/30">
                <Shield className="h-8 w-8 text-red-500 dark:text-red-400" />
              </div>
            </div>
            
            <AlertDialogHeader className="space-y-3">
              <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                Xác nhận đăng xuất
              </AlertDialogTitle>
              
              <AlertDialogDescription className="text-gray-600 dark:text-gray-400 max-w-[280px] mx-auto leading-relaxed">
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không? Bạn sẽ cần đăng nhập lại để tiếp tục sử dụng dịch vụ.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        {/* Action buttons section */}
        <div className="p-8 pt-6 flex flex-col sm:flex-row gap-4 bg-white dark:bg-gray-900 relative">
          {/* Subtle border separator */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
          
          <Button 
            variant="outline" 
            onClick={onClose}
            className="sm:flex-1 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 font-medium py-2.5 rounded-xl group"
          >
            <span className="group-hover:scale-105 transition-transform duration-200">
              Hủy bỏ
            </span>
          </Button>
          
          <Button 
            onClick={handleLogout}
            className={cn(
              "relative sm:flex-1 bg-gradient-to-r from-red-500 via-red-600 to-red-700",
              "hover:from-red-600 hover:via-red-700 hover:to-red-800",
              "text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200",
              "gap-2.5 py-2.5 rounded-xl group overflow-hidden"
            )}
          >
            <LogOut className="h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
            <span className="group-hover:scale-105 transition-transform duration-200">
              Đăng xuất
            </span>
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}