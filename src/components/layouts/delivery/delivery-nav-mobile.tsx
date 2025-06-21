import { deliveryActiveTabAtom, TabValue, userAtom } from "@/atoms";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { OrderStatus } from "@/data/enum";
import { useMetaColor } from "@/hooks/use-meta-color";
import { DeliveryAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue, useSetAtom } from "jotai";
import { CheckCircle, ClockIcon, Package, Truck } from "lucide-react";
import { useCallback, useState } from "react";

export function DeliveryNavMobile() {
  const user = useAtomValue(userAtom)
  const [open, setOpen] = useState(false);
  const { setMetaColor, metaColor } = useMetaColor();
  const activeTab = useAtomValue(deliveryActiveTabAtom);
  const setActiveTab = useSetAtom(deliveryActiveTabAtom);

  const { data: orders = [] } = useQuery({
    queryKey: ['orders', 'delivery'],
    queryFn: () => DeliveryAPI.GetOrderList(),
    enabled: !!user
  });

  // Lọc đơn hàng theo status
  const pendingOrders = orders.filter(order => order.status === OrderStatus.PENDING);
  const processingOrders = orders.filter(order => order.status === OrderStatus.PROCESSING);
  const shippedOrders = orders.filter(order => order.status === OrderStatus.SHIPPED);
  const deliveredOrders = orders.filter(order =>
    order.status === OrderStatus.DELIVERED || order.status === OrderStatus.COMPLETED
  );

  // Tính toán số lượng cho header badges
  const totalOrders = orders.length;
  const pendingCount = pendingOrders.length;
  const deliveredCount = deliveredOrders.length;

  const getTabCount = (tab: TabValue) => {
    switch (tab) {
      case 'pending':
        return pendingOrders.length;
      case 'processing':
        return processingOrders.length;
      case 'shipping':
        return shippedOrders.length;
      case 'delivered':
        return deliveredOrders.length;
      default:
        return 0;
    }
  };

  const tabs = [
    { value: 'pending' as TabValue, label: 'Đang xử lý' },
    { value: 'processing' as TabValue, label: 'Chờ giao hàng' },
    { value: 'shipping' as TabValue, label: 'Đang giao' },
    { value: 'delivered' as TabValue, label: 'Đã giao' },
  ];

  const onOpenChange = useCallback(
    (open: boolean) => {
      setOpen(open);
      setMetaColor(open ? "#09090b" : metaColor);
    },
    [setMetaColor, metaColor]
  );

  const closeDrawer = () => setOpen(false);

  const handleTabSelect = (tab: TabValue) => {
    setActiveTab(tab);
    closeDrawer();
  };

  return (
    <div className="md:hidden flex items-center gap-2">
      {/* Logo mobile - Click to open menu */}
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
          <button className="flex items-center gap-2 hover:bg-green-50 dark:hover:bg-green-950/50 rounded-lg p-1 transition-colors">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-sm font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Giao hàng
              </h1>
            </div>
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[70svh] p-0 border-t border-green-200 dark:border-green-800/50">
          <div className="px-6 py-6">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-3 h-3 text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Quản lý giao hàng
                </h2>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Chọn trạng thái đơn hàng để xem chi tiết
              </p>
            </div>

            {/* Tab Navigation */}
            <nav className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleTabSelect(tab.value)}
                  className={`w-full flex items-center justify-between px-5 py-4 rounded-xl transition-all duration-200 ${activeTab === tab.value
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-[1.02]'
                    : 'text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50 border border-gray-200 dark:border-gray-700'
                    }`}
                >
                  <span className="font-semibold">{tab.label}</span>
                  <Badge
                    variant={activeTab === tab.value ? "secondary" : "outline"}
                    className={`text-xs font-bold px-3 py-1 rounded-full ${activeTab === tab.value
                      ? "bg-white/20 text-white border-white/30"
                      : "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                      }`}
                  >
                    {getTabCount(tab.value)}
                  </Badge>
                </button>
              ))}
            </nav>

            {/* Statistics */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 text-center">
                Thống kê đơn hàng
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <Package className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-blue-600 dark:text-blue-400">Tổng</div>
                  <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{totalOrders}</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                  <ClockIcon className="w-4 h-4 text-orange-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-orange-600 dark:text-orange-400">Đang xử lý</div>
                  <div className="text-lg font-bold text-orange-700 dark:text-orange-300">{pendingCount}</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-green-600 dark:text-green-400">Đã giao</div>
                  <div className="text-lg font-bold text-green-700 dark:text-green-300">{deliveredCount}</div>
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}