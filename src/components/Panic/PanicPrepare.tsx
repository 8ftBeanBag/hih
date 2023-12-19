import prepareImage from '@/assets/panic - prepare.svg'
import { H1 } from '@/components/Text/Headings.tsx'
import ResourceTable from '@/components/Resources/ResourceTable.tsx'

export const PanicPrepare = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <img src={prepareImage} alt="Prevention" className="w-1/2" />
            <H1 title="Preparation" />
            <span className="mb-6 text-center">
                Here are a few resources for you if you're feeling not-so-safe
                and need to talk to someone immediately
            </span>
            <ResourceTable />
        </div>
    )
}
