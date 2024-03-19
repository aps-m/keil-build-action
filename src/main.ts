import * as core from '@actions/core'
import { KeilBuildProject } from './keil_builder'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const project_name: string = core.getInput('project_name')
    const target_name: string = core.getInput('target_name')
    KeilBuildProject(project_name, target_name)

    // const ms: string = core.getInput('milliseconds')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
