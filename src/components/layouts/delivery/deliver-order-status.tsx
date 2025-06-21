import { userAtom } from "@/atoms";
import { Badge } from "@/components/custom/badge";
import { OrderStatus } from "@/data/enum";
import { DeliveryAPI } from "@/services/v1";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { CheckCircle, ClockIcon, Package } from "lucide-react";

export const DeliveryOrderStatus = () => {
  const user = useAtomValue(userAtom)
  const { data: orders = [] } = useQuery({
    queryKey: ['orders', 'delivery'],
    queryFn: () => DeliveryAPI.GetOrderList(),
    enabled: !!user
  });

  const totalOrders = orders.length;
  const processingOrders = orders.filter(order => order.status === OrderStatus.PENDING).length;
  const deliveredOrders = orders.filter(order =>
    order.status === OrderStatus.DELIVERED || order.status === OrderStatus.COMPLETED
  ).length;

  return (
    <div className="hidden md:flex items-center gap-2">
      <Badge variant="outline" className="gap-1.5 text-blue-600">
        <Package
          className="-ms-0.5 opacity-60"
          size={12}
          aria-hidden="true"
        />
        Tổng: {totalOrders}
      </Badge>
      <Badge variant="outline" className="gap-1.5 text-orange-600">
        <ClockIcon
          className="-ms-0.5 opacity-60"
          size={12}
          aria-hidden="true"
        />
        Đang xử lý: {processingOrders}
      </Badge>
      <Badge variant="outline" className="gap-1.5 text-green-600">
        <CheckCircle
          className="-ms-0.5 opacity-60"
          size={12}
          aria-hidden="true"
        />
        Đã giao: {deliveredOrders}
      </Badge>
    </div>
  )
}