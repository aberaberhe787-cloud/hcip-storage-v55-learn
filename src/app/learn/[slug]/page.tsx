import { getConceptBySlug, concepts } from "@/data/concepts";
import ConceptDetail from "@/components/ConceptDetail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return concepts.map((c) => ({ slug: c.slug }));
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const concept = getConceptBySlug(slug);
  if (!concept) notFound();
  return (
    <div className="px-4 py-10">
      <ConceptDetail concept={concept} />
    </div>
  );
}
