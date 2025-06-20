import { updateTokenAtom, userAtom } from "@/atoms";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/config";
import { CredentialForm, credentialSchema } from "@/data/schemas";
import { AuthAPI } from "@/services/v1";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";

import { AxiosError } from "axios";
import { motion } from 'framer-motion';
import { useSetAtom } from "jotai";
import { Eye, EyeOff, Lock, Shield, Truck, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate()
  const updateToken = useSetAtom(updateTokenAtom)
  const setUser = useSetAtom(userAtom)
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CredentialForm>({
    resolver: zodResolver(credentialSchema),
    defaultValues: {
      account: import.meta.env.DEV ? "deliver" : "",
      password: import.meta.env.DEV ? "Deliver@123" : "",
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: AuthAPI.CredentailLogin,
    onSuccess: (data) => {
      toast.success("Đăng nhập thành công", {
        description: "Chào mừng bạn đến với hệ thống giao hàng",
      });
      updateToken(data.accessToken)
      setUser(data.user)
      navigate(routes.delivery.root)
    },
    onError: (error: AxiosError) => {
      const errorMessage = (error.response?.data as { message?: string })?.message || "Đăng nhập thất bại";
      toast.error(errorMessage);
    }
  })

  const onSubmit = async (data: CredentialForm) => {
    login(data);
  }

  return (
    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl overflow-hidden">
      <CardHeader className="text-center pb-6 pt-10 px-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5, type: "spring", stiffness: 200 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Truck className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <Shield className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-3">
            Hệ thống giao hàng
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Đăng nhập để quản lý đơn hàng và theo dõi giao hàng của bạn
          </CardDescription>
        </motion.div>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name="account"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tài khoản
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-500" />
                        <Input
                          {...field}
                          placeholder="Nhập tài khoản của bạn"
                          tabIndex={1}
                          className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl pl-12 pr-4 py-3 text-sm transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-emerald-500" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu của bạn"
                          tabIndex={2}
                          className="bg-gray-50/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 focus:border-emerald-400 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl pl-12 pr-12 py-3 text-sm transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors duration-200"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="pt-2"
            >
              <Button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:via-green-700 hover:to-teal-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isPending ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Đang đăng nhập...</span>
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
            </motion.div>
          </form>
        </Form>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Hệ thống được bảo mật với công nghệ mã hóa tiên tiến
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default LoginPage; 