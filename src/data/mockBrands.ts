import { Brand, BrandRecommendation } from "@/types";

export const mockBrands: Brand[] = [
  {
    id: "brand_hermes",
    name: "Hermes",
    tagline: "Contemporary Artisan Since 1837",
    founded: 1837,
    origin: "Paris, France",
    logo: "/brands/hermes-logo.svg",
    heroImage: "/brands/hermes-hero.jpg",
    officialSiteUrl: "https://www.hermes.com",
    philosophy:
      "Hermes does not follow fashion. Hermes follows craft. For nearly two centuries, the house has maintained a singular commitment: the relentless pursuit of excellence in craftsmanship.",
    alignmentReason:
      "Your appreciation for quiet luxury and exceptional craftsmanship aligns with Hermes' philosophy of material excellence over trend.",
    universe: {
      heritage: {
        introduction:
          "From humble beginnings as a harness workshop to becoming the world's most coveted luxury house.",
        timeline: [
          {
            year: 1837,
            title: "The Beginning",
            description:
              "Thierry Hermes opens a harness workshop on the Grands Boulevards in Paris, serving European nobility.",
            image: "/brands/hermes/1837.jpg",
          },
          {
            year: 1922,
            title: "The First Bag",
            description:
              "The Haut a Courroies bag is introduced, originally designed to carry saddles.",
            image: "/brands/hermes/1922.jpg",
          },
          {
            year: 1937,
            title: "The Silk Carre",
            description:
              "The first silk scarf is created, beginning a century-long tradition of storytelling through print.",
            image: "/brands/hermes/1937.jpg",
          },
          {
            year: 1984,
            title: "The Birkin",
            description:
              "A chance encounter between Jean-Louis Dumas and Jane Birkin leads to the most iconic bag in history.",
            image: "/brands/hermes/1984.jpg",
          },
        ],
      },
      craftsmanship: [
        {
          title: "Leather Selection",
          description:
            "Each hide is inspected for hours. Only the finest are selected. The relationship with tanneries spans generations.",
          image: "/brands/hermes/craft-leather.jpg",
        },
        {
          title: "Saddle Stitch",
          description:
            "Two needles, one thread. The signature saddle stitch, unchanged for 180 years, ensures a bag can be repaired for life.",
          image: "/brands/hermes/craft-stitch.jpg",
        },
        {
          title: "Silk Printing",
          description:
            "Each carre requires up to 750 hours of engraving work. The colors are layered one by one, up to 45 screens per design.",
          image: "/brands/hermes/craft-silk.jpg",
        },
      ],
      culturalConnections: [
        "Grace Kelly and the Kelly Bag — A princess shields her pregnancy, creating an icon",
        "Jane Birkin and the Birkin — A chance airplane encounter that changed fashion history",
        "Silk scarves in art collections worldwide — The carre as cultural artifact",
      ],
    },
  },
  {
    id: "brand_therow",
    name: "The Row",
    tagline: "Luxury in the Quiet Details",
    founded: 2006,
    origin: "New York, USA",
    logo: "/brands/therow-logo.svg",
    heroImage: "/brands/therow-hero.jpg",
    officialSiteUrl: "https://www.therow.com",
    philosophy:
      "The Row believes in a wardrobe built to last, designed with restraint, crafted with excellence. Luxury whispered, never shouted.",
    alignmentReason:
      "Your preference for architectural minimalism and understated elegance perfectly aligns with The Row's design philosophy.",
    universe: {
      heritage: {
        introduction:
          "Founded by Ashley and Mary-Kate Olsen with a single perfect t-shirt.",
        timeline: [
          {
            year: 2006,
            title: "The Perfect T-Shirt",
            description:
              "The Row begins with an obsession: creating the perfect white t-shirt. 50 iterations later, they succeed.",
            image: "/brands/therow/2006.jpg",
          },
          {
            year: 2011,
            title: "Ready-to-Wear Expansion",
            description:
              "The brand expands into full ready-to-wear, maintaining its philosophy of quiet excellence.",
            image: "/brands/therow/2011.jpg",
          },
          {
            year: 2018,
            title: "The Margaux",
            description:
              "The Margaux bag is introduced, quickly becoming a symbol of understated luxury.",
            image: "/brands/therow/2018.jpg",
          },
        ],
      },
      craftsmanship: [
        {
          title: "Material Obsession",
          description:
            "Years spent sourcing the world's finest fabrics. Cashmere from Mongolia, leather from Italy, silk from Japan.",
          image: "/brands/therow/craft-material.jpg",
        },
        {
          title: "Invisible Excellence",
          description:
            "Construction details meant to be felt, not seen. Seams that disappear. Weight that drapes perfectly.",
          image: "/brands/therow/craft-construction.jpg",
        },
      ],
      culturalConnections: [
        "The uniform of architects, artists, and those who value substance over show",
        "Worn by women who dress for themselves, not for recognition",
      ],
    },
  },
  {
    id: "brand_loro",
    name: "Loro Piana",
    tagline: "The World's Finest Materials",
    founded: 1924,
    origin: "Quarona, Italy",
    logo: "/brands/loropiana-logo.svg",
    heroImage: "/brands/loropiana-hero.jpg",
    officialSiteUrl: "https://www.loropiana.com",
    philosophy:
      "Loro Piana is not about fashion. It's about the raw materials that make fashion possible. The world's finest cashmere, vicuna, and wool.",
    alignmentReason:
      "Your appreciation for material quality and quiet luxury resonates with Loro Piana's dedication to fiber excellence.",
    universe: {
      heritage: {
        introduction:
          "Six generations of textile expertise, from wool merchants to global luxury house.",
        timeline: [
          {
            year: 1924,
            title: "The Beginning",
            description:
              "Pietro Loro Piana establishes the company in Quarona, continuing a family tradition in textiles.",
            image: "/brands/loropiana/1924.jpg",
          },
          {
            year: 1941,
            title: "First Cashmere",
            description:
              "The company begins working with cashmere, starting a journey to source the world's finest fibers.",
            image: "/brands/loropiana/1941.jpg",
          },
          {
            year: 1994,
            title: "Vicuna Conservation",
            description:
              "Loro Piana begins working with Peruvian communities to sustainably harvest vicuna, the rarest fiber on earth.",
            image: "/brands/loropiana/1994.jpg",
          },
        ],
      },
      craftsmanship: [
        {
          title: "Fiber Selection",
          description:
            "Only 1% of the world's cashmere meets Loro Piana standards. Each fiber is measured to the micron.",
          image: "/brands/loropiana/craft-fiber.jpg",
        },
        {
          title: "Italian Manufacturing",
          description:
            "From raw fiber to finished garment, everything happens in Italy under the watch of master craftsmen.",
          image: "/brands/loropiana/craft-factory.jpg",
        },
      ],
      culturalConnections: [
        "Supplying the world's finest mills for over a century",
        "The quiet choice of those who understand quality",
      ],
    },
  },
  {
    id: "brand_celine",
    name: "Celine",
    tagline: "Parisian Chic Since 1945",
    founded: 1945,
    origin: "Paris, France",
    logo: "/brands/celine-logo.svg",
    heroImage: "/brands/celine-hero.jpg",
    officialSiteUrl: "https://www.celine.com",
    philosophy:
      "Celine represents Parisian elegance at its purest. Clean lines, luxurious materials, and a commitment to timeless design over trend.",
    alignmentReason:
      "Your affinity for Parisian elegance and architectural minimalism aligns perfectly with Celine's design language.",
    universe: {
      heritage: {
        introduction:
          "From children's shoes to the epitome of Parisian chic, Celine's journey is one of constant refinement.",
        timeline: [
          {
            year: 1945,
            title: "The Beginning",
            description:
              "Celine Vipiana opens a made-to-measure children's shoe business in Paris.",
            image: "/brands/celine/1945.jpg",
          },
          {
            year: 1967,
            title: "Ready-to-Wear",
            description:
              "The brand expands into women's ready-to-wear, beginning its journey to fashion house status.",
            image: "/brands/celine/1967.jpg",
          },
          {
            year: 2008,
            title: "The Phoebe Era",
            description:
              "Phoebe Philo arrives and redefines modern luxury with her minimalist, intellectual approach.",
            image: "/brands/celine/2008.jpg",
          },
        ],
      },
      craftsmanship: [
        {
          title: "Architectural Construction",
          description:
            "Each garment is built like architecture—structured, precise, and designed to endure.",
          image: "/brands/celine/craft-construction.jpg",
        },
        {
          title: "Material Excellence",
          description:
            "Only the finest European materials, from Italian wool to French silk.",
          image: "/brands/celine/craft-material.jpg",
        },
      ],
      culturalConnections: [
        "The uniform of the creative class",
        "Defining minimalist luxury for a generation",
      ],
    },
  },
  {
    id: "brand_jilsander",
    name: "Jil Sander",
    tagline: "Queen of Less",
    founded: 1968,
    origin: "Hamburg, Germany",
    logo: "/brands/jilsander-logo.svg",
    heroImage: "/brands/jilsander-hero.jpg",
    officialSiteUrl: "https://www.jilsander.com",
    philosophy:
      "Jil Sander pioneered minimalism in fashion. Pure form, impeccable tailoring, and the belief that less is infinitely more.",
    alignmentReason:
      "Your architectural minimalism philosophy finds its purest expression in Jil Sander's design approach.",
    universe: {
      heritage: {
        introduction:
          "The house that made minimalism a fashion statement.",
        timeline: [
          {
            year: 1968,
            title: "The Beginning",
            description:
              "Jil Sander opens her first boutique in Hamburg, challenging the maximalism of the era.",
            image: "/brands/jilsander/1968.jpg",
          },
          {
            year: 1973,
            title: "Ready-to-Wear Launch",
            description:
              "The first full collection debuts, establishing the minimalist aesthetic that would define the house.",
            image: "/brands/jilsander/1973.jpg",
          },
          {
            year: 2020,
            title: "Lucie and Luke Meier",
            description:
              "The husband-wife duo takes creative helm, bringing fresh perspective while honoring the minimalist legacy.",
            image: "/brands/jilsander/2020.jpg",
          },
        ],
      },
      craftsmanship: [
        {
          title: "Precision Tailoring",
          description:
            "Every seam is considered. Every proportion is calculated. German precision meets Italian craft.",
          image: "/brands/jilsander/craft-tailoring.jpg",
        },
        {
          title: "Pure Materials",
          description:
            "Unadorned fabrics that speak through quality alone. No embellishment, only excellence.",
          image: "/brands/jilsander/craft-fabric.jpg",
        },
      ],
      culturalConnections: [
        "Inspiring a generation of minimalist designers",
        "The intellectual's choice in fashion",
      ],
    },
  },
];

export const mockBrandRecommendations: BrandRecommendation[] = [
  {
    brandId: "brand_loro",
    reason: "Your affinity for quiet luxury and exceptional materials",
    image: "/brands/loropiana-hero.jpg",
  },
  {
    brandId: "brand_therow",
    reason: "Architectural minimalism that mirrors your style evolution",
    image: "/brands/therow-hero.jpg",
  },
  {
    brandId: "brand_celine",
    reason: "Parisian elegance aligned with your cultural affinity",
    image: "/brands/celine-hero.jpg",
  },
];
