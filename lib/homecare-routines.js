import { products } from './products'

export const homecareRules = [
  {
    id: 'dry_sensitive',
    conditions: {
      skinType: ['dry', 'trocken', 'сухая'],
      sensitivity: ['high', 'hoch', 'высокая', 'medium', 'mittel', 'средняя'],
    },
    strategy: 'Barrier Repair + Hydration',
    lines: ['GLACIAR', 'NICELY'],
    priorities: [
      'Barrier repair',
      'Deep hydration',
      'Reduce sensitivity',
    ],
  },

  {
    id: 'oily_acne',
    conditions: {
      skinType: ['oily', 'fettig', 'жирная'],
    },
    strategy: 'Sebum Control + Inflammation Reduction',
    lines: ['BALANCE'],
    priorities: [
      'Sebum control',
      'Reduce inflammation',
      'Prevent breakouts',
    ],
  },

  {
    id: 'pigmentation',
    conditions: {
      concerns: ['pigmentation', 'pigment', 'пигментация'],
    },
    strategy: 'Pigment Correction',
    lines: ['BECLARITY'],
    priorities: [
      'Even skin tone',
      'Dark spot correction',
      'Daily SPF',
    ],
  },

  {
    id: 'mature_skin',
    conditions: {
      goals: ['wrinkles', 'anti-aging', 'морщины', 'омоложение'],
    },
    strategy: 'Collagen Support + Anti-Aging',
    lines: ['CELL', 'CELL_C'],
    priorities: [
      'Wrinkle reduction',
      'Firmness',
      'Glow',
    ],
  },
]

export function buildHomecareRecommendation(data) {
  const text = JSON.stringify(data).toLowerCase()

  let lines = []
  let priorities = []
  let strategies = []

  homecareRules.forEach((rule) => {
    const match =
      JSON.stringify(rule.conditions).toLowerCase()
        .split('"')
        .some((value) => value.length > 3 && text.includes(value))

    if (match) {
      lines.push(...rule.lines)
      priorities.push(...rule.priorities)
      strategies.push(rule.strategy)
    }
  })

  lines = [...new Set(lines)]
  priorities = [...new Set(priorities)]
  strategies = [...new Set(strategies)]

  if (!lines.length) {
    lines = ['GLACIAR']
  }

  return {
    strategy: strategies.join(' + '),
    priorities,
    lines,

    morning: [
      'Cleanser',
      'Lotion',
      'Serum',
      'Cream',
      'SPF50+',
    ],

    evening: [
      'Cleanser',
      'Lotion',
      'Serum',
      'Cream',
    ],

    weeklySupport: [
      'Enzyme Peel 1–2x weekly',
      'Repair Mask 1x weekly',
    ],

    avoid: [
      'Over-exfoliation',
      'Too many active ingredients',
      'Skipping SPF',
    ],
  }
}
