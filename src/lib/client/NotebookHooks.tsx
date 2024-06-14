'use client'

import {useMutation, useQuery, useQueryClient} from "react-query";
import {toast} from "sonner";
import {Notebook, NotebookForm, noteForm} from "@/lib/types";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useGetNotebook = (id: string) => {

    const createGetNotebookRequest = async (id: string) => {

        const response = await fetch(API_BASE_URL + "/dashboard/notebook/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error();
        }

        return response.json();

    }

    const {data : notebook, isLoading, error} = useQuery(
        ["fetchCurrentNotebook", id],
        () => createGetNotebookRequest(id)
    );

    if(error){
        toast.error("Something went wrong, please try again: ");
    }

    return {
        notebook,
        isLoading,
        error
    }
}

export const useGetNotebooks = () => {
    const createGetNotebooksRequest = async () => {

        const response = await fetch(API_BASE_URL + "/dashboard/notebook", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(response);

        if(!response.ok){
            throw new Error();
        }

        return response.json();

    }



    const {data, error, isLoading} = useQuery(
        ["fetchNotebooks"],
        () => createGetNotebooksRequest()
    );


    if(error){
        toast.error("Something went wrong, please try again: " + error.toString());
    }

    const notebooks : (Notebook & {_id: string})[] | undefined = data;


    return {
        notebooks,
        isLoading
    }
}

const  createUpdateNotebookRequest = async (
    {name, description, id, noteTitle, noteContent, noteId} : {
        name?: string,
        description?: string,
        id: string,
        noteTitle?: string,
        noteContent? : string
        noteId? : string
    }) => {
    let data = {
        name,
        description,
        note: {
            title: noteTitle,
            content: noteContent
        }
    }
    if(noteId){
        data = Object.assign(data, {
            note : {
                title: noteTitle,
                content: noteContent,
                _id: noteId
            }
        })
    }

    const response = await fetch(API_BASE_URL + "/dashboard/notebook/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error("Failed to update notbook: ");
    }

    return await response.json();

}

export const useUpdateNotebook = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUpdateNotebookRequest,
        onSuccess: () => {
            toast.success("Successfully updated note!");
            queryClient.invalidateQueries('fetchCurrentNotebook');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const update = ({id, name, description} : NotebookForm & {id: string}) => {
        mutation.mutate({
            id,
            name,
            description
        })
    }

    const isLoading = mutation.isLoading;

    return {
        updateNotebook : update,
        isLoading
    }
}

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUpdateNotebookRequest,
        onSuccess: () => {
            toast.success("Successfully created note!");
            queryClient.invalidateQueries('fetchCurrentNotebook');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const createNote = (data: noteForm & {id: string}) => {
        mutation.mutate({
            id : data.id,
            noteTitle: data.title,
            noteContent: data.content
        })
    }

    const isLoading = mutation.isLoading;

    return {
        createNote,
        isLoading
    }
}

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUpdateNotebookRequest,
        onSuccess: () => {
            toast.success("Successfully updated note!");
            queryClient.invalidateQueries('fetchCurrentNotebook');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const updateNote = (data: noteForm & {id: string, noteId?: string}) => {
        mutation.mutate({
            id : data.id,
            noteTitle: data.title,
            noteContent: data.content,
            noteId: data.noteId
        })
    }

    const isLoading = mutation.isLoading;

    return {
        updateNote,
        isLoading
    }
}

export const useCreateNotebook = () => {
    const queryClient = useQueryClient();

    const createCreateNotebookRequest = async (formData: NotebookForm) => {
        const notebook: Notebook = {
            createdAt: new Date(),
            name: formData.name,
            description: formData.description,
            userId: "", // will be fetched at server api
            notes: []
        }

        const response = await fetch(API_BASE_URL + '/dashboard/notebook', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(notebook)
        })

        if(!response.ok){
            throw new Error();
        }

        return await response.json();

    }


    const mutation = useMutation({
        mutationFn: createCreateNotebookRequest,
        onSuccess: () => {
            toast.success("Successfully created notebook!");
            queryClient.invalidateQueries('fetchNotebooks');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const create = (data : NotebookForm) => {
        mutation.mutate(data);
    }

    const isLoading = mutation.isLoading;

    return {
        createNotebook : create,
        isLoading
    }

}

export const useDeleteNotebook = () => {
    const queryClient = useQueryClient();

    const createDeleteNotebookRequest = async (id: string) => {
        const response = await fetch(API_BASE_URL + "/dashboard/notebook/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error();
        }

        return response.status == 200;
    }

    const mutation = useMutation({
        mutationFn: createDeleteNotebookRequest,
        onSuccess: () => {
            toast.success("Successfully deleted notebook!");
            queryClient.invalidateQueries('fetchNotebooks');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const isLoading = mutation.isLoading;

    const deleteNtbook = (id: string) => {
        mutation.mutate(id);
    }

    return {
        deleteNotebook: deleteNtbook,
        isLoading
    }
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const createDeleteNoteRequest = async ({notebookId, noteId}: {notebookId: string, noteId: string}) => {
        const response = await fetch(API_BASE_URL + "/dashboard/notebook/" + notebookId + "/" + noteId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error();
        }

        return response.status == 200;
    }

    const mutation = useMutation({
        mutationFn: createDeleteNoteRequest,
        onSuccess: () => {
            toast.success("Successfully deleted note!");
            queryClient.invalidateQueries('fetchCurrentNotebook');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const isLoading = mutation.isLoading;

    const _deleteNote = ({notebookId, noteId}: {notebookId: string, noteId: string}) => {
        mutation.mutate({notebookId, noteId});
    }

    return {
        deleteNote: _deleteNote,
        isLoading
    }
}



