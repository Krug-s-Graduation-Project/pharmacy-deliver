import { OrderDelivery } from "@/data/interfaces";
import { OrderStatus } from "@/data/enum";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock, CircleCheck } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";

interface Props {
  order: OrderDelivery;
  canUpdateStatus: (status: OrderStatus) => boolean;
  getButtonText: (status: OrderStatus) => string;
  updateOrderStatus: (orderId: string, currentStatus: OrderStatus) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateOrderMutation: UseMutationResult<any, Error, { orderId: string; status: OrderStatus }, unknown>;
}

export const ActionButton = ({ order, canUpdateStatus, getButtonText, updateOrderStatus, updateOrderMutation }: Props) => {
  return (
    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
      {canUpdateStatus(order.status) ? (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={() => updateOrderStatus(order.id, order.status)}
            disabled={updateOrderMutation.isPending}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-none"
          >
            {updateOrderMutation.isPending ? (
              <div className="flex items-center gap-2">
                <Clock className="animate-spin h-4 w-4 text-white" />
                <span>Đang xử lý...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <CircleCheck className="w-4 h-4 text-white" />
                <span>{getButtonText(order.status)}</span>
              </div>
            )}
          </Button>
        </motion.div>
      ) : order.status === OrderStatus.PENDING ? (
        // Chỉ hiển thị thông báo cho trạng thái PENDING
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-amber-800 dark:text-amber-200 text-sm">
                Đơn hàng đang được xử lý
              </p>
              <p className="text-amber-700 dark:text-amber-300 text-xs mt-1">
                Vui lòng chờ hệ thống xác nhận và chuyển sang trạng thái "Chờ giao hàng"
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}