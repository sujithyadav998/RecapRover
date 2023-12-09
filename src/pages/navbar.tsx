import Link from 'next/link';
import {useCookies  } from 'react-cookie';
import Cookies from 'js-cookie';
import {signIn, useSession, signOut} from "next-auth/react"


function SignOut()
{
  signOut({ redirect: false, callbackUrl: '/' }) // Logout the user
  window.location.replace('/') // Redirect to the home page after logout
}
const Navbar = () => {
  //const [cookies, setCookie, removeCookie] = useCookies(['token']);
//  let  cookie = new Cookies() ; 
//  let token = Cookies.get('token')
//  console.log(token) ; 

  // const handleLogout = () => {
  //   // Perform logout logic - remove token cookie or clear authentication status
  //   removeCookie('token');
  // };
  const session = useSession();
  console.log(session)
  const isLoggedIn = session.data ? true : false;



  return (
    <nav>
      <ul>
        {isLoggedIn ? (
          <>
            <nav style = {{ "width" : "98vw" }} className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link legacyBehavior href="/">
              <a className="text-xl font-bold"> RecapRover</a>
            </Link >
          </div>
          <div>
           
             <button
              
              type="button"
              onClick={() => SignOut() }
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
             >
             Logout 
            </button>
          </div>
        </div>
      </nav>
          </>
        ) : (
          <>
            <nav style = {{ "width" : "98vw" }} className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Link legacyBehavior href="/">
              <a className="text-xl font-bold"> RecapRover</a>
            </Link >
          </div>
          <div>
           
            <button
              type="button"
              onClick={() => signIn()}
              className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
             >
             Login
            </button>
          </div>
        </div>
      </nav>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
