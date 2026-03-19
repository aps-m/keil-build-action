declare module 'node-cmd' {
  interface CommandProcess {
    stdout: {
      on(event: 'data', listener: (data: string) => void): void
    }
  }

  type CommandCallback = (
    err: (Error & { code?: number | string }) | null,
    data: string,
    stderr: string
  ) => void

  interface NodeCmd {
    run(command: string, callback?: CommandCallback): CommandProcess
  }

  const cmd: NodeCmd

  export default cmd
}
