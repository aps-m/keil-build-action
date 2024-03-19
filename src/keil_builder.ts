const KeilCompilerPath = 'C:\\Keil_v5\\UV4\\UV4.exe'

function CallBack(err: string, data: string, stderr: string): void {
  if (err) {
    err = ''
  }

  if (data) {
    data = ''
  }

  if (stderr) {
    stderr = ''
  }
}

export function KeilBuildProject(
  project_name: string,
  target_name: string
): void {
  const cmdShell = require('node-cmd')
  
  let process_obj = cmdShell.run(
    `start /wait ${KeilCompilerPath} -j0 -cr ${project_name} -t ${target_name}`,
    CallBack
  )

  process_obj.stdout.on('data', function (log_item: string) {
    console.log(log_item)
  })
}
