import { Language } from './types';

export const translations = {
  en: {
    appTitle: "CulinAI",
    connectKey: "Connect API Key",
    heroTitle: "Turn your ingredients into",
    heroTitleHighlight: "masterpieces",
    heroDesc: "CulinAI uses advanced AI to craft personalized recipes just for you. Select your preferences and let's get cooking.",
    formTitle: "What's in your kitchen?",
    formSubtitle: "Tell us what you have, and we'll create magic.",
    ingredientsLabel: "Ingredients (comma separated)",
    ingredientsPlaceholder: "e.g. chicken breast, spinach, garlic, heavy cream...",
    ingredientFlexibilityHint: "Tip: List everything you have! The AI will pick the best combination, so you don't need to use every item.",
    quickAddLabel: "Quick Add:",
    surpriseMeBtn: "Surprise Me",
    
    // Labels
    mealTypeLabel: "Meal Type",
    cuisineLabel: "Cuisine Style",
    difficultyLabel: "Difficulty",
    numDishesLabel: "Number of Dishes",
    timeLabel: "Cooking Time (Optional)",
    timePlaceholder: "e.g. 30 mins",
    portionLabel: "Portion Size",
    occasionLabel: "Occasion / Purpose",
    dietaryLabel: "Dietary & Allergies",
    applianceLabel: "Preferred Tool",

    generateBtn: "Generate Recipe",
    processing: "Processing...",
    visualizeTitle: "Generating Dish Preview...",
    generatePhoto: "Regenerate Photo",
    newRecipe: "New Recipe",
    ingredientsTitle: "Ingredients",
    instructionsTitle: "Instructions",
    chefTip: "Chef's Tip",
    watchVideoBtn: "Watch Tutorial",
    chatWelcome: "Hello! I'm Chef Gemini. Ask me anything about cooking, substitutions, or techniques!",
    chatPlaceholder: "Ask a cooking question...",
    chatError: "Sorry, I'm having trouble connecting to the kitchen. Please try again.",
    errorGen: "We couldn't generate recipes. Please check your ingredients and try again.",
    errorImage: "Failed to generate image.",
    tabDish: "Dish",
    commonIngredients: ["Chicken", "Beef", "Eggs", "Tofu", "Rice", "Pasta", "Potato", "Tomato", "Onion"],
    features: {
      instant: {
        title: "Instant Recipes",
        desc: "Get detailed instructions in seconds based on what you have in your fridge."
      },
      visual: {
        title: "AI Visualization",
        desc: "See your dish before you cook it with our AI image generator."
      },
      chat: {
        title: "Chef Chat",
        desc: "Stuck on a step? Ask our AI Chef for real-time help and tips."
      }
    },
    cuisines: {
      Italian: 'Italian',
      French: 'French',
      Chinese: 'Chinese',
      Japanese: 'Japanese',
      Korean: 'Korean',
      Indian: 'Indian',
      Mexican: 'Mexican',
      American: 'American',
      Thai: 'Thai',
      Mediterranean: 'Mediterranean',
      Any: 'Any'
    },
    difficulties: {
      Easy: 'Easy',
      Medium: 'Medium',
      Hard: 'Hard',
      'Master Chef': 'Master Chef',
      Random: 'Random'
    },
    mealTypes: {
      'any': 'Any',
      'breakfast': 'Breakfast',
      'brunch': 'Brunch',
      'lunch': 'Lunch',
      'dinner': 'Dinner',
      'snack': 'Snack',
      'dessert': 'Dessert'
    },
    portions: {
      '1': '1 Person',
      '2': '2 People',
      '4': '4 People (Family)',
      'party': 'Party (10+)',
      'prep': 'Meal Prep'
    },
    occasions: {
      'daily': 'Daily Meal',
      'date': 'Date Night',
      'party': 'Party / Potluck',
      'quick': 'Quick & Easy',
      'healthy': 'Healthy Diet',
      'comfort': 'Comfort Food'
    },
    appliances: {
      'any': 'Any / Standard',
      'stove': 'Stove Top',
      'oven': 'Oven',
      'airfryer': 'Air Fryer',
      'microwave': 'Microwave',
      'slowcooker': 'Slow Cooker',
      'ricecooker': 'Rice Cooker'
    },
    dietary: {
      'vegetarian': 'Vegetarian',
      'vegan': 'Vegan',
      'glutenfree': 'Gluten-Free',
      'dairyfree': 'Dairy-Free',
      'nutfree': 'Nut-Free',
      'lowcarb': 'Low Carb'
    }
  },
  'zh-TW': {
    appTitle: "CulinAI 智能大廚",
    connectKey: "連接 API 金鑰",
    heroTitle: "讓您的食材變身",
    heroTitleHighlight: "美味佳餚",
    heroDesc: "CulinAI 使用先進的 AI 為您量身定制食譜。選擇您的偏好，開始烹飪吧。",
    formTitle: "您的廚房裡有什麼？",
    formSubtitle: "告訴我們您有什麼食材，讓我們來變魔術。",
    ingredientsLabel: "現有食材 (用逗號分隔)",
    ingredientsPlaceholder: "例如：雞胸肉，菠菜，大蒜，奶油...",
    ingredientFlexibilityHint: "小撇步：列出您現有的食材即可。AI 會挑選最合適的搭配，不一定會用上全部食材喔！",
    quickAddLabel: "快速添加：",
    surpriseMeBtn: "幫我想想",
    
    mealTypeLabel: "用餐時段",
    cuisineLabel: "菜系風格",
    difficultyLabel: "難度",
    numDishesLabel: "料理數量",
    timeLabel: "烹飪時間 (可選)",
    timePlaceholder: "例如：30分鐘",
    portionLabel: "份量",
    occasionLabel: "用餐情境",
    dietaryLabel: "飲食限制 / 過敏",
    applianceLabel: "主要烹飪工具",

    generateBtn: "生成食譜",
    processing: "處理中...",
    visualizeTitle: "正在生成菜品預覽...",
    generatePhoto: "重新生成照片",
    newRecipe: "新食譜",
    ingredientsTitle: "食材清單",
    instructionsTitle: "烹飪步驟",
    chefTip: "大廚貼士",
    watchVideoBtn: "觀看視頻教程",
    chatWelcome: "你好！我是大廚 Gemini。問我任何關於烹飪、食材替換或技巧的問題！",
    chatPlaceholder: "輸入烹飪問題...",
    chatError: "抱歉，連接廚房時出現問題。請重試。",
    errorGen: "我們無法生成食譜。請檢查您的食材並重試。",
    errorImage: "生成圖片失敗。",
    tabDish: "料理",
    commonIngredients: ["雞肉", "牛肉", "雞蛋", "豆腐", "米飯", "義大利麵", "馬鈴薯", "番茄", "洋蔥"],
    features: {
      instant: {
        title: "即時食譜",
        desc: "根據冰箱裡的食材，幾秒鐘內獲取詳細的烹飪指南。"
      },
      visual: {
        title: "AI 視覺化",
        desc: "在烹飪前，通過我們的 AI 圖像生成器預覽您的菜餚。"
      },
      chat: {
        title: "大廚對話",
        desc: "遇到困難了？實時向我們的 AI 大廚尋求幫助和建議。"
      }
    },
    cuisines: {
      Italian: '義大利菜',
      French: '法式',
      Chinese: '中餐',
      Japanese: '日式',
      Korean: '韓式',
      Indian: '印度菜',
      Mexican: '墨西哥菜',
      American: '美式',
      Thai: '泰式',
      Mediterranean: '地中海',
      Any: '任意'
    },
    difficulties: {
      Easy: '簡單',
      Medium: '中等',
      Hard: '困難',
      'Master Chef': '地獄廚房',
      Random: '隨機'
    },
    mealTypes: {
      'any': '任意',
      'breakfast': '早餐',
      'brunch': '早午餐',
      'lunch': '午餐',
      'dinner': '晚餐',
      'snack': '點心 / 宵夜',
      'dessert': '甜點'
    },
    portions: {
      '1': '1 人份',
      '2': '2 人份',
      '4': '4 人份 (家庭)',
      'party': '派對 (10人+)',
      'prep': '備餐 (Meal Prep)'
    },
    occasions: {
      'daily': '家常便飯',
      'date': '浪漫約會',
      'party': '派對 / 聚餐',
      'quick': '快速料理',
      'healthy': '健康飲食',
      'comfort': '療癒美食'
    },
    appliances: {
      'any': '任意 / 一般爐具',
      'stove': '瓦斯爐 / 電磁爐',
      'oven': '烤箱',
      'airfryer': '氣炸鍋',
      'microwave': '微波爐',
      'slowcooker': '慢燉鍋',
      'ricecooker': '電鍋'
    },
    dietary: {
      'vegetarian': '蛋奶素',
      'vegan': '全素 / 純素',
      'glutenfree': '無麩質',
      'dairyfree': '無乳製品',
      'nutfree': '無堅果',
      'lowcarb': '低碳 / 生酮'
    }
  },
  'zh-CN': {
    appTitle: "CulinAI 智能大厨",
    connectKey: "连接 API 密钥",
    heroTitle: "让您的食材变身",
    heroTitleHighlight: "美味佳肴",
    heroDesc: "CulinAI 使用先进的 AI 为您量身定制食谱。选择您的偏好，开始烹饪吧。",
    formTitle: "您的厨房里有什么？",
    formSubtitle: "告诉我们您有什么食材，让我们来变魔术。",
    ingredientsLabel: "现有食材 (用逗号分隔)",
    ingredientsPlaceholder: "例如：鸡胸肉，菠菜，大蒜，奶油...",
    ingredientFlexibilityHint: "小贴士：列出您现有的食材即可。AI 会挑选最合适的搭配，不一定会被用上全部食材哦！",
    quickAddLabel: "快速添加：",
    surpriseMeBtn: "帮我想想",
    
    mealTypeLabel: "用餐时段",
    cuisineLabel: "菜系风格",
    difficultyLabel: "难度",
    numDishesLabel: "料理数量",
    timeLabel: "烹饪时间 (可选)",
    timePlaceholder: "例如：30分钟",
    portionLabel: "份量",
    occasionLabel: "用餐情境",
    dietaryLabel: "饮食限制 / 过敏",
    applianceLabel: "主要烹饪工具",

    generateBtn: "生成食谱",
    processing: "处理中...",
    visualizeTitle: "正在生成菜品预览...",
    generatePhoto: "重新生成照片",
    newRecipe: "新食谱",
    ingredientsTitle: "食材清单",
    instructionsTitle: "烹饪步骤",
    chefTip: "大厨贴士",
    watchVideoBtn: "观看视频教程",
    chatWelcome: "你好！我是大厨 Gemini。问我任何关于烹饪、食材替换或技巧的问题！",
    chatPlaceholder: "输入烹饪问题...",
    chatError: "抱歉，连接厨房时出现问题。请重试。",
    errorGen: "我们无法生成食谱。请检查您的食材并重试。",
    errorImage: "生成图片失败。",
    tabDish: "料理",
    commonIngredients: ["鸡肉", "牛肉", "鸡蛋", "豆腐", "米饭", "意大利面", "土豆", "番茄", "洋葱"],
    features: {
      instant: {
        title: "即时食谱",
        desc: "根据冰箱里的食材，几秒钟内获取详细的烹饪指南。"
      },
      visual: {
        title: "AI 视觉化",
        desc: "在烹饪前，通过我们的 AI 图像生成器预览您的菜肴。"
      },
      chat: {
        title: "大厨对话",
        desc: "遇到困难了？实时向我们的 AI 大厨寻求帮助和建议。"
      }
    },
    cuisines: {
      Italian: '意大利菜',
      French: '法式',
      Chinese: '中餐',
      Japanese: '日式',
      Korean: '韩式',
      Indian: '印度菜',
      Mexican: '墨西哥菜',
      American: '美式',
      Thai: '泰式',
      Mediterranean: '地中海',
      Any: '任意'
    },
    difficulties: {
      Easy: '简单',
      Medium: '中等',
      Hard: '困难',
      'Master Chef': '地狱厨房',
      Random: '随机'
    },
    mealTypes: {
      'any': '任意',
      'breakfast': '早餐',
      'brunch': '早午餐',
      'lunch': '午餐',
      'dinner': '晚餐',
      'snack': '点心 / 夜宵',
      'dessert': '甜点'
    },
    portions: {
      '1': '1 人份',
      '2': '2 人份',
      '4': '4 人份 (家庭)',
      'party': '派对 (10人+)',
      'prep': '备餐 (Meal Prep)'
    },
    occasions: {
      'daily': '家常便饭',
      'date': '浪漫约会',
      'party': '派对 / 聚餐',
      'quick': '快速料理',
      'healthy': '健康饮食',
      'comfort': '疗癒美食'
    },
    appliances: {
      'any': '任意 / 一般炉具',
      'stove': '瓦斯炉 / 电磁炉',
      'oven': '烤箱',
      'airfryer': '空气炸锅',
      'microwave': '微波炉',
      'slowcooker': '慢炖锅',
      'ricecooker': '电饭煲'
    },
    dietary: {
      'vegetarian': '蛋奶素',
      'vegan': '全素 / 纯素',
      'glutenfree': '无麸质',
      'dairyfree': '无乳制品',
      'nutfree': '无坚果',
      'lowcarb': '低碳 / 生酮'
    }
  },
  'ko': {
    appTitle: "CulinAI 스마트 셰프",
    connectKey: "API 키 연결",
    heroTitle: "당신의 재료를",
    heroTitleHighlight: "최고의 요리로",
    heroDesc: "CulinAI는 고급 AI를 사용하여 맞춤형 레시피를 만듭니다. 재료를 선택하고 요리를 시작하세요.",
    formTitle: "주방에 무엇이 있나요?",
    formSubtitle: "재료를 알려주시면 마법 같은 요리를 만들어 드립니다.",
    ingredientsLabel: "재료 (콤마로 구분)",
    ingredientsPlaceholder: "예: 닭가슴살, 시금치, 마늘, 생크림...",
    ingredientFlexibilityHint: "팁: 가지고 있는 재료를 나열하세요. AI가 최고의 조합을 선택하므로 모든 재료를 사용할 필요는 없습니다!",
    quickAddLabel: "빠른 추가:",
    surpriseMeBtn: "랜덤 추천",
    
    mealTypeLabel: "식사 종류",
    cuisineLabel: "요리 스타일",
    difficultyLabel: "난이도",
    numDishesLabel: "요리 개수",
    timeLabel: "조리 시간 (선택)",
    timePlaceholder: "예: 30분",
    portionLabel: "인분",
    occasionLabel: "상황 / 목적",
    dietaryLabel: "식이 요법 / 알레르기",
    applianceLabel: "선호 조리 도구",

    generateBtn: "레시피 생성",
    processing: "처리 중...",
    visualizeTitle: "요리 미리보기 생성 중...",
    generatePhoto: "사진 다시 생성",
    newRecipe: "새 레시피",
    ingredientsTitle: "재료 목록",
    instructionsTitle: "조리 방법",
    chefTip: "셰프의 팁",
    watchVideoBtn: "영상 튜토리얼 보기",
    chatWelcome: "안녕하세요! 셰프 Gemini입니다. 요리법이나 재료 대체에 대해 물어보세요!",
    chatPlaceholder: "요리 질문 입력...",
    chatError: "주방 연결에 문제가 발생했습니다. 다시 시도해주세요.",
    errorGen: "레시피를 생성할 수 없습니다. 재료를 확인하고 다시 시도해주세요.",
    errorImage: "이미지 생성 실패.",
    tabDish: "요리",
    commonIngredients: ["닭고기", "쇠고기", "달걀", "두부", "밥", "파스타", "감자", "토마토", "양파"],
    features: {
      instant: {
        title: "즉석 레시피",
        desc: "냉장고에 있는 재료로 몇 초 만에 상세한 조리법을 확인하세요."
      },
      visual: {
        title: "AI 시각화",
        desc: "요리하기 전에 AI 이미지 생성기로 완성된 요리를 미리 확인하세요."
      },
      chat: {
        title: "셰프 채팅",
        desc: "막히는 부분이 있나요? AI 셰프에게 실시간으로 도움을 요청하세요."
      }
    },
    cuisines: {
      Italian: '이탈리아식',
      French: '프랑스식',
      Chinese: '중식',
      Japanese: '일식',
      Korean: '한식',
      Indian: '인도식',
      Mexican: '멕시코식',
      American: '미국식',
      Thai: '태국식',
      Mediterranean: '지중해식',
      Any: '무관'
    },
    difficulties: {
      Easy: '쉬움',
      Medium: '보통',
      Hard: '어려움',
      'Master Chef': '마스터 셰프',
      Random: '랜덤'
    },
    mealTypes: {
      'any': '무관',
      'breakfast': '아침',
      'brunch': '아점 (Brunch)',
      'lunch': '점심',
      'dinner': '저녁',
      'snack': '간식 / 야식',
      'dessert': '디저트'
    },
    portions: {
      '1': '1인분',
      '2': '2인분',
      '4': '4인분 (가족)',
      'party': '파티 (10인+)',
      'prep': '밀프렙'
    },
    occasions: {
      'daily': '일상 식사',
      'date': '데이트',
      'party': '파티 / 모임',
      'quick': '간편식',
      'healthy': '건강식',
      'comfort': '힐링 푸드'
    },
    appliances: {
      'any': '무관 / 기본 도구',
      'stove': '가스레인지 / 인덕션',
      'oven': '오븐',
      'airfryer': '에어프라이어',
      'microwave': '전자레인지',
      'slowcooker': '슬로우 쿠커',
      'ricecooker': '전기밥솥'
    },
    dietary: {
      'vegetarian': '채식 (Vegetarian)',
      'vegan': '비건 (Vegan)',
      'glutenfree': '글루텐 프리',
      'dairyfree': '유제품 프리',
      'nutfree': '견과류 프리',
      'lowcarb': '저탄수 / 키토'
    }
  }
};