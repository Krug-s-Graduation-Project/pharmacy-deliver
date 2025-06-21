import { deliveryActiveTabAtom, deliveryOrdersAtom, TabValue, userAtom } from "@/atoms";
import { EmptyState, LoadingCard, OrderCard } from "@/components/page/delivery";
import { Button } from "@/components/ui/button";
import { routeNames, routes, siteConfig } from "@/config";
import { OrderStatus } from "@/data/enum";
import { DeliveryAPI } from "@/services/v1";
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

export default function DeliveryPage() {
  const isAuthenticated = useAtomValue(userAtom);
  const activeTab = useAtomValue(deliveryActiveTabAtom);
  const setDeliveryOrders = useSetAtom(deliveryOrdersAtom);

  const { data: orders = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['orders', 'delivery'],
    queryFn: () => DeliveryAPI.GetOrderList(),
    enabled: !!isAuthenticated
  });

  // Cập nhật atom khi data thay đổi
  useEffect(() => {
    setDeliveryOrders(orders);
  }, [orders, setDeliveryOrders]);

  // Lọc đơn hàng theo status
  const pendingOrders = orders.filter(order => order.status === OrderStatus.PENDING);
  const processingOrders = orders.filter(order => order.status === OrderStatus.PROCESSING);
  const shippedOrders = orders.filter(order => order.status === OrderStatus.SHIPPED);
  const deliveredOrders = orders.filter(order =>
    order.status === OrderStatus.DELIVERED || order.status === OrderStatus.COMPLETED
  );

  const getCurrentOrders = () => {
    switch (activeTab) {
      case 'pending':
        return pendingOrders;
      case 'processing':
        return processingOrders;
      case 'shipping':
        return shippedOrders;
      case 'delivered':
        return deliveredOrders;
      default:
        return [];
    }
  };

  const getEmptyMessage = (tab: TabValue) => {
    switch (tab) {
      case 'pending':
        return "Không có đơn hàng nào đang xử lý";
      case 'processing':
        return "Không có đơn hàng nào chờ giao hàng";
      case 'shipping':
        return "Không có đơn hàng nào đang giao";
      case 'delivered':
        return "Không có đơn hàng nào đã giao";
      default:
        return "Không có đơn hàng nào";
    }
  };

  // Show error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">Có lỗi xảy ra khi tải dữ liệu</p>
            <Button onClick={() => refetch()}>Thử lại</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 via-white to-green-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-green-950/30">
      <Helmet>
        <title>{routeNames[routes.delivery.root]} | {siteConfig.name}</title>
      </Helmet>

      <div className="flex-1 p-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Tab Content */}
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => <LoadingCard key={index} />)
            ) : getCurrentOrders().length === 0 ? (
              <EmptyState message={getEmptyMessage(activeTab)} />
            ) : (
              getCurrentOrders().map((order) => <OrderCard key={order.id} order={order} />)
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}