import { products } from './products.js'
import { buildExpertDecision } from './expert-engine.js'

function p(key) {
  return products[key] || null
}

function clean(list) {
  return list.filter(Boolean)
}

function langText(lang, ru, de, en) {
  if (lang === 'RU') return ru
  if (lang === 'EN') return en
  return de
}

export function buildHomecareRecommendation(formData = {}) {
  const lang = formData.lang || 'DE'
  const decision = buildExpertDecision(formData)

  const {
    primary,
    support,
    age,
    sensitive,
    dehydrated,
  } = decision

  let morning = []
  let evening = []
  let weeklySupport = []
  let priorities = []
  let avoid = []

  if (primary === 'BECLARITY') {
    morning = clean([
      p('beclarity_clarifying_cleanser'),
      p('beclarity_blemish_corrector_serum'),
      p('beclarity_blemish_controller_spf50'),
    ])

    evening = clean([
      p('beclarity_clarifying_cleanser'),
      p('beclarity_dark_spot_eraser'),
      p('beclarity_blemish_corrector_serum'),
    ])

    if (dehydrated) {
      weeklySupport = clean([p('hydro_repairer_serum')])
    }

    priorities = [
      langText(lang, 'Коррекция пигментации', 'Pigmentkorrektur', 'Pigmentation correction'),
      langText(lang, 'Выравнивание тона кожи', 'Ausgleich des Hauttons', 'Even skin tone'),
      langText(lang, 'Строгая SPF-защита', 'Konsequenter UV-Schutz', 'Strict SPF protection'),
    ]
  }

  if (primary === 'MYCODE') {
    const text = JSON.stringify(formData).toLowerCase()

    const hasLifting =
      text.includes('лифтинг') ||
      text.includes('овал') ||
      text.includes('птоз') ||
      text.includes('firming') ||
      text.includes('lifting')

    const hasPhotoaging =
      text.includes('фотостар') ||
      text.includes('photoaging') ||
      text.includes('retinol') ||
      text.includes('ретинол')

    const serums = []

    if (hasLifting) serums.push(p('mycode_061'))
    serums.push(p('mycode_051'))

    if (hasPhotoaging) serums.push(p('mycode_071'))
    if (sensitive) serums.push(p('mycode_021'))
    if (dehydrated) serums.push(p('mycode_031'))

    const selectedSerums = clean(serums).slice(0, 3)

    let cream = p('mycode_052')

    if (hasLifting) cream = p('mycode_062')
    if (hasPhotoaging) cream = p('mycode_072')
    if (dehydrated && age >= 55) cream = p('mycode_053')

    morning = clean([
      ...selectedSerums,
      cream,
      p('summsun_spf50_sensitive'),
    ])

    evening = clean([
      ...selectedSerums,
      cream,
    ])

    weeklySupport = clean([p('mycode_095')])

    priorities = [
      langText(lang, 'Персональная anti-age коррекция', 'Personalisierte Anti-Aging-Korrektur', 'Personalized anti-aging correction'),
      langText(lang, 'Подбор до 3 сывороток MYCODE', 'Auswahl von bis zu 3 MYCODE Seren', 'Selection of up to 3 MYCODE serums'),
      langText(lang, 'Ежедневная SPF-защита', 'Täglicher UV-Schutz', 'Daily SPF protection'),
    ]
  }

  if (primary === 'BALANCE') {
    morning = clean([
      p('balance_cleansing_mousse'),
      p('balance_balancing_lotion'),
      p('balance_pure_regulator'),
      p('summsun_spf50_sensitive'),
    ])

    evening = clean([
      p('balance_cleansing_mousse'),
      p('balance_balancing_lotion'),
      p('balance_pure_regulator'),
      p('balance_hydro_balance'),
    ])

    weeklySupport = clean([p('balance_drying_gel')])

    priorities = [
      langText(lang, 'Контроль себума', 'Sebumkontrolle', 'Sebum control'),
      langText(lang, 'Снижение воспалительных элементов', 'Reduktion von Unreinheiten', 'Reduction of blemishes'),
    ]
  }

  if (primary === 'NICELY') {
    morning = clean([
      p('nicely_gentle_cleanser'),
      p('nicely_sweet_toner'),
      p('nicely_hydration_serum'),
      p('nicely_hydration_cream'),
      p('nicely_smooth_final_spf50'),
    ])

    evening = clean([
      p('nicely_gentle_cleanser'),
      p('nicely_sweet_toner'),
      p('nicely_hydration_serum'),
      p('nicely_hydration_cream'),
    ])

    priorities = [
      langText(lang, 'Восстановление барьера', 'Barrierestärkung', 'Barrier support'),
      langText(lang, 'Снижение чувствительности', 'Reduktion der Empfindlichkeit', 'Sensitivity reduction'),
    ]
  }

  if (primary === 'GLACIAR') {
    morning = clean([
      p('glaciar_cleansing_milk'),
      p('glaciar_soft_lotion'),
      p('hydraluronic_serum_gel'),
      p('glaciar_plus_hydration_cream'),
      p('summsun_spf50_sensitive'),
    ])

    evening = clean([
      p('glaciar_cleansing_milk'),
      p('glaciar_soft_lotion'),
      p('hydraluronic_serum_gel'),
      p('glaciar_plus_hydration_cream'),
    ])

    weeklySupport = clean([p('hydro_repairer_serum')])

    priorities = [
      langText(lang, 'Восстановление увлажнённости', 'Feuchtigkeitsaufbau', 'Hydration recovery'),
      langText(lang, 'Комфорт кожи', 'Hautkomfort', 'Skin comfort'),
    ]
  }

  if (primary === 'CELL_C') {
    morning = clean([
      p('cell_c_cleansing_mousse'),
      p('cell_c_renewal_serum'),
      p('cell_c_regenerating_cream'),
      p('summsun_spf50_sensitive'),
    ])

    evening = clean([
      p('cell_c_cleansing_mousse'),
      p('cell_c_renewal_serum'),
      p('cell_c_hydro_nourishing_cream'),
    ])

    priorities = [
      langText(lang, 'Сияние кожи', 'Glow und Leuchtkraft', 'Glow and radiance'),
      langText(lang, 'Антиоксидантная защита', 'Antioxidativer Schutz', 'Antioxidant protection'),
    ]
  }

  if (primary === 'CELL') {
    morning = clean([
      p('cell_activator_serum'),
      p('cell_vitality_cream'),
      p('summsun_spf50_sensitive'),
    ])

    evening = clean([
      p('cell_activator_serum'),
      p('cell_vitality_cream'),
    ])

    priorities = [
      langText(lang, 'Профилактика возрастных изменений', 'Anti-Aging-Prävention', 'Anti-aging prevention'),
      langText(lang, 'Поддержка жизненной силы кожи', 'Unterstützung der Hautvitalität', 'Skin vitality support'),
    ]
  }

  avoid = [
    langText(lang, 'Не перегружать кожу слишком большим количеством активов', 'Die Haut nicht mit zu vielen Wirkstoffen überladen', 'Do not overload the skin with too many actives'),
    langText(lang, 'Не использовать активные средства без ежедневной SPF-защиты', 'Aktive Pflege nicht ohne täglichen SPF verwenden', 'Do not use active care without daily SPF'),
  ]

  const usedLines = [
    ...new Set(
      [...morning, ...evening, ...weeklySupport]
        .filter(Boolean)
        .map((item) => item.line)
    ),
  ]

  return {
    decision,
    strategy: usedLines.join(' + '),
    primaryLine: primary,
    secondaryLines: support.filter((line) => line !== 'SUMMESUN'),
    lines: usedLines,
    priorities,
    morning,
    evening,
    weeklySupport,
    avoid,
  }
}

export const generateHomecareRoutine = buildHomecareRecommendation
