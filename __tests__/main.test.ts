/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as keilBuilder from '../src/keil_builder'
import * as main from '../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let keilBuildProjectMock: jest.SpiedFunction<
  typeof keilBuilder.KeilBuildProject
>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    keilBuildProjectMock = jest
      .spyOn(keilBuilder, 'KeilBuildProject')
      .mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
  })

  it('passes project inputs to the builder', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'project_name':
          return 'MDK-ARM/Project.uvprojx'
        case 'target_name':
          return 'Debug'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(getInputMock).toHaveBeenNthCalledWith(1, 'project_name')
    expect(getInputMock).toHaveBeenNthCalledWith(2, 'target_name')
    expect(keilBuildProjectMock).toHaveBeenNthCalledWith(
      1,
      'MDK-ARM/Project.uvprojx',
      'Debug'
    )
    expect(setFailedMock).not.toHaveBeenCalled()
  })

  it('sets a failed status when the builder throws', async () => {
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'project_name':
          return 'MDK-ARM/Project.uvprojx'
        case 'target_name':
          return 'Debug'
        default:
          return ''
      }
    })

    keilBuildProjectMock.mockImplementation(() => {
      throw new Error('build failed')
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(setFailedMock).toHaveBeenNthCalledWith(1, 'build failed')
  })
})
