import { useState } from "react"

const useStateWidthSotrage = (init: string, key: string): [string, (s:string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  return [value, setValueWithStorage]
}

export default useStateWidthSotrage
