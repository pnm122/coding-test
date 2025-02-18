import { prisma } from "@/prisma";
import { SEARCH_PARAM_ATTRIBUTE, SEARCH_PARAM_COLOR, SEARCH_PARAM_SEARCH, SEARCH_PARAM_TYPE, SEARCH_PARAM_WEIGHT_MAX, SEARCH_PARAM_WEIGHT_MIN, ValidSearchParams } from "../searchParams";
import { ColorEnum, PetTypeEnum, ToyTypeEnum } from "@prisma/client";

export const getAnimalsSelect = {
  select: {
    id: true,
    name: true,
    weight: true,
    colors: {
      select: {
        color: {
          select: {
            color: true,
            id: true
          }
        }
      }
    },
    product: true,
    sale: true,
    pet: {
      select: {
        attributes: {
          select: {
            attribute: {
              select: {
                attribute: true,
                id: true
              }
            }
          }
        },
        type: true
      }
    },
    toy: {
      select: {
        type: true,
        size: true
      }
    }
  }
}

export async function getPets(
  filters: ValidSearchParams<'Pet'>
) {
  try {
    const res = await prisma.animal.findMany({
      where: {
        name: {
          contains: filters[SEARCH_PARAM_SEARCH],
          mode: 'insensitive'
        },
        colors: {
          some: {
            color: {
              color: {
                in: filters[SEARCH_PARAM_COLOR].length === 0 ? Object.values(ColorEnum) : filters[SEARCH_PARAM_COLOR] as ColorEnum[]
              }
            }
          }
        },
        weight: {
          gte: filters[SEARCH_PARAM_WEIGHT_MIN],
          lte: filters[SEARCH_PARAM_WEIGHT_MAX]
        },
        product: 'Pet',
        pet: {
          type: {
            name: {
              in: filters[SEARCH_PARAM_TYPE].length === 0 ? Object.values(PetTypeEnum) : filters[SEARCH_PARAM_TYPE] as PetTypeEnum[]
            },
          },
          ...(
              filters[SEARCH_PARAM_ATTRIBUTE].length === 0 ? {} : {
                attributes: {
                  some: {
                    attribute: {
                      attribute: {
                        in: filters[SEARCH_PARAM_ATTRIBUTE],
                      }
                    }
                  }
                }
              }
            )
        }
      },
      ...getAnimalsSelect
    })

    return res
  } catch {
    return []
  }
}

export async function getToys(
  filters: ValidSearchParams<'Toy'>
) {
  try {
    const res = await prisma.animal.findMany({
      where: {
        name: {
          contains: filters[SEARCH_PARAM_SEARCH],
          mode: 'insensitive'
        },
        colors: {
          some: {
            color: {
              color: {
                in: filters[SEARCH_PARAM_COLOR].length === 0 ? Object.values(ColorEnum) : filters[SEARCH_PARAM_COLOR] as ColorEnum[]
              }
            }
          }
        },
        weight: {
          gte: filters[SEARCH_PARAM_WEIGHT_MIN],
          lte: filters[SEARCH_PARAM_WEIGHT_MAX]
        },
        product: 'Toy',
        toy: {
          type: {
            name: {
              in: filters[SEARCH_PARAM_TYPE].length === 0 ? Object.values(ToyTypeEnum) : filters[SEARCH_PARAM_TYPE] as ToyTypeEnum[]
            },
          },
        }
      },
      ...getAnimalsSelect
    })

    return res
  } catch {
    return []
  }
}