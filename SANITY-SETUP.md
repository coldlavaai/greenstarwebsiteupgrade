# 🚀 Sanity CMS Setup Guide

## Quick Start

### Step 1: Access the Studio

Start your development server:
```bash
npm run dev
```

Visit: **http://localhost:3000/studio**

### Step 2: Create Initial Content (IMPORTANT!)

When you first open the Studio, you'll see sections but clicking them gives a "missing document ID" error. This is normal for new installations.

**To fix this**, just click on any section and it will automatically create the document for you. Or, you can click the "Create" button when prompted.

### Step 3: Start Editing!

Once the documents are created (either automatically or by clicking Create):

1. Click on any section (e.g., "Hero Section")
2. Fill in the text fields
3. Upload images by dragging and dropping
4. Click **"Publish"** (top right) to save changes

### Step 4: See Your Changes Live

1. Make changes in Studio and click **"Publish"**
2. Wait 60 seconds for cache to clear
3. Refresh your website to see changes
4. For instant preview: Open your website in another browser tab and refresh after publishing

## Understanding the Structure

### ⚙️ Settings
**One-time setup** - Set these once and forget:
- **Site Settings** - Company info, contact details, social media
- **Brand & Theme** - Colors, fonts, favicon

### 📄 Page Sections
**Edit anytime** - Change the content on each section:
- **Navigation** - Menu items, logo
- **Hero Section** - Main headline and buttons
- **About Section** - Company description
- **Systems Section** - Your solar offerings
- **Process Section** - How it works
- **Testimonials Section** - Customer reviews
- **Gallery Section** - Project photos
- **Contact Section** - Contact form text
- **Footer** - Footer content and links

### 📦 Content Items
**Add multiple** - Create as many as you need:
- **Services/Systems** - Individual products (panels, batteries)
- **Testimonials** - Customer reviews
- **Gallery Items** - Project photos
- **Process Steps** - Steps in your process

## Tips for First-Time Users

### Creating Your First Document

1. Go to **Page Sections → Hero Section**
2. Click the **"Create"** button (or it auto-creates)
3. You'll see a form with all the fields
4. Fill in the text
5. Click **"Publish"** in the top right

### Uploading Images

1. Find an image field (e.g., Hero Background)
2. Click on it or drag & drop an image
3. Adjust the "hotspot" if needed (for smart cropping)
4. Click "Upload"
5. Publish your changes

### Changing Colors

1. Go to **Settings → Brand & Theme**
2. Click on any color field
3. Use the color picker or paste a hex code (#8cc63f)
4. Publish changes
5. Your entire site updates with new colors!

### Adding a New Service

1. Click **Services/Systems** in the sidebar
2. Click **"+ Create"**
3. Fill in:
   - Title (e.g., "Solar Panels for Home")
   - Description
   - Features (click "Add item" for each)
   - Upload an image
4. Publish

## Troubleshooting

### "Missing Document ID" Error
**Solution**: Click the **"Create"** button that appears. This creates the document and you can start editing.

### Changes Not Appearing on Website
1. Make sure you clicked **"Publish"** (not just save)
2. Wait 60 seconds for cache to clear
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

### Images Not Uploading
1. Check file size (max 10MB)
2. Use supported formats: JPG, PNG, SVG, GIF
3. Try a different browser if issues persist

## Best Practices

✅ **Always Publish** - Draft changes don't go live until you publish

✅ **Use Hotspots** - When uploading images, adjust the hotspot to choose the focal point

✅ **Preview Your Changes** - Open your website in another tab to preview changes after publishing

✅ **Save Frequently** - Studio auto-saves drafts as you type

✅ **Use the History** - Click the clock icon to see and restore previous versions

## Quick Reference

| Task | Location |
|------|----------|
| Change company name | Settings → Site Settings |
| Change brand colors | Settings → Brand & Theme |
| Edit homepage headline | Page Sections → Hero Section |
| Add a new service | Services/Systems → + Create |
| Upload logo | Settings → Site Settings → Logo |
| Change menu items | Page Sections → Navigation |
| Edit footer links | Page Sections → Footer |

## Getting Help

- **Main Guide**: See `SANITY-CMS-GUIDE.md` for detailed instructions
- **Developer Guide**: See `COMPONENT-CONNECTION-EXAMPLES.md`
- **Sanity Docs**: https://www.sanity.io/docs
- **Support**: Contact your developer

---

**Ready to edit?** Visit http://localhost:3000/studio and start creating! 🎨
