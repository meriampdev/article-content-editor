import { useState, createContext } from "react"

export const EditorContext = createContext(null);

let persistedState = {};
export const EditorProvider = ({ children }) => {
  const [state, setState] = useState({ ...persistedState })

  const handleSetState = (data) => {
    setState(prevState => {
      persistedState = { ...prevState, ...data }
      return persistedState
    })
  }

  return (
    <>
      <EditorContext.Provider value={{ state, handleSetState }}>
        {children}
      </EditorContext.Provider>
    </>
  );
}