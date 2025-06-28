declare module '*.svg' {
  import type * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.svg?url' {
  const content: string
  export default content
}