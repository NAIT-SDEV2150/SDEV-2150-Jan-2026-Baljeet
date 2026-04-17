import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchResources, createResource } from "../src/api/resources"
import { useState } from "react"

function Demo() {
    const queryClient = useQueryClient()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [location, setLocation] = useState("")

    // Fetch resources
    const { data: resources, isLoading } = useQuery({
        queryFn: fetchResources,
        queryKey: ["recources"]
    });

    // Mutation to create resource

    const mutation = useMutation({
        mutationFn: createResource,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["resources"] })
        }
    })



    if (isLoading) {
        return <div> Loading.....</div>
    }
    // Submit handler

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        const payload = {
            id: data.id,  // or generate one
            title: data.title,
            category: data.category,
            summary: data.summary,
            location: data.location,
            hours: data.hours,
            contact: data.contact,
            virtual: data.virtual === "true",
            openNow: data.openNow === "true"
        }

        mutation.mutate(payload)

        e.target.reset()
    }
    return (
        <>
            <h1> Demo Component</h1>
            {/* Create Resource Form */}
            <h2>Add Resource</h2>

            <form onSubmit={handleSubmit}>

                <input name="id" placeholder="ID (e.g. tutoring2)" />
                <input name="title" placeholder="Title" />
                <input name="category" placeholder="Category" />
                <input name="summary" placeholder="Summary" />
                <input name="location" placeholder="Location" />
                <input name="hours" placeholder="Hours" />
                <input name="contact" placeholder="Contact" />

                <select name="virtual">
                    <option value="false">In-person</option>
                    <option value="true">Virtual</option>
                </select>

                <select name="openNow">
                    <option value="true">Open</option>
                    <option value="false">Closed</option>
                </select>

                <button type="submit">Add Resource</button>

            </form>

            <hr />

            {/* Resource List */}
            <div>
                <h2>Results</h2>

                <ul>
                    {resources?.map((r) => (
                        <li key={r.id}>
                            <p><strong>{r.title}</strong></p>
                            <p>{r.category}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default Demo