import type { ReactNode } from "react"

type Props = {
  children: ReactNode,
}

function Container({ children }: Props) {
  return (
    <div className="container p-4 sm:p-8 mx-auto">
      {children}
    </div>
  )
}

export default Container;
