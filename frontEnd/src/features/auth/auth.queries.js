import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "./auth.service";
import { useAuthStore } from "./auth.store";
import { useNavigateContext } from "../../context/navigateContext";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigateContext();

    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setAuth({ user: data.newEmployee, token: data.token });
            navigate("/");
        },
    });
};

export const useRegister = () => {
    const setAuth = useAuthStore((s) => s.setAuth);

    return useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            setAuth({ user: data.newEmployee, token: data.token });
        },
    });
};
