"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, PlusIcon, EditIcon, TrashIcon } from "lucide-react";

interface Note {
  id: string;
  date: string;
  content: string;
  createdAt: Date;
}

export function CalendarWithNotes() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState("");

  const getDateString = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getNotesForDate = (date: Date) => {
    const dateString = getDateString(date);
    return notes.filter((note) => note.date === dateString);
  };

  const addNote = () => {
    if (!date || !noteContent.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      date: getDateString(date),
      content: noteContent.trim(),
      createdAt: new Date(),
    };

    setNotes([...notes, newNote]);
    setNoteContent("");
    setIsAddingNote(false);
  };

  const editNote = (noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (note) {
      setNoteContent(note.content);
      setEditingNoteId(noteId);
    }
  };

  const saveEditedNote = () => {
    if (!editingNoteId || !noteContent.trim()) return;

    setNotes(
      notes.map((note) =>
        note.id === editingNoteId
          ? { ...note, content: noteContent.trim() }
          : note
      )
    );
    setNoteContent("");
    setEditingNoteId(null);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const cancelEditing = () => {
    setNoteContent("");
    setIsAddingNote(false);
    setEditingNoteId(null);
  };

  const currentDateNotes = date ? getNotesForDate(date) : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Calendar</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Select dates and add notes to manage your schedule with our clean
            calendar interface.
          </p>
        </div>

        <div className="flex justify-center gap-8">
          <Card className="w-fit bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <CalendarIcon className="w-5 h-5" />
                {date
                  ? date.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border border-gray-200"
              />
            </CardContent>
          </Card>

          {date && (
            <Card className="w-96 bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-black">
                  <span>
                    {date.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {!isAddingNote && !editingNoteId && (
                    <Button
                      onClick={() => setIsAddingNote(true)}
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      <PlusIcon className="w-4 h-4 mr-1" />
                      Add Note
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(isAddingNote || editingNoteId) && (
                  <div className="space-y-3">
                    <Textarea
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Enter your note..."
                      className="min-h-[100px] border-gray-200"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={editingNoteId ? saveEditedNote : addNote}
                        size="sm"
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        {editingNoteId ? "Save" : "Add"}
                      </Button>
                      <Button
                        onClick={cancelEditing}
                        size="sm"
                        variant="outline"
                        className="border-gray-200 bg-transparent"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {currentDateNotes.length > 0 ? (
                  <div className="space-y-3">
                    {currentDateNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 border border-gray-200 rounded-md bg-gray-50"
                      >
                        <p className="text-gray-800 mb-2">{note.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {note.createdAt.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <div className="flex gap-1">
                            <Button
                              onClick={() => editNote(note.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                            >
                              <EditIcon className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => deleteNote(note.id)}
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-red-600 hover:text-red-800"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isAddingNote && !editingNoteId ? (
                  <p className="text-gray-500 text-center py-8">
                    No notes for this date
                  </p>
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
