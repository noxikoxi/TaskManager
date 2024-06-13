'use client'

import {useMutation, useQuery, useQueryClient} from "react-query";
import {toast} from "sonner";
import {Dashboard, dashboardForm, noteForm} from "@/lib/types";
import {getSession} from "@auth0/nextjs-auth0";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useGetDashboard = (id: string) => {

    const createGetDashboardRequest = async (id: string) => {

        const response = await fetch(API_BASE_URL + "/dashboard/one/" + id, {
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

    const {data : dashboard, isLoading, error} = useQuery(
        ["fetchCurrentDashboard", id],
        () => createGetDashboardRequest(id)
    );

    if(error){
        toast.error("Something went wrong, please try again: " + error.toString());
    }

    return {
        dashboard,
        isLoading,
        error
    }
}

export const useGetDashboards = () => {
    const createGetDashboardsRequest = async () => {

        const response = await fetch(API_BASE_URL + "/dashboard/", {
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

    const {data, error, isLoading} = useQuery(
        ["fetchCurrentDashboard", ],
        () => createGetDashboardsRequest()
    );

    if(error){
        toast.error("Something went wrong, please try again: " + error.toString());
    }

    const dashboards : (Dashboard & {_id: string})[] | undefined = data;


    return {
        dashboards,
        isLoading
    }
}

const  createUpdateDashboardRequest = async (
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

    const response = await fetch(API_BASE_URL + "/dashboard/one/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error("Failed to update Dashboard: " + await response.text());
    }

    return await response.json();

}

export const useUpdateDashboard = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUpdateDashboardRequest,
        onSuccess: () => {
            toast.success("Successfully updated note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again: ");
        },
    });

    const updateDash = ({id, name, description} : dashboardForm & {id: string}) => {
        mutation.mutate({
            id,
            name,
            description
        })
    }

    const isLoading = mutation.isLoading;

    return {
        updateDashboard : updateDash,
        isLoading
    }
}

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUpdateDashboardRequest,
        onSuccess: () => {
            toast.success("Successfully created note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
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
        mutationFn: createUpdateDashboardRequest,
        onSuccess: () => {
            toast.success("Successfully updated note!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
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

export const useCreateDashboard = () => {
    const queryClient = useQueryClient();

    const createCreateDashboardRequest = async (formData: dashboardForm) => {
        const dashboard: Dashboard = {
            createdAt: new Date(),
            name: formData.name,
            description: formData.description,
            userId: "", // will be fetched at server api
            notes: []
        }

        const response = await fetch(API_BASE_URL + '/dashboard', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dashboard)
        })

        if(!response.ok){
            throw new Error();
        }

        return await response.json();

    }


    const mutation = useMutation({
        mutationFn: createCreateDashboardRequest,
        onSuccess: () => {
            toast.success("Successfully created dashboard!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const createDash = (data : dashboardForm) => {
        mutation.mutate(data);
    }

    const isLoading = mutation.isLoading;

    return {
        createDashboard : createDash,
        isLoading
    }

}

export const useDeleteDashboard = () => {
    const queryClient = useQueryClient();

    const createDeleteDashboardRequest = async (id: string) => {
        const response = await fetch(API_BASE_URL + "/dashboard/one/" + id, {
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
        mutationFn: createDeleteDashboardRequest,
        onSuccess: () => {
            toast.success("Successfully deleted dashboard!");
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const isLoading = mutation.isLoading;

    const deleteDash = (id: string) => {
        mutation.mutate(id);
    }

    return {
        deleteDashboard: deleteDash,
        isLoading
    }
}

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const createDeleteNoteRequest = async ({dashboardId, noteId}: {dashboardId: string, noteId: string}) => {
        const response = await fetch(API_BASE_URL + "/dashboard/one/" + dashboardId + "/" + noteId, {
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
            queryClient.invalidateQueries('fetchCurrentDashboard');
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const isLoading = mutation.isLoading;

    const _deleteNote = ({dashboardId, noteId}: {dashboardId: string, noteId: string}) => {
        mutation.mutate({dashboardId, noteId});
    }

    return {
        deleteNote: _deleteNote,
        isLoading
    }
}



