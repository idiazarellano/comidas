/* Catálogo de Comidas. Fuente de la verdad del recetario.
   Va dentro del código: se actualiza al publicar. Los datos del usuario
   (inventario, menús, favoritos, ediciones) viven en localStorage y solo
   guardan ids ("T17", "B6").

   pasillo: tarros | verdura | proteina | despensa
   conserv: congela | nevera4 | nevera5 | nevera7 | nevera14
   tipo:    "🔥" calentar · "🌡️" se come frío · "🧊" congela bien          */

const CATALOGO = {
  version: 1,

  bases: [
    { id:"B1", nombre:"Sofrito de tomate", conserv:"congela", icono:"🍅",
      rinde:"~1 kg = 10 porciones de 100 g",
      porciones:10,
      prep:"4 cebollas, 2 pimientos, 4 ajos y 800 g de tomate triturado. Fuego lento 40 min. Congelar en tuppers rectangulares o tarros.",
      minutos:40, puesto:"fuego",
      compra:[{n:"cebolla",c:"4",p:"verdura"},{n:"pimiento rojo",c:"2",p:"verdura"},{n:"ajos",c:"1 cabeza",p:"verdura"},{n:"tomate triturado 800 g",c:"1",p:"despensa"}] },

    { id:"B2", nombre:"Base de curry", conserv:"congela", icono:"🍛",
      rinde:"~900 g = 4–6 porciones de 150–200 g",
      porciones:5,
      prep:"2 cebollas, 4 ajos, 1 trozo de jengibre, 2 cda de curry, 1 cdta de garam masala, 800 g de tomate. Pochar 25 min y triturar.",
      minutos:25, puesto:"fuego",
      compra:[{n:"cebolla",c:"2",p:"verdura"},{n:"ajos",c:"4 dientes",p:"verdura"},{n:"jengibre",c:"1 trozo",p:"verdura"},{n:"tomate triturado 800 g",c:"1",p:"despensa"},{n:"curry",c:"",p:"despensa"},{n:"garam masala",c:"",p:"despensa"}] },

    { id:"B3", nombre:"Bandeja de verduras asadas", conserv:"nevera4", icono:"🥕",
      rinde:"2 bandejas ≈ 6 porciones",
      porciones:6,
      prep:"2 bandejas: calabaza, boniato, pimiento, cebolla roja, berenjena, calabacín, coliflor. AOVE, sal, pimentón y comino. 200 °C, 35 min.",
      minutos:35, puesto:"horno",
      aviso:"Solo se congelan bien calabaza, boniato y pimiento; berenjena, calabacín y coliflor quedan blandas.",
      compra:[{n:"calabaza",c:"1 pequeña",p:"verdura"},{n:"boniato",c:"1",p:"verdura"},{n:"pimiento rojo",c:"2",p:"verdura"},{n:"cebolla roja",c:"1",p:"verdura"},{n:"berenjena",c:"1",p:"verdura"},{n:"calabacín",c:"1",p:"verdura"},{n:"coliflor",c:"1",p:"verdura"}] },

    { id:"B4", nombre:"Lentejas aliñadas", conserv:"nevera4", icono:"🫘", frio:true,
      rinde:"2–3 tarros ≈ 4 porciones",
      porciones:4,
      prep:"2–3 tarros de lenteja cocida, enjuagadas. Aliñar con AOVE, vinagre, sal, cebolla roja picada y perejil.",
      minutos:10, puesto:"mesa",
      compra:[{n:"tarro de lenteja cocida",c:"3",p:"tarros"},{n:"cebolla roja",c:"1",p:"verdura"},{n:"perejil",c:"1 manojo",p:"verdura"}] },

    { id:"B5", nombre:"Tofu crujiente al horno", conserv:"nevera4", icono:"🧈", frio:true,
      rinde:"2 bloques ≈ 5 porciones",
      porciones:5,
      prep:"2 bloques de tofu firme prensados y cortados en dados. 1 cda de soja + 1 cda de maicena. 210 °C, 25 min, dándoles la vuelta a la mitad.",
      minutos:25, puesto:"horno",
      aviso:"Congelado pierde el crujiente; solo aguanta dentro de salsa (T3).",
      compra:[{n:"tofu firme",c:"2 bloques",p:"proteina"},{n:"maicena",c:"",p:"despensa"},{n:"salsa de soja",c:"",p:"despensa"}] },

    { id:"B6", nombre:"Boloñesa de lentejas", conserv:"congela", icono:"🍝",
      rinde:"~1,2 kg = 3 porciones de 400 g (1 porción = 1 receta de 3 raciones)",
      porciones:3,
      prep:"300 g de sofrito (B1), 2 zanahorias picadas, 3 tarros de lenteja, orégano, vino tinto. 20 min. Parte de la mezcla, más densa, sirve para formar albóndigas (+ pan rallado + huevo, al horno 20 min).",
      minutos:20, puesto:"fuego", usa:[{id:"B1",porciones:3}],
      compra:[{n:"tarro de lenteja cocida",c:"3",p:"tarros"},{n:"zanahoria",c:"2",p:"verdura"},{n:"vino tinto",c:"",p:"despensa"},{n:"orégano",c:"",p:"despensa"}] },

    { id:"B7", nombre:"Huevos cocidos", conserv:"nevera5", icono:"🥚", frio:true,
      rinde:"6–8 huevos",
      porciones:7,
      prep:"6–8 huevos, 10 min de hervor, agua fría y pelarlos. Se añaden al tupper el mismo día si el plato ha estado congelado.",
      minutos:10, puesto:"fuego",
      aviso:"Nunca congelar: la clara queda gomosa. Se cuecen cada semana.",
      compra:[{n:"huevos",c:"media docena",p:"proteina"}] },

    { id:"B8", nombre:"Verduras en juliana para saltear", conserv:"congela", icono:"🥢",
      rinde:"bolsas de ~300 g = 1 porción por salteado",
      porciones:4,
      prep:"Pimiento, zanahoria, col, cebolleta, champiñón y judía verde en tiras finas. Se congelan crudas, extendidas en una bandeja 1 h y luego juntas en el tupper, para que no se peguen. Se saltean sin descongelar, a fuego fuerte.",
      minutos:20, puesto:"mesa",
      aviso:"Al congelarse pierden crujiente: solo valen para saltear o guisar, nunca para las ensaladas frías (T15, T20). El pepino y la zanahoria rallada de esas recetas se cortan el mismo día.",
      compra:[{n:"pimiento",c:"2",p:"verdura"},{n:"zanahoria",c:"3",p:"verdura"},{n:"col",c:"1/2",p:"verdura"},{n:"cebolleta",c:"2",p:"verdura"},{n:"champiñón",c:"250 g",p:"verdura"},{n:"judía verde",c:"200 g",p:"verdura"}] },

    { id:"B9", nombre:"Soja texturizada hidratada", conserv:"congela", icono:"🌾",
      rinde:"~700 g = 2–3 porciones",
      porciones:3,
      prep:"Fina (para boloñesas y rellenos) o gruesa (para guisos y salteados). 250 g de soja seca hidratada 10 min en caldo de verduras caliente con soja, pimentón y ajo. Escurrir bien apretando y dorar en la sartén antes de usar: así pierde el sabor a legumbre seca. La fina está lista en 5–10 min; la gruesa necesita 15–20 min, o un hervor de 5 min si los trozos son muy grandes.",
      minutos:20, puesto:"fuego",
      aviso:"Muy buena fuente de proteína y muy barata. En Mercadona suele estar en la zona de dietética; Carrefour y Consum tienen también la gruesa. Hidratada se congela sin problema; seca dura años.",
      compra:[{n:"soja texturizada",c:"250 g",p:"despensa"},{n:"caldo de verduras",c:"1 l",p:"despensa"}] }
  ],

  salsas: [
    { id:"S1", nombre:"Tahini-limón", receta:"3 cda de tahini, 1 limón, 1 ajo, agua, sal", conserv:"nevera7", recetas:["T5","T25","F7"],
      compra:[{n:"tahini",c:"",p:"despensa"},{n:"limón",c:"1",p:"verdura"}] },
    { id:"S2", nombre:"Yogur-hierbas", receta:"yogur griego, eneldo o menta, limón, ajo", conserv:"nevera4", aviso:"No congelar: se corta.", recetas:["T2","T14","T25","F6"],
      compra:[{n:"yogur griego",c:"1",p:"proteina"},{n:"menta o eneldo",c:"",p:"verdura"}] },
    { id:"S3", nombre:"Cacahuete", receta:"crema de cacahuete, soja, lima, jengibre, sirope", conserv:"nevera7", recetas:["T8","T15","T20","F10","F15"],
      compra:[{n:"crema de cacahuete",c:"",p:"despensa"},{n:"lima",c:"1",p:"verdura"}] },
    { id:"S4", nombre:"Romesco", receta:"pimiento asado, tomate, almendra, ajo, pan, vinagre", conserv:"nevera7", recetas:["T13","T6"],
      compra:[{n:"almendra",c:"100 g",p:"despensa"},{n:"pimiento asado",c:"1 bote",p:"tarros"}] },
    { id:"S5", nombre:"Pesto", receta:"albahaca, parmesano, nueces, AOVE", conserv:"congela", recetas:["T7","T19","F5","F17"],
      compra:[{n:"albahaca",c:"1 maceta",p:"verdura"},{n:"parmesano",c:"",p:"proteina"},{n:"nueces",c:"100 g",p:"despensa"}] },
    { id:"S6", nombre:"Vinagreta de mostaza", receta:"AOVE, vinagre de Jerez, mostaza, miel", conserv:"nevera14", recetas:["T4"],
      compra:[{n:"mostaza",c:"",p:"despensa"},{n:"vinagre de Jerez",c:"",p:"despensa"}] }
  ],

  recetas: [
    /* ---------- TUPPERS: 3 raciones ---------- */
    { id:"T1", nombre:"Lentejas estofadas", tipo:"tupper", raciones:3, minutos:20, calentar:true, congela:true,
      bases:[{id:"B1",porciones:1}], salsas:[],
      fresco:[{n:"tarro de lenteja cocida",c:"2",p:"tarros"},{n:"zanahoria",c:"1",p:"verdura"},{n:"patata",c:"1",p:"verdura"},{n:"pimentón",c:"",p:"despensa"},{n:"laurel",c:"",p:"despensa"}],
      alDia:["1 huevo cocido por ración (B7)"],
      pasos:"2 tarros de lenteja + 100 g de sofrito (B1) + 1 zanahoria + 1 patata en dados pequeños (así aguanta mejor el congelado; si no, queda harinosa) + pimentón + laurel + agua hasta cubrir. 20 min.",
      nota:"El huevo no se congela: se añade el mismo día." },

    { id:"T2", nombre:"Dal de lentejas rojas y espinacas", tipo:"tupper", raciones:3, minutos:25, calentar:true, congela:true,
      bases:[{id:"B2",porciones:1}], salsas:["S2"],
      fresco:[{n:"lenteja roja seca",c:"180 g",p:"despensa"},{n:"espinaca",c:"120 g",p:"verdura"},{n:"leche de coco",c:"250 ml",p:"despensa"}],
      alDia:["el yogur, al servir"],
      pasos:"150 g de base de curry (B2) + 180 g de lenteja roja seca (se hace en 15 min, sin remojo ni olla) + 250 ml de coco + 400 ml de agua. 15 min. Añadir 120 g de espinaca. Complemento opcional: 2 cda de arroz.",
      nota:"El yogur nunca congelado." },

    { id:"T3", nombre:"Curry de tofu y coliflor", tipo:"tupper", raciones:3, minutos:20, calentar:true, congela:true,
      bases:[{id:"B2",porciones:1},{id:"B5",porciones:1},{id:"B8",porciones:1}], salsas:[],
      fresco:[{n:"coliflor",c:"3/4",p:"verdura"},{n:"leche de coco",c:"150 ml",p:"despensa"}],
      pasos:"200 g de B2 + 150 ml de coco + ¾ de coliflor en ramitos, 12 min. Añadir el tofu crujiente (B5) al final.",
      nota:"Congelado, el tofu deja de estar crujiente pero aguanta bien dentro de la salsa." },

    { id:"T4", nombre:"Ensalada de lentejas, huevo y queso fresco", tipo:"tupper", raciones:3, minutos:10, frio:true, congela:false,
      bases:[{id:"B4",porciones:1},{id:"B7",porciones:3}], salsas:["S6"],
      fresco:[{n:"queso fresco",c:"200 g",p:"proteina"},{n:"pimiento asado",c:"1 bote",p:"tarros"},{n:"pepinillos",c:"1 bote",p:"tarros"},{n:"nueces",c:"",p:"despensa"}],
      alDia:["la vinagreta, en bote aparte"],
      pasos:"Lentejas aliñadas (B4) + 3 huevos cocidos (B7) + queso fresco en dados + pimiento asado + pepinillos + nueces. Vinagreta de mostaza aparte.",
      nota:"No se congela (huevo y queso fresco)." },

    { id:"T5", nombre:"Ensalada templada de lentejas y verduras asadas", tipo:"tupper", raciones:3, minutos:10, frio:true, congela:false,
      bases:[{id:"B3",porciones:1},{id:"B4",porciones:1}], salsas:["S1"],
      fresco:[{n:"feta",c:"150 g",p:"proteina"},{n:"nueces",c:"",p:"despensa"}],
      alDia:["salsa tahini aparte"],
      pasos:"B4 + verduras asadas (B3) + 150 g de feta + nueces. Salsa tahini aparte.",
      nota:"No se congela." },

    { id:"T6", nombre:"Tortilla de horno de verduras", tipo:"tupper", raciones:3, minutos:40, frio:true, congela:true,
      bases:[{id:"B3",porciones:1}], salsas:["S4"],
      fresco:[{n:"huevos",c:"6",p:"proteina"},{n:"queso rallado",c:"80 g",p:"proteina"}],
      pasos:"6 huevos + 200 g de B3 + 80 g de queso. Molde de 20×25, 180 °C, 25–30 min. Acompañar con tomate o un poco de romesco.",
      nota:"Se congela en porciones, aunque al descongelar suelta algo de agua: escurrir y calentar destapada." },

    { id:"T7", nombre:"Quiche sin masa de puerro y queso", tipo:"tupper", raciones:3, minutos:50, frio:true, congela:true,
      bases:[{id:"B3",porciones:1}], salsas:["S5"],
      fresco:[{n:"puerro",c:"2",p:"verdura"},{n:"huevos",c:"5",p:"proteina"},{n:"nata o leche",c:"150 ml",p:"proteina"},{n:"queso emmental o de cabra",c:"80 g",p:"proteina"}],
      pasos:"2 puerros pochados + 120 g de B3 + 5 huevos + 150 ml de nata o leche + 80 g de queso. 180 °C, 35 min. Pesto al servir.",
      nota:"Se congela en porciones, con el mismo aviso del agua que T6." },

    { id:"T8", nombre:"Tofu crujiente, brócoli y cacahuete", tipo:"tupper", raciones:3, minutos:15, calentar:true, frio:true, congela:false,
      bases:[{id:"B5",porciones:1}], salsas:["S3"],
      fresco:[{n:"brócoli",c:"1",p:"verdura"},{n:"sésamo",c:"",p:"despensa"}],
      alDia:["salsa de cacahuete aparte"],
      pasos:"Tofu (B5) + 1 brócoli al horno o al vapor, 8 min. Salsa de cacahuete aparte y sésamo por encima. Opcional: 3 cda de arroz.",
      nota:"No congelar: el tofu pierde todo el crujiente y el brócoli queda blando." },

    { id:"T9", nombre:"Pisto con huevo", tipo:"tupper", raciones:3, minutos:35, calentar:true, congela:true,
      bases:[{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"calabacín",c:"1",p:"verdura"},{n:"berenjena",c:"1",p:"verdura"},{n:"huevos",c:"3",p:"proteina"}],
      alDia:["el huevo, cocido, poché o frito"],
      pasos:"200 g de B1 + calabacín y berenjena en dados, 25 min.",
      nota:"El pisto sí se congela; el huevo, no: se añade el mismo día." },

    { id:"T10", nombre:"Crema de calabaza y lenteja roja", tipo:"tupper", raciones:3, minutos:25, calentar:true, congela:true,
      bases:[{id:"B3",porciones:2}], salsas:[],
      fresco:[{n:"puerro",c:"1",p:"verdura"},{n:"lenteja roja seca",c:"100 g",p:"despensa"},{n:"caldo de verduras",c:"700 ml",p:"despensa"},{n:"pipas",c:"",p:"despensa"}],
      alDia:["feta, pipas y yogur por encima"],
      pasos:"400 g de calabaza asada (B3) + 1 puerro + 100 g de lenteja roja + 700 ml de caldo. 15 min y triturar.",
      nota:"El feta, las pipas y el yogur van al servir, no al congelar." },

    { id:"T11", nombre:"Berenjenas rellenas de boloñesa de lentejas", tipo:"tupper", raciones:3, minutos:45, calentar:true, congela:true,
      bases:[{id:"B6",porciones:1}], salsas:[],
      fresco:[{n:"berenjena",c:"2",p:"verdura"},{n:"queso rallado",c:"100 g",p:"proteina"}],
      pasos:"3 medias berenjenas asadas 25 min. Vaciarlas, mezclar la pulpa con la boloñesa (B6), rellenar y gratinar con queso.",
      nota:"Se congelan ya gratinadas." },

    { id:"T12", nombre:"Albóndigas de lentejas en salsa", tipo:"tupper", raciones:3, minutos:40, calentar:true, congela:true,
      bases:[{id:"B1",porciones:2},{id:"B6",porciones:1}], salsas:[],
      fresco:[{n:"calabacín",c:"1",p:"verdura"},{n:"pan rallado",c:"",p:"despensa"},{n:"huevos",c:"1",p:"proteina"}],
      pasos:"Albóndigas (B6, al horno) + 200 g de B1 + calabacín en dados, 10 min.",
      nota:"Congelar ya en salsa." },

    { id:"T13", nombre:"Seitán con verduras asadas y romesco", tipo:"tupper", raciones:3, minutos:10, calentar:true, frio:true, congela:false,
      bases:[{id:"B3",porciones:1},{id:"B8",porciones:1}], salsas:["S4"],
      fresco:[{n:"seitán",c:"2 paquetes",p:"proteina"}],
      pasos:"2 paquetes de seitán en tiras, dorado 5 min con ajo + B3. Romesco aparte.",
      nota:"Mejor no congelar: las verduras asadas acuosas quedan blandas." },

    { id:"T14", nombre:"Hamburguesas de lentejas + ensalada", tipo:"tupper", raciones:3, minutos:40, frio:true, congela:true,
      bases:[{id:"B4",porciones:1}], salsas:["S2"],
      fresco:[{n:"tarro de lenteja cocida",c:"2",p:"tarros"},{n:"huevos",c:"1",p:"proteina"},{n:"pan rallado",c:"50 g",p:"despensa"},{n:"cebolla",c:"1",p:"verdura"},{n:"comino",c:"",p:"despensa"}],
      alDia:["la salsa de yogur, recién hecha"],
      pasos:"6 unidades (2 por ración). 2 tarros de lenteja escurrida (sin aliñar) + 1 huevo + 50 g de pan rallado + cebolla pochada + comino + pimentón. Formar y hornear a 200 °C, 20 min. Congelar separadas con papel.",
      nota:"La salsa de yogur congelada se corta." },

    { id:"T15", nombre:"Ensalada de lentejas y tofu marinado", tipo:"tupper", raciones:3, minutos:10, frio:true, congela:false,
      bases:[{id:"B4",porciones:1},{id:"B5",porciones:1}], salsas:["S3"],
      fresco:[{n:"pepino",c:"1",p:"verdura"},{n:"zanahoria",c:"2",p:"verdura"},{n:"cebolleta",c:"1",p:"verdura"},{n:"cacahuete",c:"",p:"despensa"}],
      alDia:["pepino, zanahoria rallada y cebolleta, cortados el mismo día","salsa de cacahuete aparte"],
      pasos:"B4 + tofu (B5) + pepino, zanahoria rallada y cebolleta.",
      nota:"No se congela: los crudos no valen congelados." },

    { id:"T16", nombre:"Curry de huevo y patata", tipo:"tupper", raciones:3, minutos:25, calentar:true, congela:false,
      bases:[{id:"B2",porciones:1},{id:"B7",porciones:6}], salsas:[],
      fresco:[{n:"patata",c:"2",p:"verdura"},{n:"leche de coco",c:"150 ml",p:"despensa"}],
      pasos:"200 g de B2 + 2 patatas en dados + 150 ml de coco, 15 min. Añadir 2 huevos cocidos por ración partidos por la mitad.",
      nota:"No se congela: el huevo se vuelve gomoso y la patata, harinosa. Se come en la misma semana." },

    { id:"T17", nombre:"Lasaña de calabacín y boloñesa", tipo:"tupper", raciones:3, minutos:50, calentar:true, congela:true,
      bases:[{id:"B6",porciones:1}], salsas:[],
      fresco:[{n:"calabacín",c:"2",p:"verdura"},{n:"leche",c:"500 ml",p:"proteina"},{n:"queso rallado",c:"100 g",p:"proteina"}],
      pasos:"2 calabacines en láminas finas (asados 10 min, para que suelten agua) en capas alternas con boloñesa (B6) + bechamel + queso. 190 °C, 30 min.",
      nota:"Congelar en porciones." },

    { id:"T18", nombre:"Pasta al horno con boloñesa", tipo:"tupper", raciones:3, minutos:40, calentar:true, congela:true,
      bases:[{id:"B6",porciones:1}], salsas:[],
      fresco:[{n:"pasta corta",c:"250 g",p:"despensa"},{n:"leche",c:"500 ml",p:"proteina"},{n:"queso rallado",c:"100 g",p:"proteina"}],
      pasos:"250 g de pasta corta cocida al dente + 1 porción de boloñesa (B6) + bechamel ligera + queso rallado. 190 °C, 25 min.",
      nota:"Congela bien ya montada, en porciones." },

    { id:"T19", nombre:"Ensalada de pasta con pesto y mozzarella", tipo:"tupper", raciones:3, minutos:15, frio:true, congela:false,
      bases:[{id:"B3",porciones:1}], salsas:["S5"],
      fresco:[{n:"pasta corta",c:"250 g",p:"despensa"},{n:"mozzarella mini o feta",c:"150 g",p:"proteina"},{n:"tomate cherry",c:"250 g",p:"verdura"},{n:"piñones",c:"",p:"despensa"}],
      pasos:"250 g de pasta corta al dente, enfriada con un chorro de aceite + 2 cda de pesto + mozzarella mini o feta + tomate cherry + verduras asadas (B3) + piñones.",
      nota:"El pesto, mejor aparte si se hace con días de antelación." },

    { id:"T20", nombre:"Fideos fríos asiáticos con tofu", tipo:"tupper", raciones:3, minutos:15, frio:true, congela:false,
      bases:[{id:"B5",porciones:1}], salsas:["S3"],
      fresco:[{n:"fideos de arroz",c:"200 g",p:"despensa"},{n:"pepino",c:"1",p:"verdura"},{n:"zanahoria",c:"2",p:"verdura"},{n:"col",c:"1/4",p:"verdura"},{n:"cebolleta",c:"1",p:"verdura"},{n:"cacahuete",c:"",p:"despensa"}],
      alDia:["pepino, zanahoria y col en juliana","salsa en bote aparte"],
      pasos:"200 g de fideos de arroz (3 min en agua caliente) + tofu (B5) + pepino, zanahoria y col en juliana + cebolleta y cacahuete picado.",
      nota:"No se calienta y no se apelmaza." },

    { id:"T21", nombre:"Yakisoba de verduras y huevo", tipo:"tupper", raciones:3, minutos:20, calentar:true, congela:false,
      bases:[{id:"B8",porciones:1}], salsas:[],
      fresco:[{n:"fideos yakisoba o udon",c:"3",p:"despensa"},{n:"huevos",c:"3",p:"proteina"},{n:"salsa de soja",c:"",p:"despensa"},{n:"mirin o vinagre de arroz",c:"",p:"despensa"}],
      pasos:"Fideos yakisoba o udon + col, zanahoria, pimiento y champiñón salteados fuerte + salsa (soja, mirin o vinagre de arroz, un poco de azúcar y ketchup) + 1 huevo revuelto o a la plancha por ración.",
      nota:"Se come recalentado; dejar los fideos algo duros." },

    { id:"T22", nombre:"Arroz salteado con huevo y verduras", tipo:"tupper", raciones:3, minutos:15, calentar:true, congela:false,
      bases:[{id:"B8",porciones:1}], salsas:[],
      fresco:[{n:"arroz",c:"250 g",p:"despensa"},{n:"huevos",c:"2",p:"proteina"},{n:"guisantes y maíz",c:"1 bote",p:"tarros"},{n:"jengibre",c:"1 trozo",p:"verdura"}],
      pasos:"Arroz cocido del día anterior y frío (suelta mejor) + ajo y jengibre + zanahoria, cebolleta, guisantes y maíz (como acompañamiento, no como base) + 2 huevos revueltos + soja y sésamo. Opcional: dados de tofu (B5).",
      nota:"El arroz tiene que ser del día antes." },

    { id:"T23", nombre:"Arroz al horno con verduras y queso", tipo:"tupper", raciones:3, minutos:45, calentar:true, congela:false,
      bases:[{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"arroz",c:"250 g",p:"despensa"},{n:"caldo de verduras",c:"500 ml",p:"despensa"},{n:"calabaza",c:"1/2",p:"verdura"},{n:"pimiento",c:"1",p:"verdura"},{n:"queso rallado",c:"80 g",p:"proteina"}],
      pasos:"250 g de arroz + 500 ml de caldo + 200 g de sofrito (B1) o verduras asadas (B3) + calabaza y pimiento en dados. 190 °C, 35 min tapado y 5 destapado, con queso por encima.",
      nota:"Aguanta 4 días y se recalienta bien con un chorrito de agua." },

    { id:"T24", nombre:"Pasta de lenteja roja con tomate y feta", tipo:"tupper", raciones:3, minutos:15, calentar:true, frio:true, congela:false,
      bases:[{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"pasta de lenteja roja",c:"250 g",p:"despensa"},{n:"tomate cherry",c:"250 g",p:"verdura"},{n:"feta",c:"150 g",p:"proteina"},{n:"albahaca",c:"",p:"verdura"}],
      pasos:"250 g de pasta de lenteja roja (sacarla 1–2 min antes de lo que diga el paquete; se pasa rápido) + 200 g de sofrito (B1) + tomate cherry asado + feta desmenuzado + albahaca.",
      nota:"Vale caliente o en frío como ensalada." },

    { id:"T25", nombre:"Cuscús templado con verduras asadas y halloumi", tipo:"tupper", raciones:3, minutos:15, frio:true, congela:false,
      bases:[{id:"B3",porciones:1}], salsas:["S1","S2"],
      fresco:[{n:"cuscús",c:"200 g",p:"despensa"},{n:"halloumi o queso de cabra",c:"250 g",p:"proteina"},{n:"pasas",c:"",p:"despensa"},{n:"almendra",c:"",p:"despensa"},{n:"limón",c:"1",p:"verdura"},{n:"menta",c:"",p:"verdura"}],
      alDia:["salsa de yogur o tahini aparte"],
      pasos:"200 g de cuscús hidratado con caldo caliente, 5 min + verduras asadas (B3) + halloumi o queso de cabra a la plancha + pasas, almendra, limón y menta." },

    { id:"T26", nombre:"Ragú de soja texturizada", tipo:"tupper", raciones:3, minutos:25, calentar:true, congela:true,
      bases:[{id:"B9",porciones:1},{id:"B1",porciones:3}], salsas:[],
      fresco:[{n:"zanahoria",c:"2",p:"verdura"},{n:"pasta o polenta",c:"250 g",p:"despensa"},{n:"parmesano",c:"",p:"proteina"},{n:"vino tinto",c:"",p:"despensa"}],
      pasos:"1 porción de soja fina hidratada y dorada (B9) + 300 g de sofrito (B1) + zanahoria picada + orégano y vino tinto, 20 min. Con pasta, polenta o calabacín asado, y parmesano por encima.",
      nota:"Congela igual de bien que la boloñesa." },

    { id:"T27", nombre:"Pimientos rellenos de soja y arroz", tipo:"tupper", raciones:3, minutos:50, calentar:true, congela:true,
      bases:[{id:"B9",porciones:1},{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"pimiento grande",c:"3",p:"verdura"},{n:"arroz",c:"150 g",p:"despensa"},{n:"queso rallado",c:"80 g",p:"proteina"},{n:"comino",c:"",p:"despensa"}],
      pasos:"3 pimientos grandes partidos + relleno de soja fina (B9) + 150 g de sofrito (B1) + 150 g de arroz cocido + comino. Gratinar con queso, 190 °C, 30 min." },

    { id:"T28", nombre:"Salteado asiático de soja texturizada", tipo:"tupper", raciones:3, minutos:15, calentar:true, congela:false,
      bases:[{id:"B9",porciones:1},{id:"B8",porciones:1}], salsas:[],
      fresco:[{n:"jengibre",c:"1 trozo",p:"verdura"},{n:"sésamo",c:"",p:"despensa"},{n:"arroz o fideos",c:"250 g",p:"despensa"}],
      pasos:"Soja gruesa hidratada y bien dorada (B9) + 1 porción de verduras en juliana congeladas (B8), salteadas a fuego fuerte sin descongelar + jengibre, ajo, soja, sésamo y un toque de sirope. Con arroz o fideos." },

    { id:"T29", nombre:"Guiso de soja texturizada y patata", tipo:"tupper", raciones:3, minutos:30, calentar:true, congela:true,
      bases:[{id:"B9",porciones:1},{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"patata",c:"3",p:"verdura"},{n:"zanahoria",c:"2",p:"verdura"},{n:"pimentón",c:"",p:"despensa"},{n:"caldo de verduras",c:"500 ml",p:"despensa"}],
      pasos:"Soja gruesa (B9) + 200 g de sofrito (B1) + patata y zanahoria en dados + pimentón, laurel y caldo, 20 min.",
      nota:"El guiso de cuchara más barato del recetario. La patata, en dados pequeños, para que aguante mejor el congelado." },

    /* ---------- FINDE: 2 raciones salvo nota ---------- */
    { id:"F1", nombre:"Shakshuka con feta", tipo:"finde", raciones:2, minutos:20, calentar:true,
      bases:[{id:"B1",porciones:3}], salsas:[],
      fresco:[{n:"huevos",c:"4",p:"proteina"},{n:"feta",c:"100 g",p:"proteina"},{n:"pan",c:"1",p:"despensa"},{n:"comino",c:"",p:"despensa"}],
      pasos:"300 g de B1 + comino y pimentón. Hacer 4 huecos, poner los huevos, tapar y dejar 7 min. Feta y pan." },

    { id:"F2", nombre:"Pizza con verduras asadas", tipo:"finde", raciones:2, minutos:15, calentar:true,
      bases:[{id:"B3",porciones:1}], salsas:[],
      fresco:[{n:"masa de pizza fresca",c:"1",p:"despensa"},{n:"tomate frito",c:"",p:"despensa"},{n:"mozzarella",c:"1",p:"proteina"}],
      pasos:"Masa fresca + tomate + mozzarella + B3. 250 °C, 10–12 min." },

    { id:"F3", nombre:"Pasta con boloñesa de lentejas", tipo:"finde", raciones:2, minutos:15, calentar:true,
      bases:[{id:"B6",porciones:1}], salsas:[],
      fresco:[{n:"pasta",c:"200 g",p:"despensa"},{n:"parmesano",c:"",p:"proteina"}],
      pasos:"1 ración de B6 descongelada por persona + pasta + parmesano. 15 min." },

    { id:"F4", nombre:"Berenjenas a la parmesana", tipo:"finde", raciones:3, minutos:45, calentar:true,
      bases:[{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"berenjena",c:"2",p:"verdura"},{n:"mozzarella",c:"1",p:"proteina"},{n:"parmesano",c:"",p:"proteina"}],
      pasos:"2 berenjenas en láminas asadas, en capas con B1, mozzarella y parmesano. 190 °C, 30 min.",
      nota:"Lo que sobre vale para el tupper del lunes." },

    { id:"F5", nombre:"Risotto de setas (o al pesto)", tipo:"finde", raciones:2, minutos:25, calentar:true,
      bases:[], salsas:["S5"],
      fresco:[{n:"arroz arborio",c:"160 g",p:"despensa"},{n:"setas",c:"250 g",p:"verdura"},{n:"cebolla",c:"1",p:"verdura"},{n:"vino blanco",c:"",p:"despensa"},{n:"parmesano",c:"",p:"proteina"},{n:"mantequilla",c:"",p:"proteina"}],
      pasos:"160 g de arroz + 250 g de setas + cebolla + vino + caldo caliente, 18 min. Terminar con parmesano, mantequilla y una cda de pesto." },

    { id:"F6", nombre:"Curry de garbanzos y boniato", tipo:"finde", raciones:3, minutos:20, calentar:true,
      bases:[{id:"B2",porciones:1}], salsas:["S2"],
      fresco:[{n:"tarro de garbanzo",c:"1",p:"tarros"},{n:"boniato",c:"1",p:"verdura"},{n:"leche de coco",c:"250 ml",p:"despensa"},{n:"espinaca",c:"100 g",p:"verdura"}],
      pasos:"250 g de B2 + boniato en dados + coco, 15 min. + 1 tarro de garbanzo + espinacas. Yogur." },

    { id:"F7", nombre:"Bowl de hummus y verduras asadas", tipo:"finde", raciones:2, minutos:15, frio:true,
      bases:[{id:"B3",porciones:1}], salsas:["S1"],
      fresco:[{n:"hummus",c:"1 bote",p:"tarros"},{n:"pan de pita",c:"2",p:"despensa"},{n:"huevos",c:"2",p:"proteina"}],
      pasos:"Hummus (bote o casero con garbanzo de bote) + B3 + huevo + tahini + pita tostada." },

    { id:"F8", nombre:"Chili de alubias", tipo:"finde", raciones:3, minutos:25, calentar:true,
      bases:[{id:"B1",porciones:3}], salsas:[],
      fresco:[{n:"tarro de alubia roja",c:"1",p:"tarros"},{n:"maíz",c:"1 bote",p:"tarros"},{n:"chipotle",c:"",p:"despensa"},{n:"aguacate",c:"1",p:"verdura"},{n:"yogur griego",c:"1",p:"proteina"}],
      pasos:"300 g de B1 + comino, pimentón ahumado y chipotle + 1 tarro de alubia roja + maíz, 20 min. Yogur, queso y aguacate." },

    { id:"F9", nombre:"Alubias blancas con verduras", tipo:"finde", raciones:2, minutos:20, calentar:true,
      bases:[{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"tarro de alubia blanca",c:"1",p:"tarros"},{n:"espinaca",c:"100 g",p:"verdura"},{n:"caldo de verduras",c:"300 ml",p:"despensa"}],
      pasos:"200 g de B1 + pimentón + 1 tarro de alubia + caldo + espinacas, 15 min." },

    { id:"F10", nombre:"Wok de fideos con tofu", tipo:"finde", raciones:2, minutos:20, calentar:true,
      bases:[{id:"B5",porciones:1},{id:"B8",porciones:1}], salsas:["S3"],
      fresco:[{n:"fideos de arroz",c:"150 g",p:"despensa"}],
      pasos:"Fideos de arroz + tofu (B5) + pimiento, zanahoria y col salteados + salsa de cacahuete." },

    { id:"F11", nombre:"Tortilla de patatas", tipo:"finde", raciones:2, minutos:40, frio:true,
      bases:[], salsas:[],
      fresco:[{n:"patata",c:"4",p:"verdura"},{n:"huevos",c:"6",p:"proteina"},{n:"cebolla",c:"1",p:"verdura"}],
      pasos:"La clásica.",
      nota:"Lo que sobre, al tupper del lunes (se come en frío)." },

    { id:"F12", nombre:"Huevos rotos con pimientos asados", tipo:"finde", raciones:2, minutos:30, calentar:true,
      bases:[{id:"B3",porciones:1}], salsas:[],
      fresco:[{n:"patata",c:"3",p:"verdura"},{n:"huevos",c:"4",p:"proteina"}],
      pasos:"Patatas al horno + pimientos asados (B3) + huevos fritos." },

    { id:"F13", nombre:"Pasta carbonara vegetariana", tipo:"finde", raciones:2, minutos:20, calentar:true,
      bases:[], salsas:[],
      fresco:[{n:"espaguetis",c:"200 g",p:"despensa"},{n:"huevos",c:"3",p:"proteina"},{n:"parmesano",c:"",p:"proteina"},{n:"setas o calabacín",c:"250 g",p:"verdura"}],
      pasos:"Setas o calabacín salteados + 2 yemas y 1 huevo + parmesano + pimienta, fuera del fuego y con agua de cocción." },

    { id:"F14", nombre:"Lasaña clásica de boloñesa de lentejas", tipo:"finde", raciones:4, minutos:50, calentar:true,
      bases:[{id:"B6",porciones:1}], salsas:[],
      fresco:[{n:"placas de lasaña",c:"1 paquete",p:"despensa"},{n:"leche",c:"500 ml",p:"proteina"},{n:"queso rallado",c:"100 g",p:"proteina"}],
      pasos:"1 porción de B6 + placas + bechamel + queso. 190 °C, 35 min." },

    { id:"F15", nombre:"Pad thai de tofu y huevo", tipo:"finde", raciones:2, minutos:25, calentar:true,
      bases:[{id:"B5",porciones:1},{id:"B8",porciones:1}], salsas:["S3"],
      fresco:[{n:"fideos de arroz",c:"150 g",p:"despensa"},{n:"pasta de tamarindo",c:"",p:"despensa"},{n:"huevos",c:"2",p:"proteina"},{n:"cacahuete",c:"",p:"despensa"},{n:"lima",c:"1",p:"verdura"},{n:"brotes de soja",c:"",p:"verdura"}],
      pasos:"Fideos de arroz + tofu (B5) + huevo + salsa de tamarindo, soja y azúcar + brotes, cacahuete y lima." },

    { id:"F16", nombre:"Ramen vegetariano con huevo marinado", tipo:"finde", raciones:2, minutos:30, calentar:true,
      bases:[], salsas:[],
      fresco:[{n:"fideos ramen",c:"2",p:"despensa"},{n:"miso",c:"",p:"despensa"},{n:"setas",c:"200 g",p:"verdura"},{n:"maíz",c:"1 bote",p:"tarros"},{n:"col",c:"1/4",p:"verdura"},{n:"huevos",c:"2",p:"proteina"}],
      pasos:"Caldo de verduras con miso, jengibre y soja + setas salteadas + maíz y col + huevo cocido 6,5 min y marinado en soja." },

    { id:"F17", nombre:"Gnocchi al pesto con verduras", tipo:"finde", raciones:2, minutos:15, calentar:true,
      bases:[{id:"B3",porciones:1}], salsas:["S5"],
      fresco:[{n:"gnocchi de patata",c:"400 g",p:"despensa"},{n:"parmesano",c:"",p:"proteina"}],
      pasos:"Gnocchi hervidos + pesto + verduras asadas (B3) + parmesano." },

    { id:"F18", nombre:"Paella de verduras", tipo:"finde", raciones:4, minutos:40, calentar:true,
      bases:[{id:"B1",porciones:2}], salsas:[],
      fresco:[{n:"arroz bomba",c:"320 g",p:"despensa"},{n:"alcachofa",c:"4",p:"verdura"},{n:"judía verde",c:"200 g",p:"verdura"},{n:"pimiento",c:"1",p:"verdura"},{n:"azafrán",c:"",p:"despensa"}],
      pasos:"B1 + arroz bomba + alcachofa, judía verde, pimiento y azafrán. Caldo caliente, 18 min, y reposo." },

    { id:"F19", nombre:"Tacos de soja texturizada", tipo:"finde", raciones:2, minutos:20, calentar:true,
      bases:[{id:"B9",porciones:1}], salsas:[],
      fresco:[{n:"tortillas de maíz",c:"6",p:"despensa"},{n:"aguacate",c:"1",p:"verdura"},{n:"cebolla roja",c:"1",p:"verdura"},{n:"lima",c:"1",p:"verdura"},{n:"cilantro",c:"",p:"verdura"},{n:"chipotle",c:"",p:"despensa"}],
      pasos:"Soja fina (B9) dorada con comino, pimentón ahumado y chipotle + tortillas de maíz + aguacate, cebolla roja encurtida, cilantro, lima y yogur o queso fresco." }
  ]
};
