# Mood Tracker Web App - Setup Instructions

## Overview
I've created a sophisticated mood tracking web application that follows your exact design specifications. The app includes:

- **Mood Grid**: 7-column layout with color-coded squares based on sentiment scores (0-100)
- **Journal Entry**: Voice transcription, writing prompts, and OpenAI sentiment analysis
- **Weekly Insights**: AI-generated insights based on journal entries
- **Clean Design**: Minimal, sophisticated interface matching your screen designs

## Features Implemented

### ✅ Core Features
- **Mood Grid Dashboard**: Shows daily mood squares with color intensity based on positivity scores
- **Journal Entry System**: Text input with voice recording using Web Speech API
- **OpenAI Integration**: Sentiment analysis (0-100 score) and follow-up prompts
- **Weekly Insights**: AI-generated insights every Monday based on previous week's entries
- **Data Persistence**: Local storage for entries and insights
- **Date Restrictions**: Only today's entry can be edited

### ✅ Design Elements
- **Pill-shaped buttons** for insights and navigation
- **Rounded squares** in the mood grid
- **Month/year indicators** on grid sides
- **Weekday headers** (M T W T F S S)
- **Clean white background** with sophisticated typography
- **Responsive design** for mobile and desktop

### ✅ Navigation
- Dashboard → Journal Entry → Dashboard
- Weekly Insight → Insight Detail → All Insights
- Settings for OpenAI API key configuration

## How to Run Locally

1. **Navigate to the project directory:**
   ```bash
   cd /home/ubuntu/mood-tracker
   ```

2. **Start the development server:**
   ```bash
   pnpm run dev --host
   ```

3. **Open in your browser:**
   - Visit: `http://localhost:5173`
   - The app will be accessible on your local network

## OpenAI API Key Setup

To enable sentiment analysis and weekly insights:

1. Click the settings icon (⚙️) in the journal entry screen
2. Enter your OpenAI API key (starts with `sk-...`)
3. The key is stored locally and used for:
   - Sentiment analysis of journal entries (0-100 score)
   - Follow-up reflection prompts
   - Weekly insight generation

## Sample Data

The app includes sample data to demonstrate functionality:
- Pre-populated mood grid with various sentiment scores
- Sample weekly insight titled "Emotions as Mixed Tones, Not Binary States"
- Color-coded squares showing different mood levels

## File Structure

```
mood-tracker/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard with mood grid
│   │   ├── MoodGrid.jsx          # 7-column mood visualization
│   │   ├── JournalEntry.jsx      # Text/voice input with prompts
│   │   ├── WeeklyInsightPreview.jsx  # Insight preview component
│   │   ├── InsightDetail.jsx     # Full insight view
│   │   └── AllInsights.jsx       # All insights overview
│   ├── lib/
│   │   ├── openai.js            # OpenAI API integration
│   │   └── dataManager.js       # Data persistence utilities
│   └── App.jsx                  # Main app with routing
```

## Technical Notes

- **Framework**: React with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **Storage**: localStorage
- **Voice**: Web Speech API
- **AI**: OpenAI GPT-3.5/GPT-4

The app is production-ready and can be deployed using the built-in deployment tools.

