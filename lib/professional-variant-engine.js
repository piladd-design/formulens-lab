export function selectProfessionalVariant(data) {
  const {
    age = 35,
    skinType = "",
    sensitivity = "",
    concerns = []
  } = data;

  const has = (value) =>
    concerns.some((c) =>
      c.toLowerCase().includes(value.toLowerCase())
    );

  // ---------------------------------
  // BALANCE
  // ---------------------------------

  if (
    has("acne") ||
    has("unrein") ||
    has("akne")
  ) {
    return {
      line: "BALANCE",
      variant: "ACNE CONTROL",
      course: "6 treatments every 7–14 days",
      priority: [
        "Sebum regulation",
        "Inflammation control",
        "Pore refinement"
      ]
    };
  }

  // ---------------------------------
  // BECLARITY
  // ---------------------------------

  if (
    has("pigment") ||
    has("hyperpig")
  ) {
    return {
      line: "BECLARITY",
      variant: "PIGMENT CONTROL",
      course: "6 treatments every 10–14 days",
      priority: [
        "Pigment correction",
        "Skin brightening",
        "Melanin control"
      ]
    };
  }

  // ---------------------------------
  // NICELY
  // ---------------------------------

  if (
    sensitivity === "high" ||
    sensitivity === "hoch"
  ) {
    return {
      line: "NICELY",
      variant: "BARRIER RECOVERY",
      course: "4–6 treatments every 10–14 days",
      priority: [
        "Barrier repair",
        "Sensitivity reduction",
        "Skin comfort"
      ]
    };
  }

  // ---------------------------------
  // GLACIAR
  // ---------------------------------

  if (
    skinType === "dry" ||
    skinType === "trocken"
  ) {
    return {
      line: "GLACIAR",
      variant: "HYDRATION THERAPY",
      course: "4 treatments every 10–14 days",
      priority: [
        "Hydration",
        "Elasticity",
        "Comfort"
      ]
    };
  }

  // ---------------------------------
  // MYCODE RETINOL
  // ---------------------------------

  if (
    age >= 45 &&
    (
      has("wrinkle") ||
      has("falten") ||
      has("lifting")
    )
  ) {
    return {
      line: "MYCODE",
      variant: "RETINOL",
      course: "4 treatments every 14–21 days",
      priority: [
        "Wrinkle reduction",
        "Skin renewal",
        "Collagen stimulation"
      ]
    };
  }

  // ---------------------------------
  // MYCODE EXOSOME
  // ---------------------------------

  if (
    age >= 40
  ) {
    return {
      line: "MYCODE",
      variant: "EXOSOME",
      course: "4 treatments every 14–21 days",
      priority: [
        "Regeneration",
        "Cell activation",
        "Skin rejuvenation"
      ]
    };
  }

  // ---------------------------------
  // DEFAULT
  // ---------------------------------

  return {
    line: "CELL",
    variant: "REGENERATION",
    course: "4 treatments every 14 days",
    priority: [
      "Cell activation",
      "Recovery",
      "Skin vitality"
    ]
  };
}
