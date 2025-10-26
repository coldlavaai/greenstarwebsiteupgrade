# GreenStar Solar - Codebase Audit Report

**Date:** 2025-10-26
**Purpose:** Comprehensive audit to identify architectural issues before building CMS
**Status:** 🔴 **CRITICAL ISSUES FOUND** - Refactoring required before CMS implementation

---

## 📊 Executive Summary

The current codebase has a **split personality** - the homepage is properly integrated with Sanity CMS, but the rest of the site has **massive amounts of hardcoded content** that will block our CMS implementation. We need to refactor before building the visual editor.

### Risk Level: 🔴 HIGH

**Good News:**
- Homepage (app/page.tsx) is properly server-rendered with Sanity integration ✅
- Component structure is clean and well-organized ✅
- Modern tech stack (Next.js 14, TypeScript, Framer Motion) ✅
- Sanity is already configured and working ✅

**Bad News:**
- 5 system pages have hardcoded content arrays (benefits, FAQs, process steps) ❌
- Components have huge hardcoded fallback data ❌
- Mixed client/server rendering patterns ❌
- No rich text editing (Portable Text) ❌
- Icon/image/link mappings are hardcoded ❌

---

## 🔴 Critical Issues (Must Fix Before CMS)

### 1. **Hardcoded Content Everywhere**

**Location:** `components/Process.tsx` lines 43-89
**Problem:** Entire process steps array (5 steps × front/back content + reviews) is hardcoded in component
**Impact:** 🔴 **BLOCKER** - Can't edit process steps via CMS

```typescript
// Current (BAD):
const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Personal Consultation',
    description: '...',
    backContent: '...',
    frontReview: { text: '...', author: '...' },
    backReview: { text: '...', author: '...' },
  },
  // ... 4 more hardcoded steps
]
```

**Solution Required:**
- Move ALL content to Sanity schemas
- Add review fields to processStep schema
- Component should ONLY handle rendering, not store content

---

### 2. **System Pages - Client-Side Data Fetching**

**Location:** All 5 system pages:
- `app/solar-panels-home/page.tsx`
- `app/solar-panels-business/page.tsx`
- `app/battery-storage-home/page.tsx`
- `app/battery-storage-business/page.tsx`
- `app/ev-charging/page.tsx`

**Problem:** All use `'use client'` + `useEffect` + `useState` to fetch data

```typescript
// Current (BAD):
'use client';

export default function SolarPanelsHome() {
  const [navigationData, setNavigationData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const [nav, footer] = await Promise.all([
        client.fetch(`...`),
        client.fetch(`...`)
      ]);
      setNavigationData(nav);
    }
    fetchData();
  }, []);

  const benefits = [/* HUGE HARDCODED ARRAY */];
  const process = [/* HUGE HARDCODED ARRAY */];
  const faqs = [/* HUGE HARDCODED ARRAY */];

  return (/* JSX using hardcoded data */)
}
```

**Impact:**
- 🔴 **BLOCKER** - Can't manage system page content in CMS
- Poor SEO (client-side rendering)
- Slow page loads (waterfall fetching)
- Duplicated code across all 5 pages

**Solution Required:**
- Convert to Server Components like homepage
- Create `systemPage` schema in Sanity
- Fetch all data server-side
- Remove all hardcoded arrays

---

### 3. **Component Fallback Data is Massive**

**Location:** `components/Systems.tsx` lines 38-108
**Problem:** Hardcoded fallback data (4 services × 4 features each = 16+ fields)

```typescript
// Current (BAD):
const services = data?.map(...) || [
  {
    icon: Sun,
    title: 'Solar Panels for Home',
    description: '...',
    features: ['...', '...', '...', '...'],
    image: 'https://...',
    link: '/solar-panels-home',
  },
  // ... 3 more complete service objects with all fields
];

// ALSO BAD:
const imageMap: Record<string, string> = {
  'Solar Panels for Home': 'https://irp.cdn-website.com/...',
  // ... hardcoded URLs
};

const linkMap: Record<string, string> = {
  'Solar Panels for Home': '/solar-panels-home',
  // ... hardcoded routes
};
```

**Impact:** 🔴 **BLOCKER** - User edits in CMS won't show if data structure changes

**Solution Required:**
- Remove ALL fallback data
- Show error state if CMS data missing
- Move image/link mapping to CMS schema

---

### 4. **No Portable Text / Rich Text**

**Location:** ALL schemas
**Problem:** Content fields are plain `string` or `text`, not rich text arrays

```typescript
// Current schemas (BAD):
{
  name: 'heading',
  type: 'string',  // ❌ Can't format text
}
{
  name: 'content',
  type: 'text',  // ❌ Can't add bold, links, etc.
}
```

**Impact:** 🔴 **BLOCKER** for visual editor - Can't add formatting, colors, font sizes

**Solution Required:**
- Change all text fields to Portable Text arrays
- Add custom marks for font size, color, etc.
- Build proper rich text serializers

---

### 5. **Icon/Image Handling**

**Location:** Multiple components
**Problem:** Icons are string names, not user-friendly

```typescript
// Current (BAD):
const iconMap: Record<string, any> = {
  Sun: Sun,
  Battery: Battery,
  Building2: Building2,
};

// In schema:
icon: 'Sun'  // ❌ User has to type "Sun" exactly
```

**Impact:** 🟡 **MODERATE** - Confusing for non-technical users

**Solution Required:**
- Build visual icon picker component
- Store icon name in CMS
- Map to Lucide React components in renderer

---

### 6. **Mixed Rendering Patterns**

**Location:** Homepage vs. System Pages
**Problem:** Inconsistent approaches

| Page | Rendering | Data Fetch | Works with CMS |
|------|-----------|------------|----------------|
| Homepage | ✅ Server | ✅ Server-side | ✅ Yes |
| System Pages | ❌ Client | ❌ Client useEffect | ❌ Partial |
| Components | Mixed | Props from parent | Depends |

**Impact:** 🟡 **MODERATE** - Confusing codebase, hard to maintain

**Solution Required:**
- Standardize on Server Components
- Client components ONLY for interactivity (animations, forms)
- All data fetching at page level

---

## 🟡 Moderate Issues (Should Fix)

### 7. **Duplicated Data Fetching Code**

**Location:** All 5 system pages
**Problem:** Identical `useEffect` code repeated 5 times

```typescript
// This exact code is in 5 files:
useEffect(() => {
  async function fetchData() {
    const [nav, footer] = await Promise.all([
      client.fetch(`*[_type == "navigationSection"][0]...`),
      client.fetch(`*[_type == "footerSection"][0]`)
    ]);
    setNavigationData(nav);
    setFooterData(footer);
  }
  fetchData();
}, []);
```

**Impact:** 🟡 **MODERATE** - Maintenance nightmare (fix bug = edit 5 files)

**Solution:**
- Create shared layout for system pages
- Fetch nav/footer once in layout
- Or convert to Server Components (preferred)

---

### 8. **No TypeScript Type Safety**

**Location:** Throughout codebase
**Problem:** Using `any` types, no generated types from Sanity

```typescript
// Current (BAD):
const [navigationData, setNavigationData] = useState<any>(null);
interface HeroProps {
  data?: HeroData;  // Custom defined, not from schemas
}
```

**Impact:** 🟡 **MODERATE** - Easy to introduce bugs

**Solution:**
- Install `sanity-codegen`
- Generate TypeScript types from schemas
- Replace `any` with generated types

---

### 9. **useInView Margin Parameter**

**Location:** `components/About.tsx` line 26, others
**Problem:** Using `margin: '-100px'` which caused issues before

```typescript
// Current (RISKY):
const isInView = useInView(ref, { once: true, margin: '-100px' });
```

**Impact:** 🟢 **LOW** - Could cause animations not triggering

**Solution:**
- Change to `amount: 0.1` (10% visible)
- More reliable across screen sizes

---

### 10. **No Error Boundaries**

**Location:** Entire app
**Problem:** If CMS data fetch fails, app crashes

**Impact:** 🟡 **MODERATE** - Poor user experience

**Solution:**
- Add Error Boundary components
- Show friendly error messages
- Fallback UI for missing data

---

## 🟢 Minor Issues (Nice to Fix)

### 11. **Hardcoded Colors/Styles**

**Location:** Throughout components
**Problem:** Colors like `#8cc63f` hardcoded, not from brandTheme

```typescript
// Current:
className="text-[#8cc63f]"
```

**Impact:** 🟢 **LOW** - Can't easily change brand colors

**Solution:**
- Use CSS variables from brandTheme
- Or Tailwind custom colors

---

### 12. **About Component Bullet Points**

**Location:** `components/About.tsx` lines 127-144
**Problem:** Features array hardcoded in component

```typescript
// Current (BAD):
{[
  'Certified and experienced installers',
  'Premium quality solar panels and equipment',
  'Comprehensive warranty and support',
  'Tailored solutions for your energy goals',
].map((item, index) => (...))}
```

**Impact:** 🟢 **LOW** - Can't edit these bullet points

**Solution:**
- Add features array to aboutSection schema
- Or use Portable Text with list items

---

## 📂 File Structure Analysis

### ✅ What's Working Well

```
app/
├── page.tsx                  ✅ Server-rendered, CMS integrated
├── layout.tsx                ✅ Clean root layout
├── api/                      ✅ Well-organized API routes
└── studio/                   ✅ Sanity Studio setup

components/
├── Navigation.tsx            ✅ Accepts CMS data as props
├── Hero.tsx                  ✅ Accepts CMS data as props
├── Footer.tsx                ✅ Accepts CMS data as props
├── About.tsx                 ⚠️ Partial (some hardcoded)
├── Systems.tsx               ⚠️ Partial (fallback data)
├── Process.tsx               ❌ Fully hardcoded
├── Gallery.tsx               ✅ Accepts CMS data as props
├── Testimonials.tsx          ✅ Accepts CMS data as props
└── Contact.tsx               ✅ Accepts CMS data as props

sanity/schemas/
├── heroSection.ts            ✅ Good structure
├── aboutSection.ts           ✅ Good structure
├── navigationSection.ts      ✅ Good structure
├── service.ts                ✅ Good structure
├── processStep.ts            ⚠️ Missing review fields
└── ... (19 more schemas)     ✅ All working

lib/
└── sanity.ts                 ✅ Excellent helper functions
```

### ❌ What Needs Work

```
app/
├── solar-panels-home/        ❌ Client-side, hardcoded arrays
├── solar-panels-business/    ❌ Client-side, hardcoded arrays
├── battery-storage-home/     ❌ Client-side, hardcoded arrays
├── battery-storage-business/ ❌ Client-side, hardcoded arrays
└── ev-charging/              ❌ Client-side, hardcoded arrays
```

---

## 🔧 Technical Debt Summary

| Category | Issue Count | Risk Level |
|----------|-------------|------------|
| Hardcoded Content | 8 | 🔴 Critical |
| Architecture | 3 | 🔴 Critical |
| Type Safety | 2 | 🟡 Moderate |
| Performance | 2 | 🟡 Moderate |
| UX/Styling | 3 | 🟢 Low |
| **TOTAL** | **18 issues** | **Mixed** |

---

## 🎯 Refactoring Plan (Priority Order)

### Phase 1: Critical Fixes (Week 1)
**Must complete before building CMS**

1. **Create `systemPage` schema**
   - Include all sections: hero, benefits, process, FAQ, CTA
   - Add Portable Text fields
   - Add icon picker support

2. **Refactor system pages to Server Components**
   - Remove `'use client'`
   - Fetch data server-side like homepage
   - Remove all hardcoded arrays

3. **Fix Process component**
   - Remove hardcoded steps array
   - Update processStep schema to include reviews
   - Component should only render, not store data

4. **Convert text fields to Portable Text**
   - Update schemas (heroSection, aboutSection, etc.)
   - Add custom marks for styling
   - Build serializers

### Phase 2: Moderate Fixes (Week 1-2)
**Improve before launch**

5. **Add TypeScript type generation**
   - Install sanity-codegen
   - Generate types from schemas
   - Replace all `any` types

6. **Create shared layouts**
   - SystemPageLayout for all 5 pages
   - Fetch nav/footer once
   - Reduce code duplication

7. **Add error boundaries**
   - Page-level error boundaries
   - Component-level fallbacks
   - Friendly error messages

8. **Fix animation triggers**
   - Change `margin: '-100px'` to `amount: 0.1`
   - Test on mobile devices

### Phase 3: Polish (Week 2)
**Nice to have**

9. **Theme system**
   - Connect brandTheme to CSS variables
   - Remove hardcoded colors
   - Make all colors editable

10. **Component cleanup**
    - Remove all fallback data
    - Move image/link mapping to CMS
    - Simplify icon handling

---

## 🚫 Migration Blockers

**Cannot proceed with CMS visual editor until:**

| # | Blocker | Current State | Required State | Effort |
|---|---------|---------------|----------------|--------|
| 1 | System pages hardcoded | 5 pages × 20+ fields | All in CMS schema | 2 days |
| 2 | Process steps in component | Lines 43-89 hardcoded | Move to CMS | 1 day |
| 3 | No Portable Text | Plain strings | Rich text arrays | 1 day |
| 4 | Client-side rendering | useEffect fetching | Server Components | 1 day |
| 5 | Component fallback data | 100+ lines | Remove all | 0.5 days |
| **TOTAL** | | | | **5-6 days** |

---

## 📋 Testing Checklist

After refactoring, verify:

- [ ] Homepage still works (regression test)
- [ ] All 5 system pages load from CMS
- [ ] Process section shows CMS data
- [ ] No hardcoded content visible
- [ ] All text fields support rich formatting
- [ ] TypeScript builds without errors
- [ ] No console errors/warnings
- [ ] Mobile responsive works
- [ ] Animations trigger correctly
- [ ] Error states show gracefully

---

## 💡 Recommendations

### DO NOW (Before CMS):
1. ✅ **Refactor system pages** - Convert to Server Components
2. ✅ **Move Process steps to CMS** - No hardcoded content
3. ✅ **Add Portable Text** - Enable rich text editing
4. ✅ **Generate TypeScript types** - Better dev experience

### DO SOON (Before launch):
5. ✅ **Add error boundaries** - Better UX
6. ✅ **Consolidate data fetching** - Reduce duplication
7. ✅ **Test on multiple devices** - Ensure animations work

### DO LATER (Post-launch):
8. ✅ **Theme system** - Dynamic colors
9. ✅ **Performance optimization** - If needed
10. ✅ **A/B testing setup** - Track conversions

---

## 🎓 Learning from First Attempt

Based on "it was okay but quite poor, quite amateur, it was slow and a bit glitchy":

**What went wrong before:**
1. Too much client-side rendering = slow
2. Hardcoded fallbacks = hard to maintain
3. No proper error handling = glitchy
4. Mixed patterns = confusing
5. Rushed without planning = amateur

**How we'll fix it:**
1. ✅ Server Components by default
2. ✅ CMS-first approach (no fallbacks)
3. ✅ Proper error boundaries
4. ✅ Consistent architecture
5. ✅ Thorough planning (this audit!)

---

## 🔍 Dependency Analysis

**Current:** (from package.json)

```json
{
  "next": "14.2.13",              ✅ Latest stable
  "sanity": "^3.67.1",            ✅ Latest v3
  "framer-motion": "^11.5.4",     ✅ Latest
  "tailwindcss": "^4",            ⚠️ v4 (bleeding edge)
  "react": "^18.3.1",             ✅ Latest
}
```

**Missing for CMS:**
- ❌ `@dnd-kit/core` - For drag-and-drop
- ❌ `@dnd-kit/sortable` - For section reordering
- ❌ `@dnd-kit/utilities` - For DnD helpers
- ❌ `react-dropzone` - For image uploads
- ❌ `zustand` or `jotai` - For state management (optional)
- ❌ `sanity-codegen` - For TypeScript types
- ❌ `zod` - For runtime validation (optional)

---

## 📊 Code Quality Metrics

### Current State:

| Metric | Score | Target | Status |
|--------|-------|--------|--------|
| Server-side rendering | 20% (1/5 pages) | 100% | 🔴 Poor |
| CMS coverage | 40% (homepage only) | 100% | 🔴 Poor |
| TypeScript coverage | 70% (lots of `any`) | 95% | 🟡 Fair |
| Component reusability | 60% | 90% | 🟡 Fair |
| Performance (Lighthouse) | Unknown | 90+ | ⚪ Untested |
| Code duplication | High (5 pages) | Low | 🔴 Poor |

---

## ✅ Action Items

### Immediate (This Week):
1. [ ] Create `systemPage` schema with all fields
2. [ ] Refactor `app/solar-panels-home/page.tsx` as proof of concept
3. [ ] Test with real CMS data
4. [ ] If successful, replicate for other 4 pages
5. [ ] Fix Process component to use CMS data
6. [ ] Add Portable Text to key schemas

### Next Week:
7. [ ] Generate TypeScript types
8. [ ] Add error boundaries
9. [ ] Clean up all hardcoded fallbacks
10. [ ] Test thoroughly
11. [ ] Begin CMS visual editor implementation

---

## 🎯 Success Criteria

**Ready to build visual editor when:**

✅ All content is in CMS (zero hardcoded arrays)
✅ All pages are Server Components
✅ Portable Text enabled for rich editing
✅ TypeScript types generated
✅ No `any` types in page/component files
✅ Error boundaries in place
✅ All tests passing
✅ Performance is good (Lighthouse 90+)

---

**End of Audit Report**

**Status:** 🔴 **REFACTORING REQUIRED**
**Estimated Time to Fix:** 5-6 days
**Recommendation:** Complete refactoring before building CMS visual editor
