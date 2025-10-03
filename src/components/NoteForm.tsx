import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState("yellow");

  const colors = [
    { name: "yellow", class: "bg-[hsl(var(--note-yellow))]" },
    { name: "pink", class: "bg-[hsl(var(--note-pink))]" },
    { name: "blue", class: "bg-[hsl(var(--note-blue))]" },
    { name: "green", class: "bg-[hsl(var(--note-green))]" },
    { name: "orange", class: "bg-[hsl(var(--note-orange))]" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim()) return;

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      color: selectedColor,
      createdAt: new Date().toISOString(),
    };

    onAddNote(newNote);
    setTitle("");
    setContent("");
    setSelectedColor("yellow");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Nueva Nota</h2>
      
      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Título (opcional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2"
        />
        
        <Textarea
          placeholder="Escribe tu nota aquí..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] border-2 resize-none"
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color.name)}
                className={`w-8 h-8 rounded-full ${color.class} border-2 ${
                  selectedColor === color.name
                    ? "border-primary scale-110"
                    : "border-border"
                } transition-all duration-200 hover:scale-110`}
                aria-label={`Color ${color.name}`}
              />
            ))}
          </div>

          <Button type="submit" size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            Agregar Nota
          </Button>
        </div>
      </div>
    </form>
  );
};

export default NoteForm;
