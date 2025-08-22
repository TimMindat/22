export type Article = {
  id: string;
  title: string;
  imageUrl?: string;
};

export type Collection = {
  slug: string;
  title: string;
  imageUrl: string;
  articles: Article[];
};

const placeholderImage = "/imgS.png";

const makeArticles = (count: number, prefix: string): Article[] =>
  Array.from({ length: count }).map((_, idx) => ({
    id: `${prefix}-${idx + 1}`,
    title: `${prefix} Article ${idx + 1}`,
    imageUrl: placeholderImage,
  }));

export const collections: Collection[] = [
  { slug: "bones", title: "Bones", imageUrl: placeholderImage, articles: makeArticles(12, "Bones") },
  { slug: "waves", title: "Waves", imageUrl: placeholderImage, articles: makeArticles(10, "Waves") },
  { slug: "shells", title: "Shells", imageUrl: placeholderImage, articles: makeArticles(14, "Shells") },
  { slug: "tide-maps", title: "Tide Maps", imageUrl: placeholderImage, articles: makeArticles(9, "Tide Maps") },
  { slug: "harbours", title: "Harbours", imageUrl: placeholderImage, articles: makeArticles(11, "Harbours") },
  { slug: "compass", title: "Compass", imageUrl: placeholderImage, articles: makeArticles(8, "Compass") },
  { slug: "azure", title: "Azure", imageUrl: placeholderImage, articles: makeArticles(16, "Azure") },
  { slug: "coast", title: "Coast", imageUrl: placeholderImage, articles: makeArticles(13, "Coast") },
  { slug: "salt", title: "Salt", imageUrl: placeholderImage, articles: makeArticles(7, "Salt") },
  { slug: "stone", title: "Stone", imageUrl: placeholderImage, articles: makeArticles(12, "Stone") },
  { slug: "signals", title: "Signals", imageUrl: placeholderImage, articles: makeArticles(6, "Signals") },
  { slug: "currents", title: "Currents", imageUrl: placeholderImage, articles: makeArticles(10, "Currents") },
];

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);


