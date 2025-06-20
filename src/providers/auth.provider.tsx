import { fetchUserProfileAtom, tokenAtom, updateTokenAtom, userAtom } from "@/atoms";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const token = useAtomValue(tokenAtom);
  const fetchUserProfile = useSetAtom(fetchUserProfileAtom);
  const updateToken = useSetAtom(updateTokenAtom)
  const setUser = useSetAtom(userAtom)

  useEffect(() => {
    if (token) fetchUserProfile();
    else setUser(null)
  }, [token, fetchUserProfile, setUser]);

  useEffect(() => {
    const logout = () => {
      updateToken("")
      setUser(null)
    }
    window.addEventListener("storage", logout)
    return () => window.removeEventListener("storage", logout)
  }, [updateToken, setUser])

  return <>{children}</>
}
