import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center mb-4 lg:mb-12">
          <h1 className="sr-only">The fastest way to gain knowledge</h1>
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
            Using AI to help you learn faster
          </p>
          { user ? (
            <Link href="/dashboard">
              <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
                Go to Dashboard
              </div>
            </Link>
          ) : (
            <Link href="/login">
              <div className="bg-foreground py-3 px-6 rounded-lg font-mono text-sm text-background">
                Get started
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
