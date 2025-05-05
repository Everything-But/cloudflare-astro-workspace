const PageError = ({ error }: { error: any }) => {
  const handleRefresh = () => {
    window.location.reload()
  }
  return (
    <div className='gap-5 grid place-content-center'>
      <div className='grid place-content-center'>
        <div className='bg-yellow-500 font-black grid h-36 place-content-center rounded-full text-9xl text-white w-36'>!</div>
      </div>
      <div className='font-semibold text-5xl'>{error?.message ?? 'Oops! Something went wrong...'}</div>
      <div className='grid place-content-center'>
        <button className='bg-yellow-500 border border-yellow-500 cursor-pointer font-light p-4 rounded-full text-2xl text-white w-fit' onClick={handleRefresh}>
          Refresh Page
        </button>
      </div>
    </div>
  )
}

export { PageError as default }
