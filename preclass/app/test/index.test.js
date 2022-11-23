import { describe, it, before, after } from 'node:test'
import { deepStrictEqual } from 'node:assert'
describe('My Suite', () => {
  it('my test', async () => {
    deepStrictEqual({}, {})
  })
})