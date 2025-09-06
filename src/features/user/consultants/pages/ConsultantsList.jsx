import ConsultantCard from "../components/ConsultantCard";

export default function ConsultantsList({consultants}) {

    return (
        <div className=" rounded-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {consultants.map((consultant) => (
                <ConsultantCard key={consultant.id} consultant={consultant} />
            ))}
        </div>
    );
}
