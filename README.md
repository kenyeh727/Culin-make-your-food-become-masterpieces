<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🍳 CulinAI - Smart Chef Assistant

> AI-powered recipe generator that transforms your ingredients into culinary masterpieces using Google Gemini

[![Deploy to GitHub Pages](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces/actions/workflows/deploy.yml/badge.svg)](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[🌐 Live Demo](https://kenyeh727.github.io/Culin-make-your-food-become-masterpieces/) | [📖 中文說明](#中文說明)

---

## ✨ Features

- 🤖 **AI-Powered Recipe Generation** - Personalized recipes using Google Gemini AI
- 🌍 **Multi-Language Support** - English, Traditional Chinese, Simplified Chinese, and Korean
- 🎨 **AI Image Generation** - Visualize your dishes before cooking with Imagen
- 💬 **Chef Chatbot** - Ask cooking questions and get expert advice in real-time
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔐 **Google Sign-In** - Secure authentication with your Gmail account
- 📜 **Recipe History** - Save and revisit your favorite recipes
- 🎯 **Smart Preferences** - Customize by cuisine, difficulty, dietary restrictions, and more

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Account** for authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces.git
   cd Culin-make-your-food-become-masterpieces
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional for local development)
   
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   
   > **Note**: For production deployment, users will sign in with their Google account and use their own API keys through the AI Studio integration.

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:3000`

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

This will:
- Run TypeScript type checking
- Build optimized production bundle in `dist/` folder

### Preview Production Build

```bash
npm run preview
```

### Deploy to GitHub Pages

The project is configured for automatic deployment to GitHub Pages:

1. **Enable GitHub Pages** in your repository settings:
   - Go to `Settings` → `Pages`
   - Source: `GitHub Actions`

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **GitHub Actions** will automatically:
   - Build the project
   - Deploy to GitHub Pages
   - Your site will be live at: `https://[username].github.io/Culin-make-your-food-become-masterpieces/`

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **AI Integration**: Google Gemini API (@google/genai)
- **Styling**: Tailwind CSS (via inline classes)
- **Deployment**: GitHub Pages + GitHub Actions
- **Authentication**: Google OAuth (AI Studio integration)

## 📁 Project Structure

```
Culin-make-your-food-become-masterpieces/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── components/
│   ├── Button.tsx              # Reusable button component
│   ├── ChatBot.tsx             # AI chef chatbot
│   ├── CookieConsent.tsx       # Cookie consent banner
│   ├── RecipeDisplay.tsx       # Recipe display component
│   └── RecipeForm.tsx          # Recipe input form
├── services/
│   └── geminiService.ts        # Google Gemini API integration
├── public/
│   └── images/                 # Static images for chef recommendations
├── App.tsx                     # Main application component
├── index.tsx                   # Application entry point
├── index.html                  # HTML template
├── types.ts                    # TypeScript type definitions
├── translations.ts             # Multi-language translations
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🎯 Usage

### For End Users

1. **Visit the app** at the deployed URL
2. **Sign in with Google** to access AI features
3. **Enter your ingredients** in the form
4. **Customize preferences**:
   - Cuisine style (Chinese, Italian, French, etc.)
   - Difficulty level
   - Cooking time
   - Dietary restrictions
   - Preferred cooking appliances
5. **Generate recipes** and get AI-powered suggestions
6. **View recipe history** and regenerate favorite dishes
7. **Chat with Chef Gemini** for cooking tips and advice

### For Developers

#### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking

#### Environment Variables

- `GEMINI_API_KEY` - Your Google Gemini API key (optional for local dev)

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` is configured for:
- GitHub Pages deployment with proper base path
- Environment variable injection
- Path aliases
- Development server on port 3000

### GitHub Actions

The `.github/workflows/deploy.yml` workflow:
- Triggers on push to `main` branch
- Runs build process
- Deploys to GitHub Pages automatically
- Uses Node.js 20 with npm caching for faster builds

## 🌐 Multi-Language Support

CulinAI supports 4 languages:
- 🇺🇸 English (EN)
- 🇹🇼 Traditional Chinese (繁體)
- 🇨🇳 Simplified Chinese (简体)
- 🇰🇷 Korean (한국어)

All UI elements, recipe generation, and AI chat responses adapt to the selected language.

## 🔐 Privacy & Security

- User authentication via Google OAuth
- API keys are managed securely through AI Studio
- No sensitive data stored on servers
- Recipe history stored locally in browser
- Cookie consent banner for GDPR compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

- **Author**: kenyeh727
- **GitHub**: [@kenyeh727](https://github.com/kenyeh727)
- **Project Link**: [https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces](https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces)

---

## 中文說明

### 🍳 CulinAI - 智能大廚助手

> 使用 Google Gemini AI 將您的食材轉化為美味佳餚的智能食譜生成器

### ✨ 主要功能

- 🤖 **AI 智能食譜生成** - 使用 Google Gemini AI 生成個性化食譜
- 🌍 **多語言支援** - 支援英文、繁體中文、簡體中文、韓文
- 🎨 **AI 圖像生成** - 使用 Imagen 在烹飪前預覽菜品
- 💬 **大廚聊天機器人** - 即時詢問烹飪問題並獲得專業建議
- 📱 **響應式設計** - 精美的 UI，支援所有設備
- 🔐 **Google 登入** - 使用 Gmail 帳號安全登入
- 📜 **食譜歷史** - 儲存並重溫您最喜愛的食譜
- 🎯 **智能偏好設定** - 依菜系、難度、飲食限制等自訂

### 🚀 快速開始

1. **克隆專案**
   ```bash
   git clone https://github.com/kenyeh727/Culin-make-your-food-become-masterpieces.git
   cd Culin-make-your-food-become-masterpieces
   ```

2. **安裝依賴**
   ```bash
   npm install
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

### 📦 建置與部署

**建置生產版本**
```bash
npm run build
```

**部署到 GitHub Pages**
```bash
git add .
git commit -m "部署到 GitHub Pages"
git push origin main
```

GitHub Actions 會自動建置並部署您的應用程式！

### 🎯 使用方式

1. 訪問部署的網址
2. 使用 Google 帳號登入
3. 輸入您的食材
4. 自訂偏好設定（菜系、難度、時間等）
5. 生成食譜並享受烹飪！

### 📝 授權

本專案採用 MIT 授權 - 詳見 [LICENSE](LICENSE) 文件

---

<div align="center">
Made with ❤️ by kenyeh727 | Powered by Google Gemini
</div>
