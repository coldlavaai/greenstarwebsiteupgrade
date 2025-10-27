'use client';

import { motion } from 'framer-motion';

interface VideoSectionProps {
  data: {
    title?: string;
    description?: string;
    videoType?: 'youtube' | 'vimeo' | 'direct';
    videoUrl?: string;
    layout?: 'full' | 'video-left' | 'video-right' | 'video-above' | 'text-above';
    aspectRatio?: '16-9' | '4-3' | '1-1' | '9-16';
    backgroundColor?: 'white' | 'light-gray' | 'dark';
    padding?: 'none' | 'small' | 'medium' | 'large';
  };
}

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  dark: 'bg-gray-900',
};

const paddingMap: Record<string, string> = {
  none: 'py-0',
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-32',
};

const aspectRatioMap: Record<string, string> = {
  '16-9': 'aspect-video',
  '4-3': 'aspect-[4/3]',
  '1-1': 'aspect-square',
  '9-16': 'aspect-[9/16]',
};

export default function VideoSection({ data }: VideoSectionProps) {
  const bgClass = bgColorMap[data.backgroundColor || 'white'];
  const paddingClass = paddingMap[data.padding || 'medium'];
  const aspectClass = aspectRatioMap[data.aspectRatio || '16-9'];
  const isDark = data.backgroundColor === 'dark';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-white/80' : 'text-gray-600';

  const getEmbedUrl = () => {
    if (!data.videoUrl) return '';

    if (data.videoType === 'youtube') {
      const videoId = data.videoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (data.videoType === 'vimeo') {
      const videoId = data.videoUrl.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return data.videoUrl;
  };

  const isFullLayout = data.layout === 'full';
  const isSideBySide = data.layout === 'video-left' || data.layout === 'video-right';

  return (
    <section className={`${bgClass} ${paddingClass}`}>
      <div className="container mx-auto px-4">
        <div className={isSideBySide ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center' : ''}>
          {/* Text Content */}
          {(data.title || data.description) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`${isFullLayout ? 'text-center max-w-3xl mx-auto mb-12' : ''} ${
                data.layout === 'video-right' ? 'lg:order-1' : ''
              } ${data.layout === 'text-above' ? 'mb-8' : ''}`}
            >
              {data.title && (
                <h2
                  className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${textColor}`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {data.title}
                </h2>
              )}
              {data.description && (
                <p className={`text-lg ${subtextColor} leading-relaxed`}>
                  {data.description}
                </p>
              )}
            </motion.div>
          )}

          {/* Video */}
          {data.videoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className={`${isFullLayout ? 'max-w-5xl mx-auto' : ''} ${
                data.layout === 'video-right' ? 'lg:order-2' : ''
              }`}
            >
              <div className={`${aspectClass} rounded-2xl overflow-hidden shadow-2xl`}>
                {data.videoType === 'direct' ? (
                  <video
                    src={data.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe
                    src={getEmbedUrl()}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
