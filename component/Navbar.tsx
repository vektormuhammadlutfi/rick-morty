import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark p-4'>
      <div className='container'>
        <Link
          href='/'
          style={{
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Rick and Morty
        </Link>

        <div className=''>
          <ul
            className='d-flex flex-row m-0'
            style={{
              listStyle: 'none',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
            <li className=' '>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
                href='/character'
              >
                Characters
              </Link>
            </li>
            <li className=''>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
                href='/location'
              >
                Locations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
