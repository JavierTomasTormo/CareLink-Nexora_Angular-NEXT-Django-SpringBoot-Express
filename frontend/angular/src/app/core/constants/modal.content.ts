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




        export type DifficultiesCategories = {
            'Movilidad': string[];
            'Comunicación': string[];
            'Cognitivas': string[];
            'Sensoriales': string[];
            'Cuidado Personal': string[];
            'Social': string[];
        }
        
        export const DEFAULT_DIFFICULTY_CATEGORY: keyof DifficultiesCategories = 'Movilidad';
        
        export const DIFFICULTIES_CATEGORIES: DifficultiesCategories = {
            'Movilidad': [
            'Dificultad para caminar',
            'Problemas de equilibrio',
            'Limitación en extremidades superiores',
            'Limitación en extremidades inferiores',
            'Necesidad de ayudas técnicas',
            'Dificultad para subir/bajar escaleras'
            ],
            'Comunicación': [
            'Dificultad en el habla',
            'Problemas de audición',
            'Dificultad para escribir',
            'Dificultad para comprender',
            'Tartamudeo'
            ],
            'Cognitivas': [
            'Pérdida de memoria',
            'Dificultad de concentración',
            'Desorientación',
            'Dificultad para tomar decisiones',
            'Problemas de aprendizaje'
            ],
            'Sensoriales': [
            'Deficiencia visual',
            'Sensibilidad a la luz',
            'Sensibilidad al ruido',
            'Problemas de equilibrio',
            'Dificultad con la profundidad'
            ],
            'Cuidado Personal': [
            'Dificultad para vestirse',
            'Dificultad para alimentarse',
            'Dificultad para el aseo personal',
            'Necesidad de supervisión',
            'Dificultad para tomar medicamentos'
            ],
            'Social': [
            'Dificultad para socializar',
            'Ansiedad social',
            'Problemas de conducta',
            'Dificultad para mantener relaciones',
            'Aislamiento'
            ]
        };