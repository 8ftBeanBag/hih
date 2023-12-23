import { IResource } from '@/types'
import { Card } from './Card'
import CardShadow from './CardShadow'
import client from '@/database/client'

type TUnapprovedCard = {
    resource: IResource
}

export default function UnaprovedCard({ resource }: TUnapprovedCard) {
    const approve = async (row: IResource) => {
        await client
            .from('resources')
            .update({ in_review: false })
            .eq('id', row.id)
    }
    return (
        <div className="">
            <CardShadow>
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="w-full">
                        <Card resource={resource} />
                    </div>
                    <div className="flex justify-center gap-2 md:flex-col">
                        <button
                            onClick={async () => await approve(resource)}
                            className="w-24 rounded bg-orange-500 px-4 py-2 text-white md:block md:w-48"
                        >
                            Approve
                        </button>
                        <button className="w-24 rounded bg-orange-700 px-4 py-2 text-white md:block md:w-48">
                            Edit
                        </button>
                        <button className="w-24 rounded bg-orange-950 px-4 py-2 text-white md:block md:w-48">
                            Delete
                        </button>
                    </div>
                </div>
            </CardShadow>
        </div>
    )
}
