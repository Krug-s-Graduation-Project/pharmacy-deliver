import { OrderDelivery } from "@/data/interfaces";
import { CheckCircle, MapPin, Phone, User } from "lucide-react";

export const OrderCardCustomerInfo = ({ order }: { order: OrderDelivery }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl p-4 border border-green-200 dark:border-green-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-base font-bold text-green-800 dark:text-green-200">Thông tin khách hàng</span>
      </div>
      <div className="space-y-4 text-sm">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-green-200 dark:ring-green-700 shadow-md">
              {order.user.profileImage?.url ? (
                <img
                  src={order.user.profileImage.url}
                  alt={order.user.profileImage.alt || `${order.user.firstname} ${order.user.lastname}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {order.user.firstname?.charAt(0)}{order.user.lastname?.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center">
              <CheckCircle className="w-2 h-2 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-bold text-lg text-gray-900 dark:text-white">
              {order.user.firstname} {order.user.lastname}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Khách hàng
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm">
            <Phone className="w-3 h-3 text-gray-600 dark:text-gray-400" />
          </div>
          <span className="text-gray-700 dark:text-gray-300 font-medium">{order.user.phone}</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center shadow-sm mt-0.5">
              <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Địa chỉ giao hàng:</p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {order.shippingAddress.addressLine1}{order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ''}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}