/* eslint-disable @next/next/no-img-element */
"use client";
import { useRouter } from "next/navigation";
import { deletePersona } from "../services/personaService";
import { toast } from "react-toastify";

interface Persona {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

interface PersonaCardProps {
  persona: Persona;
  onChange: () => void;
}

export default function PersonasCard({ persona, onChange }: PersonaCardProps) {
  const router = useRouter();

  const del = async () => {
    try {
      await deletePersona(persona.id);
      toast.success("Persona deleted");
      onChange();
    } catch (error) {
      toast.error("Failed to delete persona");
      console.error("Delete persona failed:", error);
    }
  };

  const handleOpenModalDeletePersona = (itemIndex: string) => {
    console.log("Open modal for item:", itemIndex);
    const modal = document.getElementById(
      "my_modal_1"
    ) as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <div className="flex gap-3">
          {/* <div className="w-16 h-16 bg-white/10 rounded-full shrink-0" /> */}
          {persona.imageUrl ? (
            <img
              src={persona.imageUrl}
              alt={persona.name}
              width={64}
              height={64}
              className="w-16 h-16 bg-white/10 rounded-full shrink-0"
            />
          ) : (
            <div className="w-16 h-16 flex items-center justify-center text-xs text-white/60">
              No image
            </div>
          )}
          <div className="flex-1">
            <div className="font-semibold">{persona.name}</div>
            <div className="text-white/70 text-sm">
              {persona.description || "—"}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                // onClick={() => router.push(`/Persona/${persona.id}`)}
                onClick={() => router.push(`/Persona?id=${persona.id}`)}
                className="btn  bg-emerald-500 text-white border-0 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => router.push(`/Update?Persona=${persona.id}`)}
                className="btn bg-indigo-500 text-white border-0 px-3 py-1 rounded"
              >
                Update JSON
              </button>
              <button
                // onClick={del}
                onClick={() => handleOpenModalDeletePersona(persona.id)}
                className="btn bg-red-500 text-white border-0 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle ">
        <form
          method="dialog"
          className="modal-box bg-black/80 border border-white/10 no-caret"
        >
          <h1 className="font-bold text-lg">Delete this persona?</h1>
          <p className="py-4">Are you sure you want to delete this persona?</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn  rounded">Close</button>
            <button onClick={del} className="btn btn-error  rounded">
              Delete
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
