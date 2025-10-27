'use client';

interface SpacerSectionProps {
  data: {
    height?: string;
  };
}

const heightMap: Record<string, string> = {
  small: 'h-8 md:h-12',
  medium: 'h-16 md:h-24',
  large: 'h-24 md:h-32',
  xlarge: 'h-32 md:h-48',
};

export default function SpacerSection({ data }: SpacerSectionProps) {
  const heightClass = heightMap[data.height || 'medium'] || heightMap.medium;

  return <div className={heightClass} aria-hidden="true" />;
}
