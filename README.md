# 📊 GHL Custom Dashboard

An elite analytics powerhouse designed for Marketing Agencies to visualize GoHighLevel data with precision and style.

![Dashboard Preview](https://via.placeholder.com/800x450.png?text=GHL+Dashboard+Preview) <!-- Replace with actual screenshot when available -->

## ✨ Features

- **🚀 Real-time KPIs**: Track Leads, Revenue, Conversion Rates, and CPC at a glance.
- **📈 Advanced Analytics**: Interactive revenue charts powered by Recharts.
- **🕒 Activity Stream**: Monitor recent lead activity and conversion events.
- **🌓 Premium Aesthetics**: A sophisticated dark mode interface with glassmorphism and smooth animations.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop.

## 🛠️ Tech Stack

Built with the ultimate modern web development suite:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utility**: `clsx` & `tailwind-merge`

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ 
- npm / yarn / pnpm / bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/GHL-Custom-Dashboard.git
   cd GHL-Custom-Dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GHL_API_KEY=your_api_key_here
   GHL_LOCATION_ID=your_location_id_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard in action.

## 📂 Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: UI components (DashboardCards, Charts, Layout).
- `src/services`: Data orchestration and API integration logic.
- `src/lib`: Core utility functions.

## 📄 License

This project is licensed under the MIT License.

