import { OrderStatus } from "@/data/enum";
import { OrderDelivery } from "@/data/interfaces";
import { DeliveryAPI } from "@/services/v1";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ActionButton } from "./action-button";
import { OrderCardCustomerInfo } from "./order-card-customer-info";
import { OrderCardHeader } from "./order-card-header";
import { OrderCardProductList } from "./order-card-product-list";
import { OrderCardTotal } from "./order-card-total";

export const OrderCard = ({ order }: { order: OrderDelivery }) => {
  const queryClient = useQueryClient();

  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
      return DeliveryAPI.ChangeStatusOrder(orderId, { status });
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['orders', 'delivery'] });
      const actionMessage = variables.status === OrderStatus.SHIPPED
        ? "nhận đơn và bắt đầu giao hàng"
        : "giao hàng thành công";
      toast.dismiss();
      toast.success(`Đã ${actionMessage} cho đơn hàng #${variables.orderId}`);
    },
    onError: () => {
      toast.dismiss();
      toast.error("Không thể cập nhật trạng thái đơn hàng");
    },
  });

  const canUpdateStatus = (status: OrderStatus): boolean => {
    return [OrderStatus.PROCESSING, OrderStatus.SHIPPED].includes(status);
  };

  const getButtonText = (status: OrderStatus): string => {
    switch (status) {
      case OrderStatus.PROCESSING:
        return 'Nhận đơn';
      case OrderStatus.SHIPPED:
        return 'Giao thành công';
      default:
        return '';
    }
  };

  const updateOrderStatus = async (orderId: string, currentStatus: OrderStatus) => {
    let newStatus: OrderStatus;
    if (currentStatus === OrderStatus.PROCESSING) newStatus = OrderStatus.SHIPPED;
    else if (currentStatus === OrderStatus.SHIPPED) newStatus = OrderStatus.DELIVERED;
    else {
      toast.error("Không thể cập nhật trạng thái cho đơn hàng này");
      return;
    }
    try {
      toast.loading("Đang cập nhật trạng thái đơn hàng...", {
        id: 'updating-order'
      });
      await updateOrderMutation.mutateAsync({ orderId, status: newStatus });
    } catch {
      toast.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.2 }}
      className="border-l-4 border-gradient-to-b from-green-500 to-emerald-600 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl p-6 space-y-5 border border-gray-200 dark:border-gray-800"
    >
      <OrderCardHeader order={order} />
      <OrderCardCustomerInfo order={order} />
      <OrderCardProductList order={order} />
      <OrderCardTotal order={order} />
      <ActionButton
        order={order}
        canUpdateStatus={canUpdateStatus}
        getButtonText={getButtonText}
        updateOrderStatus={updateOrderStatus}
        updateOrderMutation={updateOrderMutation}
      />
    </motion.div>
  );
}