import toast from "react-hot-toast";

export function showSuccessToast(
  message = "Success"
) {
  toast.success(message);
}