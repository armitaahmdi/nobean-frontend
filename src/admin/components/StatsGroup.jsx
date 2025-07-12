import StatCard from "../components/StatCard";
import { iconsMap, colorsMap } from "../config/statSections";

export default function StatsGroup({ items, statsMap }) {
    return (
        <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map(({ key, title, link }) => {
                    const count = statsMap[key];
                    if (count === undefined) return null;
                    return (
                        <StatCard
                            key={key}
                            title={title}
                            count={count}
                            link={link}
                            icon={iconsMap[key]}
                            color={colorsMap[key]}
                        />
                    );
                })}
            </div>
        </section>
    );
}
