import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../../api/api";
import { useAuthStore } from "./auth.store";
import { useNavigateContext } from "../../context/navigateContext";

export const useLogin = () => {
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigateContext();

    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            console.log(data)
            setAuth({ user: data.employee, token: data.token, role: data.employee.roles});
            navigate("/");
        },
    });
};

export const useRegister = () => {
    const setAuth = useAuthStore((s) => s.setAuth);
    return useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            setAuth({ user: data.employee, token: data.token });
        },
    });
};
