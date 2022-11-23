import {
  describe,
  it,
  before,
  beforeEach,
  after,
  afterEach,
  mock
} from 'node:test'
import {
  deepStrictEqual,
  CallTracker
} from 'node:assert'
import {
  setTimeout
} from 'node:timers/promises'

const tracker = new CallTracker()
process.on('exit', () => tracker.verify())

function sum(num1, num2) {
  return num1 + num2
}


describe('Using Node.js only!!', () => {
  // beforeEach(() => 
  //   // geralmente, para limpar o estado
  //   console.log('vou rodar antes de cada teste!')
  // )
  // afterEach(() => console.log('vou rodar apos cada teste'))
  // before(() => console.log('rodar antes do proximo teste!'))
  it('it should sum two values', () => {
    const expected = 10
    const current = sum(5, 5)
    deepStrictEqual(current, expected)
  })
  it.skip('it should sum three values')
  it.todo('it should sum three values', {
    only: true
  })
  const timer = {
    delay(ms) {
      return setTimeout(ms)
    },
    async sumDelayed(num1, num2) {
      await timer.delay(1000)
      return sum(num1, num2)
    }
  };

  it.skip('it should sum values after a second', async() => {
    
    
    // isso é um SPY = monitora as chamadas de uma função
    // assim como o sinon ou jest fazem!
    mock.method(timer, timer.delay.name)

    const result = await timer.sumDelayed(4, 5) 

    deepStrictEqual(timer.delay.mock.calls.length, 1)
    deepStrictEqual(timer.delay.mock.calls[0].arguments, [1000])
    deepStrictEqual(result, 9)
  })
  it('it should sum values after a second using callTracker', async() => {
    
    // isso é um SPY = monitora as chamadas de uma função
    // assim como o sinon ou jest fazem!
    timer.delay = tracker.calls(() => {})

    const result = await timer.sumDelayed(4, 5) 
    const [{ arguments: delayArguments}] = tracker.getCalls(timer.delay)
    deepStrictEqual(delayArguments, [1000])
    deepStrictEqual(result, 9)
  })
})