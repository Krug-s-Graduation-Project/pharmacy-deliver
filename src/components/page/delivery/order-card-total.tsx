import { OrderDelivery } from "@/data/interfaces";
import { formatCurrency } from "@/lib/format-currency";

export const OrderCardTotal = ({ order }: { order: OrderDelivery }) => {
  return (
    <div className="text-right">
      <p className="text-sm text-gray-600">Tổng cộng:</p>
      <p className="text-xl font-bold text-blue-600">{formatCurrency(order.totalPrice)}</p>
    </div>
  )
}