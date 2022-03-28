import { Categories, CategoriesSection } from '../constants'

export function getCategorySection(category: Categories): number {
  return CategoriesSection[category] as number
}
