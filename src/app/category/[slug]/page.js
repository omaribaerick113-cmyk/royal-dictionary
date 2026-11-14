import { notFound } from 'next/navigation';
import { getVisibleCategories, getCategoryBySlug, getProductsByCategory, getAllCategories } from '@/lib/content';
import ProductBrowser from '@/components/ProductBrowser';

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

const SEO_TITLES = {
  mabati: 'Mabati & Iron Sheets in Kenya | Royal Group',
  'water-tanks': 'Water Tanks in Kenya | Royal Group',
  steel: 'Steel & Construction Materials in Kenya | Royal Group',
};

export function generateMetadata({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: SEO_TITLES[category.slug] || `${category.name} | Royal Group`,
    description: category.description,
  };
}

export default function CategoryPage({ params }) {
  const category = getCategoryBySlug(params.slug);
  if (!category || category.visible === false) notFound();

  const products = getProductsByCategory(category.slug);
  const categories = getVisibleCategories();

  return (
    <div>
      <div className="relative overflow-hidden bg-ink-950 text-white">
        <img src={category.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="container-x relative py-16">
          <h1 className="font-display text-3xl uppercase sm:text-4xl">{category.name}</h1>
          <p className="mt-3 max-w-2xl text-steel-300">{category.description}</p>
        </div>
      </div>
      <div className="container-x py-12">
        <ProductBrowser products={products} categories={categories} lockedCategory={category.slug} />
      </div>
    </div>
  );
}
