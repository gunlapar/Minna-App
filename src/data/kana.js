const baseRows = [
  [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']],
  [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']],
  [['さ', 'sa'], ['し', 'shi', ['si']], ['す', 'su'], ['せ', 'se'], ['そ', 'so']],
  [['た', 'ta'], ['ち', 'chi', ['ti']], ['つ', 'tsu', ['tu']], ['て', 'te'], ['と', 'to']],
  [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']],
  [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu', ['hu']], ['へ', 'he'], ['ほ', 'ho']],
  [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']],
  [['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo']],
  [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']],
  [['わ', 'wa'], ['を', 'wo', ['o']], ['ん', 'n']],
];

const voicedRows = [
  [['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go']],
  [['ざ', 'za'], ['じ', 'ji', ['zi']], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo']],
  [['だ', 'da'], ['ぢ', 'dji', ['di']], ['づ', 'dzu', ['du', 'zu']], ['で', 'de'], ['ど', 'do']],
  [['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']],
  [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']],
  [['ゔ', 'vu']],
];

const yoonRows = [
  [['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo'], ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo']],
  [['しゃ', 'sha', ['sya']], ['しゅ', 'shu', ['syu']], ['しょ', 'sho', ['syo']], ['じゃ', 'ja', ['jya', 'zya']], ['じゅ', 'ju', ['jyu', 'zyu']], ['じょ', 'jo', ['jyo', 'zyo']]],
  [['ちゃ', 'cha', ['tya']], ['ちゅ', 'chu', ['tyu']], ['ちょ', 'cho', ['tyo']], ['ぢゃ', 'dja', ['dya']], ['ぢゅ', 'dju', ['dyu']], ['ぢょ', 'djo', ['dyo']]],
  [['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo']],
  [['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo'], ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo'], ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']],
  [['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo']],
  [['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo']],
];

const katakanaMap = {
  'あ':'ア','い':'イ','う':'ウ','え':'エ','お':'オ','か':'カ','き':'キ','く':'ク','け':'ケ','こ':'コ','さ':'サ','し':'シ','す':'ス','せ':'セ','そ':'ソ','た':'タ','ち':'チ','つ':'ツ','て':'テ','と':'ト','な':'ナ','に':'ニ','ぬ':'ヌ','ね':'ネ','の':'ノ','は':'ハ','ひ':'ヒ','ふ':'フ','へ':'ヘ','ほ':'ホ','ま':'マ','み':'ミ','む':'ム','め':'メ','も':'モ','や':'ヤ','ゆ':'ユ','よ':'ヨ','ら':'ラ','り':'リ','る':'ル','れ':'レ','ろ':'ロ','わ':'ワ','を':'ヲ','ん':'ン','が':'ガ','ぎ':'ギ','ぐ':'グ','げ':'ゲ','ご':'ゴ','ざ':'ザ','じ':'ジ','ず':'ズ','ぜ':'ゼ','ぞ':'ゾ','だ':'ダ','ぢ':'ヂ','づ':'ヅ','で':'デ','ど':'ド','ば':'バ','び':'ビ','ぶ':'ブ','べ':'ベ','ぼ':'ボ','ぱ':'パ','ぴ':'ピ','ぷ':'プ','ぺ':'ペ','ぽ':'ポ','ゔ':'ヴ','ゃ':'ャ','ゅ':'ュ','ょ':'ョ'
};

const toKana = (rows, script) => rows.flat().map(([character, romanization, aliases = []]) => {
  const kana = script === 'katakana' ? [...character].map((symbol) => katakanaMap[symbol]).join('') : character;
  return { id: `${script}-${kana}`, japanese: kana, meaning: romanization, answers: [romanization, ...aliases], group: '' };
});

export const kanaSets = {
  hiragana: {
    label: 'Hiragana',
    groups: [
      { label: 'Gojūon', characters: toKana(baseRows, 'hiragana') },
      { label: 'Dakuten & Handakuten', characters: toKana(voicedRows, 'hiragana') },
      { label: 'Kombinasi Yōon', characters: toKana(yoonRows, 'hiragana') },
    ],
  },
  katakana: {
    label: 'Katakana',
    groups: [
      { label: 'Gojūon', characters: toKana(baseRows, 'katakana') },
      { label: 'Dakuten & Handakuten', characters: toKana(voicedRows, 'katakana') },
      { label: 'Kombinasi Yōon', characters: toKana(yoonRows, 'katakana') },
    ],
  },
};
