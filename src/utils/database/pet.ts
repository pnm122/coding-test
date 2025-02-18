import { prisma } from "@/prisma";
import { SEARCH_PARAM_COLOR, ValidSearchParams } from "../searchParams";
import { ColorEnum } from "@prisma/client";

export async function getPets(
  filters: ValidSearchParams<'Pet'>
) {
  try {
    const res = await prisma.pet.findMany({
      where: {
        animal: {
          colors: {
            some: {
              color: {
                color: {
                  in: filters[SEARCH_PARAM_COLOR].length === 0 ? Object.values(ColorEnum) : filters[SEARCH_PARAM_COLOR] as ColorEnum[]
                }
              }
            }
          }
        }
      },
      select: {
        id: true,
        animal: {
          select: {
            name: true,
            weight: true,
            colors: {
              select: {
                color: {
                  select: {
                    color: true
                  }
                }
              }
            },
            sale: true
          }
        }
      }
    })

    return res
  } catch {
    return []
  }
}