// /lib/protocol-builder.js

import { PROTOCOL_TEMPLATES } from './protocol-library.js'

const LINE_LABELS = {
  GLACIAR: 'GLACIAR',
  NICELY: 'NICELY',
  BALANCE: 'BALANCE',
  BECLARITY: 'BECLARITY',
  CELL_C: 'CELL C',
  CELL: 'CELL',
  MYCODE: 'MYCODE',
}

const MAIN_GOAL_TO_LINE = {
  hydration: 'GLACIAR',
  sensitivity: 'NICELY',
  acne: 'BALANCE',
  pigmentation: 'BECLARITY',
  antioxidant: 'CELL_C',
  regeneration: 'CELL',
}

const AGE_SUBGOAL_TO_LINE = {
  wrinkles: 'MYCODE',
  firmness: 'MYCODE',
  oval: 'MYCODE',
  age_pigmentation: 'BECLARITY',
  dryness: 'GLACIAR',
  dullness: 'CELL_C',
}

const MYCODE_VARIANTS = {
  dehydration_volume: '03',
  pigmentation: '04',
  wrinkles: '05',
  firmness: '06',
  oval: '08',
}

const SUPPORT_GOAL_TO_LINE = {
  none: null,
  dehydration: 'GLACIAR',
  sensitivity: 'NICELY',
  pigmentation: 'BECLARITY',
  regeneration: 'CELL',
  antioxidant: 'CELL_C',
}

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function getAgeModifier(age) {
  const numericAge = Number(age)

  if (!numericAge || numericAge < 35) {
    return {
      level: 'low',
      note: 'Возраст не является ведущим фактором выбора протокола.',
    }
  }

  if (numericAge >= 35 && numericAge < 50) {
    return {
      level: 'medium',
      note: 'Возраст учитывается как дополнительный модификатор.',
    }
  }

  return {
    level: 'high',
    note: 'Возраст усиливает потребность в поддержке качества кожи, но не заменяет главную задачу.',
  }
}

function resolveMainLine({ mainGoal, ageSubGoal }) {
  const goal = normalize(mainGoal)
  const subGoal = normalize(ageSubGoal)

  if (goal === 'age' || goal === 'aging' || goal === 'age_changes') {
    return AGE_SUBGOAL_TO_LINE[subGoal] || 'MYCODE'
  }

  return MAIN_GOAL_TO_LINE[goal] || 'GLACIAR'
}

function resolveMycodeVariant({ mainLine, ageSubGoal, additionalGoal }) {
  if (mainLine !== 'MYCODE') return null

  const subGoal = normalize(ageSubGoal)
  const extra = normalize(additionalGoal)

  if (subGoal === 'wrinkles') return MYCODE_VARIANTS.wrinkles
  if (subGoal === 'firmness') return MYCODE_VARIANTS.firmness
  if (subGoal === 'oval') return MYCODE_VARIANTS.oval
  if (subGoal === 'age_pigmentation') return MYCODE_VARIANTS.pigmentation
  if (subGoal === 'dryness') return MYCODE_VARIANTS.dehydration_volume

  if (extra === 'dehydration') return MYCODE_VARIANTS.dehydration_volume
  if (extra === 'pigmentation') return MYCODE_VARIANTS.pigmentation

  return MYCODE_VARIANTS.wrinkles
}

function resolveSupportingLines({ mainLine, additionalGoal, age }) {
  const result = []
  const extra = normalize(additionalGoal)
  const supportLine = SUPPORT_GOAL_TO_LINE[extra]

  if (supportLine && supportLine !== mainLine) {
    result.push(supportLine)
  }

  const numericAge = Number(age)

  if (numericAge >= 45 && mainLine !== 'CELL') {
    result.push('CELL')
  }

  if (numericAge >= 40 && mainLine !== 'CELL_C' && !result.includes('CELL_C')) {
    result.push('CELL_C')
  }

  return [...new Set(result)]
}

function findProtocolByLine(line) {
  if (!PROTOCOL_TEMPLATES) return null

  if (line === 'GLACIAR') return PROTOCOL_TEMPLATES.GLACIAR
  if (line === 'NICELY') return PROTOCOL_TEMPLATES.NICELY
  if (line === 'BALANCE') return PROTOCOL_TEMPLATES.BALANCE
  if (line === 'BECLARITY') return PROTOCOL_TEMPLATES.BECLARITY
  if (line === 'CELL_C') return PROTOCOL_TEMPLATES.CELL_C
  if (line === 'CELL') return PROTOCOL_TEMPLATES.CELL
  if (line === 'MYCODE') return PROTOCOL_TEMPLATES.MYCODE

  return null
}

function normalizeOfficialProtocol(template, { mainLine, mycodeVariant }) {
  if (!template) return null

  return {
    ...template,

    id: template.id || `${mainLine.toLowerCase()}-protocol`,
    name:
      template.title ||
      template.name ||
      `${LINE_LABELS[mainLine] || mainLine} Professional Protocol`,

    line: mainLine,
    mainLine: LINE_LABELS[mainLine] || mainLine,
    variant: mycodeVariant,

    protocolType:
      template.title ||
      `${LINE_LABELS[mainLine] || mainLine} Professional Protocol`,

    steps: template.professional || template.steps || [],

    homecareSupport:
      template.homecareOptions?.map((item) => item.title) || [],
  }
}

function buildDefaultProtocol({ mainLine, mycodeVariant }) {
  const displayLine = LINE_LABELS[mainLine] || mainLine

  return {
    id: `${mainLine.toLowerCase()}${mycodeVariant ? `-${mycodeVariant}` : ''}-default`,
    name: `${displayLine}${mycodeVariant ? ` ${mycodeVariant}` : ''} Professional Protocol`,
    line: mainLine,
    mainLine: displayLine,
    variant: mycodeVariant,
    steps: [
      {
        title: 'Очищение',
        description: 'Демакияж и подготовка кожи к процедуре.',
        products: [],
      },
      {
        title: 'Тонизация',
        description: 'Восстановление комфорта кожи перед активной фазой.',
        products: [],
      },
      {
        title: 'Эксфолиация / Пилинг',
        description: 'Подготовка рогового слоя с учетом чувствительности кожи.',
        products: [],
      },
      {
        title: 'Тонизация',
        description: 'Повторная тонизация после этапа эксфолиации.',
        products: [],
      },
      {
        title: 'Уход / Активная фаза',
        description: 'Основные активные продукты выбранной линии.',
        products: [],
      },
      {
        title: 'Маска',
        description: 'Интенсивная поддержка результата процедуры.',
        products: [],
      },
      {
        title: 'Завершение и защита',
        description: 'Финальный крем и дневная защита кожи.',
        products: [],
      },
    ],
  }
}

function resolveActiveConcentrates({ mainLine, mycodeVariant, additionalGoal }) {
  const concentrates = []

  if (mainLine === 'GLACIAR') {
    concentrates.push('Увлажняющий концентрат GLACIAR')
  }

  if (mainLine === 'NICELY') {
    concentrates.push('Успокаивающий концентрат NICELY')
  }

  if (mainLine === 'BALANCE') {
    concentrates.push('Балансирующий концентрат BALANCE')
  }

  if (mainLine === 'BECLARITY') {
    concentrates.push('Осветляющий концентрат BECLARITY')
  }

  if (mainLine === 'CELL_C') {
    concentrates.push('Антиоксидантный концентрат CELL C')
  }

  if (mainLine === 'CELL') {
    concentrates.push('Регенерирующий концентрат CELL')
  }

  if (mainLine === 'MYCODE') {
    concentrates.push(`MYCODE ${mycodeVariant} активный концентрат`)
  }

  const extra = normalize(additionalGoal)

  if (extra === 'dehydration' && mainLine !== 'GLACIAR') {
    concentrates.push('Дополнительная поддержка GLACIAR')
  }

  if (extra === 'sensitivity' && mainLine !== 'NICELY') {
    concentrates.push('Дополнительная поддержка NICELY')
  }

  if (extra === 'pigmentation' && mainLine !== 'BECLARITY') {
    concentrates.push('Дополнительная поддержка BECLARITY')
  }

  return concentrates
}

function resolveHomecare({ mainLine, supportingLines, officialProtocol }) {
  const homecareFromProtocol =
    officialProtocol?.homecareOptions?.map((item) => ({
      id: item.id,
      line: mainLine,
      title: item.title,
      morning: item.morning || [],
      evening: item.evening || [],
      role: 'Основная домашняя программа после процедуры.',
    })) || []

  const supportHomecare = supportingLines.map((line) => ({
    line,
    title: `${LINE_LABELS[line] || line} домашняя поддержка`,
    role: 'Поддерживающая домашняя линия по дополнительной задаче.',
  }))

  return [...homecareFromProtocol, ...supportHomecare]
}

export function buildProtocol(input = {}) {
  const {
    age,
    mainGoal,
    ageSubGoal = null,
    additionalGoal = 'none',
    sensitivity = null,
    skinType = null,
  } = input

  const mainLine = resolveMainLine({
    mainGoal,
    ageSubGoal,
  })

  const mycodeVariant = resolveMycodeVariant({
    mainLine,
    ageSubGoal,
    additionalGoal,
  })

  const supportingLines = resolveSupportingLines({
    mainLine,
    additionalGoal,
    age,
  })

  const template = findProtocolByLine(mainLine)

  const officialProtocol =
    normalizeOfficialProtocol(template, {
      mainLine,
      mycodeVariant,
    }) ||
    buildDefaultProtocol({
      mainLine,
      mycodeVariant,
    })

  const activeConcentrates = resolveActiveConcentrates({
    mainLine,
    mycodeVariant,
    additionalGoal,
  })

  const homecare = resolveHomecare({
    mainLine,
    supportingLines,
    officialProtocol,
  })

  const ageModifier = getAgeModifier(age)

  return {
    ok: true,

    input: {
      age,
      mainGoal,
      ageSubGoal,
      additionalGoal,
      sensitivity,
      skinType,
    },

    strategy: {
      mainLine,
      mainLineLabel: LINE_LABELS[mainLine] || mainLine,
      mycodeVariant,
      supportingLines,
      supportingLineLabels: supportingLines.map(
        (line) => LINE_LABELS[line] || line
      ),
      ageModifier,
    },

    protocol: officialProtocol,

    activeConcentrates,

    homecare,

    summary: {
      title: `${LINE_LABELS[mainLine] || mainLine} профессиональный протокол`,
      text: 'Основной протокол выбран по главной задаче кожи. Возраст используется как модификатор, но не заменяет основную проблему.',
    },
  }
}

export default buildProtocol
