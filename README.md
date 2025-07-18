# SparkVoice

**Your list, your voice, your cart — effortlessly.**  
Empowering every Indian to shop without barriers.

---

## Our Idea

SparkVoice is India's most intelligent, multimodal AI, purpose-built to unlock digital commerce for the next 500 million value-first shoppers. It effortlessly transforms everyday human intent—a photo of a handwritten grocery list, a voice note in a native dialect, or a simple thought—into a complete, value-optimized, delivered shopping cart. We turn the habit of saving ₹5 into seamless reality, proving Walmart's Everyday Low Price commitment at every step.

---

## The Problem We're Solving

Walmart’s next phase of growth in India depends on reaching the 500 million consumers in Tier 2/3 cities and rural areas. But conventional e-commerce has stalled—not because of poor technology, but because it overlooks how India truly shops and thinks.

In India, saving ₹5 isn’t just a deal — it’s a habit, a mindset, and sometimes, a need. We see this value-first psychology daily:  
- A father habitually comparing kirana prices  
- A student walking to a farther store for cheaper books  
- A mother bargaining for five minutes to save five rupees  
Convenience is secondary to value – this is the real shopping psychology across a massive part of India.

Digital apps today are either too complex or too disconnected from these deeply ingrained behaviors.  
We see this gap daily:
- A mother in a village still trusts her handwritten shopping list.
- A first-time internet user finds filters and carts confusing.
- A busy parent prefers to speak a quick voice note than tap 20 times.

These aren’t edge cases—they are the average Indian shopper, representing the heart of the next billion users.

But this friction isn’t just digital for consumers. Local kirana stores—Walmart’s crucial last-mile lifeline—still manually transcribe these same lists and spoken orders, wasting precious time and effort. Worse, there’s often no real-time price clarity, which directly breaks the trust chain with both the consumer and the store.

---

## Walmart India's Focus: The Everyday Low Price Engine

Walmart U.S. built its empire by guaranteeing Everyday Low Prices, backed by relentless real-time competitive price monitoring and vendor negotiations. To achieve the same dominance in India, the challenge is deeper:

- Prices change weekly—even daily—in crucial categories like fruits, staples, and perishables.
- Customers expect hyper-local price relevance, specific to their neighborhood.
- Trust only builds when you can show savings, not just say it.

SparkVoice isn't just about smarter shopping; it's about fundamentally proving to every Indian father, mother, student, and kirana shop that Walmart offers undeniable, real value. If Walmart wants to win the next 500 million consumers, price intelligence isn’t a feature—it’s the absolute foundation.

---

## How We Solve It: SparkVoice

SparkVoice isn't just an app; it's a compassionate, intelligent bridge designed to connect every Indian consumer to digital commerce. We've built a full-stack conversational commerce ecosystem that understands users in the most natural ways possible, without forcing them to adapt to complex systems.

### A Truly Multimodal Shopping Experience

We eliminate the "tyranny of the search bar." With SparkVoice, users can simply snap a photo of a handwritten list in any language, record a voice note in a regional dialect, or just type a thought. Our AI instantly comprehends their intent and builds a cart.

### A Suite of Hyper-Personalized AI Assistants

Our AI powers a range of intelligent tools that adapt to individual needs:

- **Contextual AI Assistant (SparkCart AI):** A family preparing for a festival can simply say, "I need items for a Diwali pooja," and our AI curates a cart with everything from diyas and sweets to fresh flowers.
- **SparkSaver (Value Cart):** Users set a weekly budget like, "₹1500 for my family of four," and our AI builds the most value-for-money cart, prioritizing essentials and sale items to help them manage expenses.
- **AI Pantry Management:** A quick snap of a kitchen shelf allows our AI to identify what's running low—like the last bit of tea powder or a nearly empty jar of pickles—and suggest a restock list for automated subscriptions and deal alerts.
- **SparkDiet Planner:** Get a personalized grocery cart based on health goals, or snap a photo of a meal to instantly analyze its nutritional content.
- **SparkGreen Sustainability:** At checkout, users are gently nudged with eco-friendly alternatives, like swapping plastic detergent bags for refill pouches, and can choose carbon-neutral delivery options to offset their footprint.

At Walmart, the promise of ‘Everyday Low Prices’ is backed by real-time data, not just marketing. We bring that same trust-building engine to India through SparkVoice’s price intelligence tools.

### 🔍 Instant Price Match

Users can scan a local kirana bill to see a line-by-line comparison with Walmart’s prices. We highlight exact savings, empowering users to make informed, confident decisions. This feature directly tackles the price trust barrier in Bharat.

### 🛡️ Instant Price Defender

Behind the scenes, our system uses a live competitive price-checking engine to continuously compare Walmart’s prices with:
- Local kirana rates (via scanned bills and market APIs)
- Regional e-commerce platforms

If we find a better deal, we automatically match or beat it before checkout — no user effort needed.

### 💰 Savings Vault

Every price match and smart purchase adds to the Savings Vault — a visual tracker of how much a user has saved over time. This reinforces financial confidence, especially among first-time digital shoppers.

---

## Our Technology Stack

### Core Framework
- **Next.js 15** leveraging App Router, Server Components, and Turbopack  
  - Enabled server-first architecture with streaming SSR.
  - Server Components offload rendering logic to the server, keeping client bundles lean.
  - Turbopack ensures blazing-fast build and dev refresh times — ideal for AI iteration cycles.

### Frontend
- **React 18** with **TypeScript**
  - Fully type-safe and componentized UI enabling multimodal interaction flows (OCR preview, voice input, cart visualization).
  - React’s concurrent rendering ensures responsiveness even under async AI load.

### UI & Styling
- **ShadCN UI + Tailwind CSS**
  - Built a scalable, accessible, and mobile-first UI system using utility-first styling.
  - Optimized for low-bandwidth users with minimal layout shift and fast render time.

### AI Orchestration & Backend
- **Google Genkit + GCP Cloud Functions**
  - Genkit orchestrates prompt flows, vision models, and pricing logic.
  - Integrated fallback/error handling and tool chaining (OCR, TTS, nutrition APIs, etc.).
  - GCP Cloud Buckets handle image storage (grocery lists, scanned bills, pantry photos), not Firebase Storage — for better CDN access and persistence.

### AI Models & Customization
- **Gemini 2.0 Flash:** Fine-tuned on CRAFT (Character Region Awareness for Text Detection) and TrOCR for improved OCR accuracy on Indian handwriting and vernacular lists. Handles end-to-end contextual cart generation from image/voice/text input.
- **Gemini 2.0 Flash – Image Generation:** Used to dynamically generate user avatars and preview cart items in cases where image links are unavailable.
- **Gemini 2.5 Flash – Text-to-Speech (TTS):** Multilingual voice feedback used in rural-access flows, integrated via Genkit agents.

### Database & Security
- **Firebase Firestore** with role-based rules
  - Cart history, pantry scans, community polls, and price-match logs are stored in a queryable NoSQL schema.
  - **Firebase Auth** secures user-specific data, allowing full personalization at scale.

### External Integrations
- **CalorieNinjas API** for nutritional breakdown in SparkDiet Planner.
- **Google Custom Search + scraped datasets** for cart item image completion and fallback.
- **PriceMatch APIs** / simulated kirana rate inputs power Instant Price Defender.

---

## 🚀 2-Minute Working Demo

Watch our solution in action, demonstrating how a user can go from a simple voice note to a complete, optimized shopping cart in seconds.  
[Watch the demo on YouTube](https://youtu.be/p1CGHGFVRmQ)

---
