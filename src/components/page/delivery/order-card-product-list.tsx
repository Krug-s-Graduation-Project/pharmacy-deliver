import { OrderDelivery } from "@/data/interfaces";
import { formatCurrency } from "@/lib/format-currency";
import { Package, ShoppingBag } from "lucide-react";

export const OrderCardProductList = ({ order }: { order: OrderDelivery }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
          <ShoppingBag className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold text-blue-800 dark:text-blue-200">Danh sách sản phẩm</span>
      </div>
      <div className="space-y-3">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            {/* Ảnh sản phẩm */}
            <div className="relative">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600">
                {item.medicine.thumbnail?.url ? (
                  <img
                    src={item.medicine.thumbnail.url}
                    alt={item.medicine.thumbnail.alt || item.medicine.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                    <Package className="w-6 h-6 text-blue-400 dark:text-blue-500" />
                  </div>
                )}
              </div>
              {/* Badge số lượng */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-900">
                <span className="text-white text-xs font-bold">{item.quantity}</span>
              </div>
            </div>

            {/* Thông tin sản phẩm */}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                {item.medicine.name}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Đơn giá: <span className="font-medium text-blue-600 dark:text-blue-400">{formatCurrency(item.price)}</span>
                </div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(item.itemTotal)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}