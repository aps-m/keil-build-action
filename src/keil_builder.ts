import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

const KeilCompilerPath = 'C:\\Keil_v5\\UV4\\UV4.exe'
const LogFileName = 'build_output.txt'
let LogDirName = ''

function CallBack(err: any, data: string, stderr: string): void {
  const file_content = fs.readFileSync(`${LogDirName}/${LogFileName}`, 'utf-8')

  console.log('Build log:')

  const arr = file_content.split(/\r?\n/)
  let detail_warn: boolean = false
  let detail_err: boolean = false
  let detail_str: string = ''

  // Read file line by line
  for (let line of arr) {
    let regex_warning = /[wW]arning:/g
    let regex_error = /[eE]rror:/g
    let probe_warning = regex_warning.exec(line)
    let probe_error = regex_error.exec(line)
    let handled: boolean = false

    if (detail_err) {
      //ErrList.push(line)
      detail_str = `${detail_str}\r\n${line}`
      core.setFailed(detail_str)
      detail_err = false
      handled = true
    }

    if (probe_error) {
      //ErrList.push(line)
      //core.setFailed(line)
      detail_str = line
      detail_err = true
      handled = true
    }

    if (detail_warn) {
      detail_str = `${detail_str}\r\n${line}`
      //ErrList.push(line)
      core.warning(detail_str)
      detail_warn = false
      handled = true
    }

    if (probe_warning) {
      //core.warning(line)
      detail_str = line
      detail_warn = true
      handled = true
    }

    if (!handled) {
      console.log(line)
    }
  }
  //console.log(file_content)

  if (err) {
    if (Number(err.code) > 1) {
      //core.setFailed('Build error')
      // for (let err of ErrList) {
      //   core.setFailed(err)
      // }
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

  let process_obj = cmdShell.run(
    `${KeilCompilerPath} -j0 -cr ${project_name} -t ${target_name} -o ${LogFileName}`,
    CallBack
  )

  process_obj.stdout.on('data', function (log_item: string) {
    console.log(log_item)
  })
}

//KeilBuildProject('test', 'test')
