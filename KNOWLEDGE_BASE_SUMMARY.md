# Greenstar Solar Knowledge Base - Setup Complete! ✅

## What Has Been Created

### 1. Sanity CMS Schemas (4 new types)

Located in: `~/Documents/greenstar-solar-redesign/sanity/schemas/`

#### **productCategory.ts**
- Categories for organizing products (Solar Panels, Inverters, Batteries, EV Chargers, Energy Controllers)
- Fields: name, slug, description, icon

#### **product.ts**
- Complete product information system
- Fields include:
  - Basic info: name, brand, model, category
  - Descriptions: short and full
  - Technical specifications (structured by category)
  - Key features array
  - Warranty information
  - Certifications
  - Compatibility references
  - Stock status, pricing, tags
  - Images gallery

#### **knowledgeBase.ts**
- Articles for technical documentation, guides, and how-tos
- Categories: Installation, Technical, Maintenance, Troubleshooting, FAQ, Product Info, Pricing, Warranty, General
- Rich text content with images
- Related products
- Priority-based ordering for search results

#### **faq.ts**
- Frequently Asked Questions
- Categorized (Products, Installation, Pricing, Warranties, Technical, General)
- Related products linking
- Display order control

### 2. Sample Data Populated

✅ **5 Product Categories Created**
- Solar Panels
- Inverters
- Battery Storage
- EV Chargers
- Energy Controllers

✅ **8 Products Created** (from your PDFs):
1. AIKO Neostar 3S54 460W Solar Panel
2. Sigen Energy Controller 8.0 kW Single Phase
3. Sigen Battery 8.0 kWh
4. EcoFlow PowerOcean Single Phase System
5. Fox ESS KH 8kW Hybrid Inverter
6. Fox ESS EVO 10.8kW/10.24kWh All-in-One System
7. Fox ESS EP6 Battery (5.76kWh)
8. Sigen EV DC Charging Module 25kW

✅ **8 FAQs Created**:
- N-Type vs traditional solar panels
- LFP battery lifespan
- Hybrid inverters explained
- MPPT trackers explained
- Backup power duration
- V2X capability
- System expansion
- Warranty coverage

✅ **3 Knowledge Base Articles Created**:
- How to Size Your Solar and Battery System
- Understanding MPPT Tracker Configuration
- Battery Safety Features and Protection Systems

### 3. Integration Tools

#### **populate-knowledge-base.ts**
Location: `~/Documents/greenstar-solar-redesign/scripts/populate-knowledge-base.ts`

- TypeScript script to populate Sanity with all product data
- Run with:
  ```bash
  cd ~/Documents/greenstar-solar-redesign
  SANITY_API_WRITE_TOKEN=your_token npx tsx scripts/populate-knowledge-base.ts
  ```

#### **N8N_INTEGRATION_GUIDE.md**
Location: `~/Documents/greenstar-solar-redesign/N8N_INTEGRATION_GUIDE.md`

Complete guide with:
- API endpoint configuration
- 10 ready-to-use GROQ query examples
- N8N workflow setup instructions
- AI context injection examples
- Error handling patterns
- Performance optimization tips

---

## How to Use in N8N

### Quick Start

1. **Add HTTP Request Node** in your n8n workflow

2. **Configure the node**:
   - Method: `GET`
   - URL: `https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production`
   - Query Parameters:
     - Name: `query`
     - Value: Your GROQ query (see examples below)

3. **Use the response** in your AI node for context

### Example Queries for Common Scenarios

#### Get All Featured Products:
```groq
*[_type == "product" && featured == true && inStock == true][0...3]{name,brand,shortDescription,keyFeatures[0...3]}
```

#### Search by Category (e.g., batteries):
```groq
*[_type == "product" && category->slug.current == "battery-storage"]{name,brand,shortDescription,specifications[0].specs[0...3]}
```

#### Get Product by Name (fuzzy search):
```groq
*[_type == "product" && name match "*Sigen*"]{name,brand,shortDescription,keyFeatures,warranty}
```

#### Get FAQs:
```groq
*[_type == "faq" && category == "products" && isPublished == true] | order(order asc){question,answer,relatedProducts[]->{name}}
```

#### Search Knowledge Base:
```groq
*[_type == "knowledgeBase" && isPublished == true && tags[] match "*battery*"] | order(priority desc){title,summary,content}
```

---

## AI Integration Pattern

### Workflow Structure

```
[SMS Trigger]
    ↓
[Analyze Intent] → Determine what customer is asking about
    ↓
[Query Sanity KB] → Fetch relevant products/FAQs/articles
    ↓
[Format Context] → Structure data for AI
    ↓
[AI Generate Response] → Create personalized SMS
    ↓
[Send SMS]
```

### Sample AI Prompt Template

```
You are a helpful Greenstar Solar sales assistant.

PRODUCT KNOWLEDGE:
{{$json.kbContext}}

CUSTOMER QUESTION:
{{$json.customerMessage}}

INSTRUCTIONS:
- Answer based on the product knowledge provided
- Be specific about specs, warranties, features
- Keep response under 320 characters for SMS
- Recommend products that match needs
- Always be professional and helpful

GENERATE RESPONSE:
```

---

## API Endpoint Details

### Base URL
```
https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production
```

### Authentication
- **Public Read**: No authentication required for queries
- **Write Operations**: Add `Authorization: Bearer YOUR_TOKEN` header

### Query Parameter
- **Name**: `query`
- **Value**: Your GROQ query (URL encoding handled automatically by n8n)

### Response Format
```json
{
  "query": "your groq query here",
  "result": [ /* array of results */ ],
  "ms": 42
}
```

---

## Testing Your Setup

### Test in Sanity Vision (Recommended)

1. Go to your Sanity Studio: https://greenstarsolar.sanity.studio
2. Click "Vision" in the menu
3. Paste any GROQ query
4. Click "Fetch" to see results
5. Refine and test before using in n8n

### Test with cURL

```bash
# Get all categories
curl "https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22productCategory%22%5D%7Bname%2C%20slug%7D"

# Get featured products
curl "https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production?query=*%5B_type%20%3D%3D%20%22product%22%20%26%26%20featured%20%3D%3D%20true%5D%5B0...3%5D%7Bname%2C%20brand%2C%20shortDescription%7D"
```

---

## Data Structure Reference

### Product Fields Available

```typescript
{
  name: string
  brand: string
  model: string
  category: reference
  shortDescription: string
  fullDescription: richText[]
  images: image[]
  specifications: {
    category: string
    specs: {
      name: string
      value: string
      unit: string
    }[]
  }[]
  keyFeatures: string[]
  warranty: {
    product: string
    performance: string
    details: string
  }
  certifications: string[]
  compatibility: reference[]
  tags: string[]
  inStock: boolean
  featured: boolean
  price: number
}
```

### FAQ Fields

```typescript
{
  question: string
  answer: richText[]
  category: string
  relatedProducts: reference[]
  order: number
  isPublished: boolean
}
```

### Knowledge Base Fields

```typescript
{
  title: string
  category: string
  summary: string
  content: richText[]
  relatedProducts: reference[]
  tags: string[]
  priority: number
  isPublished: boolean
}
```

---

## Next Steps

### 1. Expand Product Data
- Add more products from additional PDFs
- Add product images
- Include pricing information
- Link compatible products

### 2. Enhance Knowledge Base
- Add installation guides
- Create troubleshooting articles
- Add more FAQs based on customer questions
- Include warranty documentation

### 3. Optimize N8N Integration
- Set up caching for frequently accessed data
- Create dynamic query builders based on intent
- Add fallback responses for unknown queries
- Monitor query performance

### 4. Test & Refine
- Test with real customer queries
- Refine AI prompts based on responses
- Optimize GROQ queries for speed
- Add more product cross-references

---

## Maintenance

### Adding New Products

Option 1: Via Sanity Studio
1. Go to Sanity Studio
2. Create new Product document
3. Fill in all fields
4. Publish

Option 2: Via Script
1. Edit `scripts/populate-knowledge-base.ts`
2. Add new product object to `products` array
3. Run script again

### Updating Existing Data

Option 1: Via Sanity Studio (Recommended)
- Easy visual interface
- Preview changes
- Instant updates

Option 2: Via API
- Programmatic updates
- Bulk operations
- Automated syncing

---

## Troubleshooting

### Query Returns Empty Array
- Check `isPublished` field (should be `true`)
- Verify `inStock` field
- Check category reference is correct
- Test simpler query first

### Slow Query Performance
- Limit results with `[0...10]`
- Only select needed fields
- Use indexed fields (like `_type`, `category`)
- Avoid complex nested queries

### Authentication Errors
- Ensure token is valid
- Check token has correct permissions
- Use public queries when possible

---

## Resources

- **Full Integration Guide**: `N8N_INTEGRATION_GUIDE.md`
- **Population Script**: `scripts/populate-knowledge-base.ts`
- **Schema Files**: `sanity/schemas/`
- **Sanity GROQ Docs**: https://www.sanity.io/docs/groq
- **N8N HTTP Request Docs**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/

---

## Summary

You now have a fully functional knowledge base in Sanity CMS that:

✅ Contains all your product data from the PDFs
✅ Is structured for easy querying via GROQ
✅ Can be accessed via simple HTTP requests in n8n
✅ Provides rich context for AI-powered SMS responses
✅ Is easily expandable and maintainable
✅ Integrates seamlessly with your existing Greenstar website

**Your DBR workflow can now provide accurate, detailed product information to customers automatically!** 🎉
