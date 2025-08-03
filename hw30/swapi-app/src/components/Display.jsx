import { useSelector } from "react-redux";

function Display() {
  const { items, isLoading } = useSelector((state) => state.swapi)

  if (isLoading) return <div>Loading...</div>
  if (!items.length) return null
  return (
    <div className="card p-3">
        <div>{JSON.stringify(items)}</div>
    </div>
  );
}

export default Display;
