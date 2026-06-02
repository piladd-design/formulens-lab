export const PREPARATION_PROTOCOLS = {

  // =====================================================
  // STANDARD ECC PREPARATION
  // =====================================================

  STANDARD: {
    id: 'standard-preparation',

    name: 'ECC Standard Preparation',

    steps: [
      {
        title: 'Демакияж',
        products: [
          'ecc-remover-micellar'
        ]
      },

      {
        title: 'Тонизация',
        products: [
          'ecc-remover-mist'
        ]
      },

      {
        title: 'Эксфолиация',
        products: [
          'ecc-renewal-three-action-peel'
        ]
      },

      {
        title: 'Восстановление pH',
        products: [
          'ecc-remover-mist'
        ]
      },

      {
        title: 'Глубокое очищение',
        products: [
          'ecc-remover-3d-texture-cleanser'
        ]
      },

      {
        title: 'Финальная тонизация',
        products: [
          'ecc-remover-mist'
        ]
      }
    ]
  },

  // =====================================================
  // GLACIAR HYDRATION PREPARATION
  // =====================================================

  GLACIAR: {
    id: 'glaciar-preparation',

    name: 'GLACIAR Hydration Preparation',

    steps: [
      {
        title: 'Очищение',
        products: [
          'glaciar-cleansing-milk'
        ]
      },

      {
        title: 'Тонизация',
        products: [
          'glaciar-soft-lotion'
        ]
      },

      {
        title: 'Пилинг',
        products: [
          'ecc-renewal-three-action-peel'
        ]
      }
    ]
  },

  // =====================================================
  // NICELY SENSITIVE PREPARATION
  // =====================================================

  NICELY: {
    id: 'nicely-preparation',

    name: 'NICELY Sensitive Preparation',

    steps: [
      {
        title: 'Демакияж глаз и губ',
        products: [
          'nicely-soft-eye-remover'
        ]
      },

      {
        title: 'Очищение',
        products: [
          'nicely-gentle-cleanser'
        ]
      },

      {
        title: 'Тонизация',
        products: [
          'nicely-sweet-toner'
        ]
      },

      {
        title: 'Энзимный пилинг',
        products: [
          'nicely-enzyme-peel'
        ]
      },

      {
        title: 'Повторная тонизация',
        products: [
          'nicely-sweet-toner'
        ]
      }
    ]
  }
}

export const MYCODE_VARIANTS = {

  hydration: {
    codes: [
      'mycode-03-hydro-nourishing-code'
    ],
    mask: 'mycode-hydronutrition-mask'
  },

  sensitivity: {
    codes: [
      'mycode-02-comforting-code'
    ],
    mask: 'mycode-hydronutrition-mask'
  },

  pigmentation: {
    codes: [
      'mycode-04-depigmenting-code'
    ],
    mask: 'cell-c-orange-rubber-mask'
  },

  wrinkles: {
    codes: [
      'mycode-05-plumping-code'
    ],
    mask: 'mycode-hydronutrition-mask'
  },

  lifting: {
    codes: [
      'mycode-06-firming-code',
      'mycode-05-plumping-code'
    ],
    mask: 'cell-c-orange-rubber-mask'
  },

  anti_age: {
    codes: [
      'mycode-07-retinol-code',
      'mycode-05-plumping-code'
    ],
    mask: 'mycode-hydronutrition-mask'
  },

  neck: {
    codes: [
      'mycode-08-remodelling-code'
    ],
    mask: 'cell-c-orange-rubber-mask'
  }
}
