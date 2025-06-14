import Lottie from "lottie-react"
import loading from "../../assets/images/loading.json"

export default function LoadingState() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center py-12 text-gray-700">
            <div className="w-64 h-64 mb-4">
                <Lottie animationData={loading} loop autoPlay />
            </div>
        </div>
    )
}
