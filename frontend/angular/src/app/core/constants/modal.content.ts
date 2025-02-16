    export type AllergyCategories = {
        'Alimentación': string[];
        'Medicamentos': string[];
        'Ambientales': string[];
        'Contacto': string[];
        'Físicos': string[];
        'Insectos y Plantas': string[];
    }
    
    export const DEFAULT_ACTIVE_CATEGORY: keyof AllergyCategories = 'Alimentación';
    
    export const ALLERGIES_CATEGORIES: AllergyCategories = {
        'Alimentación': [
        'Frutos secos',
        'Lactosa',
        'Gluten',
        'Mariscos',
        'Huevo',
        'Soja',
        'Chocolate',
        'Colorantes alimentarios',
        'Conservantes alimentarios',
        'Frutas (plátano, fresa, kiwi, melocotón, etc.)',
        'Vegetales (apio, zanahoria, tomate, etc.)',
        'Legumbres (guisantes, lentejas, garbanzos, etc.)',
        'Especias (canela, pimienta, cúrcuma, etc.)',
        'Alcohol',
        'Cafeína',
        'Alimentos fermentados (queso, vino, vinagre, etc.)',
        'Proteína de la leche de vaca',
        'Carnes rojas (síndrome alfa-gal)',
        'Algas y aditivos marinos',
        'Harinas y polvo de cereales',
        'Gelatina'
        ],
        'Medicamentos': [
        'Penicilina',
        'Medicamentos antiinflamatorios (AINEs)',
        'Sulfitos'
        ],
        'Ambientales': [
        'Polen',
        'Ácaros',
        'Moho',
        'Caspa de animales (perros, gatos, caballos, etc.)',
        'Cloro',
        'Luz solar (fotosensibilidad)'
        ],
        'Contacto': [
        'Látex',
        'Níquel (alergia de contacto)',
        'Perfumes y fragancias',
        'Detergentes y productos de limpieza'
        ],
        'Físicos': [
        'Frío (urticaria por frío)',
        'Calor (urticaria colinérgica)'
        ],
        'Insectos y Plantas': [
        'Picaduras de abejas/avispas',
        'Plantas (hiedra venenosa, roble venenoso, etc.)'
        ]
    };