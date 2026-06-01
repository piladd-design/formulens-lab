import { selectProfessionalLine } from './professional-line-selector.js'

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
    equipment: 'Оборудование',
    homecare: 'Домашняя поддержка',
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
    equipment: 'Geräte',
    homecare: 'Heimpflege-Unterstützung',
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
    equipment: 'Equipment',
    homecare: 'Homecare support',
  },
}

const MYCODE_CONCENTRATES = {
  revitalising: {
    code: '01',
    name: 'Revitalising Facial Concentrate',
    purpose: 'Tired, dull, stressed skin',
  },
  comforting: {
    code: '02',
    name: 'Comforting Facial Concentrate',
    purpose: 'Sensitive, reactive, irritated skin',
  },
  hydronourishing: {
    code: '03',
    name: 'Hydro-Nourishing Facial Concentrate',
    purpose: 'Dry, dehydrated, comfort-lacking skin',
  },
  depigmenting: {
    code: '04',
    name: 'Depigmenting Facial Concentrate',
    purpose: 'Pigmentation, dark spots, uneven tone',
  },
  replenish: {
    code: '05',
    name: 'Replenish Facial Concentrate',
    purpose: 'Wrinkles, loss of volume, density support',
  },
  reaffirming: {
    code: '06',
    name: 'Reaffirming Facial Concentrate',
    purpose: 'Lifting, firmness, facial contours',
  },
  retinol: {
    code: '07',
    name: 'Renewing Retinol Facial Concentrate',
    purpose: 'Photoaging, texture, renewal, wrinkles',
  },
  neck: {
    code: '08',
    name: 'Neck & Décolleté Remodelling Concentrate',
    purpose: 'Neck, décolleté, contour remodelling',
  },
}

const MYCODE_MASKS = {
  glow: {
    code: '46',
    name: 'Revitalising Illuminating Hydrogel Mask',
  },
  plumping: {
    code: '47',
    name: 'Redensifying Plumping Sheet Mask',
  },
  firming: {
    code: '48',
    name: 'Restructuring Firming Hydrogel Mask',
  },
  hydronutrition: {
    code: '95',
    name: 'Hydronutrition Hydro-Nourishing Face Mask',
  },
  lifting: {
    code: '39',
    name: 'Lifting Remodelling Rubber Mask',
  },
}

function t(lang) {
  return labels[lang] || labels.DE
}

function step(id, name, line, category, instruction = '') {
  return {
    id,
    name,
    line,
    category,
    instruction,
  }
}

function buildPreparation(lang) {
  const isRU = lang === 'RU'
  const isEN = lang === 'EN'

  return [
    step(
      'ecc_micellar',
      'ECC Remover Micellar Eyes & Face',
      'ESSENTIAL CARE CONCEPT',
      isRU ? 'Очищение' : isEN ? 'Cleansing' : 'Reinigung',
      isRU
        ? 'Деликатное очищение глаз, лица, шеи и декольте.'
        : isEN
        ? 'Gentle cleansing of eyes, face, neck and décolleté.'
        : 'Sanfte Reinigung von Augen, Gesicht, Hals und Dekolleté.'
    ),
    step(
      'ecc_3d_texture_cleanser',
      'ECC Remover 3D Texture Cleanser',
      'ESSENTIAL CARE CONCEPT',
      isRU ? 'Глубокое очищение' : isEN ? 'Deep cleansing' : 'Tiefenreinigung',
      isRU
        ? 'Проработать кожу для глубокого очищения и подготовки к активной фазе.'
        : isEN
        ? 'Work into the skin for deep cleansing and preparation before the active phase.'
        : 'Für Tiefenreinigung und Vorbereitung der Aktivphase einarbeiten.'
    ),
    step(
      'ecc_mist',
      'ECC Remover Mist',
      'ESSENTIAL CARE CONCEPT',
      isRU ? 'Тонизация' : isEN ? 'Toning' : 'Tonisierung',
      isRU
        ? 'Восстановить комфорт кожи и подготовить её к пилингу.'
        : isEN
        ? 'Restore skin comfort and prepare for peeling.'
        : 'Hautkomfort wiederherstellen und auf das Peeling vorbereiten.'
    ),
    step(
      'ecc_multi_acid_peel',
      'ECC Renewal Multi-Acid Peel',
      'ESSENTIAL CARE CONCEPT',
      isRU ? 'Пилинг' : isEN ? 'Peeling' : 'Peeling',
      isRU
        ? 'Экспозицию адаптировать к состоянию и чувствительности кожи.'
        : isEN
        ? 'Adjust exposure time to skin condition and sensitivity.'
        : 'Einwirkzeit an Hautzustand und Empfindlichkeit anpassen.'
    ),
  ]
}

function selectMycodeConcentrates(flags) {
  const list = []

  if (flags.redness || flags.sensitivity) list.push(MYCODE_CONCENTRATES.comforting)
  if (flags.dryness || flags.dehydration) list.push(MYCODE_CONCENTRATES.hydronourishing)
  if (flags.pigmentation) list.push(MYCODE_CONCENTRATES.depigmenting)
  if (flags.wrinkles) list.push(MYCODE_CONCENTRATES.replenish)
  if (flags.lifting) list.push(MYCODE_CONCENTRATES.reaffirming)
  if (flags.neck) list.push(MYCODE_CONCENTRATES.neck)

  const retinolAllowed = !flags.redness && !flags.highSensitivity && !flags.sensitivity

  if (
    retinolAllowed &&
    (flags.regeneration || flags.dullness || flags.wrinkles || flags.pigmentation)
  ) {
    list.push(MYCODE_CONCENTRATES.retinol)
  }

  if (flags.dullness && list.length < 3) {
    list.push(MYCODE_CONCENTRATES.revitalising)
  }

  return [...new Map(list.map((item) => [item.code, item])).values()].slice(0, 3)
}

function selectMycodeMask(flags, concentrates) {
  if (concentrates.some((item) => item.code === '07')) return MYCODE_MASKS.plumping
  if (flags.lifting) return MYCODE_MASKS.firming
  if (flags.wrinkles) return MYCODE_MASKS.plumping
  if (flags.dryness || flags.dehydration || flags.sensitivity) return MYCODE_MASKS.hydronutrition
  if (flags.dullness) return MYCODE_MASKS.glow
  return MYCODE_MASKS.hydronutrition
}

function buildMycodeProtocol(input, decision) {
  const lang = input.lang || 'DE'
  const ui = t(lang)
  const flags = decision.flags || {}

  const concentrates = selectMycodeConcentrates(flags)
  const mask = selectMycodeMask(flags, concentrates)

  return {
    title: ui.title,
    audience: ui.audience,
    mainLine: 'MYCODE ADVANCED PROFESSIONAL LAB',
    protocolType: concentrates.some((item) => item.code === '07')
      ? 'MYCODE ADVANCED WITH RETINOL'
      : 'MYCODE ADVANCED CUSTOMISABLE FACIAL',
    duration: ui.duration,
    course: ui.course,
    reason: decision.reason,
    phases: [
      {
        title: ui.preparation,
        steps: buildPreparation(lang),
      },
      {
        title: ui.active,
        steps: concentrates.map((item) =>
          step(
            `mycode_${item.code}`,
            `${item.code} ${item.name}`,
            'MYCODE ADVANCED PROFESSIONAL LAB',
            lang === 'RU' ? 'Концентрат' : lang === 'EN' ? 'Concentrate' : 'Konzentrat',
            item.purpose
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
            lang === 'RU' ? 'Маска' : lang === 'EN' ? 'Mask' : 'Maske',
            lang === 'RU'
              ? 'Нанести на 10–20 минут в зависимости от состояния кожи.'
              : lang === 'EN'
              ? 'Apply for 10–20 minutes depending on skin condition.'
              : 'Je nach Hautzustand 10–20 Minuten einwirken lassen.'
          ),
        ],
      },
      {
        title: ui.final,
        steps: buildFinalCare(lang),
      },
    ],
    equipment: [
      {
        name: '[MS] MESOLAB',
        usage:
          lang === 'RU'
            ? 'Опционально для введения активных концентратов.'
            : lang === 'EN'
            ? 'Optional for working in active concentrates.'
            : 'Optional zur Einarbeitung der aktiven Konzentrate.',
      },
    ],
    homecareSupport: ['MYCODE ADVANCED HOMECARE', 'SUMMESUN SPF50+'],
  }
}

function buildFinalCare(lang) {
  const isRU = lang === 'RU'
  const isEN = lang === 'EN'

  return [
    step(
      'ecc_repair_shield_spf50',
      'ECC Repair Shield Final Cream SPF50',
      'ESSENTIAL CARE CONCEPT',
      isRU ? 'Финальная защита' : isEN ? 'Final protection' : 'Abschlussschutz',
      isRU
        ? 'Завершить процедуру защитным SPF50.'
        : isEN
        ? 'Finish the treatment with SPF50 protection.'
        : 'Behandlung mit SPF50-Schutz abschließen.'
    ),
    step(
      'ecc_lip_balm',
      'ECC Repair Lip Balm',
      'ESSENTIAL CARE CONCEPT',
      isRU ? 'Губы' : isEN ? 'Lips' : 'Lippen',
      isRU
        ? 'Защитить и восстановить губы.'
        : isEN
        ? 'Protect and restore the lips.'
        : 'Lippen schützen und regenerieren.'
    ),
  ]
}

function buildSimpleProtocol(input, decision) {
  const lang = input.lang || 'DE'
  const ui = t(lang)
  const mainLine = decision.mainLine

  return {
    title: ui.title,
    audience: ui.audience,
    mainLine,
    protocolType: `${mainLine} PROFESSIONAL TREATMENT`,
    duration: ui.duration,
    course: ui.course,
    reason: decision.reason,
    phases: [
      {
        title: ui.preparation,
        steps: buildPreparation(lang),
      },
      {
        title: ui.active,
        steps: [
          step(
            `${mainLine.toLowerCase()}_active_phase`,
            `${mainLine} professional active phase`,
            mainLine,
            lang === 'RU' ? 'Активная фаза' : lang === 'EN' ? 'Active phase' : 'Aktivphase',
            lang === 'RU'
              ? 'Активный этап будет расширен по конкретному протоколу линии.'
              : lang === 'EN'
              ? 'The active phase will be expanded according to the specific line protocol.'
              : 'Die Aktivphase wird gemäß dem spezifischen Linienprotokoll erweitert.'
          ),
        ],
      },
      {
        title: ui.final,
        steps: buildFinalCare(lang),
      },
    ],
    equipment: [],
    homecareSupport: [mainLine, 'SUMMESUN SPF50+'],
  }
}

export function buildProfessionalProtocol(input = {}) {
  const decision = selectProfessionalLine(input)

  if (decision.mainLine === 'MYCODE') {
    return {
      decision,
      protocol: buildMycodeProtocol(input, decision),
    }
  }

  return {
    decision,
    protocol: buildSimpleProtocol(input, decision),
  }
}

export {
  MYCODE_CONCENTRATES,
  MYCODE_MASKS,
}
