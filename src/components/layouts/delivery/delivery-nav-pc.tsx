import { routes } from "@/config";
import { motion } from 'framer-motion';
import { Truck } from "lucide-react";
import { Link } from "react-router-dom";

export function DeliveryNavPC() {
  return (
    <div className="hidden md:flex items-center gap-2">
      {/* Logo Area */}
      <Link to={routes.delivery.root}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Quản lý giao hàng
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Theo dõi và quản lý đơn hàng
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}