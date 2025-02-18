import { prisma } from "@/prisma";
import { PetTypeEnum } from "@prisma/client";

export async function getValidAttributes(types: PetTypeEnum[]): Promise<string[]> {
  try {
    const res = await prisma.petType_Attribute.findMany({
      where: {
        type: {
          name: {
            in: types.length === 0 ? Object.values(PetTypeEnum) : types
          }
        }
      },
      select: {
        attribute: {
          select: {
            attribute: true
          }
        }
      }
    })

    // Repeat attributes because of overlap between types, has to be reduced
    return res.reduce<string[]>((acc, { attribute }) => acc.includes(attribute.attribute) ? acc : [...acc, attribute.attribute], []).sort((a, b) => a.localeCompare(b))
  } catch {
    return []
  }
}