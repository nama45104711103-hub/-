export type Jellyfish = {
  id: string;
  /** 日本語での呼び名。定着した和名がない種はカタカナの通称を使う。 */
  name: string;
  /** 学名。 */
  scientific: string;
  /** 代表的な見た目の色（目安）。 */
  hex: string;
  /** 触手や縁取りなど、差し色として見える色。 */
  accent: string;
  /** 色の見え方を言葉で説明したもの。 */
  colorLabel: string;
  /** かさの直径など、大きさの目安。 */
  size: string;
  habitat: string;
  description: string;
  /** 刺されると危険な種だけ注意書きを入れる。 */
  caution?: string;
};

/**
 * 色は個体差・光の当たり方・水槽の照明で大きく変わるため、
 * ここに入れている色コードは「よく見られる色」の目安。
 */
export const JELLYFISH: Jellyfish[] = [
  {
    id: "aurelia-aurita",
    name: "ミズクラゲ",
    scientific: "Aurelia aurita",
    hex: "#dfeaf4",
    accent: "#b9d4ea",
    colorLabel: "青みがかった半透明",
    size: "かさの直径 15〜30cm",
    habitat: "日本沿岸をはじめ世界中の浅い海",
    description:
      "水族館でいちばんよく見かけるクラゲ。かさの中央に四つ葉のように見える生殖腺があり、透明な体に照明の色がそのまま映る。",
  },
  {
    id: "carybdea-brevipedalia",
    name: "アンドンクラゲ",
    scientific: "Carybdea brevipedalia",
    hex: "#d9ecec",
    accent: "#9fd6d6",
    colorLabel: "ほぼ無色の透明",
    size: "かさの高さ 3cm前後",
    habitat: "日本沿岸、夏の終わりに増える",
    description:
      "箱型のかさに四本の触手を持つ小さなクラゲ。体がほとんど透明で水中では見えにくい。",
    caution: "刺されると強く痛む。海水浴中に見かけても触らないこと。",
  },
  {
    id: "cyanea-nozakii",
    name: "ユウレイクラゲ",
    scientific: "Cyanea nozakii",
    hex: "#f1ece0",
    accent: "#d8cdb6",
    colorLabel: "乳白色がかった白",
    size: "かさの直径 30〜50cm",
    habitat: "東シナ海から日本沿岸",
    description:
      "白くかすんだかさから長い触手を垂らして漂う。名前のとおり、水中でぼんやり浮かび上がって見える。",
    caution: "触手が長く、刺されることがある。",
  },
  {
    id: "stomolophus-meleagris",
    name: "キャノンボールクラゲ",
    scientific: "Stomolophus meleagris",
    hex: "#c9baa7",
    accent: "#8c6f52",
    colorLabel: "砂のようなベージュ",
    size: "かさの直径 10〜20cm",
    habitat: "アメリカ東岸・メキシコ湾",
    description:
      "砲弾のような丸く硬いかさを持つ。縁が褐色に色づき、全体はくすんだベージュに見える。",
  },
  {
    id: "bolinopsis-mikado",
    name: "カブトクラゲ",
    scientific: "Bolinopsis mikado",
    hex: "#cdd9ee",
    accent: "#9ad5e8",
    colorLabel: "虹色に光る淡い青",
    size: "体長 10cm前後",
    habitat: "日本沿岸の表層",
    description:
      "クシクラゲの仲間で、体の側面に並ぶ櫛板が動くたびに虹色の光が流れる。色そのものは淡く、光の反射で色がつく。",
  },
  {
    id: "rhizostoma-pulmo",
    name: "バレルジェリーフィッシュ",
    scientific: "Rhizostoma pulmo",
    hex: "#9fc0cf",
    accent: "#5f6fa8",
    colorLabel: "青灰色に紫の縁取り",
    size: "かさの直径 40〜60cm",
    habitat: "地中海・北東大西洋",
    description:
      "樽のような大きなかさの縁が紫や青に色づく。地中海では夏に大群で現れる。",
  },
  {
    id: "catostylus-mosaicus",
    name: "カラージェリーフィッシュ",
    scientific: "Catostylus mosaicus",
    hex: "#3b6fb6",
    accent: "#9fc3e8",
    colorLabel: "はっきりした青",
    size: "かさの直径 15〜35cm",
    habitat: "オーストラリア東岸",
    description:
      "青・白・茶など生息地によって色が変わるクラゲ。青い個体は水槽の中でも目を引くほど鮮やかに見える。",
  },
  {
    id: "velella-velella",
    name: "カツオノカンムリ",
    scientific: "Velella velella",
    hex: "#2f4da0",
    accent: "#6f8fd8",
    colorLabel: "濃い青",
    size: "直径 5〜7cm",
    habitat: "暖かい海の海面",
    description:
      "海面に浮かび、三角の帆で風を受けて移動する。体は深い青色で、浜に打ち上がると青い膜のように見える。",
  },
  {
    id: "physalia-physalis",
    name: "カツオノエボシ",
    scientific: "Physalia physalis",
    hex: "#6a5bc4",
    accent: "#a7b2ee",
    colorLabel: "青紫",
    size: "浮き袋 10〜30cm、触手は10m以上",
    habitat: "暖かい海の海面",
    description:
      "青紫の浮き袋を海面に出して漂う。クラゲに似ているが、小さな個体が集まって一つの体になっているヒドロ虫の仲間。",
    caution: "非常に強い毒を持つ。打ち上げられた個体も危険なので触らないこと。",
  },
  {
    id: "chrysaora-colorata",
    name: "パープルストライプドジェリー",
    scientific: "Chrysaora colorata",
    hex: "#7b4fa8",
    accent: "#dcc6ec",
    colorLabel: "紫の放射模様",
    size: "かさの直径 40〜70cm",
    habitat: "カリフォルニア沿岸",
    description:
      "白いかさに紫の筋が放射状に走る。成長すると筋の紫が濃くなり、長い触手も紫を帯びる。",
  },
  {
    id: "pelagia-noctiluca",
    name: "マウブスティンガー",
    scientific: "Pelagia noctiluca",
    hex: "#b06ba0",
    accent: "#efc8dd",
    colorLabel: "藤色がかったピンク紫",
    size: "かさの直径 5〜10cm",
    habitat: "地中海・大西洋の沖合",
    description:
      "小さいながら全身がピンク紫色に色づく外洋性のクラゲ。刺激を受けると青白く発光する。",
    caution: "刺されるとかなり痛む。地中海では海水浴の注意対象になっている。",
  },
  {
    id: "chrysaora-achlyos",
    name: "ブラックシーネットル",
    scientific: "Chrysaora achlyos",
    hex: "#3c2f4a",
    accent: "#8a6f84",
    colorLabel: "黒に近い暗紫",
    size: "かさの直径 60〜90cm",
    habitat: "カリフォルニア〜メキシコ沿岸",
    description:
      "大型のクラゲで、成体のかさは黒紫色になる。数年おきに沿岸へ大量に現れることで知られる。",
  },
  {
    id: "olindias-formosa",
    name: "ハナガサクラゲ",
    scientific: "Olindias formosa",
    hex: "#e0529c",
    accent: "#4fd0b8",
    colorLabel: "蛍光ピンクと青緑",
    size: "かさの直径 8〜15cm",
    habitat: "日本南部の沿岸",
    description:
      "かさの下に広げた触手の先がピンクや紫に光り、青緑の筋が入る。花笠を広げたように見えることから名前がついた。",
    caution: "刺胞が強く、刺されると痛む。",
  },
  {
    id: "turritopsis",
    name: "ベニクラゲ",
    scientific: "Turritopsis sp.",
    hex: "#d6294b",
    accent: "#f8c9d2",
    colorLabel: "透明な体に赤い中心",
    size: "かさの直径 1cm前後",
    habitat: "日本沿岸ほか世界の暖かい海",
    description:
      "透明なかさの中心にある胃が紅色に見える小さなクラゲ。環境が悪くなると若い姿に戻って再生することで有名。",
  },
  {
    id: "chrysaora-pacifica",
    name: "アカクラゲ",
    scientific: "Chrysaora pacifica",
    hex: "#c0392b",
    accent: "#eadbc8",
    colorLabel: "赤褐色の縞",
    size: "かさの直径 15〜20cm",
    habitat: "日本沿岸",
    description:
      "白いかさに赤褐色の縞が16本走る。乾いた刺胞が鼻に入るとくしゃみが出るため、昔は「ハクションクラゲ」とも呼ばれた。",
    caution: "刺されると痛む。触手が長いので離れて観察すること。",
  },
  {
    id: "atolla-wyvillei",
    name: "クロカムリクラゲ",
    scientific: "Atolla wyvillei",
    hex: "#6e1220",
    accent: "#b23a4a",
    colorLabel: "暗い赤",
    size: "かさの直径 5〜15cm",
    habitat: "世界の深海（水深 1000m前後）",
    description:
      "深海に暮らす暗赤色のクラゲ。襲われると青い光を波のように点滅させ、より大きな捕食者を呼ぶといわれる。",
  },
  {
    id: "periphylla-periphylla",
    name: "ヘルメットジェリー",
    scientific: "Periphylla periphylla",
    hex: "#7a2e22",
    accent: "#c86a4a",
    colorLabel: "赤茶色",
    size: "かさの高さ 15〜35cm",
    habitat: "世界の深海",
    description:
      "とんがり帽子のような赤茶色のかさを持つ深海のクラゲ。深海では赤い光が届かないため、この色は水中でほぼ黒く見える。",
  },
  {
    id: "chrysaora-fuscescens",
    name: "パシフィックシーネットル",
    scientific: "Chrysaora fuscescens",
    hex: "#d4752a",
    accent: "#f3c08a",
    colorLabel: "金色がかったオレンジ",
    size: "かさの直径 30〜45cm",
    habitat: "北アメリカ西岸",
    description:
      "黄金色からオレンジ色のかさに、長い触手とレースのような口腕を垂らす。水族館の大型水槽でよく展示される。",
  },
  {
    id: "cyanea-capillata",
    name: "キタユウレイクラゲ",
    scientific: "Cyanea capillata",
    hex: "#b4603a",
    accent: "#e8a177",
    colorLabel: "赤みのある茶色",
    size: "かさの直径 50cm以上",
    habitat: "北太平洋・北大西洋の冷たい海",
    description:
      "ライオンのたてがみのような触手を持つ大型のクラゲ。かさは赤茶色で、記録上もっとも長くなるクラゲのひとつ。",
    caution: "触手が非常に長く、刺されると強く痛む。",
  },
  {
    id: "mastigias-etpisoni",
    name: "ゴールデンジェリーフィッシュ",
    scientific: "Mastigias papua etpisoni",
    hex: "#d9a227",
    accent: "#f0d08a",
    colorLabel: "黄金色",
    size: "かさの直径 10〜15cm",
    habitat: "パラオのジェリーフィッシュレイク",
    description:
      "湖に閉じ込められた環境で独自に進化したクラゲ。共生藻のため体が黄金色になり、太陽を追って群れで移動する。",
  },
  {
    id: "phacellophora-camtschatica",
    name: "フライドエッグジェリーフィッシュ",
    scientific: "Phacellophora camtschatica",
    hex: "#efdc9b",
    accent: "#fdf6e3",
    colorLabel: "うすい黄色",
    size: "かさの直径 30〜60cm",
    habitat: "太平洋の冷たい海",
    description:
      "白いかさの中央が黄色く盛り上がり、目玉焼きのように見える。刺す力が弱く、他のクラゲを食べて暮らす。",
  },
  {
    id: "mastigias-papua",
    name: "タコクラゲ",
    scientific: "Mastigias papua",
    hex: "#7e8c5a",
    accent: "#e6e2cf",
    colorLabel: "白い斑点の入ったオリーブ色",
    size: "かさの直径 10〜15cm",
    habitat: "日本南部〜西太平洋の浅い海",
    description:
      "八本の口腕がタコの足のように見える。体内の共生藻の色で、かさがオリーブ色から褐色に色づく。",
  },
  {
    id: "cassiopea-ornata",
    name: "サカサクラゲ",
    scientific: "Cassiopea ornata",
    hex: "#7d8c4f",
    accent: "#c8c89a",
    colorLabel: "くすんだ黄緑",
    size: "かさの直径 10〜20cm",
    habitat: "沖縄などの暖かい浅瀬",
    description:
      "かさを下にして海底に寝たまま暮らす変わったクラゲ。共生藻に光を当てるための姿勢で、体は黄緑から褐色に見える。",
  },
  {
    id: "aequorea-victoria",
    name: "オワンクラゲ",
    scientific: "Aequorea victoria",
    hex: "#5fd39a",
    accent: "#c6f3dd",
    colorLabel: "緑に光る半透明",
    size: "かさの直径 3〜10cm",
    habitat: "北アメリカ西岸",
    description:
      "緑色蛍光タンパク質（GFP）が見つかったクラゲ。かさの縁が青い光を受けて緑色に発光する。GFPの研究はノーベル化学賞につながった。",
  },
  {
    id: "nemopilema-nomurai",
    name: "エチゼンクラゲ",
    scientific: "Nemopilema nomurai",
    hex: "#a1958a",
    accent: "#cfc4b6",
    colorLabel: "灰色がかった褐色",
    size: "かさの直径 1m以上",
    habitat: "東シナ海・日本海",
    description:
      "日本近海で最大級のクラゲで、重さが200kgに達することもある。体色は灰褐色で、大量発生すると漁網を破るほどになる。",
    caution: "刺されると痛む。大型なので漁業被害も大きい。",
  },
];
