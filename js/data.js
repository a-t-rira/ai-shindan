/* SPEC.md 第8章の職種・質問文言。画面遷移や診断計算は app.js に置きます。 */
window.AI_SHINDAN_DATA = {
  jobs: [
    { id: "sales", label: "営業", icon: "🤝", adjustment: -5 },
    { id: "office", label: "事務・経理", icon: "🧾", adjustment: 10 },
    { id: "engineer", label: "エンジニア", icon: "💻", adjustment: 5 },
    { id: "creative", label: "クリエイティブ", icon: "🎨", adjustment: 0 },
    { id: "service", label: "接客・販売", icon: "🛍️", adjustment: -5 },
    { id: "manager", label: "管理職・経営", icon: "📊", adjustment: -5 },
    { id: "medical", label: "医療・福祉", icon: "🩺", adjustment: -10 },
    { id: "factory", label: "現場・製造", icon: "🏭", adjustment: -10 },
    { id: "support", label: "カスタマーサポート", icon: "🎧", adjustment: 10 },
    { id: "marketing", label: "マーケティング・広報", icon: "📣", adjustment: 5 },
    { id: "legal", label: "士業", icon: "⚖️", adjustment: 5 },
    { id: "hr", label: "人事・採用", icon: "👥", adjustment: 0 },
    { id: "education", label: "教育・保育", icon: "📚", adjustment: -10 },
    { id: "logistics", label: "物流・ドライバー", icon: "🚚", adjustment: -10 },
    { id: "food", label: "飲食・調理", icon: "🍳", adjustment: -10 },
    { id: "beauty", label: "美容・理容", icon: "✂️", adjustment: -10 }
  ],
  questions: [
    {
      text: "同じ作業の繰り返しはどれくらい？",
      choices: ["毎日ちがう", "たまに同じ", "半分くらい同じ", "ほとんど同じ"]
    },
    {
      text: "仕事の成果は主に何？",
      choices: ["体を動かした結果", "人との会話や対応", "資料やデータ", "文章・コード・画像"]
    },
    {
      text: "判断にマニュアルやルールはある？",
      choices: ["ほぼない（経験と勘）", "一部ある", "だいたいある", "ほぼ全部決まってる"]
    },
    {
      text: "1日のうちパソコンに向かう時間は？",
      choices: ["2割未満", "2〜5割", "5〜8割", "8割以上"]
    },
    {
      text: "文章を書く量は？",
      choices: ["ほぼ書かない", "メール程度", "資料をよく書く", "書くのが仕事の中心"]
    },
    {
      text: "調べものや情報収集の時間は？",
      choices: ["ほぼない", "ときどき", "よくある", "毎日かなり"]
    },
    {
      text: "相手の気持ちに寄り添う場面は？",
      choices: ["仕事の中心", "よくある", "たまに", "ほぼない"]
    },
    {
      text: "その場で体を使う作業は？",
      choices: ["仕事の中心", "よくある", "たまに", "ほぼない"]
    },
    {
      text: "最終的な責任を負う判断は？",
      choices: ["毎日のようにある", "よくある", "たまに", "ほぼない"]
    },
    {
      text: "「あなたじゃなきゃダメ」と言われることは？",
      choices: ["よくある", "ときどき", "たまに", "ほぼない"]
    },
    {
      text: "会議や打ち合わせのまとめを作ることは？",
      choices: ["ほぼない", "たまに", "よくある", "毎回自分が作る"]
    },
    {
      text: "数字の集計や表づくりは？",
      choices: ["ほぼない", "たまに", "よくある", "毎日"]
    },
    {
      text: "相手や状況に合わせて臨機応変に動く場面は？",
      choices: ["仕事の中心", "よくある", "たまに", "ほぼない"]
    },
    {
      text: "新しい企画やアイデアをゼロから考える仕事は？",
      choices: ["仕事の中心", "よくある", "たまに", "ほぼない"]
    },
    {
      text: "仕事のやりとりは主にどこで？",
      choices: ["目の前の人", "電話", "メールやチャット", "パソコン上の作業がほとんど"]
    }
  ],
  jobMessages: {
    sales: "提案書や議事録はAIに任せて、会う時間を増やそう",
    office: "データ入力や定型メールはAIの得意分野",
    engineer: "コードの下書きやテストはAIに。設計は人の仕事",
    creative: "ラフ案の量産はAI、最後の「らしさ」は人",
    service: "問い合わせの一次対応はAI、目の前のお客さんは人",
    manager: "レポートの要約や資料作成はAIに任せよう",
    medical: "記録や書類作業をAIに渡せば、ケアの時間が増える",
    factory: "日報や手順書づくりからAIを試してみよう",
    support: "よくある質問はAI、こじれた相談は人",
    marketing: "投稿文や分析レポートの下書きはAIの得意分野",
    legal: "書類の下調べやチェックの補助はAIに",
    hr: "求人票づくりや日程調整はAIに任せよう",
    education: "教材や連絡の下書きはAI、向き合うのは人",
    logistics: "ルート計画や日報づくりからAIを試そう",
    food: "仕込み表や発注の計算はAIに手伝ってもらおう",
    beauty: "予約対応やSNS投稿はAI、施術は人"
  },
  resultTypes: [
    { id: "type1", min: 5, max: 20, name: "AIが弟子入りしたい職人", message: "あなたの仕事の核はAIには真似できない。雑務だけ任せよう" },
    { id: "type2", min: 21, max: 40, name: "AIを部下にする現場リーダー", message: "判断はあなた、下調べと下書きはAIに" },
    { id: "type3", min: 41, max: 60, name: "AIと二人三脚タイプ", message: "半々で組めば一番伸びるバランス" },
    { id: "type4", min: 61, max: 80, name: "仕事の半分をAIに渡せる人", message: "浮いた時間を「あなたにしかできない仕事」へ" },
    { id: "type5", min: 81, max: 95, name: "AIで時間を取り戻す人", message: "仕組み化すれば、働き方ごと変えられる" }
  ]
};

