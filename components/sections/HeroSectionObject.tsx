'use client';

export default function HeroSectionObject({ data }: any) {
  return (
    <div className="bg-gray-800 py-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-4">{data.title || 'Hero Section'}</h1>
        <p className="text-white/60">Hero component - To be fully implemented</p>
      </div>
    </div>
  );
}
