import { Loader } from "@/components/ui/loader";

const Loading: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
