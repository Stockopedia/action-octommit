import * as core from '@actions/core'
import * as io from '@actions/io'
import {Octommit} from '@stockopedia/octommit'

const AsyncFunction = Object.getPrototypeOf(async () => null).constructor

type AsyncFunctionArguments = {
  core: typeof core
  io: typeof io
  require: NodeRequire
  octommit: Octommit
}

export async function callAsyncFunction<T>(
  args: AsyncFunctionArguments,
  source: string
): Promise<T> {
  const fn = new AsyncFunction(...Object.keys(args), source)
  return fn(...Object.values(args))
}
