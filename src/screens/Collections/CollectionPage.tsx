import { Link, useParams } from "react-router-dom";
import { getCollectionBySlug } from "../../data/collections";
import HexagonalCard from "../../components/ui/HexagonalCard";

export default function CollectionPage(): JSX.Element {
  const { slug } = useParams();
  const collection = slug ? getCollectionBySlug(slug) : undefined;

  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] via-[#111111] to-[#0B0B0B] text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Collection not found</h1>
          <Link to="/home2" className="text-[#D4A05B] hover:underline">Go back</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0D0D0D] via-[#111111] to-[#0B0B0B] text-white">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{collection.title}</h1>
            <p className="text-[#CCCCCC]">{collection.articles.length} articles</p>
          </div>
          <Link to="/home2" className="text-[#D4A05B] hover:underline">Back to Home</Link>
        </div>

        {/* Responsive grid of article hexagons */}
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {collection.articles.map((a) => (
            <HexagonalCard
              key={a.id}
              backgroundImage={a.imageUrl || collection.imageUrl}
              title={a.title}
              variant="hero"
              borderStyle="gold"
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


