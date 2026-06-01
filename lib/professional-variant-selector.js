// lib/professional-variant-selector.js

import { detectProfessionalFlags } from './professional-line-selector.js'

function getAge(input = {}) {
  const age = Number(input.age)
  return Number.isFinite(age) ? age : null
}

function getLang(input = {}) {
  return input.lang || 'DE'
}

function labels(lang) {
  const map = {
    RU: {
      customisable: 'Персонализируемая процедура',
      retinol: 'Процедура с ретинолом',
      sensitive: 'Деликатный протокол для чувствительной кожи',
      pigmentation: 'Протокол коррекции пигментации',
      acne: 'Себорегулирующий протокол',
      hydration: 'Интенсивное увлажнение',
      cell: 'Клеточная ревитализация',
      cellc: 'Антиоксидантная защита',
      reasonRetinol:
        'Выбрана retinol-ветка, потому что кожа не имеет выраженной чувствительности, а ведущими задачами являются обновление, морщины, фотостарение, неровный рельеф или тусклый тон.',
      reasonClassic:
        'Выбрана персонализируемая ветка без ретинола, потому что требуется anti-age коррекция с учётом комфорта кожи и индивидуальной переносимости активов.',
      reasonSensitive:
        'Выбран деликатный протокол, потому что ведущими задачами являются чувствительность, покраснения, реактивность кожи или нарушение барьера.',
      reasonPigmentation:
        'Выбран протокол коррекции пигментации, потому что основная задача — выравнивание тона и работа с пигментными пятнами.',
      reasonAcne:
        'Выбран себорегулирующий протокол, потому что основная задача — жирность, комедоны, воспаления или акне.',
      reasonHydration:
        'Выбран увлажняющий протокол, потому что основная задача — дефицит влаги, сухость, стянутость и восстановление комфорта кожи.',
      reasonCell:
        'Выбран протокол клеточной ревитализации, потому что основная задача — активация жизненности кожи, профилактика возрастных изменений и восстановление энергии тканей.',
      reasonCellC:
        'Выбран антиоксидантный протокол, потому что основная задача — сияние, защита от свободных радикалов и работа с тусклым тоном.',
    },
    DE: {
      customisable: 'Personalisierbare Behandlung',
      retinol: 'Behandlung mit Retinol',
      sensitive: 'Sanftes Protokoll für empfindliche Haut',
      pigmentation: 'Pigmentkorrektur-Protokoll',
      acne: 'Sebum-regulierendes Protokoll',
      hydration: 'Intensive Hydration',
      cell: 'Zellrevitalisierung',
      cellc: 'Antioxidativer Schutz',
      reasonRetinol:
        'Die Retinol-Variante wurde gewählt, weil keine ausgeprägte Empfindlichkeit vorliegt und Hauterneuerung, Falten, Photoaging, ungleichmäßige Textur oder fahler Teint im Vordergrund stehen.',
      reasonClassic:
        'Die personalisierbare Variante ohne Retinol wurde gewählt, weil eine Anti-Aging-Korrektur mit Rücksicht auf Hautkomfort und Wirkstoffverträglichkeit erforderlich ist.',
      reasonSensitive:
        'Das sanfte Protokoll wurde gewählt, weil Empfindlichkeit, Rötungen, Reaktivität oder eine geschwächte Hautbarriere im Vordergrund stehen.',
      reasonPigmentation:
        'Das Pigmentkorrektur-Protokoll wurde gewählt, weil Hauttonausgleich und Pigmentflecken im Vordergrund stehen.',
      reasonAcne:
        'Das sebum-regulierende Protokoll wurde gewählt, weil ölige Haut, Komedonen, Entzündungen oder Akne im Vordergrund stehen.',
      reasonHydration:
        'Das Hydrationsprotokoll wurde gewählt, weil Feuchtigkeitsmangel, Trockenheit, Spannungsgefühl und Hautkomfort im Vordergrund stehen.',
      reasonCell:
        'Das Zellrevitalisierungs-Protokoll wurde gewählt, weil Zellaktivierung, Prävention erster Alterszeichen und Wiederherstellung der Hautvitalität im Vordergrund stehen.',
      reasonCellC:
        'Das antioxidative Protokoll wurde gewählt, weil Ausstrahlung, Schutz vor freien Radikalen und fahler Teint im Vordergrund stehen.',
    },
    EN: {
      customisable: 'Customisable treatment',
      retinol: 'Treatment with retinol',
      sensitive: 'Gentle protocol for sensitive skin',
      pigmentation: 'Pigmentation correction protocol',
      acne: 'Sebum-regulating protocol',
      hydration: 'Intensive hydration',
      cell: 'Cellular revitalisation',
      cellc: 'Antioxidant defence',
      reasonRetinol:
        'The retinol variant was selected because there is no strong sensitivity and the main goals are renewal, wrinkles, photoaging, uneven texture or dull tone.',
      reasonClassic:
        'The customisable non-retinol variant was selected because anti-age correction is needed while respecting skin comfort and active tolerance.',
      reasonSensitive:
        'The gentle protocol was selected because sensitivity, redness, reactivity or a weakened barrier are the main priorities.',
      reasonPigmentation:
        'The pigmentation correction protocol was selected because tone correction and pigment spots are the main priorities.',
      reasonAcne:
        'The sebum-regulating protocol was selected because oiliness, comedones, inflammation or acne are the main priorities.',
      reasonHydration:
        'The hydration protocol was selected because lack of moisture, dryness, tightness and comfort are the main priorities.',
      reasonCell:
        'The cellular revitalisation protocol was selected because cellular activation, prevention of first ageing signs and restoration of skin vitality are the main priorities.',
      reasonCellC:
        'The antioxidant protocol was selected because radiance, free-radical protection and dull tone are the main priorities.',
    },
  }

  return map[lang] || map.DE
}

function retinolAllowed(flags = {}, input = {}) {
  const age = getAge(input)

  if (flags.highSensitivity) return false
  if (flags.redness) return false
  if (flags.sensitivity) return false
  if (flags.acne) return false

  if (age && age < 30) return false

  return true
}

function shouldUseRetinol(flags = {}, input = {}) {
  if (!retinolAllowed(flags, input)) return false

  const age = getAge(input)

  if (flags.regeneration || flags.dullness) return true
  if (flags.wrinkles && age && age >= 40) return true
  if (flags.pigmentation && flags.wrinkles) return true
  if (flags.pigmentation && flags.dullness) return true
  if (flags.lifting && flags.wrinkles && age && age >= 45) return true

  return false
}

function getCourseByVariant(line, variant, lang) {
  const ru = lang === 'RU'
  const en = lang === 'EN'

  if (variant === 'MYCODE_RETINOL') {
    return {
      sessions: 4,
      interval: ru ? 'каждые 14–21 день' : en ? 'every 14–21 days' : 'alle 14–21 Tage',
      note: ru
        ? 'Ретинол-протокол требует контроля переносимости и обязательной SPF-защиты.'
        : en
        ? 'The retinol protocol requires tolerance control and mandatory SPF protection.'
        : 'Das Retinol-Protokoll erfordert Verträglichkeitskontrolle und konsequenten SPF-Schutz.',
    }
  }

  if (line === 'NICELY') {
    return {
      sessions: 6,
      interval: ru ? 'каждые 10–14 дней' : en ? 'every 10–14 days' : 'alle 10–14 Tage',
      note: ru
        ? 'Курс направлен на снижение реактивности и восстановление барьерной функции.'
        : en
        ? 'The course focuses on reducing reactivity and restoring barrier function.'
        : 'Die Kur zielt auf Reduktion der Reaktivität und Wiederaufbau der Barrierefunktion.',
    }
  }

  if (line === 'BECLARITY') {
    return {
      sessions: 6,
      interval: ru ? 'каждые 10–14 дней' : en ? 'every 10–14 days' : 'alle 10–14 Tage',
      note: ru
        ? 'При пигментации обязательна ежедневная SPF-защита и контроль сезонности.'
        : en
        ? 'For pigmentation, daily SPF protection and seasonal control are mandatory.'
        : 'Bei Pigmentierung sind täglicher SPF-Schutz und saisonale Kontrolle erforderlich.',
    }
  }

  if (line === 'BALANCE') {
    return {
      sessions: 6,
      interval: ru ? 'каждые 7–10 дней' : en ? 'every 7–10 days' : 'alle 7–10 Tage',
      note: ru
        ? 'Курс направлен на себорегуляцию, очищение пор и снижение воспалительных элементов.'
        : en
        ? 'The course focuses on sebum regulation, pore clarification and reducing inflammatory lesions.'
        : 'Die Kur zielt auf Sebumregulation, Porenklärung und Reduktion entzündlicher Elemente.',
    }
  }

  if (line === 'GLACIAR') {
    return {
      sessions: 4,
      interval: ru ? 'каждые 7–14 дней' : en ? 'every 7–14 days' : 'alle 7–14 Tage',
      note: ru
        ? 'Курс направлен на быстрое восстановление увлажнённости и комфорта кожи.'
        : en
        ? 'The course focuses on fast restoration of hydration and comfort.'
        : 'Die Kur zielt auf schnelle Wiederherstellung von Hydration und Hautkomfort.',
    }
  }

  return {
    sessions: 6,
    interval: ru ? 'каждые 10–14 дней' : en ? 'every 10–14 days' : 'alle 10–14 Tage',
    note: ru
      ? 'Курс адаптируется косметологом по реакции кожи и динамике результата.'
      : en
      ? 'The course is adjusted by the cosmetologist according to skin response and progress.'
      : 'Die Kur wird je nach Hautreaktion und Ergebnisdynamik angepasst.',
  }
}

export function selectProfessionalVariant(input = {}, lineDecision = null) {
  const lang = getLang(input)
  const l = labels(lang)
  const flags = lineDecision?.flags || detectProfessionalFlags(input)
  const mainLine = lineDecision?.mainLine || 'MYCODE'

  let variant = 'CUSTOM'
  let variantName = l.customisable
  let protocolType = `${mainLine} PROFESSIONAL TREATMENT`
  let duration = lang === 'RU' ? '60 минут' : lang === 'EN' ? '60 minutes' : '60 Minuten'
  let device = null
  let retinol = false
  let reason = ''

  if (mainLine === 'MYCODE') {
    if (shouldUseRetinol(flags, input)) {
      variant = 'MYCODE_RETINOL'
      variantName = l.retinol
      protocolType = 'MYCODE ADVANCED WITH RETINOL'
      retinol = true
      reason = l.reasonRetinol
    } else {
      variant = 'MYCODE_CUSTOMISABLE'
      variantName = l.customisable
      protocolType = 'MYCODE ADVANCED CUSTOMISABLE FACIAL'
      device = '[MS] MESOLAB'
      reason = l.reasonClassic
    }
  }

  if (mainLine === 'BECLARITY') {
    variant = 'BECLARITY_PIGMENTATION'
    variantName = l.pigmentation
    protocolType = 'BECLARITY PROFESSIONAL PIGMENTATION TREATMENT'
    reason = l.reasonPigmentation
  }

  if (mainLine === 'NICELY') {
    variant = 'NICELY_SENSITIVE'
    variantName = l.sensitive
    protocolType = 'NICELY PROFESSIONAL SENSITIVE TREATMENT'
    reason = l.reasonSensitive
  }

  if (mainLine === 'BALANCE') {
    variant = 'BALANCE_SEBUM_REGULATING'
    variantName = l.acne
    protocolType = 'BALANCE PROFESSIONAL SEBUM-REGULATING TREATMENT'
    reason = l.reasonAcne
  }

  if (mainLine === 'GLACIAR') {
    variant = 'GLACIAR_HYDRATION'
    variantName = l.hydration
    protocolType = 'GLACIAR PROFESSIONAL HYDRATION TREATMENT'
    reason = l.reasonHydration
  }

  if (mainLine === 'CELL') {
    variant = 'CELL_REVITALISING'
    variantName = l.cell
    protocolType = 'CELL PROFESSIONAL REVITALISING TREATMENT'
    reason = l.reasonCell
  }

  if (mainLine === 'CELL_C') {
    variant = 'CELL_C_ANTIOXIDANT'
    variantName = l.cellc
    protocolType = 'CELL C PROFESSIONAL ANTIOXIDANT TREATMENT'
    reason = l.reasonCellC
  }

  const course = getCourseByVariant(mainLine, variant, lang)

  return {
    mainLine,
    variant,
    variantName,
    protocolType,
    duration,
    course,
    device,
    retinol,
    retinolAllowed: retinolAllowed(flags, input),
    flags,
    reason,
  }
}

export { retinolAllowed, shouldUseRetinol }
