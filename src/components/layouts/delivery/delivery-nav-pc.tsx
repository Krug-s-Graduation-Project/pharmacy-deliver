import { routes } from "@/config";
import { motion } from 'framer-motion';
import { Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enum";
import { deliveryActiveTabAtom, deliveryOrdersAtom, TabValue } from "@/atoms";
import { useAtomValue, useSetAtom } from "jotai";

export function DeliveryNavPC() {
  const activeTab = useAtomValue(deliveryActiveTabAtom);
  const setActiveTab = useSetAtom(deliveryActiveTabAtom);
  const orders = useAtomValue(deliveryOrdersAtom);

  // Lọc đơn hàng theo status
  const pendingOrders = orders.filter(order => order.status === OrderStatus.PENDING);
  const processingOrders = orders.filter(order => order.status === OrderStatus.PROCESSING);
  const shippedOrders = orders.filter(order => order.status === OrderStatus.SHIPPED);
  const deliveredOrders = orders.filter(order => 
    order.status === OrderStatus.DELIVERED || order.status === OrderStatus.COMPLETED
  );

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

  return (
    <div className="hidden md:flex items-center justify-between w-full max-w-full">
      {/* Logo Area - Compact */}
      <Link to={routes.delivery.root} className="flex-shrink-0">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <Truck className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-base font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Quản lý giao hàng
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Theo dõi đơn hàng
              </p>
            </div>
          </div>
        </motion.div>
      </Link>

      {/* Tab Navigation - Flexible */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex-1 max-w-xl mx-4"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg p-1 shadow-sm">
          <div className="grid grid-cols-4 gap-0.5">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-md font-medium transition-all duration-300 relative overflow-hidden text-center ${
                  activeTab === tab.value
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeTabHeader"
                    className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center gap-0.5">
                  <span className="text-xs font-semibold whitespace-nowrap">{tab.label}</span>
                  <Badge 
                    variant={activeTab === tab.value ? "secondary" : "outline"}
                    className={`text-xs font-bold px-1.5 py-0 min-w-[20px] h-5 ${
                      activeTab === tab.value 
                        ? "bg-white/20 text-white border-white/30" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {getTabCount(tab.value)}
                  </Badge>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>      
    </div>
  )
}