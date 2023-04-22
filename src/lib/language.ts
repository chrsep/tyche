// @ts-ignore
import { tokenizer } from "nalapa"

export const ID = {
  splitSentence: (value: string): string[] => {
    return tokenizer.splitSentence(value)
  },
  getQuotations: (value: string): string[] => {
    return tokenizer.getQuotations(value)
  }
}
