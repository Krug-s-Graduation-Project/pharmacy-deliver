import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/data/enum";
import { OrderDelivery } from "@/data/interfaces";
import { formatDate } from "@/lib/format-date";
import { Calendar, CircleCheck, Clock, Package, Truck } from "lucide-react";

const statusText = {
  [OrderStatus.PENDING]: 'Đang xử lý',
  [OrderStatus.PROCESSING]: 'Chờ giao hàng',
  [OrderStatus.SHIPPED]: 'Đang giao',
  [OrderStatus.DELIVERED]: 'Đã giao',
  [OrderStatus.COMPLETED]: 'Hoàn thành',
  [OrderStatus.CANCELLED]: 'Đã hủy',
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return Clock;
    case OrderStatus.PROCESSING:
      return Package;
    case OrderStatus.SHIPPED:
      return Truck;
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return CircleCheck;
    default:
      return Package;
  }
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "from-orange-500 to-orange-600";
    case OrderStatus.PROCESSING:
      return "from-blue-500 to-blue-600";
    case OrderStatus.SHIPPED:
      return "from-purple-500 to-purple-600";
    case OrderStatus.DELIVERED:
    case OrderStatus.COMPLETED:
      return "from-green-500 to-green-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

export const OrderCardHeader = ({ order }: { order: OrderDelivery }) => {
  const StatusIcon = getStatusIcon(order.status);
  const statusColorClass = getStatusColor(order.status);

  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`w-14 h-14 bg-gradient-to-br ${statusColorClass} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
            <StatusIcon className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-pulse"></div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
            <h3 className="font-bold text-xl text-gray-900 dark:text-white">
              Đơn hàng #{order.id.slice(-8)}
            </h3>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {order.items.length} sản phẩm
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge
            variant="outline"
            className={`px-3 py-1 font-semibold text-sm ${order.status === OrderStatus.PENDING
              ? "bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300"
              : order.status === OrderStatus.PROCESSING
                ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300"
                : order.status === OrderStatus.SHIPPED
                  ? "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
                  : "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
              }`}
          >
            {statusText[order.status]}
          </Badge>
        </div>
      </div>
    </div>
  )
}