import { CreateSearch } from "~/components/(app)/CreateSearch";
import { Searches } from "~/components/(app)/Searches";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <CreateSearch />
      <Searches />
    </div>
  );
}
