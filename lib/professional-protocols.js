import { selectProfessionalLine } from './professional-line-selector.js'
import { selectProfessionalVariant } from './professional-variant-selector.js'

const labels = {
  RU: {
    title: 'FORMULENS PROFESSIONAL PROTOCOL',
    audience: 'Для косметологов и институтов',
    duration: '60 минут',
    course: '6 процедур, каждые 10–14 дней',
    preparation: 'Подготовка кожи',
    active: 'Активная фаза',
    mask: 'Маска',
    final: 'Завершение и защита',
  },
  DE: {
    title: 'FORMULENS PROFESSIONAL PROTOCOL',
    audience: 'Für Kosmetikerinnen & Institute',
    duration: '60 Minuten',
    course: '6 Behandlungen, alle 10–14 Tage',
    preparation: 'Hautvorbereitung',
    active: 'Aktivphase',
    mask: 'Maske',
    final: 'Abschluss und Schutz',
  },
  EN: {
    title: 'FORMULENS PROFESSIONAL PROTOCOL',
    audience: 'For cosmetologists & institutes',
    duration: '60 minutes',
    course: '6 sessions, every 10–14 days',
    preparation: 'Skin preparation',
    active: 'Active phase',
    mask: 'Mask',
    final: 'Final care and protection',
  },
}

function getLang(input = {}) {
  const lang = String(input.lang || 'DE').toUpperCase()
  if (lang === 'RU') return 'RU'
  if (lang === 'EN') return 'EN'
  return 'DE'
}

function t(lang) {
  return labels[lang] || labels.DE
}

function step(id, name, line, category, instruction = '', meta = {}) {
  return {
    id,
    name,
    line,
    category,
    instruction,
    amount: meta.amount || '',
    exposure: meta.exposure || '',
    removal: meta.removal || '',
    note: meta.note || '',
  }
}

const TXT = {
  RU: {
    cleansing: 'Очищение',
    deepCleansing: 'Глубокое очищение',
    toning: 'Тонизация',
    peeling: 'Пилинг',
    concentrate: 'Концентрат',
    serum: 'Сыворотка',
    cream: 'Крем',
    mask: 'Маска',
    finalProtection: 'Финальная защита',
    lips: 'Губы',

    micellarInstruction:
      'Нанести на ватные диски и очистить глаза, лицо, шею и декольте.',
    cleanserInstruction:
      'Нанести на влажную кожу, проработать мягкими массажными движениями.',
    mistInstruction:
      'Распылить или нанести ладонями для восстановления комфорта кожи.',
    peelInstruction:
      'Нанести тонким равномерным слоем. Экспозицию адаптировать к чувствительности кожи.',
    spfInstruction:
      'Нанести завершающим слоем после активной фазы и маски.',
    lipInstruction:
      'Нанести тонким слоем на губы в конце процедуры.',

    removeWater: 'Смыть водой / удалить влажным полотенцем.',
    removeTowel: 'Удалить влажным полотенцем.',
    noRinse: 'Не смывать.',
    removeMask: 'Снять маску, остатки распределить или удалить влажным полотенцем.',
    peelRemoval:
      'Обязательно смыть водой или удалить тщательно влажным полотенцем.',
    activeNote:
      'Активный этап выполняется по состоянию кожи. Не перегружать кожу при средней или высокой чувствительности.',
    deviceUsage: 'Опционально для введения активных концентратов.',
  },

  DE: {
    cleansing: 'Reinigung',
    deepCleansing: 'Tiefenreinigung',
    toning: 'Tonisierung',
    peeling: 'Peeling',
    concentrate: 'Konzentrat',
    serum: 'Serum',
    cream: 'Creme',
    mask: 'Maske',
    finalProtection: 'Abschlussschutz',
    lips: 'Lippen',

    micellarInstruction:
      'Auf Wattepads geben und Augen, Gesicht, Hals und Dekolleté reinigen.',
    cleanserInstruction:
      'Auf die feuchte Haut auftragen und sanft einmassieren.',
    mistInstruction:
      'Aufsprühen oder mit den Händen auftragen, um den Hautkomfort zu stabilisieren.',
    peelInstruction:
      'Dünn und gleichmäßig auftragen. Einwirkzeit an die Hautempfindlichkeit anpassen.',
    spfInstruction:
      'Als abschließende Schutzpflege nach Aktivphase und Maske auftragen.',
    lipInstruction:
      'Am Ende der Behandlung dünn auf die Lippen auftragen.',

    removeWater: 'Mit Wasser abspülen / mit feuchtem Tuch entfernen.',
    removeTowel: 'Mit feuchtem Tuch entfernen.',
    noRinse: 'Nicht abspülen.',
    removeMask:
      'Maske abnehmen, Rückstände einmassieren oder mit feuchtem Tuch entfernen.',
    peelRemoval:
      'Unbedingt mit Wasser abspülen oder gründlich mit feuchtem Tuch entfernen.',
    activeNote:
      'Die Aktivphase wird dem Hautzustand angepasst. Bei mittlerer oder hoher Empfindlichkeit die Haut nicht überlasten.',
    deviceUsage: 'Optional zur Einarbeitung der aktiven Konzentrate.',
  },

  EN: {
    cleansing: 'Cleansing',
    deepCleansing: 'Deep cleansing',
    toning: 'Toning',
    peeling: 'Peeling',
    concentrate: 'Concentrate',
    serum: 'Serum',
    cream: 'Cream',
    mask: 'Mask',
    finalProtection: 'Final protection',
    lips: 'Lips',

    micellarInstruction:
      'Apply to cotton pads and cleanse eyes, face, neck and décolleté.',
    cleanserInstruction:
      'Apply to damp skin and massage gently.',
    mistInstruction:
      'Spray or apply with hands to restore skin comfort.',
    peelInstruction:
      'Apply a thin even layer. Adjust exposure time to skin sensitivity.',
    spfInstruction:
      'Apply as final protective care after the active phase and mask.',
    lipInstruction:
      'Apply a thin layer to the lips at the end of the treatment.',

    removeWater: 'Rinse with water / remove with a damp towel.',
    removeTowel: 'Remove with a damp towel.',
    noRinse: 'Do not rinse.',
    removeMask: 'Remove mask, massage in residue or remove with a damp towel.',
    peelRemoval:
      'Must be rinsed with water or thoroughly removed with a damp towel.',
    activeNote:
      'Adapt the active phase to skin condition. Do not overload medium or highly sensitive skin.',
    deviceUsage: 'Optional for working in active concentrates.',
  },
}

const MYCODE_CONCENTRATES = {
  revitalising: {
    code: '01',
    name: 'Revitalising Facial Concentrate',
    purpose: {
      RU: 'Уставшая, тусклая, стрессированная кожа.',
      DE: 'Müde, fahle, gestresste Haut.',
      EN: 'Tired, dull, stressed skin.',
    },
  },
  comforting: {
    code: '02',
    name: 'Comforting Facial Concentrate',
    purpose: {
      RU: 'Чувствительная, реактивная, раздражённая кожа.',
      DE: 'Empfindliche, reaktive, irritierte Haut.',
      EN: 'Sensitive, reactive, irritated skin.',
    },
  },
  hydronourishing: {
    code: '03',
    name: 'Hydro-Nourishing Facial Concentrate',
    purpose: {
      RU: 'Сухая, обезвоженная кожа, недостаток комфорта.',
      DE: 'Trockene, dehydrierte Haut mit Komfortmangel.',
      EN: 'Dry, dehydrated skin lacking comfort.',
    },
  },
  depigmenting: {
    code: '04',
    name: 'Depigmenting Facial Concentrate',
    purpose: {
      RU: 'Пигментация, пятна, неровный тон.',
      DE: 'Pigmentierung, Flecken, ungleichmäßiger Hautton.',
      EN: 'Pigmentation, dark spots, uneven tone.',
    },
  },
  replenish: {
    code: '05',
    name: 'Replenish Facial Concentrate',
    purpose: {
      RU: 'Морщины, потеря плотности, поддержка объёма.',
      DE: 'Falten, Dichteverlust, Volumenunterstützung.',
      EN: 'Wrinkles, loss of density, volume support.',
    },
  },
  reaffirming: {
    code: '06',
    name: 'Reaffirming Facial Concentrate',
    purpose: {
      RU: 'Лифтинг, упругость, контуры лица.',
      DE: 'Lifting, Festigkeit, Gesichtskonturen.',
      EN: 'Lifting, firmness, facial contours.',
    },
  },
  retinol: {
    code: '07',
    name: 'Renewing Retinol Facial Concentrate',
    purpose: {
      RU: 'Фотостарение, текстура, обновление, морщины.',
      DE: 'Photoaging, Textur, Erneuerung, Falten.',
      EN: 'Photoaging, texture, renewal, wrinkles.',
    },
  },
  neck: {
    code: '08',
    name: 'Neck & Décolleté Remodelling Concentrate',
    purpose: {
      RU: 'Шея, декольте, ремоделирование контуров.',
      DE: 'Hals, Dekolleté, Konturremodellierung.',
      EN: 'Neck, décolleté, contour remodelling.',
    },
  },
}

const MYCODE_MASKS = {
  glow: { code: '46', name: 'Revitalising Illuminating Hydrogel Mask' },
  plumping: { code: '47', name: 'Redensifying Plumping Sheet Mask' },
  firming: { code: '48', name: 'Restructuring Firming Hydrogel Mask' },
  hydronutrition: { code: '95', name: 'Hydronutrition Hydro-Nourishing Face Mask' },
  lifting: { code: '39', name: 'Lifting Remodelling Rubber Mask' },
}

function buildPreparation(lang) {
  const x = TXT[lang]

  return [
    step(
      'ecc_micellar',
      'ECC Remover Micellar Eyes & Face',
      'ESSENTIAL CARE CONCEPT',
      x.cleansing,
      x.micellarInstruction,
      {
        amount: '2–4 ml',
        exposure: '1–2 min',
        removal: x.removeTowel,
      }
    ),
    step(
      'ecc_3d_texture_cleanser',
      'ECC Remover 3D Texture Cleanser',
      'ESSENTIAL CARE CONCEPT',
      x.deepCleansing,
      x.cleanserInstruction,
      {
        amount: '2–3 ml',
        exposure: '2–3 min',
        removal: x.removeWater,
      }
    ),
    step(
      'ecc_mist',
      'ECC Remover Mist',
      'ESSENTIAL CARE CONCEPT',
      x.toning,
      x.mistInstruction,
      {
        amount: '1–2 ml',
        exposure: '30–60 sec',
        removal: x.noRinse,
      }
    ),
    step(
      'ecc_multi_acid_peel',
      'ECC Renewal Multi-Acid Peel',
      'ESSENTIAL CARE CONCEPT',
      x.peeling,
      x.peelInstruction,
      {
        amount: '1–2 ml',
        exposure: '3–7 min',
        removal: x.peelRemoval,
        note:
          lang === 'RU'
            ? 'При сухой или чувствительной коже начинать с короткой экспозиции.'
            : lang === 'EN'
            ? 'For dry or sensitive skin, start with short exposure.'
            : 'Bei trockener oder empfindlicher Haut mit kurzer Einwirkzeit beginnen.',
      }
    ),
  ]
}

function selectMycodeConcentrates(flags, variant) {
  const list = []

  if (variant?.variant === 'MYCODE_RETINOL') {
    list.push(MYCODE_CONCENTRATES.retinol)
    return list
  }

  if (flags.redness || flags.sensitivity) list.push(MYCODE_CONCENTRATES.comforting)
  if (flags.dryness || flags.dehydration) list.push(MYCODE_CONCENTRATES.hydronourishing)
  if (flags.pigmentation) list.push(MYCODE_CONCENTRATES.depigmenting)
  if (flags.wrinkles) list.push(MYCODE_CONCENTRATES.replenish)
  if (flags.lifting) list.push(MYCODE_CONCENTRATES.reaffirming)
  if (flags.neck) list.push(MYCODE_CONCENTRATES.neck)
  if (flags.dullness && list.length < 3) list.push(MYCODE_CONCENTRATES.revitalising)

  return [...new Map(list.map((item) => [item.code, item])).values()].slice(0, 3)
}

function selectMycodeMask(flags, concentrates, variant) {
  if (variant?.variant === 'MYCODE_RETINOL') return MYCODE_MASKS.plumping
  if (flags.lifting) return MYCODE_MASKS.firming
  if (flags.wrinkles) return MYCODE_MASKS.plumping
  if (flags.dryness || flags.dehydration || flags.sensitivity) return MYCODE_MASKS.hydronutrition
  if (flags.dullness) return MYCODE_MASKS.glow
  return MYCODE_MASKS.hydronutrition
}

function buildFinalCare(lang) {
  const x = TXT[lang]

  return [
    step(
      'ecc_repair_shield_spf50',
      'ECC Repair Shield Final Cream SPF50',
      'ESSENTIAL CARE CONCEPT',
      x.finalProtection,
      x.spfInstruction,
      {
        amount: '1–2 ml',
        exposure: '',
        removal: x.noRinse,
      }
    ),
    step(
      'ecc_lip_balm',
      'ECC Repair Lip Balm',
      'ESSENTIAL CARE CONCEPT',
      x.lips,
      x.lipInstruction,
      {
        amount: '0.2–0.5 ml',
        exposure: '',
        removal: x.noRinse,
      }
    ),
  ]
}

function buildLineActiveSteps(lang, mainLine) {
  const x = TXT[lang]

  const commonRemoval = x.noRinse

  const data = {
    GLACIAR: [
      {
        id: 'glaciar_active_serum',
        name: 'GLACIAR professional hydrating active phase',
        category: x.serum,
        instruction:
          lang === 'RU'
            ? 'Нанести увлажняющую активную фазу GLACIAR и проработать массажными движениями до впитывания.'
            : lang === 'EN'
            ? 'Apply GLACIAR hydrating active phase and work in with massage movements until absorbed.'
            : 'GLACIAR hydratisierende Aktivphase auftragen und mit Massagebewegungen einarbeiten.',
        amount: '2–3 ml',
        exposure: '5–7 min',
        removal: commonRemoval,
      },
    ],

    CELL: [
      {
        id: 'cell_active_phase',
        name: 'CELL professional revitalising active phase',
        category: x.serum,
        instruction:
          lang === 'RU'
            ? 'Нанести активную фазу CELL для поддержки жизненности и качества кожи.'
            : lang === 'EN'
            ? 'Apply CELL active phase to support vitality and skin quality.'
            : 'CELL Aktivphase zur Unterstützung von Vitalität und Hautqualität auftragen.',
        amount: '2–3 ml',
        exposure: '5–7 min',
        removal: commonRemoval,
      },
    ],

    'CELL C': [
      {
        id: 'cell_c_active_phase',
        name: 'CELL C professional antioxidant active phase',
        category: x.serum,
        instruction:
          lang === 'RU'
            ? 'Нанести антиоксидантную активную фазу CELL C для сияния и ровного тона.'
            : lang === 'EN'
            ? 'Apply CELL C antioxidant active phase for radiance and even tone.'
            : 'CELL C antioxidative Aktivphase für Glow und ebenmäßigen Ton auftragen.',
        amount: '2–3 ml',
        exposure: '5–7 min',
        removal: commonRemoval,
      },
    ],

    BECLARITY: [
      {
        id: 'beclarity_active_phase',
        name: 'BECLARITY professional brightening active phase',
        category: x.serum,
        instruction:
          lang === 'RU'
            ? 'Нанести активную фазу BECLARITY на зоны пигментации и неровного тона.'
            : lang === 'EN'
            ? 'Apply BECLARITY active phase to pigmentation and uneven tone areas.'
            : 'BECLARITY Aktivphase auf Pigmentzonen und ungleichmäßigen Ton auftragen.',
        amount: '2–3 ml',
        exposure: '5–7 min',
        removal: commonRemoval,
      },
    ],

    BALANCE: [
      {
        id: 'balance_active_phase',
        name: 'BALANCE professional clarifying active phase',
        category: x.serum,
        instruction:
          lang === 'RU'
            ? 'Нанести активную фазу BALANCE на зоны себума, пор и высыпаний.'
            : lang === 'EN'
            ? 'Apply BALANCE active phase to sebum, pore and impurity zones.'
            : 'BALANCE Aktivphase auf Sebum-, Poren- und Unreinheitenzonen auftragen.',
        amount: '2–3 ml',
        exposure: '5–7 min',
        removal: commonRemoval,
      },
    ],

    NICELY: [
      {
        id: 'nicely_active_phase',
        name: 'NICELY professional soothing active phase',
        category: x.serum,
        instruction:
          lang === 'RU'
            ? 'Нанести успокаивающую активную фазу NICELY для комфорта и снижения реактивности.'
            : lang === 'EN'
            ? 'Apply NICELY soothing active phase for comfort and reduced reactivity.'
            : 'NICELY beruhigende Aktivphase für Komfort und reduzierte Reaktivität auftragen.',
        amount: '2–3 ml',
        exposure: '5–7 min',
        removal: commonRemoval,
      },
    ],
  }

  return data[mainLine] || [
    {
      id: `${mainLine.toLowerCase()}_active_phase`,
      name: `${mainLine} professional active phase`,
      category: x.serum,
      instruction: x.activeNote,
      amount: '2–3 ml',
      exposure: '5–7 min',
      removal: commonRemoval,
    },
  ]
}

function buildLineMaskStep(lang, mainLine) {
  const x = TXT[lang]

  return step(
    `${mainLine.toLowerCase()}_professional_mask`,
    `${mainLine} professional mask`,
    mainLine,
    x.mask,
    lang === 'RU'
      ? 'Нанести маску равномерным слоем по лицу, шее и декольте.'
      : lang === 'EN'
      ? 'Apply the mask evenly to face, neck and décolleté.'
      : 'Maske gleichmäßig auf Gesicht, Hals und Dekolleté auftragen.',
    {
      amount: '8–12 ml',
      exposure: '10–15 min',
      removal: x.removeTowel,
    }
  )
}

function buildMycodeProtocol(input, decision, variant) {
  const lang = getLang(input)
  const ui = t(lang)
  const x = TXT[lang]
  const flags = decision.flags || {}

  const concentrates = selectMycodeConcentrates(flags, variant)
  const mask = selectMycodeMask(flags, concentrates, variant)

  return {
    title: ui.title,
    audience: ui.audience,
    mainLine: 'MYCODE ADVANCED PROFESSIONAL LAB',
    protocolType: variant.protocolType,
    variantName: variant.variantName,
    duration: variant.duration || ui.duration,
    course: `${variant.course.sessions} ${
      lang === 'RU' ? 'процедур' : lang === 'EN' ? 'sessions' : 'Behandlungen'
    }, ${variant.course.interval}`,
    courseNote: variant.course.note,
    reason: variant.reason || decision.reason,

    phases: [
      { title: ui.preparation, steps: buildPreparation(lang) },
      {
        title: ui.active,
        steps: concentrates.map((item) =>
          step(
            `mycode_${item.code}`,
            `${item.code} ${item.name}`,
            'MYCODE ADVANCED PROFESSIONAL LAB',
            x.concentrate,
            item.purpose?.[lang] || item.purpose?.DE || '',
            {
              amount: '1–2 ml',
              exposure: '5–8 min',
              removal: x.noRinse,
            }
          )
        ),
      },
      {
        title: ui.mask,
        steps: [
          step(
            `mycode_mask_${mask.code}`,
            `${mask.code} ${mask.name}`,
            'MYCODE ADVANCED PROFESSIONAL LAB',
            x.mask,
            lang === 'RU'
              ? 'Нанести маску после концентратов. Подобрать тип маски по ведущей задаче кожи.'
              : lang === 'EN'
              ? 'Apply mask after concentrates. Select mask type according to the leading skin goal.'
              : 'Maske nach den Konzentraten auftragen. Maskentyp nach führendem Hautziel auswählen.',
            {
              amount: '1 mask / 20–30 g',
              exposure: '10–20 min',
              removal: x.removeMask,
            }
          ),
        ],
      },
      { title: ui.final, steps: buildFinalCare(lang) },
    ],

    equipment: variant.device
      ? [
          {
            name: variant.device,
            usage: x.deviceUsage,
          },
        ]
      : [],

    homecareSupport: ['MYCODE ADVANCED HOMECARE', 'SUMMESUN SPF50+'],
    retinol: variant.retinol,
  }
}

function buildSimpleProtocol(input, decision, variant) {
  const lang = getLang(input)
  const ui = t(lang)
  const x = TXT[lang]
  const mainLine = decision.mainLine

  return {
    title: ui.title,
    audience: ui.audience,
    mainLine,
    protocolType: variant.protocolType,
    variantName: variant.variantName,
    duration: variant.duration || ui.duration,
    course: `${variant.course.sessions} ${
      lang === 'RU' ? 'процедур' : lang === 'EN' ? 'sessions' : 'Behandlungen'
    }, ${variant.course.interval}`,
    courseNote: variant.course.note,
    reason: variant.reason || decision.reason,

    phases: [
      { title: ui.preparation, steps: buildPreparation(lang) },
      {
        title: ui.active,
        steps: buildLineActiveSteps(lang, mainLine).map((item) =>
          step(
            item.id,
            item.name,
            mainLine,
            item.category,
            item.instruction,
            {
              amount: item.amount,
              exposure: item.exposure,
              removal: item.removal,
              note: item.note,
            }
          )
        ),
      },
      {
        title: ui.mask,
        steps: [buildLineMaskStep(lang, mainLine)],
      },
      { title: ui.final, steps: buildFinalCare(lang) },
    ],

    equipment: variant.device
      ? [
          {
            name: variant.device,
            usage: x.deviceUsage,
          },
        ]
      : [],

    homecareSupport: [mainLine, 'SUMMESUN SPF50+'],
    retinol: variant.retinol,
  }
}

export function buildProfessionalProtocol(input = {}) {
  const decision = selectProfessionalLine(input)
  const variant = selectProfessionalVariant(input, decision)

  if (decision.mainLine === 'MYCODE') {
    return {
      decision,
      variant,
      protocol: buildMycodeProtocol(input, decision, variant),
    }
  }

  return {
    decision,
    variant,
    protocol: buildSimpleProtocol(input, decision, variant),
  }
}

export { MYCODE_CONCENTRATES, MYCODE_MASKS }

export default buildProfessionalProtocol
