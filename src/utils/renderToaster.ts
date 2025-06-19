import { toast } from "sonner";

export default function renderToaster(title: string, description: string) {
  toast.success(title, {
    description,
  });
}
