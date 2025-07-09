import TestCard from "../components/TestCard";

export default function TestsList({ tests }) {
  return (
    <div className="rounded-[20px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {tests.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </div>
  );
}
