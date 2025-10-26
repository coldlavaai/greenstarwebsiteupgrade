# N8N Integration Guide: Sanity Knowledge Base

## Overview

This guide shows you how to integrate the Greenstar Solar knowledge base (built in Sanity) with your n8n DBR (Database Reactivation) workflow to provide accurate product information to your AI SMS generator.

## Sanity API Access

### API Endpoint
```
https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production
```

### Authentication
- **Public queries** (read-only): No authentication required
- **Private queries**: Add `Authorization: Bearer YOUR_TOKEN` header

## Integration Methods

### Method 1: HTTP Request Node (Recommended)

1. Add an **HTTP Request** node to your n8n workflow
2. Configure:
   - **Method**: GET
   - **URL**: `https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production`
   - **Query Parameters**:
     - `query`: Your GROQ query (URL encoded)

### Method 2: Function Node with GROQ Query

For more complex queries, use a Function node to construct and execute the query.

## Sample GROQ Queries

### 1. Get All Products

```groq
*[_type == "product"] | order(featured desc, name asc) {
  _id,
  name,
  brand,
  model,
  category->{name},
  shortDescription,
  keyFeatures,
  specifications,
  warranty,
  tags,
  inStock
}
```

**Use case**: Get a complete product list for your AI to reference

---

### 2. Search Products by Category

```groq
*[_type == "product" && category->slug.current == "solar-panels"] {
  name,
  brand,
  model,
  shortDescription,
  keyFeatures[0...3],
  "specs": specifications[0].specs[0...5] {
    name,
    value,
    unit
  }
}
```

**Use case**: When customer asks about solar panels specifically

---

### 3. Get Product by Name (Fuzzy Search)

```groq
*[_type == "product" && name match "*Sigen*"] {
  name,
  brand,
  shortDescription,
  keyFeatures,
  specifications[0...2] {
    category,
    specs[0...3]
  },
  warranty
}
```

**Use case**: Customer mentions a specific product name

---

### 4. Get FAQs by Category

```groq
*[_type == "faq" && category == "products" && isPublished == true] | order(order asc) {
  question,
  answer,
  category,
  relatedProducts[]->{name, brand}
}
```

**Use case**: Answer common questions about products

---

### 5. Search Knowledge Base

```groq
*[_type == "knowledgeBase" && isPublished == true && (
  title match "*battery*" ||
  summary match "*battery*" ||
  tags[] match "*battery*"
)] | order(priority desc) {
  title,
  summary,
  category,
  content,
  relatedProducts[]->{name, brand},
  tags
}
```

**Use case**: Deep dive into technical topics when needed

---

### 6. Get Complete Product Details

```groq
*[_type == "product" && _id == "prod-sigen-battery-8kw"][0] {
  name,
  brand,
  model,
  shortDescription,
  fullDescription,
  keyFeatures,
  specifications[] {
    category,
    specs[] {
      name,
      value,
      unit
    }
  },
  warranty {
    product,
    performance,
    details
  },
  certifications,
  compatibility[]->{name, brand},
  tags,
  inStock,
  featured
}
```

**Use case**: Get full details for a specific product when customer shows strong interest

---

### 7. Get Featured Products

```groq
*[_type == "product" && featured == true && inStock == true] | order(name asc) [0...5] {
  name,
  brand,
  shortDescription,
  keyFeatures[0...3],
  "topSpec": specifications[0].specs[0...2]
}
```

**Use case**: Recommend top products to customers

---

### 8. Get Products with Specifications Filter

```groq
*[_type == "product" && specifications[].specs[].value match "*8*" && category->slug.current == "inverters"] {
  name,
  brand,
  specifications[0].specs[] {
    name,
    value,
    unit
  }
}
```

**Use case**: Find products by specific technical requirements

---

### 9. Get Related Products (Cross-sell)

```groq
*[_type == "product" && _id == "prod-sigen-controller-8kw-sp"][0] {
  name,
  "compatibleProducts": compatibility[]->{
    name,
    brand,
    category->{name},
    shortDescription
  }
}
```

**Use case**: Suggest compatible products during conversation

---

### 10. Get All FAQs with Related Products

```groq
*[_type == "faq" && isPublished == true] | order(order asc) {
  question,
  answer,
  category,
  "products": relatedProducts[]->{
    name,
    brand,
    shortDescription
  }
}
```

**Use case**: Comprehensive FAQ lookup with product context

---

## N8N Workflow Setup Example

### Workflow Structure

```
[Trigger: SMS Received]
  ↓
[Extract Customer Query]
  ↓
[Analyze Query Intent]
  ↓
[HTTP Request: Query Sanity KB] ← Based on intent
  ↓
[AI Node: Generate Response] ← With KB data as context
  ↓
[Send SMS Reply]
```

### HTTP Request Node Configuration

**Node Name**: Query Product Knowledge Base

**Settings**:
- URL: `https://kpz3fwyf.api.sanity.io/v2024-01-01/data/query/production`
- Method: GET
- Send Query Parameters: ON
  - Name: `query`
  - Value: (Your GROQ query from above)

**Example Query Parameter** (URL will encode automatically):
```
*[_type == "product" && featured == true][0...3]{name,brand,shortDescription,keyFeatures[0...3]}
```

---

## AI Context Injection

### Preparing KB Data for AI

After fetching data from Sanity, format it for your AI model:

```javascript
// In a Function node
const products = $input.all()[0].json;

// Format for AI context
const context = products.map(p =>
  `Product: ${p.name} (${p.brand})
   Description: ${p.shortDescription}
   Key Features: ${p.keyFeatures.join(', ')}
   Warranty: ${p.warranty?.product || 'Standard'}`
).join('\n\n');

return [{ json: { context } }];
```

### AI Prompt Template

```
You are a helpful sales assistant for Greenstar Solar.

KNOWLEDGE BASE CONTEXT:
{{$json.context}}

CUSTOMER MESSAGE:
{{$json.customerMessage}}

INSTRUCTIONS:
- Answer based on the knowledge base context provided
- Be accurate and specific about product specs
- Mention warranties and certifications when relevant
- Recommend products that match customer needs
- Keep responses concise for SMS (160 chars ideal, 320 max)
- Always be friendly and professional

GENERATE RESPONSE:
```

---

## Query Optimization Tips

1. **Limit Results**: Use `[0...5]` to limit response size
2. **Select Only Needed Fields**: Don't fetch entire documents if you only need name and price
3. **Use References**: Dereference with `->` to get related data
4. **Filter Early**: Apply `_type`, `category`, and `inStock` filters first
5. **Order Results**: Use `| order(priority desc)` for consistent ordering

---

## Testing Queries

### Test in Sanity Vision

1. Go to your Sanity Studio
2. Open "Vision" from the menu
3. Paste your GROQ query
4. Click "Fetch" to see results
5. Refine query as needed

### Test in N8N

1. Create a manual trigger node
2. Add HTTP Request node with your query
3. Execute workflow
4. Check output in node inspector

---

## Common Use Cases

### Scenario 1: "Tell me about your solar panels"

**GROQ Query**:
```groq
*[_type == "product" && category->slug.current == "solar-panels" && featured == true][0...2] {
  name,
  brand,
  shortDescription,
  keyFeatures[0...3],
  "efficiency": specifications[category == "Electrical Characteristics (STC)"][0].specs[name == "Module Efficiency"][0].value,
  "warranty": warranty.product
}
```

**AI Response Example**:
> "We offer premium AIKO Neostar 3S54 panels with 23% efficiency and 25-year warranty. Key features: N-Type ABC cells, excellent shading tolerance, 460-490W output. Perfect for maximizing roof space!"

---

### Scenario 2: "What battery do you recommend for 8kW system?"

**GROQ Query**:
```groq
*[_type == "product" && category->slug.current == "battery-storage" && specifications[].specs[].value match "*8*"][0...3] {
  name,
  brand,
  shortDescription,
  "capacity": specifications[category == "Performance"][0].specs[name match "*capacity*"][0],
  warranty
}
```

---

### Scenario 3: "Do you have EV chargers?"

**GROQ Query**:
```groq
*[_type == "product" && category->slug.current == "ev-chargers" && inStock == true] {
  name,
  brand,
  shortDescription,
  keyFeatures[0...4],
  "power": specifications[0].specs[name match "*power*"][0]
}
```

---

## Advanced Features

### Dynamic Query Building

Build queries dynamically based on customer input:

```javascript
// Function node: Build dynamic query
const customerMessage = $json.message.toLowerCase();
let category = 'product';

if (customerMessage.includes('panel')) category = 'solar-panels';
if (customerMessage.includes('battery')) category = 'battery-storage';
if (customerMessage.includes('inverter')) category = 'inverters';
if (customerMessage.includes('charger')) category = 'ev-chargers';

const query = `*[_type == "product" && category->slug.current == "${category}" && featured == true][0...3]{name,brand,shortDescription,keyFeatures[0...3]}`;

return [{ json: { query } }];
```

### Caching Strategy

For frequently accessed data, use n8n's **Sticky** node to cache results:

1. Query Sanity once per day/hour
2. Store results in Sticky node
3. Reference cached data in subsequent workflows
4. Refresh cache on schedule

---

## Error Handling

```javascript
// Function node: Handle empty results
const products = $input.all()[0].json;

if (!products || products.length === 0) {
  return [{
    json: {
      response: "I apologize, but I don't have specific information on that product right now. Would you like me to have a specialist call you?"
    }
  }];
}

// Continue with normal processing
return [{ json: { products } }];
```

---

## Performance Best Practices

1. **Cache Static Data**: Categories, FAQs, featured products
2. **Paginate Large Results**: Use `[0...10]` instead of fetching all
3. **Use Projections**: Only fetch fields you need
4. **Combine Queries**: Use GROQ's power to join data in one request
5. **Monitor Query Time**: Track slow queries and optimize

---

## Support & Resources

- **Sanity GROQ Documentation**: https://www.sanity.io/docs/groq
- **N8N HTTP Request Node**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/
- **Sanity Vision (Query Tester)**: Access via Sanity Studio

---

## Next Steps

1. ✅ Set up HTTP Request node in n8n
2. ✅ Test basic product query
3. ✅ Integrate with AI node
4. ✅ Add error handling
5. ✅ Test full workflow with real customer queries
6. ✅ Monitor and optimize based on usage

---

**Questions?** Refer to the populated data in Sanity Studio to see exactly what fields are available for each product.
