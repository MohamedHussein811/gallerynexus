import { toast } from "sonner"
 
 
export function Sonner() {
  return (
    <button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
      className="z-50 hover:bg-red-500"
    >
      Show Toast
    </button>
  )
}