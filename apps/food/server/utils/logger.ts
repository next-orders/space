import { consola } from 'consola'

export function useLogger(tag?: string) {
  return tag ? consola.withTag(tag) : consola
}
