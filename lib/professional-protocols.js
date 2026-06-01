// lib/professional-protocols.js

const LANG = {
  RU: {
    title: 'FORMULENS PROFESSIONAL PROTOCOL',
    duration: '60 минут',
    basePrep: 'Подготовка кожи',
    activePhase: 'Активная фаза',
    maskPhase: 'Маска',
    finalPhase: 'Завершение и защита',
    equipment: 'Оборудование',
    frequency: 'Рекомендуемый курс',
    note: 'Профессиональный протокол подбирается косметологом с учётом состояния кожи, чувствительности и переносимости активных компонентов.',
  },
  DE: {
    title: 'FORMULENS PROFESSIONAL PROTOCOL',
    duration: '60 Minuten',
    basePrep: 'Hautvorbereitung',
    activePhase: 'Aktivphase',
    maskPhase: 'Maske',
    finalPhase: 'Abschluss und Schutz',
    equipment: 'Geräte',
    frequency: 'Empfohlene Kur',
    note: 'Das professionelle Protokoll wird von der Kosmetikerin je nach Hautzustand, Empfindlichkeit und Verträglichkeit der Wirkstoffe angepasst.',
  },
  EN: {
    title: 'FORMULENS PROFESSIONAL PROTOCOL',
    duration: '60 minutes',
    basePrep: 'Skin preparation',
    activePhase: 'Active phase',
    maskPhase: 'Mask',
    finalPhase: 'Final care and protection',
    equipment: 'Equipment',
    frequency: 'Recommended course',
    note: 'The professional protocol should be adjusted by the cosmetologist according to skin condition, sensitivity and tolerance.',
  },
}

const T = {
  RU: {
    categories: {
      cleansing: 'Очищение',
      toning: 'Тонизация',
      peeling: 'Пилинг',
      concentrate: 'Концентрат',
      mask: 'Маска',
      protection: 'Защита',
      lip: 'Губы',
    },
    lines: {
      MYCODE: 'MYCODE ADVANCED PROFESSIONAL LAB',
      ESSENTIAL: 'ESSENTIAL CARE CONCEPT',
      SUMMESUN: 'SUMMESUN',
    },
  },
  DE: {
    categories: {
      cleansing: 'Reinigung',
      toning: 'Tonisierung',
      peeling: 'Peeling',
      concentrate: 'Konzentrat',
      mask: 'Maske',
      protection: 'Schutz',
      lip: 'Lippenpflege',
    },
    lines: {
      MYCODE: 'MYCODE ADVANCED PROFESSIONAL LAB',
      ESSENTIAL: 'ESSENTIAL CARE CONCEPT',
      SUMMESUN: 'SUMMESUN',
    },
  },
  EN: {
    categories: {
      cleansing: 'Cleansing',
      toning: 'Toning',
      peeling: 'Peeling',
      concentrate: 'Concentrate',
      mask: 'Mask',
      protection: 'Protection',
      lip: 'Lip care',
    },
    lines: {
      MYCODE: 'MYCODE ADVANCED PROFESSIONAL LAB',
      ESSENTIAL: 'ESSENTIAL CARE CONCEPT',
      SUMMESUN: 'SUMMESUN',
    },
  },
}

const MYCODE_CONCENTRATES = {
  '01': {
    id: 'MYCODE_PRO_01',
    code: '01',
    name: 'Revitalising Code',
    fullName: '01 Revitalising Code Revitalising Facial Concentrate',
    targets: ['tired_skin', 'dullness', 'oxidative_stress', 'lack_of_energy'],
    priority: 70,
    avoidIf: [],
  },
  '02': {
    id: 'MYCODE_PRO_02',
    code: '02',
    name: 'Comforting Code',
    fullName: '02 Comforting Code Comforting Facial Concentrate',
    targets: ['sensitivity', 'redness', 'irritation', 'reactive_skin', 'rosacea'],
    priority: 95,
    avoidIf: [],
  },
  '03': {
    id: 'MYCODE_PRO_03',
    code: '03',
    name: 'Hydro-Nourishing Code',
    fullName: '03 Hydro-Nourishing Code Hydro-Nourishing Facial Concentrate',
    targets: ['dryness', 'dehydration', 'malnourished_skin', 'tightness'],
    priority: 90,
    avoidIf: [],
  },
  '04': {
    id: 'MYCODE_PRO_04',
    code: '04',
    name: 'Depigmenting Code',
    fullName: '04 Depigmenting Code Depigmenting Facial Concentrate',
    targets: ['pigmentation', 'dark_spots', 'uneven_tone', 'melasma'],
    priority: 92,
    avoidIf: [],
  },
  '05': {
    id: 'MYCODE_PRO_05',
    code: '05',
    name: 'Replenish Code',
    fullName: '05 Replenish Code Replenishing Facial Concentrate',
    targets: ['wrinkles', 'deep_wrinkles', 'loss_of_density', 'loss_of_volume'],
    priority: 88,
    avoidIf: [],
  },
  '06': {
    id: 'MYCODE_PRO_06',
    code: '06',
    name: 'Reaffirming Code',
    fullName: '06 Reaffirming Code Reaffirming Facial Concentrate',
    targets: ['lifting', 'flaccidity', 'loss_of_firmness', 'sagging', 'facial_contours'],
    priority: 90,
    avoidIf: [],
  },
  '07': {
    id: 'MYCODE_PRO_07',
    code: '07',
    name: 'Renewing Code - Retinol',
    fullName: '07 Renewing Code - Retinol Renewing Facial Concentrate',
    targets: ['wrinkles', 'photoaging', 'dullness', 'uneven_texture', 'renewal', 'pores'],
    priority: 86,
    avoidIf: ['high_sensitivity', 'rosacea', 'strong_redness', 'irritation'],
    retinol: true,
  },
  '08': {
    id: 'MYCODE_PRO_08',
    code: '08',
    name: 'Remodelling Code',
    fullName: '08 Remodelling Code Neck and Décolleté Remodelling Concentrate',
    targets: ['neck', 'decollete', 'double_chin', 'venus_rings', 'neck_flaccidity'],
    priority: 82,
    avoidIf: [],
  },
}

const MYCODE_MASKS = {
  '46': {
    id: 'MYCODE_MASK_46',
    code: '46',
    name: 'Revitalising Illuminating Hydrogel Mask',
    targets: ['tired_skin', 'dullness', 'oxidative_stress', 'glow'],
  },
  '47': {
    id: 'MYCODE_MASK_47',
    code: '47',
    name: 'Redensifying Plumping Sheet Mask',
    targets: ['wrinkles', 'loss_of_volume', 'plumping', 'retinol_support'],
  },
  '48': {
    id: 'MYCODE_MASK_48',
    code: '48',
    name: 'Restructuring Firming Hydrogel Mask',
    targets: ['lifting', 'flaccidity', 'loss_of_firmness', 'facial_contours'],
  },
  '95': {
    id: 'MYCODE_MASK_95',
    code: '95',
    name: 'Hydronutrition Hydro-Nourishing Face Mask',
    targets: ['dryness', 'dehydration', 'sensitivity', 'comfort'],
  },
  '39': {
    id: 'MYCODE_MASK_39',
    code: '39',
    name: 'Lifting Remodelling Rubber Mask',
    targets: ['lifting', 'firming', 'contours', 'professional_lifting'],
  },
}

function norm(value) {
  if (!value) return ''
  return String(value).toLowerCase()
}

function asTextArray(value) {
  if (!value) return []
  if (Array.isArray(value)) return value.map(norm)
  return [norm(value)]
}

function hasAny(text, words) {
  return words.some((word) => text.includes(word))
}

function detectConcerns(input = {}) {
  const all = [
    input.concerns,
    input.goal,
    input.skinType,
    input.sensitivity,
    input.age,
  ]
    .flatMap(asTextArray)
    .join(' ')

  const flags = {
    wrinkles: hasAny(all, ['wrinkle', 'falten', 'морщ', 'anti-age', 'anti age']),
    lifting: hasAny(all, ['lifting', 'лифтинг', 'firm', 'straff', 'упруг', 'oval', 'овал', 'sagging', 'flaccidity', 'дряб']),
    pigmentation: hasAny(all, ['pigment', 'пигмент', 'flecken', 'dark spot', 'melasma', 'tone', 'тон']),
    dryness: hasAny(all, ['dry', 'trocken', 'сух', 'dehydrat', 'обезвож', 'tightness', 'стянут']),
    sensitivity: hasAny(all, ['sensitive', 'empfind', 'чувств', 'reactive', 'реактив']),
    redness: hasAny(all, ['redness', 'rötung', 'покрас', 'rosacea', 'розацеа', 'couperose', 'купероз', 'irritation', 'раздраж']),
    acne: hasAny(all, ['acne', 'akne', 'акне', 'comedone', 'blackhead', 'unrein', 'жирн', 'oily']),
    dullness: hasAny(all, ['dull', 'glow', 'radiance', 'сиян', 'туск', 'müde', 'tired', 'устал']),
    texture: hasAny(all, ['texture', 'relief', 'рельеф', 'pores', 'пор']),
    renewal: hasAny(all, ['renewal', 'renew', 'regeneration', 'регенер', 'обнов']),
    neck: hasAny(all, ['neck', 'decollete', 'décolleté', 'шея', 'декольте', 'venus']),
  }

  flags.highSensitivity =
    flags.redness ||
    hasAny(all, ['high sensitivity', 'sehr empfindlich', 'высокая чувствительность'])

  return flags
}

function makeStep(product, category, instruction = '') {
  return {
    id: product.id,
    code: product.code || null,
    name: product.fullName || product.name,
    line: product.line,
    category,
    instruction,
  }
}

function getBasePreparation(lang) {
  const t = T[lang] || T.EN

  return [
    {
      id: 'ECC_MICELLAR',
      name: 'ECC Remover Micellar Eyes and Face',
      line: t.lines.ESSENTIAL,
      category: t.categories.cleansing,
      instruction:
        lang === 'RU'
          ? 'Деликатно очистить глаза, лицо, шею и декольте.'
          : lang === 'DE'
          ? 'Augen, Gesicht, Hals und Dekolleté sanft reinigen.'
          : 'Gently cleanse eyes, face, neck and décolleté.',
    },
    {
      id: 'ECC_3D_TEXTURE_CLEANSER',
      name: 'ECC Remover 3D-Texture Cleanser',
      line: t.lines.ESSENTIAL,
      category: t.categories.cleansing,
      instruction:
        lang === 'RU'
          ? 'Нанести кистью или руками, проработать до лёгкой эмульсии, удалить.'
          : lang === 'DE'
          ? 'Mit Pinsel oder Händen auftragen, bis zur leichten Emulsion einarbeiten und entfernen.'
          : 'Apply with brush or hands, massage into a light emulsion and remove.',
    },
    {
      id: 'ECC_MIST',
      name: 'ECC Remover Mist',
      line: t.lines.ESSENTIAL,
      category: t.categories.toning,
      instruction:
        lang === 'RU'
          ? 'Тонизировать кожу и оставить до впитывания.'
          : lang === 'DE'
          ? 'Die Haut tonisieren und einziehen lassen.'
          : 'Tone the skin and allow to absorb.',
    },
    {
      id: 'ECC_MULTI_ACID_PEEL',
      name: 'ECC Renewal Multi-Acid Peel',
      line: t.lines.ESSENTIAL,
      category: t.categories.peeling,
      instruction:
        lang === 'RU'
          ? 'Нанести равномерно. Время экспозиции адаптировать к типу и чувствительности кожи.'
          : lang === 'DE'
          ? 'Gleichmäßig auftragen. Einwirkzeit je nach Hauttyp und Empfindlichkeit anpassen.'
          : 'Apply evenly. Adjust exposure time according to skin type and sensitivity.',
    },
  ]
}

function selectMycodeConcentrates(flags) {
  const selected = []

  if (flags.redness || flags.sensitivity) selected.push(MYCODE_CONCENTRATES['02'])
  if (flags.dryness) selected.push(MYCODE_CONCENTRATES['03'])
  if (flags.pigmentation) selected.push(MYCODE_CONCENTRATES['04'])
  if (flags.wrinkles) selected.push(MYCODE_CONCENTRATES['05'])
  if (flags.lifting) selected.push(MYCODE_CONCENTRATES['06'])
  if (flags.neck) selected.push(MYCODE_CONCENTRATES['08'])

  const retinolAllowed = !flags.highSensitivity && !flags.redness && !flags.sensitivity

  if (
    retinolAllowed &&
    (flags.renewal || flags.texture || flags.dullness || (flags.wrinkles && flags.pigmentation))
  ) {
    selected.push(MYCODE_CONCENTRATES['07'])
  }

  if (flags.dullness && !selected.some((p) => p.code === '01')) {
    selected.push(MYCODE_CONCENTRATES['01'])
  }

  const unique = Array.from(new Map(selected.map((item) => [item.id, item])).values())

  return unique
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3)
}

function selectMycodeMask(flags, concentrates) {
  const hasRetinol = concentrates.some((item) => item.code === '07')

  if (hasRetinol) return MYCODE_MASKS['47']
  if (flags.lifting) return MYCODE_MASKS['48']
  if (flags.wrinkles || flags.lossOfVolume) return MYCODE_MASKS['47']
  if (flags.dryness || flags.sensitivity || flags.redness) return MYCODE_MASKS['95']
  if (flags.dullness) return MYCODE_MASKS['46']

  return MYCODE_MASKS['95']
}

function getFinalCare(lang) {
  const t = T[lang] || T.EN

  return [
    {
      id: 'ECC_REPAIR_SHIELD_FINAL_CREAM_SPF50',
      name: 'ECC Repair Shield Final Cream SPF50',
      line: t.lines.ESSENTIAL,
      category: t.categories.protection,
      instruction:
        lang === 'RU'
          ? 'Завершить процедуру лёгким защитным слоем SPF50.'
          : lang === 'DE'
          ? 'Die Behandlung mit einer leichten Schutzschicht SPF50 abschließen.'
          : 'Finish the treatment with a light protective layer of SPF50.',
    },
    {
      id: 'ECC_REPAIR_LIP_BALM',
      name: 'ECC Repair Lip Balm',
      line: t.lines.ESSENTIAL,
      category: t.categories.lip,
      instruction:
        lang === 'RU'
          ? 'Увлажнить и защитить губы.'
          : lang === 'DE'
          ? 'Lippen hydratisieren und schützen.'
          : 'Hydrate and protect the lips.',
    },
  ]
}

function buildProfessionalProtocol(input = {}) {
  const lang = input.lang || 'DE'
  const ui = LANG[lang] || LANG.DE
  const t = T[lang] || T.DE
  const flags = detectConcerns(input)

  const concentrates = selectMycodeConcentrates(flags).map((product) =>
    makeStep(
      { ...product, line: t.lines.MYCODE },
      t.categories.concentrate,
      lang === 'RU'
        ? 'Смешать выбранные концентраты до 3 мл и ввести массажем или с помощью MESOLAB.'
        : lang === 'DE'
        ? 'Ausgewählte Konzentrate bis 3 ml mischen und mit Massage oder MESOLAB einarbeiten.'
        : 'Mix selected concentrates up to 3 ml and work in with massage or MESOLAB.'
    )
  )

  const mask = selectMycodeMask(flags, concentrates)

  const protocolType = concentrates.some((item) => item.code === '07')
    ? 'MYCODE ADVANCED WITH RETINOL'
    : 'MYCODE ADVANCED CUSTOMISABLE FACIAL'

  return {
    title: ui.title,
    audience: 'Für Kosmetikerinnen & Institute',
    protocolType,
    duration: ui.duration,
    course:
      lang === 'RU'
        ? '6 процедур, каждые 10–14 дней'
        : lang === 'DE'
        ? '6 Behandlungen, alle 10–14 Tage'
        : '6 sessions, every 10–14 days',

    mainLine: 'MYCODE ADVANCED',
    supportingLines: ['ESSENTIAL CARE CONCEPT', 'SUMMESUN'],

    phases: [
      {
        title: ui.basePrep,
        steps: getBasePreparation(lang),
      },
      {
        title: ui.activePhase,
        steps: concentrates,
      },
      {
        title: ui.maskPhase,
        steps: [
          makeStep(
            { ...mask, line: t.lines.MYCODE },
            t.categories.mask,
            lang === 'RU'
              ? 'Нанести маску на 10–20 минут в зависимости от состояния кожи.'
              : lang === 'DE'
              ? 'Maske je nach Hautzustand 10–20 Minuten einwirken lassen.'
              : 'Apply mask for 10–20 minutes depending on skin condition.'
          ),
        ],
      },
      {
        title: ui.finalPhase,
        steps: getFinalCare(lang),
      },
    ],

    equipment: [
      {
        name: '[MS] MESOLAB',
        usage:
          lang === 'RU'
            ? 'Опционально для введения активных концентратов.'
            : lang === 'DE'
            ? 'Optional zur Einarbeitung der aktiven Konzentrate.'
            : 'Optional for working in active concentrates.',
      },
    ],

    priorities: buildProfessionalPriorities(flags, lang),
    note: ui.note,
  }
}

function buildProfessionalPriorities(flags, lang) {
  const ru = []
  const de = []
  const en = []

  if (flags.wrinkles || flags.lifting) {
    ru.push('Коррекция морщин и укрепление кожи')
    de.push('Korrektur von Falten und Festigung der Haut')
    en.push('Wrinkle correction and skin firming')
  }

  if (flags.dryness) {
    ru.push('Интенсивное увлажнение и комфорт')
    de.push('Intensive Hydration und Hautkomfort')
    en.push('Intensive hydration and comfort')
  }

  if (flags.pigmentation) {
    ru.push('Выравнивание тона и работа с пигментацией')
    de.push('Ausgleich des Hauttons und Pigmentkorrektur')
    en.push('Tone correction and pigmentation care')
  }

  if (flags.redness || flags.sensitivity) {
    ru.push('Снижение реактивности и поддержка барьера')
    de.push('Reduktion von Reaktivität und Unterstützung der Hautbarriere')
    en.push('Reduction of reactivity and barrier support')
  }

  if (flags.dullness || flags.renewal) {
    ru.push('Ревитализация и обновление кожи')
    de.push('Revitalisierung und Hauterneuerung')
    en.push('Revitalisation and skin renewal')
  }

  if (lang === 'RU') return ru.length ? ru : ['Персонализированная профессиональная коррекция']
  if (lang === 'EN') return en.length ? en : ['Personalized professional correction']
  return de.length ? de : ['Personalisierte professionelle Korrektur']
}

export {
  buildProfessionalProtocol,
  MYCODE_CONCENTRATES,
  MYCODE_MASKS,
}
