import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";

export function InvitationFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("status") || "all";

  const handleFilterChange = (status) => {
    searchParams.set("status", status);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };
  return (
    <>
      {" "}
      <div className="flex gap-2 flex-wrap">
        {["all", "pending", "accepted", "rejected"].map((status) => (
          <Button
            key={status}
            onClick={() => handleFilterChange(status)}
            variant={currentFilter === status ? "primary" : "outline"}
            size="sm"
            className="!rounded-full uppercase tracking-wider text-xs"
          >
            {status}
          </Button>
        ))}
      </div>
    </>
  );
}
