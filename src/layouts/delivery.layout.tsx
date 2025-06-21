import { isAuthenticatedAtom } from "@/atoms";
import DeliveryHeader from "@/components/layouts/delivery-header";
import { routes } from "@/config";
import { useAtomValue } from "jotai";
import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";

export default function DeliveryLayout() {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom)
  if (!isAuthenticated) return <Navigate to={routes.auth.login} replace />

  return (
    <div className="relative flex min-h-svh flex-col bg-background">
      <div className="border-grid flex flex-1 flex-col">
        <DeliveryHeader />
        <main className="flex flex-1 flex-col">
          <Outlet />
        </main>
        {/* <DeliveryFooter /> */}
      </div>
      <ScrollRestoration />
    </div>
  )
}