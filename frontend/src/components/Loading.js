import { Spinner } from "flowbite-react";

const Loading = () => {
  return (
    <div className="text-center h-screen ">
      <Spinner
        aria-label="Center-aligned spinner Extra large spinner"
        size="xl"
      />
    </div>
  );
};

export default Loading;
