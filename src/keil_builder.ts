import * as core from '@actions/core'

const KeilCompilerPath = 'C:\\Keil_v5\\UV4\\UV4.exe'

//const KeilCompilerPath = 'ResGen'

function CallBack(err: any, data: string, stderr: string): void {
  if (err) {
    console.log('Error output:')
    console.log(err)
    console.log('End error output')

    console.log(`Error code: ${err.code}`)

    if (Number(err.code) > 0) {
      core.setFailed(err.stack)
    }
  }

  if (data) {
    console.log('Data output:')
    console.log(data)
    console.log('End data output')
  }

  if (stderr) {
    console.log('Stderr output:')
    console.log(stderr)
    console.log('End stderr output')
  }
}

export function KeilBuildProject(
  project_name: string,
  target_name: string
): void {
  const cmdShell = require('node-cmd')

  let process_obj = cmdShell.run(
    `${KeilCompilerPath} -j0 -cr ${project_name} -t ${target_name}`,
    CallBack
  )

  process_obj.stdout.on('data', function (log_item: string) {
    console.log('log item output:')
    console.log(log_item)
    console.log('End log item output')
  })
}

//KeilBuildProject('test', 'test')
