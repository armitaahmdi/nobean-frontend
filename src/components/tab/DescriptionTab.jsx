import translate from "../../locale/translate";

export default function DescriptionTab({ description, video }) {
    return (
        <div className="flex items-start flex-col md:justify-end md:flex-row-reverse gap-10 bg-white rounded-[20px] p-6 shadow-md">
            <div className="md:w-1/2 space-y-4">
                <h3 className="text-lg font-bold text-darkBlue">{translate.testexplnation}</h3>
                <p className="text-gray-700 leading-loose text-sm text-justify">
                    {description}
                </p>
            </div>

            {video && (
                <div className="w-full md:w-auto md:max-w-xs">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                        <video controls className="w-full h-auto" src={video}>
                            {translate.unsupportedvideo}
                        </video>
                    </div>
                </div>
            )}
        </div>

    );
}

