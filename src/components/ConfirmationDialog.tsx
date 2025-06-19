import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface ConfirmationDialogPropType {
  children: React.ReactNode;
  distructive?: boolean;
  description: string;
  action: string;
  handlerFunction: () => void;
}

export default function ConfirmationDialog({
  children,
  distructive,
  description,
  action,
  handlerFunction,
}: ConfirmationDialogPropType) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={distructive ? "destructive" : "secondary"}>
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => {
                handlerFunction();
              }}
              variant={distructive ? "destructive" : "default"}
            >
              {action}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
