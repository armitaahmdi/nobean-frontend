import translate from "../../../locale/translate";

export default function LocationTab({ service }) {
    if (!service) {
        return <p className="text-gray-500">{translate.nolocationcontent}</p>;
    }

    if (service.service.location === "-") {
        return <p className="text-gray-500">این مشاور فقط به صورت آنلاین فعالیت دارد.</p>;
    }

    const hasMap = !!service.service.mapUrl;

    return (
        <div className="text-gray-800 text-sm md:text-base">
            <div
                className={`flex flex-col ${hasMap ? "md:flex-row md:gap-8" : ""} bg-white rounded-lg shadow-md p-6`}>
                <div className={`flex-1 ${hasMap ? "md:max-w-md" : ""} space-y-4`}>
                    <h3 className="text-xl font-semibold mb-2 text-darkBlue">{translate.clinicinfo}</h3>

                    <p>
                        <strong className="inline-block w-24">{translate.clinicaddress} : </strong>
                        <span className="text-gray-700">{service.service.address}</span>
                    </p>

                    {service.service.workHours && (
                        <p>
                            <strong className="inline-block w-24">{translate.workhours}</strong>
                            <span className="text-gray-700">{service.service.workHours}</span>
                        </p>
                    )}

                    {service.service.phone && (
                        <p>
                            <strong className="inline-block w-24"> {translate.clinicphone}:</strong>
                            <a
                                href={`tel:${service.service.phone}`}
                                className="text-darkBlue hover:underline"
                            >
                                {service.service.phone}
                            </a>
                        </p>
                    )}
                </div>

                {hasMap && (
                    <div className="flex-1 mt-6 md:mt-0 rounded-lg overflow-hidden shadow-lg h-64">
                        <iframe
                            src={service.service.mapUrl}
                            title="نقشه مطب"
                            className="w-full h-full border-0"
                            loading="lazy"
                            allowFullScreen=""
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
