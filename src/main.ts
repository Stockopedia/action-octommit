import * as core from '@actions/core'
import {callAsyncFunction} from './async-function'
import {Octommit} from '@stockopedia/octommit'
import * as io from '@actions/io'

process.on('unhandledRejection', handleError)
main().catch(handleError)

async function main(): Promise<void> {
  const token = core.getInput('github-token', {required: true})
  const script = core.getInput('script', {required: true})

  const octommit = new Octommit(token)

  const result = await callAsyncFunction(
    {require: require, core, io, octommit},
    script
  )

  core.setOutput('result', result)
}

function handleError(err: any): void {
  console.error(err)
  core.setFailed(`Unhandled error: ${err}`)
}
