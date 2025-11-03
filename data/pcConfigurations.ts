
import { PCConfiguration } from '@/types/PCConfig';

export const pcConfigurations: PCConfiguration[] = [
  {
    id: '1',
    name: 'Config Essentielle',
    price: 800,
    category: 'entry',
    type: 'prebuild',
    description: 'Configuration d\'entrée de gamme parfaite pour débuter dans le gaming PC. Idéale pour les jeux en 1080p avec des paramètres moyens à élevés.',
    performance: '1080p - 60 FPS',
    imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
    recommended: true,
    components: [
      {
        id: 'cpu1',
        name: 'AMD Ryzen 5 5600',
        type: 'cpu',
        brand: 'AMD',
        price: 130,
        description: 'Processeur 6 cœurs / 12 threads excellent pour le gaming',
        specs: ['6 cœurs', '12 threads', '3.5 GHz base', '4.4 GHz boost']
      },
      {
        id: 'gpu1',
        name: 'NVIDIA RTX 4060',
        type: 'gpu',
        brand: 'NVIDIA',
        price: 300,
        description: 'Carte graphique performante pour le 1080p',
        specs: ['8 Go GDDR6', 'Ray Tracing', 'DLSS 3.0']
      },
      {
        id: 'ram1',
        name: 'Corsair Vengeance 16Go DDR4',
        type: 'ram',
        brand: 'Corsair',
        price: 50,
        description: 'Mémoire vive rapide et fiable',
        specs: ['16 Go', 'DDR4', '3200 MHz', '2x8 Go']
      },
      {
        id: 'storage1',
        name: 'Samsung 970 EVO Plus 500Go',
        type: 'storage',
        brand: 'Samsung',
        price: 60,
        description: 'SSD NVMe rapide pour des temps de chargement optimaux',
        specs: ['500 Go', 'NVMe', '3500 Mo/s lecture']
      },
      {
        id: 'mb1',
        name: 'MSI B550-A PRO',
        type: 'motherboard',
        brand: 'MSI',
        price: 120,
        description: 'Carte mère fiable avec toutes les fonctionnalités essentielles',
        specs: ['Socket AM4', 'ATX', 'PCIe 4.0']
      },
      {
        id: 'psu1',
        name: 'Corsair CV650',
        type: 'psu',
        brand: 'Corsair',
        price: 60,
        description: 'Alimentation 650W certifiée 80+ Bronze',
        specs: ['650W', '80+ Bronze', 'Semi-modulaire']
      },
      {
        id: 'case1',
        name: 'Cooler Master MB311L',
        type: 'case',
        brand: 'Cooler Master',
        price: 60,
        description: 'Boîtier compact avec bon flux d\'air',
        specs: ['Micro-ATX', 'Panneau vitré', '2 ventilateurs']
      },
      {
        id: 'cool1',
        name: 'Cooler Master Hyper 212',
        type: 'cooling',
        brand: 'Cooler Master',
        price: 20,
        description: 'Refroidissement CPU efficace et silencieux',
        specs: ['Tour simple', 'Ventilateur 120mm', 'TDP 180W']
      }
    ]
  },
  {
    id: '2',
    name: 'Config Équilibrée',
    price: 1100,
    category: 'mid',
    type: 'custom',
    description: 'Le meilleur rapport qualité-prix pour une expérience gaming fluide en 1440p. Configuration polyvalente pour tous les jeux récents.',
    performance: '1440p - 60-90 FPS',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    recommended: true,
    components: [
      {
        id: 'cpu2',
        name: 'AMD Ryzen 5 7600X',
        type: 'cpu',
        brand: 'AMD',
        price: 230,
        description: 'Processeur nouvelle génération ultra-performant',
        specs: ['6 cœurs', '12 threads', '4.7 GHz base', '5.3 GHz boost']
      },
      {
        id: 'gpu2',
        name: 'AMD Radeon RX 7700 XT',
        type: 'gpu',
        brand: 'AMD',
        price: 450,
        description: 'Excellente carte pour le 1440p avec 12 Go de VRAM',
        specs: ['12 Go GDDR6', 'Ray Tracing', 'FSR 3.0']
      },
      {
        id: 'ram2',
        name: 'G.Skill Trident Z5 32Go DDR5',
        type: 'ram',
        brand: 'G.Skill',
        price: 110,
        description: 'Mémoire DDR5 haute performance',
        specs: ['32 Go', 'DDR5', '6000 MHz', '2x16 Go']
      },
      {
        id: 'storage2',
        name: 'Samsung 980 PRO 1To',
        type: 'storage',
        brand: 'Samsung',
        price: 100,
        description: 'SSD NVMe Gen4 ultra-rapide',
        specs: ['1 To', 'NVMe Gen4', '7000 Mo/s lecture']
      },
      {
        id: 'mb2',
        name: 'ASUS TUF Gaming B650-PLUS',
        type: 'motherboard',
        brand: 'ASUS',
        price: 180,
        description: 'Carte mère robuste avec excellentes fonctionnalités',
        specs: ['Socket AM5', 'ATX', 'PCIe 5.0', 'WiFi 6']
      },
      {
        id: 'psu2',
        name: 'Corsair RM750e',
        type: 'psu',
        brand: 'Corsair',
        price: 90,
        description: 'Alimentation 750W certifiée 80+ Gold',
        specs: ['750W', '80+ Gold', 'Modulaire']
      },
      {
        id: 'case2',
        name: 'Fractal Design Meshify C',
        type: 'case',
        brand: 'Fractal Design',
        price: 90,
        description: 'Boîtier premium avec excellent flux d\'air',
        specs: ['ATX', 'Panneau vitré', '3 ventilateurs']
      },
      {
        id: 'cool2',
        name: 'be quiet! Dark Rock 4',
        type: 'cooling',
        brand: 'be quiet!',
        price: 70,
        description: 'Refroidissement haut de gamme ultra-silencieux',
        specs: ['Tour double', 'Ventilateur 135mm', 'TDP 200W']
      }
    ]
  },
  {
    id: '3',
    name: 'Config Performance',
    price: 1500,
    category: 'high',
    type: 'prebuild',
    description: 'Configuration haut de gamme pour les gamers exigeants. Performances maximales en 1440p et excellent pour le 4K.',
    performance: '1440p/4K - 100+ FPS',
    imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800',
    recommended: true,
    components: [
      {
        id: 'cpu3',
        name: 'AMD Ryzen 7 7800X3D',
        type: 'cpu',
        brand: 'AMD',
        price: 400,
        description: 'Le meilleur processeur gaming du marché',
        specs: ['8 cœurs', '16 threads', '4.2 GHz base', '5.0 GHz boost', '96 Mo cache 3D']
      },
      {
        id: 'gpu3',
        name: 'NVIDIA RTX 4070 Ti',
        type: 'gpu',
        brand: 'NVIDIA',
        price: 800,
        description: 'Carte graphique ultra-performante',
        specs: ['12 Go GDDR6X', 'Ray Tracing', 'DLSS 3.5']
      },
      {
        id: 'ram3',
        name: 'Corsair Dominator 32Go DDR5',
        type: 'ram',
        brand: 'Corsair',
        price: 150,
        description: 'Mémoire premium ultra-rapide',
        specs: ['32 Go', 'DDR5', '6400 MHz', '2x16 Go', 'RGB']
      },
      {
        id: 'storage3',
        name: 'Samsung 990 PRO 2To',
        type: 'storage',
        brand: 'Samsung',
        price: 180,
        description: 'SSD NVMe Gen4 de dernière génération',
        specs: ['2 To', 'NVMe Gen4', '7450 Mo/s lecture']
      },
      {
        id: 'mb3',
        name: 'ASUS ROG Strix X670E-E',
        type: 'motherboard',
        brand: 'ASUS',
        price: 350,
        description: 'Carte mère premium avec toutes les fonctionnalités',
        specs: ['Socket AM5', 'E-ATX', 'PCIe 5.0', 'WiFi 6E', 'RGB']
      },
      {
        id: 'psu3',
        name: 'Corsair HX1000i',
        type: 'psu',
        brand: 'Corsair',
        price: 200,
        description: 'Alimentation 1000W certifiée 80+ Platinum',
        specs: ['1000W', '80+ Platinum', 'Modulaire', 'Monitoring']
      },
      {
        id: 'case3',
        name: 'Lian Li O11 Dynamic EVO',
        type: 'case',
        brand: 'Lian Li',
        price: 160,
        description: 'Boîtier premium avec design exceptionnel',
        specs: ['ATX', 'Double panneau vitré', 'Support watercooling']
      },
      {
        id: 'cool3',
        name: 'Noctua NH-D15',
        type: 'cooling',
        brand: 'Noctua',
        price: 100,
        description: 'Le meilleur refroidissement air du marché',
        specs: ['Tour double', '2x140mm', 'TDP 250W', 'Ultra-silencieux']
      }
    ]
  },
  {
    id: '4',
    name: 'Config Streamer',
    price: 1350,
    category: 'high',
    type: 'custom',
    description: 'Configuration optimisée pour le streaming et le gaming simultané. Parfaite pour les créateurs de contenu.',
    performance: '1440p - Streaming',
    imageUrl: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800',
    recommended: false,
    components: [
      {
        id: 'cpu4',
        name: 'AMD Ryzen 9 7900X',
        type: 'cpu',
        brand: 'AMD',
        price: 420,
        description: 'Processeur 12 cœurs idéal pour le multitâche',
        specs: ['12 cœurs', '24 threads', '4.7 GHz base', '5.4 GHz boost']
      },
      {
        id: 'gpu4',
        name: 'NVIDIA RTX 4070',
        type: 'gpu',
        brand: 'NVIDIA',
        price: 600,
        description: 'Carte graphique avec encodeur NVENC pour le streaming',
        specs: ['12 Go GDDR6X', 'Ray Tracing', 'NVENC', 'DLSS 3.0']
      },
      {
        id: 'ram4',
        name: 'G.Skill Trident Z5 RGB 32Go',
        type: 'ram',
        brand: 'G.Skill',
        price: 130,
        description: 'Mémoire DDR5 avec RGB',
        specs: ['32 Go', 'DDR5', '6000 MHz', '2x16 Go', 'RGB']
      },
      {
        id: 'storage4',
        name: 'WD Black SN850X 2To',
        type: 'storage',
        brand: 'Western Digital',
        price: 170,
        description: 'SSD NVMe rapide avec grande capacité',
        specs: ['2 To', 'NVMe Gen4', '7300 Mo/s lecture']
      },
      {
        id: 'mb4',
        name: 'MSI MAG X670E Tomahawk',
        type: 'motherboard',
        brand: 'MSI',
        price: 280,
        description: 'Carte mère complète pour créateurs',
        specs: ['Socket AM5', 'ATX', 'PCIe 5.0', 'WiFi 6E']
      },
      {
        id: 'psu4',
        name: 'Seasonic Focus GX-850',
        type: 'psu',
        brand: 'Seasonic',
        price: 130,
        description: 'Alimentation 850W fiable',
        specs: ['850W', '80+ Gold', 'Modulaire']
      },
      {
        id: 'case4',
        name: 'NZXT H7 Flow',
        type: 'case',
        brand: 'NZXT',
        price: 130,
        description: 'Boîtier moderne avec excellent flux d\'air',
        specs: ['ATX', 'Panneau vitré', '3 ventilateurs RGB']
      },
      {
        id: 'cool4',
        name: 'Arctic Liquid Freezer II 280',
        type: 'cooling',
        brand: 'Arctic',
        price: 110,
        description: 'Watercooling AIO performant',
        specs: ['AIO 280mm', '2x140mm', 'TDP 300W']
      }
    ]
  },
  {
    id: '5',
    name: 'Config Compacte',
    price: 950,
    category: 'mid',
    type: 'prebuild',
    description: 'Configuration Mini-ITX compacte sans compromis sur les performances. Idéale pour les petits espaces.',
    performance: '1080p/1440p - 60 FPS',
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800',
    recommended: false,
    components: [
      {
        id: 'cpu5',
        name: 'Intel Core i5-13400F',
        type: 'cpu',
        brand: 'Intel',
        price: 200,
        description: 'Processeur Intel efficace et performant',
        specs: ['10 cœurs', '16 threads', '2.5 GHz base', '4.6 GHz boost']
      },
      {
        id: 'gpu5',
        name: 'NVIDIA RTX 4060 Ti',
        type: 'gpu',
        brand: 'NVIDIA',
        price: 420,
        description: 'Carte graphique compacte et performante',
        specs: ['8 Go GDDR6', 'Ray Tracing', 'DLSS 3.0', 'Format court']
      },
      {
        id: 'ram5',
        name: 'Kingston Fury Beast 32Go DDR4',
        type: 'ram',
        brand: 'Kingston',
        price: 90,
        description: 'Mémoire DDR4 fiable',
        specs: ['32 Go', 'DDR4', '3600 MHz', '2x16 Go']
      },
      {
        id: 'storage5',
        name: 'Crucial P5 Plus 1To',
        type: 'storage',
        brand: 'Crucial',
        price: 90,
        description: 'SSD NVMe Gen4 compact',
        specs: ['1 To', 'NVMe Gen4', '6600 Mo/s lecture']
      },
      {
        id: 'mb5',
        name: 'ASUS ROG Strix B760-I',
        type: 'motherboard',
        brand: 'ASUS',
        price: 220,
        description: 'Carte mère Mini-ITX premium',
        specs: ['Socket LGA1700', 'Mini-ITX', 'PCIe 5.0', 'WiFi 6E']
      },
      {
        id: 'psu5',
        name: 'Corsair SF750',
        type: 'psu',
        brand: 'Corsair',
        price: 150,
        description: 'Alimentation SFX 750W compacte',
        specs: ['750W', '80+ Platinum', 'Modulaire', 'Format SFX']
      },
      {
        id: 'case5',
        name: 'NZXT H1 V2',
        type: 'case',
        brand: 'NZXT',
        price: 180,
        description: 'Boîtier Mini-ITX tout-en-un',
        specs: ['Mini-ITX', 'Panneau vitré', 'AIO 140mm inclus']
      },
      {
        id: 'cool5',
        name: 'Noctua NH-L9i',
        type: 'cooling',
        brand: 'Noctua',
        price: 50,
        description: 'Refroidissement low-profile silencieux',
        specs: ['Low-profile', '92mm', 'TDP 95W', 'Ultra-compact']
      }
    ]
  },
  {
    id: '6',
    name: 'Config Budget Pro',
    price: 850,
    category: 'entry',
    type: 'custom',
    description: 'Configuration entrée de gamme optimisée pour offrir le meilleur rapport performance/prix. Parfaite pour découvrir le gaming PC.',
    performance: '1080p - 60 FPS',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800',
    recommended: false,
    components: [
      {
        id: 'cpu6',
        name: 'Intel Core i3-12100F',
        type: 'cpu',
        brand: 'Intel',
        price: 100,
        description: 'Processeur 4 cœurs efficace pour le gaming',
        specs: ['4 cœurs', '8 threads', '3.3 GHz base', '4.3 GHz boost']
      },
      {
        id: 'gpu6',
        name: 'AMD Radeon RX 6600',
        type: 'gpu',
        brand: 'AMD',
        price: 230,
        description: 'Excellente carte pour le 1080p',
        specs: ['8 Go GDDR6', 'Ray Tracing', 'FSR 2.0']
      },
      {
        id: 'ram6',
        name: 'Crucial 16Go DDR4',
        type: 'ram',
        brand: 'Crucial',
        price: 45,
        description: 'Mémoire DDR4 fiable et abordable',
        specs: ['16 Go', 'DDR4', '3200 MHz', '2x8 Go']
      },
      {
        id: 'storage6',
        name: 'Kingston NV2 500Go',
        type: 'storage',
        brand: 'Kingston',
        price: 40,
        description: 'SSD NVMe économique',
        specs: ['500 Go', 'NVMe', '3500 Mo/s lecture']
      },
      {
        id: 'mb6',
        name: 'ASRock B660M Pro RS',
        type: 'motherboard',
        brand: 'ASRock',
        price: 100,
        description: 'Carte mère Micro-ATX abordable',
        specs: ['Socket LGA1700', 'Micro-ATX', 'PCIe 4.0']
      },
      {
        id: 'psu6',
        name: 'be quiet! System Power 10 550W',
        type: 'psu',
        brand: 'be quiet!',
        price: 50,
        description: 'Alimentation 550W efficace',
        specs: ['550W', '80+ Bronze', 'Non-modulaire']
      },
      {
        id: 'case6',
        name: 'Thermaltake Versa H18',
        type: 'case',
        brand: 'Thermaltake',
        price: 45,
        description: 'Boîtier compact et abordable',
        specs: ['Micro-ATX', 'Panneau acrylique', '1 ventilateur']
      },
      {
        id: 'cool6',
        name: 'Arctic Freezer 34 eSports',
        type: 'cooling',
        brand: 'Arctic',
        price: 30,
        description: 'Refroidissement efficace et économique',
        specs: ['Tour simple', 'Ventilateur 120mm', 'TDP 150W']
      }
    ]
  }
];
