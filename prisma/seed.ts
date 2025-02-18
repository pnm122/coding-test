import { Animal, ColorEnum, PrismaClient, Sale, PetTypeEnum, ToyTypeEnum, ToySize } from '@prisma/client'

const attributes = [
  'Good with kids',
  'Friendly',
  'Energetic',
  'Good with other pets',
  'Likes meeting new people',
  'Active',
  'Affectionate',
  'Clean',
  'Brightly colored'
] as const

const typeAttributeMap: { [key in PetTypeEnum]: (typeof attributes[number][]) } = {
  Cat: ['Active', 'Affectionate', 'Clean', 'Energetic', 'Friendly', 'Good with kids', 'Good with other pets', 'Likes meeting new people'],
  Dog: ['Active', 'Affectionate', 'Clean', 'Energetic', 'Friendly', 'Good with kids', 'Good with other pets', 'Likes meeting new people'],
  Turtle: ['Active', 'Clean', 'Friendly', 'Good with kids', 'Good with other pets', 'Likes meeting new people'],
  Fish: ['Active', 'Clean', 'Good with other pets', 'Energetic', 'Brightly colored']
}

const petTypeIdMap: { [key in PetTypeEnum]: number } = {
  Cat: 0,
  Dog: 1,
  Turtle: 2,
  Fish: 3
}

const toyTypeIdMap: { [key in ToyTypeEnum]: number } = {
  Monkey: 0,
  Elephant: 1
}

const colorIdMap: { [key in ColorEnum]: number } = {
  Red: 0,
  Orange: 1,
  Green: 2,
  Blue: 3,
  Purple: 4,
  Brown: 5,
  Black: 6,
  Gray: 7,
  White: 8
}

const pets: (Omit<Animal, 'product'> & { type: PetTypeEnum, colors: ColorEnum[], sale?: Pick<Sale, 'date' | 'price'>, attributes: (typeof attributes[number])[] })[] = [{
  id: 1,
  name: 'Jasmine',
  type: 'Cat',
  weight: 8,
  attributes: ['Good with kids', 'Friendly', 'Energetic'],
  colors: ['Black', 'White', 'Brown']
}, {
  id: 2,
  name: 'Sherlock',
  type: 'Dog',
  weight: 65,
  attributes: ['Good with kids', 'Friendly', 'Active'],
  colors: ['Black', 'White'],
  sale: {
    date: new Date(),
    price: 50
  }
}, {
  id: 3,
  name: 'Linus',
  type: 'Cat',
  weight: 7,
  attributes: ['Good with other pets', 'Active'],
  colors: ['Orange', 'White'],
}, {
  id: 4,
  name: 'Ken',
  type: 'Fish',
  weight: 0.3,
  attributes: ['Active', 'Clean'],
  colors: ['Blue'],
}, {
  id: 5,
  name: 'Bruno',
  type: 'Dog',
  weight: 23.7,
  attributes: ['Energetic', 'Likes meeting new people'],
  colors: ['Gray', 'Black'],
}, {
  id: 6,
  name: 'Chloe',
  type: 'Dog',
  weight: 23,
  attributes: ['Clean', 'Friendly', 'Likes meeting new people'],
  colors: ['Black'],
}, {
  id: 7,
  name: 'Donatello',
  type: 'Turtle',
  weight: 3.8,
  attributes: ['Clean', 'Good with other pets'],
  colors: ['Gray', 'Green', 'Orange'],
}]

const toys: (Omit<Animal, 'product'> & { type: ToyTypeEnum, colors: ColorEnum[], sale?: Pick<Sale, 'date' | 'price'>, size: ToySize })[] = [{
  id: 101,
  name: 'Peanut',
  type: 'Monkey',
  weight: 1,
  colors: ['Purple'],
  size: 'Medium'
}, {
  id: 102,
  name: 'Dumbo',
  type: 'Elephant',
  weight: 1,
  colors: ['Gray'],
  size: 'Large'
}, {
  id: 103,
  name: 'Johnny',
  type: 'Monkey',
  weight: 1.5,
  colors: ['Brown', 'Black'],
  size: 'Large'
}, {
  id: 104,
  name: 'Kim',
  type: 'Elephant',
  weight: 0.7,
  colors: ['Green', 'Orange', 'Purple'],
  size: 'Large',
  sale: {
    date: new Date(),
    price: 15
  }
}, {
  id: 105,
  name: 'Chuckles',
  type: 'Monkey',
  weight: 0.5,
  colors: ['White', 'Red'],
  size: 'Small'
}, {
  id: 106,
  name: 'Elsie',
  type: 'Elephant',
  weight: 0.5,
  colors: ['Purple', 'Blue', 'Red'],
  size: 'Small'
}]

const prisma = new PrismaClient()

async function main() {
  await seedColors()
  await seedAttributes()
  await seedTypes()
  await seedTypeAttribute()
  await seedPets()
  await seedToys()
}

async function seedColors() {
  return Promise.allSettled(Object.entries(ColorEnum).map(([, color]) => 
    prisma.color.upsert({
      where: {
        id: colorIdMap[color]
      },
      update: {},
      create: {
        id: colorIdMap[color],
        color
      }
    })
  ))
}

async function seedAttributes() {
  return Promise.allSettled(
    attributes.map(attribute => (
      prisma.attribute.upsert({
        where: {
          attribute
        },
        update: {},
        create: {
          id: attributes.findIndex(a => a === attribute)!,
          attribute
        }
      })
    )
  ))
}

async function seedTypes() {
  return Promise.allSettled([
    ...Object.entries(PetTypeEnum).map(([, name]) => (
      prisma.petType.upsert({
        where: { name },
        update: {},
        create: { id: petTypeIdMap[name], name }
      })
    )),
    ...Object.entries(ToyTypeEnum).map(([, name]) => (
      prisma.toyType.upsert({
        where: { name },
        update: {},
        create: { id: toyTypeIdMap[name], name }
      })
    )),
  ])
}

async function seedTypeAttribute() {
  let id = 0

  return Promise.allSettled(
    Object.entries(typeAttributeMap).map(([type, attributes]) => (
      attributes.map((attribute) => {
        const nextId = id++

        return prisma.petType_Attribute.upsert({
          where: { id: nextId },
          update: {},
          create: {
            id: nextId,
            type_id: petTypeIdMap[type as PetTypeEnum],
            attribute_id: attributes.findIndex(a => a === attribute)!
          }
        })
      })
    )).flat()
  )
}

async function seedPets() {
  return Promise.allSettled(
    pets.map(pet => (
      prisma.animal.upsert({
        where: { id: pet.id },
        update: {},
        create: {
          id: pet.id,
          name: pet.name,
          weight: pet.weight,
          product: 'Pet',
          sale: pet.sale ? {
            connectOrCreate: {
              where: { id: pet.id },
              create: {
                id: pet.id,
                ...pet.sale
              }
            }
          } : undefined,
          colors: {
            connectOrCreate: pet.colors.map(color => ({
              where: { id: (pet.id * 100) + colorIdMap[color] },
              create: {
                id: (pet.id * 100) + colorIdMap[color],
                color_id: colorIdMap[color]
              }
            }))
          },
          pet: {
            connectOrCreate: {
              where: { id: pet.id },
              create: {
                type: {
                  connect: {
                    id: petTypeIdMap[pet.type]
                  }
                },
                attributes: {
                  connectOrCreate: pet.attributes.map((attribute, index) => ({
                    where: { id: (pet.id * 100) + index },
                    create: {
                      id: (pet.id * 100) + index,
                      attribute_id: attributes.findIndex(attr => attr === attribute)!
                    }
                  }))
                },
              }
            }
          }
        }
      })
    ))
  )
}

async function seedToys() {
  return Promise.allSettled(
    toys.map(toy => (
      prisma.animal.upsert({
        where: { id: toy.id },
        update: {},
        create: {
          id: toy.id,
          name: toy.name,
          weight: toy.weight,
          product: 'Toy',
          sale: toy.sale ? {
            connectOrCreate: {
              where: { id: toy.id },
              create: {
                id: toy.id,
                ...toy.sale
              }
            }
          } : undefined,
          colors: {
            connectOrCreate: toy.colors.map(color => ({
              where: { id: (toy.id * 100) + colorIdMap[color] },
              create: {
                id: (toy.id * 100) + colorIdMap[color],
                color_id: colorIdMap[color]
              }
            }))
          },
          toy: {
            connectOrCreate: {
              where: { id: toy.id },
              create: {
                type: {
                  connect: {
                    id: toyTypeIdMap[toy.type]
                  }
                },
                size: toy.size
              }
            }
          }
        }
      })
    ))
  )
}

main()
  .then(async () => {
    console.log('Seeded database.')
    const res = await prisma.animal.findMany({
    })
    console.log(JSON.stringify(res))
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })