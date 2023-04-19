// @ts-ignore
import { tokenizer } from "nalapa"

export const ID = {
  splitSentence: (value: string): string[] => {
    return tokenizer.splitSentence(value)
  },
}
