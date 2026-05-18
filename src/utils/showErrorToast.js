import toast from "react-hot-toast";

export function showErrorToast(
  message =
    "Something went wrong"
) {
  toast.error(message);
}