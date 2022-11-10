import * as core from '@actions/core'
import * as io from '@actions/io'
import {Octommit} from '@stockopedia/octommit'
import {callAsyncFunction} from './async-function'

process.on('unhandledRejection', handleError)

export async function main(): Promise<void> {
  try {
    const token = core.getInput('github-token', {required: true})
    const script = core.getInput('script', {required: true})

    const octommit = new Octommit(token)

    const result = await callAsyncFunction(
      {require, core, io, octommit},
      script
    )

    core.setOutput('result', result)
  } catch (e) {
    handleError(e)
  }
}

function handleError(err: any): void {
  console.error(err)
  core.setFailed(`Unhandled error: ${err}`)
}
