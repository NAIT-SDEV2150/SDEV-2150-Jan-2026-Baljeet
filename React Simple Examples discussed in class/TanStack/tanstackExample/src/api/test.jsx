import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchResources, createResource } from "../src/api/resources"
import { useState } from "react"

function Demo() {

    const queryClient = useQueryClient()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")

    // Fetch resources
    const { data: resources, isLoading, error } = useQuery({
        queryKey: ["resources"],
        queryFn: fetchResources
    })

    // Mutation to create resource
    const mutation = useMutation({
        mutationFn: createResource,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resources"] })
        }
    })

    // Submit handler
    const handleSubmit = (e) => {
        e.preventDefault()

        mutation.mutate({
            title: title,
            category: category,
            location: location
        })

        setTitle("")
        setCategory("")
        setLocation("")
    }

    if (isLoading) return <div>Loading...</div>

    if (error) return <div>Error loading resources</div>

    return (
        <>
            <h1>Resource Demo</h1>

            {/* Create Resource Form */}
            <h2>Add Resource</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <button type="submit">
                    Add Resource
                </button>

                {mutation.isPending && <p>Saving resource...</p>}
            </form>

            <hr />

            {/* Resource List */}
            <h2>Resources</h2>

            <ul>
                {resources?.map((r) => (
                    <li key={r.id}>
                        <strong>{r.title}</strong> | {r.category} | {r.location}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Demo