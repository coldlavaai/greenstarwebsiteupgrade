# Ultra-Level Visual Editor Specification
## Squarespace-Quality Drag-and-Drop CMS

**Created:** 2025-10-26
**Purpose:** Complete technical specification for professional-grade visual page editor
**Goal:** Match or exceed Squarespace's editing experience with drag-and-drop, inline editing, and visual controls

---

## 📋 Table of Contents

1. [Editor Features Overview](#editor-features-overview)
2. [Drag-and-Drop Architecture](#drag-and-drop-architecture)
3. [Section Templates Library](#section-templates-library)
4. [Inline Visual Editing](#inline-visual-editing)
5. [Image Handling System](#image-handling-system)
6. [Style Editor Panel](#style-editor-panel)
7. [Live Preview System](#live-preview-system)
8. [User Experience Enhancements](#user-experience-enhancements)
9. [Technical Implementation](#technical-implementation)
10. [Testing Strategy](#testing-strategy)

---

## 🎯 Editor Features Overview

### Squarespace-Level Features We're Building

**Core Editing:**
- ✅ Drag-and-drop section reordering with smooth animations
- ✅ Visual section library with 20+ pre-built templates
- ✅ Inline text editing (click to edit directly)
- ✅ Image drag-and-drop with positioning controls
- ✅ Copy/paste/duplicate sections
- ✅ Undo/redo with full history
- ✅ Real-time auto-save (every 2 seconds)
- ✅ Keyboard shortcuts (Cmd+Z, Cmd+S, etc.)

**Visual Controls:**
- ✅ Style panel for colors, fonts, spacing
- ✅ Responsive preview (mobile/tablet/desktop)
- ✅ Visual spacing controls (padding/margin sliders)
- ✅ Background overlays and effects
- ✅ Animation speed controls
- ✅ Alignment guides and snapping

**Advanced Features:**
- ✅ Section templates with instant apply
- ✅ Global style presets
- ✅ Version history and rollback
- ✅ Multi-user collaboration indicators
- ✅ SEO preview
- ✅ Accessibility checker

---

## 🎨 Drag-and-Drop Architecture

### Implementation Using @dnd-kit

**Why @dnd-kit over react-beautiful-dnd:**
- Better TypeScript support
- More flexible and performant
- Built-in accessibility
- Smooth animations out of the box
- Better mobile support

### Installation

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install @dnd-kit/modifiers
```

### Core Drag-and-Drop Component

```typescript
// sanity/components/DraggableSections.tsx
'use client'

import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableSection } from './SortableSection'
import { SectionPreview } from './SectionPreview'
import { AddSectionButton } from './AddSectionButton'
import { motion, AnimatePresence } from 'framer-motion'

interface Section {
  _key: string
  _type: string
  [key: string]: any
}

interface DraggableSectionsProps {
  sections: Section[]
  onChange: (sections: Section[]) => void
}

export function DraggableSections({ sections, onChange }: DraggableSectionsProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isAddingSection, setIsAddingSection] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Prevents accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s._key === active.id)
      const newIndex = sections.findIndex((s) => s._key === over.id)

      const newSections = arrayMove(sections, oldIndex, newIndex)
      onChange(newSections)

      // Show success toast
      showToast('Section moved successfully')
    }

    setActiveId(null)
  }

  const handleDragCancel = () => {
    setActiveId(null)
  }

  const activeSection = sections.find((s) => s._key === activeId)

  return (
    <div className="space-y-4">
      {/* Add Section Button at Top */}
      <div className="sticky top-0 z-10 bg-white border-b pb-4">
        <AddSectionButton
          onAdd={(sectionType) => {
            const newSection = createSection(sectionType)
            onChange([...sections, newSection])
            setIsAddingSection(false)
          }}
          isOpen={isAddingSection}
          onToggle={() => setIsAddingSection(!isAddingSection)}
        />
      </div>

      {/* Drag-and-Drop Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext
          items={sections.map((s) => s._key)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {sections.map((section, index) => (
              <SortableSection
                key={section._key}
                section={section}
                index={index}
                onDuplicate={() => handleDuplicate(index)}
                onDelete={() => handleDelete(index)}
                onEdit={() => handleEdit(index)}
              />
            ))}
          </AnimatePresence>
        </SortableContext>

        {/* Drag Overlay */}
        <DragOverlay>
          {activeSection && (
            <div className="opacity-50 rotate-2 scale-105">
              <SectionPreview section={activeSection} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      {/* Empty State */}
      {sections.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 border-2 border-dashed rounded-xl"
        >
          <p className="text-gray-500 mb-4">No sections yet. Get started by adding one!</p>
          <AddSectionButton
            onAdd={(sectionType) => {
              const newSection = createSection(sectionType)
              onChange([newSection])
            }}
          />
        </motion.div>
      )}
    </div>
  )

  function handleDuplicate(index: number) {
    const section = sections[index]
    const duplicated = {
      ...section,
      _key: `section-${Date.now()}`,
    }
    const newSections = [
      ...sections.slice(0, index + 1),
      duplicated,
      ...sections.slice(index + 1),
    ]
    onChange(newSections)
    showToast('Section duplicated')
  }

  function handleDelete(index: number) {
    if (confirm('Delete this section?')) {
      onChange(sections.filter((_, i) => i !== index))
      showToast('Section deleted')
    }
  }

  function handleEdit(index: number) {
    // Scroll to section editor
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' })
  }
}

function createSection(type: string): Section {
  return {
    _key: `section-${Date.now()}`,
    _type: type,
    visible: true,
  }
}

function showToast(message: string) {
  // Implement toast notification
  console.log(message)
}
```

### Sortable Section Component

```typescript
// sanity/components/SortableSection.tsx
'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import {
  DragHandleIcon,
  DuplicateIcon,
  TrashIcon,
  EditIcon,
  EyeOpenIcon,
  EyeClosedIcon,
} from '@sanity/icons'

interface SortableSectionProps {
  section: any
  index: number
  onDuplicate: () => void
  onDelete: () => void
  onEdit: () => void
}

export function SortableSection({
  section,
  index,
  onDuplicate,
  onDelete,
  onEdit,
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section._key })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`
        bg-white border rounded-xl overflow-hidden
        ${isDragging ? 'shadow-2xl ring-2 ring-primary' : 'shadow-sm hover:shadow-md'}
        transition-shadow duration-200
      `}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        {/* Left: Drag Handle + Section Info */}
        <div className="flex items-center gap-3">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-200 rounded transition-colors"
            title="Drag to reorder"
          >
            <DragHandleIcon className="w-5 h-5 text-gray-600" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
              <span className="font-semibold text-gray-900">
                {getSectionLabel(section._type)}
              </span>
              {section.visible === false && (
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                  Hidden
                </span>
              )}
            </div>
            {section.heading && (
              <p className="text-sm text-gray-500 truncate max-w-md">
                {section.heading}
              </p>
            )}
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Edit section"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onDuplicate}
            className="p-2 hover:bg-gray-200 rounded transition-colors"
            title="Duplicate section"
          >
            <DuplicateIcon className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
            title="Delete section"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Section Preview/Content */}
      <div className="p-4">
        <SectionPreview section={section} />
      </div>
    </motion.div>
  )
}

function getSectionLabel(type: string): string {
  const labels: Record<string, string> = {
    heroSection: '🦸 Hero Section',
    textBlock: '📝 Text Block',
    benefitsGrid: '✨ Benefits Grid',
    processSteps: '🔄 Process Steps',
    galleryGrid: '🖼️ Gallery',
    testimonialsCarousel: '⭐ Testimonials',
    faqAccordion: '❓ FAQ',
    ctaBlock: '🎯 Call-to-Action',
    contactFormBlock: '📧 Contact Form',
    statsDisplay: '📊 Statistics',
    videoEmbed: '🎥 Video',
  }
  return labels[type] || type
}
```

---

## 📚 Section Templates Library

### Add Section Button with Template Picker

```typescript
// sanity/components/AddSectionButton.tsx
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AddIcon, CloseIcon } from '@sanity/icons'
import { sectionTemplates } from './sectionTemplates'

interface AddSectionButtonProps {
  onAdd: (sectionType: string, template?: any) => void
  isOpen?: boolean
  onToggle?: () => void
}

export function AddSectionButton({ onAdd, isOpen = false, onToggle }: AddSectionButtonProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { value: 'all', label: 'All Sections', emoji: '📦' },
    { value: 'hero', label: 'Hero', emoji: '🦸' },
    { value: 'content', label: 'Content', emoji: '📝' },
    { value: 'features', label: 'Features', emoji: '✨' },
    { value: 'social', label: 'Social Proof', emoji: '⭐' },
    { value: 'cta', label: 'Call-to-Action', emoji: '🎯' },
    { value: 'media', label: 'Media', emoji: '🖼️' },
  ]

  const filteredTemplates = sectionTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="relative">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onToggle}
        className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-lg font-semibold shadow-lg hover:bg-primary-dark transition-colors"
      >
        {isOpen ? <CloseIcon /> : <AddIcon />}
        {isOpen ? 'Close' : 'Add Section'}
      </motion.button>

      {/* Section Library Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-2xl z-50 max-h-[600px] overflow-hidden flex flex-col"
          >
            {/* Search Bar */}
            <div className="p-4 border-b">
              <input
                type="text"
                placeholder="Search sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 px-4 py-3 border-b overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`
                    px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                    ${
                      selectedCategory === category.value
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {category.emoji} {category.label}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-2 gap-4">
                {filteredTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      onAdd(template.type, template.data)
                      onToggle?.()
                    }}
                    className="group text-left bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all"
                  >
                    {/* Preview Thumbnail */}
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {template.preview && (
                        <img
                          src={template.preview}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {template.emoji} {template.name}
                        </h4>
                        {template.pro && (
                          <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded font-medium">
                            PRO
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Empty State */}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No sections found</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### Section Templates Data

```typescript
// sanity/components/sectionTemplates.ts
export interface SectionTemplate {
  id: string
  name: string
  emoji: string
  description: string
  category: string
  type: string
  preview?: string
  pro?: boolean
  data: any
}

export const sectionTemplates: SectionTemplate[] = [
  // HERO SECTIONS
  {
    id: 'hero-centered',
    name: 'Centered Hero',
    emoji: '🦸',
    description: 'Classic centered hero with heading, subheading, and CTA',
    category: 'hero',
    type: 'heroSection',
    preview: '/templates/hero-centered.jpg',
    data: {
      heading: {
        line1: 'Welcome to Your',
        line2: 'Amazing Website',
      },
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Transform your business with our innovative solutions.',
            },
          ],
        },
      ],
      cta: {
        text: 'Get Started',
        link: '#contact',
        style: 'primary',
      },
    },
  },
  {
    id: 'hero-split',
    name: 'Split Hero',
    emoji: '🦸',
    description: 'Hero with content on left, image on right',
    category: 'hero',
    type: 'heroSection',
    pro: true,
    data: {
      layout: 'split',
      heading: {
        line1: 'Build Your',
        line2: 'Dream Project',
      },
      description: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: 'Professional tools and resources to bring your vision to life.',
            },
          ],
        },
      ],
    },
  },

  // TEXT BLOCKS
  {
    id: 'text-single',
    name: 'Single Column Text',
    emoji: '📝',
    description: 'Simple text content block',
    category: 'content',
    type: 'textBlock',
    data: {
      heading: 'About Us',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            {
              _type: 'span',
              text: 'Your content goes here. Edit this text to share your story.',
            },
          ],
        },
      ],
      columns: '1',
      maxWidth: 'max-w-4xl',
    },
  },
  {
    id: 'text-two-column',
    name: 'Two Column Text',
    emoji: '📝',
    description: 'Text split into two columns',
    category: 'content',
    type: 'textBlock',
    data: {
      heading: 'Our Story',
      content: [
        {
          _type: 'block',
          children: [
            { _type: 'span', text: 'Column 1 content...' },
          ],
        },
      ],
      columns: '2',
      maxWidth: 'max-w-6xl',
    },
  },

  // BENEFITS GRIDS
  {
    id: 'benefits-3col',
    name: '3 Column Benefits',
    emoji: '✨',
    description: 'Highlight 3-6 key benefits or features',
    category: 'features',
    type: 'benefitsGrid',
    data: {
      heading: 'Why Choose Us',
      subheading: 'Everything you need to succeed',
      benefits: [
        {
          icon: 'Zap',
          title: 'Fast & Reliable',
          description: 'Lightning-fast performance you can count on',
        },
        {
          icon: 'Shield',
          title: 'Secure & Safe',
          description: 'Enterprise-grade security built in',
        },
        {
          icon: 'Users',
          title: 'Expert Support',
          description: '24/7 support from our dedicated team',
        },
      ],
      columns: '3',
    },
  },
  {
    id: 'benefits-4col',
    name: '4 Column Benefits',
    emoji: '✨',
    description: 'Showcase 4 key features in a grid',
    category: 'features',
    type: 'benefitsGrid',
    data: {
      heading: 'Features',
      benefits: [
        { icon: 'Zap', title: 'Fast', description: 'Quick and efficient' },
        { icon: 'Shield', title: 'Secure', description: 'Safe and protected' },
        { icon: 'Target', title: 'Accurate', description: 'Precise results' },
        { icon: 'Award', title: 'Quality', description: 'Premium experience' },
      ],
      columns: '4',
    },
  },

  // PROCESS STEPS
  {
    id: 'process-4-steps',
    name: '4-Step Process',
    emoji: '🔄',
    description: 'Show your process in 4 easy steps',
    category: 'features',
    type: 'processSteps',
    data: {
      heading: 'How It Works',
      subheading: 'Get started in 4 simple steps',
      steps: [
        { number: '01', title: 'Sign Up', description: 'Create your free account' },
        { number: '02', title: 'Customize', description: 'Set up your preferences' },
        { number: '03', title: 'Launch', description: 'Go live in minutes' },
        { number: '04', title: 'Grow', description: 'Scale with confidence' },
      ],
      layout: 'grid',
    },
  },

  // TESTIMONIALS
  {
    id: 'testimonials-carousel',
    name: 'Testimonials Carousel',
    emoji: '⭐',
    description: 'Customer reviews in a carousel',
    category: 'social',
    type: 'testimonialsCarousel',
    data: {
      heading: 'What Our Customers Say',
      testimonials: [],
    },
  },

  // CTA BLOCKS
  {
    id: 'cta-centered',
    name: 'Centered CTA',
    emoji: '🎯',
    description: 'Bold centered call-to-action',
    category: 'cta',
    type: 'ctaBlock',
    data: {
      heading: 'Ready to Get Started?',
      description: 'Join thousands of satisfied customers today',
      button: {
        text: 'Get Started Now',
        link: '#contact',
      },
      style: 'primary',
    },
  },
  {
    id: 'cta-split',
    name: 'Split CTA',
    emoji: '🎯',
    description: 'CTA with image on side',
    category: 'cta',
    type: 'ctaBlock',
    pro: true,
    data: {
      layout: 'split',
      heading: 'Take Your Business Further',
      description: 'Schedule a demo to see how we can help',
      button: {
        text: 'Book Demo',
        link: '#contact',
      },
    },
  },

  // FAQ
  {
    id: 'faq-accordion',
    name: 'FAQ Accordion',
    emoji: '❓',
    description: 'Collapsible FAQ section',
    category: 'content',
    type: 'faqAccordion',
    data: {
      heading: 'Frequently Asked Questions',
      faqs: [
        {
          question: 'How does it work?',
          answer: 'It\'s simple! Just sign up and follow our easy setup process.',
        },
        {
          question: 'What\'s included?',
          answer: 'Everything you need to get started, plus 24/7 support.',
        },
      ],
    },
  },

  // CONTACT FORM
  {
    id: 'contact-form',
    name: 'Contact Form',
    emoji: '📧',
    description: 'Simple contact form',
    category: 'cta',
    type: 'contactFormBlock',
    data: {
      heading: 'Get in Touch',
      subheading: 'We\'d love to hear from you',
      fields: ['name', 'email', 'message'],
    },
  },

  // GALLERY
  {
    id: 'gallery-grid',
    name: 'Image Gallery',
    emoji: '🖼️',
    description: 'Grid of images with captions',
    category: 'media',
    type: 'galleryGrid',
    data: {
      heading: 'Our Work',
      columns: '3',
      images: [],
    },
  },

  // VIDEO
  {
    id: 'video-embed',
    name: 'Video Player',
    emoji: '🎥',
    description: 'Embed YouTube or Vimeo video',
    category: 'media',
    type: 'videoEmbed',
    data: {
      heading: 'Watch Our Story',
      videoUrl: '',
      provider: 'youtube',
    },
  },

  // STATS
  {
    id: 'stats-display',
    name: 'Statistics Display',
    emoji: '📊',
    description: 'Show impressive numbers',
    category: 'social',
    type: 'statsDisplay',
    data: {
      heading: 'By the Numbers',
      stats: [
        { value: '10K+', label: 'Happy Customers' },
        { value: '99%', label: 'Satisfaction Rate' },
        { value: '24/7', label: 'Support Available' },
        { value: '50+', label: 'Countries Served' },
      ],
    },
  },
]
```

---

## ✏️ Inline Visual Editing

### Click-to-Edit Text Fields

```typescript
// sanity/components/InlineEditableText.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface InlineEditableTextProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  multiline?: boolean
  className?: string
  maxLength?: number
}

export function InlineEditableText({
  value,
  onChange,
  placeholder = 'Click to edit...',
  multiline = false,
  className = '',
  maxLength,
}: InlineEditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    onChange(localValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleBlur()
    }
    if (e.key === 'Escape') {
      setLocalValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    const Component = multiline ? 'textarea' : 'input'
    return (
      <Component
        ref={inputRef as any}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`${className} border-2 border-primary rounded px-2 py-1 focus:outline-none`}
        {...(multiline && { rows: 3 })}
      />
    )
  }

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(140, 198, 63, 0.1)' }}
      onClick={() => setIsEditing(true)}
      className={`${className} cursor-text px-2 py-1 rounded transition-colors`}
      title="Click to edit"
    >
      {localValue || <span className="text-gray-400">{placeholder}</span>}
    </motion.div>
  )
}
```

---

## 🖼️ Image Handling System

### Drag-and-Drop Image Upload

```typescript
// sanity/components/ImageDropZone.tsx
'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadIcon, ImageIcon, TrashIcon } from '@sanity/icons'
import { client } from '@/lib/sanity'

interface ImageDropZoneProps {
  value?: {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  onChange: (image: any) => void
  aspectRatio?: string
  maxSize?: number // in MB
}

export function ImageDropZone({
  value,
  onChange,
  aspectRatio = '16/9',
  maxSize = 5,
}: ImageDropZoneProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`)
        return
      }

      setIsUploading(true)

      try {
        // Create preview
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        // Upload to Sanity
        const uploadedImage = await client.assets.upload('image', file, {
          filename: file.name,
        })

        onChange({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImage._id,
          },
        })

        setIsUploading(false)
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Failed to upload image')
        setIsUploading(false)
      }
    },
    [onChange, maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
  })

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    setPreview(null)
  }

  return (
    <div
      {...getRootProps()}
      style={{ aspectRatio }}
      className={`
        relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer
        transition-all duration-200
        ${isDragActive ? 'border-primary bg-primary/10 scale-105' : 'border-gray-300 hover:border-primary'}
        ${value ? 'border-solid' : ''}
      `}
    >
      <input {...getInputProps()} />

      <AnimatePresence mode="wait">
        {isUploading ? (
          <motion.div
            key="uploading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-white"
          >
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600">Uploading...</p>
            </div>
          </motion.div>
        ) : value ? (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative group"
          >
            <img
              src={getImageUrl(value)}
              alt="Uploaded image"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button
                onClick={handleRemove}
                className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                title="Remove image"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-gray-500"
          >
            {isDragActive ? (
              <>
                <UploadIcon className="w-12 h-12 mb-4 text-primary" />
                <p className="text-lg font-medium text-primary">Drop image here</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 mb-4" />
                <p className="text-lg font-medium">Click or drag image</p>
                <p className="text-sm text-gray-400 mt-1">Max {maxSize}MB</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function getImageUrl(image: any): string {
  if (!image?.asset?._ref) return ''
  const ref = image.asset._ref
  const [_file, id, dimensions, format] = ref.split('-')
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`
}
```

### Image Position Controls

```typescript
// sanity/components/ImagePositionControl.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ImagePositionControlProps {
  value: {
    x: number // 0-100
    y: number // 0-100
  }
  onChange: (position: { x: number; y: number }) => void
}

export function ImagePositionControl({ value, onChange }: ImagePositionControlProps) {
  const positions = [
    { x: 0, y: 0, label: 'Top Left' },
    { x: 50, y: 0, label: 'Top Center' },
    { x: 100, y: 0, label: 'Top Right' },
    { x: 0, y: 50, label: 'Center Left' },
    { x: 50, y: 50, label: 'Center' },
    { x: 100, y: 50, label: 'Center Right' },
    { x: 0, y: 100, label: 'Bottom Left' },
    { x: 50, y: 100, label: 'Bottom Center' },
    { x: 100, y: 100, label: 'Bottom Right' },
  ]

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700">Image Position</label>
      <div className="grid grid-cols-3 gap-2">
        {positions.map((position) => {
          const isActive = value.x === position.x && value.y === position.y
          return (
            <motion.button
              key={`${position.x}-${position.y}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ x: position.x, y: position.y })}
              className={`
                p-3 rounded-lg border-2 text-sm font-medium transition-all
                ${
                  isActive
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-primary'
                }
              `}
              title={position.label}
            >
              <div
                className={`w-2 h-2 rounded-full mx-auto ${
                  isActive ? 'bg-white' : 'bg-primary'
                }`}
              />
            </motion.button>
          )
        })}
      </div>

      {/* Fine-tune sliders */}
      <div className="space-y-2 pt-2 border-t">
        <div>
          <label className="text-xs text-gray-600">Horizontal: {value.x}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={value.x}
            onChange={(e) => onChange({ ...value, x: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-xs text-gray-600">Vertical: {value.y}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={value.y}
            onChange={(e) => onChange({ ...value, y: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
```

---

## 🎨 Style Editor Panel

### Universal Style Controls

```typescript
// sanity/components/StyleEditor.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ColorPicker } from './ColorPicker'
import { SpacingControl } from './SpacingControl'
import { FontSelector } from './FontSelector'

interface StyleEditorProps {
  value: {
    backgroundColor?: string
    textColor?: string
    padding?: { top: number; right: number; bottom: number; left: number }
    margin?: { top: number; right: number; bottom: number; left: number }
    fontFamily?: string
    fontSize?: string
    borderRadius?: string
  }
  onChange: (styles: any) => void
}

export function StyleEditor({ value, onChange }: StyleEditorProps) {
  const [activeTab, setActiveTab] = React.useState<'colors' | 'spacing' | 'typography'>('colors')

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Tabs */}
      <div className="flex border-b">
        {[
          { key: 'colors', label: '🎨 Colors', value: 'colors' },
          { key: 'spacing', label: '📏 Spacing', value: 'spacing' },
          { key: 'typography', label: '✍️ Typography', value: 'typography' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.value as any)}
            className={`
              flex-1 px-4 py-3 text-sm font-medium transition-colors
              ${
                activeTab === tab.value
                  ? 'bg-primary text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {activeTab === 'colors' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <ColorPicker
              label="Background Color"
              value={value.backgroundColor}
              onChange={(color) => onChange({ ...value, backgroundColor: color })}
            />
            <ColorPicker
              label="Text Color"
              value={value.textColor}
              onChange={(color) => onChange({ ...value, textColor: color })}
            />
          </motion.div>
        )}

        {activeTab === 'spacing' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <SpacingControl
              label="Padding"
              value={value.padding || { top: 0, right: 0, bottom: 0, left: 0 }}
              onChange={(padding) => onChange({ ...value, padding })}
            />
            <SpacingControl
              label="Margin"
              value={value.margin || { top: 0, right: 0, bottom: 0, left: 0 }}
              onChange={(margin) => onChange({ ...value, margin })}
            />
          </motion.div>
        )}

        {activeTab === 'typography' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <FontSelector
              label="Font Family"
              value={value.fontFamily}
              onChange={(fontFamily) => onChange({ ...value, fontFamily })}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <select
                value={value.fontSize || 'text-base'}
                onChange={(e) => onChange({ ...value, fontSize: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="text-xs">Extra Small</option>
                <option value="text-sm">Small</option>
                <option value="text-base">Base</option>
                <option value="text-lg">Large</option>
                <option value="text-xl">Extra Large</option>
                <option value="text-2xl">2XL</option>
                <option value="text-3xl">3XL</option>
                <option value="text-4xl">4XL</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
```

---

## 🔄 Live Preview System

### Iframe Preview with Real-time Updates

```typescript
// sanity/components/LivePreview.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface LivePreviewProps {
  pageId: string
  sections: any[]
}

export function LivePreview({ pageId, sections }: LivePreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const deviceDimensions = {
    desktop: { width: '100%', height: '100%' },
    tablet: { width: '768px', height: '1024px' },
    mobile: { width: '375px', height: '667px' },
  }

  // Send updates to iframe
  useEffect(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'UPDATE_SECTIONS',
          sections,
        },
        '*'
      )
    }
  }, [sections])

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 bg-white border-b">
        <h3 className="text-lg font-semibold">Live Preview</h3>

        {/* Device Selector */}
        <div className="flex gap-2">
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => (
            <motion.button
              key={d}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDevice(d)}
              className={`
                px-4 py-2 rounded-lg font-medium capitalize transition-colors
                ${
                  device === d
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {d === 'desktop' && '🖥️'}
              {d === 'tablet' && '📱'}
              {d === 'mobile' && '📱'}
              {' '}{d}
            </motion.button>
          ))}
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => iframeRef.current?.contentWindow?.location.reload()}
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <motion.div
          key={device}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: deviceDimensions[device].width,
            height: deviceDimensions[device].height,
            maxHeight: '100%',
          }}
          className="bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          <iframe
            ref={iframeRef}
            src={`/api/preview?id=${pageId}`}
            className="w-full h-full border-0"
            title="Page Preview"
          />
        </motion.div>
      </div>
    </div>
  )
}
```

---

## ⚡ User Experience Enhancements

### Keyboard Shortcuts

```typescript
// sanity/hooks/useKeyboardShortcuts.ts
import { useEffect } from 'react'

export function useKeyboardShortcuts(callbacks: {
  onSave?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
  onAddSection?: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // Cmd/Ctrl + S: Save
      if (modifier && e.key === 's') {
        e.preventDefault()
        callbacks.onSave?.()
      }

      // Cmd/Ctrl + Z: Undo
      if (modifier && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        callbacks.onUndo?.()
      }

      // Cmd/Ctrl + Shift + Z: Redo
      if (modifier && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        callbacks.onRedo?.()
      }

      // Cmd/Ctrl + D: Duplicate
      if (modifier && e.key === 'd') {
        e.preventDefault()
        callbacks.onDuplicate?.()
      }

      // Delete/Backspace: Delete
      if (e.key === 'Delete' || (e.key === 'Backspace' && e.metaKey)) {
        e.preventDefault()
        callbacks.onDelete?.()
      }

      // Cmd/Ctrl + K: Add Section
      if (modifier && e.key === 'k') {
        e.preventDefault()
        callbacks.onAddSection?.()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [callbacks])
}
```

### Auto-save System

```typescript
// sanity/hooks/useAutoSave.ts
import { useEffect, useRef } from 'react'
import { debounce } from 'lodash'

export function useAutoSave(
  data: any,
  onSave: (data: any) => Promise<void>,
  delay: number = 2000
) {
  const saveRef = useRef(
    debounce(async (dataToSave: any) => {
      try {
        await onSave(dataToSave)
        showToast('✅ Saved', 'success')
      } catch (error) {
        showToast('❌ Save failed', 'error')
        console.error('Auto-save failed:', error)
      }
    }, delay)
  )

  useEffect(() => {
    saveRef.current(data)
  }, [data])

  return saveRef.current
}

function showToast(message: string, type: 'success' | 'error') {
  // Implement toast notification
  console.log(`[${type}] ${message}`)
}
```

### Undo/Redo System

```typescript
// sanity/hooks/useUndoRedo.ts
import { useState, useCallback } from 'react'

export function useUndoRedo<T>(initialState: T) {
  const [history, setHistory] = useState<T[]>([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const current = history[currentIndex]

  const push = useCallback((newState: T) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, currentIndex + 1)
      return [...newHistory, newState]
    })
    setCurrentIndex((prev) => prev + 1)
  }, [currentIndex])

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex])

  const redo = useCallback(() => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, history.length])

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  return {
    current,
    push,
    undo,
    redo,
    canUndo,
    canRedo,
  }
}
```

---

## 🧪 Testing Strategy

### Component Testing

```typescript
// sanity/components/__tests__/DraggableSections.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { DraggableSections } from '../DraggableSections'

describe('DraggableSections', () => {
  const mockSections = [
    { _key: '1', _type: 'heroSection', heading: 'Hero' },
    { _key: '2', _type: 'textBlock', content: 'Text' },
  ]

  it('renders all sections', () => {
    render(<DraggableSections sections={mockSections} onChange={jest.fn()} />)
    expect(screen.getByText('🦸 Hero Section')).toBeInTheDocument()
    expect(screen.getByText('📝 Text Block')).toBeInTheDocument()
  })

  it('calls onChange when section is duplicated', () => {
    const onChange = jest.fn()
    render(<DraggableSections sections={mockSections} onChange={onChange} />)

    const duplicateButton = screen.getAllByTitle('Duplicate section')[0]
    fireEvent.click(duplicateButton)

    expect(onChange).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ _type: 'heroSection' }),
        expect.objectContaining({ _type: 'heroSection' }),
        expect.objectContaining({ _type: 'textBlock' }),
      ])
    )
  })

  it('calls onChange when section is deleted', () => {
    const onChange = jest.fn()
    global.confirm = jest.fn(() => true)

    render(<DraggableSections sections={mockSections} onChange={onChange} />)

    const deleteButton = screen.getAllByTitle('Delete section')[0]
    fireEvent.click(deleteButton)

    expect(onChange).toHaveBeenCalledWith([mockSections[1]])
  })
})
```

---

## 📊 Implementation Priority

### Phase 1: Core Drag-and-Drop (Week 1)
- [ ] Install @dnd-kit packages
- [ ] Build DraggableSections component
- [ ] Build SortableSection component
- [ ] Add smooth animations
- [ ] Test drag-and-drop functionality

### Phase 2: Section Library (Week 1-2)
- [ ] Create section templates data
- [ ] Build AddSectionButton component
- [ ] Design template picker UI
- [ ] Add search and filtering
- [ ] Create template preview thumbnails

### Phase 3: Inline Editing (Week 2)
- [ ] Build InlineEditableText component
- [ ] Add click-to-edit functionality
- [ ] Implement keyboard shortcuts
- [ ] Add auto-save system

### Phase 4: Image System (Week 2-3)
- [ ] Build ImageDropZone component
- [ ] Implement drag-and-drop upload
- [ ] Add image position controls
- [ ] Create image gallery component

### Phase 5: Style Editor (Week 3)
- [ ] Build StyleEditor component
- [ ] Add color picker
- [ ] Create spacing controls
- [ ] Add font selector
- [ ] Implement responsive controls

### Phase 6: Live Preview (Week 3-4)
- [ ] Build LivePreview component
- [ ] Implement iframe communication
- [ ] Add device size toggle
- [ ] Create real-time update system

### Phase 7: UX Polish (Week 4)
- [ ] Implement keyboard shortcuts
- [ ] Add undo/redo system
- [ ] Create toast notifications
- [ ] Add loading states
- [ ] Optimize performance
- [ ] Write comprehensive tests

---

**End of Visual Editor Specification Document**
