<div align="center">

# 📝 Notion AI Clone

### A full-stack, real-time productivity workspace inspired by Notion  
Built with **Next.js 15 · TypeScript · Convex · Clerk · Edgestore**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-notion--ai--ashish.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://notion-ai-ashish.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Convex](https://img.shields.io/badge/Convex-Realtime%20DB-ee4b2b?style=for-the-badge)](https://convex.dev/)

</div>

---

## 🌐 Live Demo

**[https://notion-ai-ashish.vercel.app/](https://notion-ai-ashish.vercel.app/)**

---

## 📖 About

This project is a simplified clone of the popular productivity application **Notion**. It replicates core features of Notion — providing a platform where users can create, edit, and organize notes in a flexible and intuitive interface.

- **[Convex](https://convex.dev/)** powers the backend with a real-time database that allows for instant data updates across all clients.
- **[Edgestore](https://edgestore.dev/)** manages image and file uploads with a distributed key-value store.
- **[Clerk](https://clerk.com/)** handles user authentication with a secure, scalable API.

> Built & maintained by [Ashish Yadav](https://linkedin.com/in/Ashishyadav677) — Frontend Developer, Bengaluru 🇮🇳

---

## ✨ Features

### 📂 Productivity & Organization
- 📝 **Notion-style rich text editor** for seamless note-taking
- 📂 **Infinite nested documents** for deep hierarchical organization
- 🖐️ **Drag-and-drop reordering** for intuitive file management
- ↔️ **Expandable & collapsible sidebar** for easy navigation
- 🎨 **Customizable document icons** that update in real-time
- 🗑️ **Trash can with soft delete** and file recovery options

### 🎨 User Experience
- 🌓 **Light & Dark mode** to suit user preferences
- 📱 **Fully mobile responsive** — productivity on the go
- 🛬 **Landing page** for a welcoming entry point
- 🖼️ **Cover images** per document for a personal touch

### ⚡ Data Management
- 🔄 **Real-time database** — changes reflect instantly across sessions
- 📤 **File upload, deletion & replacement** via Edgestore

### 🔐 Security & Sharing
- 🔐 **Authentication** — secure notes with Clerk
- 🌍 **Publish to web** — share any note with a public URL

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend / DB | Convex (real-time) |
| Auth | Clerk |
| File Storage | Edgestore |
| Editor | BlockNote / custom rich text |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn
- Accounts on [Convex](https://convex.dev), [Clerk](https://clerk.com), and [Edgestore](https://edgestore.dev)

### 1. Clone the repository

```bash
git clone https://github.com/ITSASHISHGITHUB/notion-ai-clone.git
cd notion-ai-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root of the project and add the following:

```env
# Convex
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk
CLERK_JWT_ISSUER_DOMAIN=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Edgestore
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=

# For deploying
CONVEX_DEPLOY_KEY=
```

> **Where to find these keys:**
> - Convex → [dashboard.convex.dev](https://dashboard.convex.dev)
> - Clerk → [dashboard.clerk.com](https://dashboard.clerk.com)
> - Edgestore → [dashboard.edgestore.dev](https://dashboard.edgestore.dev)

### 4. Start the Convex dev server

```bash
npx convex dev
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages & layouts
│   ├── (main)/           # Authenticated app routes
│   ├── (marketing)/      # Landing page
│   └── (public)/         # Publicly shared documents
├── components/           # Reusable UI components
├── convex/               # Convex backend functions & schema
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

---

## 🔧 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npx convex dev` | Start Convex real-time backend |
| `npx convex deploy` | Deploy Convex functions to production |

---

## 🚢 Deployment

This project is deployed on **Vercel**. To deploy your own:

1. Push the repository to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add all environment variables from `.env.local` in the Vercel dashboard
4. Deploy Convex functions: `npx convex deploy --cmd 'npm run build'`

---

## 📸 Screenshots

> _Add screenshots of your app here for a better first impression._  
> Tip: Use `![screenshot](./public/screenshot.png)` syntax.

---

## 🤝 Contributing

Contributions are welcome! If you find a bug or want to suggest a feature:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📬 Contact

**Ashish Yadav** — Frontend Developer

[![Email](https://img.shields.io/badge/Email-AY677204@gmail.com-orange?style=flat-square&logo=gmail)](mailto:AY677204@GMAIL.COM)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ashishyadav677-0077b5?style=flat-square&logo=linkedin)](https://linkedin.com/in/Ashishyadav677)
[![GitHub](https://img.shields.io/badge/GitHub-ITSASHISHGITHUB-181717?style=flat-square&logo=github)](https://github.com/ITSASHISHGITHUB)

---

## ⚠️ Disclaimer

This project is built for **educational and portfolio purposes only**. It is not affiliated with, endorsed by, or connected to [Notion Labs, Inc.](https://notion.so) in any way.

---

<div align="center">
  Made with ❤️ by <a href="https://linkedin.com/in/Ashishyadav677">Ashish Yadav</a>
</div>