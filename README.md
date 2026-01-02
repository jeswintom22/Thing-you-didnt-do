# Thing you Didn't do

A modern web application for tracking the things you consciously avoid each day. Instead of focusing on what you did accomplish, this app helps you quantify and understand your avoidance patterns across different fear types.

![Thing you Didn't do](https://img.shields.io/badge/Next.js-16.1.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)

## 🌟 Features

### Core Functionality
- **Daily Avoidance Tracking**: Add one thing you avoided each day with detailed descriptions
- **Fear Type Categorization**: Classify avoidances into Rejection, Uncertainty, or Effort
- **Weekly Pattern Analysis**: Get insights into your avoidance behaviors over time
- **Data Visualization**: Interactive charts showing avoidance trends across categories

### User Experience
- **Beautiful Landing Page**: Animated introduction with elegant typography and smooth transitions
- **Interactive Dashboard**: Hover effects and real-time statistics on the home page
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern dark UI with vibrant accents inspired by beachhack.in
- **Local Storage**: All data persists locally in your browser

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jeswintom22/Thing-you-didnt-do.git
cd thing-you-didnt-do-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Landing Page
- View your overall avoidance statistics in the interactive grid
- See counts for each fear category
- Click "Start Tracking →" to access the tracker

### Tracker Page
- **Add Entry**: Fill in what you avoided and select the fear type
- **View Entries**: See your recent avoidances with dates and categories
- **Weekly Summary**: Get insights about your avoidance patterns
- **Visualization**: Analyze trends with interactive bar charts

## 🛠️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Fonts**: Google Fonts (Great Vibes, Geist)
- **State Management**: React hooks with local storage
- **Animations**: Custom CSS keyframes

## 📁 Project Structure

```
thing-you-didnt-do-app/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── AddEntry.tsx     # Form for adding avoidances
│   │   │   ├── EntryList.tsx    # List of recent entries
│   │   │   ├── InteractiveGrid.tsx # Landing page grid
│   │   │   ├── Visualization.tsx # Charts component
│   │   │   └── WeeklySummary.tsx # Summary component
│   │   ├── tracker/             # Tracker page route
│   │   │   └── page.tsx
│   │   ├── globals.css          # Global styles & animations
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Landing page
│   │   ├── types.ts             # TypeScript type definitions
│   │   └── utils.ts             # Utility functions
│   └── ...
├── public/                      # Static assets
├── package.json
└── README.md
```

## 🎨 Design Inspiration

The app's design is inspired by [beachhack.in](https://www.beachhack.in/), featuring:
- Dark gradient backgrounds
- Smooth animations and transitions
- Interactive hover effects
- Modern typography with script fonts
- Scrolling marquee elements

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push
3. Get a live URL instantly

### Other Platforms
The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the concept of tracking avoidance behaviors
- Built with Next.js and modern web technologies

---

**Track your fears, face your growth.** 🌊
