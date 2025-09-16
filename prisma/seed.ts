import prisma from "@/prisma/db";

async function main() {
  const email = "vkirandonis@gmail.com";
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { 
        email,
        name: "Vagelis",
        image: null },
  });
  const recipes = [
    {
      title: "Sweet Potato & Carrot Purée",
      description:
        "Smooth, naturally sweet purée rich in beta-carotene.",
      prepMin: 10,
      cookMin: 15,
      imageUrl: null,
      sourceUrl: null,
      isPublic: true,
      instructions:
        "Steam until very soft and blend to a smooth purée. Add liquid to reach the texture your baby tolerates.",
      ingredientsText: [
        "1 small sweet potato (≈200 g), peeled & cubed",
        "1 medium carrot, peeled & sliced",
        "60–120 ml water, breast milk, or formula (to thin)",
      ].join("\n"),
      steps: [
        "Peel and chop sweet potato and carrot into small pieces.",
        "Steam or boil 10–15 minutes until very soft.",
        "Blend with 60–120 ml liquid until smooth; adjust thickness as needed.",
        "Cool before serving; refrigerate leftovers up to 48 hours or freeze in portions.",
      ],
    },
    {
      title: "Apple–Pear Cinnamon Purée",
      description:
        "Gentle fruit purée with a hint of cinnamon. No added sugar.",
      servings: 3,
      prepMin: 10,
      cookMin: 10,
      imageUrl: null,
      sourceUrl: null,
      isPublic: true,
      instructions:
        "Simmer fruit with a splash of water, then blend to desired smoothness.",
      ingredientsText: [
        "2 apples, peeled, cored, chopped",
        "1 ripe pear, peeled, cored, chopped",
        "80 ml water",
        "A tiny pinch ground cinnamon (optional)",
      ].join("\n"),
      steps: [
        "Combine apple, pear, and water in a small pot.",
        "Simmer 8–10 minutes until very soft.",
        "Blend to a smooth or slightly textured purée; add a tiny pinch of cinnamon if desired.",
        "Cool and serve; store as per food safety guidance.",
      ],
    },
    {
      title: "Avocado & Banana Mash",
      description:
        "Creamy healthy fats and natural sweetness—perfect quick meal or snack.",
      servings: 2,
      prepMin: 5,
      cookMin: 0,
      imageUrl: null,
      sourceUrl: null,
      isPublic: true,
      instructions:
        "Mash thoroughly; thin with milk/water if needed for a smoother texture.",
      ingredientsText: [
        "1 ripe avocado",
        "1 small ripe banana",
        "1–2 tbsp water, breast milk, or formula (optional, to thin)",
      ].join("\n"),
      steps: [
        "Scoop avocado flesh into a bowl; add peeled banana.",
        "Mash together until smooth.",
        "Add 1–2 tbsp liquid to thin if needed.",
        "Serve immediately (avocado browns quickly).",
      ],
    },
    {
      title: "Red Lentil & Veggie Purée",
      description:
        "Iron-rich lentils with mild vegetables.",
      servings: 3,
      prepMin: 10,
      cookMin: 20,
      imageUrl: null,
      sourceUrl: null,
      isPublic: true,
      instructions:
        "Cook lentils and veg until very soft, then blend smooth; add water to reach desired consistency.",
      ingredientsText: [
        "60 g red lentils, rinsed",
        "1 small carrot, peeled & diced",
        "1/4 small zucchini, diced",
        "300 ml water (add more if needed)",
      ].join("\n"),
      steps: [
        "Rinse lentils until water runs clear.",
        "Combine lentils, carrot, zucchini, and water in a pot.",
        "Simmer 15–20 minutes until everything is very soft.",
        "Blend smooth; thin with extra water if needed. Cool before serving.",
      ],
    },
    {
      title: "Creamy Oatmeal with Banana",
      description:
        "Soft oats with mashed banana. Use milk or water you typically feed.",
      servings: 2,
      prepMin: 5,
      cookMin: 5,
      imageUrl: null,
      sourceUrl: null,
      isPublic: true,
      instructions:
        "Cook oats until very soft; mash in banana; thin to baby’s preferred texture.",
      ingredientsText: [
        "40 g fine/quick oats",
        "240 ml water, breast milk, or formula",
        "1 small ripe banana, mashed",
      ].join("\n"),
      steps: [
        "Bring liquid to a gentle simmer; add oats.",
        "Cook 3–5 minutes, stirring, until very soft.",
        "Stir in mashed banana; add extra liquid to thin if needed.",
        "Cool and serve.",
      ],
    },
  ];
 for(const r of recipes) {
    await prisma.recipe.create({
        data: {
            userId: user.id,
            title: r.title,
            description: r.description,
            instructions: r.instructions,
            imageUrl: r.imageUrl,
            prepMin: r.prepMin,
            cookMin: r.cookMin,
            servings: r.servings,
            sourceUrl: r.sourceUrl,
            isPublic: r.isPublic,
            createdAt: new Date(),
            updatedAt: new Date(),
            ingredientsText: r.ingredientsText,
            steps: r.steps, 
        }
    })
}
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
