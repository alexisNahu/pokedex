import React, { FormEvent, useEffect, useRef, useState } from 'react'

interface Props {
  completeList: string[]
  handleSuggestionsClick: (name: string) => void
  onSubmit?: (value: string) => void
  handleSuggestionRender: (name: string) => React.ReactNode
  placeholder?: string
  shouldClearInput?: boolean
  maxSuggestion: number
}

function SuggestionInput({
  completeList,
  handleSuggestionsClick,
  onSubmit,
  handleSuggestionRender,
  placeholder,
  shouldClearInput,
  maxSuggestion,
}: Props) {
  const [suggestionsList, setSuggestionsList] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        const handleClickContent = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setSuggestionsList([])
        }

        const handleEscapeKeyPress = (e: KeyboardEvent) => {
            if (containerRef.current && e.key === 'Esc') setSuggestionsList([])
        }

        document.addEventListener('mousedown', handleClickContent)
        document.addEventListener('keydown', handleEscapeKeyPress)

        return () => {
            document.removeEventListener('mousedown', handleClickContent)
            document.removeEventListener('keydown', handleEscapeKeyPress)
        }
    }, [])

  useEffect(() => {
    if (shouldClearInput && inputRef.current) {
      inputRef.current.value = ''
      setSuggestionsList([])
    }
  }, [shouldClearInput])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputRef.current && onSubmit) {
      onSubmit(inputRef.current.value.trim().toLowerCase())
    }
  }

  const handleChange = () => {
    if (inputRef.current) {
      const value = inputRef.current.value.trim().toLowerCase().replace('-', '')
      if (!value) {
        setSuggestionsList([])
        return
      }
      const suggestions = [...completeList]
        .filter((name) => name.includes(value))
        .slice(0, 7)
      setSuggestionsList(suggestions)
    }
  }

  const handleKeyDowns = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape' && inputRef.current) {
      setSuggestionsList([])
      inputRef.current.value = ''
    }
  }

  return (
    <form ref={containerRef} onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <input
        type="text"
        onChange={handleChange}
        ref={inputRef}
        onKeyDown={handleKeyDowns}
        autoComplete="off"
        className="form-control"
        placeholder={placeholder ?? 'Search here ...'}
      />
      {suggestionsList.length > 0 && (
        <ul
          className="suggestion-list list-group mt-2 z-3 position-absolute mx-auto"
          style={{ maxHeight: 200, overflowY: 'auto', width: '100%' }}
        >
          {suggestionsList.slice(0, maxSuggestion).map((name) => (
            <li
              key={name}
              className="list-group-item list-group-item-action"
              onClick={() => handleSuggestionsClick(name)}
              style={{ cursor: 'pointer' }}
            >
              {handleSuggestionRender(name)}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}

export default SuggestionInput
