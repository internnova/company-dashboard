import { AuthenticationError, Link, useMutation, Routes } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://cdn.dribbble.com/users/974160/screenshots/5404701/rdc.gif"
          alt=""
          id="twoTimesGif"
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>
          <Form
            submitText="Log In"
            schema={Login}
            initialValues={{ email: '', password: '' }}
            onSubmit={async (values) => {
              try {
                await loginMutation(values)
                props.onSuccess?.()
              } catch (error) {
                if (error instanceof AuthenticationError) {
                  return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
                } else {
                  return {
                    [FORM_ERROR]:
                      'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
                  }
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" />
            <LabeledTextField
              name="password"
              label="Password"
              placeholder="Password"
              type="password"
            />
            <div>
              <div className="text-right mt-2">
                <Link href={Routes.ForgotPasswordPage()}>
                  <a
                    href="#"
                    className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                  >
                    Forgot your Password?
                  </a>
                </Link>
              </div>
            </div>
            <div className="text-right">
              <Link href={Routes.SignupPage()}>
                <a className="text-sm text-variant-2 font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                  Don't have an account? Sign Up
                </a>
              </Link>
            </div>
          </Form>
        </div>{' '}
      </div>
    </section>
  )
}

export default LoginForm
