// Armo las categorías con sus subcategorías dado que la api no las devuelve asi

export const CATEGORIES = [
  {
    id: 24,
    name: 'Periféricos',
    subcategories: [
      {id: 2, name: 'Mouses', image: 'Mouses-2.jpg'},
      {id: 8, name: 'Auriculares', image: 'auricular1.jpg'},
      {id: 39, name: 'Teclados', image: 'Teclados-2.jpg'}
    ]
  },
  {
    id: 6,
    name: 'Placas de Video',
    subcategories: [
      {id: 6, name: 'Placas de Video GeForce', image: 'Placas_Video_Nvidial_20220512.jpg'},
      {id: 62, name: 'Placas de Video Radeon AMD', image: 'Placas_de_Video_Radeon_AsRock_20220512_1424.jpg'}
    ]
  },
  {
    id: 5,
    name: 'Monitores y Pantallas',
    subcategories: [
      {id: 5, name: 'Monitores y Pantallas', image: 'monitores.jpg'}
    ]
  },
  {
    id: 7,
    name: 'Componentes de PC',
    subcategories: [
      {id: 26, name: 'Mothers AMD', image: 'Mothers_AMD-2.jpg'},
      {id: 27, name: 'Procesadores AMD', image: 'Procesadores_AMD-2.jpg'},
      {id: 48, name: 'Procesadores Intel', image: 'Procesadores_Intel-2.jpg'},
      {id: 49, name: 'Mothers Intel', image: 'Mothers_Intel_20220512.jpg'},
      {id: 34, name: 'Fuentes de alimentación', image: 'fuente.jpg'},
      {id: 35, name: 'Coolers Fan', image: 'coolers.jpg'},
      {id: 36, name: 'Coolers CPU', image: 'cpu_cooler.jpg'}
    ]
  },
  {
    id: 8,
    name: 'Almacenamiento',
    subcategories: [
      {id: 15, name: 'Memorias', image: 'ram4.jpeg'},
      {id: 16, name: 'Discos Externos', image: 'discos portables.jpg'},
      {id: 19, name: 'Discos Rígidos', image: 'discos.jpg'}
    ]
  },
  {
    id: 58,
    name: 'Notebooks',
    subcategories: [
      {id: 58, name: 'Notebooks', image: 'laptop.jpg'}
    ]
  },
];
