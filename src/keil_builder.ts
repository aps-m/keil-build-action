import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

const KeilCompilerPath = 'C:\\Keil_v5\\UV4\\UV4.exe'
const LogFileName = 'build_output.txt'
let LogDirName = ''

function CallBack(err: any, data: string, stderr: string): void {
  const file_content = fs.readFileSync(`${LogDirName}/${LogFileName}`, 'utf-8')

  console.log('Build log:')
  console.log(file_content)

  if (err) {
    if (Number(err.code) > 1) {
      core.setFailed('Build process error output:')
      core.setFailed(err.stack)
    }
  }

  if (data) {
    console.log('Build process Data output:')
    console.log(data)
  }

  if (stderr) {
    console.log('Build process stderr output:')
    console.log(stderr)
  }
}

export function KeilBuildProject(
  project_name: string,
  target_name: string
): void {
  const cmdShell = require('node-cmd')

  LogDirName = path.dirname(project_name)

  console.log('warning: Example message')

  let process_obj = cmdShell.run(
    `${KeilCompilerPath} -j0 -cr ${project_name} -t ${target_name} -o ${LogFileName}`,
    CallBack
  )

  process_obj.stdout.on('data', function (log_item: string) {
    console.log(log_item)
  })
}

//KeilBuildProject('test', 'test')
