export const PREPARATION_PROTOCOLS = {
  STANDARD: {
    id: 'standard-preparation',
    name: 'ECC Standard Preparation',
    steps: [
      { title: 'Демакияж', products: ['ecc-remover-micellar'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Эксфолиация', products: ['ecc-renewal-three-action-peel'] },
      { title: 'Восстановление pH', products: ['ecc-remover-mist'] },
      { title: 'Глубокое очищение', products: ['ecc-remover-3d-texture-cleanser'] },
      { title: 'Финальная тонизация', products: ['ecc-remover-mist'] },
    ],
  },

  GLACIAR: {
    id: 'glaciar-preparation',
    name: 'GLACIAR Hydration Preparation',
    steps: [
      { title: 'Очищение', products: ['glaciar-cleansing-milk'] },
      { title: 'Тонизация', products: ['glaciar-soft-lotion'] },
      { title: 'Пилинг', products: ['ecc-renewal-three-action-peel'] },
      { title: 'Повторная тонизация', products: ['glaciar-soft-lotion'] },
    ],
  },

  NICELY: {
    id: 'nicely-preparation',
    name: 'NICELY Sensitive Preparation',
    steps: [
      { title: 'Демакияж глаз и губ', products: ['nicely-soft-eye-remover'] },
      { title: 'Очищение', products: ['nicely-gentle-cleanser'] },
      { title: 'Тонизация', products: ['nicely-sweet-toner'] },
      { title: 'Энзимный пилинг', products: ['nicely-enzyme-peel'] },
      { title: 'Повторная тонизация', products: ['nicely-sweet-toner'] },
    ],
  },
}

export const MYCODE_VARIANTS = {
  hydration: {
    codes: ['mycode-03-hydro-nourishing-code'],
    mask: 'mycode-hydronutrition-mask',
  },

  sensitivity: {
    codes: ['mycode-02-comforting-code'],
    mask: 'mycode-hydronutrition-mask',
  },

  pigmentation: {
    codes: ['mycode-04-depigmenting-code'],
    mask: 'cell-c-orange-rubber-mask',
  },

  wrinkles: {
    codes: ['mycode-05-plumping-code'],
    mask: 'mycode-hydronutrition-mask',
  },

  firmness: {
    codes: ['mycode-06-firming-code'],
    mask: 'cell-c-orange-rubber-mask',
  },

  lifting: {
    codes: ['mycode-06-firming-code', 'mycode-05-plumping-code'],
    mask: 'cell-c-orange-rubber-mask',
  },

  anti_age: {
    codes: ['mycode-07-retinol-code', 'mycode-05-plumping-code'],
    mask: 'mycode-hydronutrition-mask',
  },

  oval: {
    codes: ['mycode-08-remodelling-code'],
    mask: 'cell-c-orange-rubber-mask',
  },

  neck: {
    codes: ['mycode-08-remodelling-code'],
    mask: 'cell-c-orange-rubber-mask',
  },
}

export const PROTOCOL_TEMPLATES = {
  GLACIAR: {
    id: 'glaciar-protocol',
    name: 'GLACIAR',
    title: 'Протокол интенсивного увлажнения',
    mainLine: 'GLACIAR',
    goals: ['hydration', 'dehydration', 'comfort'],
    indications: [
      'Обезвоженность',
      'Стянутость',
      'Снижение комфорта кожи',
      'Сухость',
      'Потеря свежести',
    ],

    professional: [
      { title: 'Очищение', products: ['glaciar-cleansing-milk'] },
      { title: 'Тонизация', products: ['glaciar-soft-lotion'] },
      { title: 'Эксфолиация / пилинг', products: ['ecc-renewal-three-action-peel'] },
      { title: 'Тонизация', products: ['glaciar-soft-lotion'] },
      {
        title: 'Уход / активная фаза',
        products: ['glaciar-professional-active-phase', 'mycode-03-hydro-nourishing-code'],
      },
      { title: 'Маска', products: ['mycode-hydronutrition-mask'] },
      {
        title: 'Завершение и защита',
        products: ['glaciar-hydration-cream', 'ecc-repair-shield-spf50', 'ecc-repair-lip-balm'],
      },
    ],

    homecareOptions: [
      {
        id: 'glaciar-homecare',
        title: 'GLACIAR — увлажнение и комфорт',
        morning: [
          'glaciar-cleansing-milk',
          'glaciar-soft-lotion',
          'hydraluronic-serum-gel',
          'glaciar-hydration-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'glaciar-cleansing-milk',
          'glaciar-soft-lotion',
          'hydro-repairer-serum',
          'glaciar-hydration-cream',
        ],
      },
    ],
  },

  NICELY: {
    id: 'nicely-protocol',
    name: 'NICELY',
    title: 'Протокол для чувствительной и реактивной кожи',
    mainLine: 'NICELY',
    goals: ['sensitivity', 'barrier', 'redness', 'comfort'],
    indications: [
      'Чувствительность',
      'Покраснение',
      'Реактивность',
      'Ослабленный барьер',
      'Дискомфорт кожи',
    ],

    professional: [
      { title: 'Очищение', products: ['nicely-soft-eye-remover', 'nicely-gentle-cleanser'] },
      { title: 'Тонизация', products: ['nicely-sweet-toner'] },
      { title: 'Эксфолиация / пилинг', products: ['nicely-enzyme-peel'] },
      { title: 'Тонизация', products: ['nicely-sweet-toner'] },
      {
        title: 'Уход / активная фаза',
        products: ['mycode-02-comforting-code', 'nicely-the-moisturiser'],
      },
      { title: 'Маска', products: ['nicely-delicate-mask'] },
      {
        title: 'Завершение и защита',
        products: ['nicely-smooth-final-cream', 'ecc-repair-lip-balm'],
      },
    ],

    homecareOptions: [
      {
        id: 'nicely-homecare',
        title: 'NICELY — чувствительность и барьер',
        morning: [
          'nicely-gentle-cleanser',
          'nicely-sweet-toner',
          'nicely-the-moisturiser',
          'nicely-smooth-final-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'nicely-gentle-cleanser',
          'nicely-sweet-toner',
          'nicely-the-nourisher',
          'nicely-smooth-final-cream',
        ],
      },
    ],
  },

  BALANCE: {
    id: 'balance-protocol',
    name: 'BALANCE',
    title: 'Протокол себорегуляции и очищения пор',
    mainLine: 'BALANCE',
    goals: ['acne', 'sebum_control', 'pores', 'purifying'],
    indications: [
      'Закупоренные поры',
      'Избыточная выработка себума',
      'Комедоны',
      'Воспалительные элементы',
      'Неровная текстура кожи',
    ],

    professional: [
      { title: 'Очищение', products: ['balance-cleanning-mousse'] },
      { title: 'Тонизация', products: ['balance-balancing-lotion'] },
      { title: 'Эксфолиация / пилинг', products: ['ecc-renewal-three-action-peel'] },
      { title: 'Тонизация', products: ['balance-balancing-lotion'] },
      { title: 'Уход / активная фаза', products: ['balance-pure-regulator'] },
      { title: 'Маска', products: ['balance-balancing-pure-mask'] },
      {
        title: 'Завершение и защита',
        products: ['balance-hydro-balance', 'balance-drying-gel', 'summsun-spf50-sensitive'],
      },
    ],

    homecareOptions: [
      {
        id: 'balance-homecare',
        title: 'BALANCE — себорегуляция и контроль пор',
        morning: [
          'balance-cleanning-mousse',
          'balance-balancing-lotion',
          'balance-pure-regulator',
          'balance-hydro-balance',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'balance-cleanning-mousse',
          'balance-balancing-lotion',
          'balance-pure-regulator',
          'balance-hydro-balance',
          'balance-drying-gel',
        ],
      },
      {
        id: 'balance-glaciar-homecare',
        title: 'BALANCE + GLACIAR — себум + увлажнение',
        morning: [
          'balance-cleanning-mousse',
          'balance-balancing-lotion',
          'balance-pure-regulator',
          'glaciar-hydration-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'balance-cleanning-mousse',
          'balance-balancing-lotion',
          'balance-pure-regulator',
          'hydro-repairer-serum',
          'glaciar-hydration-cream',
        ],
      },
    ],
  },

  BECLARITY: {
    id: 'beclarity-protocol',
    name: 'BECLARITY',
    title: 'Протокол коррекции пигментации и неровного тона',
    mainLine: 'BECLARITY',
    goals: ['pigmentation', 'tone_evening', 'radiance'],
    indications: [
      'Пигментация',
      'Пятна постакне',
      'Неровный тон',
      'Тусклый цвет лица',
      'Фотоповреждение',
    ],

    professional: [
      { title: 'Очищение', products: ['beclarity-clarifying-cleanser'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Эксфолиация / пилинг', products: ['cell-renewall-multi-acid'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      {
        title: 'Уход / активная фаза',
        products: ['mycode-04-depigmenting-code', 'beclarity-blemish-corrector-serum'],
      },
      { title: 'Маска', products: ['cell-c-orange-rubber-mask'] },
      {
        title: 'Завершение и защита',
        products: ['beclarity-blemish-controller-spf50', 'ecc-repair-lip-balm'],
      },
    ],

    homecareOptions: [
      {
        id: 'beclarity-homecare',
        title: 'BECLARITY — пигментация и тон',
        morning: [
          'beclarity-clarifying-cleanser',
          'ecc-remover-mist',
          'beclarity-blemish-corrector-serum',
          'beclarity-blemish-controller-spf50',
        ],
        evening: [
          'beclarity-clarifying-cleanser',
          'ecc-remover-mist',
          'beclarity-blemish-corrector-serum',
          'beclarity-dark-spot-eraser',
        ],
      },
      {
        id: 'beclarity-cellc-homecare',
        title: 'BECLARITY + CELL C — пигментация + сияние',
        morning: [
          'beclarity-clarifying-cleanser',
          'ecc-remover-mist',
          'cell-c-renewal-serum',
          'beclarity-blemish-controller-spf50',
        ],
        evening: [
          'beclarity-clarifying-cleanser',
          'ecc-remover-mist',
          'beclarity-blemish-corrector-serum',
          'cell-c-hydro-c-cream',
        ],
      },
    ],
  },

  CELL_C: {
    id: 'cell-c-protocol',
    name: 'CELL C',
    title: 'Антиоксидантный протокол против оксидативного стресса',
    mainLine: 'CELL_C',
    goals: ['antioxidant', 'radiance', 'photoaging', 'early_anti_age'],
    indications: [
      'Оксидативный стресс',
      'Преждевременное старение',
      'Тусклая кожа',
      'Неровный тон',
      'Фотостарение',
      'Первые морщины',
      'Потеря энергии кожи',
    ],

    professional: [
      { title: 'Очищение', products: ['cell-c-cleanning-mousse'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Эксфолиация / пилинг', products: ['cell-renewall-multi-acid'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Уход / активная фаза', products: ['cell-c-light-lifting-serum-gel'] },
      { title: 'Маска', products: ['cell-c-orange-rubber-mask'] },
      {
        title: 'Завершение и защита',
        products: ['cell-c-antiage-cream', 'summsun-spf50-sensitive'],
      },
    ],

    homecareOptions: [
      {
        id: 'cell-c-homecare',
        title: 'CELL C — сияние и антиоксидантная защита',
        morning: [
          'cell-c-cleanning-mousse',
          'ecc-remover-mist',
          'cell-c-renewal-serum',
          'cell-c-hydro-c-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'cell-c-cleanning-mousse',
          'ecc-remover-mist',
          'cell-c-renewal-serum',
          'cell-c-antiage-cream',
        ],
      },
      {
        id: 'cell-c-mycode-homecare',
        title: 'CELL C + MYCODE — сияние + первые возрастные изменения',
        morning: [
          'cell-c-cleanning-mousse',
          'ecc-remover-mist',
          'cell-c-renewal-serum',
          'cell-c-hydro-c-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'cell-c-cleanning-mousse',
          'ecc-remover-mist',
          'mycode-05-plumping-code',
          'mycode-plumping-cream',
        ],
      },
    ],
  },

  CELL: {
    id: 'cell-protocol',
    name: 'CELL',
    title: 'Протокол регенерации и восстановления качества кожи',
    mainLine: 'CELL',
    goals: ['regeneration', 'anti_age', 'skin_quality', 'repair'],
    indications: [
      'Снижение качества кожи',
      'Возрастная кожа',
      'Сухость',
      'Потеря жизненности',
      'Необходимость восстановления',
    ],

    professional: [
      { title: 'Очищение', products: ['ecc-remover-micellar'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Эксфолиация / пилинг', products: ['ecc-renewal-three-action-peel'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Уход / активная фаза', products: ['cell-activator-serum'] },
      { title: 'Маска', products: ['mycode-hydronutrition-mask'] },
      {
        title: 'Завершение и защита',
        products: ['cell-vitality-cream', 'summsun-spf50-sensitive'],
      },
    ],

    homecareOptions: [
      {
        id: 'cell-homecare',
        title: 'CELL — регенерация и качество кожи',
        morning: [
          'ecc-remover-micellar',
          'ecc-remover-mist',
          'cell-activator-serum',
          'cell-vitality-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'ecc-remover-micellar',
          'ecc-remover-mist',
          'cell-activator-serum',
          'cell-vitality-cream',
        ],
      },
    ],
  },

  MYCODE: {
    id: 'mycode-protocol',
    name: 'MYCODE',
    title: 'Персонализированный anti-age протокол MYCODE',
    mainLine: 'MYCODE_ADVANCED',
    goals: ['anti_age', 'wrinkles', 'firming', 'lifting', 'remodelling'],
    indications: [
      'Выраженные морщины',
      'Потеря упругости',
      'Потеря овала лица',
      'Возрастное обезвоживание',
      'Возрастная пигментация',
    ],

    professional: [
      { title: 'Очищение', products: ['ecc-remover-micellar'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      { title: 'Эксфолиация / пилинг', products: ['ecc-renewal-three-action-peel'] },
      { title: 'Тонизация', products: ['ecc-remover-mist'] },
      {
        title: 'Уход / активная фаза',
        products: ['mycode-05-plumping-code', 'mycode-06-firming-code'],
      },
      { title: 'Маска', products: ['cell-c-orange-rubber-mask'] },
      {
        title: 'Завершение и защита',
        products: ['mycode-firming-cream', 'summsun-spf50-sensitive'],
      },
    ],

    homecareOptions: [
      {
        id: 'mycode-homecare',
        title: 'MYCODE — anti-age и лифтинг',
        morning: [
          'ecc-remover-micellar',
          'ecc-remover-mist',
          'mycode-06-firming-code',
          'mycode-firming-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'ecc-remover-micellar',
          'ecc-remover-mist',
          'mycode-05-plumping-code',
          'mycode-plumping-cream',
        ],
      },
      {
        id: 'mycode-cell-homecare',
        title: 'MYCODE + CELL — anti-age + регенерация',
        morning: [
          'ecc-remover-micellar',
          'ecc-remover-mist',
          'cell-activator-serum',
          'mycode-firming-cream',
          'summsun-spf50-sensitive',
        ],
        evening: [
          'ecc-remover-micellar',
          'ecc-remover-mist',
          'mycode-05-plumping-code',
          'cell-vitality-cream',
        ],
      },
    ],
  },
}

export function getProtocolTemplate(key = 'GLACIAR') {
  return PROTOCOL_TEMPLATES[key] || PROTOCOL_TEMPLATES.GLACIAR
}

export default PROTOCOL_TEMPLATES
