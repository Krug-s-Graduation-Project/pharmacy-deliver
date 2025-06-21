import { ChangeStatusOrderDto } from "@/data/dto";
import { Order, OrderDelivery } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet, apiPost } from "@/services/api";

export const DeliveryAPI = {
  async GetOrderList() {
    const res = await apiGet<SRO<OrderDelivery[]>>("v1/store/deliver/orders");
    return res.data.data;
  },

  async ChangeStatusOrder(orderId: string, status: ChangeStatusOrderDto) {
    const res = await apiPost<ChangeStatusOrderDto, SRO<Order>>(`v1/store/deliver/orders/${orderId}/update-status`, status);
    return res.data.data;
  }
};
