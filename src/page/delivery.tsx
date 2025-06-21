import { routeNames, routes, siteConfig } from "@/config";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

export default function DeliveryPage() {
  const [currentStatus, setCurrentStatus] = useState<"pending" | "delivering" | "delivered">("pending");

  const getStatusText = () => {
    switch (currentStatus) {
      case "pending":
        return "Danh sách đơn hàng chờ giao";
      case "delivering":
        return "Danh sách đơn hàng đang giao";
      case "delivered":
        return "Danh sách đơn hàng đã giao";
      default:
        return "Danh sách đơn hàng";
    }
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>{routeNames[routes.delivery.root]} | {siteConfig.name}</title>
      </Helmet>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {getStatusText()}
        </h2>
        <div className="text-gray-500">
          Nội dung sẽ được hiển thị dựa trên trạng thái được chọn từ header
        </div>
      </div>
    </div>
  );
}