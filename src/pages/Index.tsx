import { useState, useEffect } from "react";
import { StickyNote as StickyNoteIcon } from "lucide-react";
import NoteForm from "@/components/NoteForm";
import StickyNote from "@/components/StickyNote";
import { toast } from "sonner";

const Index = () => {
  const [notes, setNotes] = useState([]);

  // Cargar notas desde localStorage al montar el componente
  useEffect(() => {
    const savedNotes = localStorage.getItem("stickyNotes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (error) {
        console.error("Error al cargar las notas:", error);
        toast.error("Error al cargar las notas guardadas");
      }
    }
  }, []);

  // Guardar notas en localStorage cada vez que cambien
  useEffect(() => {
    if (notes.length >= 0) {
      localStorage.setItem("stickyNotes", JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = (newNote) => {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    toast.success("¡Nota creada exitosamente!");
  };

  const handleDeleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    toast.success("Nota eliminada");
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <StickyNoteIcon className="h-12 w-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">
              Mis Notas Adhesivas
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Crea y organiza tus notas de manera simple y colorida
          </p>
        </header>

        <div className="max-w-2xl mx-auto">
          <NoteForm onAddNote={handleAddNote} />
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-20">
            <StickyNoteIcon className="h-24 w-24 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              No tienes notas aún. ¡Crea tu primera nota arriba!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {notes.map((note) => (
              <StickyNote
                key={note.id}
                note={note}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
