'use client'

import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

// Simple motion.div wrapper for use in Server Components
export default function MotionDiv(props: HTMLMotionProps<'div'>) {
  return <motion.div {...props} />
}

// Motion.a wrapper for links
export function MotionLink(props: HTMLMotionProps<'a'>) {
  return <motion.a {...props} />
}

// Motion.h1 wrapper for headings
export function MotionH1(props: HTMLMotionProps<'h1'>) {
  return <motion.h1 {...props} />
}
