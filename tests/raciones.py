# Estimación de peso, kcal y proteína por ración de cada receta: python3 tests/raciones.py
# Sirve para comparar recetas entre sí, no para contar calorías: los valores por 100 g son
# aproximados (BEDCA / etiquetas típicas de Mercadona) y los gramos de cada receta,
# traducidos a mano desde datos/catalogo.js. Si cambias una receta allí, cámbiala aquí.
# Objetivo: unas 400–550 kcal por ración (a veces se acompaña con ensalada).
# (kcal, proteína g)
N = {
 "lenteja_tarro": (100, 8),      # lenteja cocida escurrida
 "lenteja_roja": (345, 24),      # seca
 "sofrito": (100, 1.5),          # B1 con ~50 g de AOVE por tanda
 "curry": (80, 1.5),             # B2
 "asadas": (90, 2),              # B3 con AOVE
 "tofu": (150, 14),              # B5
 "juliana": (30, 1.7),           # B8
 "soja_seca": (350, 50),         # B9 en seco
 "huevo": (143, 12.6),
 "patata": (77, 2), "zanahoria": (41, 0.9), "cebolla": (40, 1.1), "calabacin": (17, 1.2),
 "berenjena": (25, 1), "coliflor": (25, 2), "brocoli": (34, 2.8), "espinaca": (23, 2.9),
 "puerro": (61, 1.5), "pepino": (15, 0.7), "col": (25, 1.3), "cherry": (18, 0.9),
 "pimiento": (25, 1), "calabaza": (26, 1), "pimiento_asado": (30, 1),
 "coco": (180, 1.5), "leche": (65, 3.2), "harina": (350, 10), "mantequilla": (740, 0.7),
 "pasta": (355, 12.5), "pasta_lenteja": (340, 25), "arroz": (350, 7), "fideo_arroz": (360, 6),
 "udon": (140, 4), "cuscus": (360, 12), "pan_rallado": (390, 12), "seitan": (140, 25),
 "queso_fresco": (175, 13), "feta": (265, 14), "queso_rallado": (380, 27), "mozzarella": (250, 18),
 "halloumi": (320, 21), "parmesano": (400, 33), "yogur_griego": (130, 4),
 "nueces": (650, 15), "cacahuete": (600, 25), "crema_cacahuete": (600, 25), "tahini": (600, 17),
 "aove": (900, 0), "pesto": (450, 5), "romesco": (250, 4), "guisantes_maiz": (80, 4),
 "pipas": (580, 20), "almendra": (600, 21), "pasas": (300, 3), "sirope": (300, 0),
 "pan": (260, 9), "masa_pizza": (280, 8), "tomate_frito": (75, 1.5), "setas": (22, 3),
 "garbanzo_tarro": (120, 7), "boniato": (86, 1.6), "hummus": (250, 7), "pita": (275, 9),
 "alubia_tarro": (100, 7), "maiz": (90, 3), "aguacate": (160, 2), "ramen": (360, 10),
 "miso": (200, 12), "gnocchi": (160, 4), "alcachofa": (40, 3), "judia_verde": (31, 1.8),
 "tortilla_maiz": (220, 6),
}
TARRO = 400        # g escurridos por tarro (a confirmar con la etiqueta)
HUEVO = 55         # g comestibles
B = {"B1": ("sofrito", 100), "B2": ("curry", 100), "B3": ("asadas", 330), "B5": ("tofu", 100),
     "B7": ("huevo", HUEVO), "B8": ("juliana", 300), "B9": ("soja_seca", 83)}
# B4: 1 tarro + 1 cda de AOVE por porción. B6: 1 tarro + 200 g sofrito + 50 g zanahoria.
COMP = {"B4": [("lenteja_tarro", TARRO), ("aove", 13), ("cebolla", 40)],
        "B6": [("lenteja_tarro", TARRO), ("sofrito", 200), ("zanahoria", 50)]}
SALSA = {"S1": [("tahini", 15), ("aove", 3)], "S2": [("yogur_griego", 50)],
         "S3": [("crema_cacahuete", 16), ("sirope", 5)], "S4": [("romesco", 30)],
         "S5": [("pesto", 20)], "S6": [("aove", 13)]}   # por ración

def base(id, n):
    if id in COMP: return [(k, g * n) for k, g in COMP[id]]
    k, g = B[id]; return [(k, g * n)]

# Cada receta: raciones, bases, salsas incluidas, gramos del resto (total de la receta)
R = {
 "T1": (3, {"B1": 3}, [], [("lenteja_tarro", TARRO), ("patata", 600), ("zanahoria", 160), ("aove", 13)]),
 "T2": (3, {"B2": 2}, ["S2"], [("lenteja_roja", 180), ("coco", 250), ("espinaca", 120)]),
 "T3": (3, {"B2": 3, "B5": 2, "B8": 1}, [], [("coliflor", 600), ("coco", 150), ("arroz", 150)]),
 "T4": (3, {"B4": 1, "B7": 3}, ["S6"], [("queso_fresco", 200), ("pimiento_asado", 200), ("nueces", 30)]),
 "T5": (3, {"B3": 1, "B4": 1}, ["S1"], [("feta", 150), ("nueces", 30)]),
 "T6": (3, {"B3": 0.6}, ["S4"], [("huevo", 8 * HUEVO), ("queso_rallado", 80)]),
 "T7": (3, {"B3": 0.36}, ["S5"], [("puerro", 300), ("huevo", 5 * HUEVO), ("leche", 150), ("queso_rallado", 80), ("aove", 13)]),
 "T8": (3, {"B5": 3}, ["S3"], [("brocoli", 400), ("arroz", 150)]),
 "T9": (3, {"B1": 3}, [], [("calabacin", 300), ("berenjena", 300), ("huevo", 6 * HUEVO), ("arroz", 120), ("aove", 27)]),
 "T10": (3, {"B3": 1.2}, [], [("puerro", 150), ("lenteja_roja", 150), ("aove", 13), ("feta", 60), ("pipas", 20)]),
 "T11": (3, {"B6": 1}, [], [("berenjena", 600), ("queso_rallado", 100), ("aove", 13)]),
 "T12": (3, {"B1": 3, "B6": 1}, [], [("calabacin", 300), ("pan_rallado", 30), ("huevo", HUEVO), ("arroz", 120)]),
 "T13": (3, {"B3": 1, "B8": 1}, ["S4"], [("seitan", 500), ("aove", 13)]),
 "T14": (3, {}, ["S2"], [("lenteja_tarro", TARRO), ("patata", 200), ("huevo", HUEVO), ("pan_rallado", 50), ("cebolla", 150), ("aove", 13)]),
 "T15": (3, {"B4": 1, "B5": 1}, ["S3"], [("pepino", 300), ("zanahoria", 160), ("cebolla", 50), ("cacahuete", 20)]),
 "T16": (3, {"B2": 3, "B7": 6}, [], [("patata", 400), ("coco", 150)]),
 "T17": (3, {"B6": 1}, [], [("calabacin", 600), ("leche", 300), ("harina", 20), ("mantequilla", 15), ("queso_rallado", 80)]),
 "T18": (3, {"B6": 1}, [], [("pasta", 150), ("leche", 300), ("harina", 20), ("mantequilla", 15), ("queso_rallado", 50)]),
 "T19": (3, {"B3": 1}, ["S5"], [("pasta", 180), ("mozzarella", 125), ("cherry", 250), ("aove", 13), ("almendra", 15)]),
 "T20": (3, {"B5": 2}, ["S3"], [("fideo_arroz", 200), ("pepino", 300), ("zanahoria", 160), ("col", 250), ("cacahuete", 20)]),
 "T21": (3, {"B8": 1}, [], [("udon", 600), ("huevo", 3 * HUEVO), ("aove", 27), ("sirope", 15)]),
 "T22": (3, {"B8": 1}, [], [("arroz", 250), ("huevo", 3 * HUEVO), ("guisantes_maiz", 200), ("aove", 27)]),
 "T23": (3, {"B1": 2}, [], [("arroz", 250), ("calabaza", 300), ("pimiento", 150), ("queso_rallado", 80), ("aove", 13)]),
 "T24": (3, {"B1": 3}, [], [("pasta_lenteja", 250), ("cherry", 250), ("feta", 150), ("aove", 13)]),
 "T25": (3, {"B3": 1}, ["S2"], [("cuscus", 150), ("halloumi", 180), ("pasas", 30), ("almendra", 15)]),
 "T26": (3, {"B9": 1, "B1": 3}, [], [("zanahoria", 160), ("pasta", 200), ("parmesano", 30), ("aove", 13)]),
 "T27": (3, {"B9": 1, "B1": 2}, [], [("pimiento", 600), ("arroz", 150), ("queso_rallado", 80), ("aove", 27)]),
 "T28": (3, {"B9": 1, "B8": 1}, [], [("arroz", 250), ("aove", 27), ("sirope", 15)]),
 "T29": (3, {"B9": 1, "B1": 3}, [], [("patata", 600), ("zanahoria", 160), ("aove", 27)]),
 "F1": (2, {"B1": 3}, [], [("huevo", 4 * HUEVO), ("feta", 100), ("pan", 80), ("aove", 13)]),
 "F2": (2, {"B3": 1}, [], [("masa_pizza", 260), ("tomate_frito", 80), ("mozzarella", 125)]),
 "F3": (2, {"B6": 1}, [], [("pasta", 150), ("parmesano", 20)]),
 "F4": (3, {"B1": 3}, [], [("berenjena", 600), ("mozzarella", 250), ("parmesano", 30), ("aove", 27)]),
 "F5": (2, {}, ["S5"], [("arroz", 160), ("setas", 250), ("cebolla", 150), ("parmesano", 30), ("mantequilla", 20)]),
 "F6": (3, {"B2": 3}, ["S2"], [("garbanzo_tarro", 400), ("boniato", 300), ("coco", 250), ("espinaca", 100)]),
 "F7": (2, {"B3": 1}, [], [("hummus", 150), ("pita", 120), ("huevo", 2 * HUEVO)]),
 "F8": (3, {"B1": 3}, [], [("alubia_tarro", 400), ("maiz", 150), ("aguacate", 150), ("yogur_griego", 125), ("aove", 13)]),
 "F9": (2, {"B1": 2}, [], [("alubia_tarro", 400), ("espinaca", 100), ("huevo", 2 * HUEVO), ("pan", 60)]),
 "F10": (2, {"B5": 2, "B8": 1}, ["S3"], [("fideo_arroz", 120), ("aove", 13)]),
 "F11": (3, {}, [], [("patata", 800), ("huevo", 6 * HUEVO), ("cebolla", 150), ("aove", 60)]),
 "F12": (2, {"B3": 1}, [], [("patata", 450), ("huevo", 4 * HUEVO), ("aove", 27)]),
 "F13": (2, {}, [], [("pasta", 160), ("huevo", 3 * HUEVO), ("parmesano", 40), ("setas", 250), ("aove", 13)]),
 "F14": (4, {"B6": 1}, [], [("pasta", 200), ("leche", 400), ("harina", 30), ("mantequilla", 25), ("queso_rallado", 100)]),
 "F15": (2, {"B5": 1, "B8": 1}, [], [("fideo_arroz", 150), ("huevo", 2 * HUEVO), ("cacahuete", 15), ("aove", 13), ("sirope", 15)]),
 "F16": (2, {}, [], [("ramen", 180), ("miso", 30), ("setas", 200), ("maiz", 150), ("col", 250), ("huevo", 2 * HUEVO), ("aove", 13)]),
 "F17": (2, {"B3": 1}, ["S5"], [("gnocchi", 400), ("parmesano", 20)]),
 "F18": (4, {"B1": 2}, [], [("arroz", 320), ("alcachofa", 200), ("judia_verde", 200), ("pimiento", 150), ("aove", 40)]),
 "F19": (2, {"B9": 1}, [], [("tortilla_maiz", 180), ("aguacate", 150), ("cebolla", 100), ("yogur_griego", 60), ("aove", 13)]),
}

def calc(id):
    rac, bs, ss, rest = R[id]
    items = list(rest)
    for b, n in bs.items(): items += base(b, n)
    for s in ss: items += [(k, g * rac) for k, g in SALSA[s]]
    kcal = sum(N[k][0] * g / 100 for k, g in items)
    prot = sum(N[k][1] * g / 100 for k, g in items)
    peso = sum(g for k, g in items if k not in ("aove", "sirope"))
    return peso / rac, kcal / rac, prot / rac

if __name__ == "__main__":
    print(f"{'':4} {'g':>5} {'kcal':>5} {'prot':>5}")
    for id in R:
        p, k, q = calc(id)
        aviso = "  ← corta" if k < 400 else "  ← cargada" if k > 600 else ""
        print(f"{id:4} {p:5.0f} {k:5.0f} {q:5.1f}{aviso}")
