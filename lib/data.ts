import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

const dataDir = join(process.cwd(), "data")

export function getData<T>(section: string): T {
  const filePath = join(dataDir, `${section}.json`)
  return JSON.parse(readFileSync(filePath, "utf-8")) as T
}

export function setData<T>(section: string, data: T): void {
  const filePath = join(dataDir, `${section}.json`)
  writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function generateId(): string {
  return crypto.randomUUID()
}
