import * as core from '@actions/core'
import {Octommit} from '@stockopedia/octommit'
import {main} from '../src/main'
import Mock = jest.Mock
import exp = require('constants')

jest.mock('@actions/core', () => {
  return {
    getInput: jest.fn((key: string) => {
      switch (key) {
        case 'github-token':
          return 'token123'
        case 'script':
          return `return octommit.run("something")`
        default:
          throw new Error(`Cannot getInput for "${key}"`)
      }
    }),
    setOutput: jest.fn(),
    setFailed: jest.fn()
  }
})

jest.mock('@stockopedia/octommit', () => {
  return {
    Octommit: jest.fn(() => ({run: jest.fn(() => 'Winner!')}))
  }
})

describe('main', () => {
  it('should invoke the command in the input with the token', async () => {
    await main()

    expect(core.getInput).toHaveBeenCalledWith('github-token', {required: true})
    expect(core.getInput).toHaveBeenCalledWith('script', {required: true})

    expect(Octommit).toHaveBeenCalledWith('token123')

    expect(core.setOutput).toHaveBeenCalledWith('result', 'Winner!')

    expect(core.setFailed).not.toHaveBeenCalled()
  })

  it('should set a failure when there is an error', async () => {
    ;(Octommit as unknown as Mock).mockImplementation(() => {
      throw new Error('Failed')
    })
    jest.spyOn(console, 'error').mockImplementation(() => {})

    await main()

    expect(core.setOutput).not.toHaveBeenCalled()

    expect(core.setFailed).toHaveBeenCalledWith(
      `Unhandled error: Error: Failed`
    )
    expect(console.error).toHaveBeenCalledWith(new Error('Failed'))
  })
})
