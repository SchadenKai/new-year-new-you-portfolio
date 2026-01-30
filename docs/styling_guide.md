# Styling Guide: The Contextual Architect

## 1. Design Philosophy
**"Developer Brutalism / The Modern Feed"**
The design mimics the clean, content-first, developer-centric aesthetic of **dev.to**. It prioritizes readability, distinct blocks, and standard UI patterns over "glassy" effects.
It blends the **Standard Dev.to UI** (clean, card-based) with the **"New Year, New You" Challenge Theme** (Pixel Art / Retro Space).

*   **Mode**: Dark Mode Default (matching `dev.to`'s dark theme).
*   **Vibe**: "Boxed & Bold". High contrast lines, solid backgrounds, functional aesthetics.
*   **Core Metaphor**: The "Feed" (Portfolio) and the "Comment Section" (Chat).
*   **Key Behavior**: Snappy. Interactions are instant (`duration-100` or `duration-200`), no long fades.

---

## 2. Color System (Tailwind CSS)

### Base - The Canvas (Dev.to Dark)
*   **Background**: `#000000` (Absolute Black) or `#090909` (Very Dark Gray - prefer this for app bg)
*   **Surface (Cards)**: `#171717` (Neutral-900)
    *   *Alternative*: `#262626` (Neutral-800) for hover states.
*   **Border**: `#404040` (Neutral-700) - Strong, visible borders are key to this style.

### Primary - The Brand (Dev.to Blue & Challenge Retro)
*   **Dev Blue**: `#3B49DF` (Standard Brand) -> Used for primary buttons even in dark mode (or slightly lighter `#6366f1` Indigo-500).
*   **Retro Purple**: `#6949FF` (Challenge accent)
*   **Pixel Pink**: `#F24E1E` (Accents)
*   **Space Cyan**: `#5EEAD4` (Teal-300) - Good for high contrast text.

### Functional Colors
*   **Text Primary**: `#FAFAFA` (Neutral-50)
*   **Text Secondary**: `#A3A3A3` (Neutral-400)
*   **Link/Action**: `#818CF8` (Indigo-400) - Underlined on hover.
*   **Tags**:
    *   `bg-gray-800` text `gray-300` border `gray-700`
    *   Randomized "Hashtag" colors (Green, Yellow, Pink borders/text).

---

## 3. Typography

**Font Family**: System Stack is preferred for that authentic "Dev Platform" feel.
`font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";`

*   **Implementation**: In Tailwind config, set `sans` to this stack.
*   **Headers**: Bold (`font-bold`), rarely light.
*   **Monospace**: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace` (for code and tags).

### Hierarchy
*   **Display (Hero)**: `text-5xl` to `text-7xl`, `font-extrabold`, letter-spacing `-0.025em`.
*   **Card Title**: `text-2xl`, `font-bold`.
*   **Sub-text**: `text-base` or `text-sm`, `text-neutral-400`.

---

## 4. Component Architecture & Styling

### 4.1 The Context Layer (Chat as "Comments/Thread")
To feel like `dev.to`, the chat should resemble a comment thread or the interactive "Write a Post" editor.
*   **Container**: `max-w-[65ch]` (optimal reading width).
*   **Input Area**:
    *   Looks like the Markdown Editor.
    *   `bg-[#171717]`, `border-t border-[#404040]`.
    *   Buttons: "Preview" (gray), "Submit" (solid blue).
*   **Bubbles**:
    *   **AI**: Looks like a comment. User avatar left, Name top, text block. Markdown styling supported.
    *   **User**: Same structure, maybe slight background highlight (`bg-[#262626]`).

### 4.2 The Content Layer (The Feed)
The portfolio sections (Projects, Experience) should look like **Feed Cards**.
*   **Card Style**:
    *   `bg-[#171717]`
    *   `border border-[#404040]`
    *   `rounded-md` (0.375rem) - Not `rounded-xl` or `2xl`.
    *   `p-4` or `p-6`
    *   *Hover*: `border-[#737373]` (Neutral-500) transition-colors.
    *   *Shadow*: `shadow-sm` (subtle) or `shadow-[4px_4px_0px_#000000]` for a "Retro/Brutalist" pop if leaning into the challenge theme.
*   **Cover Image**: Top of card, aspect-video, `rounded-t-md`.

### 4.3 Highlighting (The "Reaction")
When AI highlights something, it shouldn't just glow; it should look like a **Top Post** or **Featured**.
*   **Visual**:
    *   Thick border: `border-l-4 border-indigo-500`.
    *   Badge: "Generated for You" or "Relevant" (Pill shape, `bg-yellow-100 text-yellow-800` / Dark: `bg-yellow-900 text-yellow-300`).

---

## 5. Layout & Organization
Dev.to uses a distinct **3-Column Layout** (Left Sidebar, Main Feed, Right Widgets).
We can adapt this for the portfolio:

*   **Left (Stick)**: "Navigation" (Overview, Skills, Experience links).
*   **Center (Scroll)**: The Content Feed (The actual portfolio items).
*   **Right (Context)**: The AI Chat Interface could live here on Desktop!
    *   *Idea*: On Desktop, the Chat is a sticky right sidebar (The "Discussion"). The Feed updates in the center.
    *   *Mobile*: Chat is a drawer or top section.

---

## 6. UX & Motion
*   **Type**: Fast, snappy.
*   **Reordering**: `layout` prop (Framer Motion) is still great, but keep the spring stiffness high (snappy reorder).
*   **Scroll**: Standard browser scrolling (don't hijack scroll).

---

## 7. Icons & Assets
*   **Icons**: **Remix Icon** or **Heroicons**. Filled versions for active states, Outline for inactive.
*   **Avatars**: Rounded-full.
*   **Empty States**: Use Pixel Art illustrations (Retro space theme) to match the "New Year, New You" branding.

---

## 8. Specific "Dev" Touches
*   **Tags**: `#javascript` `#react` - always show the hash.
*   **Reactions**: Instead of "Likes", maybe have "Relevance Score" (Heart/Unicorn icons).
*   **Date**: "Posted just now" (for real-time generated content).
