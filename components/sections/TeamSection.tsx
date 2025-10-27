'use client';

import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { Mail, Phone, Linkedin } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  photo: any;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
}

interface TeamSectionProps {
  data: {
    title?: string;
    subtitle?: string;
    teamMembers?: TeamMember[];
    layout?: '2-col' | '3-col' | '4-col';
    showContactInfo?: boolean;
    backgroundColor?: 'white' | 'light-gray' | 'dark-gray';
    padding?: 'small' | 'medium' | 'large';
  };
}

const layoutMap: Record<string, string> = {
  '2-col': 'md:grid-cols-2',
  '3-col': 'md:grid-cols-2 lg:grid-cols-3',
  '4-col': 'md:grid-cols-2 lg:grid-cols-4',
};

const bgColorMap: Record<string, string> = {
  white: 'bg-white',
  'light-gray': 'bg-gray-50',
  'dark-gray': 'bg-gray-900',
};

const paddingMap: Record<string, string> = {
  small: 'py-8 md:py-12',
  medium: 'py-16 md:py-24',
  large: 'py-24 md:py-32',
};

export default function TeamSection({ data }: TeamSectionProps) {
  const layoutClass = layoutMap[data.layout || '3-col'];
  const bgClass = bgColorMap[data.backgroundColor || 'white'];
  const paddingClass = paddingMap[data.padding || 'medium'];
  const isDark = data.backgroundColor === 'dark-gray';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-white/80' : 'text-gray-600';

  return (
    <section className={`${bgClass} ${paddingClass}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        {(data.title || data.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            {data.title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${textColor}`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {data.title}
              </motion.h2>
            )}
            {data.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className={`text-lg ${subtextColor}`}
              >
                {data.subtitle}
              </motion.p>
            )}
          </div>
        )}

        {/* Team Members Grid */}
        {data.teamMembers && data.teamMembers.length > 0 && (
          <div className={`grid grid-cols-1 ${layoutClass} gap-8`}>
            {data.teamMembers.map((member, index) => {
              const photoUrl = urlFor(member.photo).width(600).height(600).fit('crop').url();

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group`}
                >
                  {/* Photo */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-1 ${textColor}`}>{member.name}</h3>
                    <p className="text-primary font-semibold mb-3">{member.role}</p>

                    {member.bio && (
                      <p className={`text-sm leading-relaxed mb-4 ${subtextColor}`}>
                        {member.bio}
                      </p>
                    )}

                    {/* Contact Info */}
                    {data.showContactInfo && (member.email || member.phone || member.linkedin) && (
                      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className={`flex items-center space-x-2 text-sm ${subtextColor} hover:text-primary transition-colors`}
                          >
                            <Mail className="w-4 h-4" />
                            <span>{member.email}</span>
                          </a>
                        )}
                        {member.phone && (
                          <a
                            href={`tel:${member.phone}`}
                            className={`flex items-center space-x-2 text-sm ${subtextColor} hover:text-primary transition-colors`}
                          >
                            <Phone className="w-4 h-4" />
                            <span>{member.phone}</span>
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center space-x-2 text-sm ${subtextColor} hover:text-primary transition-colors`}
                          >
                            <Linkedin className="w-4 h-4" />
                            <span>LinkedIn</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
