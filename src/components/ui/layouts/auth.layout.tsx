import { motion } from "framer-motion";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/50 to-teal-50/30 dark:from-green-950/60 dark:via-emerald-950/40 dark:to-teal-950/30 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.05),transparent_40%)]" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full filter blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/20 to-cyan-300/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Outlet />
      </motion.div>
    </div>
  )
}