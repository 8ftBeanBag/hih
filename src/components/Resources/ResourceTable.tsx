import { useEffect, useState } from 'react'
import { QueryData } from '@supabase/supabase-js'
import client from '@/database/client.tsx'
import TagSection from '@/components/TagSection.tsx'
import { FaHeart, FaSun } from 'react-icons/fa'
import { Tooltip } from 'flowbite-react'
import SessionWrapper from '../Auth/SessionWrapper'

export default function ResourceTable() {
    const resourcesQuery = client.from('resources').select()
    type ResourcesType = QueryData<typeof resourcesQuery>

    const [data, setData] = useState<ResourcesType>([])
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await resourcesQuery
            if (error) throw error
            const resources: ResourcesType = data
            setData(resources)
        }
        fetchData()

        // Listen for updates
        client
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'resources' },
                (payload) => {
                    data.splice(
                        data.map((o) => o.id).indexOf(payload.new.id),
                        1,
                        payload.new
                    )
                    setData(data.sort((a, b) => a.num_helped - b.num_helped))
                }
            )
            .subscribe()
    }, [])

    const favorite = async (id: number, count: number) => {
        await client
            .from('resources')
            .update({ num_helped: count + 1 })
            .eq('id', id)
    }

    return (
        <table className="w-full bg-white rounded-lg">
            <thead className="border-solid border-0 border-b-8 border-orange-50 ">
                <tr>
                    <th className="text-left p-4">Resource</th>
                    <th className="text-left p-4">Description</th>
                    <th className="text-left p-4">Tags</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((d) => {
                    return (
                        <tr
                            className="border-orange-50 hover:bg-gray-100"
                            key={d.name}
                        >
                            <td className="p-4 w-96">
                                <a
                                    className="text-orange-900 hover:underline"
                                    href={d.link}
                                >
                                    {d.name}
                                </a>
                            </td>
                            <td className="p-4">{d.description}</td>
                            <td className="flex flex-wrap p-4 gap-1 w-48">
                                <TagSection resourceId={d.id} />
                            </td>
                            <td className="text-xs p-4 w-32">
                                <Tooltip
                                    content={
                                        d.num_helped
                                            ? `This resource has helped ${d.num_helped} people`
                                            : `New resource`
                                    }
                                    animation="duration-1000"
                                    className="bg-gray-900 text-white dark:bg-gray-700"
                                    arrow={false}
                                >
                                    <span
                                        data-tooltip-target="tooltip-default"
                                        className="text-xs font-bold flex justify-end text-right"
                                    >
                                        <span>
                                            {d.num_helped ? (
                                                `Helped ${d.num_helped}`
                                            ) : (
                                                <div className="flex items-center">
                                                    <FaSun className="ml-1 text-orange-500" />{' '}
                                                    New!
                                                </div>
                                            )}
                                        </span>
                                        <SessionWrapper
                                            ifSession={
                                                <button
                                                    onClick={() =>
                                                        favorite(
                                                            d.id,
                                                            d.num_helped
                                                        )
                                                    }
                                                >
                                                    <FaHeart className="ml-1 text-orange-500 " />
                                                </button>
                                            }
                                            notSession={<></>}
                                        />
                                    </span>
                                </Tooltip>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
