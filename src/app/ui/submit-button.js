'use client'

////import { useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  // state flag used to set the disabled attribute
  ////const { buffering } = useFormStatus()
 
  return (
        <button type="submit" name="examples-action" value="join" 
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bor
der-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Join{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
            Join new user example.
          </p>
        </button>
  )
}

