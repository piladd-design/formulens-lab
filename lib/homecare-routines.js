import { products } from './products.js'
import {
  getPrimaryCollection,
  getSupportCollections,
  detectConcerns,
} from './diagnostic-matrix.js'

function p(key) {
  return products[key] || null
}

function clean(list) {
  return list.filter(Boolean)
}

function has(text, words) {
  return words.some((word) => text.includes(word))
}

function langText(lang, ru, de, en) {
  if (lang === 'RU') return ru
  if (lang === 'EN') return en
  return de
}

export function buildHomecareRecommendation(formData = {}) {
  const lang = formData.lang || 'DE'
  const age = Number(formData.age || 0)
  const text = JSON.stringify(formData).toLowerCase()

  const primary = getPrimaryCollection(formData)
  const support = getSupportCollections(formData)
  const detectedConcerns = detectConcerns(formData)

  const isDry = has(text, ['сух', 'dry', 'trocken', 'обезвож', 'dehydrated'])
  const isSensitive = has(text, ['чувств', 'sensitive', 'sensibel', 'покрас', 'redness', 'rötung'])
  const hasWrinkles = has(text, ['морщ', 'wrinkle', 'falten', 'anti-age', 'antiaging'])
  const hasLifting = has(text, ['лифтинг', 'овал', 'птоз', 'дрябл', 'упруг', 'lifting', 'firming', 'kontur'])
  const hasPhotoaging = has(text, ['фотостар', 'photoaging', 'retinol', 'ретинол', 'текстура'])
  const hasGlow = has(text, ['сиян', 'glow', 'тускл', 'dull', 'fahle'])
  const hasNeck = has(text, ['шея', 'декольте', 'neck', 'decollete', 'hals', 'dekolleté'])

  let morning = []
  let evening = []
  let weeklySupport = []
  let priorities = []
  let avoid = []

  if (primary === 'MYCODE') {
    const serums = []

    if (hasLifting) serums.push(p('mycode_061'))
    if (hasWrinkles || age >= 45) serums.push(p('mycode_051'))
    if (hasPhotoaging) serums.push(p('mycode_071'))
    if (isSensitive) serums.push(p('mycode_021'))
    if (isDry) serums.push(p('mycode_031'))
    if (hasGlow) serums.push(p('mycode_011'))
    if (hasNeck) serums.push(p('mycode_081'))

    const selectedSerums = clean(serums).slice(0, 3)

    let cream = p('mycode_052')

    if (hasLifting) cream = p('mycode_062')
    if (hasPhotoaging) cream = p('mycode_072')
    if (isSensitive && !hasWrinkles && !hasLifting) cream = p('mycode_022')
    if (isDry && (hasWrinkles || age >= 55)) cream = p('mycode_053')
    if (isDry && !hasWrinkles && !hasLifting) cream = p('mycode_032')
    if (hasNeck) cream = p('mycode_082')

    morning = [
      ...selectedSerums,
      cream,
      p('summsun_spf50_sensitive'),
    ]

    evening = [
      ...selectedSerums,
      cream,
    ]

    weeklySupport = [
      p('mycode_095'),
    ]

    priorities = [
      langText(lang, 'Персональная anti-age коррекция', 'Personalisierte Anti-Aging-Korrektur', 'Personalized anti-aging correction'),
      langText(lang, 'Подбор до 3 сывороток MYCODE', 'Auswahl von bis zu 3 MYCODE Seren', 'Selection of up to 3 MYCODE serums'),
      langText(lang, 'Ежедневная SPF-защита', 'Täglicher UV-Schutz', 'Daily SPF protection'),
    ]

    avoid = [
      langText(lang, 'Не перегружать кожу слишком большим количеством активов', 'Die Haut nicht mit zu vielen Wirkstoffen überladen', 'Do not overload the skin with too many actives'),
      langText(lang, 'Не использовать ретинол без SPF утром', 'Retinol nicht ohne morgendlichen SPF verwenden', 'Do not use retinol without morning SPF'),
    ]
  }

  if (primary === 'BALANCE') {
    morning = [
      p('balance_cleansing_mousse'),
      p('balance_balancing_lotion'),
      p('balance_pure_regulator'),
      p('summsun_spf50_sensitive'),
    ]

    evening = [
      p('balance_cleansing_mousse'),
      p('balance_balancing_lotion'),
      p('balance_pure_regulator'),
      p('balance_hydro_balance'),
    ]

    weeklySupport = [p('balance_drying_gel')]

    priorities = [
      langText(lang, 'Контроль себума', 'Sebumkontrolle', 'Sebum control'),
      langText(lang, 'Снижение воспалительных элементов', 'Reduktion von Unreinheiten', 'Reduction of blemishes'),
    ]

    avoid = [
      langText(lang, 'Плотные жирные кремы', 'Schwere okklusive Cremes', 'Heavy occlusive creams'),
      langText(lang, 'Агрессивные скрабы', 'Aggressive Scrubs', 'Aggressive scrubs'),
    ]
  }

  if (primary === 'BECLARITY') {
    morning = [
      p('beclarity_clarifying_cleanser'),
      p('beclarity_blemish_corrector_serum'),
      p('beclarity_blemish_controller_spf50'),
    ]

    evening = [
      p('beclarity_clarifying_cleanser'),
      p('beclarity_dark_spot_eraser'),
      p('beclarity_blemish_corrector_serum'),
    ]

    priorities = [
      langText(lang, 'Коррекция пигментации', 'Pigmentkorrektur', 'Pigmentation correction'),
      langText(lang, 'Выравнивание тона кожи', 'Ausgleich des Hauttons', 'Even skin tone'),
      langText(lang, 'Строгая SPF-защита', 'Konsequenter UV-Schutz', 'Strict SPF protection'),
    ]

    avoid = [
      langText(lang, 'Солнце без SPF', 'Sonne ohne SPF', 'Sun without SPF'),
      langText(lang, 'Нерегулярный уход', 'Unregelmäßige Pflege', 'Inconsistent routine'),
    ]
  }

  if (primary === 'NICELY') {
    morning = [
      p('nicely_gentle_cleanser'),
      p('nicely_sweet_toner'),
      p('nicely_hydration_serum'),
      p('nicely_hydration_cream'),
      p('nicely_smooth_final_spf50'),
    ]

    evening = [
      p('nicely_gentle_cleanser'),
      p('nicely_sweet_toner'),
      p('nicely_hydration_serum'),
      p('nicely_hydration_cream'),
    ]

    priorities = [
      langText(lang, 'Восстановление барьера', 'Barrierestärkung', 'Barrier support'),
      langText(lang, 'Снижение чувствительности', 'Reduktion der Empfindlichkeit', 'Sensitivity reduction'),
    ]

    avoid = [
      langText(lang, 'Сильные кислоты', 'Starke Säuren', 'Strong acids'),
      langText(lang, 'Частое отшелушивание', 'Zu häufiges Peeling', 'Frequent exfoliation'),
    ]
  }

  if (primary === 'GLACIAR') {
    morning = [
      p('glaciar_cleansing_milk'),
      p('glaciar_soft_lotion'),
      p('hydraluronic_serum_gel'),
      isDry ? p('glaciar_plus_hydration_cream') : p('glaciar_hydration_cream'),
      p('summsun_spf50_sensitive'),
    ]

    evening = [
      p('glaciar_cleansing_milk'),
      p('glaciar_soft_lotion'),
      p('hydraluronic_serum_gel'),
      isDry ? p('glaciar_plus_hydration_cream') : p('glaciar_hydration_cream'),
    ]

    weeklySupport = [p('hydro_repairer_serum')]

    priorities = [
      langText(lang, 'Восстановление увлажнённости', 'Feuchtigkeitsaufbau', 'Hydration recovery'),
      langText(lang, 'Комфорт кожи', 'Hautkomfort', 'Skin comfort'),
    ]

    avoid = [
      langText(lang, 'Пересушивающее очищение', 'Austrocknende Reinigung', 'Over-cleansing'),
      langText(lang, 'Сыворотка без крема сверху', 'Serum ohne abschließende Creme', 'Serum without cream on top'),
    ]
  }

  if (primary === 'CELL_C') {
    morning = [
      p('cell_c_cleansing_mousse'),
      p('cell_c_renewal_serum'),
      p('cell_c_regenerating_cream'),
      p('summsun_spf50_sensitive'),
    ]

    evening = [
      p('cell_c_cleansing_mousse'),
      p('cell_c_renewal_serum'),
      p('cell_c_hydro_nourishing_cream'),
    ]

    priorities = [
      langText(lang, 'Сияние кожи', 'Glow und Leuchtkraft', 'Glow and radiance'),
      langText(lang, 'Антиоксидантная защита', 'Antioxidativer Schutz', 'Antioxidant protection'),
    ]

    avoid = [
      langText(lang, 'Кислоты без SPF', 'Säuren ohne SPF', 'Acids without SPF'),
      langText(lang, 'Слишком частое обновление кожи', 'Zu häufige Hauterneuerung', 'Too frequent renewal'),
    ]
  }

  if (primary === 'CELL') {
    morning = [
      p('cell_activator_serum'),
      p('cell_vitality_cream'),
      p('summsun_spf50_sensitive'),
    ]

    evening = [
      p('cell_activator_serum'),
      p('cell_vitality_cream'),
    ]

    priorities = [
      langText(lang, 'Профилактика возрастных изменений', 'Anti-Aging-Prävention', 'Anti-aging prevention'),
      langText(lang, 'Поддержка жизненной силы кожи', 'Unterstützung der Hautvitalität', 'Skin vitality support'),
    ]

    avoid = [
      langText(lang, 'Пропуск SPF', 'SPF nicht auslassen', 'Skipping SPF'),
      langText(lang, 'Слишком частая смена ухода', 'Pflege nicht zu häufig wechseln', 'Changing routine too often'),
    ]
  }

  return {
    detectedConcerns,
    strategy: [primary, ...support].join(' + '),
    primaryLine: primary,
    secondaryLines: support.filter((line) => line !== 'SUMMESUN'),
    lines: [primary, ...support],
    priorities,
    morning: clean(morning),
    evening: clean(evening),
    weeklySupport: clean(weeklySupport),
    avoid,
  }
}

export const generateHomecareRoutine = buildHomecareRecommendation
