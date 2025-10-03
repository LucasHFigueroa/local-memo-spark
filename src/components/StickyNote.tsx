import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const StickyNote = ({ note, onDelete }) => {
  const colorClasses = {
    yellow: "bg-[hsl(var(--note-yellow))]",
    pink: "bg-[hsl(var(--note-pink))]",
    blue: "bg-[hsl(var(--note-blue))]",
    green: "bg-[hsl(var(--note-green))]",
    orange: "bg-[hsl(var(--note-orange))]",
  };

  return (
    <div
      className={`${colorClasses[note.color] || colorClasses.yellow} rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group animate-in fade-in zoom-in duration-300`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(note.id)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/10"
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </Button>
      
      <h3 className="font-bold text-lg mb-3 text-foreground pr-8 break-words">
        {note.title || "Sin título"}
      </h3>
      
      <p className="text-sm text-foreground/80 whitespace-pre-wrap break-words">
        {note.content}
      </p>
      
      <div className="mt-4 text-xs text-foreground/50">
        {new Date(note.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default StickyNote;
