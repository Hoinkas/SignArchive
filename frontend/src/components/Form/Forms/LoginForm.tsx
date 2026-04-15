import { type Dispatch, type SetStateAction, type SubmitEvent, useState } from 'react'
import { FormModalWrapper, FormSingleLineInput } from '../Form'
import { usePermissions } from '@src/hooks/PermissionsContext/usePermissions'
import type { ILogin } from '@src/models/login.model'

interface LoginFormProps {
  setIsFormOpen: Dispatch<SetStateAction<boolean>>
}

function LoginForm({ setIsFormOpen }: LoginFormProps): React.JSX.Element {
  const { checkLogin } = usePermissions()

  const [user, setUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const closeForm = (): void => {
    setUser('')
    setPassword('')
    setIsFormOpen(false)
  }

  const isValid = user !== '' && password !== ''

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const login: ILogin = {user, password}
    checkLogin(login)
    closeForm()
  }

  return (
    <div>
      <FormModalWrapper handleSubmit={handleSubmit} formType={'add'} closeForm={closeForm}>
        <FormSingleLineInput
          label="Login"
          value={user}
          setValue={setUser}
          required
          submitted={submitted}
        />
        <FormSingleLineInput
          label="Hasło"
          value={password}
          setValue={setPassword}
          required
          submitted={submitted}
          type="password"
        />
      </FormModalWrapper>
    </div>
  )
}

export default LoginForm
