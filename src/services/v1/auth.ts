import { CredentialLoginDto } from "@/data/dto";
import { CredentialLoginResponse, User } from "@/data/interfaces";
import { SRO } from "@/data/sro";
import { apiGet, apiPost } from "@/services/api";

export const AuthAPI = {
  async CredentailLogin(credentail: CredentialLoginDto) {
    const res = await apiPost<CredentialLoginDto, SRO<CredentialLoginResponse>>("/v1/auth/credentials", credentail);
    return res.data.data;
  },

  async fetchUserInfo() {
    const res = await apiGet<SRO<User>>("/v1/auth/me");
    return res.data.data;
  }
};
