import { ColorEnum, PetTypeEnum, ToyTypeEnum } from "@prisma/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export const SEARCH_PARAM_TYPE = "type" as const;
export const SEARCH_PARAM_COLOR = "color" as const;
export const SEARCH_PARAM_WEIGHT_MIN = "weight-min" as const;
export const SEARCH_PARAM_WEIGHT_MAX = "weight-max" as const;
export const SEARCH_PARAM_ATTRIBUTE = "attribute" as const;

export interface ValidSearchParams<T extends "Pet" | "Toy"> {
  [SEARCH_PARAM_TYPE]: T extends "Pet" ? PetTypeEnum[] : ToyTypeEnum[];
  [SEARCH_PARAM_COLOR]: ColorEnum[keyof ColorEnum][];
  [SEARCH_PARAM_WEIGHT_MIN]: number;
  [SEARCH_PARAM_WEIGHT_MAX]: number;
  [SEARCH_PARAM_ATTRIBUTE]: T extends "Pet" ? string[] : null;
}

export function newParamsURL<T extends { [key: string]: string | string[] }>(
  current: ReadonlyURLSearchParams,
  params: T
) {
  const newParams = new URLSearchParams(current.toString());

  Object.keys(params).forEach((key) => {
    newParams.delete(key);
    const value = params[key];

    if (typeof value === "string") {
      newParams.append(key, value);
    } else {
      value.forEach((v) => newParams.append(key, v));
    }
  });

  return `?${newParams.toString()}`;
}

export function validateSearchParams<T extends "Pet" | "Toy">(
  params: Record<string, string | string[] | undefined>,
  type: T
): ValidSearchParams<T> {
  return {
    [SEARCH_PARAM_TYPE]: toArray(params[SEARCH_PARAM_TYPE]).filter((value) =>
      type === "Toy"
        ? Object.values(ToyTypeEnum).includes(value as "Monkey")
        : Object.values(PetTypeEnum).includes(value as "Cat")
    ),
    [SEARCH_PARAM_COLOR]: toArray(params[SEARCH_PARAM_COLOR]).filter((value) =>
      Object.values(ColorEnum).includes(value as "Red")
    ),
    [SEARCH_PARAM_WEIGHT_MIN]: !Number.isNaN(
      parseInt(params[SEARCH_PARAM_WEIGHT_MIN]?.toString() ?? "")
    )
      ? parseInt(params[SEARCH_PARAM_WEIGHT_MIN] as string)
      : 0,
    [SEARCH_PARAM_WEIGHT_MAX]: !Number.isNaN(
      parseInt(params[SEARCH_PARAM_WEIGHT_MAX]?.toString() ?? "")
    )
      ? parseInt(params[SEARCH_PARAM_WEIGHT_MAX] as string)
      : 100,
    [SEARCH_PARAM_ATTRIBUTE]:
      type === "Toy" ? null : toArray(params[SEARCH_PARAM_ATTRIBUTE]),
  } as ValidSearchParams<T>;
}

function toArray(value: string | string[] | undefined) {
  if (!value) return [];
  if (typeof value === "string") return [value];
  return value;
}

export function onUpdateValueArray(
  key: string,
  value: string,
  // Whether to set this value (true) or remove it (false)
  isSet: boolean,
  allSearchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) {
  const currentValue = allSearchParams.getAll(key);
  const newValue = isSet
    ? currentValue.includes(value)
      ? currentValue
      : [...currentValue, value]
    : currentValue.includes(value)
    ? currentValue.filter((v) => v !== value)
    : currentValue;

  router.push(newParamsURL(allSearchParams, { [key]: newValue }));
}

export function onUpdateValueSingle(
  key: string,
  value: string,
  allSearchParams: ReadonlyURLSearchParams,
  router: AppRouterInstance
) {
  router.push(newParamsURL(allSearchParams, { [key]: value }));
}
