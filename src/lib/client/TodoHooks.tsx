'use client'

import {useMutation} from "react-query";
import {toast} from "sonner";
import {createTodoForm} from "@/components/forms/TodoForm";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useCreateTodo = () => {
    const createCreateTodoRequest = async (formData: createTodoForm) => {

        const response = await fetch(API_BASE_URL + '/todos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error();
        }

        return await response.json();

    }

    const mutation = useMutation({
        mutationFn: createCreateTodoRequest,
        onSuccess: () => {
            toast.success("Successfully created todo!");
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const create = (data : createTodoForm) => {
        mutation.mutate(data);
    }


    return {
        createTodo : create,
        isLoading: mutation.isLoading
    }

}

export const useUpdateTodo = () => {
    const createUpdateTodoRequest = async (formData: createTodoForm & {_id : string}) => {

        const response = await fetch(API_BASE_URL + '/dashboard/todos/' + formData._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok){
            throw new Error();
        }

        return await response.json();

    }

    const mutation = useMutation({
        mutationFn: createUpdateTodoRequest,
        onSuccess: () => {
            toast.success("Successfully updated todo!");
        },
        onError: () => {
            toast.error("Something went wrong, please try again")
        }
    });

    const update = (data : createTodoForm & {_id : string}) => {
        mutation.mutate(data);
    }

    return {
        updateTodo : update,
        isLoading : mutation.isLoading
    }

}
