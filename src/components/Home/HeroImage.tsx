import { Link } from 'react-router-dom'
import mainImage from '../../assets/hero - before dawn.svg'

export const HeroImage = () => {
    return (
        <section className="flex w-full flex-col items-center justify-center bg-white bg-cover bg-no-repeat px-8 py-16 md:h-fit md:flex-row md:py-0">
            <div className="text-center">
                <h1 className="mb-4 text-center text-6xl text-gray-800 md:text-8xl">
                    Help is here.
                </h1>
                <Link
                    to="/resources"
                    className="mr-4 rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 md:px-8"
                >
                    Get Started
                </Link>
                <Link
                    to="/panic"
                    className="rounded-full bg-gray-200 px-6 py-2 text-gray-900 hover:bg-gray-300 md:px-8"
                >
                    Help me!
                </Link>
            </div>
            <img src={mainImage} alt="Main Image" className="md:w-1/2" />
        </section>
    )
}
