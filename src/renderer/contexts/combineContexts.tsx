import React from 'react'

const createNestedElements = (
  elementArray: React.JSX.Element[],
  children: React.ReactNode
): React.JSX.Element => {
  const element = elementArray[0]
  const newArray = elementArray.slice(1)

  if (!element) return <>{children}</>
  return React.createElement(
    element.type,
    { ...element.props },
    <>{createNestedElements(newArray, children)}</>
  )
}

interface props {
  children?: React.ReactNode
}

export const useNestedProviders = (...providers: React.JSX.Element[]) => {
  return ({ children }: props) => {
    return createNestedElements(providers, children)
  }
}
