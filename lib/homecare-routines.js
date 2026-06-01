import { products } from './products.js'
import { buildExpertDecision } from './expert-engine.js'

function langText(lang, ru, de, en) {
  if (lang === 'RU') return ru
  if (lang === 'EN') return en
  return de
}

function clean(list) {
  return list.filter(Boolean)
}

function unique(list) {
  return [...new Set(list.filter(Boolean))]
}

const stepRU = {
  Reinigung: 'Очищение',
  Tonisierung: 'Тонизация',
  Serum: 'Сыворотка',
  Pflege: 'Крем',
  Schutz: 'Защита',
  Maske: 'Маска',
  Augenpflege: 'Уход за областью глаз',
  SOS: 'SOS-уход',
}

const purposeRU = {
  mycode_011: 'Ревитализирующая сыворотка для тусклой, уставшей кожи, сияния и антиоксидантной поддержки.',
  mycode_021: 'Успокаивающая сыворотка для чувствительной, реактивной кожи, покраснений и раздражений.',
  mycode_031: 'Увлажняюще-питательная сыворотка для сухой, обезвоженной кожи и ощущения комфорта.',
  mycode_051: 'Плампинг-сыворотка при морщинах, потере объёма и видимых возрастных изменениях.',
  mycode_052: 'Уплотняющий anti-age крем при морщинах и снижении плотности кожи.',
  mycode_053: 'Насыщенный уплотняющий крем для очень сухой зрелой кожи с морщинами.',
  mycode_061: 'Укрепляющая сыворотка при потере упругости, контуров и плотности кожи.',
  mycode_062: 'Укрепляющий крем для поддержки овала лица, тонуса и упругости кожи.',
  mycode_071: 'Обновляющая ретиноловая сыворотка при фотостарении, морщинах и неровной текстуре.',
  mycode_072: 'Восстанавливающий ретиноловый крем для поддержки обновления и регенерации кожи.',
  mycode_095: 'Увлажняюще-питательная маска для комфорта, регенерации и восстановления кожи.',

  summsun_spf50_sensitive: 'Ежедневная UVA/UVB-защита SPF50+ для чувствительной кожи.',

  beclarity_clarifying_cleanser: 'Очищение при пигментных пятнах, неровном тоне и поствоспалительных следах.',
  beclarity_dark_spot_eraser: 'Точечный уход при тёмных пятнах и гиперпигментации.',
  beclarity_blemish_corrector_serum: 'Сыворотка для более ровного тона и коррекции пигментных изменений.',
  beclarity_blemish_controller_spf50: 'Дневной крем SPF50 при пигментации и неровном тоне.',

  hydro_repairer_serum: 'Восстанавливающая увлажняющая сыворотка при выраженном дефиците влаги.',

  balance_cleansing_mousse: 'Ежедневное очищение для жирной, проблемной и склонной к акне кожи.',
  balance_balancing_lotion: 'Лосьон для баланса кожи, контроля себума и более чистого вида.',
  balance_pure_regulator: 'Себорегулирующая сыворотка-гель при жирной коже, высыпаниях и расширенных порах.',
  balance_hydro_balance: 'Лёгкий увлажняющий крем-гель для жирной и комбинированной кожи.',
  balance_drying_gel: 'Локальный SOS-уход при отдельных воспалениях и высыпаниях.',

  nicely_gentle_cleanser: 'Мягкое очищение для чувствительной, реактивной и склонной к покраснениям кожи.',
  nicely_sweet_toner: 'Успокаивающий тоник для поддержки кожного барьера.',
  nicely_hydration_serum: 'Сыворотка для увлажнения и поддержки барьера чувствительной кожи.',
  nicely_hydration_cream: 'Успокаивающий увлажняющий крем для укрепления защитного барьера.',
  nicely_smooth_final_spf50: 'Ежедневная SPF50+ защита для чувствительной кожи.',

  glaciar_cleansing_milk: 'Мягкое очищение для сухой, нормальной и обезвоженной кожи.',
  glaciar_soft_lotion: 'Увлажняющий лосьон для свежести, комфорта и подготовки кожи.',
  hydraluronic_serum_gel: 'Интенсивное увлажнение с гиалуроновой кислотой для обезвоженной кожи.',
  glaciar_plus_hydration_cream: 'Насыщенный увлажняющий крем для сухой кожи.',
  glaciar_hydration_cream: 'Увлажняющий крем для нормальной и комбинированной кожи.',

  cell_c_cleansing_mousse: 'Очищение в витамин-C концепции для свежести и сияния.',
  cell_c_renewal_serum: 'AHA и витамин-C сыворотка для сияния, обновления и более ровного тона.',
  cell_c_regenerating_cream: 'Витамин-C anti-age крем для нормальной и комбинированной кожи.',
  cell_c_hydro_nourishing_cream: 'Более насыщенный витамин-C крем для сухой кожи.',

  cell_activator_serum: 'Питательная anti-age сыворотка при первых возрастных изменениях.',
  cell_vitality_cream: 'Ревитализирующий anti-age крем для поддержки эластичности кожи.',
}

function product(key, lang) {
  const item = products[key]
  if (!item) return null

  return {
    ...item,
    step: lang === 'RU' ? stepRU[item.step] || item.step : item.step,
    purpose: lang === 'RU' ? purposeRU[key] || item.purpose : item.purpose,
  }
}

function usedLinesFrom(...groups) {
  return unique(
    groups
      .flat()
      .filter(Boolean)
      .map((item) => item.line)
  )
}

export function buildHomecareRecommendation(formData = {}) {
  const lang = formData.lang || 'DE'
  const decision = buildExpertDecision(formData)

  const primary = decision.primary
  const age = decision.age || Number(formData.age || 0)
  const flags = decision.flags || {}

  let morning = []
  let evening = []
  let weeklySupport = []
  let priorities = []

  if (primary === 'MYCODE') {
    const serums = []

    if (flags.hasLifting) serums.push(product('mycode_061', lang))
    if (flags.hasWrinkles || age >= 45) serums.push(product('mycode_051', lang))
    if (flags.hasPhotoaging) serums.push(product('mycode_071', lang))
    if (flags.sensitive) serums.push(product('mycode_021', lang))
    if (flags.dehydrated) serums.push(product('mycode_031', lang))

    const selectedSerums = clean(serums).slice(0, 3)

    let cream = product('mycode_052', lang)

    if (flags.hasLifting) cream = product('mycode_062', lang)
    if (flags.hasPhotoaging) cream = product('mycode_072', lang)
    if (flags.dehydrated && age >= 55) cream = product('mycode_053', lang)

    morning = clean([
      ...selectedSerums,
      cream,
      product('summsun_spf50_sensitive', lang),
    ])

    evening = clean([
      ...selectedSerums,
      cream,
    ])

    weeklySupport = clean([
      product('mycode_095', lang),
    ])

    priorities = [
      langText(lang, 'Персональная anti-age коррекция', 'Personalisierte Anti-Aging-Korrektur', 'Personalized anti-aging correction'),
      langText(lang, 'Подбор до 3 сывороток MYCODE', 'Auswahl von bis zu 3 MYCODE Seren', 'Selection of up to 3 MYCODE serums'),
      langText(lang, 'Ежедневная SPF-защита', 'Täglicher UV-Schutz', 'Daily SPF protection'),
    ]
  }

  if (primary === 'BECLARITY') {
    morning = clean([
      product('beclarity_clarifying_cleanser', lang),
      product('beclarity_blemish_corrector_serum', lang),
      product('beclarity_blemish_controller_spf50', lang),
    ])

    evening = clean([
      product('beclarity_clarifying_cleanser', lang),
      product('beclarity_dark_spot_eraser', lang),
      product('beclarity_blemish_corrector_serum', lang),
    ])

    if (flags.dehydrated) {
      weeklySupport = clean([
        product('hydro_repairer_serum', lang),
      ])
    }

    priorities = [
      langText(lang, 'Коррекция пигментации', 'Pigmentkorrektur', 'Pigmentation correction'),
      langText(lang, 'Выравнивание тона кожи', 'Ausgleich des Hauttons', 'Even skin tone'),
      langText(lang, 'Строгая SPF-защита', 'Konsequenter UV-Schutz', 'Strict SPF protection'),
    ]
  }

  if (primary === 'BALANCE') {
    morning = clean([
      product('balance_cleansing_mousse', lang),
      product('balance_balancing_lotion', lang),
      product('balance_pure_regulator', lang),
      product('summsun_spf50_sensitive', lang),
    ])

    evening = clean([
      product('balance_cleansing_mousse', lang),
      product('balance_balancing_lotion', lang),
      product('balance_pure_regulator', lang),
      product('balance_hydro_balance', lang),
    ])

    weeklySupport = clean([
      product('balance_drying_gel', lang),
    ])

    priorities = [
      langText(lang, 'Контроль себума', 'Sebumkontrolle', 'Sebum control'),
      langText(lang, 'Снижение воспалительных элементов', 'Reduktion von Unreinheiten', 'Reduction of blemishes'),
    ]
  }

  if (primary === 'NICELY') {
    morning = clean([
      product('nicely_gentle_cleanser', lang),
      product('nicely_sweet_toner', lang),
      product('nicely_hydration_serum', lang),
      product('nicely_hydration_cream', lang),
      product('nicely_smooth_final_spf50', lang),
    ])

    evening = clean([
      product('nicely_gentle_cleanser', lang),
      product('nicely_sweet_toner', lang),
      product('nicely_hydration_serum', lang),
      product('nicely_hydration_cream', lang),
    ])

    priorities = [
      langText(lang, 'Восстановление барьера', 'Barrierestärkung', 'Barrier support'),
      langText(lang, 'Снижение чувствительности', 'Reduktion der Empfindlichkeit', 'Sensitivity reduction'),
    ]
  }

  if (primary === 'GLACIAR') {
    morning = clean([
      product('glaciar_cleansing_milk', lang),
      product('glaciar_soft_lotion', lang),
      product('hydraluronic_serum_gel', lang),
      product('glaciar_plus_hydration_cream', lang),
      product('summsun_spf50_sensitive', lang),
    ])

    evening = clean([
      product('glaciar_cleansing_milk', lang),
      product('glaciar_soft_lotion', lang),
      product('hydraluronic_serum_gel', lang),
      product('glaciar_plus_hydration_cream', lang),
    ])

    weeklySupport = clean([
      product('hydro_repairer_serum', lang),
    ])

    priorities = [
      langText(lang, 'Восстановление увлажнённости', 'Feuchtigkeitsaufbau', 'Hydration recovery'),
      langText(lang, 'Комфорт кожи', 'Hautkomfort', 'Skin comfort'),
    ]
  }

  if (primary === 'CELL_C') {
    morning = clean([
      product('cell_c_cleansing_mousse', lang),
      product('cell_c_renewal_serum', lang),
      product('cell_c_regenerating_cream', lang),
      product('summsun_spf50_sensitive', lang),
    ])

    evening = clean([
      product('cell_c_cleansing_mousse', lang),
      product('cell_c_renewal_serum', lang),
      product('cell_c_hydro_nourishing_cream', lang),
    ])

    priorities = [
      langText(lang, 'Сияние кожи', 'Glow und Leuchtkraft', 'Glow and radiance'),
      langText(lang, 'Антиоксидантная защита', 'Antioxidativer Schutz', 'Antioxidant protection'),
    ]
  }

  if (primary === 'CELL') {
    morning = clean([
      product('cell_activator_serum', lang),
      product('cell_vitality_cream', lang),
      product('summsun_spf50_sensitive', lang),
    ])

    evening = clean([
      product('cell_activator_serum', lang),
      product('cell_vitality_cream', lang),
    ])

    priorities = [
      langText(lang, 'Профилактика возрастных изменений', 'Anti-Aging-Prävention', 'Anti-aging prevention'),
      langText(lang, 'Поддержка жизненной силы кожи', 'Unterstützung der Hautvitalität', 'Skin vitality support'),
    ]
  }

  const avoid = [
    langText(lang, 'Не перегружать кожу слишком большим количеством активов', 'Die Haut nicht mit zu vielen Wirkstoffen überladen', 'Do not overload the skin with too many actives'),
    langText(lang, 'Не использовать активные средства без ежедневной SPF-защиты', 'Aktive Pflege nicht ohne täglichen SPF verwenden', 'Do not use active care without daily SPF'),
  ]

  const usedLines = usedLinesFrom(morning, evening, weeklySupport)

  const secondaryLines = usedLines.filter(
    (line) =>
      line !== primary &&
      line !== 'MYCODE ADVANCED' &&
      line !== 'SUMMESUN'
  )

  return {
    decision,
    strategy: usedLines.join(' + '),
    primaryLine: primary,
    secondaryLines,
    lines: usedLines,
    priorities,
    morning,
    evening,
    weeklySupport,
    avoid,
  }
}

export const generateHomecareRoutine = buildHomecareRecommendation
