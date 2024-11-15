import api from ".";

export const login = async (mail: string, password: string) => {
  const response = await api.post("/auth/login", {
    mail,
    password,
  });

  localStorage.setItem("token", response.data.token);

  return response.data;
};
